import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { env } from "@/config";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const res = await fetch(`${env.API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { message: error.message || "Login failed" },
        { status: res.status }
      );
    }

    const data = await res.json();
    const token = data.data.access_token;

    (await cookies()).set({
      name: "access_token",
      value: token,
      httpOnly: true, //
      secure: env.isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
    });

    return NextResponse.json({ message: "Login success", user: data.user });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
