import { Component, OnInit } from "@angular/core";
import { MapView, Marker, Position, Polyline, Bounds, Style } from 'nativescript-google-maps-sdk';
import { registerElement } from 'nativescript-angular/element-registry';
//Drawer
import * as dialogs from "ui/dialogs";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
//Ubicación
import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "ui/enums";
//Imágenes para los marcadores
import * as imageSource from "tns-core-modules/image-source";
import * as ImageModule from "tns-core-modules/ui/image";
//Rutas (Router)
import {RouterExtensions} from "nativescript-angular/router";
//Firebase para notificaciones push
//import firebase = require("nativescript-plugin-firebase");
import * as firebase from "nativescript-plugin-firebase"
import {LoadingIndicator} from "nativescript-loading-indicator";
import { WebService } from "../ws.service";
import * as ApplicationSettings from "application-settings";
import * as appversion from "nativescript-appversion";
import {Color} from 'color';
import * as pl from 'google-polyline';
let loader = new LoadingIndicator();

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "home", loadChildren: "./home/home.module#HomeModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
//Botón flotante
registerElement("Fab", () => require("nativescript-floatingactionbutton").Fab); 
//Mapa
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);
@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    latitude=4.587799; //Colombia4.587799, -73.940960
    //latitude:number; //Colombia4.587799, -73.940960
    longitude=-73.940960; //Clombia
    zoom = 12
    minZoom = 0; 
    maxZoom = 22;
    bearing = 0;
    tilt = 0;
    padding = [40, 40, 40, 40];
    mapView: MapView;
    marker:Marker;
    rutas = [];
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
                "visibility": "off"
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

    lastCamera: String;
    idPasajero: string = ApplicationSettings.getString('idUsuario');
    constructor(private routerExtensions: RouterExtensions,private myService: WebService) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
        
    }
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    ngOnInit(): void { 
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
        /*appversion.getVersionCode().then((v: string) => {
            console.log("Your app's version code is: " + v);
            alert('Versión de app: '+v); 
        });*/
        let model = this;
        if(!ApplicationSettings.getString('tokenPush')){
            firebase.getCurrentPushToken().then((token: string) => {
                // may be null if not known yet
                //alert("Current push token: " + token);
                ApplicationSettings.setString('tokenPush',token);
                loader.show();
                model.myService.registrarToken(token,model.idPasajero)
                .subscribe((result) => {
                    model.onGetDataSuccess(result);
                }, (error) => {
                    model.onGetDataError(error);
                });
            });
        }

        model.myService.getRutasDisponibles(null)
            .subscribe((result) => {
            console.log('Resultado de mensajes');
            console.log(result);
            for(let i = 0; i <Object.keys(result).length; i++) {
                console.log('Pintando a:');
                console.log(result[i]); // "species"

                model.rutas.push(result[i]);  
                console.log(model.rutas);
                model.dibujarRuta(result[i].latorigen*1,result[i].lonorigen*1,result[i].latdestino*1,result[i].londestino*1,[])

            }
        }, (error) => {
            model.onGetDataError(error);
        });
        

    }
    dibujarRuta(lat,lon,lat2,lon2,paradas) {
        console.log('Dibujando rutica');
        loader.show();
        this.myService.getData(lat,lon,lat2,lon2,paradas)
            .subscribe((result) => {
                this.resultadoRutas(result);
            }, (error) => {
                this.onGetDataError(error);
            });
    }
    onGetDataSuccess(res) {
        loader.hide();
        console.log('Respuesta del token');

        console.log(JSON.stringify(res)); 
        
        

    }
    resultadoRutas(res){
        console.log('Resultado de getData');
        console.log(res);
        loader.hide();
        
        const map = this.mapView;
        const model = this;

        let list = pl.decode(res.routes[0].overview_polyline.points);
        let line = new Polyline();
        line.visible = true;
        line.width = 4;
        let materialColors = [
            { color: '#B41540' }, { color: '#55AF14' }, { color: '#108659' }, 
            { color: '#C74E17' }, { color: '#87107D' }, { color: '#F9B741' },
            { color: '#580551' }, { color: '#812D08' }, { color: '#DA4970' },
        ];

        line.color = new Color(materialColors[Math.floor(Math.random() * materialColors.length)].color);
        line.geodesic = true;
        line.clickable=true;
        //line.userData.

        for (var i = 0; i < list.length; i++) {
            line.addPoint(Position.positionFromLatLng(list[i][0],list[i][1]));
        }

        map.addPolyline(line);

        loader.hide();
    }

    private onGetDataError(error: Response | any) {
        loader.hide();
        console.log('Respuesta de error');
        console.log(JSON.stringify(error));
        dialogs.alert({
            title: 'Error de conexión',
            message: "Lo sentimos, hubo un problema encontrando el servidor, verifica tu conexión a Internet e intenta nuevamente.",
            okButtonText: 'Ok'
        }).then(() => {
            console.log("Dialog closed!");
            
        });
    }

    nuevaReserva():void{
        this.routerExtensions.navigate(["/disponibles"]);
    }
    verPagos():void{
        this.routerExtensions.navigate(["/tarjetas"]);   
    }
    onMapReady(event) {

        /*this.latInicial = 4.7014128;
        this.lonInicial = -74.1466856;
        this.latFinal = 4.6765584;
        this.lonFinal = -74.0536666;*/
        console.log('Map Ready');

        

        let model = this;
        model.mapView = event.object;

        model.mapView.setStyle(<Style>(this.styles));
        geolocation.isEnabled().then(function (isEnabled) {
            if (isEnabled) {
                let location = geolocation.getCurrentLocation({
                    desiredAccuracy: Accuracy.high,
                    maximumAge: 10000,
                    timeout: 20000
                })
                    .then(function (loc) {
                        if (loc) {
                            model.latitude = loc.latitude;
                            model.longitude = loc.longitude;
                            model.mapView.latitude = loc.latitude;
                            model.mapView.longitude = loc.longitude;
                            model.setMarcador(loc.latitude,loc.longitude,'pasajero',2);
                        }
                    }, function (e) {
                        console.log('Error en getCurrentLocation');
                        console.log("Error: " + (e.message || e));
                    });
            }else{
                geolocation.enableLocationRequest().then(function () {
                    let location = geolocation.getCurrentLocation({
                        desiredAccuracy: Accuracy.high,
                        maximumAge: 5000,
                        timeout: 10000
                    }).then(function (loc) { 
                        if (loc) {
                            model.latitude = loc.latitude;
                            model.longitude = loc.longitude;
                            console.log('Ubicado en '+loc.latitude+' - '+loc.longitude);
                            model.setMarcador(loc.latitude,loc.longitude,'pasajero',2);
                        }
                    }, function (e) {
                        console.log("Error: " + (e.message || e));
                    });
                }, function (e) {

                    console.log('Error en enableLocationRequest');
                    console.log("Error: " + (e.message || e));
                });
            }
        }, function (e) {
            console.log("Error: " + (e.message || e));
        });
    }
    ubicar(){
        console.log('Ubicando');
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
                            console.log('Ubicado en '+loc.latitude+' - '+loc.longitude);
                            model.setMarcador(loc.latitude,loc.longitude,'pasajero',2);
                        }
                    }, function (e) {
                        console.log("Error: " + (e.message || e));
                    });
            }else{
                geolocation.enableLocationRequest().then(function () {
                    let location = geolocation.getCurrentLocation({
                        desiredAccuracy: Accuracy.high,
                        maximumAge: 5000,
                        timeout: 10000
                    }).then(function (loc) { 
                        if (loc) {
                                model.latitude = loc.latitude;
                                model.longitude = loc.longitude;
                                console.log('Ubicado en '+loc.latitude+' - '+loc.longitude);
                                model.setMarcador(loc.latitude,loc.longitude,'pasajero',2);
                        }
                    }, function (e) {
                            console.log("Error: " + (e.message || e));
                    });
                }, function (e) {
                    console.log("Error: " + (e.message || e));
                });
                
            }
        }, function (e) {
            console.log("Error: " + (e.message || e));
        });
    }
    setMarcador(lat,lon,tipo,id){
        let model = this;
        console.log('Pintando marcador: '+lat+' - '+lon+' - '+tipo);
        if(model.marker){
            model.marker.position = Position.positionFromLatLng(lat, lon);
        }else{
            model.marker = new Marker();
            const image = new ImageModule.Image();
            image.width=20; 
            image.height=20; 
            if(tipo == 'inicio'){
                image.imageSource = imageSource.fromResource('inicio');  
                model.marker.title = "Punto de inicio";
            }else if(tipo == 'fin'){
                image.imageSource = imageSource.fromResource('fin');
                model.marker.title = "Punto final";
            }else if(tipo == 'pasajero'){
                model.marker.title = "Tu ubicación";  
                image.imageSource = imageSource.fromResource('dino');
            } 

            
            model.marker.position = Position.positionFromLatLng(lat, lon);
            model.marker.icon=image;
            model.marker.snippet = 'Descripción del punto';
            model.marker.userData = {index: 1,id: id};
            model.mapView.addMarker(model.marker); 
        }
        
    }
    onCoordinateTapped(args) {

        //console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
    }

    onMarkerEvent(args) {
    } 

    onCameraChanged(args) {
        console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
        this.lastCamera = JSON.stringify(args.camera);
    }
}
