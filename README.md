Legal Document Search – Frontend

This repository contains the frontend for a legal document search portal.
It is a production-ready React application built with TypeScript.

Features

React + TypeScript

Clean search UI for legal documents

Displays document title, summary, content, and relevance score

Docker support for production builds

Tech Stack

React (TypeScript)

Nginx (when using Docker)

Quick Start (Docker)
Prerequisites

Docker

Docker Compose

Run the frontend
docker build -t legal-search-frontend .
docker run -p 3000:80 legal-search-frontend


Open the app at:
👉 http://localhost:3000

Local Development (No Docker)
Prerequisites

Node.js (18+ recommended)

npm or yarn

Steps
cd frontend
npm install
npm start


The app will run at:
👉 http://localhost:3000

Project Structure
frontend/
├── src/
│   ├── components/    # UI components
│   ├── pages/         # Page-level components
│   └── App.tsx
├── public/
├── Dockerfile
└── package.json
