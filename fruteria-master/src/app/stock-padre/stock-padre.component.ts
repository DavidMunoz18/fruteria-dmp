import { Component } from '@angular/core';
import { StockSService } from '../servicios/stock-s.service';
import { Stock } from '../modelos/stock';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-padre',
  templateUrl: './stock-padre.component.html',
  styleUrls: ['./stock-padre.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class StockPadreComponent {
  stock: Stock = {
    id: 0,
    nombreProducto: '',
    tipoProducto: '',
    cantidadProducto: 0,
    especificacionEntrega: '',
    precioVenta: 0,
    descuento: 0
  };

  listaStock: Stock[] = [];

  constructor(private stockSvc: StockSService) {
    this.cargarStock();  // Cargar los productos desde el archivo db.json
  }

  cargarStock() {
    this.stockSvc.getStock().subscribe((data) => {
      this.listaStock = data;
    });
  }

  // Crear un nuevo producto en el stock
  crearStock() {
    if (this.stock.nombreProducto && this.stock.tipoProducto && this.stock.cantidadProducto > 0) {
      this.stockSvc.addStock(this.stock).subscribe((productoNuevo) => {
        this.listaStock.push(productoNuevo);  // Agregar el nuevo producto
        this.resetFormulario();
      });
    } else {
      alert('Por favor, rellena todos los campos necesarios.');
    }
  }

  // Resetear el formulario
  resetFormulario() {
    this.stock = {
      id: 0,  // Reiniciamos el id
      nombreProducto: '',
      tipoProducto: '',
      cantidadProducto: 0,
      especificacionEntrega: '',
      precioVenta: 0,
      descuento: 0
    };
  }

  // Eliminar un producto del stock
  eliminarProducto(id: number) {
    this.stockSvc.removeFromStock(id).subscribe(() => {
      this.listaStock = this.listaStock.filter(producto => producto.id !== id);  // Eliminar del stock
    });
  }
}
