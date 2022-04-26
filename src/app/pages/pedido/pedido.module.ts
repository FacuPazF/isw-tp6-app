import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoPageRoutingModule } from './pedido-routing.module';

import { PedidoPage } from './pedido.page';
import {ModalVerProductoPage} from '../modal-ver-producto/modal-ver-producto.page';
import {ModalEnvioPageModule} from '../modal-envio/modal-envio.module';
import {ModalEnvioPage} from '../modal-envio/modal-envio.page';
import {ModalPagoPage} from '../modal-pago/modal-pago.page';
import {ModalPagoPageModule} from '../modal-pago/modal-pago.module';
import * as $ from 'jquery';

@NgModule({
  entryComponents: [
    ModalVerProductoPage,
    ModalEnvioPage,
    ModalPagoPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoPageRoutingModule,
    ModalEnvioPageModule,
    ModalEnvioPageModule,
    ModalPagoPageModule
  ],
  declarations: [PedidoPage]
})
export class PedidoPageModule {}
