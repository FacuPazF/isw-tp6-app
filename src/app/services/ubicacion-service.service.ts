import { Injectable } from '@angular/core';
import { localidades, provincias } from '../mock-db/db';
import {ILocalidad} from '../model/ILocalidad';
import {IProvincia} from '../model/IProvincia';


@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  onstructor() { }

  obtenerLocalidades(idProvincia: number): ILocalidad[] {
    return localidades.filter(loc => loc.idProvincia === idProvincia);
  }

  obtenerProvincias(): IProvincia[] {
    return provincias;
  }

  obtenerLocalidadPorId(idLocalidad: number): ILocalidad {
    return localidades.find(loc => loc.id === idLocalidad);
  }

  obtenerProvinciaPorId(idProvincia: number): IProvincia {
    return provincias.find(prov => prov.id === idProvincia);
  }

}
