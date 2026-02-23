const path = require('path');

const { expect } = require("playwright/test"); const { log } = require(path.join(__dirname, "/logger.js"));

const post = async ({ page }, tweet) => {
  try {
    //focus the text area
    await page.locator(`[data-testid="tweetTextarea_0"]`).click();

    //type the tweet
    await page.keyboard.type(`${tweet}`, { delay: 200 });

    //post the tweet
    await page.locator(`[data-testid="tweetButtonInline"]`).click();


    //check for confirmation
    // await page.getByTestId('toast').getByText('Your Post was sent.');
    const slowExpect = expect.configure({ timeout: 10000 });
    await slowExpect(page.getByText("Your Post was sent.")).toBeVisible();



    //success message
    log("tweet successfull", __filename);
  } catch (e) {
    //log the error
    log("tweet unsuccessfull ; " + e.message, __filename);
    await page.screenshot({ path: "screenshot.png" })
  }
}

module.exports = { post }
