import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Department from "@/models/department";

export async function POST (request) {
    try {
        await connectMongoDB();
        const {_id} = await request.json();
        await Department.findByIdAndUpdate(_id, {deletedAt: new Date()}).exec();
        return NextResponse.json({message: 'Department successfully deleted'}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}