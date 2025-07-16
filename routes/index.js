// routes/index.js
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send(`
    <h1>🌌 Welcome to the Solar System API</h1>
    <p>Explore planets and moons of our solar system using the documented API endpoints.</p>
    <p>Visit <a href="/api-docs">API Docs</a> to get started.</p>
  `);
});

export default router;
