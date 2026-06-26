# HL7 Patient Matching — Kubernetes on macOS (Kind + Podman)

Run the entire HL7 demo stack on your MacBook in a local Kind cluster backed by Podman.

---

## Prerequisites

```bash
brew install kind kubectl
```

Verify Podman is running:
```bash
podman machine start   # if not already started
podman info
```

---

## Step 1 — Create a Kind cluster with port mapping

Create a `kind-config.yaml` at the repo root (already provided):

```bash
kind create cluster --name hl7-demo --config kind-config.yaml
```

This maps `localhost:30300 → NodePort 30300` so you can open the app at `http://localhost:30300`.

---

## Step 2 — Build the app image

```bash
podman build -t localhost/hl7-app:latest .
```

---

## Step 3 — Load the image into Kind

Kind runs its own container runtime — images must be explicitly loaded:

```bash
kind load docker-image localhost/hl7-app:latest --name hl7-demo
```

> **Tip:** Re-run this step any time you rebuild the image.

---

## Step 4 — Deploy everything

```bash
kubectl apply -k k8s/
```

Watch it come up:

```bash
kubectl get pods -n hl7-demo -w
```

Both pods should reach `Running` + `1/1 Ready` within ~60 seconds.

---

## Step 5 — Open the app

```bash
open http://localhost:30300
```

Or via kubectl port-forward (alternative to NodePort):

```bash
kubectl port-forward -n hl7-demo svc/hl7-app 3000:3000
open http://localhost:3000
```

---

## Useful commands

```bash
# Tail app logs
kubectl logs -n hl7-demo -l app=hl7-app -f

# Tail postgres logs
kubectl logs -n hl7-demo -l app=postgres -f

# Shell into the app container
kubectl exec -n hl7-demo -it deploy/hl7-app -- sh

# Shell into postgres
kubectl exec -n hl7-demo -it deploy/postgres -- psql -U postgres hl7_matching

# Tear everything down
kubectl delete -k k8s/

# Delete the cluster entirely
kind delete cluster --name hl7-demo
```

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `ImagePullBackOff` on hl7-app | Image not loaded into Kind | Re-run `kind load docker-image ...` |
| App pod `CrashLoopBackOff` | Postgres not ready yet | Init container should handle this; check `kubectl describe pod` |
| Postgres `CrashLoopBackOff` | PVC issue | Run `kubectl get pvc -n hl7-demo` — status should be `Bound` |
| `connection refused` on :30300 | Kind port mapping missing | Ensure you used `kind-config.yaml` when creating the cluster |

---

## File layout

```
k8s/
├── namespace.yaml            # hl7-demo namespace
├── secret.yaml               # DB credentials (change before prod!)
├── configmap.yaml            # App env vars + init.sql
├── postgres-pvc.yaml         # 1Gi persistent volume for Postgres data
├── postgres-deployment.yaml  # Postgres Deployment + ClusterIP Service
├── hl7-app-deployment.yaml   # App Deployment + NodePort Service (:30300)
└── kustomization.yaml        # Applies all of the above in order
kind-config.yaml              # Kind cluster config with port mapping
```
