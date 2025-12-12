import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import equipmentRoutes from "./routes/equipments.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/equipment", checkInRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(
    `\nLightweight dungeon API running on http://localhost:${PORT}`
  );
});
