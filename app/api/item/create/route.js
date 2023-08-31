import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/items";
import { NextResponse } from "next/server";

export async function POST (request) {
    try {
        await connectMongoDB();
        const item = await request.json();
        const user = await request.cookies.get('token') || request.cookies.get('admin');
        const isItemAlreadyExist = await Item.findOne({barcode_text: item.barcode_text});
        if(isItemAlreadyExist) {
            return NextResponse.json({message: 'Already exists', data: {
                item_name: isItemAlreadyExist.item_name,
                barcode_text: isItemAlreadyExist.barcode_text
            }}, {status: 201});
        }
        const insertItem = {
            item_name: item.item_name,
            barcode_text: item.barcode_text,
            user_id: user.id
        }
        await Item.create(insertItem);
        return NextResponse.json({message: 'Item successfully created'}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}