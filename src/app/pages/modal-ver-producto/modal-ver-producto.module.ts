import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalVerProductoPageRoutingModule } from './modal-ver-producto-routing.module';

import { ModalVerProductoPage } from './modal-ver-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalVerProductoPageRoutingModule
  ],
  declarations: [ModalVerProductoPage]
})
export class ModalVerProductoPageModule {}
