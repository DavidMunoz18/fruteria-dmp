export interface Stock {
    id: number;
    nombreProducto:string;
    tipoProducto:string;
    cantidadProducto:number;
    especificacionEntrega:string;
    precioVenta: number;
    descuento? : number;
}
