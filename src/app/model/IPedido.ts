import {IUser} from './IUser';
import {IDetallePedido} from './IDetallePedido';
import {IDomicilio} from './IDomicilio';
import {IPago} from './IPago';
import {IComercio} from './IComercio';

export interface IPedido {
  id: number;
  comercio: IComercio;
  facha: Date;
  usuario: IUser;
  detallePedido: IDetallePedido[];
  domicilio: IDomicilio;
  pago: IPago;
}
