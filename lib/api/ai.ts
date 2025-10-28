import { me } from "@/lib/axios/me";
import { API_PATH } from "@/constant";

export const ai = {
  sendContext: async (body: { context: string }) =>
    await me.post(API_PATH.ME.AI.BASE, body).then((r) => r.data),
};
