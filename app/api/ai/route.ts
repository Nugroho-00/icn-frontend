import { taskboardApi } from "@/lib/axios/task-board-api";
import { API_PATH } from "@/config";
import { NextResponse } from "next/server";
import { AxiosError } from "axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log({ body });
    const { data } = await taskboardApi.post(
      API_PATH.TASK_BOARD_API.AI.SUGGESTION,
      body
    );
    return NextResponse.json(data, { status: 201 });
  } catch (err: unknown) {
    const error = err as AxiosError;
    const status = error?.response?.status ?? 500;
    console.log(error.response?.data);
    return NextResponse.json(error.response?.data, { status });
  }
}
