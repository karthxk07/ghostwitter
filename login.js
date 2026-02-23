const path = require('path');

const { expect } = require("playwright/test");
const { log } = require(path.join(__dirname, "/logger.js"));

const login = async ({ page }, tweet) => {
  try {
    //focus the text area
    await page.locator(`[autocomplete="username"]`).click();

    //type the tweet
    await page.keyboard.type(`${process.env.X_USERNAME}`, { delay: 200 });


    await page.locator('text/Next').click();

    //post the tweet
    await page.locator(`[autocomplete="current-password"]`).click();

    //type the tweet
    await page.keyboard.type(`${process.env.X_PASSWORD}`, { delay: 200 });

    //check for confirmation
    // await page.getByTestId('toast').getByText('Your Post was sent.');
    const slowExpect = expect.configure({ timeout: 10000 });
    await slowExpect(page.url()).toHaveText("home");



    //success message
    log("login successfull", __filename);
  } catch (e) {
    //log the error
    log("login unsuccessfull ; " + e.message, __filename);
    await page.screenshot({ path: "screenshot.png" })
  }
}

module.exports = { login }
