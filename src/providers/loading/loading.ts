import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController, AlertController } from 'ionic-angular';

@Injectable()
export class LoadingProvider {
  loader: any;
  loaderSpinner: any;
  alert: any;

  constructor(private alertCtrl: AlertController, public loadingCtrl: LoadingController,
              public http: Http)
  {
    console.log('Hello LoadingProvider Provider');
  }

  presentLoadingSpinner() {
    this.loaderSpinner = this.loadingCtrl.create({
      content: '<ion-spinner color="light"></ion-spinner>',
      // spinner: 'circles',
      cssClass: 'spinnerClass'
    });
    this.loaderSpinner.present();
  }
  presentSpinnerDismiss(){
    this.loaderSpinner.dismiss();
  }

  presentLoading(txt) 
  {
    this.loader = this.loadingCtrl.create({
      content: txt
    });
    this.loader.present();
  }

  presentLoadingDismiss()
  {
    this.loader.dismiss();
  }
}
