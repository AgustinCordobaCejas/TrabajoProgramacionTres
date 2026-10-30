import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Materia } from "../materia/materia";


@Component({
  selector: 'app-dashboard-b',
  imports: [
    RouterModule, 
    Materia
  ],
  templateUrl: './dashboard-b.html',
  styleUrl: './dashboard-b.scss',
})
export class DashboardB {


}
