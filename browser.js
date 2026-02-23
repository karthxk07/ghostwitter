const { chromium } = require('playwright');
const { exec } = require('child_process');
const path = require('path');
const { readFile } = require('fs/promises');
const { readFileSync } = require('fs');
const { log } = require(path.join(__dirname, '/logger.js'));
// const chromePath = require('puppeteer-core').executablePath();

const sleep = (ms) => {

  return new Promise(resolve =>
    setTimeout(resolve, ms)
  )
}

//start the browser
const startBrowserServerAtPort = async (port, userDataDir) => {


  //start
  chromePath = readFileSync(path.join(__dirname, "chrome_path.txt"), 'utf8').trim();
  chromePath = chromePath.split(/\s+/).pop();

  console.log(chromePath);

  exec(`${chromePath} \
 --remote-debugging-port=${port} \
 --user-data-dir=${userDataDir} \
 --remote-debugging-address=0.0.0.0 \
 --no-sandbox \
 --disable-setuid-sandbox \
 --disable-dev-shm-usage \
 --disable-gpu`);

  log(`browser started at port ${port}, dataDir ${userDataDir}`, __filename);

  log('connecting...', __filename);
  await sleep(5000);

}

const createBrowserInstance = async (port, userDataDir) => {

  //start the browser server
  await startBrowserServerAtPort(port, userDataDir);


  // 1. Connect to the browser 'server' you started manually
  const browser = await chromium.connectOverCDP(`http://localhost:${port}`);
  log('Successfully connected to the browser server!', __filename);

  return browser
}

module.exports = { createBrowserInstance, sleep }
