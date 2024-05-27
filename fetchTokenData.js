const axios = require('axios');

const dexscreenerUrl = `https://api.dexscreener.io/latest/dex/tokens`;

async function getTokenData(addresses) {
    try {
        const results = await Promise.all(addresses.map(address => axios.get(`${dexscreenerUrl}/${address}`)));
        return results.map(res => extractFormattedData(res.data)).filter(data => data !== null);
    } catch (error) {
        console.error('Error fetching token data:', error);
        return [];
    }
}

function extractFormattedData(data) {
    const pairs = data.pairs || [];
    if (pairs.length > 0) {
        const pair = pairs[0];
        const { fdv, priceUsd, baseToken: { name: tokenName } } = pair;
        return formatData(tokenName, priceUsd, fdv);
    }
    return null;
}

const formatData = (tokenName, priceUSD, fdv) => ({
    name: tokenName,
    price: parseFloat(parseFloat(priceUSD).toFixed(6)),
    fdv: fdv // remember to add format function here
});

module.exports = {
    getTokenData
};