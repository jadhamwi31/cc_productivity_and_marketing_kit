const puppeteer = require('puppeteer');

const url = 'https://youtube.com/@mrbeast';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(`${url}`,{timeout:0});

  const data = await page.evaluate(() => {
    const avatar = document.querySelector('#img').src;
    const channelName = document.querySelector('#channel-name').innerText;
    const channelHandle = document.querySelector('#channel-handle').innerText;
    const totalSubscribers = document.querySelector('#subscriber-count').innerText;
    const totalVideos = document.querySelector('#videos-count').innerText;
    
    return { avatar, channelName, channelHandle, totalSubscribers, totalVideos };
  });

  await browser.close();
  
  console.log(data);
})();
