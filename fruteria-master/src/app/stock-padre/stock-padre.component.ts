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
  stock: Stock = {
    id: 0,
    nombreProducto: '',
    tipoProducto: '',
    cantidadProducto: 0,
    especificacionEntrega: '',
    precioVenta: 0,
    descuento: 0,
  };

  listaStock: Stock[] = [];

  constructor(private stockSvc: StockSService) {
    this.cargarStock();
  }

  cargarStock() {
    this.stockSvc.getStock().subscribe((data) => {
      this.listaStock = data;
    });
  }

  crearStock() {
    if (
      this.stock.nombreProducto &&
      this.stock.tipoProducto &&
      this.stock.cantidadProducto > 0
    ) {
      this.stockSvc.addStock(this.stock).subscribe((productoNuevo) => {
        this.listaStock.push(productoNuevo);
        this.resetFormulario();
      });
    } else {
      alert('Por favor, rellena todos los campos necesarios.');
    }
  }

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

  eliminarProducto(id: number) {
    this.stockSvc.removeFromStock(id).subscribe(() => {
      this.listaStock = this.listaStock.filter((producto) => producto.id !== id);
    });
  }

  actualizarProducto(productoActualizado: Stock) {
    const index = this.listaStock.findIndex((prod) => prod.id === productoActualizado.id);
    if (index !== -1) {
      this.listaStock[index] = productoActualizado;
    }
  }
}
