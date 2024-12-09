import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { PedidoSService } from '../servicios/pedido.service';

@Component({
  selector: 'app-pedido-realizado',
  standalone: true, 
  templateUrl: './pedido-realizado.component.html',
  styleUrls: ['./pedido-realizado.component.css'],
  imports: [FormsModule, CommonModule] 
})
export class PedidoRealizadoComponent implements OnInit {
  pedidos: any[] = []; // Todos los pedidos
  pedidosFiltrados: any[] = []; // Pedidos filtrados
  tipoFiltro: string = ''; // Filtro seleccionado

  constructor(private pedidoService: PedidoSService) {}

  ngOnInit() {
    this.cargarPedidos(); // Cargar los pedidos al inicializar
  }

  cargarPedidos() {
    this.pedidoService.getPedidos().subscribe((data) => {
      this.pedidos = data;
      this.actualizarFiltro(); // Aplica el filtro inicial (todos)
    });
  }

  actualizarFiltro() {
    if (this.tipoFiltro) {
      // Filtra los pedidos por el tipo de producto
      this.pedidosFiltrados = this.pedidos.filter((pedido) =>
        pedido.productos.some((producto: any) => producto.tipoProducto === this.tipoFiltro)
      );
    } else {
      this.pedidosFiltrados = [...this.pedidos]; // Muestra todos los pedidos
    }
  }

  // Métodos para cada tipo de filtro
  filtrarFruta() {
    this.tipoFiltro = 'Fruta';
    this.actualizarFiltro();
  }

  filtrarVerdura() {
    this.tipoFiltro = 'Verdura';
    this.actualizarFiltro();
  }

  mostrarTodos() {
    this.tipoFiltro = '';
    this.actualizarFiltro();
  }
}
