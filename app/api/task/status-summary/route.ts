import { taskboardApi } from "@/lib/axios/task-board-api";
import { API_PATH } from "@/config";
import { NextResponse } from "next/server";
import { AxiosError } from "axios";

export async function GET() {
  try {
    // const { searchParams } = new URL(req.url);

    // Ambil query params
    const params = {};
    const { data } = await taskboardApi.get(
      API_PATH.TASK_BOARD_API.TASK.BASE + "/status-summary",
      {
        params,
      }
    );
    return NextResponse.json(data);
  } catch (err: unknown) {
    const error = err as AxiosError;
    return NextResponse.json(error.response?.data, {
      status: error.status ?? 500,
    });
  }
}
