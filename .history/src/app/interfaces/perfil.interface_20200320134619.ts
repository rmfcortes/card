export interface PrincipalPersona {
    colores: Colores;
    correo: string;
    empresa: string;
    foto: string;
    nombre: string;
    plantilla: string;
    portada: string;
    puesto: string;
    telefono: string;
    ubicacion: Direccion;
    whats: string
    face?: string;
    twitter?: string;
    pinterest?: string;
    instagram?: string;
    linkedIn?: string;
}

export interface Colores {
    background: string;
    nombre: string;
    puesto: string;
    botonesFill: string;
    botonesText: string;
    iconosText: string;   
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
