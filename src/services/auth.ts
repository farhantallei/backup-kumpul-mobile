import { makeRequest } from './makeRequest';

const prefix = 'accounts';

export function validation(userId: string) {
  return makeRequest(`${prefix}/${userId}`, { method: 'GET' });
}

export function register(data: { name: string; phoneNumber: string }) {
  return makeRequest<{ id: string }>(`${prefix}/register`, {
    method: 'POST',
    data,
  });
}

export function login(data: { phoneNumber: string }) {
  return makeRequest<{ id: string }>(`${prefix}/login`, {
    method: 'POST',
    data,
  });
}
