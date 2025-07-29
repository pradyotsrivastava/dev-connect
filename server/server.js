// Path: server\server.js

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorMiddleware.js";
import routes from "./routes/index.js";

dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL || "*",
];

// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("Not allowed by CORS"));
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json());

// API Routes
app.use("/api", routes);

// Health check
app.get("/", (req, res) => {
  res.status(200).send("DevConnect Backend Running");
});

// Error handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
