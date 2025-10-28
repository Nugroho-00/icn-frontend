/**
 * Environment Variables Configuration
 * Centralized environment variable access for the application
 */

export const env = {
  // API URLs
  API_URL: process.env.NEXT_PUBLIC_API_URL || "https://api.example.com",
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001",

  // Application
  NODE_ENV: process.env.NODE_ENV || "development",

  // Feature Flags
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
} as const;
