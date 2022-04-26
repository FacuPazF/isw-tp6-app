import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'pedido',
    loadChildren: () => import('./pages/pedido/pedido.module').then( m => m.PedidoPageModule)
  },
  {
    path: 'modal-ver-producto',
    loadChildren: () => import('./pages/modal-ver-producto/modal-ver-producto.module').then( m => m.ModalVerProductoPageModule)
  },
  {
    path: 'modal-envio',
    loadChildren: () => import('./pages/modal-envio/modal-envio.module').then( m => m.ModalEnvioPageModule)
  },
  {
    path: 'modal-pago',
    loadChildren: () => import('./pages/modal-pago/modal-pago.module').then( m => m.ModalPagoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
