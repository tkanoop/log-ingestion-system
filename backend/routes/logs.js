const express = require('express');
const fs = require('fs');
const path = require('path');
const validateLog = require('../utils/validateLog');

const router = express.Router();
const dbPath = path.join(__dirname, '..', 'db', 'logs.json');

// Helper: Read logs from file
function readLogs() {
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data);
}

// Helper: Write logs to file
function writeLogs(logs) {
  fs.writeFileSync(dbPath, JSON.stringify(logs, null, 2));
}

// POST /logs – Add a new log
router.post('/', (req, res) => {
  const log = req.body;
  if (!validateLog(log)) {
    return res.status(400).json({ error: 'Invalid log format' });
  }

  const logs = readLogs();
  logs.push(log);
  writeLogs(logs);

  res.status(201).json(log);
});


router.get('/', (req, res) => {
  let logs = readLogs();


  const {
    level, message, resourceId,
    timestamp_start, timestamp_end,
    traceId, spanId, commit
  } = req.query;
  // Apply filters
  if (level) logs = logs.filter(log => log.level.toLowerCase().includes(level.toLowerCase()));
  if (message) logs = logs.filter(log => log.message.toLowerCase().includes(message.toLowerCase()));
  if (resourceId) logs = logs.filter(log => log.resourceId.toLowerCase().includes(resourceId.toLowerCase()));
  if (timestamp_start) logs = logs.filter(log => new Date(log.timestamp) >= new Date(timestamp_start));
  if (timestamp_end) logs = logs.filter(log => new Date(log.timestamp) <= new Date(timestamp_end));
  if (traceId) logs = logs.filter(log => log.traceId === traceId);
  if (spanId) logs = logs.filter(log => log.spanId === spanId);

  // Sort in reverse chronological order
  logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  res.json(logs);
});

module.exports = router;
