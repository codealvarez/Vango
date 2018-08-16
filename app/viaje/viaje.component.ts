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
    //public mensajes = new observableArray.ObservableArray([]);
    public mensajes=[]; 
    tokensCunductor=[];

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

        /*console.log('Token PUSH: '+ApplicationSettings.getString('tokenPush'));
        this.tokensCunductor.push(ApplicationSettings.getString('tokenPush'));
        this.tokensCunductor.push('chupelofuerte');
        */
        this.page.on('navigatingTo', (data) => {
            console.log('Entrando por loka');
            // run init code
            // (note: this will run when you either move forward or back to this page)
        });

        this.page.on('navigatingFrom', (data) => {
            console.log('Saliendo por loka');
            clearInterval(this.timeout); 
            // run destroy code
            // (note: this will run when you either move forward to a new page or back to the previous page)
        }); 
        this.myService.getMensajes()
            .subscribe((result) => {
                console.log('Resultado de mensajes');
                console.log(result);
                for(let i = 0; i <Object.keys(result).length; i++) {
                    console.log('Pintando a:');
                    console.log(result[i]); // "species"

                    this.mensajes.push(result[i].texto);  
                    console.log(this.mensajes);
                }
            }, (error) => {
                this.onGetDataError(error);
            });
        this.myService.getTokensConductor(idConductor)
            .subscribe((result) => {
                console.log('Resultado de tokens conductor: '+idConductor);
                console.log(result);
                for(let i = 0; i <Object.keys(result).length; i++) {
                    console.log('Pintando a:');
                    console.log(result[i]); // "species"

                    this.tokensCunductor.push(result[i].token);
                }
            }, (error) => {
                this.onGetDataError(error);
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
                            model.setMarcador(loc.latitude,loc.longitude,'pasajero',2);
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

        console.log('Map Ready');

        this.mapView = event.object;

        console.log("Setting a marker...");

        loader.show();
        let model = this;
        model.mapView.setStyle(<Style>(this.styles));
        this.myService.getPuntosRuta(this.idruta).subscribe((res) => {
            
            console.log('Respuesta de la ruta: '+model.idruta);
            console.log(JSON.stringify(res));
            for(let i = 0; i <Object.keys(res).length; i++) {
                console.log('Detalle de punto');
                console.log(JSON.stringify(res[i]));
                if(res[i].tipo == 'INICIO'){

                    model.latInicial = res[i].latitud;
                    model.lonInicial = res[i].longitud;

                    model.latitude = res[i].latitud*1;
                    model.longitude = res[i].longitud*1;
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
            model.setMarcador(model.latInicial,model.lonInicial,'inicio',0);
            model.setMarcador(model.latFinal,model.lonFinal,'fin',0);
            //model.setMarcador(model.vehiculo.latitud,model.vehiculo.latitud,'conductor',0);
            model.ubicarVehiculo();
            console.log('PARADAS NORMALES');
            console.log(JSON.stringify(model.paradas));
            
           

            model.dibujarRuta(model.latInicial,model.lonInicial,model.latFinal,model.lonFinal,model.paradas);
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
        ApplicationSettings.setString('idParada',args.marker.userData.id);
        ApplicationSettings.setNumber('idViaje',this.idviaje);
        this.routerExtensions.navigate(["/reservar"]);
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
                model.setMarcadorVan(model.vehiculo.latitud,model.vehiculo.longitud,'conductor',0);

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
                model.setMarcadorVan(model.vehiculo.latitud,model.vehiculo.longitud,'conductor',0);

            }, (error) => {
                this.onGetDataError(error);
            });
        }, 5000);
        
        
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
            
            image.imageSource = imageSource.fromResource('van');

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

    setMarcador(lat,lon,tipo,id){
        console.log('Pintando marcador: '+lat+' - '+lon+' - '+tipo);
        var marker = new Marker();
        const image = new ImageModule.Image();
        image.width=20; 
        image.height=20; 
        if(tipo == 'inicio'){
            image.imageSource = imageSource.fromResource('inicio');  
            marker.title = "Punto de inicio";
        }else if(tipo == 'fin'){
            image.imageSource = imageSource.fromResource('fin');
            marker.title = "Punto final";
        }else if(tipo == 'pasajero'){
            marker.title = "Tu ubicación";  
            image.imageSource = imageSource.fromResource('pasajero');
            
        } 

        
        marker.position = Position.positionFromLatLng(lat, lon);
        marker.icon=image;
        marker.snippet = 'Descripción del punto';
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
