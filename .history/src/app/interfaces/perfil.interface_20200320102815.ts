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
    plantilla: string;
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

export interface HostRegistrados {
    host: string;
    id: string;
}
