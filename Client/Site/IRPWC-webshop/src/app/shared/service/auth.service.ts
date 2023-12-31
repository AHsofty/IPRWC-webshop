import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor() {}

  parseToken = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64));

    return JSON.parse(jsonPayload);
  };

  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) return false;

    return true;
  }

  public isAdmin(): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) return false;

    const claims = this.parseToken(token);
    if (claims.role !== 'ADMIN' && claims.role !== 'SUPERADMIN') return false;

    return true;
  }

  public setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  // Krijgt je JWT auth token
  public getToken() {
    return sessionStorage.getItem('token');
  }

}
