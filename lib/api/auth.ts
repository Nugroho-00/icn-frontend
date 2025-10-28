import {me} from "@/lib/axios/me";
export type SignUpBody = {
  email: string;
  password: string;
  username: string;
};

export type SignInBody = {
  email: string;
  password: string;
};

import { API_PATH } from "@/constant";

export const auth = {
  signIn: async (body: SignInBody) =>
    await me.post(API_PATH.ME.AUTH.SIGN_IN, body).then((r) => r.data),
  signOut: async () =>
    await me.post(API_PATH.ME.AUTH.SIGN_OUT, {}).then((r) => r.data),
  signUp: async (body: SignUpBody) =>
    await me.post(API_PATH.ME.AUTH.REGISTER, body).then((r) => r.data),
  getProfile: async (params?: { status?: string; page?: number }) =>
    await me.get(API_PATH.ME.AUTH.PROFILE, { params }).then((r) => r.data),
};
