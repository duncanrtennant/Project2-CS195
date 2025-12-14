import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
    {
        equipmentId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Equipment",
            required: true,
        },
        equipped: {
            type: Boolean,
            default:false,
        }
    }
);

export default mongoose.model("Inventory",inventorySchema);