import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Department from "@/models/department";

export async function POST (request) {
    try {
        await connectMongoDB();
        const {department_name} = await request.json();
        const isDepartmentInvalid = await Department.findOne({department_name});
        if(isDepartmentInvalid) {
            return NextResponse.json({message: 'Department name already exists'}, {status: 400});
        }
        await Department.create({department_name});
        return NextResponse.json({message: 'Department successfully added'}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}