import { Component, OnInit } from '@angular/core';
import { AlquiService } from '../../services/alqui.service';
import { Alqui } from 'src/app/models/alquiler';
import { Lect } from 'src/app/models/lector';
import { Lib } from 'src/app/models/libr';


@Component({
  selector: 'app-alqui-pages',
  templateUrl: './alqui-pages.component.html',
  styleUrls: ['./alqui-pages.component.css']
})
export class AlquiPagesComponent implements OnInit {
  nuevoAlquiler: Alqui = new Alqui();
  lectors: Lect[] = [];
  libros: Lib[] = [];
  alquilers: any[] = [];
  idAlquilerEliminar: number = 0;
  idAlquilerEditar: number = 0;
  acordeonAbierto = false; // Debes declarar la propiedad acordeonAbierto aquí

  constructor(private alquiService: AlquiService) { }
  //----------------------------------------------------------------------------------------
  ngOnInit() {
    this.obtenerListas();
    this.listarAlquiler();
  }
//----------------------------------------------------------------------------------------
  obtenerListas() {
    this.alquiService.obtenerLector().subscribe((data) => {
      this.lectors = data;
    });
    this.alquiService.obtenerLibro().subscribe((data) => {
      this.libros = data;
    });
  }
//----------------------------------------------------------------------------------------
agregarAlquiler() {
  this.alquiService.agregarAlquiler(this.nuevoAlquiler).subscribe(
    (data) => {
      console.log('Alquiler agregado correctamente', data);
      this.nuevoAlquiler = new Alqui();
      this.listarAlquiler();
    },
    (error) => {
      console.error('Error al agregar el alquiler', error);
      // Agrega lógica para manejar el error, por ejemplo, mostrar un mensaje al usuario.
    }
  );
}

 //----------------------------------------------------------------------------------------
 listarAlquiler() {
    this.alquiService.listarAlquiler().subscribe(
      (data) => {
        console.log(data)
        this.alquilers = data;
      },
      (error) => {
        console.error('Error al obtener la lista de alquiler', error);
      }
    );
  }
//----------------------------------------------------------------------------------------
obtenerLector(id: number): string {
   const lector = this.lectors.find((a) => a.id === id);
    return lector ? lector.nombre: '';
  }


  obtenerLibro(id: number): string {
    const libro = this.libros.find((a) => a.id === id);
     return libro ? libro.titulo: '';
   }
 
 //----------------------------------------------------------------------------------------
  // Eliminar un libro
  eliminarAlquiler(id: number) {
    this.alquiService.deleteAlquiler(id).subscribe(
      () => {
        console.log('alquiler eliminado correctamente');
        // Actualiza la lista de libros después de eliminar uno
        this.listarAlquiler();
      },
      (error) => {
        console.error('Error al eliminar el alquiler', error);
      }
    );
  }

  generateAccordionId(index: number): string {
    return `accordion-${index}`;
  }
}
