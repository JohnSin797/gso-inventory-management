import connectMongoDB from "@/libs/mongodb";
import Employee from "@/models/employees";
import Department from "@/models/department";
import Item from "@/models/items";
import { NextResponse } from "next/server";

export async function POST (request) {
    try {
        await connectMongoDB();
        const {id} = await request.json();
        const result = await Employee.findByIdAndUpdate(id, {deletedAt: new Date()}).exec();
        if(!result) {
            return NextResponse.json({message: 'Failed to delete employee'}, {status: 401});
        }
        return NextResponse.json({message: 'Employee deleted successfully'}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}