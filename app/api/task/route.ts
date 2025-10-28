import { taskboardApi } from "@/lib/axios/task-board-api";
import { API_PATH } from "@/config";
import { NextResponse } from "next/server";
import { AxiosError } from "axios";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // Ambil query params
    const params = {
      search: searchParams.get("search"),
      status: searchParams.get("status"),
      dueDateFrom: searchParams.get("dueDateFrom"),
      dueDateTo: searchParams.get("dueDateTo"),
      sortBy: searchParams.get("sortBy"),
      sortOrder: searchParams.get("sortOrder"),
      limit: searchParams.get("limit"),
      page: searchParams.get("page"),
    };
    const { data } = await taskboardApi.get(API_PATH.TASK_BOARD_API.TASK.BASE, {
      params,
    });
    return NextResponse.json(data);
  } catch (err: unknown) {
    const error = err as AxiosError;
    return NextResponse.json(error.response?.data, {
      status: error.status ?? 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data } = await taskboardApi.post(
      API_PATH.TASK_BOARD_API.TASK.BASE,
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
