import { me } from "@/lib/axios/me";
import { API_PATH } from "@/config";
import type { SignUpBody, SignInBody } from "@/types";

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */
export const authService = {
  /**
   * Sign in user with email and password
   */
  signIn: async (body: SignInBody) =>
    await me.post(API_PATH.ME.AUTH.SIGN_IN, body).then((r) => r.data),

  /**
   * Sign out current user
   */
  signOut: async () => {
    try {
      const response = await me.post(API_PATH.ME.AUTH.SIGN_OUT, {});
      return response.data;
    } catch (error) {
      console.error("Sign out error:", error);
      // Even if API call fails, we should treat it as successful
      // because the client-side cleanup is more important
      return { success: true };
    }
  },

  /**
   * Register new user
   */
  signUp: async (body: SignUpBody) =>
    await me.post(API_PATH.ME.AUTH.REGISTER, body).then((r) => r.data),

  /**
   * Get user profile with optional filters
   */
  getProfile: async (params?: { status?: string; page?: number }) =>
    await me.get(API_PATH.ME.AUTH.PROFILE, { params }).then((r) => r.data),
};
