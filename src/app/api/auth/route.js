import Dbconnect from "@/Config/db";
import User from "@/Models/User";
import { NextResponse } from "next/server";

Dbconnect()

export async function POST(req) {
    try {
      const body = await req.json()
      const res = await User.create(body);

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
          success: false,
          message: error,
        },
        {
          status: 500,
        }
      );
    }
}

  