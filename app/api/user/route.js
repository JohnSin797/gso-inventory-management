import connectMongoDB from "@/libs/mongodb";
import User from "@/models/users";
import { NextResponse } from "next/server";

export async function POST(request) {
    const {username} = await request.json();
    await connectMongoDB();
    const user = await User.findOne({username});
    if(user) {
        return NextResponse.json({message: "User already exists"}, {status: 201});
    }
    return NextResponse.json({message: "User does not exist"}, {status: 400});
}