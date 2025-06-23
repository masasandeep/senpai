import User from "@/app/models/userModels";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConfig";
connect()
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    const response = NextResponse.json({
      userId: user._id,
      message: "Login successful",
    });
    const token = await jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET_KEY!,
      {
        expiresIn: "1d",
      }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
