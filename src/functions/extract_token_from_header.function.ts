import { Request } from 'express';

export function extractTokenFromHeader(cookies: string): string {
  return cookies
    .split(';')
    .filter((cookie) => {
      return cookie.includes('token');
    })[0]
    .split('=')[1];
}
