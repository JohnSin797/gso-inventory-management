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
        remarks: String
    },
    {
        timestamps: true
    }
)

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);

export default Item;