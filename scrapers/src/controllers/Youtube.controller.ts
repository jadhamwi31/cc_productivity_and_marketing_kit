import { Request, Response } from 'express';
import puppeteer from 'puppeteer';
import STATUS_CODES from 'http-status-codes';

const channelInfo = async (req: Request<{}, {}, { url: string }>, res: Response) => {
  const { url } = req.body;
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
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

export const YoutubeController = { channelInfo };
