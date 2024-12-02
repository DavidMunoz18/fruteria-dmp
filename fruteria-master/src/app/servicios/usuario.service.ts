import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'https://randomuser.me/api/';

  constructor(private http: HttpClient) {}

  getUsuarios(cantidad: number): Observable<any> {
    return this.http.get(`https://randomuser.me/api/?results=${cantidad}`);
  }
  
}
