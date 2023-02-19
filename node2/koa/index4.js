const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 0,
      height: 0,
    },
  });

  const page = await browser.newPage();
  await page.goto("http://127.0.0.1:5500/index.html");

  await page.waitForSelector("#username");

  const $username = await page.$("#username");
  await $username.type("1111111", {
    delay: 100,
  });

  const $password = await page.$("#password");
  await $password.type("testtest", {
    delay: 100,
  });

  const $button = await page.$("#submit");
  console.log("222222222222222", $button);
  await $button.click();
})();
