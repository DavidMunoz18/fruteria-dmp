import { Injectable } from '@angular/core';
import { Stock } from '../modelos/stock';

@Injectable({
  providedIn: 'root'
})
export class StockSService {

  constructor() { }

  private stock: Stock[] = [
    {
      nombreProducto: 'Manzana',
      tipoProducto: 'Fruta',
      cantidadProducto: 10,
      especificacionEntrega: 'Sin bolsa',
      precioVenta: 5,
      descuento: 0 // Por defecto, sin descuento
    },
    {
      nombreProducto: 'Zanahoria',
      tipoProducto: 'Verdura',
      cantidadProducto: 5,
      especificacionEntrega: 'Frescas',
      precioVenta: 3,
      descuento: 10 // 10% de descuento
    },
    {
      nombreProducto: 'Pera',
      tipoProducto: 'Fruta',
      cantidadProducto: 5,
      especificacionEntrega: 'Frescas',
      precioVenta: 7,
      descuento: 0 // Por defecto, sin descuento
    }
  ];

  // Obtener todos los productos
  getStock() {
    return this.stock;
  }

  // Añadir nuevos productos al stock
  addStock(stock: Stock) {
    this.stock.push(stock);
  }

  // Actualizar productos existentes
  updateStock(stockActualizado: Stock[]) {
    this.stock = stockActualizado;
  }

  // Aplicar un descuento simple a un producto específico
  setDescuento(nombreProducto: string, descuento: number) {
    this.stock.forEach(producto => {
      if (producto.nombreProducto === nombreProducto) {
        producto.descuento = descuento;
      }
    });
  }
}
