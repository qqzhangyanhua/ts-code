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
    "https://zwdtyjschange.sh.gov.cn/qykj/shell_oc_xh/enterprise/eindex"
  );
  const cookieHandle = await page.cookies();
  console.log("cookieHandle", cookieHandle);
})();
