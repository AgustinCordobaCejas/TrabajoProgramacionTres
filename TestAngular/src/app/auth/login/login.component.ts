import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { Login } from '../../interfaces/login';
import { apiErrorMessage } from '../../shared/api-error-message';


@Component({

  selector:'app-login',

  standalone:true,

  imports:[
    CommonModule,
    FormsModule
  ],

  templateUrl:'./login.component.html',

  styleUrls:['./login.component.css']

})


export class LoginComponent {


  usuario:Login = {

    email:'',
    password:''

  };


  nuevoUsuario = {

    nombre:'',
    email:'',
    password:''

  };


  mostrarRegistro = false;


  mensaje = "";



  constructor(

    private authService:AuthService,

    private router:Router

  ){}





  voltearPagina(){


    this.mostrarRegistro = !this.mostrarRegistro;


    this.mensaje = "";


  }





  login(){


    this.authService.login(this.usuario)

    .subscribe({



      next:(respuesta)=>{


        this.authService.guardarToken(respuesta.token);


        this.router.navigate(['/home']);


      },



      error:(error: unknown)=>{
        this.mensaje = apiErrorMessage(error, "Email o contraseña incorrectos");


      }



    });



  }








  registrar(){


    this.authService.registrar(this.nuevoUsuario)

    .subscribe({



      next:()=>{


        alert("Usuario registrado correctamente");



        // limpiar registro

        this.nuevoUsuario = {

          nombre:'',
          email:'',
          password:''

        };



        // volver al login

        this.mostrarRegistro = false;



      },



      error:(error: unknown)=>{


        console.error("Error registro:",error);


        alert(apiErrorMessage(error, "Error al registrar usuario"));


      }



    });



  }



}