import { Component, OnInit } from '@angular/core';
import { Stock } from '../modelos/stock';
import { StockSService } from '../servicios/stock-s.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
  stockDisponible: Stock[] = [];
  cesto: Stock[] = [];

  constructor(private stockService: StockSService) {}

  ngOnInit() {
    // Obtener el stock desde el servidor (json-server)
    this.stockService.getStock().subscribe((data) => {
      this.stockDisponible = data;
    });

    // Obtener el cesto desde el servidor (json-server)
    this.stockService.getCesto().subscribe((data) => {
      this.cesto = data;
    });
  }

  compraProducto(producto: Stock) {
    if (producto.cantidadProducto <= 0) {
      alert('No hay más unidades disponibles.');
      return;
    }

    const productoEnCesto = this.cesto.find((item) => item.id === producto.id);

    if (productoEnCesto) {
      if (productoEnCesto.cantidadProducto < producto.cantidadProducto) {
        productoEnCesto.cantidadProducto += 1;
        producto.cantidadProducto -= 1;
        // Actualizar stock en el backend
        this.stockService.updateStock(this.stockDisponible).subscribe();
      } else {
        alert('No hay suficientes unidades disponibles.');
      }
    } else {
      this.cesto.push({ ...producto, cantidadProducto: 1 });
      producto.cantidadProducto -= 1;
      // Actualizar stock en el backend
      this.stockService.updateStock(this.stockDisponible).subscribe();
      // Agregar al cesto en el servidor
      this.stockService.addToCesto({ ...producto, cantidadProducto: 1 }).subscribe();
    }
  }

  eliminarProductoCompleto(producto: Stock) {
    const productoEnCesto = this.cesto.find((item) => item.id === producto.id);

    if (productoEnCesto) {
      producto.cantidadProducto += productoEnCesto.cantidadProducto;
      // Eliminar del cesto en el backend
      this.stockService.removeFromCesto(producto.id).subscribe(() => {
        // Actualizar el cesto localmente
        this.cesto = this.cesto.filter((item) => item.id !== producto.id);
      });
      // Actualizar stock en el backend
      this.stockService.updateStock(this.stockDisponible).subscribe();
    }
  }

  vaciarCesto() {
    this.cesto.forEach((producto) => {
      const productoEnStock = this.stockDisponible.find((item) => item.id === producto.id);
      if (productoEnStock) {
        productoEnStock.cantidadProducto += producto.cantidadProducto;
      }
    });

    this.cesto = [];
    // Vaciar el cesto en el servidor
    this.stockService.removeAllFromCesto().subscribe();
    // Actualizar el stock en el backend
    this.stockService.updateStock(this.stockDisponible).subscribe();
  }

  // Método para calcular el total del cesto (considerando descuentos)
  getTotal(): number {
    return this.cesto.reduce((total, item) => {
      const precioConDescuento = item.descuento
        ? item.precioVenta * (1 - item.descuento / 100)
        : item.precioVenta;
      return total + precioConDescuento * item.cantidadProducto;
    }, 0);
  }
}
