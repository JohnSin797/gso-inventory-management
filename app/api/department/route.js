import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Employee from "@/models/employees";
import Department from "@/models/department";
import Item from "@/models/items";

export async function GET () {
    try {
        await connectMongoDB();
        const employees = await Employee.find({}).populate('department').exec();
        return NextResponse.json({message: 'OK', data: employees}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}

export async function POST (request) {
    try {
        await connectMongoDB();
        const {month, year, department} = await request.json();
        let data = '';
        let startDate = new Date(year+'-01-01');
        let endDate = new Date(year+'-12-31');
        let total = 0;
        if(!month && !department) {
            data = await Item.find({
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                }
            }).populate('employee').populate('department').exec();
        }
        else if(!month) {
            const departmentObj = await Department.findOne({department_name: department});
            data = await Item.find({
                department: departmentObj,
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                }
            }).populate('employee').populate('department').exec();
        }
        else if(!department) {
            startDate = new Date(year+'-'+month+'-01');           
            endDate = new Date(year, month, 0, 23, 59, 59, 999);
            data = await Item.find({
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                }
            }).populate('employee').populate('department').exec();
        }
        else {
            startDate = new Date(year+'-'+month+'-01');           
            endDate = new Date(year, month, 0, 23, 59, 59, 999);
            const departmentObj = await Department.findOne({department_name: department});
            data = await Item.find({
                department: departmentObj,
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                }
            }).populate('employee').populate('department').exec();
        }
        return NextResponse.json({message: 'OK', data: data}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}