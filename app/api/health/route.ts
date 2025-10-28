import { NextResponse } from "next/server";

/**
 * Health Check Endpoint
 * Digunakan untuk Docker health check dan monitoring
 */
export async function GET() {
  try {
    // Bisa ditambahkan pengecekan database connection, external services, dll
    const healthCheck = {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
    };

    return NextResponse.json(healthCheck, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 503 }
    );
  }
}
