import express from "express";
import Equipment from "../models/Equipment.js";

const router = express.Router();

// POST new equipment
router.post("/", async(req, res) => {
  try {
    const newEquipment = new Equipment(req.body);
    const savedEquipment = await newEquipment.save();
    res.status(201).json(savedEquipment);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});
// GET all equipment
router.get("/", async(req, res) => {
  try {
    const equipments = await Equipment.find();
    res.status(200).json(equipments);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});
// GET all carried equipment
router.get("/carried", async(req, res) => {
  try {
    const equipments = await Equipment.find({carried:'true'});
    res.status(200).json(equipments);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});
// GET equipment by id
router.get("/:id", async(req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({
        message: 'Equipment not found'
      });
    }

    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
});
// PUT updated equipment by id
router.put("/:id", async(req, res) => {
  try {
    const equipment = await Equipment.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { 
        new: true,           // Return updated version
        runValidators: true  // Check schema rules
      }
    );

    if (!equipment){
      return res.status(404).json({
        message: 'Equipment not found'
      });
    }

    res.status(200).json(equipment);
  } catch (error) {
    res.status(400).json({ message: error.message});
  }
});
// DELETE equipment by id
router.delete("/:id", async(req, res) => {
  try {
    const equipment = await Equipment.findByIdAndDelete(
      req.params.id, 
    );

    if (!equipment){
      return res.status(404).json({
        message: 'Equipment not found'
      });
    }

    res.status(200).json({
      message: `Equipment deleted successfully`,
      equipment: equipment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
});



export default router;