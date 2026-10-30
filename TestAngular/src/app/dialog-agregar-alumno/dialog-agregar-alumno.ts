import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Alumno } from '../interfaces/Alumno';
import { Materias } from '../interfaces/Materias';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MateriaService } from '../services/materia-service';

@Component({
  selector: 'app-alumno-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
  ],
  template: `

    <h2 mat-dialog-title>{{ data.alumno ? 'Editar alumno' : 'Nuevo alumno' }}</h2>

    <mat-dialog-content>

      <mat-form-field appearance="outline">
        <mat-label>Nombre</mat-label>
        <input matInput [(ngModel)]="nombre" placeholder="Nombre">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Email</mat-label>
        <input matInput [(ngModel)]="email" placeholder="Email">
      </mat-form-field>

      <mat-form-field appearance="outline">

        <mat-label>Materia</mat-label>

        <mat-select [(ngModel)]="materiaId" name="materia">

          <mat-option *ngFor="let materia of materias" [value]="materia.id">
            
            {{ materia.nombre }}

          </mat-option>

        </mat-select>

      </mat-form-field>

    </mat-dialog-content>

    <mat-dialog-actions align="end">

      <button mat-button (click)="cancelar()">Cancelar</button>

      <button mat-raised-button color="primary" (click)="confirmar()" [disabled]="!nombre || !materiaId">
        {{ data.alumno ? 'Guardar' : 'Agregar' }}
      </button>

    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-width: 350px;
    }
  `]
})
export class AlumnoDialogComponent implements OnInit {

  nombre: string = '';
  email : string = '';

  materiaId: number | null = null;

  materias: Materias[] = [];

  constructor(
    private dialogRef: MatDialogRef<AlumnoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { alumno?: Alumno },
    private materiaService: MateriaService
    
  ) {

    if (data.alumno) {
      this.nombre    = data.alumno.nombre;      
      this.email = data.alumno.email;
      this.materiaId = data.alumno.materiaId;
  
    }
  }

  ngOnInit(): void {
    this.materiaService.getAll(1, 100, '').subscribe({
      next: (data) => this.materias = data.items,
      error: (err) => console.error('Error al cargar materias', err)
    });
  }

  confirmar() {

    this.dialogRef.close({ 

      nombre: this.nombre, 
      materiaId: this.materiaId ,
      email: this.email
      
    });
  }

  cancelar() {
    this.dialogRef.close();
  }
}