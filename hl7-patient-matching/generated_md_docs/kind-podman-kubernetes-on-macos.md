# Running HL7 Patient Matching on a Local Kubernetes Cluster (Kind + Podman)

> Captured from a live Q&A session. Covers feasibility assessment, manifest generation, and resource impact.

---

## Q1 — How much effort is it to run the app in a local Kubernetes cluster on macOS?

### Answer

The lift is small because Podman is already running. There are two realistic options:

### Option 1: Podman's Built-in Kubernetes Support ⭐ Lowest friction

Podman has native `podman kube` commands that run Kubernetes YAML directly **without a full cluster**.

```bash
# Generate a Kubernetes manifest from your existing container
podman generate kube hl7-app > hl7-app.yaml

# Play it back as a pod
podman kube play hl7-app.yaml
```

**Effort: ~30 minutes**
- No extra tools needed
- Not a "real" cluster — single-node pod scheduling only
- Good enough for demo/testing purposes

### Option 2: Kind + Podman (Full Cluster)

Kind (Kubernetes-in-Docker/Podman) spins up a full local Kubernetes cluster.

```bash
brew install kind
kind create cluster --name hl7-demo
```

Then deploy normally with `kubectl`.

**Effort: ~2–4 hours** including: installing Kind, configuring `kubectl`, writing manifests (Deployment, Service, ConfigMap), and wiring up ports/volumes.

---

## Q2 — What does the current app setup look like, and what would the manifests need?

### Stack discovery

The app is two services defined in `podman-compose.yml`:

| Service | Image | Port | State |
|---|---|---|---|
| `hl7-app` | Custom build (Node 18 Alpine) | `3000` | Stateless |
| `postgres` | `postgres:15-alpine` | `5432` | **Stateful** — needs a PersistentVolumeClaim |

**Key findings:**
- No MLLP/port 2575 — plain HTTP on port `3000`. Simple to expose.
- PostgreSQL is the only stateful component.
- `./data` contains static JSON/HL7 sample files — baked into the image.
- `database/init.sql` initialises the schema on first Postgres boot.
- All configuration is environment variables — maps cleanly to a `ConfigMap` + `Secret`.

### Kubernetes manifest shape

Five YAML objects are needed:

```
namespace.yaml             # hl7-demo namespace
secret.yaml                # DB credentials
configmap.yaml             # App env vars + init.sql embedded
postgres-pvc.yaml          # 1Gi PersistentVolumeClaim
postgres-deployment.yaml   # Postgres Deployment + ClusterIP Service
hl7-app-deployment.yaml    # App Deployment + NodePort Service (:30300)
kustomization.yaml         # Single entry point for kubectl apply -k k8s/
```

Plus a `kind-config.yaml` at the repo root to map `localhost:30300` into the cluster.

### Revised effort estimate

| Task | Time |
|---|---|
| Build & push image to local Podman registry | 10 min |
| Write the manifests | 30–45 min |
| Install Kind + configure kubectl | 15 min |
| First deploy + debug | 30–60 min |
| **Total** | **~1.5–2.5 hours** |

---

## Q3 — Generate the Kubernetes manifests

### Generated files

```
k8s/
├── namespace.yaml
├── secret.yaml
├── configmap.yaml
├── postgres-pvc.yaml
├── postgres-deployment.yaml
├── hl7-app-deployment.yaml
├── kustomization.yaml
└── README.md

kind-config.yaml
```

### kind-config.yaml

Maps `localhost:30300` through to the Kind node's NodePort so you can open the app in a browser.

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
    extraPortMappings:
      - containerPort: 30300
        hostPort: 30300
        protocol: TCP
```

### Key design decisions in the manifests

**Init container on the app pod** — waits for Postgres port 5432 to be reachable before Node starts. This replaces the `depends_on: service_healthy` behaviour from Compose:

```yaml
initContainers:
  - name: wait-for-postgres
    image: docker.io/library/busybox:1.36
    command:
      - sh
      - -c
      - |
        until nc -z postgres 5432; do
          echo "waiting for postgres..."; sleep 2;
        done
```

**init.sql via ConfigMap** — the schema SQL is embedded in a ConfigMap and mounted into `/docker-entrypoint-initdb.d/` inside the Postgres container. Same mechanism as the Compose bind mount:

```yaml
volumeMounts:
  - name: init-sql
    mountPath: /docker-entrypoint-initdb.d
    readOnly: true
volumes:
  - name: init-sql
    configMap:
      name: postgres-init-sql
