import { Component } from '@angular/core'; 
import { FormsModule } from '@angular/forms'; 
import { Router, RouterLink } from '@angular/router'; 
import { AuthService } from '../auth.service'; 
import { apiErrorMessage } from '../../shared/api-error-message';
 
@Component({ 
  selector: 'app-register', 
  standalone: true, 
  imports: [ 
    FormsModule, 
    RouterLink 
  ], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
}) 
export class RegisterComponent { 
 
  usuario = { 
    nombre: '', 
    email: '', 
    password: '' 
  }; 
 
  constructor( 
    private authService: AuthService, 
    private router: Router 
  ) {} 
 
  registrar(): void { 
 
    this.authService.registrar(this.usuario) 
      .subscribe({ 
 
        next: () => { 
 
          alert('Usuario registrado correctamente'); 
 
          this.router.navigate(['/login']); 
 
        }, 
 
        error: (error: unknown) => { 
 
          console.error(error); 
 
          alert(apiErrorMessage(error, 'Error al registrar usuario')); 
 
        } 
 
      }); 
 
  }
}