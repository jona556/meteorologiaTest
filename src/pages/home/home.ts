import { Component } from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';

import { RequestProvider } from '../../providers/request/request';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	continents:any =[];
	continentsId = 0;

	countrySearch:boolean =true;
	countries:any =[];
	countryId = 0;

	regionSearch:boolean =true;
	regions:any =[];
	regionId = 0;

	locationSearch:boolean =true;
	locations:any =[];
	locationId = 0;

	btnWeather:boolean = true;

	constructor(public navCtrl: NavController, public reqProv: RequestProvider,public modalCtrl: ModalController) {

	}

	ionViewDidEnter(){
		this.getContinents();
	}

	searchModal() {
		const modal = this.modalCtrl.create("SearchLocationPage");
		modal.present();
	}

	getContinents(){
		this.reqProv.getContinentsReq()
		.then((data:any) =>{
			console.log("getContinents:",data);
			if(data.length > 0){
				this.continents = data;
			}
		})
		.catch(err =>{
			console.error("getContinents:",err);
		});
	}

	getCountries(id){
		this.reqProv.getCountriesReq(id)
		.then((data:any) =>{
			console.log("getCountries:",data);
			if(data.length > 0){
				this.countries = data;
				this.countrySearch = false;
			}
		})
		.catch(err =>{
			console.error("getCountries:",err);
		});
	}

	getRegions(id){
		this.reqProv.getRegionsReq(id)
		.then((data:any) =>{
			console.log("getRegions:",data);
			if(data.length > 0){
				this.regions = data;
				this.regionSearch = false;
			}
		})
		.catch(err =>{
			console.error("getRegions:",err);
		});
	}

	getLocations(id){
		this.reqProv.getLocationsReq(id)
		.then((data:any) =>{
			console.log("getLocations:",data);
			if(data.length > 0){
				this.locations = data;
				this.locationSearch = false;
			}
		})
		.catch(err =>{
			console.error("getLocations:",err);
		});
	}

	onChangeContinents(){
		console.log(this.continentsId);
		if(this.continentsId > 0){
			this.getCountries(this.continentsId);
		}
	}

	onChangeCountry(){
		console.log(this.countryId);
		if(this.countryId > 0){
			this.getRegions(this.countryId);
		}
	}

	onChangeRegion(){
		console.log(this.regionId);
		if(this.regionId > 0){
			this.getLocations(this.regionId);
		}
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

}
