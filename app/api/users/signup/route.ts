import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/userModels";
import { connect } from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";
connect();
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, username } = body;
    const user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (user) {
      return NextResponse.json(
        { error: "Username or email  already exists" },
        { status: 400 }
      );
    }
    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, genSalt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    return NextResponse.json({
      userId: savedUser._id,
      Message: "User created successfully",
    });
  } catch (err:any) {
    console.log("Error occurred during sign in: " + err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
