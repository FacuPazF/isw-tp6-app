export interface IPago {
  idTipoPago: number;
  idTarjeta: number;
  numeroTarjeta: string;
  fechaVto: string;
  cvc: number;
  apellidoTitular: string;
  nombreTitular: string;
  monto: number;
  montoAbonar: number;
  vuelto: number;
}
