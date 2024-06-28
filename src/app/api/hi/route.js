import blg from "@/Models/blg";
import { NextResponse } from "next/server";
import Dbconnect from "@/Config/db";

Dbconnect();

export async function POST(req) {
  try {
    const data = await req.json();
    const response = await blg.create(data);
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
    const res = await blg.find();
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
// export async function DELETE(req, { params }) {
//   try {
//     const res = await blg.findByIdAndDelete(params.id);
//     return NextResponse.json({
//       message: "delete",
//     });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({
//       message: "error",
//     });
//   }
// }
