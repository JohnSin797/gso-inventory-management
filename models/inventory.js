import mongoose, { Schema } from "mongoose";
import Item from "./items";
import Employee from "./employees";
import Department from "./department";

const inventorySchema = new Schema(
    {
        item: {
            type: Schema.Types.ObjectId,
            ref: 'Item',
            required: [true, 'item is required']
        },
        employee: {
            type: Schema.Types.ObjectId,
            ref: 'Employee',
        },
        department: {
            type: Schema.Types.ObjectId,
            ref: 'Department',
        },
        inventory_tag: {
            type: String,
            required: [true, 'inventory tag is required']
        },
        initial_quantity: {
            type: Number,
            required: [true, 'quantity is required']
        },
        current_quantity: {
            type: Number,
            required: [true, 'quantity is required']
        },
        cost: {
            type: Number,
            required: [true, 'cost is required']
        },
        date_acquired: {
            type: Date,
            default: Date.now()
        },
        condemned: {
            type: Number,
            default: 0
        },
        remarks: String
    },
    {
        timestamps: true
    }
)

const Inventory = mongoose.models.Inventory || mongoose.model('Inventory', inventorySchema);

export default Inventory;