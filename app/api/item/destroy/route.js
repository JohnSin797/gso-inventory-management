import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/items";
import User from "@/models/users";
import Notification from "@/models/notification";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST (request) {
    try {
        const {id} = await request.json();
        const token = await request.cookies.get('token')?.value || '';
        const decoded = await jwt.decode(token, {complete: true});
        await connectMongoDB();
        const user = await User.findOne({_id: decoded.payload.id}).exec();
        const result = await Item.findOneAndDelete({_id: id}).exec();
        if (!result) {
            return NextResponse.json({message: 'Failed to delete Item'}, {status: 402});
        }
        const notif = {
            user: user,
            message: 'You have deleted Item from the Archive'
        }
        await Notification.create(notif);
        return NextResponse.json({message: 'Item successfully deleted'}, 200);
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}