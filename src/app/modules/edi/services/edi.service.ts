import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Editor } from 'src/app/models/editorial';

@Injectable({
  providedIn: 'root'
})
export class EdiService {
  public URL: string = 'http://localhost:8000/api/editoriales';
  
  constructor(public http: HttpClient) {}

  public getAllEditorial(): Observable<Editor[]> {
    return this.http.get<Editor[]>(`${this.URL}/ListEdi`);
  } 

  public getEditorialById(id: number): Observable<Editor> {
    return this.http.get<Editor>(`${this.URL}/BuscarEdi/${id}`);
  }

  public createEditorial(editorial: Editor): Observable<Editor> {
    return this.http.post<Editor>(`${this.URL}/InsertEdi`,editorial);
  }

  public updateEditorial(id: number, editorial: Editor): Observable<Editor> {
    return this.http.put<Editor>(`${this.URL}/EdidEdi/${id}`,editorial);
  }

  public deleteEditorial(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/DeleteEdi/${id}`);
  }
}
