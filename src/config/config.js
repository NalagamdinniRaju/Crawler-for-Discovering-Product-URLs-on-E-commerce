
require('dotenv').config();

module.exports = {
    // Example e-commerce sites
    domains: [
        'www.amazon.com',
        'www.flipkart.com',
        'www.myntra.com',
        'www.walmart.com',
        'www.bestbuy.com',
        'www.target.com',
        'www.ebay.com',
        'www.aliexpress.com',
        'www.etsy.com',
        'www.shopify.com',
        'www.zappos.com',
        'www.saksfifthavenue.com'
    ],
    crawler: {
        maxConcurrency: parseInt(process.env.MAX_CONCURRENT_CRAWLS) || 2,
        retryAttempts: 3,
        retryDelay: parseInt(process.env.CRAWL_DELAY) || 1000,
        timeout: 30000,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        respectRobotsTxt: true,
        maxDepth: 3,
        delay: {
            min: 1000,
            max: 3000
        }
    },
    outputPath: './output/results.json',
    productUrlPatterns: {
        'www.amazon.com': [
            '/dp/', 
            '/gp/product/',
            '/product/', 
            '/item/', 
            '/p/', 
            '/products/', 
            '-pd-', 
            '/detail/', 
            '/buy/'
        ],
        'www.flipkart.com': [
            '/product/', 
            '/item/', 
            '/p/', 
            '/products/', 
            '-pd-', 
            '/detail/', 
            '/buy/', 
            '/dp/'
        ],
        'www.myntra.com': [
            '/product/', 
            '/item/', 
            '/p/', 
            '/products/', 
            '-pd-', 
            '/detail/', 
            '/buy/'
        ],
        'www.walmart.com': [
            '/ip/',
            '/product/', 
            '/item/', 
            '/p/', 
            '/products/', 
            '-pd-', 
            '/detail/', 
            '/buy/'
        ],
        'www.bestbuy.com': [
            '/site/',
            '/product/', 
            '/item/', 
            '/p/', 
            '/products/', 
            '-pd-', 
            '/detail/', 
            '/buy/'
        ],
        'www.target.com': [
            '/p/',
            '/product/',
            '/item/',
            '/detail/',
            '/buy/'
        ],
        'www.ebay.com': [
            '/itm/',
            '/product/',
            '/p/',
            '/buy/'
        ],
        'www.aliexpress.com': [
            '/item/',
            '/product/',
            '/detail/',
            '/buy/'
        ],
        'www.etsy.com': [
            '/listing/',
            '/product/',
            '/p/',
            '/buy/'
        ],
        'www.shopify.com': [
            '/product/',
            '/p/',
            '/buy/'
        ],
        'www.zappos.com': [
            '/product/',
            '/item/',
            '/p/',
            '/detail/',
            '/buy/'
        ],
        'www.saksfifthavenue.com': [
            '/product/',
            '/item/',
            '/p/',
            '/detail/',
            '/buy/'
        ]
    },
    excludePatterns: [
        '/cart',
        '/checkout',
        '/login',
        '/signin',
        '/account',
        '/search'
    ]
};
