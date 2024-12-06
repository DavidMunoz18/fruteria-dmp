import { Component } from '@angular/core';
import { Stock } from '../modelos/stock';
import { StockSService } from '../servicios/stock-s.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OfertasComponent } from "../ofertas/ofertas.component";

@Component({
  selector: 'app-stock-padre',
  templateUrl: './stock-padre.component.html',
  styleUrls: ['./stock-padre.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, OfertasComponent]
})
export class StockPadreComponent {
  // Modelo inicial para gestionar un producto en el formulario.
  stock: Stock = {
    id: 0,
    nombreProducto: '',
    tipoProducto: '',
    cantidadProducto: 0,
    especificacionEntrega: '',
    precioVenta: 0,
    descuento: 0,
  };

  // Lista de productos disponibles en el sistema.
  listaStock: Stock[] = [];

  constructor(private stockSvc: StockSService) {
    this.cargarStock(); // Carga inicial de productos al abrir el componente.
  }

  // Obtiene los productos desde el backend y actualiza la lista local.
  cargarStock() {
    this.stockSvc.getStock().subscribe((data) => {
      this.listaStock = data;
    });
  }

  // Añade un nuevo producto al sistema.
  crearStock() {
    if (
      this.stock.nombreProducto &&
      this.stock.tipoProducto &&
      this.stock.cantidadProducto > 0
    ) {
      // Generar un ID único si el backend no lo hace automáticamente
      this.stock.id = Date.now(); // Usamos la marca de tiempo como ID único
  
      this.stockSvc.addStock(this.stock).subscribe((productoNuevo) => {
        this.listaStock.push(productoNuevo);
        this.resetFormulario();
      });
    } else {
      alert('Por favor, rellena todos los campos necesarios.');
    }
  }
  

  // Resetea el formulario a su estado inicial.
  resetFormulario() {
    this.stock = {
      id: 0,
      nombreProducto: '',
      tipoProducto: '',
      cantidadProducto: 0,
      especificacionEntrega: '',
      precioVenta: 0,
      descuento: 0,
    };
  }

  // Elimina un producto de la lista local y del backend.
  eliminarProducto(id: number) {
    this.stockSvc.removeFromStock(id).subscribe(() => {
      this.listaStock = this.listaStock.filter((producto) => producto.id !== id);
    });
  }
  
  

  // Actualiza la información de un producto en la lista local.
  actualizarProducto(productoActualizado: Stock) {
    // Encuentra el producto por su ID y actualiza sus datos.
    const index = this.listaStock.findIndex((prod) => prod.id === productoActualizado.id);
    if (index !== -1) {
      this.listaStock[index] = productoActualizado;
    }
  }
}
