import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../auth/auth.service.service';
import { environments } from 'src/environments/environments.dev';
const urlExtension = 'sigup';
@Injectable({
  providedIn: 'root',
})
export class SignupAdminPageService {

  private API = environments.api_url + urlExtension;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthServiceService,
    private router: Router
  ) { }
  private getHttpOption(withToken: boolean = false) {
    let headers = new HttpHeaders();

    if (withToken) {
      const token = this.authService.getToken();
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }

    return {
      headers: headers
    };
  }

  public signupAdminPage(data: any): Observable<any> {
    return this.httpClient.post<{ token: string, user: any }>(
      this.API,
      this.getHttpOption()
    );
  }
}
