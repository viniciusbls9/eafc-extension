import puppeteer, { Browser } from "puppeteer";
import login from ".";
import {
  createMockPage,
  createMockBrowser,
  mockPuppeteerLaunch,
} from "../../utils/mock-puppeteer";
import waitForMultipleActions from "../../utils/promise";

jest.mock("../../utils/promise");

describe("Login to Web App", () => {
  it("should login successfully", async () => {
    process.env.EMAIL = "test@example.com";
    process.env.PASSWORD = "password123";

    const mockPage = createMockPage();
    const mockBrowser = createMockBrowser(mockPage);

    mockPuppeteerLaunch(mockBrowser);

    await login();

    expect(mockPage.goto).toHaveBeenCalledWith(
      "https://www.ea.com/ea-sports-fc/ultimate-team/web-app"
    );
    expect(mockPage.waitForSelector).toHaveBeenCalledTimes(3);
    expect(mockPage.waitForFunction).toHaveBeenCalled();
    expect(mockPage.click).toHaveBeenCalledTimes(3);
    expect(waitForMultipleActions).toHaveBeenCalledTimes(3);
    expect(mockPage.type).toHaveBeenCalledWith("#email", process.env.EMAIL);
    expect(mockPage.type).toHaveBeenCalledWith(
      "#password",
      process.env.PASSWORD
    );
  });
});
