import connectMongoDB from "@/libs/mongodb";
import User from "@/models/users";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST (request) {
    try {
        const {first_name, last_name, username, password, department} = await request.json();
        await connectMongoDB();
        const user = await User.findOne({username});
        if(user) {
            return NextResponse.json({message: 'Username already exists'}, {status: 400});
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        await User.create({first_name, last_name, username, hashedPassword, department});
        return NextResponse.json({message: 'Employee successfully added!'}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}