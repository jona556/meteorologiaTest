import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { RequestProvider } from '../../providers/request/request';

@IonicPage()
@Component({
  selector: 'page-search-location',
  templateUrl: 'search-location.html',
})
export class SearchLocationPage {
	searchData:any = "";
	locationId:any = 0;
	btnWeather:boolean = true;
	locations:any =[];

	constructor(public navCtrl: NavController, public navParams: NavParams, public reqProv: RequestProvider,
		public viewCtrl: ViewController) 
	{
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SearchLocationPage');
	}

	onInput(e){
		console.log(e);

		
		this.reqProv.searchLocationsReq(this.searchData)
		.then((data:any) =>{
			console.log("searchLocationsReq:",data);
			if(data.localidad.length > 0){
				this.locations = data.localidad;
			}
		})
		.catch(err =>{
			console.error("searchLocationsReq:",err);
		});
	}

	onChangeLocation(){
		console.log(this.locationId);
		if(this.locationId > 0){
			this.btnWeather = false;
		}
	}

	goToWeather(){
		this.navCtrl.push("WeatherPage",{locationId:this.locationId});
	}

	closeModal() {
		this.viewCtrl.dismiss();
	}	

}
