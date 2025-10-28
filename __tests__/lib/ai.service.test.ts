import { aiService } from "@/lib/services/ai.service";
import { me } from "@/lib/axios/me";
import { API_PATH } from "@/config";

// Mock axios instance
jest.mock("@/lib/axios/me");

const mockedMe = me as jest.Mocked<typeof me>;

describe("AI Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("sendContext", () => {
    it("should send context to AI successfully", async () => {
      const mockContext = {
        context: "Test context for AI processing",
      };

      const mockResponse = {
        data: {
          response: "AI generated response",
          processed: true,
        },
      };

      mockedMe.post.mockResolvedValue(mockResponse);

      const result = await aiService.sendContext(mockContext);

      expect(mockedMe.post).toHaveBeenCalledWith(
        API_PATH.ME.AI.BASE,
        mockContext
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle AI service errors", async () => {
      const mockContext = {
        context: "Test context",
      };

      const mockError = new Error("AI service unavailable");
      mockedMe.post.mockRejectedValue(mockError);

      await expect(aiService.sendContext(mockContext)).rejects.toThrow(
        "AI service unavailable"
      );
    });

    it("should handle empty context", async () => {
      const mockContext = {
        context: "",
      };

      const mockResponse = {
        data: {
          response: "Please provide context",
          processed: false,
        },
      };

      mockedMe.post.mockResolvedValue(mockResponse);

      const result = await aiService.sendContext(mockContext);

      expect(mockedMe.post).toHaveBeenCalledWith(
        API_PATH.ME.AI.BASE,
        mockContext
      );
      expect(result).toEqual(mockResponse.data);
    });
  });
});
