import { Component, inject } from '@angular/core';
import { StockSService } from '../servicios/stock-s.service';
import { Stock } from '../modelos/stock';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Asegúrate de importar CommonModule
import { OfertasComponent } from '../ofertas/ofertas.component'; // Correcta importación de OfertasComponent

@Component({
  selector: 'app-stock-padre',
  templateUrl: './stock-padre.component.html',
  styleUrls: ['./stock-padre.component.css'],
  standalone: true,
  imports: [FormsModule, OfertasComponent, CommonModule]  // Asegúrate de importar correctamente los módulos
})
export class StockPadreComponent {
  stockSvc = inject(StockSService);

  // Modelo de datos para el formulario
  stock: Stock = {
    nombreProducto: '',
    tipoProducto: '',
    cantidadProducto: 0,
    especificacionEntrega: '',
    precioVenta: 0,
    descuento: 0
  };

  // Lista para almacenar el stock actual
  listaStock: Stock[] = [];

  constructor() {
    this.listaStock = this.stockSvc.getStock(); // Cargar la lista inicial desde el servicio
  }

  crearStock() {
    if (this.stock.nombreProducto && this.stock.tipoProducto && this.stock.cantidadProducto > 0) {
      this.stockSvc.addStock(this.stock); // Añadir al servicio
      this.listaStock = this.stockSvc.getStock(); // Actualizar la lista local
      this.resetFormulario(); // Reiniciar el formulario
      console.log(this.listaStock); // Comprobación en consola
    } else {
      alert('Por favor, rellena todos los campos necesarios.');
    }
  }

  // Método para reiniciar el formulario
  resetFormulario() {
    this.stock = {
      nombreProducto: '',
      tipoProducto: '',
      cantidadProducto: 0,
      especificacionEntrega: '',
      precioVenta: 0,
      descuento: 0
    };
  }

  recibirDescuentoAplicado(productoActualizado: Stock) {
    // Actualiza el stock con el producto actualizado (con descuento aplicado o eliminado)
    const index = this.listaStock.findIndex((producto) => producto.nombreProducto === productoActualizado.nombreProducto);
    if (index !== -1) {
      this.listaStock[index] = productoActualizado;  // Reemplaza el producto con el descuento actualizado
      this.stockSvc.updateStock(this.listaStock);  // Actualiza el stock en el servicio
    }
  }
  
}
