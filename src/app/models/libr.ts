export class Lib {
    id: number = 0;
    titulo: string = "";
    fechalan: string = "";
    idioma: string = "";
    paginas: string = "";
    descripcion: string = "";
    portada: string = "";

    autor: number;
    editorial: number;
    categoria: number;

    constructor() {
        this.titulo = "";
        this.fechalan = "";
        this.idioma = "";
        this.paginas = "";
        this.descripcion = "";
        this.portada = "";
        this.autor;
        this.editorial;
        this.categoria;
    }
}
