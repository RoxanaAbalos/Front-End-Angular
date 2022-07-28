import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { URL_BACKEND } from '../config/config';
import { Perfil } from '../models/perfil';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private urlEndPoint: string = URL_BACKEND + '/porfolio/perfil';
  public httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http:HttpClient) { 

  }
  getPerfiles(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(this.urlEndPoint);
  }

  getPerfil(id?: number): Observable<Perfil> {
    return this.http.get<Perfil>(`${this.urlEndPoint}/1`).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  add(perfil: Perfil): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, perfil).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  update(perfil: Perfil): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${perfil.id}`, perfil).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  subirFoto(archivo: File, id): Observable<Perfil> {
    let formData = new FormData();

    formData.append("archivo", archivo);
    formData.append("id", id);
    return this.http.post(`${this.urlEndPoint}/upload`, formData).pipe(
      map((response:any)=> response.perfil as Perfil), 
      catchError(e => {
        return throwError(e);
      })
    );

  }
}
