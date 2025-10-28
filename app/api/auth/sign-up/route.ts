import { taskboardApi } from "@/lib/axios/task-board-api";
import { API_PATH } from "@/config";
import { NextResponse } from "next/server";
import { AxiosError, AxiosResponse } from "axios";

export async function POST(req: Request) {
  try {
    const response: AxiosResponse = await taskboardApi
      .post(API_PATH.TASK_BOARD_API.AUTH.REGISTER, await req.json())
      .then((r) => r.data);
    return NextResponse.json(response.data, { status: response.status });
  } catch (err: unknown) {
    const error = err as AxiosError;
    return NextResponse.json(error.response, { status: error.status });
  }
}
