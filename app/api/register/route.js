import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectMongoDB } from "@/db/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const {name, email, password } = await req.json();
    const hashPassword = await bcrypt.hash(password, 10);

    await connectMongoDB();
    await User.create({name, email, password: hashPassword });

    return NextResponse.json({ message: "user registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: " an error occured while registering" },
      { status: 500 }
    );
  }
}
