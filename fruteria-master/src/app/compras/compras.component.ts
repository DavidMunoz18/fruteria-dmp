import { Component, OnInit } from '@angular/core';
import { Stock } from '../modelos/stock';
import { StockSService } from '../servicios/stock-s.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compras',
  standalone: true,
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css'],
  imports: [CommonModule]
})
export class ComprasComponent implements OnInit {
  stockDisponible: Stock[] = [];  // Lista de productos disponibles
  cesto: Stock[] = [];            // Lista de productos en el cesto

  constructor(private stockService: StockSService) {}

  ngOnInit() {
    // Obtener los productos disponibles desde el stock
    this.stockService.getStock().subscribe((data) => {
      this.stockDisponible = data;
    });

    // Obtener los productos del cesto
    this.stockService.getCesto().subscribe((data) => {
      this.cesto = data;
    });
  }

  compraProducto(producto: Stock) {
    const productoEnCesto = this.cesto.find((item) => item.id === producto.id);
  
    if (productoEnCesto) {
      // Si el producto ya está en el cesto, solo aumentar la cantidad
      if (productoEnCesto.cantidadProducto < producto.cantidadProducto) {
        productoEnCesto.cantidadProducto += 1;
        
        // Actualizar el cesto en el servidor
        this.stockService.updateCesto(productoEnCesto).subscribe(() => {
          console.log('Cantidad del producto actualizada en el cesto');
        });
      } else {
        alert('No puedes añadir más unidades que las disponibles en el stock.');
      }
    } else {
      // Si no está en el cesto, se agrega con cantidad 1
      if (producto.cantidadProducto > 0) {
        const nuevoProducto = { ...producto, cantidadProducto: 1 };
  
        // Enviar al servidor
        this.stockService.addToCesto(nuevoProducto).subscribe(() => {
          console.log('Producto añadido al cesto');
        });
  
        // Añadir al cesto localmente
        this.cesto.push(nuevoProducto);
      } else {
        alert('No hay suficiente stock para añadir este producto al cesto.');
      }
    }
  }
  // Método para eliminar un producto del cesto y del servidor
  eliminarProductoCompleto(producto: Stock) {
    // Eliminar del cesto local
    this.cesto = this.cesto.filter((item) => item.id !== producto.id);

    // Eliminar del cesto en el servidor
    this.stockService.removeFromCesto(producto.id).subscribe(() => {
      console.log('Producto eliminado del cesto');
    });
  }

  // Método para vaciar el cesto (eliminar todos los productos del cesto)
 vaciarCesto() {
  // Eliminar todos los productos del cesto en el servidor
  this.stockService.removeAllFromCesto().subscribe(() => {
    console.log('Cesto vacío en el servidor');
    
    // Luego vaciamos el cesto localmente
    this.cesto = [];
  });
}


  // Método para calcular el total del cesto
  getTotal(): number {
    return this.cesto.reduce((total, item) => {
      const precioConDescuento = item.descuento
        ? item.precioVenta * (1 - item.descuento / 100)
        : item.precioVenta;
      return total + precioConDescuento * item.cantidadProducto;
    }, 0);
  }
}
