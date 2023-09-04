import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Employee from "@/models/employees";
import Department from "@/models/department";

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
        let startDate = '';
        let endDate = '';
        let data = '';
        startDate = new Date(year+'-01-01');
        endDate = new Date(year+'-12-31');
        if(!month && !department) {
            data = await Employee.find({
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                }
            }).populate('department').exec();
        }
        else if(!month) {
            const departmentObj = await Department.findOne({department_name: department});
            data = await Employee.find({
                department: departmentObj,
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                }
            }).populate('department').exec();
        }
        else if(!department) {
            startDate = new Date(year+'-'+month+'-01');           
            endDate = new Date(year, month, 0, 23, 59, 59, 999);
            data = await Employee.find({
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                }
            }).populate('department').exec();
        }
        else {
            startDate = new Date(year+'-'+month+'-01');           
            endDate = new Date(year, month, 0, 23, 59, 59, 999);
            const departmentObj = await Department.findOne({department_name: department});
            console.log(departmentObj)
            data = await Employee.find({
                department: departmentObj,
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                }
            }).populate('department').exec();
        }
        return NextResponse.json({message: 'OK', data: data}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}