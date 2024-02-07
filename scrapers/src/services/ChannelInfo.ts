import * as puppeteer from 'puppeteer';

export interface ChannelInfoData {
  avatar: string;
  channelName: string;
  channelHandle: string;
  totalSubscribers: string;
  totalVideos: string;
  backgroundImageUrl: string | null;
}

const channelInfo = async (url: string): Promise<ChannelInfoData | string> => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
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
    console.log('ahmad');
    const data = await page.evaluate(() => {
      console.log(document.querySelector('body')?.innerHTML);
      const avatarElement = document.querySelector('#img') as HTMLImageElement;
      const channelNameElement = document.title;
      const channelHandleElement = document.querySelector('#channel-handle') as HTMLElement;
      const subscriberCountElement = document.querySelector('#subscriber-count') as HTMLElement;
      const videosCountElement = document.querySelector('#videos-count') as HTMLElement;

      if (
        !avatarElement ||
        !channelNameElement ||
        !channelHandleElement ||
        !subscriberCountElement ||
        !videosCountElement
      ) {
        return 'Error: Required elements not found on the page.';
      }

      const avatar = avatarElement.getAttribute('src');
      const channelName = channelNameElement.split(' - YouTube')[0];
      const channelHandle = channelHandleElement.textContent || '';
      const totalSubscribers = subscriberCountElement.textContent || '';
      const totalVideos = videosCountElement.textContent || '';

      const bannerElement = document.querySelector('.page-header-banner-image') as HTMLElement;
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
      } as ChannelInfoData;
    });

    if (data === 'Error: Required elements not found on the page.') {
      await browser.close();
      return data;
    }

    await browser.close();
    return data;
  } catch (e) {
    return String(e);
  }
};

export default channelInfo;
