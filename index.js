
require('dotenv').config();
const { CrawlerController } = require('./src/controllers/crawlerController');
const { logger } = require('./src/utils/logger');
const { validateDomains } = require('./src/utils/validators');
const config = require('./src/config/config');

async function main() {
    try {
        // Validate domains
        const validationResult = validateDomains(config.domains);
        if (!validationResult.isValid) {
            throw new Error(`Invalid domains: ${validationResult.errors.join(', ')}`);
        }

        const crawler = new CrawlerController();
        logger.info('Starting crawl process', { domains: config.domains });

        const results = await crawler.crawlDomains(config.domains);

        logger.info('Crawling completed', {
            totalDomains: config.domains.length,
            totalUrls: Object.values(results).flat().length
        });

    } catch (error) {
        logger.error('Fatal error:', error);
        process.exit(1);
    }
}

// Error handling
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

main();