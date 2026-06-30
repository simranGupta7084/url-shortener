```markdown
# Shortly — URL Shortener ✂️

> A full-stack URL shortener with real-time click analytics, expiry control, and a clean dark UI.

![Shortly App](screenshot-shorten.png)

---

## What It Does

Most URL shorteners just shorten links. Shortly also tracks every click, shows you which links are still active, and automatically marks expired links as **410 Gone** — the correct HTTP status for a resource that existed but is permanently unavailable.

Built from scratch with a Node.js + Express backend and a React frontend. No database — uses in-memory storage to keep the architecture simple and fully understandable.

---

## Screenshots

**Shorten a URL**

![Shorten Page](screenshot-shorten.png)

**Analytics Dashboard**

![Analytics Page](screenshot-analytics.png)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Axios, CSS3 |
| Backend | Node.js, Express |
| ID Generation | nanoid v3 |
| Styling | Custom CSS — no frameworks |

---

## Features

- 🔗 Shorten any URL to a 6-character short code
- ⏰ Optional expiry — set how many days a link stays active
- 💀 Expired URLs return **HTTP 410 Gone** (not 404 — intentional)
- 👆 Click tracking — every redirect increments the counter
- 📊 Real-time analytics dashboard with total clicks and active link count
- 🗑️ Delete any short URL instantly
- 📋 Copy to clipboard with one click
- ✅ Empty state handling — no blank pages

---

## API Endpoints

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| POST | `/api/shorten` | Create a short URL | 201 + shortCode |
| GET | `/:shortCode` | Redirect to original URL | 302 redirect |
| GET | `/api/analytics` | Get all URLs with click counts | 200 + array |
| DELETE | `/api/delete/:shortCode` | Delete a short URL | 200 + message |

### Request Body — POST /api/shorten

```json
{
  "originalUrl": "https://example.com/very/long/url",
  "expiresInDays": 7
}
```

### Error Responses

| Status | Meaning |
|--------|---------|
| 400 | originalUrl missing from request body |
| 404 | Short code does not exist |
| 410 | Short URL existed but has expired |

---

## Run Locally

**Prerequisites:** Node.js v18+, npm

**1. Clone the repo**
```bash
git clone https://github.com/simranGupta7084/url-shortener.git
cd url-shortener
```

**2. Start the backend**
```bash
cd url-shortener-backend
npm install
node server.js
# Server running on http://localhost:5000
```

**3. Start the frontend**
```bash
cd url-shortener-frontend
npm install
npm start
# App running on http://localhost:3000
```

> Keep both terminals open. Frontend fetches from backend on port 5000.

---

## Project Structure

```
url-shortener/
├── url-shortener-backend/
│   ├── server.js          # Express server — all 4 API endpoints
│   ├── package.json
│   └── .gitignore
├── url-shortener-frontend/
│   ├── src/
│   │   ├── App.js                    # Root component — state management
│   │   ├── App.css                   # All styles
│   │   └── components/
│   │       ├── ShortenForm.jsx       # URL input + result display
│   │       └── Analytics.jsx         # Dashboard + URL cards
│   ├── package.json
│   └── .gitignore
└── README.md
```

---

## Key Design Decisions

**Why 410 instead of 404 for expired URLs?**
404 means a resource was never found. 410 Gone means it existed but is permanently unavailable. Expired short URLs fall into the 410 category — they existed, they worked, now they don't.

**Why in-memory storage?**
Keeps the architecture simple and fully within a single file. In production this would be replaced with Redis for the URL store and a persistent database for analytics.

**Why nanoid?**
Generates URL-safe random strings with extremely low collision probability. At 6 characters with nanoid's alphabet (64 characters), there are 64^6 = 68 billion possible codes.

---

## Author

**Simran Gupta**  
B.Tech CSE (Data Science) — Maharana Pratap Engineering College, Kanpur  
[GitHub](https://github.com/simranGupta7084)
