import { Component } from '@angular/core';
import { EdiService } from '../../services/edi.service';
import { Editor } from 'src/app/models/editorial';

@Component({
  selector: 'app-edi-pages',
  templateUrl: './edi-pages.component.html',
  styleUrls: ['./edi-pages.component.css']
})
export class EdiPagesComponent {
  editorial: Editor[] = [];
  nuevoEditorial: Editor = new Editor();
  editorialSeleccionado: Editor = new Editor();

  constructor(private ediService: EdiService) {}

  ngOnInit(): void {
    this.getAllEditorials();
  }
  getAllEditorials() {
    this.ediService.getAllEditorial().subscribe((data) => {
      this.editorial = data;
    });
  }
  //FUNCION PARA CREAR UN PROYECTO 
  crearEditorial() {
    this.ediService.createEditorial(this.nuevoEditorial).subscribe(
      (data) => {
        console.log('Editorial creado', data);
        this.nuevoEditorial = new Editor(); 
        this.getAllEditorials(); 
      },
      (error) => {
        console.error('Error al crear el edi', error);
      }
    );
  }
  seleccionarEditorial(editorial: Editor) {
    this.editorialSeleccionado = editorial;
  }
  //FUNCION PARA EDITAR Y ACTUALIZAR EL PROYECTO 
  actualizarEditorial() {
    this.ediService.updateEditorial(this.editorialSeleccionado.id, this.editorialSeleccionado).subscribe(() => {
      this.editorialSeleccionado = new Editor(); 
      this.getAllEditorials(); 
    });
  }
  //FUNCION PARA ELIMINAR EL PROYECTO 
  eliminarEditorial(id: number) {
    this.ediService.deleteEditorial(id).subscribe(() => {
      this.getAllEditorials(); 
    });
  }
}