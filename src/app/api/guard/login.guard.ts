import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { TokenStoragesService } from '../tokens/token-storages.service';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  role?: string;
  exp?: number;
}

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private tokenStorage: TokenStoragesService) { }

  private getToken(): string | null {
    return this.tokenStorage.getToken();
  }

  private isTokenValid(token: string): boolean {
    try {
      const decoded: JwtPayload = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return !!decoded.exp && decoded.exp > currentTime;
    } catch {
      return false;
    }
  }

  canActivate(): boolean {
    const token = this.getToken();

    if (!token || !this.isTokenValid(token)) {
      this.router.navigate(['/signin']);
      return false;
    }

    return true;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}