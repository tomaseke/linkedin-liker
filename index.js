const puppeteer = require("puppeteer");
const express = require("express");
const { log } = require("console");
const app = express();
const PORT = process.env.PORT || 3000;
require("dotenv").config();

app.get("/", async (req, res) => {
  like();
  res.send("hi");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

async function like() {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    // headless: false,
    // pico uz ale
  });
  try {
    const page = await browser.newPage();
    const navigationPromise = page.waitForNavigation({
      waitUntil: "domcontentloaded",
    });
    await page.goto("https://linkedin.com");
    await navigationPromise;
    await page.waitForSelector(
      'a[data-tracking-control-name="guest_homepage-basic_nav-header-signin"]'
    );
    await page.click(
      'a[data-tracking-control-name="guest_homepage-basic_nav-header-signin"]'
    );
    await page.type("#username", "tomasekerbenu@gmail.com", { delay: 50 });
    await page.type("#password", process.env.PASSWORD, { delay: 50 });

    const navigationPromise2 = page.waitForNavigation({
      waitUntil: "domcontentloaded",
    });
    await page.click("button.btn__primary--large.from__button--floating");
    await navigationPromise2;
    const t = await page.$$("button#ember17");
    console.log(t.length);
    // await page.click(".search-global-typeahead__collapsed-search-button-icon");
    // await page.type(".search-global-typeahead__input", "decisionrules.io");
    // await page.focus(".search-global-typeahead__collapsed-search-button-icon");
    // await page.waitForTimeout(6000);
    // await page.keyboard.press("ArrowDown");
    // await page.keyboard.press("Enter");
    // await page.waitForSelector(".image-text-lockup__text");
    // await page.click(".image-text-lockup__text");
    // await page.waitForSelector('a[href="/company/decisionrules-io/posts/"]');
    // await page.click('a[href="/company/decisionrules-io/posts/"]');
    // await page.waitForSelector(
    //   'button[data-control-name="feed_sort_dropdown_trigger"]'
    // );
    // await page.click('button[data-control-name="feed_sort_dropdown_trigger"]');
    // await page.waitForTimeout(2000);
    // await page.keyboard.press("ArrowDown");
    // await page.keyboard.press("ArrowDown");
    // await page.waitForTimeout(2000);
    // await page.keyboard.press("Enter");
    // await page.waitForTimeout(6000);
    // await page.evaluate(async () => {
    //   const allLikeButtons = document.querySelectorAll(
    //     "button[aria-pressed=false].artdeco-button--tertiary"
    //   );
    //   allLikeButtons.forEach((btn) => btn.click());
    // });
    // console.log("worked");
  } catch (e) {
    console.error(e);
  } finally {
    // await browser.close();
  }
}
