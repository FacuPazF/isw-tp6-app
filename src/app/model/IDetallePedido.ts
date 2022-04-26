import {IProducto} from './IProducto';

export interface IDetallePedido {
  orden: number;
  producto: IProducto;
  cantidad: number;
}
