import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../modelos/stock';

@Injectable({
  providedIn: 'root'
})
export class StockSService {
  private apiUrlStock = 'http://localhost:3000/stock';  // URL de json-server para stock
  private apiUrlCesto = 'http://localhost:3000/cesto'; // URL para el cesto

  constructor(private http: HttpClient) {}

  // Métodos para manejar el stock
  getStock(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.apiUrlStock); // Obtener todo el stock
  }

  addStock(stock: Stock): Observable<Stock> {
    return this.http.post<Stock>(this.apiUrlStock, stock); // Agregar nuevo producto al stock
  }

  updateStock(producto: Stock): Observable<Stock> {
    return this.http.put<Stock>(`${this.apiUrlStock}/${producto.id}`, producto); // Actualizar un producto específico
  }

  removeFromStock(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlStock}/${id}`); // Eliminar un producto del stock
  }

  // Métodos para manejar el cesto
  getCesto(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.apiUrlCesto); // Obtener todos los productos del cesto
  }

  addToCesto(producto: Stock): Observable<Stock> {
    return this.http.post<Stock>(this.apiUrlCesto, producto); // Añadir producto al cesto
  }

  updateCesto(producto: Stock): Observable<Stock> {
    return this.http.put<Stock>(`${this.apiUrlCesto}/${producto.id}`, producto); // Actualizar un producto en el cesto
  }

  removeFromCesto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlCesto}/${id}`); // Eliminar producto del cesto
  }

  removeAllFromCesto(): Observable<void> {
    return this.http.delete<void>(this.apiUrlCesto); // Vaciar todo el cesto
  }
}
