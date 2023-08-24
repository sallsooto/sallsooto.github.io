import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'https://opentdb.com/api_category.php';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<{trivia_categories: Category[] }> {
    return this.http.get<{ trivia_categories: Category[] }>(this.apiUrl);
  }
}
