import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalEnvioPageRoutingModule } from './modal-envio-routing.module';

import { ModalEnvioPage } from './modal-envio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ModalEnvioPageRoutingModule
  ],
  declarations: [ModalEnvioPage]
})
export class ModalEnvioPageModule {}
