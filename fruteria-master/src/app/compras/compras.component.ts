import { Component } from '@angular/core';
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
export class ComprasComponent {
  stockDisponible: Stock[] = [];
  cesto: Stock[] = []; // Lista para almacenar los productos añadidos al cesto

  constructor(private stockService: StockSService) {
    // Obtener los productos del servicio
    this.stockDisponible = this.stockService.getStock();

    // Intentar cargar el cesto desde localStorage al iniciar el componente
    const cestoGuardado = localStorage.getItem('cesto');
    if (cestoGuardado) {
      this.cesto = JSON.parse(cestoGuardado);
    }
  }

  // Método para agregar el producto al cesto
  compraProducto(producto: Stock) {
    if (producto.cantidadProducto <= 0) {
      alert('No hay más unidades disponibles.');
      return; // Si no hay unidades, no se agrega al cesto
    }

    const productoEnCesto = this.cesto.find(
      (item) => item.nombreProducto === producto.nombreProducto
    );

    if (productoEnCesto) {
      if (productoEnCesto.cantidadProducto < producto.cantidadProducto) {
        productoEnCesto.cantidadProducto += 1;
        producto.cantidadProducto -= 1; // Reducir el stock disponible
        this.actualizarStock(); // Actualizar stock en tiempo real
      } else {
        alert('No hay suficientes unidades disponibles.');
      }
    } else {
      this.cesto.push({
        ...producto, // Copiar todas las propiedades del producto
        cantidadProducto: 1, // Inicializamos la cantidad en 1
      });
      producto.cantidadProducto -= 1; // Reducir el stock disponible
      this.actualizarStock(); // Actualizar stock en tiempo real
    }

    this.guardarCestoEnLocalStorage(); // Guardar el cesto actualizado en localStorage
  }

  // Método para eliminar el producto completo del cesto
  eliminarProductoCompleto(producto: Stock) {
    const productoEnCesto = this.cesto.find(
      (item) => item.nombreProducto === producto.nombreProducto
    );

    if (productoEnCesto) {
      producto.cantidadProducto += productoEnCesto.cantidadProducto;

      // Eliminar el producto del cesto
      this.cesto = this.cesto.filter(
        (item) => item.nombreProducto !== producto.nombreProducto
      );

      this.actualizarStock(); // Actualizar stock en tiempo real
    }

    this.guardarCestoEnLocalStorage(); // Guardar el cesto actualizado en localStorage
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

  // Método para actualizar el stock con el servicio después de agregar o eliminar productos
  actualizarStock() {
    this.stockService.updateStock(this.stockDisponible); // Usamos el servicio para actualizar el stock
  }

  // Guardar el cesto en localStorage
  guardarCestoEnLocalStorage() {
    localStorage.setItem('cesto', JSON.stringify(this.cesto));
  }

  // Método para vaciar el cesto
  vaciarCesto() {
    this.cesto.forEach((producto) => {
      const productoEnStock = this.stockDisponible.find(
        (item) => item.nombreProducto === producto.nombreProducto
      );
      if (productoEnStock) {
        productoEnStock.cantidadProducto += producto.cantidadProducto;
      }
    });

    this.cesto = [];
    this.actualizarStock(); // Actualizar el stock al vaciar el cesto
    localStorage.removeItem('cesto');
  }
}
