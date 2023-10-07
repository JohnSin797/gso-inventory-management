import connectMongoDB from "@/libs/mongodb";
import Department from "@/models/department";
import User from "@/models/users";
import { NextResponse } from "next/server";

export async function POST (request) {
    try {
        await connectMongoDB();
        const {_id, department_name, office_name} = await request.json();
        await Department.findByIdAndUpdate(_id, {department_name: department_name, office_name: office_name}).exec();
        return NextResponse.json({message: 'Department successfully updated'}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}