import * as puppeteer from 'puppeteer';

export interface ChannelInfoData {
  uploads: string;
  subscribers: string;
  videoViews: string;
  userCreated: string;
  channelType: string;
  country: string;
}

const channelInfo = async (channelId: string): Promise<ChannelInfoData | string> => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(`https://socialblade.com/youtube/user/${channelId}`, {
      waitUntil: 'domcontentloaded',
    });

    const data = await page.evaluate(() => {
      const info = document.querySelector('#YouTubeUserTopInfoBlockTop');

      if (!info) {
        throw new Error('Unable to find channel information');
      }

      const uploads =
        info
          .querySelector('.YouTubeUserTopInfo:nth-child(1) span:last-child')
          ?.textContent?.trim() || '';
      const subscribers =
        info
          .querySelector('.YouTubeUserTopInfo:nth-child(2) span:last-child')
          ?.textContent?.trim() || '';
      const videoViews =
        info
          .querySelector('.YouTubeUserTopInfo:nth-child(3) span:last-child')
          ?.textContent?.trim() || '';
      const userCreated =
        info
          .querySelector('.YouTubeUserTopInfo:nth-child(6) span:last-child')
          ?.textContent?.trim() || '';
      const channelType =
        info
          .querySelector('.YouTubeUserTopInfo:nth-child(5) span:last-child a')
          ?.textContent?.trim() || '';
      const country =
        info
          .querySelector('.YouTubeUserTopInfo:nth-child(4) span:last-child a')
          ?.textContent?.trim() || '';

      return {
        uploads,
        subscribers,
        videoViews,
        userCreated,
        channelType,
        country,
      };
    });

    await browser.close();
    return data;
  } catch (e) {
    return String(e);
  }
};

export default channelInfo;
