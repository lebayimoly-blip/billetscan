// stats.routes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    totalScans: 128,
    validBillets: 117,
    invalidBillets: 11,
    lastScan: '2025-11-06T23:30:00Z',
  });
});

module.exports = router;