import mongoose, { Schema } from "mongoose";

const departmentSchema = new Schema(
    {
        department_name: {
            type: String,
            required: [true, "name is required"]
        },
        office_name: {
            type: String,
            required: [true, 'office is required'],
            unique: true
        },
        employees: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Employee'
            }
        ]
    },
    {
        timestamps: true
    }
)

const Department = mongoose.models.Department || mongoose.model("Department", departmentSchema);

export default Department;