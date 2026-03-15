import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments.dev';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../auth/auth.service.service';
const url_extension = '/auth/signin';
@Injectable({
  providedIn: 'root',
})
export class SigninAdminPageService {
  private API = environments.api_url + url_extension;
  constructor(private httpClient: HttpClient, private authService: AuthServiceService) { }

  private getHttpOption() {
    return {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }

  public signinAdminPage(data: any): Observable<any> {
    const payload = {
      email: data.email,
      password: data.password
    }
    return this.httpClient.post<any>(
      `${this.API}`,
      payload,
      this.getHttpOption()
    );
  }
}
