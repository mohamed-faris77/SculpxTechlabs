# File Management (Task-B)

Simple file management app (backend + frontend).

## Prerequisites

- Node.js (v16+ recommended)
- npm
- MongoDB instance (local or hosted)

## Quick start

1. Backend

```powershell
cd Task-B/backend
npm install
# create a .env file (see template below)
npm start
```

2. Frontend

```powershell
cd Task-B/frontend
npm install
npm start
```

Open the frontend URL printed by Vite (usually http://localhost:5173).

## Environment files

Create a `.env` file in `Task-B/backend` with the following keys (replace the values):

```
MONGO_URI=mongodb://localhost:27017/your-db-name
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

Notes:
- `MONGO_URI` should point to your MongoDB; if using MongoDB Atlas, use the connection string they provide.
- `JWT_SECRET` is used to sign tokens (choose a long, random string).
- `PORT` is optional; defaults to `5000`.

Frontend: you can create a `.env` (in `Task-B/frontend`) with this value to point API calls to the backend:

```
VITE_API_URL=http://localhost:5000/api
```

If you host the backend elsewhere, update `VITE_API_URL` accordingly.

## Notes

- Uploads are stored to the `uploads/` directory in the backend. Ensure it's writable.
- To seed initial data, check backend utilities if present.
