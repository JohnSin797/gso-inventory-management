import connectMongoDB from "@/libs/mongodb";
import User from "@/models/users";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const {username, password} = await request.json();
        await connectMongoDB();
        const isAdminAlive = await User.findOne({role: 'admin'});
        console.log(isAdminAlive);
        if(!isAdminAlive) {
            const salt = await bcryptjs.genSalt(10);
            const pword = await bcryptjs.hash('Admin1234', salt);
            const adminSeeder = {
                first_name: 'first name',
                last_name: 'last name',
                username: 'admin',
                password: pword,
                role: 'admin'
            }
            await User.create(adminSeeder);
            return NextResponse.json({message: 'Please try again'}, {status: 400});
        }
        const user = await User.findOne({username});
        if(!user) {
            return NextResponse.json({message: "Invalid username"}, {status: 401});
        }
        const passwordValid = await bcryptjs.compare(password, user.password);
        if(!passwordValid) {
            return NextResponse.json({message: "Invalid password"}, {status: 402});
        }
        const userData = {
            id: user._id,
            username: user.username,
            firstName: user.first_name,
            lastName: user.last_name,
            role: user.role
        }
        const response = NextResponse.json({message: "Login successfully"}, {success: true});
        if(user.role == 'admin') {
            const admin = jwt.sign(userData, process.env.TOKEN_SECRET_KEY, {expiresIn: "1d"});
            response.cookies.set("admin", admin, {httpOnly:true});
        } 
        else {
            const token = jwt.sign(userData, process.env.TOKEN_SECRET_KEY, {expiresIn: "1d"});
            response.cookies.set("token", token, {httpOnly:true});
        }
        return response;
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}