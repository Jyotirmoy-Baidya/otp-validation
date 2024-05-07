import { getDataFromToken } from "@/utils/getTokenFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import connectToDB from "@/utils/dbConfig";

connectToDB();

export async function GET(request: NextRequest) {
    try {
        const UserId = await getDataFromToken(request);
        //user will come without the password simple put the minus sign
        const user = await User.findOne({ _id: UserId }).select("-password")
        return NextResponse.json({ message: "User Found", data: user });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}