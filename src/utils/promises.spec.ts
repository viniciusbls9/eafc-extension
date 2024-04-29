import waitForMultipleActions from "./promise";

describe("waitForMultipleActions", () => {
  test("should resolve with all correct values if all promises resolve", async () => {
    const promises = [
      Promise.resolve("result1"),
      Promise.resolve("result2"),
      Promise.resolve("result3"),
    ];

    const results = await waitForMultipleActions(promises);
    expect(results).toEqual(["result1", "result2", "result3"]);
  });

  test("should reject if any promise rejects", async () => {
    const promises = [
      Promise.resolve("result1"),
      Promise.reject(new Error("failure")),
      Promise.resolve("result3"),
    ];

    try {
      await waitForMultipleActions(promises);
    } catch (error: any) {
      expect(error.message).toBe("failure");
    }
  });

  test("should resolve to an empty array when no promises are provided", async () => {
    const results = await waitForMultipleActions([]);
    expect(results).toEqual([]);
  });
});
