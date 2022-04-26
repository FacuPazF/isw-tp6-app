import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-modal-ver-producto',
  templateUrl: './modal-ver-producto.page.html',
  styleUrls: ['./modal-ver-producto.page.scss'],
})
export class ModalVerProductoPage implements OnInit {
  @Input() item;
  seModofico = false;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  salir() {
    this.modalCtrl.dismiss({
      item: this.item,
    });
  }

  masCantidad() {
    this.item.cantidad++;
    this.seModofico = true;
}

  menosCantidad() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.item.cantidad > 1 ? this.item.cantidad-- : this.item.cantidad;
    this.seModofico = true;
  }

  eliminarItem() {
    this.item.cantidad = -1;
    this.seModofico = true;
    this.salir();
  }

}
