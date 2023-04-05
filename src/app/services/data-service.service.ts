import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bookmark } from '../bookmark.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  private readonly baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  create(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.post<Bookmark>(this.baseUrl + '/bookmarks', bookmark);
  }

  getBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.baseUrl + '/bookmarks');
  }
  deleteBookmarks(id: number) {
    return this.http.delete(this.baseUrl + '/bookmarks/' + id);
  }

  getCategory(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(
      this.baseUrl + '/categories'
    );
  }
  addCategory(name: string): Observable<{ id: number; name: string }> {
    return this.http.post<{ id: number; name: string }>(
      this.baseUrl + '/categories',
      { name }
    );
  }
}
