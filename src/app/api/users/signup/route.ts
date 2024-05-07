//How to handle different request methods
// GET, POST, DELETE etc

import connectToDB from "@/utils/dbConfig.js";
import User from "@/models/user"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { sendEmail } from "@/utils/mailer";


export async function POST(request: NextRequest) {
    try {
        await connectToDB();
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        console.log(reqBody);

        //Check is user already exists
        const user = await User.findOne({ email });

        if (user) {
            console.log("sss", user);
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        console.log("Sssssss");
        //HassPassword
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();

        console.log(newUser);

        //send verify email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser,
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
