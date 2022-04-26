import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../services/alert-service.service';
import {IPago} from '../../model/IPago';
import {AlertController, ModalController} from '@ionic/angular';

@Component({
  selector: 'app-modal-pago',
  templateUrl: './modal-pago.page.html',
  styleUrls: ['./modal-pago.page.scss'],
})
export class ModalPagoPage implements OnInit {
  ionicForm: FormGroup;
  pago: IPago;
  mostrarEfectivo = false;
  mostrarTarjeta = false;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Input() montoTotal = 0;
  montoVuelto = 0;

  constructor(private fb: FormBuilder,
              private alertCtrl: AlertService,
              private alertController: AlertController,
              private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.crearForm();
    this.inicializarMedioPago();
    this.inicializarPago();

  }

  private inicializarPago() {
    this.pago = {
      idTipoPago: null,
      idTarjeta: 1,
      numeroTarjeta: '',
      fechaVto: '',
      nombreTitular: '',
      apellidoTitular: '',
      cvc: null,
      monto: null,
    };
  }

  private crearForm() {
    this.ionicForm = this.fb.group({
      fgTarjeta: this.fb.group({
      txNumeroTarjeta: ['', [Validators.required, Validators.minLength(16),
        Validators.maxLength(16),Validators.pattern('^[0-9]+$')]],
      txMesVto: ['', Validators.required],
      txAnioVto: ['', Validators.required],
      txCvc: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(3),
        Validators.maxLength(4)]],
      txApellidoTitular: ['', [Validators.required, Validators.pattern('^[a-z]+$')]],
      txNombreTitular: ['', [Validators.required, Validators.pattern('^[a-z]+$')]],
      txMonto: ['', [Validators.required, Validators.pattern('^[0-9.,]+$')]]
    }),
    fgEfectivo: this.fb.group({
      txMontoAbonar: ['' , [Validators.required, Validators.pattern('^[0-9.,]+$')]]
    })
    });
  }

  private crearPagoTarjeta() {
    this.pago.idTipoPago = 2;
    this.pago.numeroTarjeta = this.txNumeroTarjeta.value.toString();
    this.pago.idTarjeta = 1;
    this.pago.fechaVto = `${this.txMesVto.value.toString()}/${this.txAnioVto.value.toString()}`;
    this.pago.cvc = this.txCvc.value.toString();
    this.pago.nombreTitular = this.txNombreTitular.value.toString();
    this.pago.apellidoTitular = this.txApellidoTitular.value.toString();
  }

  private crearPagoEfectivo() {
    this.pago.idTipoPago = 1;
  }

  confirmarEfectivo() {
    if(this.validarEfectivo()) {
      this.montoVuelto = +this.txMontoAbonar.value.toString() - this.montoTotal;
      this.crearPagoEfectivo();
      this.salir(this.pago);
      this.alertCtrl.abrirAlert('Tu pedido se realizó con exito!!!');
    }
  }

  confirmarTarjeta() {
    if (this.validarTarjeta()) {
      this.crearPagoTarjeta();
      this.salir(this.pago);
      this.alertCtrl.abrirAlert('Pago exitoso, muchas gracias por tu compra!!!');
    }
  }

  private validarEfectivo(): boolean {
    if (!this.txMontoAbonar.value) {
      this.alertCtrl.abrirAlert('Debe ingresar un monto.');
      return false;
    }

    if(!this.validarDecimal(+this.txMontoAbonar.value.toString())) {
      this.alertCtrl.abrirAlert('El monto debe ser un valor numérico. Si contiene decimales utilice punto.');
      return false;
    }

    if(+this.txMontoAbonar.value.toString() < this.montoTotal) {
      this.alertCtrl.abrirAlert('El monto a abonar debe ser superior al monto total');
      return false;
    }
    return true;
  }

  private validarTarjeta() {
    if(!this.txNumeroTarjeta.valid) {
      this.alertCtrl.abrirAlert('Numero de tarjeta inválido');
      return false;
    }
    if (this.txNumeroTarjeta.value.toString().charAt(0) !== '4') {
      this.alertCtrl.abrirAlert('Tarjeta inválida. Por el momento solo se acepta Visa.');
      return false;
    }
    if(!this.txMesVto.valid) {
      this.alertCtrl.abrirAlert('Mes de vencimiento inválido');
      return false;
    }
    if(!this.txAnioVto.valid) {
      this.alertCtrl.abrirAlert('Año de vencimiento inválido');
      return false;
    }
    if(!this.validarFechaVto()) {
      this.alertCtrl.abrirAlert('Fecha de vencimiento inválida');
      return false;
    }
    if(!this.txCvc.valid) {
      this.alertCtrl.abrirAlert('Código de seguridad inválido');
      return false;
    }
    if(!this.txApellidoTitular.valid) {
      this.alertCtrl.abrirAlert('Apellido inválido');
      return false;
    }
    if(!this.txNombreTitular.valid) {
      this.alertCtrl.abrirAlert('Nombre inválido');
      return false;
    }
    return true;
  }

  private validarFechaVto(): boolean {
    const mesActual = new Date().getMonth();
    const anioActual = new Date().getFullYear();
    if (+this.txAnioVto.value.toString() < anioActual) {
      return false;
    }
    if (+this.txAnioVto.value.toString() === anioActual && +this.txMesVto.value.toString() < mesActual) {
      return false;
    }
    return true;
  }

  private validarDecimal(valor) {
    const re = /^\d*(\.\d{1})?\d{0,1}$/;
    if (re.test(valor)) {
      return true;
    } else {
      return false;
    }
  }

  salir(_datosPago?: IPago) {
    if (!_datosPago) {
      this.alertCtrl.abrirAlertConfirm('¿Está seguro que desea abandonar los cambios?')
        .then(res => {
          if (res) {
            this.modalCtrl.dismiss({
              datosPago: null,
            });
          }
        });
    } else {
      this.modalCtrl.dismiss({
        datosPago: _datosPago,
      });
    }
  }

  private inicializarMedioPago() {
    this.abrirAlertMedioPago().then(res => {
      if (res === 'efectivo') {
        this.mostrarEfectivo = true;
      } else if (res === 'visa') {
        this.mostrarTarjeta = true;
      }
    });
  }

  private async abrirAlertMedioPago(): Promise<string> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Confirmación',
        message: `<strong>A continuación debe seleccionar el medio de pago que va a utilizar.</strong>`,
        buttons: [
          {
            text: 'Efectivo',
            role: 'efectivo',
            cssClass: 'secondary',
            id: 'ft-button',
            handler: (blah) => resolve('efectivo')
          }, {
            text: 'VISA',
            id: 'visa-button',
            handler: () => resolve('visa')
          }
        ],
        backdropDismiss: false,
      });

      await alert.present();
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get meses() {
    return ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  }

  get anios() {
    let actual = +new Date().getFullYear();
    const anios = [];
    for (let i = 0; i < 10; i++) {
      anios.push(actual++);
    }
    return anios;
  }

  // Todo region de GETTERS formularios

  get fgTarjeta() {
    return this.ionicForm.get('fgTarjeta') as FormGroup;
  }

  get txNumeroTarjeta() {
    return this.fgTarjeta.get('txNumeroTarjeta');
  }

  get txMesVto() {
    return this.fgTarjeta.get('txMesVto');
  }

  get txAnioVto() {
    return this.fgTarjeta.get('txAnioVto');
  }

  get txCvc() {
    return this.fgTarjeta.get('txCvc');
  }

  get txApellidoTitular() {
    return this.fgTarjeta.get('txApellidoTitular');
  }

  get txNombreTitular() {
    return this.fgTarjeta.get('txNombreTitular');
  }

  get txMonto() {
    return this.fgTarjeta.get('txMonto');
  }

  get fgEfectivo() {
    return this.ionicForm.get('fgEfectivo') as FormGroup;
  }

  get txMontoAbonar() {
    return this.fgEfectivo.get('txMontoAbonar');
  }

}
