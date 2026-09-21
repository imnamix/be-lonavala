# Lonavala Municipal Council — Backend API

RESTful API backend for the official digital civic and tourism portal of **Lonavala Municipal Council (लोणावळा नगर परिषद)**.

Built with **NestJS 10**, **TypeScript**, **PostgreSQL 17**, and **TypeORM**.

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Prerequisites](#prerequisites)
- [Quick Start (Local macOS Setup)](#quick-start-local-macos-setup)
- [Alternative: Docker Setup](#alternative-docker-setup)
- [Environment Configuration](#environment-configuration)
- [Database Migrations](#database-migrations)
- [Database Seeding](#database-seeding)
- [Available Endpoints & Contracts](#available-endpoints--contracts)
- [Frontend Integration & CORS](#frontend-integration--cors)
- [Cloudflare R2 Object Storage](#cloudflare-r2-object-storage)
- [Running Tests](#running-tests)
- [Troubleshooting](#troubleshooting)

---

## Architecture Overview

- **Framework**: NestJS 10 (Modular Monolith)
- **Database**: PostgreSQL 17 via TypeORM (production-ready migrations, no `synchronize: true`)
- **API Versioning**: Global `/api/v1` prefix
- **Documentation**: OpenAPI / Swagger UI at `/api/v1/docs`
- **Security**: Helmet security headers, CORS origin filtering, Throttler rate limiting (100 req/min)
- **Storage**: Pluggable storage abstraction with **Cloudflare R2** provider and AWS S3 compatibility
- **Authentication**: JWT-based Passport strategy with RBAC role guards

---

## Prerequisites

- **Node.js**: `v20` or `v22` (LTS recommended)
- **npm**: `v10+`
- **PostgreSQL**: `v16` or `v17` (via Homebrew or Docker)

---

## Quick Start (Local macOS Setup)

### 1. Install & Start PostgreSQL via Homebrew

```bash
# Install PostgreSQL 17
brew install postgresql@17

# Start the PostgreSQL service
brew services start postgresql@17

# Create the development database
createdb lonavala_mc_dev
```

### 2. Configure Environment Variables

```bash
cd be-lonavala
cp .env.example .env
```

Edit `.env` to match your local PostgreSQL username:

```env
NODE_ENV=development
PORT=3001
CORS_ORIGIN=http://localhost:3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_mac_username   # e.g. whoami
DB_PASSWORD=
DB_NAME=lonavala_mc_dev

JWT_SECRET=your_secret_key_here
```

### 3. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 4. Run Database Migrations & Seeds

```bash
# Run TypeORM migrations (creates all tables and schemas)
npm run migration:run

# Seed initial data (homepage slides, announcement bar, about-us data)
npm run seed
```

### 5. Start the Development Server

```bash
npm run start:dev
```

The server is available at:
- **API Base**: `http://localhost:3001/api/v1`
- **Swagger Docs**: `http://localhost:3001/api/v1/docs`
- **Health Check**: `http://localhost:3001/api/v1/health`

---

## Alternative: Docker Setup

If you prefer running PostgreSQL and Adminer via Docker:

```bash
# Start PostgreSQL 17 and Adminer
docker compose up -d

# Run migrations and seed
npm run migration:run
npm run seed

# Start server
npm run start:dev
```

* Adminer web interface is accessible at `http://localhost:8080` (System: PostgreSQL, Server: `postgres`, Username: `postgres`, Database: `lonavala_mc_dev`).

---

## Environment Configuration

| Variable | Description | Default |
|---|---|---|
| `NODE_ENV` | Application environment (`development` / `production`) | `development` |
| `PORT` | HTTP server port | `3001` |
| `CORS_ORIGIN` | Comma-separated list of allowed frontend origins | `http://localhost:3000` |
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_USERNAME` | PostgreSQL username | `postgres` |
| `DB_PASSWORD` | PostgreSQL password | `""` |
| `DB_NAME` | PostgreSQL database name | `lonavala_mc_dev` |
| `JWT_SECRET` | Secret key for signing and verifying JWTs | Required |
| `JWT_EXPIRY` | JWT expiration duration | `24h` |
| `STORAGE_PROVIDER` | Active storage provider (`r2` or `s3`) | `r2` |
| `R2_ACCOUNT_ID` | Cloudflare account ID | Optional for GET APIs |
| `R2_ACCESS_KEY_ID` | Cloudflare R2 Access Key ID | Optional for GET APIs |
| `R2_SECRET_ACCESS_KEY` | Cloudflare R2 Secret Access Key | Optional for GET APIs |
| `R2_BUCKET` | Cloudflare R2 bucket name | `lonavala-mc` |
| `R2_PUBLIC_URL` | Public CDN/domain for bucket assets | Optional |

---

## Database Migrations

TypeORM is configured with `synchronize: false` for safety. Schema changes are managed via explicit migration files:

```bash
# Generate a new migration from entity changes
npm run migration:generate -- src/database/migrations/YourMigrationName

# Apply all pending migrations
npm run migration:run

# Revert the latest migration
npm run migration:revert

# Show migration execution status
npm run migration:show
```

---

## Available Endpoints & Contracts

### 1. Health Check
`GET /api/v1/health`
```json
{
  "status": "ok",
  "info": {
    "database": {
      "status": "up"
    }
  },
  "error": {},
  "details": {
    "database": {
      "status": "up"
    }
  }
}
```

### 2. Homepage Content
`GET /api/v1/homepage`
```json
{
  "success": true,
  "data": {
    "homepage": {
      "announcement": "📢 Special Rebate on Property Tax Assessment 2024-25...",
      "announcementActive": true,
      "slides": [
        {
          "slideTitle": "Gateway to Hill Station Governance",
          "alignment": "left",
          "badgeEn": "Official Citizen & Tourism Portal",
          "badgeMr": "अधिकृत नागरिक व पर्यटन पोर्टल",
          "headlineEn": "Empowering Lonavala with Digital Governance & Tourism Excellence",
          "headlineMr": "डिजिटल सुशासन आणि पर्यटन विकासातून समृद्ध लोणावळा",
          "taglineEn": "Doorstep civic delivery, instant online grievance redressal...",
          "taglineMr": "नागरिकांसाठी तत्पर ऑनलाईन सेवा, तक्रार निवारण...",
          "mediaUrl": "https://images.unsplash.com/photo-...",
          "showButtons": true,
          "buttons": [
            {
              "name": "Explore Citizen Services",
              "url": "/services",
              "icon": "LayoutGrid",
              "color": "primary",
              "active": true
            }
          ],
          "showTags": true,
          "tags": [
            {
              "name": "Property Tax",
              "icon": "Building2",
              "active": true
            }
          ],
          "active": true
        }
      ]
    }
  }
}
```

### 3. About Us Details
`GET /api/v1/about-us`
```json
{
  "success": true,
  "data": {
    "aboutUs": {
      "title": "Lonavala Municipal Council (लोणावळा नगर परिषद)",
      "establishedYear": "1877",
      "yearsOfService": "147+ Years",
      "elevation": "622 m (2,041 ft)",
      "mediaUrl": "https://images.unsplash.com/photo-...",
      "description": "Lonavala Municipal Council is the urban local self-government authority...",
      "vision": "To build a smart, sustainable, environmentally resilient hill-station town...",
      "mission": [
        "Ensure 100% door-to-door solid waste segregation...",
        "Deliver 24x7 treated, potable drinking water supply..."
      ],
      "communique": {
        "officerName": "Shri. Pandit Patil (IAS/State Cadre)",
        "designation": "Chief Officer  (मुख्याधिकारी)",
        "phone": "+91 2114 273032",
        "email": "co@lonavalamc.gov.in",
        "mediaUrl": "https://images.unsplash.com/photo-...",
        "title": "Chief Officer's Communiqué",
        "subtitle": "A Personal Message from the Administrative Desk",
        "messageBody": "Lonavala has evolved from a serene Sahyadri hill retreat...",
        "signOff": "Lonavala Municipal Council — Committed to Public Good"
      }
    }
  }
}
```

---

## Frontend Integration & CORS

The backend is configured to allow cross-origin requests from the Next.js frontend running on `http://localhost:3000`.

To consume backend APIs from the frontend, add the following to your frontend `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

---

## Cloudflare R2 Object Storage

The storage module uses an abstract provider pattern (`StorageService`). By default, it targets **Cloudflare R2**:

- R2 uses the S3-compatible protocol.
- Set `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, and `R2_BUCKET` in `.env`.
- Uploads automatically validate file MIME types, file extensions, maximum size limits, and generate collision-safe UUID keys.
- If storage credentials are omitted, the application runs normally without blocking public GET endpoints.

---

## Running Tests

```bash
# Run unit tests
npm run test

# Run tests with code coverage
npm run test:cov

# Run E2E tests
npm run test:e2e
```

---

## Troubleshooting

### PostgreSQL connection failed
- Verify Homebrew service status: `brew services list | grep postgresql`
- Test connection manually: `psql -U $(whoami) -d lonavala_mc_dev -c "SELECT 1;"`
- Ensure `DB_USERNAME` in `.env` matches your macOS username or postgres user.

### Port conflict on 3001
- Change `PORT=3002` in `.env` and update the frontend `NEXT_PUBLIC_API_URL`.
