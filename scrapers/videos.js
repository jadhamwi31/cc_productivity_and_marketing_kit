const puppeteer = require('puppeteer');
const fs = require('fs');
const iPhone = puppeteer.devices['iPhone 6'];

async function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrapeYouTubeVideos() {
  const browser = await puppeteer.launch({ headless: false }); // Set headless to false for debugging
  const page = await browser.newPage();

  await page.goto('https://www.youtube.com/@Autostrad/videos',{ timeout: 0 });

  await page.evaluate(() => {
    document.body.style.zoom = 0.1;
  });

  let previousHeight;
  while (true) {
    const currentHeight = await page.evaluate('document.documentElement.scrollHeight');

    if (previousHeight && currentHeight === previousHeight) {
      break;
    }

    await page.evaluate('window.scrollTo(0, document.documentElement.scrollHeight)');
    previousHeight = currentHeight;
    await timeout(3000);
  }

  const videoDetails = await page.evaluate(async () => {
    const details = [];
    const videoElements = document.querySelectorAll('ytd-rich-grid-media');

    for (const videoElement of videoElements) {
      const anchorElement = videoElement.querySelector('a#thumbnail');
      const href = anchorElement ? 'https://www.youtube.com' + anchorElement.getAttribute('href') : 'N/A';

      const thumbnailElement = videoElement.querySelector('img');
      const thumbnailUrl = thumbnailElement ? thumbnailElement.getAttribute('src') : 'N/A';

      const isRelativeUrl = thumbnailUrl && thumbnailUrl.startsWith('/');
      const absoluteThumbnailUrl = isRelativeUrl ? `https://www.youtube.com${thumbnailUrl}` : thumbnailUrl;

      const titleElement = videoElement.querySelector('yt-formatted-string#video-title');
      const title = titleElement ? titleElement.innerText.trim() : 'N/A';
      const viewsElement = videoElement.querySelector('span.style-scope.ytd-video-meta-block');
      const views = viewsElement ? viewsElement.innerText.trim() : 'N/A';
      const dateElement = videoElement.querySelectorAll('span.inline-metadata-item.style-scope.ytd-video-meta-block')[1];
      const date = dateElement ? dateElement.innerText.trim() : 'N/A';
      

    
  
    
      const durationElement = videoElement.querySelector('ytd-thumbnail-overlay-time-status-renderer span#text');


      const duration = durationElement ? durationElement.innerText.trim() : 'N/A';

      details.push({ href, thumbnailUrl: absoluteThumbnailUrl, title, views, date,duration });
    }

    return details;
  });

  fs.writeFileSync('autostrad_videos1.json', JSON.stringify(videoDetails, null, 2));

  console.log('Data written to autostrad_videos.json');
  await browser.close();
}

scrapeYouTubeVideos();
