import connectMongoDB from "@/libs/mongodb";
import User from "@/models/users";
import { NextResponse } from "next/server";

export async function POST(request) {
    const {first_name, last_name, username, password} = await request.json();
    await connectMongoDB();
    await User.create({first_name, last_name, username, password});
    return NextResponse.json({message: "User successfully created!"}, {status: 201});
}