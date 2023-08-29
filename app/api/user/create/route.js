import connectMongoDB from "@/libs/mongodb";
import Employee from "@/models/employees";
import { NextResponse } from "next/server";

export async function POST (request) {
    try {
        const {first_name, last_name, username, password, department} = await request.json();
        await connectMongoDB();
        const employee = await Employee.findOne({username});
        if(employee) {
            return NextResponse.json({message: 'Username already exists'}, {status: 400});
        }
        await Employee.create({first_name, last_name, username, password, department});
        return NextResponse.json({message: 'Employee successfully added!'}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}