import Dbconnect from "@/Config/db";
import { GenAccessToken } from "@/Helper/jwt";
import User from "@/Models/User";
import { cookies } from 'next/headers'
import { NextResponse } from "next/server";

Dbconnect();

export async function POST(req) {
  try {
    const { Email, Password } = await req.json();

    const user = await User.findOne({ Email: Email });

    if(!user){
        return NextResponse.json(
            {
              success: false,
              message: "No Account Associated with This Email",
            },
            {
              status: 200,
            }
          );
    }

    const passwordmatch = user?.Password === Password

    if (!passwordmatch) {
        return NextResponse.json(
            {
              success: false,
              message: "Password Is Incorrect",
            },
            {
              status: 200,
            }
          );
    }

    const AccessToken = await GenAccessToken({
      id:user._id,
      username:user.Username
    })

    cookies().set("Token",AccessToken)

    return NextResponse.json(
        {
          success: true,
          message: "Logged In",
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
