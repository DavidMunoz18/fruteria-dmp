import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Stock } from '../modelos/stock';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class OfertasComponent {
  @Input() producto!: Stock;  // Recibe el producto como Input
  @Output() descuentoAplicado = new EventEmitter<Stock>();  // Emite el producto con el descuento actualizado

  aplicarDescuento() {
    if (this.producto.descuento) {
      // Aplica el descuento solo si el valor es mayor que 0
      this.producto.precioVenta = this.producto.precioVenta * (1 - this.producto.descuento / 100);
    }
    this.descuentoAplicado.emit(this.producto);  // Emite el producto con el descuento aplicado
  }

  eliminarDescuento() {
    if (this.producto.descuento) {
      // Si existe descuento, revertir el precio al valor original (esto asume que el precio original es guardado)
      // Si no tienes un precio original, necesitarás guardarlo al aplicar el descuento por primera vez
      this.producto.precioVenta = this.producto.precioVenta / (1 - this.producto.descuento / 100); // Revertir descuento
      this.producto.descuento = 0;  // Eliminar descuento
    }
    this.descuentoAplicado.emit(this.producto);  // Emitir el producto actualizado
  }
}
