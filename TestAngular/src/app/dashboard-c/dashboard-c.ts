import { Component } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-dashboard-c',
  standalone:true,
  imports:[RouterModule],
  templateUrl:'./dashboard-c.html',
  styleUrl:'./dashboard-c.scss',
})
export class DashboardC {


constructor(

 private authService:AuthService,

 private router:Router

){}



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