import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/items";
import Employee from "@/models/employees";
import Department from "@/models/department";
import Inventory from "@/models/inventory";
import Release from "@/models/release";
import { NextResponse } from "next/server";

export async function POST (request) {
    try {
        await connectMongoDB();
        const {id, month, year} = await request.json();
        let startDate = new Date(year+'-01-01');
        let endDate = new Date(year+'-12-31');
        if(!id && !month) {
            const data = await Release.find({createdAt: {$gte: startDate, $lte: endDate}}).populate('inventory').populate('item').populate('employee').populate('department').exec();
            return NextResponse.json({message: 'OK', data: data}, {status: 201});
        }
        else if(!month) {
            const employee = await Employee.findOne({_id: id}).exec();
            const data = await Release.find({employee: employee, createdAt: {$gte: startDate, $lte: endDate}}).populate('inventory').populate('item').populate('employee').populate('department').exec();
            return NextResponse.json({message: 'OK', data: data}, {status: 202});
        }
        else if(!id) {
            startDate = new Date(year+'-'+month+'-01');           
            endDate = new Date(year, month, 0, 23, 59, 59, 999);
            const data = await Release.find({createdAt: {$gte: startDate, $lte: endDate}}).populate('inventory').populate('item').populate('employee').populate('department').exec();
            return NextResponse.json({message: 'OK', data: data}, {status: 200});
        }
        else {
            const employee = await Employee.findOne({_id: id}).exec();
            startDate = new Date(year+'-'+month+'-01');           
            endDate = new Date(year, month, 0, 23, 59, 59, 999);
            const data = await Release.find({employee: employee, createdAt: {$gte: startDate, $lte: endDate}}).populate('inventory').populate('item').populate('employee').populate('department').exec();
            return NextResponse.json({message: 'OK', data: data}, {status: 200});
        }
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}