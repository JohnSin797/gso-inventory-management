import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/items";
import Department from "@/models/department";
import Employee from "@/models/employees";
import Inventory from "@/models/inventory";
import { NextResponse } from "next/server";

export async function POST (request) {
    try {
        const {inventory_tag, quantity, cost, item_id, employee_id, remarks} = await request.json();
        await connectMongoDB();
        const item = await Item.findById(item_id).exec();
        const employee = await Employee.findById(employee_id).populate('department').exec();
        const department = await Department.findById(employee?.department?._id).exec();
        const initial_quantity = quantity;
        const current_quantity = quantity;
        await Inventory.create({item, employee, department, inventory_tag, initial_quantity, current_quantity, cost, remarks});
        return NextResponse.json({message: 'inventory stock successfully added'}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}