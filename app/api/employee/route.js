import connectMongoDB from "@/libs/mongodb";
import Employee from "@/models/employees";
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