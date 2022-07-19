const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
require("dotenv").config();

app.get("/", async (req, res) => {
  like();
  res.send('hi');
});

app.listen(PORT, () => {
   console.log(`Server is running on PORT: ${PORT}`);
});

async function like() {
  try{
  const browser = await puppeteer.launch({ args: ["--no-sandbox"], headless: false});
  const page = await browser.newPage();
  await page.goto("https://linkedin.com");
  await page.click(
    'a[data-tracking-control-name="guest_homepage-basic_nav-header-signin"]'
  );
  await page.type("#username", "tomasekerbenu@gmail.com", {delay: 50});
  await page.type("#password", process.env.password, {delay: 50});
  await page.click("button[type=submit]");
  console.log(document.getElementById("error-for-password"));
  await page.waitForSelector(".search-global-typeahead__collapsed-search-button-icon");
  await page.click(".search-global-typeahead__collapsed-search-button-icon");
  await page.type(".search-global-typeahead__input", 'decisionrules.io');
  await page.focus(".search-global-typeahead__collapsed-search-button-icon");
  await page.waitForTimeout(6000);
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await page.waitForSelector(".image-text-lockup__text");
  await page.click(".image-text-lockup__text");
  await page.waitForSelector('a[href="/company/decisionrules-io/posts/"]');
  await page.click('a[href="/company/decisionrules-io/posts/"]');
  await page.waitForSelector('button[data-control-name="feed_sort_dropdown_trigger"]');
  await page.click('button[data-control-name="feed_sort_dropdown_trigger"]');
  await page.waitForTimeout(2000);
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.waitForTimeout(2000);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(6000);
  await page.evaluate(async () => {
    const allLikeButtons = document.querySelectorAll('button[aria-pressed=false].artdeco-button--tertiary ');
    allLikeButtons.forEach(btn => btn.click());
  })
  console.log('worked');
  }
  catch(e) {
    console.error(e);
  }
  finally {
  await browser.close();
  }
};
