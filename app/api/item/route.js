import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/items";
import Employee from "@/models/employees";
import User from "@/models/users";
import Department from "@/models/department";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET (request) {
    try {
        await connectMongoDB();
        const token = await request.cookies.get('token')?.value || '';
        // if(token) {
        //     const userToken = jwt.decode(token, {complete: true});
        //     const user = await User.findById(userToken.payload.id);
        //     const employee = await Employee.findOne({username: user.username});
        //     const data = await Item.find({employee: employee}).populate('employee').populate('department').exec();
        //     return NextResponse.json({message: 'OK', data: data}, {status: 201});
        // }
        const items = await Item.find({}).populate('employee').populate('department').exec();
        return NextResponse.json({message: 'OK', data: items}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}

export async function POST (request) {
    try {
        await connectMongoDB();
        const {id} = await request.json();
        const item = await Item.findById(id).populate('employee').exec();
        return NextResponse.json({message: 'OK', data: item}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}