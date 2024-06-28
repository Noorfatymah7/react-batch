import { NextResponse } from "next/server";
import Dbconnect from "@/Config/db";
import test from "@/Models/test";

Dbconnect();

export async function GET(req, { params }) {
  try {
    const response = await test.findById(params.id);
    if (response == null) {
      return NextResponse.json({
        message: "data is not availableeeeeeeee",
      });
    }
    return NextResponse.json({
      message: "deletedddddddd",
      test: response,
    });

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

export async function DELETE(req, { params }) {
  try {
    const res = await test.findByIdAndDelete(params.id);
    if (res == null) {
      return NextResponse.json({
        message: "not available",
      });
    }

    return NextResponse.json({
      message: "delete",
      data: res,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "error",
    });
  }
}