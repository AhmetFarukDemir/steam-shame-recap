const steamService = require('../services/steamService');
const {
  filterUnplayedGames,
  calculateWastedMoney,
  convertToRealWorldItems,
  formatGamesList,
} = require('../utils/calculations');

/**
 * Generate sarcastic roast message (generic, no spoiler numbers)
 * @returns {string} - Random roast message
 */
function generateRoastMessage() {
  const roasts = [
    "Your wallet is screaming in agony.",
    "Professional digital hoarder detected.",
    "Gabe Newell just bought a new yacht thanks to you.",
    "So many games, so little time... explicitly zero time.",
    "Financial decisions were made. Bad ones.",
    "Steam's favorite customer has entered the chat.",
    "Congratulations on your collection of unplayed regret.",
    "Your backlog has filed for independence.",
    "Achievement unlocked: Master of Buyer's Remorse.",
    "The Steam sales won. You lost.",
    "Your library called. It wants to know if you're okay.",
    "Support local billionaires: Buy games you'll never play.",
  ];

  // Pick a random roast
  return roasts[Math.floor(Math.random() * roasts.length)];
}

/**
 * Main controller for /api/shame/:steamId endpoint
 */
async function getShame(req, res) {
  try {
    const { steamId } = req.params;

    // Validate Steam ID format (17-digit 64-bit Steam ID)
    if (!steamId || !/^\d{17}$/.test(steamId)) {
      return res.status(400).json({
        error: 'Invalid Steam ID. Please provide a 17-digit Steam ID (SteamID64).',
      });
    }

    // Fetch data from Steam API in parallel
    const [gamesData, profileData] = await Promise.all([
      steamService.getOwnedGames(steamId),
      steamService.getPlayerSummary(steamId),
    ]);

    // Filter unplayed games
    const unplayedGames = filterUnplayedGames(gamesData.games || []);
    const totalGames = gamesData.game_count || 0;
    const unplayedCount = unplayedGames.length;

    // Calculate wasted money (USD)
    const wastedMoneyUSD = calculateWastedMoney(unplayedCount);

    // Convert to real-world items
    const conversions = convertToRealWorldItems(wastedMoneyUSD);

    // Format games list
    const gamesList = formatGamesList(unplayedGames);

    // Generate roast message (random, no spoilers)
    const roastMessage = generateRoastMessage();

    // Build response
    const response = {
      user: {
        name: profileData.personaname || 'Unknown Player',
        avatar: profileData.avatarfull || '',
        profileUrl: profileData.profileurl || '',
      },
      stats: {
        totalGames,
        unplayedGames: unplayedCount,
        wastedMoneyUSD,
        wastedHours: 0, // Could be calculated if needed
      },
      conversions,
      gamesList,
      roastMessage,
    };

    res.json(response);
  } catch (error) {
    console.error('Error in getShame:', error.message);

    // Handle specific error types
    if (error.message.includes('private')) {
      return res.status(403).json({
        error: 'This Steam profile is private. Please set your game details to public.',
      });
    }

    if (error.message.includes('Invalid Steam ID')) {
      return res.status(400).json({
        error: 'Invalid Steam ID. Please check and try again.',
      });
    }

    res.status(500).json({
      error: 'Failed to fetch Steam data. Please try again later.',
    });
  }
}

module.exports = {
  getShame,
};
