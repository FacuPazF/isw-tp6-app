import { Component, OnInit } from '@angular/core';
import {UsuarioServiceService} from '../services/usuario-service.service';
import { AlertService } from '../services/alert-service.service';
import { LOCAL_LOGIN } from '../mock-db/storageLogin';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public usuario = '';
  public password: '';


  constructor(private usuarioService: UsuarioServiceService,
              private alert: AlertService,
              private router: Router) { }

  ngOnInit() {
  }

  validarLogin(): boolean {
    if (!this.usuario?.length) {
      this.alert.abrirAlert('Debe introducir un nombre de usuario');
      return false;
    }
    if (!this.password?.length) {
      this.alert.abrirAlert('Debe introducir una contraseña');
      return false;
    }
    return true;
  }

  iniciarSesion() {
    if (this.validarLogin()) {
     const usuarioLogueado = this.usuarioService.iniciarSesion(this.usuario.toLowerCase(), this.password);
     console.log(usuarioLogueado);
     if(!usuarioLogueado) {
       this.alert.abrirAlert('Usuario y/o contraseña invalidos.');
       this.usuario = '';
       this.password = '';
     }
     else {
       LOCAL_LOGIN.id = usuarioLogueado.id;
       LOCAL_LOGIN.usuario = usuarioLogueado.usuario;
       this.router.navigate(['pedido']);
     }
    }
  }

  registrarUsuario() {
    this.alert.abrirAlert('No disponible en esta versión');
  }
}
