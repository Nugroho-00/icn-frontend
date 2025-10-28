import { taskboardApi } from "@/lib/axios/task-board-api";
import { API_PATH } from "@/config";

export async function DELETE(req: Request) {
  const id = req.url.split("/").pop();
  const response = await taskboardApi
    .delete(API_PATH.TASK_BOARD_API.TASK.BASE + "/" + id)
    .then((r) => r.data);

  return new Response(response, { status: 200 });
}

export async function PATCH(req: Request) {
  const id = req.url.split("/").pop();
  await taskboardApi
    .patch(API_PATH.TASK_BOARD_API.TASK.BASE + "/" + id, await req.json())
    .then((r) => r.data);
  return new Response(null, { status: 200 });
}
