import connectMongoDB from "@/libs/mongodb";
import Inventory from "@/models/inventory";
import Item from "@/models/items";
import Employee from "@/models/employees";
import Department from "@/models/department";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        await connectMongoDB();
        const data = await Inventory.find({deletedAt: null}).populate('item').populate('user').exec();
        const employees = await Employee.find({}).exec();
        return NextResponse.json({message: 'OK', data: data, employees: employees}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}