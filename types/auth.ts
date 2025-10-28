import { ApiResponse } from "./api";

// --- User related types ---
export interface AppMetadata {
  provider: string;
  providers: string[];
}

export interface UserMetadata {
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
}

export interface IdentityData {
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
}

export interface Identity {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: IdentityData;
  provider: string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  email: string;
}

export interface AuthUser {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  last_sign_in_at: string;
  app_metadata: AppMetadata;
  user_metadata: UserMetadata;
  identities: Identity[];
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
}

// --- Session ---
export interface Session {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  user: AuthUser;
  weak_password: string | null;
}

// --- Login request types ---
export type SignUpBody = {
  email: string;
  password: string;
  username: string;
};

export type SignInBody = {
  email: string;
  password: string;
};

// --- Login response payload ---
export interface LoginData {
  user: AuthUser;
  session: Session;
  access_token: string;
}

// --- Final API response ---
export type LoginResponse = ApiResponse<LoginData>;
