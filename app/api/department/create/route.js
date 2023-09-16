import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Department from "@/models/department";

export async function POST (request) {
    try {
        await connectMongoDB();
        const {department_name, office_name} = await request.json();
        await Department.create({department_name, office_name});
        return NextResponse.json({message: 'Department successfully added'}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}