import { Injectable } from '@angular/core';
import { users } from '../mock-db/db';
@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {
  private readonly _users = users;

  constructor() {
  }

  public iniciarSesion(usuario: string, password: string){
    // eslint-disable-next-line no-underscore-dangle
    return this._users.find(user => user.usuario === usuario && user.password === password);
  }
}
