const express = require("express");
const app = express();
const PORT = 3000;

// Simple logger middleware for all requests
app.use((req, res, next) => {
  console.info(`[INFO] ${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// Serve static files from 'public' folder
app.use(express.static("public"));

// SSE endpoint
app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // 👇 Important for proxies like Caddy
  res.flushHeaders();

  const sendEvent = setInterval(() => {
    res.write(`data: ${new Date().toLocaleTimeString()}\n\n`);
  }, 1000);

  req.on("close", () => {
    clearInterval(sendEvent);
    res.end();
    console.info(`[INFO] SSE connection closed for ${req.ip}`);
  });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${new Date().toISOString()} ${err.stack}`);
  res.status(500).send("Internal Server Error");
});

app.listen(PORT, () => {
  console.info(`[INFO] Server running on http://localhost:${PORT}`);
});
