import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import equipmentRoutes from "./routes/equipments.js";
import inventoryRoutes from "./routes/inventories.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ Error:", error));


// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Lightweight dungeon API",
    status: "Running",
    endpoints: {
      equipments: "/api/equipments",
      sessions: "/api/inventories",
    },
  });
});

// Routes
app.use("/api/equipments", equipmentRoutes);
app.use("/api/inventories", inventoryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
