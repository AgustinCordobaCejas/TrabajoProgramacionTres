import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';


export const routes: Routes = [



{
path:'',

redirectTo:'login',

pathMatch:'full'

},



{
path:'login',

loadComponent:()=> 
import('./auth/login/login.component')
.then(m=>m.LoginComponent)

},




{
path:'register',

loadComponent:()=> 
import('./auth/register/register.component')
.then(m=>m.RegisterComponent)

},




{
path:'home',

canActivate:[authGuard],

loadComponent:()=> 
import('./home/home')
.then(m=>m.Home)

},




{
path:'dashboardA',

canActivate:[authGuard],

loadComponent:()=> 
import('./dashboard-a/dashboard-a')
.then(m=>m.DashboardA)

},





{
path:'dashboardB',

canActivate:[
authGuard,
roleGuard
],

loadComponent:()=> 
import('./dashboard-b/dashboard-b')
.then(m=>m.DashboardB)

},





{
path:'dashboardC',

canActivate:[
authGuard,
roleGuard
],

loadComponent:()=> 
import('./dashboard-c/dashboard-c')
.then(m=>m.DashboardC)

},





{
path:'**',

redirectTo:'login'

}



];