import { Component, OnInit } from "@angular/core";
//import { registerElement } from 'nativescript-angular/element-registry';
import { MapView, Marker, Position, Polyline, Style} from 'nativescript-google-maps-sdk';
import {RouterExtensions} from "nativescript-angular/router";
import * as ApplicationSettings from "application-settings";
import {LoadingIndicator} from "nativescript-loading-indicator";
import { WebService } from "../ws.service";
import { ActivatedRoute } from "@angular/router";
import * as imageSource from "tns-core-modules/image-source";
import * as ImageModule from "tns-core-modules/ui/image";
import {Color} from 'color';
import * as pl from 'google-polyline';
import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "ui/enums";
import * as dialogs from "ui/dialogs";
import * as observableArray from "tns-core-modules/data/observable-array";
import { Page } from "ui/page"; 
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "viaje", loadChildren: "./viaje/viaje.module#ViajeModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
//registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);
let loader = new LoadingIndicator();
/*class Vehiculo {
    constructor(public latitud: number, public longitud: number, public placa_v:string) { }   
}*/
interface Vehiculo {
    latitud: number,
    longitud: number,
    placa: string
}

@Component({
    selector: "Viaje",
    moduleId: module.id,
    templateUrl: "./viaje.component.html"
})
export class ViajeComponent implements OnInit {
    public encodedPoints:any;
    //public paradas = new observableArray.ObservableArray([]);
    paradas = [];
    idruta: number;
    idviaje: number;
    idconductor: number;
    placa:string;
    nombreRuta:string="Nombre ruta";
    direccionRecogida:string="Dirección de recogida";
    fechaViaje:string="00-00-0000";
    horaViaje:string="00:00";
    cantidadPasajeros:string='0';
    nombreConductor:string='Nombre Conductor';


    latitude=4.587799; //Colombia4.587799, -73.940960
    longitude=-73.940960; //Clombia

    latInicial:number;
    lonInicial:number;
    latFinal:number;
    lonFinal:number;

    zoom = 15;
    minZoom = 0; 
    maxZoom = 22;
    bearing = 0;
    tilt = 0;
    padding = [40, 40, 40, 40];
    mapView: MapView;
    lastCamera: String;
    vehiculo:any;
    van:Marker;
    timeout:any;
    recorrido:boolean=false;
    //public mensajes = new observableArray.ObservableArray([]);
    public mensajes=[]; 
    tokensCunductor=[];
    puntoRecogida:any;
    checkin:boolean=false;
    mostrarVan:boolean=false;
    estadoViaje:string;

