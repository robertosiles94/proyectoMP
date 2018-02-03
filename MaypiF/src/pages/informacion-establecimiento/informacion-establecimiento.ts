import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LatLng
} from '@ionic-native/google-maps';
import { Establecimiento } from '../../models/establecimieto.interface';
import { Platform } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ServicioBuscarProvider } from '../../providers/servicio-buscar/servicio-buscar';

declare var google: any;

@IonicPage({
  segment: 'informacion-establecimiento/:idEstablecimiento'
})
@Component({
  selector: 'page-informacion-establecimiento',
  templateUrl: 'informacion-establecimiento.html',
})
export class InformacionEstablecimientoPage {

  @ViewChild('mapa') mapElement: ElementRef;
  map: any;
  est: any;
  latLng: LatLng;
  idEstablecimiento: any;
  esMovil: boolean = false;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public googleMaps: GoogleMaps, 
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public servicioBuscar: ServicioBuscarProvider) {
    this.est = this.navParams.data;
    this.esMovil = this.platform.is('ios') || this.platform.is('android');
    this.idEstablecimiento = this.navParams.get('idEstablecimiento');
  }

  ionViewDidLoad() {
    this.latLng = new LatLng(this.est.Latitud, this.est.Longitud);
    if (this.esMovil) {
      this.cargarMapaMovil();
      this.moverCamara(this.latLng);
    } else {
      this.initMap();
    }
    this.añadirMarcador(this.latLng);
  }

  cargarEstablecimiento(id: number) {
    let loader = this.loadingCtrl.create({
      content: "Cargando..."
    });
    loader.present();
    this.servicioBuscar.getEstablecimientoPorId(id).then((data) => {
      if (data == null) {
        this.mostrarMensajeError("No se pudo obtener el establecimiento, intertar mas tarde");
        loader.dismiss();
        return;
      }
      this.est = data;
      loader.dismiss();
    }).catch(erro => {
      console.error("Error al obtener un establecimiento");
    });
  }

  mostrarMensajeError(mensaje) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: mensaje,
      buttons: ['Aceptar']
    });
    alert.present();
  }

  moverCamara(latLng) {
    this.map.moveCamera({
      target: latLng
    });
  }

  cargarMapaMovil() {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.est.Latitud,
          lng: this.est.Longitud
        },
        zoom: 15,
        tilt: 30
      }
    };
    this.map = this.googleMaps.create('map', mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        this.moverCamara(this.latLng);
        this.añadirMarcador(this.latLng);
      })
      .catch(error => {
        console.log(error);
      });
  }

  añadirMarcador(latLng) {
    if (this.esMovil) {
      this.map.addMarker({
        title: this.est.Nombre,
        icon: 'blue',
        animation: 'DROP',
        position: latLng
      });
    } else {
      var marker = new google.maps.Marker({
        position: latLng,
        map: this.map
      });
    }
  }

  initMap() {
    let mapOptions = {
      center: this.latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

}
