import { cn, debounce } from "@/lib/utils";

describe("Utils", () => {
  describe("cn function", () => {
    it("should merge class names correctly", () => {
      const result = cn("class1", "class2");
      expect(result).toContain("class1");
      expect(result).toContain("class2");
    });

    it("should handle conditional classes", () => {
      const result = cn("base", true && "active", false && "inactive");
      expect(result).toContain("base");
      expect(result).toContain("active");
      expect(result).not.toContain("inactive");
    });

    it("should merge tailwind classes correctly", () => {
      const result = cn("px-2 py-1", "px-4");
      expect(result).toBe("py-1 px-4");
    });

    it("should handle undefined and null values", () => {
      const result = cn("base", undefined, null, "active");
      expect(result).toContain("base");
      expect(result).toContain("active");
    });
  });

  describe("debounce function", () => {
    jest.useFakeTimers();

    it("should delay function execution", () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 300);

      debouncedFn();
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(300);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it("should cancel previous calls when called multiple times", () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 300);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      jest.advanceTimersByTime(300);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it("should pass arguments correctly", () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 300);

      debouncedFn("test", 123);
      jest.advanceTimersByTime(300);

      expect(mockFn).toHaveBeenCalledWith("test", 123);
    });

    afterEach(() => {
      jest.clearAllTimers();
    });
  });
});
