const express = require('express');
const cors = require('cors');
const { nanoid } = require('nanoid');

const app = express();
app.use(cors());
app.use(express.json());

const urlStore = {};

app.post('/api/shorten', (req, res) => {
  const { originalUrl, expiresInDays } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: 'originalUrl is required' });
  }

  const shortCode = nanoid(6);
  const createdAt = new Date();
  const expiresAt = expiresInDays
    ? new Date(createdAt.getTime() + expiresInDays * 86400000)
    : null;

  urlStore[shortCode] = {
    originalUrl,
    shortCode,
    createdAt,
    expiresAt,
    clickCount: 0
  };

  return res.status(201).json({
    shortCode,
    shortUrl: `http://localhost:5000/${shortCode}`,
    originalUrl,
    expiresAt
  });
});

app.get('/:shortCode', (req, res) => {
  const entry = urlStore[req.params.shortCode];

  if (!entry) {
    return res.status(404).json({ error: 'Short URL not found' });
  }

  if (entry.expiresAt && new Date() > entry.expiresAt) {
    return res.status(410).json({ error: 'This URL has expired' });
  }

  entry.clickCount++;
  return res.redirect(entry.originalUrl);
});

app.get('/api/analytics', (req, res) => {
  const data = Object.values(urlStore);
  return res.status(200).json(data);
});

app.delete('/api/delete/:shortCode', (req, res) => {
  const { shortCode } = req.params;
  if (!urlStore[shortCode]) {
    return res.status(404).json({ error: 'Not found' });
  }
  delete urlStore[shortCode];
  return res.status(200).json({ message: 'Deleted successfully' });
});

app.listen(5000, () => console.log('Server running on port 5000'));