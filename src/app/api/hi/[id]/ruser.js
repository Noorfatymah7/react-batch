import { NextResponse } from "next/server";
import Dbconnect from "@/Config/db";
import user from "@/Models/user";

Dbconnect();

export async function GET(req, { params }) {
  try {
    const response = await user.findById(params.id);
    if (response == null) {
      return NextResponse.json({
        message: "data not available",
      });
    }
    return NextResponse.json({
      message: "deleted",
      user: response,
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
    const res = await user.findByIdAndDelete(params.id);
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