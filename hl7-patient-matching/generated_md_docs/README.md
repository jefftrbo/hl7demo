# HL7 Patient Matching System

AI-Powered Patient Record Linkage System for Hospital Admissions using HL7 ADT messages.

## Features

- 🏥 Process HL7 ADT^A01 messages
- 🔍 Multi-algorithm patient matching (Deterministic, Probabilistic)
- 📊 Interactive dashboard for reviewing matches
- 🤖 AI-enhanced fuzzy matching
- ⚖️ HIPAA-compliant design
- 🐳 Containerized with Podman/Docker

## Quick Start with Podman

### Prerequisites

- Podman installed on your system
- Podman Compose (or use `podman-compose`)

### Deploy the Application

1. **Navigate to the project directory:**
   ```bash
   cd hl7-patient-matching
   ```

2. **Build and start the containers:**
   ```bash
   podman-compose up -d --build
   ```
   
   Or if using Docker Compose with Podman:
   ```bash
   docker-compose up -d --build
   ```

3. **Wait for services to be healthy:**
   ```bash
   podman-compose ps
   ```

4. **Access the application:**
   - Dashboard: http://localhost:3000
   - API: http://localhost:3000/api

### Generate Sample Data

Generate 100 synthetic HL7 patient records with intentional duplicates:

```bash
# Enter the app container
podman exec -it hl7-app sh

# Generate sample data
node backend/generate-hl7-patients.js

# Exit container
exit
```

This creates:
- `data/hospital-admissions.hl7` - HL7 ADT messages
- `data/patients.json` - JSON representation

### Using the Application

1. **Upload HL7 Data:**
   - Click "Upload HL7 File" on the dashboard
   - Select `data/hospital-admissions.hl7`
   - Click "Upload & Process"

2. **Run Matching:**
   - Adjust confidence threshold (default: 0.75)
   - Click "Run Matching Algorithm"
   - Review potential duplicate matches

3. **Review Matches:**
   - View confidence scores and reasoning
   - Approve matches to merge records
   - Reject false positives

## Architecture

```
┌─────────────────────────────────────────┐
│         Frontend Dashboard              │
│  (HTML/CSS/JavaScript)                  │
└─────────────────────────────────────────┘
                  ↕ REST API
┌─────────────────────────────────────────┐
│         Express.js Backend              │
│  - HL7 Parser                           │
│  - Matching Engine                      │
│  - API Endpoints                        │
└─────────────────────────────────────────┘
                  ↕
┌─────────────────────────────────────────┐
│         PostgreSQL Database             │
│  - Patients                             │
│  - Matches                              │
│  - Admissions                           │
└─────────────────────────────────────────┘
```

## Podman Commands

### View logs:
```bash
podman-compose logs -f app
podman-compose logs -f postgres
```

### Stop services:
```bash
podman-compose down
```

### Stop and remove volumes:
```bash
podman-compose down -v
```

### Rebuild after changes:
```bash
podman-compose up -d --build
```

### Access database:
```bash
podman exec -it hl7-postgres psql -U postgres -d hl7_matching
```

### View running containers:
```bash
podman ps
```

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/hl7/upload` - Upload HL7 file
- `GET /api/patients` - List all patients
- `POST /api/matching/run` - Run matching algorithm
- `GET /api/matching/results` - Get matching results
- `POST /api/patients/merge` - Merge patient records
- `POST /api/matching/reject` - Reject a match
- `GET /api/stats` - Get statistics

## Matching Algorithms

### 1. Deterministic Matching
Exact matches on:
- SSN + DOB
- Full name + DOB

### 2. Probabilistic Matching (Fellegi-Sunter)
Weighted scoring on:
- SSN (30%)
- DOB (25%)
- First name (15%)
- Last name (15%)
- Phone (10%)
- Address (5%)

Uses phonetic matching and string similarity for fuzzy matching.

## Database Schema

### Patients Table
- Demographics (name, DOB, SSN, etc.)
- Contact information
- Status (ACTIVE, MERGED)

### Patient Matches Table
- Match pairs
- Confidence scores
- Matching method
- Review status

### Admissions Table
- Admission records
- HL7 messages
- Diagnosis information

## Development

### Local Development (without containers):

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start PostgreSQL:
   ```bash
   podman run -d \
     --name postgres \
     -e POSTGRES_DB=hl7_matching \
     -e POSTGRES_USER=postgres \
     -e POSTGRES_PASSWORD=postgres \
     -p 5432:5432 \
     postgres:15-alpine
   ```

3. Initialize database:
   ```bash
   podman exec -i postgres psql -U postgres -d hl7_matching < database/init.sql
   ```

4. Generate sample data:
   ```bash
   npm run generate-data
   ```

5. Start server:
   ```bash
   npm start
   ```

## Environment Variables

See `.env.example` for configuration options.

## Security Considerations

- Non-root user in container
- Health checks enabled
- No sensitive data in logs
- HIPAA-compliant data handling
- Secure database connections

## Troubleshooting

### Container won't start:
```bash
podman-compose logs app
```

### Database connection issues:
```bash
podman exec -it hl7-postgres pg_isready -U postgres
```

### Reset everything:
```bash
podman-compose down -v
podman-compose up -d --build
```

## License

MIT

## Author

Bob (AI Software Engineer)

## Version

1.0.0 - June 19, 2026