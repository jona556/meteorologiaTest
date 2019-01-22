import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RequestProvider } from '../../providers/request/request';
import { LoadingProvider } from '../../providers/loading/loading';

@IonicPage()
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
})
export class WeatherPage {
	// days:any=["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
	months = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
	days = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");

	extraDays:any =[];

	weather:any=[];

	constructor(public navCtrl: NavController, public navParams: NavParams, public reqProv: RequestProvider,
		public loading: LoadingProvider)
	{
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad WeatherPage');
	}

	ionViewDidEnter(){
		var locationId = this.navParams.get("locationId");
		this.loading.presentLoading("Cargando el tiempo");
		this.reqProv.getWeatherReq(locationId)
		.then(data =>{
			console.log(data);
			this.weather = data;
			this.getDays();
			this.loading.presentLoadingDismiss();
		})
		.catch(err =>{
			console.error(err);
			this.loading.presentLoadingDismiss();
		});
	}

	getDays(){
		var d = new Date();
      var day:any = d.getDate();
      var month:any = d.getMonth()+1;

      if(day < 10){
         day = '0' + d.getDate();
      }

      for (var i = 0; i < 7; ++i) {
      	if(i>0){
      		d.setDate(d.getDate() + 1);
      	}
      	
      	var day:any = d.getDate();
      	var month:any = d.getMonth()+1;

      	var name = this.days[d.getUTCDay()] +" "+d.getDate()+" de "+ this.months[d.getMonth()];

      	this.extraDays.push({day: day+"/"+month,name:name});

      	// console.log(d);
      	if(i === 6){
      		console.log(this.extraDays);
      	}
      }
	}

}
