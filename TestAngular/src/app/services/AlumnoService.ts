import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../interfaces/Alumno';
import { CrearAlumnoDto } from '../interfaces/CrearAlumnoDto';
import { environment } from '../../environments/environment';
import { PagedResult } from '../interfaces/PagedResult';


@Injectable({
  providedIn: 'root',
})
export class alumnosService {

  private readonly apiUrl = `${environment.apiUrl}/Alumno`;


  constructor(

    private http: HttpClient

  ) { }


  getAll(page: number, pageSize: number, filter: string): Observable<PagedResult<Alumno>> {
    return this.http.get<PagedResult<Alumno>>(this.apiUrl, {
      params: { page, pageSize, filter },
    });

  }


  getById(id: number): Observable<Alumno> {

    return this.http.get<Alumno>(`${this.apiUrl}/${id}`);

  }

  create(alumno: CrearAlumnoDto): Observable<Alumno> {

    return this.http.post<Alumno>(this.apiUrl, alumno);

  }

  update(id: number, alumno: CrearAlumnoDto): Observable<void> {

    return this.http.put<void>(`${this.apiUrl}/${id}`, alumno);

  }

  delete(id: number): Observable<void> {

    return this.http.delete<void>(`${this.apiUrl}/${id}`);
    
  }

}
