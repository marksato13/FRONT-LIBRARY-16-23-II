import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alqui } from 'src/app/models/alquiler';
import { Lect } from 'src/app/models/lector';
import { Lib } from 'src/app/models/libr';

@Injectable({
  providedIn: 'root'
})
export class AlquiService {

  public apiUrl = 'http://localhost:8000/api/alquileres';
  public proyectoUrl = 'http://localhost:8000/api/libros';
  public xUrl = 'http://localhost:8000/api/lectores';



  constructor(public http: HttpClient) {}
  
  agregarAlquiler(alquiler: Alqui): Observable<Alqui> {
    return this.http.post<Alqui>(`${this.apiUrl}/InsertAlqui`, alquiler);
  }

  obtenerLector(): Observable<Lect[]> {
    return this.http.get<Lect[]>(`${this.xUrl}/ListLect`);
  }

  obtenerLibro(): Observable<Lib[]> {
    return this.http.get<Lib[]>(`${this.proyectoUrl}/ListBook`);
  }

  listarAlquiler(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ListAlqui`);
  }

//DeleteBook
  deleteAlquiler(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteAlqui/${id}`);
  }
}