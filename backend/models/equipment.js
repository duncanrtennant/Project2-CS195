import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
    equipmentName: {
        type: String,
        required: true,
    },
    damageLow: {
        type:Number,
        required:true,
    },
    damageHigh: {
        type: Number,
        required: true,
    },
    lore: {
        type: String,
    },
    equipped: {
        type: Boolean,
        required: true,
    }
});

export default mongoose.model("Equipment", equipmentSchema);