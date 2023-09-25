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
        description: {
            type: String,
            require: [true, 'description is required']
        },
        property_number: {
            type: String,
            required: [true, 'property number is required']
        }
    },
    {
        timestamps: true
    }
)

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);

export default Item;