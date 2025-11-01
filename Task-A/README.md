# Filter & Sorting (Task-A)

Simple records filtering/sorting demo (backend + frontend).

## Prerequisites

- Node.js (v16+ recommended)
- npm
- MongoDB instance (local or hosted)

## Quick start

1. Backend

```powershell
cd Task-A/backend
npm install
# create a .env file (see template below)
npm start
```

2. Frontend

```powershell
cd Task-A/frontend
npm install
npm start
```

Open the frontend URL printed by Vite (usually http://localhost:5173).

## Environment files

Create a `.env` file in `Task-A/backend` with the following keys (replace the values):

```
MONGO_URI=mongodb://localhost:27017/your-db-name
PORT=3000
```

Frontend: the frontend uses `VITE_API_BASE_URL`. Create a `.env` in `Task-A/frontend`:

```
VITE_API_BASE_URL=http://localhost:3000/api
```

If you host the backend elsewhere, update `VITE_API_BASE_URL` accordingly.

## Notes

- The backend exposes `/api/records` endpoints used by the frontend for filtering and sorting.
- If you need seed data, the backend includes a `seed` script defined in `package.json` (run `npm run seed`).
