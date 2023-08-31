import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/items";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        await connectMongoDB();
        const items = await Item.find({});
        return NextResponse.json({message: 'OK', data: items}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}