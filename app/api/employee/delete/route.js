import connectMongoDB from "@/libs/mongodb";
import Employee from "@/models/employees";
import Department from "@/models/department";
import Item from "@/models/items";
import { NextResponse } from "next/server";

export async function POST (request) {
    try {
        await connectMongoDB();
        const {id} = await request.json();
        await Employee.findByIdAndDelete(id).exec();
        const employee = await Employee.find({}).populate('department').exec();
        const item = await Item.find({}).populate('employee').populate('department').exec();
        return NextResponse.json({message: 'Employee deleted successfully', employee: employee, item: item}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}