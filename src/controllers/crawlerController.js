
const { CrawlerService } = require('../services/crawlerService');
const { logger } = require('../utils/logger');
const fs = require('fs').promises;

class CrawlerController {
    constructor() {
        this.crawlerService = new CrawlerService();
    }

    async crawlDomains(domains) {
        const results = {};

        for (const domain of domains) {
            logger.info(`Starting crawl for domain: ${domain}`);
            
            try {
                const urls = await this.crawlerService.crawl(domain);
                results[domain] = urls;
                
                logger.info(`Completed crawl for ${domain}`, {
                    urlsFound: urls.length
                });

                // Save results after each domain
                await this.saveResults(results);
                
            } catch (error) {
                logger.error(`Error crawling ${domain}:`, error);
                results[domain] = [];
            }
        }

        return results;
    }

    async saveResults(results) {
        try {
            await fs.writeFile(
                './output/results.json',
                JSON.stringify(results, null, 2)
            );
        } catch (error) {
            logger.error('Error saving results:', error);
        }
    }
}

module.exports = { CrawlerController };