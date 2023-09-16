import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/items";
import Employee from "@/models/employees";
import Department from "@/models/department";
import { NextResponse } from "next/server";

export async function POST (request) {
    try {
        await connectMongoDB();
        const {id} = await request.json();
        if(!id || id == '') {
            const data = await Item.find({}).populate('employee').populate('department').exec();
            return NextResponse.json({message: 'OK', data: data}, {status: 200});
        }
        const employee = await Employee.findById(id).exec();
        const data = await Item.find({employee}).populate('employee').populate('department').exec();
        return NextResponse.json({message: 'OK', data: data}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}