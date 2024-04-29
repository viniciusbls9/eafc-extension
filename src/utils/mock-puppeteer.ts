// utils/mockPuppeteer.ts

import puppeteer, { Browser } from "puppeteer";

interface MockPageProps {
  goto: jest.Mock<any, any, any>;
  waitForSelector: jest.Mock<any, any, any>;
  waitForFunction: jest.Mock<any, any, any>;
  click: jest.Mock<any, any, any>;
  type: jest.Mock;
  screenshot: jest.Mock;
  waitForNavigation: jest.Mock;
  close: jest.Mock;
}

export const createMockPage = () => {
  return {
    goto: jest.fn(),
    waitForSelector: jest.fn(),
    waitForFunction: jest.fn(),
    click: jest.fn(),
    type: jest.fn(),
    screenshot: jest.fn(),
    waitForNavigation: jest.fn(),
    close: jest.fn(),
  };
};

export const createMockBrowser = (mockPage: MockPageProps): Browser => {
  return {
    newPage: jest.fn().mockResolvedValue(mockPage),
    close: jest.fn(),
  } as unknown as Browser;
};

export const mockPuppeteerLaunch = (mockBrowser: Browser): void => {
  jest.spyOn(puppeteer, "launch").mockResolvedValue(mockBrowser);
};
