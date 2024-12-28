
const { URL } = require('url');

function validateDomains(domains) {
    if (!Array.isArray(domains)) {
        return {
            isValid: false,
            errors: ['Domains must be an array']
        };
    }

    const errors = [];
    const validDomains = [];

    for (const domain of domains) {
        try {
            new URL(`https://${domain}`);
            validDomains.push(domain);
        } catch (error) {
            errors.push(`Invalid domain: ${domain}`);
        }
    }

    return {
        isValid: errors.length === 0,
        errors,
        validDomains
    };
}

module.exports = { validateDomains };