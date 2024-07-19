import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../services/libro.service';
import { Autr } from 'src/app/models/autor';
import { Cate } from 'src/app/models/categoria';
import { Editor } from 'src/app/models/editorial';
import { Libr } from 'src/app/models/libro';


@Component({
  selector: 'app-libro-pages',
  templateUrl: './libro-pages.component.html',
  styleUrls: ['./libro-pages.component.css']
})
export class LibroPagesComponent implements OnInit {
  nuevoLibro: Libr = new Libr();
  updateBook: Libr = new Libr();
  autores: Autr[] = [];
  editoriales: Editor[] = [];
  categorias: Cate[] = [];
  libros: any[] = [];
  idLibroEliminar: number = 0;
  idLibroEditar: number = 0;



  expandedId: number;



  constructor(private libroService: LibroService) { }
  //----------------------------------------------------------------------------------------
  ngOnInit() {
    this.obtenerListas();
    this.listarLibros();
  }
  //----------------------------------------------------------------------------------------
  obtenerListas() {
    this.libroService.obtenerAutores().subscribe((data) => {
      this.autores = data;
    });
    this.libroService.obtenerEditoriales().subscribe((data) => {
      this.editoriales = data;
    });
    this.libroService.obtenerCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }
  //----------------------------------------------------------------------------------------
  agregarLibro() {
    console.log(this.nuevoLibro)
    this.libroService.agregarLibro(this.nuevoLibro).subscribe(
      (data) => {
        console.log('Libro agregado correctamente', data);
        this.nuevoLibro = new Libr();
        this.listarLibros(); // Llama a listarLibros() después de agregar un libro
      },
      (error) => {
        console.error('Error al agregar el libro', error);
      }
    );
  }

  editBook() {
    this.updateBook = this.nuevoLibro;
    console.log(this.updateBook)
    console.log(this.nuevoLibro)
    this.libroService.actualizarLibro(this.idLibroEditar, this.nuevoLibro).subscribe(
      (data) => {
        console.log('Libro agregado correctamente', data);
        this.nuevoLibro = new Libr();
        this.listarLibros(); // Llama a listarLibros() después de agregar un libro
      },
      (error) => {
        console.error('Error al agregar el libro', error);
      }
    );
  }
  //----------------------------------------------------------------------------------------
  listarLibros() {
    this.libroService.listarLibros().subscribe(
      (data) => {
        console.log(data)
        this.libros = data;
      },
      (error) => {
        console.error('Error al obtener la lista de libros', error);
      }
    );
  }
  //----------------------------------------------------------------------------------------
  obtenerNombreAutor(id: number): string {
    const autor = this.autores.find((a) => a.id === id);
    return autor ? `${autor.nombreautor} ${autor.apellidosautor}` : '';
  }
  //----------------------------------------------------------------------------------------
  obtenerNombreCategoria(id: number): string {
    const categoria = this.categorias.find((c) => c.id === id);
    return categoria ? categoria.nombrecategoria : '';
  }
  //----------------------------------------------------------------------------------------
  obtenerNombreEditorial(id: number): string {
    const editorial = this.editoriales.find((e) => e.id === id);
    return editorial ? editorial.nombreeditorial : '';
  }
  //----------------------------------------------------------------------------------------
  // Eliminar un libro
  eliminarLibro(id: number) {
    this.libroService.deleteLibro(id).subscribe(
      () => {
        console.log('Libro eliminado correctamente');
        // Actualiza la lista de libros después de eliminar uno
        this.listarLibros();
      },
      (error) => {
        console.error('Error al eliminar el libro', error);
      }
    );
  }


  cargarDatosLibroParaEdicion(id: number) {
    this.idLibroEditar = id;
    const libroParaEditar = this.libros.find((libro) => libro.id === id);
    delete libroParaEditar.id;
    console.log(libroParaEditar)
    this.nuevoLibro = { ...libroParaEditar };
    this.nuevoLibro.autor = libroParaEditar.autor.id;
    this.nuevoLibro.editorial = libroParaEditar.editorial.id;
    this.nuevoLibro.categoria = libroParaEditar.categoria.id;
  }

  editarLibro() {
    console.log(this.idLibroEditar)
    this.libroService.actualizarLibro(this.idLibroEditar, this.nuevoLibro).subscribe(
      (data) => {
        console.log('Libro editado correctamente', data);
        this.nuevoLibro = new Libr();
        this.idLibroEditar = 0;
        this.listarLibros();
      },
      (error) => {
        console.error('Error al editar el libro', error);
      }
    );
  }
}