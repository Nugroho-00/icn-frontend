import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Delete the access token cookie
    const cookieStore = await cookies();
    cookieStore.delete("access_token");

    // Return success response
    return NextResponse.json(
      { message: "Signed out successfully" },
      {
        status: 200,
        headers: {
          // Clear any cache
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Sign out error:", error);
    return NextResponse.json({ error: "Failed to sign out" }, { status: 500 });
  }
}
