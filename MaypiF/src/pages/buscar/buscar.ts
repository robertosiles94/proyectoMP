import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Establecimiento } from '../../models/establecimieto.interface';
import { ServicioBuscarProvider } from '../../providers/servicio-buscar/servicio-buscar';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the BuscarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'lista'
})
@Component({
  selector: 'page-buscar',
  templateUrl: 'buscar.html',
})
export class BuscarPage {

  establecimientos: any;
  numero: number;
  criterio: string = "";
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public servicioBuscar: ServicioBuscarProvider, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.buscarEstablecimientosPorCriterio();
  }

  buscarEstablecimientosPorCriterio() {
    let loader = this.loadingCtrl.create({
      content: "Cargando..."
    });
    loader.present();
    this.servicioBuscar.getAllEstablecimientosPorCrierio(this.criterio).then((data) => {
      if (data == null) {
        this.mostrarMensajeError("No se pudo obtener los establecimientos, intertar mas tarde");
        loader.dismiss();
        return;
      }
      this.establecimientos = data;
      this.establecimientos = this.establecimientos.Establecimientos;
      loader.dismiss();
    }).catch(erro => {
      console.error("Error al obtener la lista de establecimientos");
    });
  }

  abrirInformacionEstablecimiento(est) {
    this.navCtrl.push('InformacionEstablecimientoPage', est);
  }

  mostrarMensajeError(mensaje) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: mensaje,
      buttons: ['Aceptar']
    });
    alert.present();
  }
}
