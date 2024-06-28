import Dbconnect from "@/Config/db";
import Blog from "@/Models/Blog";
import { NextResponse } from "next/server";

Dbconnect();

export async function POST(req) {
  try {
    const data = await req.json();
    const response = await Blog.create(data);
    return NextResponse.json(
      {
        success: true,
        message: response,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    const res = await Blog.find();
    return NextResponse.json(
      {
        success: true,
        message: res,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error,
      },
      {
        status: 500,
      }
    );
  }
}
