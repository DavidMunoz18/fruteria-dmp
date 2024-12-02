import { Routes } from '@angular/router';
import { StockPadreComponent } from './stock-padre/stock-padre.component';
import { PedidoRealizadoComponent } from './pedido-realizado/pedido-realizado.component';
import { ComprasComponent } from './compras/compras.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


export const routes: Routes = [
    { path: '', redirectTo: '/compra', pathMatch: 'full' },
    { path: 'stock', component: StockPadreComponent },
    { path: 'pedido', component: PedidoRealizadoComponent },
    { path: 'compra', component: ComprasComponent },
    { path: 'usuarios', component: UsuariosComponent }
];
