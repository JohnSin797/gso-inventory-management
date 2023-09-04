import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema(
    {
        first_name: {
            type: String,
            required: [true, "first name is required"]
        },
        last_name: {
            type: String,
            required: [true, "last name is required"]
        },
        username: {
            type: String,
            required: [true, "username is required"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "password is required"]
        },
        department: {
            type: Schema.Types.ObjectId,
            ref: 'Department',
            required: [true, "department is required"]
        },
        forgotPasswordToken: String,
        forgotPasswordTokenExpiry: Date,
        verifyToken: String,
        verifyTokenExpiry: Date,
    },
    {
        timestamps: true
    }
)

const Employee = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default Employee;