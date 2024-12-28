
const puppeteer = require('puppeteer');
const { URLParser } = require('./urlParser');
const { logger } = require('../utils/logger');
const config = require('../config/config');
const pLimit = require('p-limit');

class CrawlerService {
    constructor() {
        this.urlParser = new URLParser();
        this.limit = pLimit(config.crawler.maxConcurrency);
        this.visitedUrls = new Set();
        this.robotsCache = new Map();
    }

    async crawl(domain) {
        const browser = await puppeteer.launch({
            headless: "new",
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage'
            ]
        });

        const productUrls = new Set();
        
        try {
            const page = await browser.newPage();
            await this.configurePage(page);
            
            await this.crawlPage(
                `https://${domain}`,
                page,
                productUrls,
                domain
            );
            
        } finally {
            await browser.close();
        }

        return Array.from(productUrls);
    }

    async configurePage(page) {
        await page.setUserAgent(config.crawler.userAgent);
        await page.setViewport({ width: 1920, height: 1080 });
        await page.setDefaultNavigationTimeout(config.crawler.timeout);

        await page.setRequestInterception(true);
        page.on('request', (request) => {
            if (['image', 'stylesheet', 'font'].includes(request.resourceType())) {
                request.abort();
            } else {
                request.continue();
            }
        });
    }

    async crawlPage(url, page, productUrls, domain, depth = 0) {
        if (this.visitedUrls.has(url) || depth >= config.crawler.maxDepth) return;
        this.visitedUrls.add(url);

        try {
            const response = await page.goto(url, {
                waitUntil: 'networkidle0',
                timeout: config.crawler.timeout
            });

            if (!response.ok()) {
                logger.warn(`Failed to load ${url}: ${response.status()}`);
                return;
            }

            // Random delay between requests
            await new Promise(resolve => 
                setTimeout(resolve, 
                    Math.random() * (config.crawler.delay.max - config.crawler.delay.min) + 
                    config.crawler.delay.min
                )
            );

            // Extract URLs
            const urls = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('a[href]'))
                    .map(a => a.href)
                    .filter(href => href && href.startsWith('http'));
            });

            // Process URLs
            for (const foundUrl of urls) {
                if (this.urlParser.isProductUrl(foundUrl, domain)) {
                    productUrls.add(foundUrl);
                    logger.info(`Found product URL: ${foundUrl}`);
                } else if (foundUrl.includes(domain)) {
                    await this.limit(() => 
                        this.crawlPage(foundUrl, page, productUrls, domain, depth + 1)
                    );
                }
            }

        } catch (error) {
            logger.error(`Error crawling ${url}:`, error);
        }
    }
}

module.exports = { CrawlerService };