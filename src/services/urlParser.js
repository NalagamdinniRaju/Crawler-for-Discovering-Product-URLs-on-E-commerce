
const config = require('../config/config');

class URLParser {
    isProductUrl(url, domain) {
        try {
            const urlObj = new URL(url);
            const path = urlObj.pathname.toLowerCase();

            // Check exclude patterns
            if (config.excludePatterns.some(pattern => path.includes(pattern))) {
                return false;
            }

            // Check domain-specific product patterns
            const patterns = config.productUrlPatterns[domain] || [];
            return patterns.some(pattern => path.includes(pattern));
        } catch (error) {
            return false;
        }
    }
}

module.exports = { URLParser };