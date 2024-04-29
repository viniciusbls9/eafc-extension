import puppeteer from "puppeteer";
import waitForMultipleActions from "../../utils/promise";

const login = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://www.ea.com/ea-sports-fc/ultimate-team/web-app");

    await page.waitForSelector(".futweb-loader", { hidden: true });
    await page.waitForSelector(".licenseBody", { hidden: true });

    await page.waitForSelector(".btn-standard");

    await page.waitForFunction(() => {
      const button = document.querySelector(
        ".btn-standard"
      ) as HTMLButtonElement;
      return !button.disabled;
    });

    await waitForMultipleActions(
      page.click(".btn-standard"),
      page.waitForNavigation({ waitUntil: "networkidle2" })
    );

    const emailInput = "#email";
    const passwordInput = "#password";

    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;

    await page.type(emailInput, email as string);
    await page.type(passwordInput, password as string);

    await Promise.all([
      page.click("#logInBtn"),
      page.waitForNavigation({ waitUntil: "networkidle2" }),
    ]);

    await Promise.all([
      page.click("#btnSendCode"),
      page.waitForNavigation({ waitUntil: "networkidle2" }),
    ]);

    // Função para capturar screenshot e fechar o navegador
    const captureAndClose = async () => {
      await page.screenshot({ path: "example.png" });
      await browser.close();
    };

    // Chama a função para capturar screenshot e fechar o navegador após um intervalo
    setTimeout(captureAndClose, 1000000);
  } catch (error) {
    console.error("Ocorreu um erro:", error);
  }
};

export default login;
