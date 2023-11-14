import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.github.com';
  constructor(
    private httpClient: HttpClient
  ) { }
  getUserDetails(username: string): Observable<any> {
    const url = `${this.apiUrl}/users/${username}`;
    return this.httpClient.get<any>(url);
  }
  getUserRepos(username: string, page: number, perPage: number): Observable<any[]> {
    const url = `${this.apiUrl}/users/${username}/repos`;
    const params = {
      page: page.toString(),
      per_page: perPage.toString()
    };
    return this.httpClient.get<any[]>(url, { params });
  }
  getRepoLanguages(username: string, repoName: string): Observable<any> {
    const url = `${this.apiUrl}/repos/${username}/${repoName}/languages`;
    return this.httpClient.get<any>(url);
  }
}
