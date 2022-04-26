import {IUser} from "../model/IUser";
import {IProducto} from "../model/IProducto";
import {IPedido} from "../model/IPedido";
import {IComercio} from "../model/IComercio";
import {IProvincia} from "../model/IProvincia";
import {ILocalidad} from "../model/ILocalidad";

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
  usuario: 'ivangomez854',
  password: '123456789',
}];

export const productos: IProducto[] = [{
  id: 1,
  nombre: 'Hamburguesa',
  descripcion: 'Hamburguesa de carne, con lechuga, tomate y queso.',
  precio: 200,
  imagen: 'https://images.aws.nestle.recipes/resized/f10d69e7fede5cd6200a8ddd41b3cb68_hamburguesa-parrillera_708_600.jpg'
},
  {
    id: 2,
    nombre: 'Empanadas Arabes x docena',
    descripcion: 'Empanadas Arabes.',
    precio: 200,
    imagen: 'https://www.recetasnatura.com.ar/sites/default/files/empanadas-arabes-.jpg'
  },
  {
    id: 2,
    nombre: 'Pizza muzzarella',
    descripcion: 'Contiene queso muzzarella, oregano, aceite de oliva y aceitunas negras. 8 porciones.',
    precio: 180,
    imagen: 'https://media-cdn.tripadvisor.com/media/photo-s/11/14/fb/b1/pizza-muzzarella.jpg'
  },
  {
    id: 3,
    nombre: 'Lomo de Cerdo',
    descripcion: 'Carne de cerdo, con lechuga, tomate y huevo. Incluye adheresos y porcion de papas fritas.',
    precio: 300,
    // eslint-disable-next-line max-len
    imagen: 'https://www.lavoz.com.ar/resizer/yPLncTmpwUufSovRTzEP0MdlmxY=/1023x682/smart/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/KL65JXJGSZAEPNQFCRWA2RABYU.jpg'
  },
  {
    id: 4,
    nombre: 'Helado 1/4 kg',
    descripcion: 'Sabores a elección: chocolate, frutilla, vainilla, etc.',
    precio: 120,
    imagen: 'https://www.hola.com/imagenes/cocina/noticiaslibros/20200819173755/helados-pocos-ingredientes/0-856-836/portada-adobe-m.jpg'
  }];

  export const comercios: IComercio[] = [{
    id: 1,
    nombreComercio: 'Que rica ...',
  },];

