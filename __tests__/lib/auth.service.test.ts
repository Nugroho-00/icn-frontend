import { authService } from "@/lib/services/auth.service";
import { me } from "@/lib/axios/me";
import { API_PATH } from "@/config";
import type { SignInBody, SignUpBody } from "@/types";

// Mock axios instance
jest.mock("@/lib/axios/me");

const mockedMe = me as jest.Mocked<typeof me>;

describe("Auth Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("signIn", () => {
    it("should sign in user successfully", async () => {
      const mockCredentials: SignInBody = {
        email: "test@example.com",
        password: "password123",
      };

      const mockResponse = {
        data: {
          token: "mock-token",
          user: { id: "1", email: "test@example.com" },
        },
      };

      mockedMe.post.mockResolvedValue(mockResponse);

      const result = await authService.signIn(mockCredentials);

      expect(mockedMe.post).toHaveBeenCalledWith(
        API_PATH.ME.AUTH.SIGN_IN,
        mockCredentials
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle sign in errors", async () => {
      const mockCredentials: SignInBody = {
        email: "test@example.com",
        password: "wrongpassword",
      };

      const mockError = new Error("Invalid credentials");
      mockedMe.post.mockRejectedValue(mockError);

      await expect(authService.signIn(mockCredentials)).rejects.toThrow(
        "Invalid credentials"
      );
    });
  });

  describe("signOut", () => {
    it("should sign out user successfully", async () => {
      const mockResponse = {
        data: { success: true },
      };

      mockedMe.post.mockResolvedValue(mockResponse);

      const result = await authService.signOut();

      expect(mockedMe.post).toHaveBeenCalledWith(API_PATH.ME.AUTH.SIGN_OUT, {});
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle sign out errors", async () => {
      const mockError = new Error("Sign out failed");
      mockedMe.post.mockRejectedValue(mockError);

      await expect(authService.signOut()).rejects.toThrow("Sign out failed");
    });
  });

  describe("signUp", () => {
    it("should register new user successfully", async () => {
      const mockUserData: SignUpBody = {
        email: "newuser@example.com",
        password: "password123",
        username: "newuser",
      };

      const mockResponse = {
        data: {
          user: { id: "1", email: "newuser@example.com", username: "newuser" },
        },
      };

      mockedMe.post.mockResolvedValue(mockResponse);

      const result = await authService.signUp(mockUserData);

      expect(mockedMe.post).toHaveBeenCalledWith(
        API_PATH.ME.AUTH.REGISTER,
        mockUserData
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle registration errors", async () => {
      const mockUserData: SignUpBody = {
        email: "existing@example.com",
        password: "password123",
        username: "testuser",
      };

      const mockError = new Error("Email already exists");
      mockedMe.post.mockRejectedValue(mockError);

      await expect(authService.signUp(mockUserData)).rejects.toThrow(
        "Email already exists"
      );
    });
  });

  describe("getProfile", () => {
    it("should get user profile without params", async () => {
      const mockResponse = {
        data: {
          id: "1",
          email: "user@example.com",
          name: "Test User",
        },
      };

      mockedMe.get.mockResolvedValue(mockResponse);

      const result = await authService.getProfile();

      expect(mockedMe.get).toHaveBeenCalledWith(API_PATH.ME.AUTH.PROFILE, {
        params: undefined,
      });
      expect(result).toEqual(mockResponse.data);
    });

    it("should get user profile with params", async () => {
      const params = { status: "active", page: 1 };
      const mockResponse = {
        data: {
          id: "1",
          email: "user@example.com",
          name: "Test User",
        },
      };

      mockedMe.get.mockResolvedValue(mockResponse);

      const result = await authService.getProfile(params);

      expect(mockedMe.get).toHaveBeenCalledWith(API_PATH.ME.AUTH.PROFILE, {
        params,
      });
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle get profile errors", async () => {
      const mockError = new Error("Unauthorized");
      mockedMe.get.mockRejectedValue(mockError);

      await expect(authService.getProfile()).rejects.toThrow("Unauthorized");
    });
  });
});
