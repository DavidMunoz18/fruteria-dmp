import { Component, inject, OnInit } from '@angular/core';
import { Stock } from '../modelos/stock';
import { StockSService } from '../servicios/stock-s.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedido-realizado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedido-realizado.component.html',
  styleUrl: './pedido-realizado.component.css'
})
export class PedidoRealizadoComponent  {

  stock: Stock[] = [];  // Tu lista de productos (puedes cargarla desde un servicio)
  stockOriginal: Stock[] = [];  // Guarda el stock original para poder mostrarlo sin filtros

  constructor() {
    // Simulación de la carga inicial del stock (puedes obtenerlo de un servicio)
    this.stock = [
      { nombreProducto: 'Manzana', tipoProducto: 'Fruta', cantidadProducto: 10, especificacionEntrega: 'Entrega rápida', precioVenta: 1.5 },
      { nombreProducto: 'Lechuga', tipoProducto: 'Verdura', cantidadProducto: 20, especificacionEntrega: 'Entrega estándar', precioVenta: 0.5 },
      { nombreProducto: 'Pera', tipoProducto: 'Fruta', cantidadProducto: 15, especificacionEntrega: 'Entrega urgente', precioVenta: 1.8 },
      { nombreProducto: 'Tomate', tipoProducto: 'Verdura', cantidadProducto: 25, especificacionEntrega: 'Entrega normal', precioVenta: 0.7 },
      { nombreProducto: 'Tomate', tipoProducto: 'Verdura', cantidadProducto: 25, especificacionEntrega: 'Entrega normal', precioVenta: 0.7 },
      { nombreProducto: 'Tomate', tipoProducto: 'Verdura', cantidadProducto: 25, especificacionEntrega: 'Entrega normal', precioVenta: 0.7 },
      { nombreProducto: 'Tomate', tipoProducto: 'Verdura', cantidadProducto: 25, especificacionEntrega: 'Entrega normal', precioVenta: 0.7 },
      
      { nombreProducto: 'Tomate', tipoProducto: 'Verdura', cantidadProducto: 25, especificacionEntrega: 'Entrega normal', precioVenta: 0.7 }
    ];
    this.stockOriginal = [...this.stock];  // Guarda el stock original para restaurar los filtros
  }

  // Método para filtrar por tipo de producto
  filtrarPorTipo(tipo: string) {
    if (tipo) {
      this.stock = this.stockOriginal.filter(producto => producto.tipoProducto === tipo);
    } else {
      this.stock = [...this.stockOriginal];  // Si no hay filtro, mostrar todo el stock
    }
  }
}
