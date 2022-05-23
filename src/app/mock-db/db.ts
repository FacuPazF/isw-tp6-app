import {IUser} from '../model/IUser';
import {IProducto} from '../model/IProducto';
import {IComercio} from '../model/IComercio';
import {IProvincia} from '../model/IProvincia';
import {ILocalidad} from '../model/ILocalidad';

export const provincias: IProvincia[] = [{
  id: 1,
  nombre: 'Córdoba',
},
  {
    id: 2,
    nombre: 'Buenos Aires',
  },
  {
    id: 3,
    nombre: 'Santa Fé',
  }];

export  const localidades: ILocalidad[] =[
  {
    id: 1,
    nombre: 'Capital Federal',
    idProvincia: 2
  },
  {
    id: 2,
    nombre: 'Ciudad de Córdoba',
    idProvincia: 1
  },
  {
    id: 3,
    nombre: 'Carlos Paz',
    idProvincia: 1
  },
  {
    id: 4,
    nombre: 'Alta Gracia',
    idProvincia: 1
  },
  {
    id: 5,
    nombre: 'Villa Allende',
    idProvincia: 1
  },
  {
    id: 6,
    nombre: 'Rosario',
    idProvincia: 3
  }];

export const users: IUser[] = [{
  id: 1,
  usuario: 'test',
  password: '1234',
}];

export const productos: IProducto[] = [{
  id: 1,
  nombre: 'Hamburguesa',
  descripcion: 'Hamburguesa de carne, con lechuga, tomate y queso.',
  precio: 200,
  imagen: '../../assets/images/burga.jpg'
},
  {
    id: 2,
    nombre: 'Empanadas Arabes x docena',
    descripcion: 'Empanadas Arabes.',
    precio: 200,
    imagen: '../../assets/images/empanadas-arabes.jpg'
  },
  {
    id: 2,
    nombre: 'Pizza muzzarella',
    descripcion: 'Contiene queso muzzarella, oregano, aceite de oliva y aceitunas negras. 8 porciones.',
    precio: 180,
    imagen: '../../assets/images/pizza-muzzarella.jpg'
  },
  {
    id: 3,
    nombre: 'Lomo de Cerdo',
    descripcion: 'Carne de cerdo, con lechuga, tomate y huevo. Incluye adheresos y porcion de papas fritas.',
    precio: 300,
    imagen: '../../assets/images/lomo.jpg'
  },
  {
    id: 4,
    nombre: 'Helado 1/4 kg',
    descripcion: 'Sabores a elección: chocolate, frutilla, vainilla, etc.',
    precio: 120,
    imagen: '../../assets/images/helado.jpg'
  }];

  export const comercios: IComercio[] = [{
    id: 1,
    nombreComercio: 'Comercio 1',
  },];

