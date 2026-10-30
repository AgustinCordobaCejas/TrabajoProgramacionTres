import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';



export const roleGuard: CanActivateFn = () => {


const authService = inject(AuthService);

const router = inject(Router);



if(authService.esAdmin()){


return true;


}



router.navigate(['/home']);


return false;


};