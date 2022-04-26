import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {IDomicilio} from '../../model/IDomicilio';
import {UbicacionService} from '../../services/ubicacion-service.service';
import {IProvincia} from '../../model/IProvincia';
import {ILocalidad} from '../../model/ILocalidad';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {AlertService} from "../../services/alert-service.service";

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
  formValido = false;
  isSubmitted = false;

  constructor(private modalCtrl: ModalController,
              private ubicacionService: UbicacionService,
              private fb: FormBuilder,
              private alertCtrl: AlertService) { }

  ngOnInit() {
    this.inicializarDomicilio();
    this.cargarProvincias();
    this.crearForm();
  }

  private crearForm() {
    this.ionicForm = this.fb.group({
      txCalle: ['', Validators.required],
      txNumero: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      txReferencias: [''],
      cbLocalidad: ['', Validators.required],
      cbProvincia: ['', Validators.required]
    });

    this.cbProvincia.valueChanges.subscribe(res => {
      this.cargarLocalidades(res);
      this.cbLocalidad.setValue('');
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
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      this.alertCtrl.abrirAlert('Datos invalidos. Verifique la información ingresada.')
      return false;
    } else {
      this.modalCtrl.dismiss({
        datosEnvio: this.guardarDomicilio(),
      });
    }
  }

  private guardarDomicilio(): IDomicilio {
    this.domicilio.calle = this.txCalle.value.toString();
    this.domicilio.numeroCalle = +this.txNumero.value.toString();
    this.domicilio.referencia = this.txReferencias.value.toString();
    this.domicilio.idCiudad = +this.cbLocalidad.value.toString();
    return this.domicilio;
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
}
