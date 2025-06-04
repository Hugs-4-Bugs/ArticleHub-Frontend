import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  addNewArticle(data: any) {
    return this.httpClient.post(this.url + '/article/addNewArticle', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  updateArticle(data: any) {
    return this.httpClient.post(this.url + '/article/updateArticle', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  getAllArticle() {
    return this.httpClient.get(this.url + '/article/getAllArticle');
  }

  getAllPublishedArticle() {
    return this.httpClient.get(this.url + '/article/getAllPublishedArticle');
  }

  /**
   * Delete an article by ID.
   *
   * Backend API supports both @GetMapping and @DeleteMapping for this endpoint:
   * - If backend uses @GetMapping, send HTTP GET request to '/article/deleteArticle/{id}'
   * - If backend uses @DeleteMapping, send HTTP DELETE request to '/article/deleteArticle/{id}'
   *
   * Note: It's recommended to use HTTP DELETE for deleting resources to follow REST standards.
   *
   * Make sure the HTTP method in this frontend service matches the backend implementation.
   */
  deleteArticle(id: any) {
    //   return this.httpClient.get(this.url + '/article/deleteArticle/' + id);   // for Get Http method
    // Use DELETE HTTP method to align with backend's @DeleteMapping
    return this.httpClient.delete(this.url + '/article/deleteArticle/' + id);
  }
}
