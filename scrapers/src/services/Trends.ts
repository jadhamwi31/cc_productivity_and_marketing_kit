import * as puppeteer from 'puppeteer';

const Trends = async (geo: string, cat: string): Promise<any> => {
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

    await page.setViewport({ width: 1920, height: 1080 });

    await page.goto(
      `https://trends.google.com/trends/trendingsearches/realtime?geo=${geo}&hl=en-US&category=${cat}`,
      { timeout: 0 },
    );

    const scrollPageToBottom = async () => {
      await page.evaluate(async () => {
        await new Promise<void>((resolve) => {
          let totalHeight = 0;
          const distance = 100;
          const scrollInterval = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if (totalHeight >= scrollHeight) {
              clearInterval(scrollInterval);
              resolve();
            }
          }, 100);
        });
      });
    };

    await scrollPageToBottom();
    await page.waitForTimeout(2000);

    const data = await page.$$eval('feed-item', (items) => {
      return items.map((item, index) => {
        const extractAttribute = (attribute: string) => item.getAttribute(attribute) || null;
        const extractSVG = (item: any) => {
          const svgElement = item.querySelector('sparkline .sparkline-chart svg');
          return svgElement ? svgElement.outerHTML : null;
        };

        const titleElement = item.querySelector('.details-top .title a');
        const title = titleElement?.textContent?.trim() || null;
        const summary = item.querySelector('.summary-text')?.textContent?.trim();
        const imageURL = extractAttribute('image-url');
        const articleLink = item.querySelector('.summary-text a')?.getAttribute('href') || null;
        const svg = extractSVG(item);

        return {
          imageURL,
          subtitles: extractAttribute('subtitles'),
          titleArray: Array.from(item.querySelectorAll('.details-top .title a')).map(
            (titleItem) => titleItem.textContent?.trim() || null,
          ),
          summary,
          articleLink,
          svg,
        };
      });
    });

    console.log(data);
    await browser.close();
    return data;
  } catch (e) {
    console.error(e);
    return e;
  }
};

export default Trends;
