import mongoose, { Schema } from "mongoose";
import Item from "./items";
import User from "./users";

const inventorySchema = new Schema(
    {
        item: {
            type: Schema.Types.ObjectId,
            ref: 'Item',
            required: [true, 'item is required']
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'user is ']
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
        quantity: {
            type: Number,
            required: [true, 'quantity is required']
        },
        released: {
            type: Number,
            default: 0
        },
        condemned: {
            type: Number,
            default: 0
        },
        stock: {
            type: Number,
            required: [true, 'stock is required']
        },
        unit_cost: {
            type: Number,
            required: [true, 'unit cost is required']
        },
        total_cost: {
            type: Number,
            required: [true, 'total cost is required']
        },
        date_acquired: {
            type: Date,
            default: Date.now()
        },
        source_fund: {
            type: String,
            required: [true, 'source of funds is required']
        },
        deletedAt: {
            type: Date,
            default: null
        },
        remarks: String
    },
    {
        timestamps: true
    }
)

const Inventory = mongoose.models.Inventory || mongoose.model('Inventory', inventorySchema);

export default Inventory;