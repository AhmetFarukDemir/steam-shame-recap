/**
 * Calculation utilities for Steam Shame Recap
 * Calculates wasted money and converts to relatable US items
 */

// US Pricing Constants
const AVERAGE_GAME_PRICE_USD = 15; // Average game price on Steam
const BIG_MAC_PRICE = 5.69;        // Big Mac Index price (US average)
const STARBUCKS_LATTE_PRICE = 5.95; // Venti Latte price (US average)
const GAS_GALLON_PRICE = 3.50;     // US average gas price per gallon
const SPOTIFY_PREMIUM_PRICE = 11.99; // Monthly Spotify Premium (US)

/**
 * Filter unplayed games (< 2 hours of playtime)
 * @param {Array} games - Array of game objects with playtime_forever in minutes
 * @returns {Array} - Filtered array of unplayed games
 */
function filterUnplayedGames(games) {
  const UNPLAYED_THRESHOLD_MINUTES = 120; // 2 hours
  return games.filter(game => game.playtime_forever < UNPLAYED_THRESHOLD_MINUTES);
}

/**
 * Estimate wasted money on unplayed games
 * @param {number} unplayedCount - Number of unplayed games
 * @returns {number} - Estimated wasted money in USD
 */
function calculateWastedMoney(unplayedCount) {
  return unplayedCount * AVERAGE_GAME_PRICE_USD;
}

/**
 * Convert wasted money to relatable US items/services
 * @param {number} wastedMoneyUSD - Total wasted money in USD
 * @returns {Object} - Conversion quantities
 */
function convertToRealWorldItems(wastedMoneyUSD) {
  return {
    bigMacs: Math.floor(wastedMoneyUSD / BIG_MAC_PRICE),
    starbucksCoffees: Math.floor(wastedMoneyUSD / STARBUCKS_LATTE_PRICE),
    gasGallons: Math.floor(wastedMoneyUSD / GAS_GALLON_PRICE),
    spotifyMonths: Math.floor(wastedMoneyUSD / SPOTIFY_PREMIUM_PRICE),
  };
}

/**
 * Format games list with readable playtime
 * @param {Array} games - Array of unplayed game objects
 * @returns {Array} - Formatted games with hours
 */
function formatGamesList(games) {
  return games.map(game => ({
    name: game.name,
    appid: game.appid,
    playtimeMinutes: game.playtime_forever || 0,
    playtimeHours: parseFloat(((game.playtime_forever || 0) / 60).toFixed(1)),
    imgIcon: game.img_icon_url || null,
  }));
}

module.exports = {
  filterUnplayedGames,
  calculateWastedMoney,
  convertToRealWorldItems,
  formatGamesList,
};
