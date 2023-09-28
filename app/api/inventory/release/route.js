import connectMongoDB from "@/libs/mongodb";
import Release from "@/models/release";
import Inventory from "@/models/inventory";
import Employee from "@/models/employees";
import User from "@/models/users";
import { NextResponse } from "next/server";

export async function POST (request) {
    try {
        await connectMongoDB();
        
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}