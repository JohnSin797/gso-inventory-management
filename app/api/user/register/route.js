import connectMongoDB from "@/libs/mongodb";
import User from "@/models/users";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
    const {first_name, last_name, username, passWord} = await request.json();
    await connectMongoDB();
    const salt = await bcryptjs.genSalt(10);
    const password = await bcryptjs.hash(passWord, salt);
    await User.create({first_name, last_name, username, password});
    return NextResponse.json({message: "User successfully created!"}, {status: 201});
}