import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environments } from 'src/environments/environments.dev';
import { AuthServiceService } from '../auth/auth.service.service';
const url_extension = '/students';
@Injectable({
  providedIn: 'root',
})
export class StudentsServiceService {
  private API = environments.api_url + url_extension;
  constructor(private httpClient: HttpClient, private authService: AuthServiceService) { }

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

  public getAllStudents() {
    return this.httpClient.get<any>(`${this.API}`, this.getHttpOption(true));
  }
}
