import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InformacionEstablecimientoPage } from './informacion-establecimiento';
import { GoogleMaps } from '@ionic-native/google-maps';
import { ServicioBuscarProvider } from '../../providers/servicio-buscar/servicio-buscar';

@NgModule({
  declarations: [
    InformacionEstablecimientoPage,
  ],
  imports: [
    IonicPageModule.forChild(InformacionEstablecimientoPage),
  ],
  providers: [
    GoogleMaps,
    ServicioBuscarProvider
  ]
})
export class InformacionEstablecimientoPageModule {}
