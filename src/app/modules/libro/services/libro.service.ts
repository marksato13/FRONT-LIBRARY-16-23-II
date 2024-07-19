import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autr } from 'src/app/models/autor';
import { Cate } from 'src/app/models/categoria';
import { Editor } from 'src/app/models/editorial';
import { Libr } from 'src/app/models/libro';


@Injectable({
  providedIn: 'root'
})
export class LibroService {
  public apiUrl = 'http://localhost:8000/api/libros';
  public autoresUrl = 'http://localhost:8000/api/autores';
  public editorialesUrl = 'http://localhost:8000/api/editoriales';
  public categoriasUrl = 'http://localhost:8000/api/categorias';

  constructor(public http: HttpClient) {}

  agregarLibro(libro: Libr): Observable<Libr> {
    return this.http.post<Libr>(`${this.apiUrl}/InsertLibro`, libro);
  }
//fora
  obtenerAutores(): Observable<Autr[]> {
    return this.http.get<Autr[]>(`${this.autoresUrl}/ListAutores`);
  }

  obtenerEditoriales(): Observable<Editor[]> {
    return this.http.get<Editor[]>(`${this.editorialesUrl}/ListEdi`);
  }

  obtenerCategorias(): Observable<Cate[]> {
    return this.http.get<Cate[]>(`${this.categoriasUrl}/ListCate`);
  }

  listarLibros(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ListBook`);
  }

//DeleteBook
  deleteLibro(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteBook/${id}`);
  }

  actualizarLibro(id: number, libro: Libr): Observable<Libr> {
    return this.http.put<Libr>(`${this.apiUrl}/EditBook/${id}`, libro);
  }
  
obtenerLibroPorId(id: number): Observable<Libr> {
  return this.http.get<Libr>(`${this.apiUrl}/ListAutores/${id}`);
}
listarLibrosPorCategoria(categoriaId: number): Observable<Libr[]> {
  return this.http.get<Libr[]>(`${this.apiUrl}/ListEdi/${categoriaId}`);
}
listarLibrosPorAutor(autorId: number): Observable<Libr[]> {
  return this.http.get<Libr[]>(`${this.apiUrl}/ListCate/${autorId}`);
}

}
  