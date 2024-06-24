import Dbconnect from "@/Config/db";
import blog from "@/Models/blog";
import { NextResponse } from "next/server";

Dbconnect();

export async function POST(req) {
  try {
    const body = await req.json();
    const response = await blog.create(body);

    return NextResponse.json({
      message: response,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: error,
    });
  }
}

export async function GET(req) {
  try {
    const response = await blog.find()
    return NextResponse.json({ message: response });

    
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}

export async function DELETE(req) {
  const body = await req.json()
  const {id} = body
  console.log(id)
  try {
    const response = await blog.findByIdAndDelete(id)
    return NextResponse.json({ message: response });

    
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}