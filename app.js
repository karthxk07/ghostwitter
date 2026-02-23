const path = require('path');
const { exit } = require('process');
const { randomInt } = require('crypto');
const { login } = require('./login');
const { log } = require(path.join(__dirname, '/logger.js'));
const { post } = require(path.join(__dirname, "/post.js"));
const { createBrowserInstance, sleep } = require(path.join(__dirname, '/browser'));
const { generate_tweets } = require(path.join(__dirname, "/generate_tweet.js"));


(async () => {

  const browser = await createBrowserInstance(9222, path.join(__dirname, "x_user_data"));

  let context = browser.contexts()[0];
  let page = await context.newPage();
  if (!page) {
    log("No page found, waiting for one to initialize...", __filename);
    page = await context.waitForEvent('page');
  }

  log("Browser ready. Navigating...", __filename);

  //goto x home
  await page.goto("https://x.com/home");
  await page.waitForLoadState('load');

  //check if logged in
  let url = page.url();
  log("current url : " + url, __filename);
  if (URL.parse(url).pathname.includes("/home")) {

    //generate tweet
    let tweets = await generate_tweets();

    for (const i in tweets) {
      //post the tweet
      log(`posting tweet : ${tweets[i]}`, __filename);
      await post({ page }, tweets[i]);
      sleep(1000 * randomInt(1, 5));
    };

  } else {
    //run the login cycle
    await login({ page })
  }

  //close the browser
  log("closing browser", __filename)
  await browser.close();
  exit();
})();
