import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../modelos/stock';

@Injectable({
  providedIn: 'root'
})
export class StockSService {
  private apiUrl = 'http://localhost:3000/stock';  // URL de json-server para stock
  private cestoUrl = 'http://localhost:3000/cesto'; // URL para el cesto

  constructor(private http: HttpClient) {}

  // Obtener todos los productos desde el JSON (API)
  getStock(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.apiUrl);
  }

  // Agregar un nuevo producto al stock
  addStock(stock: Stock): Observable<Stock> {
    return this.http.post<Stock>(this.apiUrl, stock);  // Llama a json-server para agregar el producto
  }

  // Actualizar los productos en el stock (PUT)
  updateStock(stock: Stock[]): Observable<Stock[]> {
    return this.http.put<Stock[]>(this.apiUrl, stock);  // Enviar el stock actualizado a json-server
  }

  // Eliminar un producto del stock
  removeFromStock(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);  // Eliminar un producto por id
  }

  // Obtener el cesto del servidor
  getCesto(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.cestoUrl); // Obtener cesto desde el backend
  }

  // Añadir producto al cesto
  addToCesto(producto: Stock): Observable<Stock> {
    return this.http.post<Stock>(this.cestoUrl, producto); // Añadir al cesto
  }

  // Eliminar un producto del cesto
  removeFromCesto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.cestoUrl}/${id}`); // Eliminar del cesto
  }

  // Vaciar el cesto
  removeAllFromCesto(): Observable<void> {
    return this.http.delete<void>(this.cestoUrl);  // Eliminar todos los productos del cesto
  }
}
