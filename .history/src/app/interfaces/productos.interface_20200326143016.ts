export interface Producto {
    codigo?: string;
    descripcio: string;
    id: string;
    nombre: string;
    pasillo: string;
    precio: number;
    unidad?: string;
    url: string;
}

export interface Pasillo {
    nombre: string;
    productos: Producto[];
}
