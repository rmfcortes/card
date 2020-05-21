export interface PrincipalPersona {
    colores: Colores;
    contacto: Contacto[];
    correo: string;
    empresa: string;
    foto: string;
    nombre: string;
    plantilla: string;
    portada: string;
    puesto: string;
    telefono: string;
    ubicacion: Direccion;
    vista: string;
    whats: string;
    web?: string;
    redes?: Red[];

}

export interface Contacto {
    funcion: string;
    icon: string
}

export interface Red {
    icon: string;
    page: string;
}

export interface Colores {
    direccion: string;
    background: string;
    nombre: string;
    puesto: string;
    botonesFill: string;
    botonesText: string;
    iconosText: string;
    contactoTitulo: string;
    iconosTabs: string;
    iconosTabsFocused: string;
    iconHomeTab: string;
    segmentButton: string;
    segmentButtonFocused: string;
    nombreProd: string;
    descripcionProd: string;
    precioProd: string;
    fondoCard: string;
    borderProds: string;
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
