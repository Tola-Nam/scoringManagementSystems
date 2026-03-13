import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenStoragesService } from '../tokens/token-storages.service';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';

interface JwtPayload {
  exp?: number;
  role?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private _authToken = new BehaviorSubject<string | null>(null);
  private _userRole = new BehaviorSubject<string | null>(null);

  constructor(
    private tokenStorage: TokenStoragesService,
    private http: HttpClient
  ) {
    const token = this.tokenStorage.getToken();

    if (token && this.isTokenValid(token)) {
      this._authToken.next(token);
      this._userRole.next(this.extractRole(token));
    } else {
      this.clearToken();
    }
  }

  // --- Token management ---
  public get token(): string | null {
    return this._authToken.value;
  }

  public setToken(token: string): void {
    if (this.isTokenValid(token)) {
      this.tokenStorage.storeToken(token);
      this._authToken.next(token);
      this._userRole.next(this.extractRole(token)); // update role dynamically
    } else {
      this.clearToken();
    }
  }

  public clearToken(): void {
    this.tokenStorage.removeToken();
    this._authToken.next(null);
    this._userRole.next(null); // clear role too
  }

  public isAuthenticated(): boolean {
    const token = this._authToken.value;
    return !!token && this.isTokenValid(token);
  }

  // --- Role management ---
  public getUserRole(): string | null {
    return this._userRole.value;
  }

  public getUserRole$() {
    return this._userRole.asObservable();
  }

  private extractRole(token: string): string | null {
    try {
      const decoded: JwtPayload = jwtDecode(token);
      return decoded.role || null;
    } catch (error) {
      console.warn('Failed to decode token for role:', error);
      return null;
    }
  }

  // --- Token validation ---
  private isTokenValid(token: string): boolean {
    try {
      if (!token) return false;
      const decoded: JwtPayload = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return !!decoded.exp && decoded.exp > currentTime;
    } catch (error) {
      console.warn('Invalid token detected:', error);
      return false;
    }
  }
}