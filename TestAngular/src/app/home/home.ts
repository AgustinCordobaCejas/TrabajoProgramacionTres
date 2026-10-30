import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { AuthService } from '../auth/auth.service';



@Component({

selector:'app-home',

standalone:true,


imports:[

RouterModule,
MatButtonModule,
CommonModule

],


templateUrl:'./home.html',

styleUrl:'./home.scss'

})


export class Home {



esAdmin:boolean=false;



constructor(

private router:Router,

private authService:AuthService

){


this.esAdmin =
this.authService.esAdmin();



console.log(
"Rol usuario:",
this.authService.obtenerRol()
);



}






navegarAlDashboardB(){


this.router.navigate([
'/dashboardB'
]);


}




navegarAlDashboardC(){


this.router.navigate([
'/dashboardC'
]);


}





cerrarSesion(){


 console.log(
  "ANTES:",
  localStorage.getItem('token')
 );


 this.authService.logout();


 console.log(
  "DESPUES:",
  localStorage.getItem('token')
 );


 this.router.navigate(['/login'])
 .then(()=>{

   window.location.reload();

 });


}


}