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
        // const userToken = await request.cookies.get('token')?.value || '';
        const isItemAlreadyExist = await Item.findOne({barcode_text: item.barcode_text}).exec();
        // const token = jwt.decode(userToken, {complete: true});
        if(isItemAlreadyExist) {
            console.log('asd')
            return NextResponse.json({message: 'Already exists', data: isItemAlreadyExist}, {status: 401});
        }
        // let employee = '';
        // let insertItem = '';
        // if(token.payload.role == 'admin') {
        //     insertItem = {
        //         item_name: item.item_name,
        //         barcode_text: item.item_code,
        //         quantity: item.quantity,
        //         cost: item.cost,
        //         property_number: item.property_number,
        //         description: item.description,
        //         remarks: item?.remarks
        //     }
        // }
        // else {
        //     employee = await Employee.findOne({username: token.payload.username});
        //     insertItem = {
        //         item_name: item.item_name,
        //         barcode_text: item.item_code,
        //         quantity: item.quantity,
        //         cost: item.cost,
        //         employee: employee._id,
        //         department: employee.department,
        //         property_number: item.property_number,
        //         description: item.description,
        //         remarks: item?.remarks
        //     }
        // }
        await Item.create(item);
        return NextResponse.json({message: 'Item successfully created'}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}