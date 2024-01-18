const puppeteer = require('puppeteer');
const fs = require('fs');
const iPhone = puppeteer.devices['iPhone 6'];

async function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function scrapeYouTubeVideos() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://www.youtube.com/watch?v=NZpPMlSAez0', { timeout: 0 });

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

  const videoComments = await page.evaluate(() => {
    const comments = [];
    const commentElements = document.querySelectorAll('#content-text');

    commentElements.forEach((commentElement) => {
      const commentText = commentElement.textContent.trim();
      const commenterElement = commentElement.closest('ytd-comment-renderer');
      const commenterName = commenterElement.querySelector('#author-text').textContent.trim();
      const commenterYouTubePage = commenterElement
        .querySelector('#author-text')
        .getAttribute('href');

      comments.push({
        commenter: {
          name: commenterName,
          youtubePage: `https://www.youtube.com${commenterYouTubePage}`,
        },
        comment: commentText,
      });
    });

    return comments;
  });

  fs.writeFileSync('autostrad_videos.json', JSON.stringify(videoComments, null, 2));

  console.log('Data written to autostrad_videos.json');
  await browser.close();
}

scrapeYouTubeVideos();
