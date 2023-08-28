import mongoose, { Schema } from "mongoose";

const departmentSchema = new Schema(
    {
        department_name: {
            type: String,
            required: [true, "first name is required"]
        },
    },
    {
        timestamps: true
    }
)

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;