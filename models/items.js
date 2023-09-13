import mongoose, { Schema } from "mongoose";
import Employee from "./employees";
import Department from "./department";

const itemSchema = new Schema(
    {
        item_name: {
            type: String,
            required: [true, 'item name is required']
        },
        barcode_text: {
            type: String,
            required: [true, 'barcode is required'],
            unique: true
        },
        quantity: {
            type: String,
            required: [true, 'quantity is required']
        },
        cost: {
            type: Number,
            required: [true, 'cost is required']
        },
        employee: {
            type: Schema.Types.ObjectId,
            ref: 'Employee',
        },
        department: {
            type: Schema.Types.ObjectId,
            ref: 'Department'
        },
        status: {
            type: String,
            default: 'working'
        },
        property_number: {
            type: String,
            required: [true, 'property number is required']
        },
        description: {
            type: String,
            required: [true, 'item description is required']
        },
        returned: {
            type: Boolean,
            default: false
        },
        remarks: String
    },
    {
        timestamps: true
    }
)

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);

export default Item;