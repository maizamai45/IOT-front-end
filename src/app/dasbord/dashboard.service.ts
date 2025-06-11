import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:3005',
  timeout: 5000, // 5 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable sending cookies and authentication headers
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response error:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export interface MoistureData {
  id: number;
  sensorId: string;
  moistureValue: number;
  rawValue: number;
  dryValue: number;
  wetValue: number;
  recordedAt: string;
}

export class DashboardService {
  async getLatestData(): Promise<MoistureData[]> {
    try {
      const response = await api.get('/dashboard/latest');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          throw new Error('Request timeout - server is taking too long to respond');
        }
        if (!error.response) {
          throw new Error('Network error - please check if the backend server is running');
        }
        throw new Error(`Server error: ${error.response.data?.message || error.message}`);
      }
      throw error;
    }
  }

  async getDataBySensorId(sensorId: string): Promise<MoistureData[]> {
    try {
      const response = await api.get(`/dashboard/sensor/${sensorId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          throw new Error('Network error - please check if the backend server is running');
        }
        throw new Error(`Server error: ${error.response.data?.message || error.message}`);
      }
      throw error;
    }
  }

  async getStats(): Promise<{
    latest: MoistureData;
    average: number;
  }> {
    try {
      const response = await api.get('/dashboard/stats');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          throw new Error('Network error - please check if the backend server is running');
        }
        throw new Error(`Server error: ${error.response.data?.message || error.message}`);
      }
      throw error;
    }
  }

  async createMoistureData(data: Omit<MoistureData, 'id' | 'recordedAt'>): Promise<MoistureData> {
    try {
      const response = await api.post('/dashboard', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          throw new Error('Network error - please check if the backend server is running');
        }
        throw new Error(`Server error: ${error.response.data?.message || error.message}`);
      }
      throw error;
    }
  }
}

export const dashboardService = new DashboardService(); 