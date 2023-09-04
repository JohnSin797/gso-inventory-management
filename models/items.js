import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema(
    {
        item_name: {
            type: String,
            required: [true, 'item name is required']
        },
        barcode_text: {
            type: String,
            required: [true, 'barcode is required']
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'user not found']
        }
    },
    {
        timestamps: true
    }
)

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);

export default Item;