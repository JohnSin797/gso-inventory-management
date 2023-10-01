import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/items";
import Employee from "@/models/employees";
import Department from "@/models/department";
import User from "@/models/users";
import { NextResponse } from "next/server";

export async function POST (request) {
    try {
        await connectMongoDB();
        const {_id, item_name, property_number, description, barcode_text, unit} = await request.json();
        const result = await Item.findByIdAndUpdate({_id: _id}, {item_name: item_name, property_number: property_number, description: description, barcode_text: barcode_text, unit: unit}).exec();
        if(!result) {
            return NextResponse.json({message: 'Update failed'}, {status: 401});
        }
        return NextResponse.json({message: 'Item updated successfully'}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}