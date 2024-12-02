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

  isLoggedIn = false;
  role: 'admin' | 'user' | null = null;

  email = '';
  password = '';

  constructor(private router: Router) {} // Inyectamos Router

  login() {
    if (this.email === 'admin@gmail.com' && this.password === 'admin') {
      this.isLoggedIn = true;
      this.role = 'admin';
      this.router.navigate(['/stock']);  // Redirige al stock
    } else if (this.email === 'usuario@gmail.com' && this.password === 'usuario') {
      this.isLoggedIn = true;
      this.role = 'user';
      this.router.navigate(['/compra']);  // Redirige a compras
    } else {
      alert('Credenciales incorrectas');
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.role = null;
    this.email = '';
    this.password = '';
    this.router.navigate(['/']); // Redirige al login después de hacer logout
  }
}
