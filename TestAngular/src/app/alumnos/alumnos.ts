import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Alumno } from '../interfaces/Alumno';
import { alumnosService } from '../services/AlumnoService';
import Swal from 'sweetalert2';
import { AlumnoDialogComponent } from '../dialog-agregar-alumno/dialog-agregar-alumno';
import { AuthService } from '../auth/auth.service';
import { apiErrorMessage } from '../shared/api-error-message';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [

    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './alumnos.html',
  styleUrl: './alumnos.scss',
})
export class AlumnosComponent implements OnInit {

  alumnos: Alumno[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'email', 'materia', 'acciones'];
  readonly esAdmin: boolean;
  filtro = '';
  pageIndex = 0;
  pageSize = 10;
  totalCount = 0;

  constructor(
    private alumnosService: alumnosService,
    private dialog: MatDialog,
    authService: AuthService
  ) {
    this.esAdmin = authService.esAdmin();
  }

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos() {
    this.alumnosService.getAll(this.pageIndex + 1, this.pageSize, this.filtro).subscribe({

      next: (data) => {
        this.alumnos = data.items;
        this.totalCount = data.totalCount;
        if (this.totalCount > 0 && this.pageIndex * this.pageSize >= this.totalCount) {
          this.pageIndex = Math.ceil(this.totalCount / this.pageSize) - 1;
          this.cargarAlumnos();
        }
      },

      error: (err: unknown) => {
        console.error('Error al traer alumnos', err);
        Swal.fire('Error', apiErrorMessage(err, 'No se pudieron cargar los alumnos.'), 'error');
      },

    });
  }

  aplicarFiltro(filtro: string) {
    this.filtro = filtro;
    this.pageIndex = 0;
    this.cargarAlumnos();
  }

  cambiarPagina(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.cargarAlumnos();
  }

  agregarAlumno() {

    const dialogRef = this.dialog.open(AlumnoDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result)
        return;

      this.alumnosService.create(result).subscribe({

        next: () => {
          Swal.fire('Listo', 'Alumno agregado correctamente.', 'success');
          this.cargarAlumnos();
        },

        error: (error: unknown) => Swal.fire('Error', apiErrorMessage(error, 'No se pudo agregar el alumno.'), 'error')

      });
    });

  }

  editarAlumno(alumno: Alumno) {

    const dialogRef = this.dialog.open(AlumnoDialogComponent, {
      data: { alumno }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.alumnosService.update(alumno.id, result).subscribe({
        next: () => {

          Swal.fire('Guardado', 'Alumno actualizado correctamente.', 'success');
          this.cargarAlumnos();

        },
        error: (error: unknown) => Swal.fire('Error', apiErrorMessage(error, 'No se pudo actualizar el alumno.'), 'error')
      });
    });

  }

  eliminar(alumno: Alumno) {
    Swal.fire({
      title: '¿Eliminar alumno?',
      text: `Vas a eliminar a ${alumno.nombre}. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (!result.isConfirmed) return;

      this.alumnosService.delete(alumno.id).subscribe({
        next: () => {
          Swal.fire('Eliminado', 'El alumno fue eliminado.', 'success');
          this.cargarAlumnos();
        },
        error: (error: unknown) => Swal.fire('Error', apiErrorMessage(error, 'No se pudo eliminar el alumno.'), 'error')
      });
    });
  }
}