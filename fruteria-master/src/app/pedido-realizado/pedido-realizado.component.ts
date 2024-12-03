import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common';
import { PedidoSService } from '../servicios/pedido.service';

@Component({
  selector: 'app-pedido-realizado',
  standalone: true, // Indica que es un componente standalone
  templateUrl: './pedido-realizado.component.html',
  styleUrls: ['./pedido-realizado.component.css'],
  imports: [FormsModule, CommonModule] // Asegúrate de incluir FormsModule
})
export class PedidoRealizadoComponent implements OnInit {
  pedidos: any[] = []; // Lista de pedidos
  tipoFiltro: string = ''; // Filtro seleccionado

  constructor(private pedidoService: PedidoSService) {}

  ngOnInit() {
    this.cargarPedidos(); // Cargar los pedidos al inicializar
  }

  cargarPedidos() {
    if (this.tipoFiltro) {
      this.pedidoService.getPedidosPorTipo(this.tipoFiltro).subscribe((data) => {
        this.pedidos = data;
      });
    } else {
      this.pedidoService.getPedidos().subscribe((data) => {
        this.pedidos = data;
      });
    }
  }

  actualizarFiltro() {
    this.cargarPedidos();
  }
}
