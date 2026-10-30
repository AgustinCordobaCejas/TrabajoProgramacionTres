import { Component, OnInit } from '@angular/core';
import { MateriaService } from '../services/materia-service';
import { Materias } from '../interfaces/Materias';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DialogAgregarMateria } from '../dialog-agregar-materia/dialog-agregar-materia';
import Swal from 'sweetalert2';
import { AuthService } from '../auth/auth.service';
import { apiErrorMessage } from '../shared/api-error-message';

@Component({
  selector: 'app-materia',
  standalone: true,

  imports: [

    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule

  ],

  templateUrl: './materia.html',
  styleUrl: './materia.scss',
})
export class Materia implements OnInit {

  materia: Materias[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  readonly esAdmin: boolean;
  filtro = '';
  pageIndex = 0;
  pageSize = 10;
  totalCount = 0;

  constructor(

    //ACA DELCARAMOS EL SERVICIO PARA PODER UTILIZARLO EN LOS MÉTODOS

    private materiaService: MateriaService,
    private dialog: MatDialog,
    authService: AuthService

  ) {

    this.esAdmin = authService.esAdmin();
  }

  ngOnInit(): void {
        
    //ACÁ INICIALIZAMOS EL MÉTODO, Y SIRVE PARA CARGAR LA TABLITA
    this.cargarMaterias();

  }

  cargarMaterias() {

    this.materiaService.getAll(this.pageIndex + 1, this.pageSize, this.filtro).subscribe({

      next: (data) => {
        this.materia = data.items;
        this.totalCount = data.totalCount;
        if (this.totalCount > 0 && this.pageIndex * this.pageSize >= this.totalCount) {
          this.pageIndex = Math.ceil(this.totalCount / this.pageSize) - 1;
          this.cargarMaterias();
        }
      },

      error: (err: unknown) => {
        console.error('Error al cargar materias', err);
        Swal.fire('Error', apiErrorMessage(err, 'No se pudieron cargar las materias.'), 'error');
      },

    })

  }

  aplicarFiltro(filtro: string) {
    this.filtro = filtro;
    this.pageIndex = 0;
    this.cargarMaterias();
  }

  cambiarPagina(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.cargarMaterias();
  }

  agregarMateria() {

    const dialogRef = this.dialog.open(DialogAgregarMateria, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!result)
        return;

      this.materiaService.CrearMateria(result).subscribe({

        next: () => {

          //EL CASO DE EXITO, ES EL NEXT

          // Swal.fire('Listo', 'Materia agregado correctamente.', 'success');

          console.log('Materia agregada correctamente')

          this.cargarMaterias();

        },

        

        error: (error: unknown) => Swal.fire('Error', apiErrorMessage(error, 'No se pudo agregar la materia.'), 'error')

        //EL CASO DE ERROR ES CUANDO FALLA

      });
    });

    return console.log('Con este boton vamos a crear la materia, el backend ya tiene ese endpoint funcionando correctamente')

  }

  
    editarMateria(materia:Materias) {
  
      const dialogRef = this.dialog.open(DialogAgregarMateria, {
        data: { materia }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (!result) return;
  
        this.materiaService.update(materia.id, result).subscribe({
          next: () => {
  
            Swal.fire('Guardado', 'Materia actualizado correctamente.', 'success');
            this.cargarMaterias();
  
          },
          error: (error: unknown) => Swal.fire('Error', apiErrorMessage(error, 'No se pudo actualizar la materia.'), 'error')
        });
      });
  
    }
  
    eliminar(materia:Materias) {
      Swal.fire({
        title: '¿Eliminar Materia?',
        text: `Vas a eliminar a ${materia.nombre}. Esta acción no se puede deshacer.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (!result.isConfirmed) return;
  
        this.materiaService.delete(materia.id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'La materia fue eliminado.', 'success');
            this.cargarMaterias();
          },
          error: (error: unknown) => Swal.fire('Error', apiErrorMessage(error, 'No se pudo eliminar la materia.'), 'error')
        });
      });
    }

}
