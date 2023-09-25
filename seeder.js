import connectMongoDB from "./libs/mongodb.js";
import User from "./models/users.js";
import bcryptjs from "bcryptjs";

async function seed_user () {
    try {
        await connectMongoDB();
        const salt = await bcryptjs.genSalt(10);
        const pword = await bcryptjs.hash('Admin1234', salt);
        const admin = {
            first_name: 'first name',
            last_name: 'last name',
            username: 'admin',
            password: pword,
            default: 'Admin1234',
            role: 'admin',
        };
        await User.create(admin);
        console.log('Seeding complete: new admin successfully created.');
    } catch (error) {
        console.log(error.message)
    }
}

seed_user();