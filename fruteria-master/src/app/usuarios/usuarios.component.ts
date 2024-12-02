import { CommonModule } from "@angular/common";
import { UsuarioService } from "../servicios/usuario.service";
import { Component } from "@angular/core";

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule],
  providers: [UsuarioService],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  // Usando 'any' para evitar problemas de tipos
  usuarios: any[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    const cantidad = 5;  // Número de usuarios a obtener
    this.usuarioService.getUsuarios(cantidad).subscribe((data: any) => {
      this.usuarios = data.results;  // Asumiendo que la respuesta tiene un campo "results"
    });
  }
}

