import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';
import { ConfiguracionMaypiProvider } from '../configuracion-maypi/configuracion-maypi';
import { Establecimiento } from '../../models/establecimieto.interface';
/*
  Generated class for the ServicioBuscarProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicioBuscarProvider {

  linkGeneral: string;
  rutaEstableciemtos: string;
  establecimientos: Array<Establecimiento>;
  establecimiento: Establecimiento;

  constructor(public http: Http, public configuracionMaypi: ConfiguracionMaypiProvider) {
    this.linkGeneral = this.configuracionMaypi.getLinkGeneral();
    this.rutaEstableciemtos = "Establecimiento/GetEstablecimientos";
  }

  getAllEstablecimientosPorCrierio(criterio: string) {
    return new Promise(resolve => {
      let params = { clave: criterio, latitud: "", longitud: "" };
      this.http.get(this.linkGeneral + this.rutaEstableciemtos, { params: params}).map(res => res.json()).subscribe(data => {
        this.establecimientos = data;
        resolve(this.establecimientos);
      }, error => resolve(null));
    })
  }

  getEstablecimientoPorId(id: number) {
    return new Promise(resolve => {
      let params = { id: id };
      this.http.get(this.linkGeneral + this.rutaEstableciemtos, { params: params}).map(res => res.json()).subscribe(data => {
        this.establecimiento = data;
        resolve(this.establecimiento);
      }, error => resolve(null));
    })
  }
}
