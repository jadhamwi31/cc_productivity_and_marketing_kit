import * as puppeteer from 'puppeteer';

async function timeout(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const channelVideos = async (channelUsername: string): Promise<any> => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/chromium',
    args: ['--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-sandbox'],
  });
  const page = await browser.newPage();
  try {
    await page.goto(`https://www.youtube.com/${channelUsername}/videos`, { timeout: 0 });
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
      await timeout(3000);
    }
    const videoDetails = await page.evaluate(async () => {
      const details = [];
      const videoElements = document.querySelectorAll('ytd-rich-grid-media');
      for (const videoElement of videoElements) {
        const anchorElement = videoElement.querySelector('a#thumbnail');
        const href = anchorElement
          ? 'https://www.youtube.com' + anchorElement.getAttribute('href')
          : 'N/A';
        const thumbnailElement = videoElement.querySelector('img');
        const thumbnailUrl = thumbnailElement ? thumbnailElement.getAttribute('src') : 'N/A';
        const isRelativeUrl = thumbnailUrl && thumbnailUrl.startsWith('/');
        const absoluteThumbnailUrl = isRelativeUrl
          ? `https://www.youtube.com${thumbnailUrl}`
          : thumbnailUrl;
        const titleElement = videoElement.querySelector('yt-formatted-string#video-title');
        const title = titleElement ? (titleElement as HTMLElement).innerText.trim() : 'N/A';
        const viewsElement = videoElement.querySelector('span.style-scope.ytd-video-meta-block');
        const views = viewsElement ? (viewsElement as HTMLElement).innerText.trim() : 'N/A';
        const dateElement = videoElement.querySelectorAll(
          'span.inline-metadata-item.style-scope.ytd-video-meta-block',
        )[1];
        const date = dateElement ? (dateElement as HTMLElement).innerText.trim() : 'N/A';
        const durationElement = videoElement.querySelector(
          'ytd-thumbnail-overlay-time-status-renderer span#text',
        );
        const duration = durationElement
          ? (durationElement as HTMLElement).innerText.trim()
          : 'N/A';
        details.push({ href, thumbnailUrl: absoluteThumbnailUrl, title, views, date, duration });
      }
      return details;
    });
    await browser.close();
    return videoDetails;
  } catch (e) {
    await browser.close();
    return e;
  }
};

export default channelVideos;
