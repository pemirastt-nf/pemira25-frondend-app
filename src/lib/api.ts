const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = {

     login: async (nim: string, password: string) => {
          const res = await fetch(`${API_URL}/auth/login`, {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ nim, password }),
          });
          if (!res.ok) throw new Error('Login failed');
          return res.json();
     },

     requestOtp: async (email: string) => {
          const res = await fetch(`${API_URL}/auth/otp-request`, {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ email }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || 'Request OTP failed');
          return data;
     },

     verifyOtp: async (email: string, otp: string) => {
          const res = await fetch(`${API_URL}/auth/otp-verify`, {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ email, otp }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || 'Verify OTP failed');
          return data;
     },

     getCandidates: async (options?: RequestInit) => {
          // Merge defaults with tags to allow revalidation
          const fetchOptions = {
               ...options,
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
          const res = await fetch(`${API_URL}/votes`, {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
               },
               body: JSON.stringify({ candidateId }),
          });
          if (!res.ok) {
               const err = await res.json();
               throw new Error(err.message || 'Vote failed');
          }
          return res.json();
     },

     getVoteStatus: async (token: string) => {
          const res = await fetch(`${API_URL}/votes/status`, {
               headers: {
                    'Authorization': `Bearer ${token}`
               }
          });
          if (!res.ok) return { hasVoted: false };
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

     getSettings: async (options?: RequestInit) => {
          const res = await fetch(`${API_URL}/settings`, options);
          if (!res.ok) throw new Error('Failed to fetch settings');
          return res.json();
     }
};

export const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';

import { io, Socket } from 'socket.io-client';

export const initSocket = (token: string | null): Socket => {
     return io(SOCKET_URL, {
          auth: { token },
          withCredentials: true,
          reconnection: true,
     });
};