    styles=[
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#7c93a3"
            },
            {
                "lightness": "-10"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#a0a4a5"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#62838e"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "lightness": "-29"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#dde3e3"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#3f4a51"
            },
            {
                "weight": "0.30"
            },
            {
                "visibility": "on"
            },
            {
                "lightness": "74"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-100"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#bbcacf"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "lightness": "0"
            },
            {
                "color": "#bbcacf"
            },
            {
                "weight": "0.50"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#a9b4b8"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "invert_lightness": true
            },
            {
                "saturation": "-7"
            },
            {
                "lightness": "3"
            },
            {
                "gamma": "1.80"
            },
            {
                "weight": "0.01"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.bus",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#a3c7df"
            }
        ]
    }
];


    constructor(private routerExtensions: RouterExtensions, private myService: WebService,private route: ActivatedRoute,private page: Page) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
        this.route.params
          .forEach((params) => { 
              console.log('Parametros de url');
              console.log(JSON.stringify(params));
              this.idruta = +params["idruta"]; 
              this.idviaje = +params["idviaje"]; 
              this.idconductor = +params["idconductor"]; 
              this.placa = params["placa"]; 
              console.log(this.idruta+' - '+this.idviaje+' - '+this.placa);
          });
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
        const idConductor = this.idconductor;
        let model = this;

        /*console.log('Token PUSH: '+ApplicationSettings.getString('tokenPush'));
        this.tokensCunductor.push(ApplicationSettings.getString('tokenPush'));
        this.tokensCunductor.push('chupelofuerte');
        */
        model.page.on('navigatingTo', (data) => {
            console.log('Entrando a la vista');
            // run init code
            // (note: this will run when you either move forward or back to this page)
        });

        model.page.on('navigatingFrom', (data) => {
            console.log('Saliendo de la vista');
            clearInterval(model.timeout); 
            // run destroy code
            // (note: this will run when you either move forward to a new page or back to the previous page)
        }); 
        model.myService.getMensajes()
            .subscribe((result) => {
                console.log('Resultado de mensajes');
                console.log(result);
                for(let i = 0; i <Object.keys(result).length; i++) {
                    console.log('Pintando a:');
                    console.log(result[i]); // "species"

                    model.mensajes.push(result[i].texto);  
                    console.log(model.mensajes);
                }
            }, (error) => {
                model.onGetDataError(error);
            }); 

        
        model.myService.getTokensConductor(idConductor)
            .subscribe((result) => {
                console.log('Resultado de tokens conductor: '+idConductor);
                console.log(result);
                for(let i = 0; i <Object.keys(result).length; i++) {
                    console.log('Pintando a:');
                    console.log(result[i]); // "species"

                    model.tokensCunductor.push(result[i].token);
                }
            }, (error) => {
                model.onGetDataError(error);
            });


    }
    cancelar(){
        dialogs.confirm({
            title: "Cancelar reserva",
            message: "¿Realmente deseas cancelar esta reserva?",
            okButtonText: "Si, cancelarla",
            cancelButtonText: "No"
        }).then(result => {
            // result argument is boolean
            console.log("Dialog result: " + result);
            dialogs.alert({
                title: "Reserva cancelada",
                message: "Tu reserva ha sido cancelada exitosamente",
                okButtonText: "Ok"
            }).then(() => {
                console.log("Dialog closed!");
                this.routerExtensions.navigate(["/reservas"]);
            });
        });
    }
    ubicar(){
        let model = this;
        geolocation.isEnabled().then(function (isEnabled) {
            if (isEnabled) {
                let location = geolocation.getCurrentLocation({
                    desiredAccuracy: Accuracy.high,
                    maximumAge: 5000,
                    timeout: 10000
                })
                    .then(function (loc) {
                        if (loc) {
                            model.latitude = loc.latitude;
                            model.longitude = loc.longitude;
                            //model.setMarcador(loc.latitude,loc.longitude,'pasajero',2,null);
                        }
                    }, function (e) {
                        console.log("Error: " + (e.message || e));
                    });
            }else{
                geolocation.enableLocationRequest().then(function () {
                }, function (e) {
                    console.log("Error: " + (e.message || e));
                });
            }
        }, function (e) {
            console.log("Error: " + (e.message || e));
        });
    }
    irAtras() {
        this.routerExtensions.back();
    }
    contactar(){
        let model = this;
        dialogs.prompt({
            title: "Contactar",
            message: "Envía un mensaje al conductor",
            okButtonText: "Enviar",
            cancelButtonText: "Cancelar",
            //neutralButtonText: "Neutral text",
            //defaultText: "Default text",
            inputType: dialogs.inputType.text
        }).then(function (r) {
            console.log("Dialog result: " + r.result + ", text: " + r.text);
            if(r.result){
                if(model.tokensCunductor.length > 0){
                    model.myService.enviarPush(model.tokensCunductor,encodeURI(r.text))
                    .subscribe((result2) => {
                        console.log('Resultado del push');
                        //console.log(result2);
                        dialogs.alert({
                            title: "Mensaje enviado",
                            message: "Tu mensaje fue enviado exitosamente al conductor.",
                            okButtonText: "Ok"
                        }).then(() => {
                            console.log("Dialog closed!");
                        });
                    }, (error) => {
                        dialogs.alert({
                            title: "Mensaje fallido",
                            message: "Tu mensaje no pudo ser entregado. Intenta de nuevo por favor.",
                            okButtonText: "Ok"
                        }).then(() => {
                            console.log("Dialog closed!");
                        });
                    });
                }else{
                    dialogs.alert({
                        title: "Error conductor",
                        message: "Tu mensaje no pudo ser entregado. El conductor no tiene dispositivos asignados",
                        okButtonText: "Ok"
                    }).then(() => {
                        console.log("Dialog closed!");
                    });
                }
            }
            
        });
        /*dialogs.action({
            message: "Envía un mensaje al conductor",
            cancelButtonText: "Cancelar",
            actions: this.mensajes
        }).then(result => {
            console.log("Dialog result: " + result);
            if(result != 'Cancelar'){
                if(this.tokensCunductor.length > 0){
                    this.myService.enviarPush(this.tokensCunductor,encodeURI(result))
                    .subscribe((result2) => {
                        console.log('Resultado del push');
                        //console.log(result2);
                        dialogs.alert({
                            title: "Mensaje enviado",
                            message: "Tu mensaje fue enviado exitosamente al conductor.",
                            okButtonText: "Ok"
                        }).then(() => {
                            console.log("Dialog closed!");
                        });
                    }, (error) => {
                        dialogs.alert({
                            title: "Mensaje fallido",
                            message: "Tu mensaje no pudo ser entregado. Intenta de nuevo por favor.",
                            okButtonText: "Ok"
                        }).then(() => {
                            console.log("Dialog closed!");
                        });
                    });
                }else{
                    dialogs.alert({
                        title: "Error conductor",
                        message: "Tu mensaje no pudo ser entregado. El conductor no tiene dispositivos asignados",
                        okButtonText: "Ok"
                    }).then(() => {
                        console.log("Dialog closed!");
                    });
                }
                
                
            }
            
        });*/
    }
    onMapReady(event) {
        console.log('Map Ready');

        this.mapView = event.object;

        console.log("Setting a marker...");

        loader.show();
        let model = this;
        model.mapView.setStyle(<Style>(this.styles));
        let idPasajero = ApplicationSettings.getString('idUsuario');
        model.myService.getDatosViaje(model.idviaje,idPasajero)
            .subscribe((result:any) => {
                console.log('Resultado del viaje: '+model.idviaje);
                console.log(result);
                if(result[0].estado == "EN PUNTO DE INICIO" || result[0].estado == "EN SERVICIO"){
                        model.mostrarVan = true;
                }
                if(result[0].nombreruta){
                    model.nombreRuta=result[0].nombreruta;
                }
                if(result[0].direccionrecogida){
                    model.direccionRecogida=result[0].direccionrecogida;
                }
                if(result[0].fechaviaje){
                    model.fechaViaje=result[0].fechaviaje;
                }
                if(result[0].horaviaje){
                    model.horaViaje=result[0].horaviaje;
                }
                if(result[0].nombreconductor){
                    model.nombreConductor=result[0].nombreconductor;
                }
                if(result[0].cantidadpasajeros){
                    model.cantidadPasajeros=result[0].cantidadpasajeros;
                }
                model.estadoViaje = result[0].estado;
                model.myService.getPersonas(model.idviaje).subscribe((res) => {
                loader.hide();
                console.log('Respuesta de los pasajeros del viaje: '+Object.keys(res).length);
                console.log(JSON.stringify(res));
                for(let i = 0; i <Object.keys(res).length; i++) {
                    console.log('Detalle de punto');
                    console.log(JSON.stringify(res[i]));
                    if(res[i].idpasajero === ApplicationSettings.getString('idUsuario')){
                        console.log('Detalles del pasajero');
                        console.log(res[i]);
                        model.latitude = res[i].latitud*1;
                        model.longitude = res[i].longitud*1;    
                        model.setMarcador(res[i].latitud*1,res[i].longitud*1,'pasajero',res[i].nombrepasajero,res[i].direccion);    

                        if(res[i].estadopv=='0' && (model.estadoViaje=='EN SERVICIO' || model.estadoViaje=='EN PUNTO DE INICIO')){
                            model.checkin=true;
                        }
                    }

                    //model.paradas.push([Position.positionFromLatLng(res[i].latitud,res[i].longitud),res[i].nombrepasajero]); 
                    /*if(res[i].estadopv == "0"){ //SI el pasajero no se ha subido
                        model.setMarcador(res[i].latitud*1,res[i].longitud*1,'pasajero',res[i].nombrepasajero,res[i].direccion);    
                    }*/
                    
                }
                
                
                
                
            }, (error) => {
                loader.hide();
                console.log('Error trayendo los paraderos del viaje');
                console.log(error);
            });
                
            }, (error) => {
                model.onGetDataError(error);
            }); 


        

        this.myService.getPuntosRuta(this.idruta).subscribe((res) => {
            
            console.log('Respuesta de la ruta: '+model.idruta);
            console.log(JSON.stringify(res));
            for(let i = 0; i <Object.keys(res).length; i++) {
                console.log('Detalle de punto');
                console.log(JSON.stringify(res[i]));
                if(res[i].tipo == 'INICIO'){

                    model.latInicial = res[i].latitud;
                    model.lonInicial = res[i].longitud;

                    //model.latitude = res[i].latitud*1;
                    //model.longitude = res[i].longitud*1;
                    //console.log('LAT: '+model.latitude+' - LON: '+model.longitude);
                }
                if(res[i].tipo == 'FIN'){
                    model.latFinal = res[i].latitud;
                    model.lonFinal = res[i].longitud;
                }
                if(res[i].tipo == 'NORMAL'){
                    model.paradas.push([Position.positionFromLatLng(res[i].latitud,res[i].longitud),res[i].idparada]); 
                }
            }
            
            console.log('Punto inicial: LAT:'+model.latInicial+' - LON:'+model.lonInicial);
            console.log('Punto final: LAT:'+model.latFinal+' - LON:'+model.lonFinal);
            model.setMarcador(model.latInicial,model.lonInicial,'inicio',0,null);
            model.setMarcador(model.latFinal,model.lonFinal,'fin',0,null);
            //model.setMarcador(model.vehiculo.latitud,model.vehiculo.latitud,'conductor',0);
            model.ubicarVehiculo();
            console.log('PARADAS NORMALES');
            console.log(JSON.stringify(model.paradas));
            
           
            if(!model.recorrido){ 
                model.dibujarRuta(model.latInicial,model.lonInicial,model.latFinal,model.lonFinal,model.paradas);  
                model.recorrido=true;
            }
            
            loader.hide();
            


        }, (error) => {
            loader.hide();
            this.onGetDataError(error);
        }); 



    }
    onCoordinateTapped(args) {
        console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
    }

    onMarkerEvent(args) {
        dialogs.alert({
            title: "Punto de recogida",
            message: "Este es el punto de recogida de tu viaje. ¡Debes estar atento!",
            okButtonText: "Ok"
        }).then(() => {
            console.log("Dialog closed!");
        });
    } 

    onCameraChanged(args) {
        console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
        this.lastCamera = JSON.stringify(args.camera);
    } 
    ubicarVehiculo(){
        let model = this;

        //Buscar VAN la primer 
        model.myService.getUbicacionVehiculo(this.placa)
            .subscribe((result) => {
                //this.ubicarVehiculo(result);
                model.vehiculo = result;
                console.log('VEHICULO');
                console.log(model.vehiculo);
                if(model.estadoViaje=='EN PUNTO DE INICIO' || model.estadoViaje=='EN SERVICIO'){
                    model.setMarcadorVan(model.vehiculo.latitud,model.vehiculo.longitud,'conductor',0);    
                }
                

            }, (error) => {
                this.onGetDataError(error);
            });
        

        model.timeout = setInterval(() => {
            model.myService.getUbicacionVehiculo(this.placa)
            .subscribe((result) => {
                //this.ubicarVehiculo(result);
                model.vehiculo = result;
                console.log('VEHICULO');
                console.log(model.vehiculo);
                if(model.estadoViaje=='EN PUNTO DE INICIO' || model.estadoViaje=='EN SERVICIO'){
                    model.setMarcadorVan(model.vehiculo.latitud,model.vehiculo.longitud,'conductor',0);
                }

            }, (error) => {
                this.onGetDataError(error);
            });
        }, 2000);
        
        
    }
    ubicarVan(){
        let model = this;
        model.mapView.latitude = model.vehiculo.latitud*1;
        model.mapView.longitude = model.vehiculo.longitud*1;
    }
    setMarcadorVan(lat,lon,tipo,id){
        console.log('Seteando marcador de la VAN');
        console.log('Pintando marcador: '+lat+' - '+lon+' - '+tipo);
        let model = this;
        if(!model.van){
            console.log('Creando van de cero');
            model.van = new Marker();
            const image = new ImageModule.Image();
            image.width=20; 
            image.height=20; 
            
            image.imageSource = imageSource.fromResource('van2');

            model.van.title = "Ubicación del vehículo";  
            model.van.position = Position.positionFromLatLng(lat, lon);
            model.van.icon=image;
            model.van.snippet = 'Descripción del punto';
            model.van.userData = {index: 1,id: id};
            model.mapView.addMarker(model.van); 
        }else{
            console.log('Actualizando van');
            model.van.position = Position.positionFromLatLng(model.vehiculo.latitud,model.vehiculo.longitud);

            
        }
         
    }

    setMarcador(lat,lon,tipo,id,data2){
        console.log('Pintando marcador: '+lat+' - '+lon+' - '+tipo);
        var marker = new Marker();
        const image = new ImageModule.Image();
        image.width=20; 
        image.height=20; 
        marker.snippet = 'Descripción del punto';
        if(tipo == 'inicio'){
            image.imageSource = imageSource.fromResource('inicio');  
            marker.title = "Punto de inicio";
        }else if(tipo == 'fin'){
            image.imageSource = imageSource.fromResource('fin');
            marker.title = "Punto final";
        }else if(tipo == 'pasajero'){
            marker.title = "Tu ubicación de recogida";  
            image.imageSource = imageSource.fromResource('pasajero');
            marker.snippet = 'Debes esperar a la van en este punto';
        } 

        
        marker.position = Position.positionFromLatLng(lat, lon);
        marker.icon=image;
        
        marker.userData = {index: 1,id: id};
        this.mapView.addMarker(marker); 
    }

    dibujarRuta(lat,lon,lat2,lon2,paradas) {
        loader.show();
        this.myService.getData(lat,lon,lat2,lon2,paradas)
            .subscribe((result) => {
                this.onGetDataSuccess(result);
            }, (error) => {
                this.onGetDataError(error);
            });
    }
    checkIn(){
        let model = this;
        dialogs.confirm({
            title: "Check-In Viaje",
            message: "¿Deseas hacer Check-in en este viaje?",
            okButtonText: "Check-In",
            cancelButtonText: "Cancelar",
            //neutralButtonText: "Neutral text",
            //defaultText: "Default text",
        }).then(function (r) {
            if(r){
                if(model.tokensCunductor.length > 0){
                    let nombres = ApplicationSettings.getString('nombreUsuario');
                    let idPasajero = ApplicationSettings.getString('idUsuario');

                    model.myService.registrarPasajero(model.idviaje,idPasajero,'1','0','0')
                        .subscribe((result) => {
                            console.log('Respuesta de registro de pasajero');
                            console.log(result);
                            
                            model.myService.enviarPushCheckin(encodeURI(nombres+' se ha subido a la van'),model.tokensCunductor,model.idviaje,model.idruta,idPasajero,nombres)
                                .subscribe((result2) => {
                                    console.log('Resultado del push');
                                    //console.log(result2);
                                    dialogs.alert({
                                        title: "Listo",
                                        message: "Check-In realizado exitosamente",
                                        okButtonText: "Ok"
                                    }).then(() => {
                                        console.log("Dialog closed!");
                                        model.checkin=false;
                                    });
                                }, (error) => {
                                    dialogs.alert({
                                        title: "Check-In fallido",
                                        message: "El check-in no pudo ser realizado. Intenta de nuevo por favor.",
                                        okButtonText: "Ok"
                                    }).then(() => {
                                        console.log("Dialog closed!");
                                    });
                                });
                        }, (error) => {
                            model.onGetDataError(error);
                        });
                    
                }else{
                    dialogs.alert({
                        title: "Error conductor",
                        message: "Tu mensaje no pudo ser entregado. El conductor no tiene dispositivos asignados",
                        okButtonText: "Ok"
                    }).then(() => {
                        console.log("Dialog closed!");
                    });
                }
            }
            
        });
    }

    onGetDataSuccess(res) {
        this.encodedPoints = pl.decode(res.routes[0].overview_polyline.points);
        console.log('AQUI VAN LOS PUNTOS');
        console.log(this.encodedPoints); 
        const map = this.mapView;
        const model = this;

        let list = this.encodedPoints;

        let line = new Polyline();
        line.visible = true;
        line.width = 4;
        line.color = new Color('#153d7a');
        line.geodesic = true;
        line.clickable=true;

        for (var i = 0; i < list.length; i++) {
            line.addPoint(Position.positionFromLatLng(list[i][0],list[i][1]));
        }
        

        map.addPolyline(line);

        loader.hide();

    }

    private onGetDataError(error: Response | any) {
        console.log("onGetDataError: " + JSON.stringify(error));
    }
}
