import connectToDB from "@/utils/dbConfig.js";
import User from "@/models/user"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export async function POST(request: NextRequest) {
    await connectToDB();
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }
        //check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid Password" }, { status: 401 })
        }
        //creating token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.NEXT_TOKEN_SECRET!, { expiresIn: "1h" })
        const resp = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        resp.cookies.set("token", token, {
            httpOnly: true,
        })

        return resp;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}