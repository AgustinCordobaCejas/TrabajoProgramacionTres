
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Materias } from '../interfaces/Materias';
import { HttpClient } from '@angular/common/http';
import { CrearMateriaDto } from '../interfaces/CrearMateriaDto';
import { ActualizarMateriaDto } from '../interfaces/ActualizarMateriaDto';
import { environment } from '../../environments/environment';
import { PagedResult } from '../interfaces/PagedResult';



@Injectable({
  providedIn: 'root',
})
export class MateriaService {


  private readonly apiUrl = `${environment.apiUrl}/Materia`;

  constructor(

    private http: HttpClient

  ) {

  }

  getAll(page: number, pageSize: number, filter: string): Observable<PagedResult<Materias>> {
    return this.http.get<PagedResult<Materias>>(this.apiUrl, {
      params: { page, pageSize, filter },
    });

  }

  getById(id: number): Observable<Materias> {

    return this.http.get<Materias>(`${this.apiUrl}/${id}`);

  }

  CrearMateria(materia : CrearMateriaDto): Observable<Materias>{

    return this.http.post<Materias>(this.apiUrl, materia);

  }
    update(id: number, materia:ActualizarMateriaDto ): Observable<void> {
  
      return this.http.put<void>(`${this.apiUrl}/${id}`, materia);
  
    }
  
    delete(id: number): Observable<void> {
   
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
      
    }






}