```

**Credentials in a Secret** — DB username and password are stored in a Kubernetes Secret and injected as environment variables via `secretKeyRef`, keeping them out of the ConfigMap.

**imagePullPolicy: Never** on the app container — tells Kubernetes to use the locally loaded image rather than trying to pull from a registry:

```yaml
image: localhost/hl7-app:latest
imagePullPolicy: Never
```

### Full deploy sequence

```bash
# 1. Install tools (once)
brew install kind kubectl

# 2. Create the cluster with port mapping
kind create cluster --name hl7-demo --config kind-config.yaml

# 3. Build the image and load it into Kind
podman build -t localhost/hl7-app:latest .
kind load docker-image localhost/hl7-app:latest --name hl7-demo

# 4. Deploy everything in one command
kubectl apply -k k8s/

# 5. Watch pods come up
kubectl get pods -n hl7-demo -w

# 6. Open the app
open http://localhost:30300
```

### Useful day-to-day commands

```bash
# Tail app logs
kubectl logs -n hl7-demo -l app=hl7-app -f

# Tail postgres logs
kubectl logs -n hl7-demo -l app=postgres -f

# Shell into the app container
kubectl exec -n hl7-demo -it deploy/hl7-app -- sh

# Shell into postgres
kubectl exec -n hl7-demo -it deploy/postgres -- psql -U postgres hl7_matching

# Tear down deployments (keeps cluster)
kubectl delete -k k8s/

# Destroy the cluster entirely
kind delete cluster --name hl7-demo
```

### Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `ImagePullBackOff` on hl7-app | Image not loaded into Kind | Re-run `kind load docker-image ...` |
| App pod `CrashLoopBackOff` | Postgres not ready yet | Init container should handle this; check `kubectl describe pod` |
| Postgres `CrashLoopBackOff` | PVC issue | `kubectl get pvc -n hl7-demo` — status should be `Bound` |
| `connection refused` on :30300 | Kind port mapping missing | Ensure you used `kind-config.yaml` when creating the cluster |

---

## Q4 — What is the projected increase in RAM, CPU, and disk space?

### RAM

| Component | Compose (current) | Kind+Podman |
|---|---|---|
| Podman VM (`podman machine`) | ~512 MB–1 GB | ~512 MB–1 GB (same) |
| Kind control plane (API server, etcd, scheduler, controller-manager, kube-proxy, CoreDNS) | — | **+600–900 MB** |
| `hl7-app` container | ~80–120 MB | ~80–120 MB (same) |
| `postgres` container | ~30–80 MB | ~30–80 MB (same) |
| `busybox` init container | — | negligible — exits immediately |
| **Total increase** | baseline | **+600–900 MB** |

The overhead is almost entirely the Kubernetes control plane. Your actual app workloads are identical.

> **Tip:** Make sure your Podman machine has at least **3 GB RAM** allocated:
> ```bash
> podman machine set --memory 3072
> ```
> The default 2 GB can get tight with a Kind cluster running.

### CPU

| Component | Compose (current) | Kind+Podman |
|---|---|---|
| Idle app + DB | ~1–5% | ~1–5% (same) |
| Kubernetes control plane (idle) | — | **+5–15% at startup**, settles to **+1–3% idle** |
| etcd I/O | — | small but steady background writes |

CPU impact is low once the cluster is running. The spike is only at startup. On Apple Silicon (M-series) this is fast and settles quickly.

### Disk space

| Item | Size |
|---|---|
| Kind node image (`kindest/node`) | ~900 MB |
| `postgres:15-alpine` (already pulled) | ~0 MB extra |
| `localhost/hl7-app:latest` (already built) | ~0 MB extra |
| `busybox:1.36` init container image | ~5 MB |
| Kind cluster state + etcd data (in Podman VM) | ~200–400 MB |
| Postgres PVC data (schema only, no bulk data) | ~10–50 MB |
| `kubectl` + `kind` binaries | ~100 MB |
| **New disk required** | **~1.2–1.5 GB** |

The dominant cost is the `kindest/node` image (~900 MB). Everything else is already present or negligible.

### Summary

```
RAM:   +600–900 MB  (Kubernetes control plane overhead)
CPU:   +1–3% idle  (negligible on Apple Silicon)
Disk:  +~1.2–1.5 GB (mostly the kindest/node image)
```

On a MacBook with 16 GB+ RAM this is a non-event. On an 8 GB machine, close memory-hungry apps (browser tabs, etc.) before spinning the cluster up — it's still very workable.

---

*Generated with Bob — hl7-patient-matching project*
