import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
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

  private getRoleFromToken(): string | null {
    const token = this.tokenStorage.getToken();
    if (!token) return null;

    try {
      const decoded: JwtPayload = (jwtDecode as any)(token);
      return decoded.role || null;
    } catch (err) {
      console.warn('Invalid token:', err);
      return null;
    }
  }

  private checkRole(requiredRole: string): boolean {
    const role = this.getRoleFromToken();

    if (!role) {
      this.router.navigate(['/']); // not logged in
      return false;
    }

    if (role !== requiredRole) {
      const redirect = role === 'ROLE_ADMIN' ? '/UserControl' : '/';
      this.router.navigate([redirect]); // insufficient role
      return false;
    }

    return true;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkRole('admin');
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkRole('admin');
  }
}