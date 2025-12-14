import express from "express";
import Inventory from "../models/Inventory.js";

const router = express.Router();

// POST new equipment to inventory
router.post("/", async(req, res) => {
  try {
    const newInventory = new Inventory(req.body);
    const savedInventory = await newInventory.save();
    res.status(201).json(savedInventory);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});
// GET all inventories
router.get("/", async(req, res) => {
  try{
    const inventories = await Inventory.find().populate('equipmentId');
    res.status(200).json(inventories);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

export default router;