import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/items";
import Employee from "@/models/employees";
import Department from "@/models/department";
import User from "@/models/users";
import { NextResponse } from "next/server";

export async function POST (request) {
    try {
        await connectMongoDB();
        const {
            employeeId,
            item_id,
            item_name,
            barcode_text,
            property_number,
            description,
            quantity,
            cost,
            remarks,
            status,
            returned
        } = await request.json();
        const employee = await Employee.findById(employeeId).exec();
        await Item.findByIdAndUpdate(item_id, {
            item_name,
            barcode_text,
            property_number,
            description,
            quantity,
            cost,
            employee,
            remarks,
            status,
            returned
        }).exec();
        return NextResponse.json({message: 'Item updated successfully'}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}