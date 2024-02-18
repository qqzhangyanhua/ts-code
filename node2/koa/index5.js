const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // defaultViewport: {
    //   width: 0,
    //   height: 0,
    // },
  });

  const page = await browser.newPage();
  await page.goto(

  );
  const cookieHandle = await page.cookies();
  console.log("cookieHandle", cookieHandle);
})();
