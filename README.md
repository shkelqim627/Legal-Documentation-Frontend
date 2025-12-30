# Legal Document Search (Mock)

This repository contains a small production-ready example of a legal document search portal.

- React frontend (TypeScript) with a search UI
- Express backend (TypeScript) with a `/generate` endpoint that returns mock legal documents
- Dockerfiles and `docker-compose.yml` to run both services together
- `setup.sh` script for local development

## Quick start (Docker)

Prerequisites: Docker and Docker Compose installed.

1. Build and start services:

```bash
docker-compose up --build
```

2. Open the frontend at http://localhost:3000 and search any query.

3. The backend API will be available at http://localhost:8000/generate (JSON POST).

## Local development (no Docker)

1. Run the setup script (macOS / Linux):

```bash
./setup.sh
```

2. Start the backend in development mode:

```bash
cd backend
npm run dev
```

3. Start the frontend (from `frontend` folder):

```bash
cd frontend
npm start
```

## API Documentation

POST /generate

- Request body (application/json):

```json
{
	"query": "your search terms"
}
```

- Response (200):

```json
{
	"documents": [
		{
			"id": "doc1",
			"title": "Contract Law Fundamentals",
			"content": "...",
			"summary": "...",
			"relevance_score": 0.93
		}
	]
}
```

Error responses:
- 400: invalid or empty query
- 500: server error

## Project Structure

- `frontend/` — React app (components in `src/components`) and `Dockerfile` to build & serve via nginx
- `backend/` — Express TypeScript app with `/generate` and `Dockerfile`
- `docker-compose.yml` — runs both services
- `setup.sh` — installs dependencies for local development

## Notes & Next Steps

- The backend currently returns mock documents (3 hard-coded documents). Replace with DB or search service for production.
- Add authentication, rate-limiting, and logging for a production deployment.
