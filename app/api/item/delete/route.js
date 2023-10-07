import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/items";
import Employee from "@/models/employees";
import Department from "@/models/department";
import User from "@/models/users";
import { NextResponse } from "next/server";

export async function POST (request) {
    try {
        const {id} = await request.json();
        await connectMongoDB();
        await Item.findByIdAndUpdate(id, {deletedAt: new Date()});
        const newItems = await Item.find({}).populate('user').exec();
        return NextResponse.json({message: 'Item deleted successfully', data: newItems}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}