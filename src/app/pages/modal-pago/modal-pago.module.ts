import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalPagoPageRoutingModule } from './modal-pago-routing.module';
import { ModalPagoPage } from './modal-pago.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ModalPagoPageRoutingModule,
  ],
  declarations: [ModalPagoPage]
})
export class ModalPagoPageModule {}
