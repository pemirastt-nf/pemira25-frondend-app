/* eslint-disable @typescript-eslint/no-unused-vars */
const getBaseUrl = () => {
     let url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
     if (url.endsWith('/')) {
          url = url.slice(0, -1);
     }
     if (!url.endsWith('/api')) {
          url += '/api';
     }
     return url;
};

const API_URL = getBaseUrl();

export const BASE_URL = (() => {
     try {
          const url = new URL(API_URL);
          return url.origin;
     } catch {
          return 'http://localhost:5000';
     }
})();

const getHeaders = (token?: string | null) => {
     const headers: Record<string, string> = { 'Content-Type': 'application/json' };
     if (token) headers.Authorization = `Bearer ${token}`;

     return headers;
};

// Fetch location from browser to bypass proxy header stripping
export const getTracePayload = async (): Promise<Record<string, string>> => {
     if (typeof window === 'undefined') return {};
     try {
          const locCache = sessionStorage.getItem('voter_loc_cache');
          if (locCache) {
               const parsed = JSON.parse(locCache);
               return {
                    _clientIp: String(parsed.ip || ''),
                    _clientLocation: String(parsed.location || '')
               };
          }
          const res = await fetch('https://freeipapi.com/api/json/', { method: 'GET' });
          if (res.ok) {
               const data = await res.json();
               const ip = String(data.ipAddress || '');
               const location = String([data.cityName, data.regionName, data.countryName].filter(Boolean).join(', '));

               sessionStorage.setItem('voter_loc_cache', JSON.stringify({ ip, location }));
               return { _clientIp: ip, _clientLocation: location };
          }
     } catch {
          // Silently ignore if blocked
     }
     return {};
};

export const api = {

     login: async (nim: string, password: string) => {
          const trace = await getTracePayload();
          const res = await fetch(`${API_URL}/auth/login`, {
               method: 'POST',
               headers: getHeaders(),
               body: JSON.stringify({ nim, password, ...trace }),
          });
          if (!res.ok) throw new Error('Login failed');
          return res.json();
     },

     requestOtp: async (email: string) => {
          const trace = await getTracePayload();
          const res = await fetch(`${API_URL}/auth/otp-request`, {
               method: 'POST',
               headers: getHeaders(),
               body: JSON.stringify({ email, ...trace }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || 'Request OTP failed');
          return data;
     },

     verifyOtp: async (email: string, otp: string) => {
          const trace = await getTracePayload();
          const res = await fetch(`${API_URL}/auth/otp-verify`, {
               method: 'POST',
               headers: getHeaders(),
               body: JSON.stringify({ email, otp, ...trace }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || 'Verify OTP failed');
          return data;
     },

     getCandidates: async (options?: RequestInit) => {
          const headers = getHeaders();

          const fetchOptions = {
               ...options,
               headers: { ...headers, ...options?.headers },
               next: {
                    ...options?.next,
                    tags: ['candidates']
               }
          };
          const res = await fetch(`${API_URL}/candidates`, fetchOptions);
          if (!res.ok) throw new Error('Failed to fetch candidates');
          return res.json(); // Returns array
     },

     vote: async (candidateId: string, token: string) => {
          const trace = await getTracePayload();
          const res = await fetch(`${API_URL}/votes`, {
               method: 'POST',
               headers: getHeaders(token),
               body: JSON.stringify({ candidateId, ...trace }),
          });
          if (!res.ok) {
               const err = await res.json();
               throw new Error(err.message || 'Vote failed');
          }
          return res.json();
     },

     getVoteStatus: async (token: string) => {
          const res = await fetch(`${API_URL}/votes/status`, {
               headers: getHeaders(token)
          });
          if (!res.ok) {
               throw new Error('Failed to get status');
          }
          return res.json();
     },

     getStats: async (options?: RequestInit) => {
          const res = await fetch(`${API_URL}/votes/stats`, options);
          if (!res.ok) throw new Error('Failed to fetch stats');
          return res.json();
     },

     getResults: async (options?: RequestInit) => {
          const res = await fetch(`${API_URL}/votes/results`, options);
          if (!res.ok) throw new Error('Failed to fetch results');
          return res.json();
     },

     getWinner: async (options?: RequestInit) => {
          const res = await fetch(`${API_URL}/votes/winner`, options);
          if (!res.ok) throw new Error('Failed to fetch winner');
          return res.json();
     },

     getSettings: async (options?: RequestInit) => {
          const res = await fetch(`${API_URL}/settings`, options);
          if (!res.ok) throw new Error('Failed to fetch settings');
          return res.json();
     }
};


export const SOCKET_URL = (() => {
     const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
     try {
          // Robust way to get origin (protocol + host)
          const url = new URL(apiUrl);
          return url.origin;
     } catch (e) {
          console.error('[API] Invalid API URL for socket:', apiUrl);
          return 'http://localhost:5000';
     }
})();

import { io, Socket } from 'socket.io-client';

export const initSocket = (token: string | null): Socket => {
     return io(SOCKET_URL, {
          auth: { token },
          withCredentials: true,
          reconnection: true,
          transports: ['polling', 'websocket'] // Force order for better compatibility
     });
};
