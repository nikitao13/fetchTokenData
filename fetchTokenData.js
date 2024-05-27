const axios = require('axios');

const dexscreenerUrl = `https://api.dexscreener.io/latest/dex/tokens`;

// placeholder addresses
const addresses = ['FZnSMd1hPu5MVgttmtfDZUPN5gcuexvrh3CB67UuQshb', 'G8Vy25NzjRmuQtnN35xF7j3X2Z1TrV39XijZu8Mg4w8n'];

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

// example call
// getTokenData(addresses)
//     .then(tokenDataArray => {
//         const data = tokenDataArray;
//         console.log(data);
//     })
//     .catch(error => console.error('Error:', error));