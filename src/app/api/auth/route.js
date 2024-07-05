import User from "@/Models/User";

export async function POST(req) {
    try {
      const body = req.json()
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
          message: error,
        },
        {
          status: 500,
        }
      );
    }
  }

  