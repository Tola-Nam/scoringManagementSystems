import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenStoragesService } from '../tokens/token-storages.service';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private _authToken = new BehaviorSubject<string | null>(null);
  constructor(
    private tokenStorage: TokenStoragesService,
    private http: HttpClient,
  ) {
    const token = this.tokenStorage.getToken();

    if (token && this.isTokenValid(token)) {
      this._authToken.next(token);
    } else {
      this.clearToken();
    }
  }

  public get token(): string | null {
    return this._authToken.value;
  }

  public setToken(token: string): void {
    if (this.isTokenValid(token)) {
      this.tokenStorage.storeToken(token);
      this._authToken.next(token);
    } else {
      this.clearToken();
    }
  }

  public clearToken(): void {
    this.tokenStorage.removeToken();
    this._authToken.next(null);
  }
  public isAuthenticated(): boolean {
    const token = this._authToken.value;
    return !!token && this.isTokenValid(token);
  }

  private isTokenValid(token: string): boolean {
    try {
      if (!token) return false;

      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      return decodedToken.exp && decodedToken.exp > currentTime;
    } catch (error) {
      console.warn('Invalid token detected:', error);
      return false;
    }
  }
}
