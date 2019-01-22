import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as xml2js from "xml2js";

import {map} from 'rxjs/operators';

@Injectable()
export class RequestProvider {

	constructor(public http: Http, public httpClient: HttpClient) {
		console.log('Hello RequestProvider Provider');
	}

	getContinentsReq(){
		// var url = "http://api.meteored.cl/index.php?api_lang=cl&continente=0&affiliate_id=55nsxhsztu66";
		var url = "https://us-central1-meteorologia-7cfa7.cloudfunctions.net/getContinents?";

		var headers = new Headers();
		headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
		headers.append('Access-Control-Allow-Origin', '*');
		// headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		// headers.append('Accept','text/xml');
		// headers.append('content-type','text/xml');
		// headers.append("Postman-Token", "2af0d01b-fedd-4cdd-a261-2d3d9e05c525");

		return new Promise((resolve, reject)=>
		{
	      this.http.get(url, {headers: headers})
	      .map(res => res.text())
	      .subscribe(data =>
	      {
	      	var parser = new DOMParser();
	      	var xmlData = parser.parseFromString(data, "application/xml");
          	var items = xmlData.querySelectorAll("name");

         	resolve(items);
	      },
	      error =>
	      {
	         console.error("Error in getContinentsReq:",error);
	         reject(error);
	      });

 		});
	}

	getCountriesReq(continentId){
		// var url = "http://api.meteored.cl/index.php?api_lang=cl&continente="+continentId+"&affiliate_id=55nsxhsztu66";
		var url = "https://us-central1-meteorologia-7cfa7.cloudfunctions.net/getCountries?continentId="+continentId;

		var headers = new Headers();
		headers.append('Access-Control-Allow-Origin', '*');
		headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

		return new Promise((resolve, reject)=>
		{
	      this.http.get(url, {headers: headers})
	      .map(res => res.text())
	      .subscribe(data =>
	      {
	      	var parser = new DOMParser();
	      	var xmlData = parser.parseFromString(data, "application/xml");
          	var items = xmlData.querySelectorAll("name");
         	
         	resolve(items);
	      },
	      error =>
	      {
	         console.error("Error in getCountriesReq:",error);
	         reject(error);
	      });
		});
	}

	getRegionsReq(countryId){
		// var url ="http://api.meteored.cl/index.php?api_lang=cl&pais="+countryId+"&affiliate_id=55nsxhsztu66";
		var url = "https://us-central1-meteorologia-7cfa7.cloudfunctions.net/getRegions?countryId="+countryId;

		var headers = new Headers();
		headers.append('Access-Control-Allow-Origin', '*');
		headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

		return new Promise((resolve, reject)=>
		{
	      this.http.get(url, {headers: headers})
	      .map(res => res.text())
	      .subscribe(data =>
	      {
	      	var parser = new DOMParser();
	      	var xmlData = parser.parseFromString(data, "application/xml");
          	var items = xmlData.querySelectorAll("name");
         	resolve(items);
	      },
	      error =>
	      {
	         console.error("Error in getRegionsReq:",error);
	         reject(error);
	      });
		});
	}

	getLocationsReq(regionId){
		// var url ="http://api.meteored.cl/index.php?api_lang=cl&division="+regionId+"&affiliate_id=55nsxhsztu66";
		var url = "https://us-central1-meteorologia-7cfa7.cloudfunctions.net/getLocations?regionId="+regionId;

		var headers = new Headers();
		headers.append('Access-Control-Allow-Origin', '*');
		headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

		return new Promise((resolve, reject)=>
		{
	      this.http.get(url, {headers: headers})
	      .map(res => res.text())
	      .subscribe(data =>
	      {
	      	var parser = new DOMParser();
	      	var xmlData = parser.parseFromString(data, "application/xml");
          	var items = xmlData.querySelectorAll("name");
         	resolve(items);
	      },
	      error =>
	      {
	         console.error("Error in getRegionsReq:",error);
	         reject(error);
	      });
		});
	}

	getWeatherReq(locationID){
		// var url ="http://api.meteored.cl/index.php?api_lang=cl&localidad="+locationID+"&affiliate_id=55nsxhsztu66";
		var url = "https://us-central1-meteorologia-7cfa7.cloudfunctions.net/getWeather?locationID="+locationID;

		var headers = new Headers();
		headers.append('Access-Control-Allow-Origin', '*');
		headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

		var tempMin:any = [];
		var tempMax:any = [];
		var wind:any = [];
		var sky:any = [];

		return new Promise((resolve, reject)=>
		{
	      this.http.get(url, {headers: headers})
	      .map(res => res.text())
	      .subscribe(data =>
	      {
	      	var parser = new DOMParser();
	      	var xmlData = parser.parseFromString(data, "application/xml");
          	var items:any = xmlData.querySelectorAll("var");

          	console.log("var:",items);

          	for (var i = 0; i < items.length; ++i) {
          		if(items[i].children[0].textContent === "Temperatura Mínima"){
	          		for (var e = 0; e < items[i].children[2].children.length; ++e) {
	          			var temp = items[i].children[2].children[e].attributes[1].nodeValue;
	          			// var day = items[i].children[2].children[e].attributes[0].nodeValue;

	          			tempMin.push({temp:temp});
	          		}
	          	}
	          	else if(items[i].children[0].textContent === "Temperatura Máxima"){
	          		for (var e = 0; e < items[i].children[2].children.length; ++e) {
	          			var temp = items[i].children[2].children[e].attributes[1].nodeValue;

	          			tempMax.push({temp:temp});
	          		}
	          	}
	          	else if(items[i].children[0].textContent === "Viento"){
	          		for (var e = 0; e < items[i].children[2].children.length; ++e) {
	          			var winds = items[i].children[2].children[e].attributes[4].nodeValue;
	          			var icons = items[i].children[2].children[e].attributes[1].nodeValue;

	          			wind.push({wind: winds,icon: icons});
	          		}
	          	}
	          	else if(items[i].children[0].textContent === "Símbolo del tiempo"){
	          		for (var e = 0; e < items[i].children[2].children.length; ++e) {
	          			var skys = items[i].children[2].children[e].attributes[4].nodeValue;
	          			var icons = items[i].children[2].children[e].attributes[1].nodeValue;

	          			sky.push({sky: skys,icon: icons});
	          		}
	          	}

	          	if(i === items.length-1){
	          		var met:any =[];
	          		met.push({tempMin,tempMax,wind,sky});
	          		resolve(met[0]);
	          	}
          	}
	      },
	      error =>
	      {
	         console.error("Error in getRegionsReq:",error);
	         reject(error);
	      });
		});
	}

	searchLocationsReq(locationName){
		// var url ="https://www.meteored.cl/peticionBuscador.php?lang=cl&texto="+locationName;
		var url = "https://us-central1-meteorologia-7cfa7.cloudfunctions.net/searchLocations?locationName="+locationName;
		
		var headers = new Headers();
		headers.append('Access-Control-Allow-Origin', '*');
		headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

		return new Promise((resolve, reject)=>
		{
	      this.http.get(url, {headers: headers})
	      .map(res => res.json())
	      .subscribe(data =>
	      {
         	resolve(data);
	      },
	      error =>
	      {
	         console.error("Error in getRegionsReq:",error);
	         reject(error);
	      });
		});
	}

}
