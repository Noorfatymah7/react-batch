import Dbconnect from "@/Config/db";
import Blog from "@/Models/Blog";
import { NextResponse } from "next/server";

Dbconnect();

export async function GET(req, { params }) {
  try {
    const response = await Blog.findById(params.id);
    if (!response) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not available!",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: response,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        success: false,
        message: e,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const res = await Blog.findByIdAndDelete(params.id);
    if (!res) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog Not Available",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Blog Deleted ",
      },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        success: false,
        message: e,
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const res = await Blog.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    );
    if (!res) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog Not Available",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Blog Updated ",
      },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        success: false,
        message: e,
      },
      {
        status: 500,
      }
    );
  }
}
