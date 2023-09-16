import connectMongoDB from "@/libs/mongodb";
import Employee from "@/models/employees";
import Department from "@/models/department";
import Item from "@/models/items";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongoDB();
        const employees = await Employee.find({}).populate('department').exec();
        return NextResponse.json({message: 'OK', data: employees}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function POST (request) {
    try {
        await connectMongoDB();
        const {first_name, last_name, position, employment_status, dep} = await request.json();
        const department = await Department.findById(dep).exec();
        await Employee.create({first_name, last_name, position, employment_status, department});
        return NextResponse.json({message: 'Employee successfully created'}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}