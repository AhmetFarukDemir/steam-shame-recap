import axios from 'axios';
import type { ShameResponse } from '../types';

// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Fetch shame data from backend
 */
export async function fetchShameData(steamId: string): Promise<ShameResponse> {
  try {
    const response = await axios.get<ShameResponse>(`${API_BASE_URL}/shame/${steamId}`);
    
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Failed to connect to backend. Is the server running?');
  }
}
