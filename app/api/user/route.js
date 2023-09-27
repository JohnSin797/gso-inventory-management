import connectMongoDB from "@/libs/mongodb";
import User from "@/models/users";
import jwt from "jsonwebtoken";
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

export async function GET(request) {
    try {
        const token = await request.cookies.get('token')?.value || '';
        const decoded = jwt.decode(token, {complete: true});
        const data = await User.findById(decoded.payload.id).exec();
        console.log(data);
        return NextResponse.json({message: 'OK', data: data}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}