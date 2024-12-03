// pedido-s.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoSService {

  private apiUrl = 'http://localhost:3000/pedidos';  // URL para acceder a los pedidos

  constructor(private http: HttpClient) {}

  // Obtener todos los pedidos
  getPedidos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener pedidos filtrados por tipo
  getPedidosPorTipo(tipo: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?productos.tipoProducto=${tipo}`);
  }
}
