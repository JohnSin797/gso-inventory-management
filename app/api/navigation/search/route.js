import connectMongoDB from "@/libs/mongodb";
import Release from "@/models/release";
import Inventory from "@/models/inventory";
import Item from "@/models/items";
import Department from "@/models/department";
import Employee from "@/models/employees";
import User from "@/models/users";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        await connectMongoDB();
        const stocks = await Inventory.find({}).exec();
        const releases = await Release.find({}).populate('employee').exec();
        return NextResponse.json({message: 'OK', releases: releases, stocks: stocks}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}