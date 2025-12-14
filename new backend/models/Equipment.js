import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
    equipmentName: {
        type: String,
        required: true,
    },
    damageLow: {
        type:Number,
        required:true,
        min:0,
    },
    damageHigh: {
        type: Number,
        required: true,
        min:1,
    },
    lore: {
        type: String,
        required: false,
    },
    equipped: {
        type: Boolean,
        default: false,
    }
});

export default mongoose.model("Equipment", equipmentSchema);