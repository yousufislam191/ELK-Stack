// index.js
const express = require("express");
const logger = require("./config/logger");
const requestLogger = require("./middleware/requestLogger");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(requestLogger);

// Routes
app.use("/api", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error("Unhandled error", {
        error: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
    });
    res.status(500).json({ error: "Internal server error" });
});

// Start server
app.listen(PORT, () => {
    logger.info("Server started", {
        port: PORT,
        environment: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString(),
    });
});

// Example usage of different log levels
process.on("uncaughtException", (error) => {
    logger.error("Uncaught exception", {
        error: error.message,
        stack: error.stack,
    });
    process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
    logger.error("Unhandled rejection", {
        reason: reason,
        stack: reason.stack,
    });
});
