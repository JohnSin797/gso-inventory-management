import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Department from "@/models/department";

export async function POST (request) {
    try {
        await connectMongoDB();
        const office = await request.json();
        const result = await Department.create(office);
        if(!result) {
            return NextResponse.json({message: 'Failed'}, {status: 401});
        }
        return NextResponse.json({message: 'Department successfully added'}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}