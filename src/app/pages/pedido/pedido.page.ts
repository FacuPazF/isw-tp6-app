import { Component, OnInit } from '@angular/core';
import {IPedido} from '../../model/IPedido';
import {LOCAL_LOGIN} from '../../mock-db/storageLogin';
import {comercios, productos} from '../../mock-db/db';
import {ModalController} from '@ionic/angular';
import {ModalVerProductoPage} from '../modal-ver-producto/modal-ver-producto.page';
import {ModalEnvioPage} from '../modal-envio/modal-envio.page';
import {IDetallePedido} from '../../model/IDetallePedido';
import {AlertService} from '../../services/alert-service.service';
import {IDomicilio} from '../../model/IDomicilio';
import {IPago} from '../../model/IPago';
import {ModalPagoPage} from '../modal-pago/modal-pago.page';
import {UbicacionService} from '../../services/ubicacion-service.service';
declare let $: any;

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {
  pedido: IPedido;
  total = 0;
  domicilio: IDomicilio;
  pago: IPago;
  esEfectivo = false;
  sePago = false;
  esAntesPosible = false;
  esFechaPactada = false;
  fechaPactada = '';

  constructor(private modalCtrl: ModalController,
              private alertCtrl: AlertService,
              private ubicacionService: UbicacionService) {
  }

  ngOnInit() {
      this.inicializarCarrito();
  }

  inicializarCarrito() {
    this.pedido = {
      id: null,
      comercio: {
        id: comercios[0].id,
        nombreComercio: comercios[0].nombreComercio,
      },
      facha: new Date(),
      usuario: LOCAL_LOGIN,
      detallePedido: [{
        orden: 1,
        producto: {
          id: productos[1].id,
          nombre:  productos[1].nombre,
          descripcion:  productos[1].descripcion,
          precio:  productos[1].precio,
          imagen:  productos[1].imagen,
        },
        cantidad: 1,
      },
        {
          orden: 2,
          producto: {
            id: productos[3].id,
            nombre:  productos[3].nombre,
            descripcion:  productos[3].descripcion,
            precio:  productos[3].precio,
            imagen:  productos[3].imagen,
          },
          cantidad: 1,
        },
        {
          orden: 3,
          producto: {
            id: productos[4].id,
            nombre:  productos[4].nombre,
            descripcion:  productos[4].descripcion,
            precio:  productos[4].precio,
            imagen:  productos[4].imagen,
          },
          cantidad: 3,
        },],
      domicilio: {
        calle: '',
        numeroCalle: null,
        referencia: '',
        idCiudad: null,
      },
      pago: {
        idTipoPago: null,
        idTarjeta: null,
        numeroTarjeta: '',
        fechaVto: '',
        cvc: null,
        apellidoTitular: '',
        nombreTitular: '',
        monto: null,
        montoAbonar: null,
        vuelto: null,
      },
    };
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = 0;
    this.pedido.detallePedido.forEach(detalle => {
      this.total += detalle.producto.precio * detalle.cantidad;
    });
  }

  async verItem(_item: IDetallePedido) {
    const modal = await this.modalCtrl.create({
      component: ModalVerProductoPage,
      componentProps: {
        item: _item,
      }
    });

    await modal.present();

    // Promesa que esta escuchando cuando el modal se cierra
    const {data} = await modal.onDidDismiss();

    if (data.item.cantidad < 0) {
      this.pedido.detallePedido = this.pedido.detallePedido.filter(item => item.orden !== data.item.orden);
      await this.calcularTotal();
    } else {
      this.pedido.detallePedido.forEach(item => {
        if (item.orden === data.item.orden) {
          item.cantidad = data.item.cantidad;
        }
        this.calcularTotal();
      });
    }
  }

  // Todo Ver implementacion de promesa en el servicio de alerta
  async realizarPedido() {
    this.alertCtrl.abrirAlertConfirm('¿Está seguro que desea confirmar el pedido?')
      .then(res => {
        if (res) {
          this.completarDatosEnvio();
        }
      });
  }

  get Ciudad() {
    const localidad = this.ubicacionService.obtenerLocalidadPorId(this.domicilio.idCiudad);
    const provincia = this.ubicacionService.obtenerProvinciaPorId(localidad.idProvincia);
    return `${localidad.nombre}, ${provincia.nombre}`;
  }

  get TipoPago(): string {
    let tipo = '';
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.pago.idTipoPago === 1 ? tipo = 'Efectivo' : tipo = 'Tarjeta VISA';
    return tipo;
  }

  async completarDatosEnvio() {
    const modal = await this.modalCtrl.create({
      component: ModalEnvioPage,
    });

    await modal.present();
    const {data} = await modal.onDidDismiss();
    if (data.datosEnvio) {
      this.domicilio = data.datosEnvio;
      if (data.fechaPactada) {
        this.fechaPactada = data.fechaPactada;
        this.esFechaPactada = true;
      } else {
        this.esAntesPosible = true;
      }
      this.completarDatosPago();
    }
  }

  private async completarDatosPago() {
    const modal = await this.modalCtrl.create({
      component: ModalPagoPage,
      componentProps: {
        montoTotal: this.total
      }
    });

    await modal.present();
    const {data} = await modal.onDidDismiss();
    if (data.datosPago) {
      this.pago = data.datosPago;
      this.pago.idTipoPago === 1 ? this.esEfectivo = true : this.esEfectivo = false;
      this.sePago = true;
    } else {
      this.domicilio = null;
    }

  }
}
