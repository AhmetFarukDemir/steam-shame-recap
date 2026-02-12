const axios = require('axios');

const STEAM_API_KEY = process.env.STEAM_API_KEY;
const BASE_URL = 'https://api.steampowered.com';

/**
 * Fetch owned games for a Steam user
 * @param {string} steamId - 64-bit Steam ID
 * @returns {Promise<Object>} - Games data from Steam API
 */
async function getOwnedGames(steamId) {
  try {
    const url = `${BASE_URL}/IPlayerService/GetOwnedGames/v0001/`;
    const response = await axios.get(url, {
      params: {
        key: STEAM_API_KEY,
        steamid: steamId,
        format: 'json',
        include_appinfo: 1,
        include_played_free_games: 1,
      },
    });

    // Check if response has data
    if (!response.data || !response.data.response) {
      throw new Error('Invalid response from Steam API');
    }

    // If game_count is 0 or undefined, profile might be private
    if (response.data.response.game_count === 0 || !response.data.response.games) {
      throw new Error('This Steam profile is private or has no games');
    }

    return response.data.response;
  } catch (error) {
    if (error.response?.status === 403 || error.response?.status === 401) {
      throw new Error('This Steam profile is private. Please set your game details to public.');
    }
    
    if (error.message.includes('private')) {
      throw error;
    }

    throw new Error(`Failed to fetch owned games: ${error.message}`);
  }
}

/**
 * Fetch player profile summary
 * @param {string} steamId - 64-bit Steam ID
 * @returns {Promise<Object>} - Player profile data
 */
async function getPlayerSummary(steamId) {
  try {
    const url = `${BASE_URL}/ISteamUser/GetPlayerSummaries/v0002/`;
    const response = await axios.get(url, {
      params: {
        key: STEAM_API_KEY,
        steamids: steamId,
        format: 'json',
      },
    });

    // Validate response
    if (!response.data?.response?.players || response.data.response.players.length === 0) {
      throw new Error('Invalid Steam ID or player not found');
    }

    return response.data.response.players[0];
  } catch (error) {
    if (error.message.includes('Invalid Steam ID')) {
      throw error;
    }
    throw new Error(`Failed to fetch player profile: ${error.message}`);
  }
}

module.exports = {
  getOwnedGames,
  getPlayerSummary,
};
