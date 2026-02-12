// TypeScript Types - Backend Response Interfaces

export interface User {
  name: string;
  avatar: string;
  profileUrl: string;
}

export interface Stats {
  totalGames: number;
  unplayedGames: number;
  wastedMoneyUSD: number;
  wastedHours: number;
}

export interface Conversions {
  bigMacs: number;
  starbucksCoffees: number;
  gasGallons: number;
  spotifyMonths: number;
}

export interface Game {
  name: string;
  appid: number;
  playtimeMinutes: number;
  playtimeHours: number;
  imgIcon: string | null;
}

export interface ShameResponse {
  user: User;
  stats: Stats;
  conversions: Conversions;
  gamesList: Game[];
  roastMessage: string;
}
