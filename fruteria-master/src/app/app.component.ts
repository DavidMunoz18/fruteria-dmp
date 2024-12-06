import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fruteria-david-munoz-polanco';

  estaLogeado = false;
  rol: 'admin' | 'user' | null = null;

  email = '';
  contrasenia = '';

  constructor(private router: Router) {} // Inyectamos Router

  login() {
    if (this.email === 'admin@gmail.com' && this.contrasenia === 'admin') {
      this.estaLogeado = true;
      this.rol = 'admin';
      this.router.navigate(['/stock']);  // Redirige al stock
    } else if (this.email === 'usuario@gmail.com' && this.contrasenia === 'usuario') {
      this.estaLogeado = true;
      this.rol = 'user';
      this.router.navigate(['/compra']);  // Redirige a compras
    } else {
      alert('Credenciales incorrectas');
    }
  }

  cerrarS() {
    this.estaLogeado = false;
    this.rol = null;
    this.email = '';
    this.contrasenia = '';
    this.router.navigate(['/']); // Redirige al login después de hacer logout
  }
}
