import { me } from "@/lib/axios/me";
import { API_PATH } from "@/config";

/**
 * AI Service
 * Handles all AI-related API calls
 */
export const aiService = {
  /**
   * Send context to AI for processing
   */
  sendContext: async (body: { context: string }) =>
    await me.post(API_PATH.ME.AI.BASE, body).then((r) => r.data),
};
