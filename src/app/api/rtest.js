import { NextResponse } from "next/server";
import Dbconnect from "@/Config/db";
import test from "@/Models/test";

Dbconnect();

export async function POST(req) {
  try {
    const data = await req.json();
    const response = await test.create(data);
    return NextResponse.json({
      message: response,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "error",
    });
  }
}

export async function GET() {
  try {
    const res = await test.find();
    return NextResponse.json({
      message: res,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "error",
    });
  }
}