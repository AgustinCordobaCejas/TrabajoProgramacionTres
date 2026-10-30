import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Login } from '../interfaces/login';
import { Register } from '../interfaces/register';
import { LoginResponse } from '../interfaces/login-response';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn:'root'
})
export class AuthService {


private readonly apiUrl = `${environment.apiUrl}/Auth`;



constructor(
private http:HttpClient
){}




registrar(usuario:Register):Observable<{ message: string }>{

return this.http.post<{ message: string }>(
`${this.apiUrl}/register`,
usuario
);

}





login(usuario:Login):Observable<LoginResponse>{

return this.http.post<LoginResponse>(
`${this.apiUrl}/login`,
usuario
);

}





guardarToken(token:string){

localStorage.setItem(
"token",
token
);

}




obtenerToken(){

return localStorage.getItem(
"token"
);

}





logout(){

  localStorage.clear();

}





estaAutenticado(){

return this.obtenerToken()!=null;

}






// ==========================
// DECODIFICAR JWT
// ==========================


obtenerDatosToken(){


const token=this.obtenerToken();


if(!token){

return null;

}


const payload=
token.split('.')[1];


return JSON.parse(
atob(payload)
);


}






obtenerRol():string|null{


const datos=this.obtenerDatosToken();


if(!datos){

return null;

}



return datos[
"http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
];


}





esAdmin():boolean{


return this.obtenerRol()==="Admin";


}



}