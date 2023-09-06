import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/items";
import Employee from "@/models/employees";
import Department from "@/models/department";
import User from "@/models/users";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST (request) {
    try {
        await connectMongoDB();
        const item = await request.json();
        const userToken = await request.cookies.get('token')?.value || '';
        const adminToken = await request.cookies.get('admin')?.value || '';
        const isItemAlreadyExist = await Item.findOne({barcode_text: item.item_code});
        const token = jwt.decode(userToken, {complete: true});
        const admin = jwt.decode(adminToken, {complete: true});
        if(isItemAlreadyExist) {
            return NextResponse.json({message: 'Already exists', data: {
                item_name: isItemAlreadyExist.item_name,
                barcode_text: isItemAlreadyExist.item_code
            }}, {status: 201});
        }
        let employee = '';
        let insertItem = '';
        if(admin) {
            insertItem = {
                item_name: item.item_name,
                barcode_text: item.item_code,
                quantity: item.quantity,
                cost: item.cost,
            }
        }
        else {
            const user = await User.findById(token.payload.id);
            employee = await Employee.findOne({username: user.username});
            insertItem = {
                item_name: item.item_name,
                barcode_text: item.item_code,
                quantity: item.quantity,
                cost: item.cost,
                employee: employee._id,
                department: employee.department
            }
        }
        await Item.create(insertItem);
        return NextResponse.json({message: 'Item successfully created'}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}