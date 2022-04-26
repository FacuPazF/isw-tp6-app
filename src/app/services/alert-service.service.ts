import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }

  public async abrirAlert(mensaje: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atención!',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();

    const {role} = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  // TODO Prestar atencion a la implementacion de la promesa,
  // TODO no se encuentra en la documentacion de esta forma.
  public async abrirAlertConfirm(mensaje: string) {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Confirmación',
        message: `<strong>${mensaje}</strong>`,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            id: 'cancel-button',
            handler: (blah) => {
              return resolve(false);
            }
          }, {
            text: 'Confirmar',
            id: 'confirm-button',
            handler: () => {
              return resolve(true);
            }
          }
        ],
        backdropDismiss: false,
      });

      await alert.present();
    });
  }
}
