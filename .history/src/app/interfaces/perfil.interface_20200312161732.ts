export interface PrincipalPersona {
    nombre: string;
    correo: string;
    telefono: string;
    whats: string
    ubicacion: Direccion;
    puesto: string;
    empresa: string;
    portada: string;
    foto: string;
    face?: string;
    twitter?: string;
    pinterest?: string;
    instagram?: string;
    linkedIn?: string;
}

export interface Direccion {
    direccion: string;
    lat: number;
    lng: number;
}
