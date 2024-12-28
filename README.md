

# 🛍️ E-commerce Product Crawler

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Puppeteer](https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=puppeteer&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

## 📖 Overview
A powerful and configurable web crawler designed specifically for e-commerce websites. This crawler efficiently discovers and extracts product URLs from major e-commerce platforms while respecting rate limits and robots.txt protocols.

## ✨ Features
- 🌐 Multi-domain crawling support
- ⚙️ Configurable crawling parameters
- 🤖 Respect for robots.txt
- 🚦 Rate limiting and concurrent request management
- 🔄 Automatic retry mechanism
- 📝 Comprehensive logging system
- 🎯 Domain-specific product URL pattern matching
- 🚫 Exclusion patterns for non-product pages
- 💾 Results persistence in JSON format

## 🛒 Supported E-commerce Platforms
- Amazon
- Flipkart
- Myntra
- Walmart
- Best Buy
- Target
- eBay
- AliExpress
- Etsy
- Shopify
- Zappos
- Saks Fifth Avenue

## 📋 Prerequisites
- Node.js (v14 or higher)
- npm or yarn

## 🚀 Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/ecommerce-crawler.git

# Install dependencies
cd ecommerce-crawler
npm install
```

## ⚙️ Configuration
Create a `.env` file in the root directory:
```env
NODE_ENV=development
MAX_CONCURRENT_CRAWLS=5
CRAWLER_TIMEOUT=30000
```

## 📂 Project Structure
```
ecommerce-crawler/
├── 📁 node_modules/
├── 📁 src/
│   ├── 📁 config/
│   │   └── 📄 config.js
│   ├── 📁 controllers/
│   │   └── 📄 crawlerController.js
│   ├── 📁 services/
│   │   ├── 📄 crawlerService.js
│   │   └── 📄 urlParser.js
│   └── 📁 utils/
│       ├── 📄 logger.js
│       └── 📄 validators.js
├── 📁 logs/
├── 📁 output/
├── 📄 .env
├── 📄 .gitignore
├── 📄 index.js
├── 📄 package-lock.json
├── 📄 package.json
└── 📄 README.md
```

## 🔧 Usage
```bash
# Start the crawler
npm start

```

## 📊 Logging
Logs are stored in the `logs` directory:
- 📄 error.log: Contains error-level logs
- 📄 combined.log: Contains all logs

## 💾 Output
Crawled URLs are saved in `output/results.json`


## 📝 Environment Variables
```env
NODE_ENV=development        # Application environment
MAX_CONCURRENT_CRAWLS=5     # Maximum concurrent crawl operations
CRAWLER_TIMEOUT=30000       # Timeout in milliseconds
```

## 🚀 API Reference

### CrawlerController
```javascript
const crawler = new CrawlerController();
await crawler.crawlDomains(['www.example.com']);
```

### URLParser
```javascript
const parser = new URLParser();
parser.isProductUrl('https://www.example.com/product/123');
```

## 📈 Performance
- Configurable concurrent requests
- Built-in rate limiting
- Memory-efficient crawling
- Automatic retry mechanism

## 🛡️ Error Handling
- Comprehensive error logging
- Automatic retry for failed requests
- Graceful shutdown mechanism

## 🙏 Acknowledgments
- [Puppeteer](https://pptr.dev/)
- [Winston Logger](https://github.com/winstonjs/winston)
- [dotenv](https://github.com/motdotla/dotenv)
