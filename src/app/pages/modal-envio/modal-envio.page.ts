import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {IDomicilio} from '../../model/IDomicilio';
import {UbicacionService} from '../../services/ubicacion-service.service';
import {IProvincia} from '../../model/IProvincia';
import {ILocalidad} from '../../model/ILocalidad';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AlertService} from '../../services/alert-service.service';
import { format, parseISO } from 'date-fns';
import {CustomValidators} from "../../shared/custom-validators";

@Component({
  selector: 'app-modal-envio',
  templateUrl: './modal-envio.page.html',
  styleUrls: ['./modal-envio.page.scss'],
})
export class ModalEnvioPage implements OnInit {
  domicilio: IDomicilio;
  ionicForm: FormGroup;
  localidades: ILocalidad[];
  provincias: IProvincia[];
  seleccionoMedioEnvio = false;
  mostrarAlmanaque = false;

  constructor(private modalCtrl: ModalController,
              private ubicacionService: UbicacionService,
              private fb: FormBuilder,
              private alertCtrl: AlertService,
              private alertController: AlertController) { }

  ngOnInit() {
    this.inicializarDomicilio();
    this.inicializarMetodoEnvio();
    this.cargarProvincias();
    this.crearForm();
  }

  private inicializarMetodoEnvio() {
    this.abrirAlertMetodoEnvio().then(res => {
      if (res === 'pactarFecha') {
        this.mostrarAlmanaque = true;
      }
      this.seleccionoMedioEnvio = true;
    });
  }

  private crearForm() {
    this.ionicForm = this.fb.group({
      txCalle: ['', Validators.required],
      txNumero: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      txReferencias: [''],
      cbLocalidad: ['', Validators.required],
      cbProvincia: ['', Validators.required],
      txFechaPactada: ['', [Validators.required, CustomValidators.fromDate(new Date())]],
    });

    this.cbProvincia.valueChanges.subscribe(res => {
      this.cargarLocalidades(res);
      this.cbLocalidad.setValue('');
      this.cbLocalidad.enable();
    });
  }

  cargarLocalidades(idProvincia: number) {
    this.localidades = this.ubicacionService.obtenerLocalidades(idProvincia);
  }

  cargarProvincias() {
    this.provincias = this.ubicacionService.obtenerProvincias();
  }

  private inicializarDomicilio() {
    this.domicilio = {
      calle: '',
      numeroCalle: null,
      idCiudad: null,
      referencia: '',
    };
  }

  salir() {
    this.alertCtrl.abrirAlertConfirm('¿Está seguro que desea abandonar los cambios?')
      .then(res => {
        if (res) {
          this.modalCtrl.dismiss({
            datosEnvio: null,
          });
        }
      });
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  submitForm() {
    if (!(this.txNumero.valid) && (this.txCalle.valid) && (this.cbLocalidad.valid) && (this.cbProvincia.valid)) {
      this.alertCtrl.abrirAlert('Datos invalidos. Verifique la información ingresada.');
      return;
    } else if (this.mostrarAlmanaque && !this.validarFechaPactada()) {
      this.alertCtrl.abrirAlert('La fecha ingresada inválida');
      return;
    } else {
      this.modalCtrl.dismiss({
        datosEnvio: this.guardarDomicilio(),
        fechaPactada: this.mostrarAlmanaque ? format(parseISO(this.txFechaPactada.value.toString()), 'dd/MM/yyyy HH:mm') : null,
      });
    }
  }

  private validarFechaPactada() {
    // const fecha = format(parseISO(this.txFechaPactada.value.toString()), 'dd/MM/yyyy HH:mm');
    if(!(new Date().getTime() < new Date(this.txFechaPactada.value).getTime())) {
      return false;
    }
    return true;
  }

  private guardarDomicilio(): IDomicilio {
    this.domicilio.calle = this.txCalle.value.toString();
    this.domicilio.numeroCalle = +this.txNumero.value.toString();
    this.domicilio.referencia = this.txReferencias.value.toString();
    this.domicilio.idCiudad = +this.cbLocalidad.value.toString();
    return this.domicilio;
  }

  private async abrirAlertMetodoEnvio(): Promise<string> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Confirmación',
        message: `<strong>A continuación debe seleccionar el metodo de envio,
                    si desea recibir su pedido lo antes posible o pactar una fecha y hora futura.</strong>`,
        buttons: [
          {
            text: 'Pactar fecha',
            role: 'pactarFecha',
            cssClass: 'secondary',
            id: 'ft-button',
            handler: (blah) => resolve('pactarFecha')
          }, {
            text: 'Lo antes posible',
            id: 'antesPosible',
            handler: () => resolve('antesPosible')
          }
        ],
        backdropDismiss: false,
      });

      await alert.present();
    });
  }
  // Todo Form Getters
  get txCalle() {
    return this.ionicForm.get('txCalle');
  }

  get txNumero() {
    return this.ionicForm.get('txNumero');
  }

  get txReferencias() {
    return this.ionicForm.get('txReferencias');
  }

  get cbLocalidad() {
    return this.ionicForm.get('cbLocalidad');
  }

  get cbProvincia() {
    return this.ionicForm.get('cbProvincia');
  }

  get txFechaPactada() {
    return this.ionicForm.get('txFechaPactada');
  }

}
