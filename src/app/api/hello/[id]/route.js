import blog from "@/Models/blog";
import { NextResponse } from "next/server";

// to make dynamic
export async function GET(req, { params }) {
  console.log(params.id);
  try {
    const response = await blog.findById(params.id);
    return NextResponse.json({ message: "dynaminc" }, { status: 401 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}

// to delete
export async function DELETE(req) {
  const body = await req.json();
  const { id } = body;
  console.log(id);
  try {
    const response = await blog.findByIdAndDelete(id);
    return NextResponse.json({
      message: "delete",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}

// to make new schemas
export async function POST(req) {
  const body = await req.json();
  try {
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
