import * as puppeteer from 'puppeteer';

export interface ChannelInfoData {
  uploads: string;
  subscribers: string;
  videoViews: string;
  userCreated: string;
  channelType: string;
  country: string;
  positionHint: string;
  vidviewsSVG: string | null;
  subscribersSVG: string | null;
  earnings: string;
  avatarSrc: string | null;
  headerBackgroundUrl: string | null;
}

const channelInfo = async (channelId: string): Promise<ChannelInfoData | string> => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      executablePath: '/usr/bin/google-chrome',
      args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-sandbox',
      ],
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    );

    await page.goto(`https://socialblade.com/youtube/user/${channelId}`);

    const data = await page.evaluate(() => {
      const getInfoValue = (label: string) => {
        const labelElement = Array.from(document.querySelectorAll('.YouTubeUserTopInfo')).find(
          (element) => element.textContent?.includes(label),
        );
        return labelElement?.querySelector('span:last-child')?.textContent?.trim() || '';
      };

      const channelType =
        document.querySelector('#youtube-user-page-channeltype')?.textContent?.trim() || '';

      const positionHintElement = document.querySelectorAll(
        '.hint--top[data-hint*="This spot is shared with"]',
      )[3];
      const positionHint = positionHintElement?.textContent?.trim() || '';

      const modifyRectFill = (svgString: string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgString, 'image/svg+xml');
        const rectElements = doc.querySelectorAll('rect');
        rectElements.forEach((rect) => {
          rect.setAttribute('fill', 'none');
        });
        return new XMLSerializer().serializeToString(doc);
      };

      const modifyAndSerializeSVG = (selector: string) => {
        const svgElement = document.querySelector(selector);
        return svgElement ? modifyRectFill(svgElement.outerHTML) : null;
      };

      const vidviewsSVG = modifyAndSerializeSVG('#graph-youtube-monthly-vidviews-container svg');
      const subscribersSVG = modifyAndSerializeSVG(
        '#graph-youtube-monthly-subscribers-container svg',
      );

      const earningsContainer = document.querySelector(
        'div[style="width: 270px; height: 100px; float: left; background: #fff; padding: 0px 5px; border-bottom: 2px solid #e2e2e2; text-align: center; margin-left: 10px; margin-right: 10px;"]',
      );

      const earningsValue =
        earningsContainer?.querySelector('p:first-child')?.textContent?.trim() || '';

      const avatarSrcElement = document.querySelector('#YouTubeUserTopInfoAvatar');
      const avatarSrc = avatarSrcElement?.getAttribute('src') || null;

      const headerBackgroundUrlElement = document.querySelector('#YouTubeUserTopHeaderBackground');
      const headerBackgroundUrlStyle =
        (headerBackgroundUrlElement as HTMLElement)?.style.backgroundImage || null;

      const headerBackgroundUrl = headerBackgroundUrlStyle
        ? headerBackgroundUrlStyle.match(/url\(['"]?(.*?)['"]?\)/)?.[1] || null
        : null;
      console.log('ahmad');
      return {
        uploads: getInfoValue('Uploads'),
        subscribers: getInfoValue('Subscribers'),
        videoViews: getInfoValue('Video Views'),
        userCreated: getInfoValue('User Created'),
        channelType: channelType,
        country: getInfoValue('Country'),
        positionHint: positionHint,
        vidviewsSVG: vidviewsSVG,
        subscribersSVG: subscribersSVG,
        earnings: earningsValue,
        avatarSrc: avatarSrc,
        headerBackgroundUrl: headerBackgroundUrl,
      };
    });

    await browser.close();

    return data;
  } catch (e) {
    return String(e);
  }
};

export default channelInfo;
