import * as puppeteer from 'puppeteer';

const VideoComments = async (url: string): Promise<any> => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      executablePath: '/usr/bin/chromium',
      args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-sandbox',
      ],
    });
    const page = await browser.newPage();
    await page.goto(url, { timeout: 0 });
    await page.evaluate(() => {
      (document.body.style as any).zoom = '0.1';
    });

    let previousHeight;
    while (true) {
      const currentHeight = await page.evaluate('document.documentElement.scrollHeight');
      if (previousHeight && currentHeight === previousHeight) {
        break;
      }
      await page.evaluate('window.scrollTo(0, document.documentElement.scrollHeight)');
      previousHeight = currentHeight;
      await page.waitForTimeout(3000);
    }
    const videoComments: string[] = await page.evaluate(() => {
      const comments: string[] = [];
      const commentElements = document.querySelectorAll('#content-text');

      commentElements.forEach((commentElement) => {
        const commenterElement = commentElement.closest('ytd-comment-renderer');

        if (commenterElement) {
          const commentText = commentElement.textContent?.trim();

          if (commentText) {
            comments.push(commentText);
          }
        }
      });

      return comments;
    });
    await browser.close();
    return videoComments;
  } catch (e) {
    if (browser) {
      await browser.close();
    }
    console.error('Error:', e);
    return e;
  }
};

export default VideoComments;
