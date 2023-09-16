import connectMongoDB from "@/libs/mongodb";
import User from "@/models/users";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const {first_name, last_name, username, password} = await request.json();
        await connectMongoDB();
        await User.create({first_name, last_name, username, password});
        const data = await User.find({role: 'user'});
        return NextResponse.json({message: "User successfully created!", data: data}, {status: 201});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}