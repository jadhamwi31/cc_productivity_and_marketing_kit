import { Request, Response } from 'express';
import STATUS_CODES from 'http-status-codes';
import * as puppeteer from 'puppeteer';

interface CommentData {
  commenter: {
    name: string;
    youtubePage: string;
  };
  comment: string;
}

async function timeout(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const channelInfo = async (req: Request<{}, {}, { url: string }>, res: Response) => {
  const { url } = req.body;
  try {
    const browser = await puppeteer.launch({
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
    await page.goto(`${url}`, { timeout: 0 });
    const data = await page.evaluate(() => {
      const avatarElement = document.querySelector('#img');
      const channelNameElement = document.title;
      const channelHandleElement = document.querySelector('#channel-handle');
      const subscriberCountElement = document.querySelector('#subscriber-count');
      const videosCountElement = document.querySelector('#videos-count');
      if (
        !avatarElement ||
        !channelNameElement ||
        !channelHandleElement ||
        !subscriberCountElement ||
        !videosCountElement
      ) {
        return res.status(STATUS_CODES.BAD_REQUEST).send({
          status: STATUS_CODES.BAD_REQUEST,
          message: 'Error: Required elements not found on the page.',
        });
      }
      const avatar = avatarElement.getAttribute('src');
      const channelName = channelNameElement.split(' - YouTube')[0];
      const channelHandle = channelHandleElement.textContent;
      const totalSubscribers = subscriberCountElement.textContent;
      const totalVideos = videosCountElement.textContent;

      const bannerElement = document.querySelector('.page-header-banner-image');
      const backgroundImage = bannerElement
        ? getComputedStyle(bannerElement).backgroundImage
        : null;
      const backgroundImageUrl = backgroundImage
        ? backgroundImage.match(/url\(["']?([^"']*)["']?\)/)?.[1]
        : null;

      return {
        avatar,
        channelName,
        channelHandle,
        totalSubscribers,
        totalVideos,
        backgroundImageUrl,
      };
    });

    if (data === null) {
      await browser.close();
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send({ status: STATUS_CODES.BAD_REQUEST, message: 'Unable to scrape data' });
    }
    await browser.close();
    return res.status(STATUS_CODES.OK).send({ status: STATUS_CODES.OK, message: data });
  } catch (e) {
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .send({ status: STATUS_CODES.BAD_REQUEST, message: e });
  }
};
const channelVideos = async (req: Request<{}, {}, { url: string }>, res: Response) => {
  const { url } = req.body;
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/chromium',
    args: ['--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-sandbox'],
  });
  const page = await browser.newPage();
  try {
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
    return res.status(STATUS_CODES.OK).send({ status: STATUS_CODES.OK, message: videoDetails });
  } catch (e) {
    await browser.close();
    console.error('Error:', e);
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .send({ status: STATUS_CODES.BAD_REQUEST, message: e });
  }
};

const videoComments = async (req: Request<{}, {}, { url: string }>, res: Response) => {
  const { url } = req.body;
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false,
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
    const videoComments: CommentData[] = await page.evaluate(() => {
      const comments: CommentData[] = [];
      const commentElements = document.querySelectorAll('#content-text');

      commentElements.forEach((commentElement) => {
        const commenterElement = commentElement.closest('ytd-comment-renderer');

        if (commenterElement) {
          const commentText = commentElement.textContent?.trim();
          const commenterName = commenterElement.querySelector('#author-text')?.textContent?.trim();
          const commenterYouTubePage = commenterElement
            .querySelector('#author-text')
            ?.getAttribute('href');
          if (commentText && commenterName && commenterYouTubePage) {
            comments.push({
              commenter: {
                name: commenterName,
                youtubePage: `https://www.youtube.com${commenterYouTubePage}`,
              },
              comment: commentText,
            });
          }
        }
      });

      return comments;
    });
    await browser.close();
    return res.status(STATUS_CODES.OK).json({ status: STATUS_CODES.OK, data: videoComments });
  } catch (e) {
    if (browser) {
      await browser.close();
    }
    console.error('Error:', e);
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ status: STATUS_CODES.BAD_REQUEST, message: e });
  }
};
export const YoutubeController = { channelInfo, channelVideos, videoComments };
