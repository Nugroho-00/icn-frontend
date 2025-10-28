/**
 * API Endpoint Paths Configuration
 * Centralized API path definitions for the application
 */

export const API_PATH = {
  ME: {
    AUTH: {
      SIGN_IN: "/api/auth/sign-in",
      SIGN_OUT: "/api/auth/sign-out",
      REGISTER: "/api/auth/sign-up",
      PROFILE: "/api/auth/profile",
    },
    TASK: {
      BASE: "/api/task",
      STATUS_SUMMARY: "/api/task/status-summary",
    },
    AI: {
      BASE: "/api/ai",
    },
  },
  TASK_BOARD_API: {
    AUTH: {
      SIGN_IN: "/api/auth/login",
      REGISTER: "/api/auth/register",
      PROFILE: "/api/auth/profile",
    },
    TASK: {
      BASE: "/api/tasks",
    },
    AI: {
      SUGGESTION: "/api/ai/suggestions",
    },
  },
} as const;
