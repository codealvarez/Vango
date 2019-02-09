"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//import { registerElement } from 'nativescript-angular/element-registry';
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var router_1 = require("nativescript-angular/router");
var ApplicationSettings = require("application-settings");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var ws_service_1 = require("../ws.service");
var router_2 = require("@angular/router");
var imageSource = require("tns-core-modules/image-source");
var ImageModule = require("tns-core-modules/ui/image");
var color_1 = require("color");
var pl = require("google-polyline");
var geolocation = require("nativescript-geolocation");
var enums_1 = require("ui/enums");
var dialogs = require("ui/dialogs");
var page_1 = require("ui/page");
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "viaje", loadChildren: "./viaje/viaje.module#ViajeModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
//registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var ViajeComponent = /** @class */ (function () {
    function ViajeComponent(routerExtensions, myService, route, page) {
        var _this = this;
        this.routerExtensions = routerExtensions;
        this.myService = myService;
        this.route = route;
        this.page = page;
        //public paradas = new observableArray.ObservableArray([]);
        this.paradas = [];
        this.nombreRuta = "Nombre ruta";
        this.direccionRecogida = "Dirección de recogida";
        this.fechaViaje = "00-00-0000";
        this.horaViaje = "00:00";
        this.cantidadPasajeros = '0';
        this.nombreConductor = 'Nombre Conductor';
        this.latitude = 4.587799; //Colombia4.587799, -73.940960
        this.longitude = -73.940960; //Clombia
        this.zoom = 15;
        this.minZoom = 0;
        this.maxZoom = 22;
        this.bearing = 0;
        this.tilt = 0;
        this.padding = [40, 40, 40, 40];
        this.recorrido = false;
        //public mensajes = new observableArray.ObservableArray([]);
        this.mensajes = [];
        this.tokensCunductor = [];
        this.checkin = false;
        this.mostrarVan = false;
        this.styles = [
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
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
        this.route.params
            .forEach(function (params) {
            console.log('Parametros de url');
            console.log(JSON.stringify(params));
            _this.idruta = +params["idruta"];
            _this.idviaje = +params["idviaje"];
            _this.idconductor = +params["idconductor"];
            _this.placa = params["placa"];
            console.log(_this.idruta + ' - ' + _this.idviaje + ' - ' + _this.placa);
        });
    }
    ViajeComponent.prototype.ngOnInit = function () {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
        var idConductor = this.idconductor;
        var model = this;
        /*console.log('Token PUSH: '+ApplicationSettings.getString('tokenPush'));
        this.tokensCunductor.push(ApplicationSettings.getString('tokenPush'));
        this.tokensCunductor.push('chupelofuerte');
        */
        model.page.on('navigatingTo', function (data) {
            console.log('Entrando a la vista');
            // run init code
            // (note: this will run when you either move forward or back to this page)
        });
        model.page.on('navigatingFrom', function (data) {
            console.log('Saliendo de la vista');
            clearInterval(model.timeout);
            // run destroy code
            // (note: this will run when you either move forward to a new page or back to the previous page)
        });
        model.myService.getMensajes()
            .subscribe(function (result) {
            console.log('Resultado de mensajes');
            console.log(result);
            for (var i = 0; i < Object.keys(result).length; i++) {
                console.log('Pintando a:');
                console.log(result[i]); // "species"
                model.mensajes.push(result[i].texto);
                console.log(model.mensajes);
            }
        }, function (error) {
            model.onGetDataError(error);
        });
        model.myService.getTokensConductor(idConductor)
            .subscribe(function (result) {
            console.log('Resultado de tokens conductor: ' + idConductor);
            console.log(result);
            for (var i = 0; i < Object.keys(result).length; i++) {
                console.log('Pintando a:');
                console.log(result[i]); // "species"
                model.tokensCunductor.push(result[i].token);
            }
        }, function (error) {
            model.onGetDataError(error);
        });
    };
    ViajeComponent.prototype.cancelar = function () {
        var _this = this;
        dialogs.confirm({
            title: "Cancelar reserva",
            message: "¿Realmente deseas cancelar esta reserva?",
            okButtonText: "Si, cancelarla",
            cancelButtonText: "No"
        }).then(function (result) {
            // result argument is boolean
            console.log("Dialog result: " + result);
            dialogs.alert({
                title: "Reserva cancelada",
                message: "Tu reserva ha sido cancelada exitosamente",
                okButtonText: "Ok"
            }).then(function () {
                console.log("Dialog closed!");
                _this.routerExtensions.navigate(["/reservas"]);
            });
        });
    };
    ViajeComponent.prototype.ubicar = function () {
        var model = this;
        geolocation.isEnabled().then(function (isEnabled) {
            if (isEnabled) {
                var location_1 = geolocation.getCurrentLocation({
                    desiredAccuracy: enums_1.Accuracy.high,
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
            }
            else {
                geolocation.enableLocationRequest().then(function () {
                }, function (e) {
                    console.log("Error: " + (e.message || e));
                });
            }
        }, function (e) {
            console.log("Error: " + (e.message || e));
        });
    };
    ViajeComponent.prototype.irAtras = function () {
        this.routerExtensions.back();
    };
    ViajeComponent.prototype.contactar = function () {
        var model = this;
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
            if (r.result) {
                if (model.tokensCunductor.length > 0) {
                    model.myService.enviarPush(model.tokensCunductor, encodeURI(r.text))
                        .subscribe(function (result2) {
                        console.log('Resultado del push');
                        //console.log(result2);
                        dialogs.alert({
                            title: "Mensaje enviado",
                            message: "Tu mensaje fue enviado exitosamente al conductor.",
                            okButtonText: "Ok"
                        }).then(function () {
                            console.log("Dialog closed!");
                        });
                    }, function (error) {
                        dialogs.alert({
                            title: "Mensaje fallido",
                            message: "Tu mensaje no pudo ser entregado. Intenta de nuevo por favor.",
                            okButtonText: "Ok"
                        }).then(function () {
                            console.log("Dialog closed!");
                        });
                    });
                }
                else {
                    dialogs.alert({
                        title: "Error conductor",
                        message: "Tu mensaje no pudo ser entregado. El conductor no tiene dispositivos asignados",
                        okButtonText: "Ok"
                    }).then(function () {
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
    };
    ViajeComponent.prototype.onMapReady = function (event) {
        var _this = this;
        console.log('Map Ready');
        this.mapView = event.object;
        console.log("Setting a marker...");
        loader.show();
        var model = this;
        model.mapView.setStyle((this.styles));
        var idPasajero = ApplicationSettings.getString('idUsuario');
        model.myService.getDatosViaje(model.idviaje, idPasajero)
            .subscribe(function (result) {
            console.log('Resultado del viaje: ' + model.idviaje);
            console.log(result);
            if (result[0].estado == "EN PUNTO DE INICIO" || result[0].estado == "EN SERVICIO") {
                model.mostrarVan = true;
            }
            if (result[0].nombreruta) {
                model.nombreRuta = result[0].nombreruta;
            }
            if (result[0].direccionrecogida) {
                model.direccionRecogida = result[0].direccionrecogida;
            }
            if (result[0].fechaviaje) {
                model.fechaViaje = result[0].fechaviaje;
            }
            if (result[0].horaviaje) {
                model.horaViaje = result[0].horaviaje;
            }
            if (result[0].nombreconductor) {
                model.nombreConductor = result[0].nombreconductor;
            }
            if (result[0].cantidadpasajeros) {
                model.cantidadPasajeros = result[0].cantidadpasajeros;
            }
            model.estadoViaje = result[0].estado;
            model.myService.getPersonas(model.idviaje).subscribe(function (res) {
                loader.hide();
                console.log('Respuesta de los pasajeros del viaje: ' + Object.keys(res).length);
                console.log(JSON.stringify(res));
                for (var i = 0; i < Object.keys(res).length; i++) {
                    console.log('Detalle de punto');
                    console.log(JSON.stringify(res[i]));
                    if (res[i].idpasajero === ApplicationSettings.getString('idUsuario')) {
                        console.log('Detalles del pasajero');
                        console.log(res[i]);
                        model.latitude = res[i].latitud * 1;
                        model.longitude = res[i].longitud * 1;
                        model.setMarcador(res[i].latitud * 1, res[i].longitud * 1, 'pasajero', res[i].nombrepasajero, res[i].direccion);
                        if (res[i].estadopv == '0' && (model.estadoViaje == 'EN SERVICIO' || model.estadoViaje == 'EN PUNTO DE INICIO')) {
                            model.checkin = true;
                        }
                    }
                    //model.paradas.push([Position.positionFromLatLng(res[i].latitud,res[i].longitud),res[i].nombrepasajero]); 
                    /*if(res[i].estadopv == "0"){ //SI el pasajero no se ha subido
                        model.setMarcador(res[i].latitud*1,res[i].longitud*1,'pasajero',res[i].nombrepasajero,res[i].direccion);
                    }*/
                }
            }, function (error) {
                loader.hide();
                console.log('Error trayendo los paraderos del viaje');
                console.log(error);
            });
        }, function (error) {
            model.onGetDataError(error);
        });
        this.myService.getPuntosRuta(this.idruta).subscribe(function (res) {
            console.log('Respuesta de la ruta: ' + model.idruta);
            console.log(JSON.stringify(res));
            for (var i = 0; i < Object.keys(res).length; i++) {
                console.log('Detalle de punto');
                console.log(JSON.stringify(res[i]));
                if (res[i].tipo == 'INICIO') {
                    model.latInicial = res[i].latitud;
                    model.lonInicial = res[i].longitud;
                    //model.latitude = res[i].latitud*1;
                    //model.longitude = res[i].longitud*1;
                    //console.log('LAT: '+model.latitude+' - LON: '+model.longitude);
                }
                if (res[i].tipo == 'FIN') {
                    model.latFinal = res[i].latitud;
                    model.lonFinal = res[i].longitud;
                }
                if (res[i].tipo == 'NORMAL') {
                    model.paradas.push([nativescript_google_maps_sdk_1.Position.positionFromLatLng(res[i].latitud, res[i].longitud), res[i].idparada]);
                }
            }
            console.log('Punto inicial: LAT:' + model.latInicial + ' - LON:' + model.lonInicial);
            console.log('Punto final: LAT:' + model.latFinal + ' - LON:' + model.lonFinal);
            model.setMarcador(model.latInicial, model.lonInicial, 'inicio', 0, null);
            model.setMarcador(model.latFinal, model.lonFinal, 'fin', 0, null);
            //model.setMarcador(model.vehiculo.latitud,model.vehiculo.latitud,'conductor',0);
            model.ubicarVehiculo();
            console.log('PARADAS NORMALES');
            console.log(JSON.stringify(model.paradas));
            if (!model.recorrido) {
                model.dibujarRuta(model.latInicial, model.lonInicial, model.latFinal, model.lonFinal, model.paradas);
                model.recorrido = true;
            }
            loader.hide();
        }, function (error) {
            loader.hide();
            _this.onGetDataError(error);
        });
    };
    ViajeComponent.prototype.onCoordinateTapped = function (args) {
        console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
    };
    ViajeComponent.prototype.onMarkerEvent = function (args) {
        dialogs.alert({
            title: "Punto de recogida",
            message: "Este es el punto de recogida de tu viaje. ¡Debes estar atento!",
            okButtonText: "Ok"
        }).then(function () {
            console.log("Dialog closed!");
        });
    };
    ViajeComponent.prototype.onCameraChanged = function (args) {
        console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
        this.lastCamera = JSON.stringify(args.camera);
    };
    ViajeComponent.prototype.ubicarVehiculo = function () {
        var _this = this;
        var model = this;
        //Buscar VAN la primer 
        model.myService.getUbicacionVehiculo(this.placa)
            .subscribe(function (result) {
            //this.ubicarVehiculo(result);
            model.vehiculo = result;
            console.log('VEHICULO');
            console.log(model.vehiculo);
            if (model.estadoViaje == 'EN PUNTO DE INICIO' || model.estadoViaje == 'EN SERVICIO') {
                model.setMarcadorVan(model.vehiculo.latitud, model.vehiculo.longitud, 'conductor', 0);
            }
        }, function (error) {
            _this.onGetDataError(error);
        });
        model.timeout = setInterval(function () {
            model.myService.getUbicacionVehiculo(_this.placa)
                .subscribe(function (result) {
                //this.ubicarVehiculo(result);
                model.vehiculo = result;
                console.log('VEHICULO');
                console.log(model.vehiculo);
                if (model.estadoViaje == 'EN PUNTO DE INICIO' || model.estadoViaje == 'EN SERVICIO') {
                    model.setMarcadorVan(model.vehiculo.latitud, model.vehiculo.longitud, 'conductor', 0);
                }
            }, function (error) {
                _this.onGetDataError(error);
            });
        }, 2000);
    };
    ViajeComponent.prototype.ubicarVan = function () {
        var model = this;
        model.mapView.latitude = model.vehiculo.latitud * 1;
        model.mapView.longitude = model.vehiculo.longitud * 1;
    };
    ViajeComponent.prototype.setMarcadorVan = function (lat, lon, tipo, id) {
        console.log('Seteando marcador de la VAN');
        console.log('Pintando marcador: ' + lat + ' - ' + lon + ' - ' + tipo);
        var model = this;
        if (!model.van) {
            console.log('Creando van de cero');
            model.van = new nativescript_google_maps_sdk_1.Marker();
            var image = new ImageModule.Image();
            image.width = 20;
            image.height = 20;
            image.imageSource = imageSource.fromResource('van2');
            model.van.title = "Ubicación del vehículo";
            model.van.position = nativescript_google_maps_sdk_1.Position.positionFromLatLng(lat, lon);
            model.van.icon = image;
            model.van.snippet = 'Descripción del punto';
            model.van.userData = { index: 1, id: id };
            model.mapView.addMarker(model.van);
        }
        else {
            console.log('Actualizando van');
            model.van.position = nativescript_google_maps_sdk_1.Position.positionFromLatLng(model.vehiculo.latitud, model.vehiculo.longitud);
        }
    };
    ViajeComponent.prototype.setMarcador = function (lat, lon, tipo, id, data2) {
        console.log('Pintando marcador: ' + lat + ' - ' + lon + ' - ' + tipo);
        var marker = new nativescript_google_maps_sdk_1.Marker();
        var image = new ImageModule.Image();
        image.width = 20;
        image.height = 20;
        marker.snippet = 'Descripción del punto';
        if (tipo == 'inicio') {
            image.imageSource = imageSource.fromResource('inicio');
            marker.title = "Punto de inicio";
        }
        else if (tipo == 'fin') {
            image.imageSource = imageSource.fromResource('fin');
            marker.title = "Punto final";
        }
        else if (tipo == 'pasajero') {
            marker.title = "Tu ubicación de recogida";
            image.imageSource = imageSource.fromResource('pasajero');
            marker.snippet = 'Debes esperar a la van en este punto';
        }
        marker.position = nativescript_google_maps_sdk_1.Position.positionFromLatLng(lat, lon);
        marker.icon = image;
        marker.userData = { index: 1, id: id };
        this.mapView.addMarker(marker);
    };
    ViajeComponent.prototype.dibujarRuta = function (lat, lon, lat2, lon2, paradas) {
        var _this = this;
        loader.show();
        this.myService.getData(lat, lon, lat2, lon2, paradas)
            .subscribe(function (result) {
            _this.onGetDataSuccess(result);
        }, function (error) {
            _this.onGetDataError(error);
        });
    };
    ViajeComponent.prototype.checkIn = function () {
        var model = this;
        dialogs.confirm({
            title: "Check-In Viaje",
            message: "¿Deseas hacer Check-in en este viaje?",
            okButtonText: "Check-In",
            cancelButtonText: "Cancelar",
        }).then(function (r) {
            if (r) {
                if (model.tokensCunductor.length > 0) {
                    var nombres_1 = ApplicationSettings.getString('nombreUsuario');
                    var idPasajero_1 = ApplicationSettings.getString('idUsuario');
                    model.myService.registrarPasajero(model.idviaje, idPasajero_1, '1', '0', '0')
                        .subscribe(function (result) {
                        console.log('Respuesta de registro de pasajero');
                        console.log(result);
                        model.myService.enviarPushCheckin(encodeURI(nombres_1 + ' se ha subido a la van'), model.tokensCunductor, model.idviaje, model.idruta, idPasajero_1, nombres_1)
                            .subscribe(function (result2) {
                            console.log('Resultado del push');
                            //console.log(result2);
                            dialogs.alert({
                                title: "Listo",
                                message: "Check-In realizado exitosamente",
                                okButtonText: "Ok"
                            }).then(function () {
                                console.log("Dialog closed!");
                                model.checkin = false;
                            });
                        }, function (error) {
                            dialogs.alert({
                                title: "Check-In fallido",
                                message: "El check-in no pudo ser realizado. Intenta de nuevo por favor.",
                                okButtonText: "Ok"
                            }).then(function () {
                                console.log("Dialog closed!");
                            });
                        });
                    }, function (error) {
                        model.onGetDataError(error);
                    });
                }
                else {
                    dialogs.alert({
                        title: "Error conductor",
                        message: "Tu mensaje no pudo ser entregado. El conductor no tiene dispositivos asignados",
                        okButtonText: "Ok"
                    }).then(function () {
                        console.log("Dialog closed!");
                    });
                }
            }
        });
    };
    ViajeComponent.prototype.onGetDataSuccess = function (res) {
        this.encodedPoints = pl.decode(res.routes[0].overview_polyline.points);
        console.log('AQUI VAN LOS PUNTOS');
        console.log(this.encodedPoints);
        var map = this.mapView;
        var model = this;
        var list = this.encodedPoints;
        var line = new nativescript_google_maps_sdk_1.Polyline();
        line.visible = true;
        line.width = 4;
        line.color = new color_1.Color('#153d7a');
        line.geodesic = true;
        line.clickable = true;
        for (var i = 0; i < list.length; i++) {
            line.addPoint(nativescript_google_maps_sdk_1.Position.positionFromLatLng(list[i][0], list[i][1]));
        }
        map.addPolyline(line);
        loader.hide();
    };
    ViajeComponent.prototype.onGetDataError = function (error) {
        console.log("onGetDataError: " + JSON.stringify(error));
    };
    ViajeComponent = __decorate([
        core_1.Component({
            selector: "Viaje",
            moduleId: module.id,
            templateUrl: "./viaje.component.html"
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions, ws_service_1.WebService, router_2.ActivatedRoute, page_1.Page])
    ], ViajeComponent);
    return ViajeComponent;
}());
exports.ViajeComponent = ViajeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlhamUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmlhamUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBFQUEwRTtBQUMxRSw2RUFBeUY7QUFDekYsc0RBQTZEO0FBQzdELDBEQUE0RDtBQUM1RCxpRkFBZ0U7QUFDaEUsNENBQTJDO0FBQzNDLDBDQUFpRDtBQUNqRCwyREFBNkQ7QUFDN0QsdURBQXlEO0FBQ3pELCtCQUE0QjtBQUM1QixvQ0FBc0M7QUFDdEMsc0RBQXdEO0FBQ3hELGtDQUFvQztBQUNwQyxvQ0FBc0M7QUFFdEMsZ0NBQStCO0FBQy9COzs7Ozs4REFLOEQ7QUFDOUQsb0ZBQW9GO0FBQ3BGLElBQUksTUFBTSxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztBQWVwQztJQTJXSSx3QkFBb0IsZ0JBQWtDLEVBQVUsU0FBcUIsRUFBUyxLQUFxQixFQUFTLElBQVU7UUFBdEksaUJBY0M7UUFkbUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVk7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFTLFNBQUksR0FBSixJQUFJLENBQU07UUF6V3RJLDJEQUEyRDtRQUMzRCxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBS2IsZUFBVSxHQUFRLGFBQWEsQ0FBQztRQUNoQyxzQkFBaUIsR0FBUSx1QkFBdUIsQ0FBQztRQUNqRCxlQUFVLEdBQVEsWUFBWSxDQUFDO1FBQy9CLGNBQVMsR0FBUSxPQUFPLENBQUM7UUFDekIsc0JBQWlCLEdBQVEsR0FBRyxDQUFDO1FBQzdCLG9CQUFlLEdBQVEsa0JBQWtCLENBQUM7UUFHMUMsYUFBUSxHQUFDLFFBQVEsQ0FBQyxDQUFDLDhCQUE4QjtRQUNqRCxjQUFTLEdBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTO1FBTy9CLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDVixZQUFPLEdBQUcsQ0FB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Q0FBQztRQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQztRQUVwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLHVDQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDckU7UUFHRCxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUVsQixDQUFDO0lBRU8sdUNBQWMsR0FBdEIsVUFBdUIsS0FBcUI7UUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQXI1QlEsY0FBYztRQUwxQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE9BQU87WUFDakIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx3QkFBd0I7U0FDeEMsQ0FBQzt5Q0E0V3dDLHlCQUFnQixFQUFxQix1QkFBVSxFQUFnQix1QkFBYyxFQUFlLFdBQUk7T0EzVzdILGNBQWMsQ0FzNUIxQjtJQUFELHFCQUFDO0NBQUEsQUF0NUJELElBczVCQztBQXQ1Qlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG4vL2ltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnknO1xuaW1wb3J0IHsgTWFwVmlldywgTWFya2VyLCBQb3NpdGlvbiwgUG9seWxpbmUsIFN0eWxlfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrJztcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7TG9hZGluZ0luZGljYXRvcn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xuaW1wb3J0IHsgV2ViU2VydmljZSB9IGZyb20gXCIuLi93cy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCAqIGFzIGltYWdlU291cmNlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ltYWdlLXNvdXJjZVwiO1xuaW1wb3J0ICogYXMgSW1hZ2VNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvaW1hZ2VcIjtcbmltcG9ydCB7Q29sb3J9IGZyb20gJ2NvbG9yJztcbmltcG9ydCAqIGFzIHBsIGZyb20gJ2dvb2dsZS1wb2x5bGluZSc7XG5pbXBvcnQgKiBhcyBnZW9sb2NhdGlvbiBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XG5pbXBvcnQgeyBBY2N1cmFjeSB9IGZyb20gXCJ1aS9lbnVtc1wiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0ICogYXMgb2JzZXJ2YWJsZUFycmF5IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7IFxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiogQmVmb3JlIHlvdSBjYW4gbmF2aWdhdGUgdG8gdGhpcyBwYWdlIGZyb20geW91ciBhcHAsIHlvdSBuZWVkIHRvIHJlZmVyZW5jZSB0aGlzIHBhZ2UncyBtb2R1bGUgaW4gdGhlXG4qIGdsb2JhbCBhcHAgcm91dGVyIG1vZHVsZS4gQWRkIHRoZSBmb2xsb3dpbmcgb2JqZWN0IHRvIHRoZSBnbG9iYWwgYXJyYXkgb2Ygcm91dGVzOlxuKiB7IHBhdGg6IFwidmlhamVcIiwgbG9hZENoaWxkcmVuOiBcIi4vdmlhamUvdmlhamUubW9kdWxlI1ZpYWplTW9kdWxlXCIgfVxuKiBOb3RlIHRoYXQgdGhpcyBzaW1wbHkgcG9pbnRzIHRoZSBwYXRoIHRvIHRoZSBwYWdlIG1vZHVsZSBmaWxlLiBJZiB5b3UgbW92ZSB0aGUgcGFnZSwgeW91IG5lZWQgdG8gdXBkYXRlIHRoZSByb3V0ZSB0b28uXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLy9yZWdpc3RlckVsZW1lbnQoXCJNYXBWaWV3XCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrXCIpLk1hcFZpZXcpO1xubGV0IGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XG4vKmNsYXNzIFZlaGljdWxvIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbGF0aXR1ZDogbnVtYmVyLCBwdWJsaWMgbG9uZ2l0dWQ6IG51bWJlciwgcHVibGljIHBsYWNhX3Y6c3RyaW5nKSB7IH0gICBcbn0qL1xuaW50ZXJmYWNlIFZlaGljdWxvIHtcbiAgICBsYXRpdHVkOiBudW1iZXIsXG4gICAgbG9uZ2l0dWQ6IG51bWJlcixcbiAgICBwbGFjYTogc3RyaW5nXG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIlZpYWplXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3ZpYWplLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgVmlhamVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHB1YmxpYyBlbmNvZGVkUG9pbnRzOmFueTtcbiAgICAvL3B1YmxpYyBwYXJhZGFzID0gbmV3IG9ic2VydmFibGVBcnJheS5PYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgIHBhcmFkYXMgPSBbXTtcbiAgICBpZHJ1dGE6IG51bWJlcjtcbiAgICBpZHZpYWplOiBudW1iZXI7XG4gICAgaWRjb25kdWN0b3I6IG51bWJlcjtcbiAgICBwbGFjYTpzdHJpbmc7XG4gICAgbm9tYnJlUnV0YTpzdHJpbmc9XCJOb21icmUgcnV0YVwiO1xuICAgIGRpcmVjY2lvblJlY29naWRhOnN0cmluZz1cIkRpcmVjY2nDs24gZGUgcmVjb2dpZGFcIjtcbiAgICBmZWNoYVZpYWplOnN0cmluZz1cIjAwLTAwLTAwMDBcIjtcbiAgICBob3JhVmlhamU6c3RyaW5nPVwiMDA6MDBcIjtcbiAgICBjYW50aWRhZFBhc2FqZXJvczpzdHJpbmc9JzAnO1xuICAgIG5vbWJyZUNvbmR1Y3RvcjpzdHJpbmc9J05vbWJyZSBDb25kdWN0b3InO1xuXG5cbiAgICBsYXRpdHVkZT00LjU4Nzc5OTsgLy9Db2xvbWJpYTQuNTg3Nzk5LCAtNzMuOTQwOTYwXG4gICAgbG9uZ2l0dWRlPS03My45NDA5NjA7IC8vQ2xvbWJpYVxuXG4gICAgbGF0SW5pY2lhbDpudW1iZXI7XG4gICAgbG9uSW5pY2lhbDpudW1iZXI7XG4gICAgbGF0RmluYWw6bnVtYmVyO1xuICAgIGxvbkZpbmFsOm51bWJlcjtcblxuICAgIHpvb20gPSAxNTtcbiAgICBtaW5ab29tID0gMDsgXG4gICAgbWF4Wm9vbSA9IDIyO1xuICAgIGJlYXJpbmcgPSAwO1xuICAgIHRpbHQgPSAwO1xuICAgIHBhZGRpbmcgPSBbNDAsIDQwLCA0MCwgNDBdO1xuICAgIG1hcFZpZXc6IE1hcFZpZXc7XG4gICAgbGFzdENhbWVyYTogU3RyaW5nO1xuICAgIHZlaGljdWxvOmFueTtcbiAgICB2YW46TWFya2VyO1xuICAgIHRpbWVvdXQ6YW55O1xuICAgIHJlY29ycmlkbzpib29sZWFuPWZhbHNlO1xuICAgIC8vcHVibGljIG1lbnNhamVzID0gbmV3IG9ic2VydmFibGVBcnJheS5PYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgIHB1YmxpYyBtZW5zYWplcz1bXTsgXG4gICAgdG9rZW5zQ3VuZHVjdG9yPVtdO1xuICAgIHB1bnRvUmVjb2dpZGE6YW55O1xuICAgIGNoZWNraW46Ym9vbGVhbj1mYWxzZTtcbiAgICBtb3N0cmFyVmFuOmJvb2xlYW49ZmFsc2U7XG4gICAgZXN0YWRvVmlhamU6c3RyaW5nO1xuXG4gICAgc3R5bGVzPVtcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzdjOTNhM1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IFwiLTEwXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmUuY291bnRyeVwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlLmNvdW50cnlcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjYTBhNGE1XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmUucHJvdmluY2VcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNjI4MzhlXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiBcIi0yOVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZVwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZGRlM2UzXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlLm1hbl9tYWRlXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGUubWFuX21hZGVcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlLm1hbl9tYWRlXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzNmNGE1MVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwid2VpZ2h0XCI6IFwiMC4zMFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogXCI3NFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaVwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5hdHRyYWN0aW9uXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5idXNpbmVzc1wiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kuZ292ZXJubWVudFwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLm1lZGljYWxcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLnBhcmtcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLnBsYWNlX29mX3dvcnNoaXBcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLnNjaG9vbFwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLnNwb3J0c19jb21wbGV4XCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInNhdHVyYXRpb25cIjogXCItMTAwXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjYmJjYWNmXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiBcIjBcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2JiY2FjZlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwid2VpZ2h0XCI6IFwiMC41MFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0XCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXkuY29udHJvbGxlZF9hY2Nlc3NcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheS5jb250cm9sbGVkX2FjY2Vzc1wiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuc3Ryb2tlXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNhOWI0YjhcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmFydGVyaWFsXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMuaWNvblwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiaW52ZXJ0X2xpZ2h0bmVzc1wiOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwic2F0dXJhdGlvblwiOiBcIi03XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogXCIzXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJnYW1tYVwiOiBcIjEuODBcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIndlaWdodFwiOiBcIjAuMDFcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmxvY2FsXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXRcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXQuc3RhdGlvbi5idXNcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2EzYzdkZlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9XG5dO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgbXlTZXJ2aWNlOiBXZWJTZXJ2aWNlLHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLHByaXZhdGUgcGFnZTogUGFnZSkge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFVzZSB0aGUgY29uc3RydWN0b3IgdG8gaW5qZWN0IGFwcCBzZXJ2aWNlcyB0aGF0IHlvdSBuZWVkIGluIHRoaXMgY29tcG9uZW50LlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgICAgICB0aGlzLnJvdXRlLnBhcmFtc1xuICAgICAgICAgIC5mb3JFYWNoKChwYXJhbXMpID0+IHsgXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQYXJhbWV0cm9zIGRlIHVybCcpO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShwYXJhbXMpKTtcbiAgICAgICAgICAgICAgdGhpcy5pZHJ1dGEgPSArcGFyYW1zW1wiaWRydXRhXCJdOyBcbiAgICAgICAgICAgICAgdGhpcy5pZHZpYWplID0gK3BhcmFtc1tcImlkdmlhamVcIl07IFxuICAgICAgICAgICAgICB0aGlzLmlkY29uZHVjdG9yID0gK3BhcmFtc1tcImlkY29uZHVjdG9yXCJdOyBcbiAgICAgICAgICAgICAgdGhpcy5wbGFjYSA9IHBhcmFtc1tcInBsYWNhXCJdOyBcbiAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5pZHJ1dGErJyAtICcrdGhpcy5pZHZpYWplKycgLSAnK3RoaXMucGxhY2EpO1xuICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFVzZSB0aGUgXCJuZ09uSW5pdFwiIGhhbmRsZXIgdG8gaW5pdGlhbGl6ZSBkYXRhIGZvciB0aGlzIGNvbXBvbmVudC5cbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAgICAgY29uc3QgaWRDb25kdWN0b3IgPSB0aGlzLmlkY29uZHVjdG9yO1xuICAgICAgICBsZXQgbW9kZWwgPSB0aGlzO1xuXG4gICAgICAgIC8qY29uc29sZS5sb2coJ1Rva2VuIFBVU0g6ICcrQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ3Rva2VuUHVzaCcpKTtcbiAgICAgICAgdGhpcy50b2tlbnNDdW5kdWN0b3IucHVzaChBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygndG9rZW5QdXNoJykpO1xuICAgICAgICB0aGlzLnRva2Vuc0N1bmR1Y3Rvci5wdXNoKCdjaHVwZWxvZnVlcnRlJyk7XG4gICAgICAgICovXG4gICAgICAgIG1vZGVsLnBhZ2Uub24oJ25hdmlnYXRpbmdUbycsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRW50cmFuZG8gYSBsYSB2aXN0YScpO1xuICAgICAgICAgICAgLy8gcnVuIGluaXQgY29kZVxuICAgICAgICAgICAgLy8gKG5vdGU6IHRoaXMgd2lsbCBydW4gd2hlbiB5b3UgZWl0aGVyIG1vdmUgZm9yd2FyZCBvciBiYWNrIHRvIHRoaXMgcGFnZSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbW9kZWwucGFnZS5vbignbmF2aWdhdGluZ0Zyb20nLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NhbGllbmRvIGRlIGxhIHZpc3RhJyk7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKG1vZGVsLnRpbWVvdXQpOyBcbiAgICAgICAgICAgIC8vIHJ1biBkZXN0cm95IGNvZGVcbiAgICAgICAgICAgIC8vIChub3RlOiB0aGlzIHdpbGwgcnVuIHdoZW4geW91IGVpdGhlciBtb3ZlIGZvcndhcmQgdG8gYSBuZXcgcGFnZSBvciBiYWNrIHRvIHRoZSBwcmV2aW91cyBwYWdlKVxuICAgICAgICB9KTsgXG4gICAgICAgIG1vZGVsLm15U2VydmljZS5nZXRNZW5zYWplcygpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzdWx0YWRvIGRlIG1lbnNhamVzJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDxPYmplY3Qua2V5cyhyZXN1bHQpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQaW50YW5kbyBhOicpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHRbaV0pOyAvLyBcInNwZWNpZXNcIlxuXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLm1lbnNhamVzLnB1c2gocmVzdWx0W2ldLnRleHRvKTsgIFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtb2RlbC5tZW5zYWplcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgbW9kZWwub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7IFxuXG4gICAgICAgIFxuICAgICAgICBtb2RlbC5teVNlcnZpY2UuZ2V0VG9rZW5zQ29uZHVjdG9yKGlkQ29uZHVjdG9yKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3VsdGFkbyBkZSB0b2tlbnMgY29uZHVjdG9yOiAnK2lkQ29uZHVjdG9yKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPE9iamVjdC5rZXlzKHJlc3VsdCkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1BpbnRhbmRvIGE6Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdFtpXSk7IC8vIFwic3BlY2llc1wiXG5cbiAgICAgICAgICAgICAgICAgICAgbW9kZWwudG9rZW5zQ3VuZHVjdG9yLnB1c2gocmVzdWx0W2ldLnRva2VuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBtb2RlbC5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgfVxuICAgIGNhbmNlbGFyKCl7XG4gICAgICAgIGRpYWxvZ3MuY29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogXCJDYW5jZWxhciByZXNlcnZhXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIsK/UmVhbG1lbnRlIGRlc2VhcyBjYW5jZWxhciBlc3RhIHJlc2VydmE/XCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiU2ksIGNhbmNlbGFybGFcIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiTm9cIlxuICAgICAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAvLyByZXN1bHQgYXJndW1lbnQgaXMgYm9vbGVhblxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgcmVzdWx0OiBcIiArIHJlc3VsdCk7XG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJSZXNlcnZhIGNhbmNlbGFkYVwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVHUgcmVzZXJ2YSBoYSBzaWRvIGNhbmNlbGFkYSBleGl0b3NhbWVudGVcIixcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3Jlc2VydmFzXCJdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgdWJpY2FyKCl7XG4gICAgICAgIGxldCBtb2RlbCA9IHRoaXM7XG4gICAgICAgIGdlb2xvY2F0aW9uLmlzRW5hYmxlZCgpLnRoZW4oZnVuY3Rpb24gKGlzRW5hYmxlZCkge1xuICAgICAgICAgICAgaWYgKGlzRW5hYmxlZCkge1xuICAgICAgICAgICAgICAgIGxldCBsb2NhdGlvbiA9IGdlb2xvY2F0aW9uLmdldEN1cnJlbnRMb2NhdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIGRlc2lyZWRBY2N1cmFjeTogQWNjdXJhY3kuaGlnaCxcbiAgICAgICAgICAgICAgICAgICAgbWF4aW11bUFnZTogNTAwMCxcbiAgICAgICAgICAgICAgICAgICAgdGltZW91dDogMTAwMDBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAobG9jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwubGF0aXR1ZGUgPSBsb2MubGF0aXR1ZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwubG9uZ2l0dWRlID0gbG9jLmxvbmdpdHVkZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL21vZGVsLnNldE1hcmNhZG9yKGxvYy5sYXRpdHVkZSxsb2MubG9uZ2l0dWRlLCdwYXNhamVybycsMixudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgKGUubWVzc2FnZSB8fCBlKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZ2VvbG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyAoZS5tZXNzYWdlIHx8IGUpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgKGUubWVzc2FnZSB8fCBlKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpckF0cmFzKCkge1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xuICAgIH1cbiAgICBjb250YWN0YXIoKXtcbiAgICAgICAgbGV0IG1vZGVsID0gdGhpcztcbiAgICAgICAgZGlhbG9ncy5wcm9tcHQoe1xuICAgICAgICAgICAgdGl0bGU6IFwiQ29udGFjdGFyXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkVudsOtYSB1biBtZW5zYWplIGFsIGNvbmR1Y3RvclwiLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIkVudmlhclwiLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxhclwiLFxuICAgICAgICAgICAgLy9uZXV0cmFsQnV0dG9uVGV4dDogXCJOZXV0cmFsIHRleHRcIixcbiAgICAgICAgICAgIC8vZGVmYXVsdFRleHQ6IFwiRGVmYXVsdCB0ZXh0XCIsXG4gICAgICAgICAgICBpbnB1dFR5cGU6IGRpYWxvZ3MuaW5wdXRUeXBlLnRleHRcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgcmVzdWx0OiBcIiArIHIucmVzdWx0ICsgXCIsIHRleHQ6IFwiICsgci50ZXh0KTtcbiAgICAgICAgICAgIGlmKHIucmVzdWx0KXtcbiAgICAgICAgICAgICAgICBpZihtb2RlbC50b2tlbnNDdW5kdWN0b3IubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLm15U2VydmljZS5lbnZpYXJQdXNoKG1vZGVsLnRva2Vuc0N1bmR1Y3RvcixlbmNvZGVVUkkoci50ZXh0KSlcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0MikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3VsdGFkbyBkZWwgcHVzaCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyZXN1bHQyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk1lbnNhamUgZW52aWFkb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVHUgbWVuc2FqZSBmdWUgZW52aWFkbyBleGl0b3NhbWVudGUgYWwgY29uZHVjdG9yLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPa1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTWVuc2FqZSBmYWxsaWRvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJUdSBtZW5zYWplIG5vIHB1ZG8gc2VyIGVudHJlZ2Fkby4gSW50ZW50YSBkZSBudWV2byBwb3IgZmF2b3IuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRXJyb3IgY29uZHVjdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlR1IG1lbnNhamUgbm8gcHVkbyBzZXIgZW50cmVnYWRvLiBFbCBjb25kdWN0b3Igbm8gdGllbmUgZGlzcG9zaXRpdm9zIGFzaWduYWRvc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9rXCJcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgICAgIC8qZGlhbG9ncy5hY3Rpb24oe1xuICAgICAgICAgICAgbWVzc2FnZTogXCJFbnbDrWEgdW4gbWVuc2FqZSBhbCBjb25kdWN0b3JcIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsYXJcIixcbiAgICAgICAgICAgIGFjdGlvbnM6IHRoaXMubWVuc2FqZXNcbiAgICAgICAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgcmVzdWx0OiBcIiArIHJlc3VsdCk7XG4gICAgICAgICAgICBpZihyZXN1bHQgIT0gJ0NhbmNlbGFyJyl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy50b2tlbnNDdW5kdWN0b3IubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXlTZXJ2aWNlLmVudmlhclB1c2godGhpcy50b2tlbnNDdW5kdWN0b3IsZW5jb2RlVVJJKHJlc3VsdCkpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdDIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXN1bHRhZG8gZGVsIHB1c2gnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzdWx0Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJNZW5zYWplIGVudmlhZG9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlR1IG1lbnNhamUgZnVlIGVudmlhZG8gZXhpdG9zYW1lbnRlIGFsIGNvbmR1Y3Rvci5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk1lbnNhamUgZmFsbGlkb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVHUgbWVuc2FqZSBubyBwdWRvIHNlciBlbnRyZWdhZG8uIEludGVudGEgZGUgbnVldm8gcG9yIGZhdm9yLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPa1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkVycm9yIGNvbmR1Y3RvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJUdSBtZW5zYWplIG5vIHB1ZG8gc2VyIGVudHJlZ2Fkby4gRWwgY29uZHVjdG9yIG5vIHRpZW5lIGRpc3Bvc2l0aXZvcyBhc2lnbmFkb3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPa1wiXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0pOyovXG4gICAgfVxuICAgIG9uTWFwUmVhZHkoZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ01hcCBSZWFkeScpO1xuXG4gICAgICAgIHRoaXMubWFwVmlldyA9IGV2ZW50Lm9iamVjdDtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIlNldHRpbmcgYSBtYXJrZXIuLi5cIik7XG5cbiAgICAgICAgbG9hZGVyLnNob3coKTtcbiAgICAgICAgbGV0IG1vZGVsID0gdGhpcztcbiAgICAgICAgbW9kZWwubWFwVmlldy5zZXRTdHlsZSg8U3R5bGU+KHRoaXMuc3R5bGVzKSk7XG4gICAgICAgIGxldCBpZFBhc2FqZXJvID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ2lkVXN1YXJpbycpO1xuICAgICAgICBtb2RlbC5teVNlcnZpY2UuZ2V0RGF0b3NWaWFqZShtb2RlbC5pZHZpYWplLGlkUGFzYWplcm8pXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQ6YW55KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3VsdGFkbyBkZWwgdmlhamU6ICcrbW9kZWwuaWR2aWFqZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICBpZihyZXN1bHRbMF0uZXN0YWRvID09IFwiRU4gUFVOVE8gREUgSU5JQ0lPXCIgfHwgcmVzdWx0WzBdLmVzdGFkbyA9PSBcIkVOIFNFUlZJQ0lPXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwubW9zdHJhclZhbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHJlc3VsdFswXS5ub21icmVydXRhKXtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwubm9tYnJlUnV0YT1yZXN1bHRbMF0ubm9tYnJlcnV0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYocmVzdWx0WzBdLmRpcmVjY2lvbnJlY29naWRhKXtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuZGlyZWNjaW9uUmVjb2dpZGE9cmVzdWx0WzBdLmRpcmVjY2lvbnJlY29naWRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihyZXN1bHRbMF0uZmVjaGF2aWFqZSl7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmZlY2hhVmlhamU9cmVzdWx0WzBdLmZlY2hhdmlhamU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHJlc3VsdFswXS5ob3JhdmlhamUpe1xuICAgICAgICAgICAgICAgICAgICBtb2RlbC5ob3JhVmlhamU9cmVzdWx0WzBdLmhvcmF2aWFqZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYocmVzdWx0WzBdLm5vbWJyZWNvbmR1Y3Rvcil7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLm5vbWJyZUNvbmR1Y3Rvcj1yZXN1bHRbMF0ubm9tYnJlY29uZHVjdG9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihyZXN1bHRbMF0uY2FudGlkYWRwYXNhamVyb3Mpe1xuICAgICAgICAgICAgICAgICAgICBtb2RlbC5jYW50aWRhZFBhc2FqZXJvcz1yZXN1bHRbMF0uY2FudGlkYWRwYXNhamVyb3M7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1vZGVsLmVzdGFkb1ZpYWplID0gcmVzdWx0WzBdLmVzdGFkbztcbiAgICAgICAgICAgICAgICBtb2RlbC5teVNlcnZpY2UuZ2V0UGVyc29uYXMobW9kZWwuaWR2aWFqZSkuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGUgbG9zIHBhc2FqZXJvcyBkZWwgdmlhamU6ICcrT2JqZWN0LmtleXMocmVzKS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlcykpO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPE9iamVjdC5rZXlzKHJlcykubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0RldGFsbGUgZGUgcHVudG8nKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzW2ldKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc1tpXS5pZHBhc2FqZXJvID09PSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnaWRVc3VhcmlvJykpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0RldGFsbGVzIGRlbCBwYXNhamVybycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmxhdGl0dWRlID0gcmVzW2ldLmxhdGl0dWQqMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmxvbmdpdHVkZSA9IHJlc1tpXS5sb25naXR1ZCoxOyAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLnNldE1hcmNhZG9yKHJlc1tpXS5sYXRpdHVkKjEscmVzW2ldLmxvbmdpdHVkKjEsJ3Bhc2FqZXJvJyxyZXNbaV0ubm9tYnJlcGFzYWplcm8scmVzW2ldLmRpcmVjY2lvbik7ICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXNbaV0uZXN0YWRvcHY9PScwJyAmJiAobW9kZWwuZXN0YWRvVmlhamU9PSdFTiBTRVJWSUNJTycgfHwgbW9kZWwuZXN0YWRvVmlhamU9PSdFTiBQVU5UTyBERSBJTklDSU8nKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuY2hlY2tpbj10cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy9tb2RlbC5wYXJhZGFzLnB1c2goW1Bvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhyZXNbaV0ubGF0aXR1ZCxyZXNbaV0ubG9uZ2l0dWQpLHJlc1tpXS5ub21icmVwYXNhamVyb10pOyBcbiAgICAgICAgICAgICAgICAgICAgLyppZihyZXNbaV0uZXN0YWRvcHYgPT0gXCIwXCIpeyAvL1NJIGVsIHBhc2FqZXJvIG5vIHNlIGhhIHN1Ymlkb1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuc2V0TWFyY2Fkb3IocmVzW2ldLmxhdGl0dWQqMSxyZXNbaV0ubG9uZ2l0dWQqMSwncGFzYWplcm8nLHJlc1tpXS5ub21icmVwYXNhamVybyxyZXNbaV0uZGlyZWNjaW9uKTsgICAgXG4gICAgICAgICAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciB0cmF5ZW5kbyBsb3MgcGFyYWRlcm9zIGRlbCB2aWFqZScpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgbW9kZWwub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7IFxuXG5cbiAgICAgICAgXG5cbiAgICAgICAgdGhpcy5teVNlcnZpY2UuZ2V0UHVudG9zUnV0YSh0aGlzLmlkcnV0YSkuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZSBsYSBydXRhOiAnK21vZGVsLmlkcnV0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXMpKTtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPE9iamVjdC5rZXlzKHJlcykubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRGV0YWxsZSBkZSBwdW50bycpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc1tpXSkpO1xuICAgICAgICAgICAgICAgIGlmKHJlc1tpXS50aXBvID09ICdJTklDSU8nKXtcblxuICAgICAgICAgICAgICAgICAgICBtb2RlbC5sYXRJbmljaWFsID0gcmVzW2ldLmxhdGl0dWQ7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmxvbkluaWNpYWwgPSByZXNbaV0ubG9uZ2l0dWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9tb2RlbC5sYXRpdHVkZSA9IHJlc1tpXS5sYXRpdHVkKjE7XG4gICAgICAgICAgICAgICAgICAgIC8vbW9kZWwubG9uZ2l0dWRlID0gcmVzW2ldLmxvbmdpdHVkKjE7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0xBVDogJyttb2RlbC5sYXRpdHVkZSsnIC0gTE9OOiAnK21vZGVsLmxvbmdpdHVkZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHJlc1tpXS50aXBvID09ICdGSU4nKXtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwubGF0RmluYWwgPSByZXNbaV0ubGF0aXR1ZDtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwubG9uRmluYWwgPSByZXNbaV0ubG9uZ2l0dWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHJlc1tpXS50aXBvID09ICdOT1JNQUwnKXtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwucGFyYWRhcy5wdXNoKFtQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcocmVzW2ldLmxhdGl0dWQscmVzW2ldLmxvbmdpdHVkKSxyZXNbaV0uaWRwYXJhZGFdKTsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUHVudG8gaW5pY2lhbDogTEFUOicrbW9kZWwubGF0SW5pY2lhbCsnIC0gTE9OOicrbW9kZWwubG9uSW5pY2lhbCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUHVudG8gZmluYWw6IExBVDonK21vZGVsLmxhdEZpbmFsKycgLSBMT046Jyttb2RlbC5sb25GaW5hbCk7XG4gICAgICAgICAgICBtb2RlbC5zZXRNYXJjYWRvcihtb2RlbC5sYXRJbmljaWFsLG1vZGVsLmxvbkluaWNpYWwsJ2luaWNpbycsMCxudWxsKTtcbiAgICAgICAgICAgIG1vZGVsLnNldE1hcmNhZG9yKG1vZGVsLmxhdEZpbmFsLG1vZGVsLmxvbkZpbmFsLCdmaW4nLDAsbnVsbCk7XG4gICAgICAgICAgICAvL21vZGVsLnNldE1hcmNhZG9yKG1vZGVsLnZlaGljdWxvLmxhdGl0dWQsbW9kZWwudmVoaWN1bG8ubGF0aXR1ZCwnY29uZHVjdG9yJywwKTtcbiAgICAgICAgICAgIG1vZGVsLnViaWNhclZlaGljdWxvKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUEFSQURBUyBOT1JNQUxFUycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobW9kZWwucGFyYWRhcykpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgIFxuICAgICAgICAgICAgaWYoIW1vZGVsLnJlY29ycmlkbyl7IFxuICAgICAgICAgICAgICAgIG1vZGVsLmRpYnVqYXJSdXRhKG1vZGVsLmxhdEluaWNpYWwsbW9kZWwubG9uSW5pY2lhbCxtb2RlbC5sYXRGaW5hbCxtb2RlbC5sb25GaW5hbCxtb2RlbC5wYXJhZGFzKTsgIFxuICAgICAgICAgICAgICAgIG1vZGVsLnJlY29ycmlkbz10cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICAgICAgXG5cblxuICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgfSk7IFxuXG5cblxuICAgIH1cbiAgICBvbkNvb3JkaW5hdGVUYXBwZWQoYXJncykge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNvb3JkaW5hdGUgVGFwcGVkLCBMYXQ6IFwiICsgYXJncy5wb3NpdGlvbi5sYXRpdHVkZSArIFwiLCBMb246IFwiICsgYXJncy5wb3NpdGlvbi5sb25naXR1ZGUsIGFyZ3MpO1xuICAgIH1cblxuICAgIG9uTWFya2VyRXZlbnQoYXJncykge1xuICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiBcIlB1bnRvIGRlIHJlY29naWRhXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkVzdGUgZXMgZWwgcHVudG8gZGUgcmVjb2dpZGEgZGUgdHUgdmlhamUuIMKhRGViZXMgZXN0YXIgYXRlbnRvIVwiLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9rXCJcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICB9KTtcbiAgICB9IFxuXG4gICAgb25DYW1lcmFDaGFuZ2VkKGFyZ3MpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJDYW1lcmEgY2hhbmdlZDogXCIgKyBKU09OLnN0cmluZ2lmeShhcmdzLmNhbWVyYSksIEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKSA9PT0gdGhpcy5sYXN0Q2FtZXJhKTtcbiAgICAgICAgdGhpcy5sYXN0Q2FtZXJhID0gSlNPTi5zdHJpbmdpZnkoYXJncy5jYW1lcmEpO1xuICAgIH0gXG4gICAgdWJpY2FyVmVoaWN1bG8oKXtcbiAgICAgICAgbGV0IG1vZGVsID0gdGhpcztcblxuICAgICAgICAvL0J1c2NhciBWQU4gbGEgcHJpbWVyIFxuICAgICAgICBtb2RlbC5teVNlcnZpY2UuZ2V0VWJpY2FjaW9uVmVoaWN1bG8odGhpcy5wbGFjYSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vdGhpcy51YmljYXJWZWhpY3VsbyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIG1vZGVsLnZlaGljdWxvID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdWRUhJQ1VMTycpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1vZGVsLnZlaGljdWxvKTtcbiAgICAgICAgICAgICAgICBpZihtb2RlbC5lc3RhZG9WaWFqZT09J0VOIFBVTlRPIERFIElOSUNJTycgfHwgbW9kZWwuZXN0YWRvVmlhamU9PSdFTiBTRVJWSUNJTycpe1xuICAgICAgICAgICAgICAgICAgICBtb2RlbC5zZXRNYXJjYWRvclZhbihtb2RlbC52ZWhpY3Vsby5sYXRpdHVkLG1vZGVsLnZlaGljdWxvLmxvbmdpdHVkLCdjb25kdWN0b3InLDApOyAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuXG4gICAgICAgIG1vZGVsLnRpbWVvdXQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBtb2RlbC5teVNlcnZpY2UuZ2V0VWJpY2FjaW9uVmVoaWN1bG8odGhpcy5wbGFjYSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vdGhpcy51YmljYXJWZWhpY3VsbyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIG1vZGVsLnZlaGljdWxvID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdWRUhJQ1VMTycpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1vZGVsLnZlaGljdWxvKTtcbiAgICAgICAgICAgICAgICBpZihtb2RlbC5lc3RhZG9WaWFqZT09J0VOIFBVTlRPIERFIElOSUNJTycgfHwgbW9kZWwuZXN0YWRvVmlhamU9PSdFTiBTRVJWSUNJTycpe1xuICAgICAgICAgICAgICAgICAgICBtb2RlbC5zZXRNYXJjYWRvclZhbihtb2RlbC52ZWhpY3Vsby5sYXRpdHVkLG1vZGVsLnZlaGljdWxvLmxvbmdpdHVkLCdjb25kdWN0b3InLDApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICB9XG4gICAgdWJpY2FyVmFuKCl7XG4gICAgICAgIGxldCBtb2RlbCA9IHRoaXM7XG4gICAgICAgIG1vZGVsLm1hcFZpZXcubGF0aXR1ZGUgPSBtb2RlbC52ZWhpY3Vsby5sYXRpdHVkKjE7XG4gICAgICAgIG1vZGVsLm1hcFZpZXcubG9uZ2l0dWRlID0gbW9kZWwudmVoaWN1bG8ubG9uZ2l0dWQqMTtcbiAgICB9XG4gICAgc2V0TWFyY2Fkb3JWYW4obGF0LGxvbix0aXBvLGlkKXtcbiAgICAgICAgY29uc29sZS5sb2coJ1NldGVhbmRvIG1hcmNhZG9yIGRlIGxhIFZBTicpO1xuICAgICAgICBjb25zb2xlLmxvZygnUGludGFuZG8gbWFyY2Fkb3I6ICcrbGF0KycgLSAnK2xvbisnIC0gJyt0aXBvKTtcbiAgICAgICAgbGV0IG1vZGVsID0gdGhpcztcbiAgICAgICAgaWYoIW1vZGVsLnZhbil7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ3JlYW5kbyB2YW4gZGUgY2VybycpO1xuICAgICAgICAgICAgbW9kZWwudmFuID0gbmV3IE1hcmtlcigpO1xuICAgICAgICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2VNb2R1bGUuSW1hZ2UoKTtcbiAgICAgICAgICAgIGltYWdlLndpZHRoPTIwOyBcbiAgICAgICAgICAgIGltYWdlLmhlaWdodD0yMDsgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGltYWdlLmltYWdlU291cmNlID0gaW1hZ2VTb3VyY2UuZnJvbVJlc291cmNlKCd2YW4yJyk7XG5cbiAgICAgICAgICAgIG1vZGVsLnZhbi50aXRsZSA9IFwiVWJpY2FjacOzbiBkZWwgdmVow61jdWxvXCI7ICBcbiAgICAgICAgICAgIG1vZGVsLnZhbi5wb3NpdGlvbiA9IFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhsYXQsIGxvbik7XG4gICAgICAgICAgICBtb2RlbC52YW4uaWNvbj1pbWFnZTtcbiAgICAgICAgICAgIG1vZGVsLnZhbi5zbmlwcGV0ID0gJ0Rlc2NyaXBjacOzbiBkZWwgcHVudG8nO1xuICAgICAgICAgICAgbW9kZWwudmFuLnVzZXJEYXRhID0ge2luZGV4OiAxLGlkOiBpZH07XG4gICAgICAgICAgICBtb2RlbC5tYXBWaWV3LmFkZE1hcmtlcihtb2RlbC52YW4pOyBcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQWN0dWFsaXphbmRvIHZhbicpO1xuICAgICAgICAgICAgbW9kZWwudmFuLnBvc2l0aW9uID0gUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKG1vZGVsLnZlaGljdWxvLmxhdGl0dWQsbW9kZWwudmVoaWN1bG8ubG9uZ2l0dWQpO1xuXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICAgXG4gICAgfVxuXG4gICAgc2V0TWFyY2Fkb3IobGF0LGxvbix0aXBvLGlkLGRhdGEyKXtcbiAgICAgICAgY29uc29sZS5sb2coJ1BpbnRhbmRvIG1hcmNhZG9yOiAnK2xhdCsnIC0gJytsb24rJyAtICcrdGlwbyk7XG4gICAgICAgIHZhciBtYXJrZXIgPSBuZXcgTWFya2VyKCk7XG4gICAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlTW9kdWxlLkltYWdlKCk7XG4gICAgICAgIGltYWdlLndpZHRoPTIwOyBcbiAgICAgICAgaW1hZ2UuaGVpZ2h0PTIwOyBcbiAgICAgICAgbWFya2VyLnNuaXBwZXQgPSAnRGVzY3JpcGNpw7NuIGRlbCBwdW50byc7XG4gICAgICAgIGlmKHRpcG8gPT0gJ2luaWNpbycpe1xuICAgICAgICAgICAgaW1hZ2UuaW1hZ2VTb3VyY2UgPSBpbWFnZVNvdXJjZS5mcm9tUmVzb3VyY2UoJ2luaWNpbycpOyAgXG4gICAgICAgICAgICBtYXJrZXIudGl0bGUgPSBcIlB1bnRvIGRlIGluaWNpb1wiO1xuICAgICAgICB9ZWxzZSBpZih0aXBvID09ICdmaW4nKXtcbiAgICAgICAgICAgIGltYWdlLmltYWdlU291cmNlID0gaW1hZ2VTb3VyY2UuZnJvbVJlc291cmNlKCdmaW4nKTtcbiAgICAgICAgICAgIG1hcmtlci50aXRsZSA9IFwiUHVudG8gZmluYWxcIjtcbiAgICAgICAgfWVsc2UgaWYodGlwbyA9PSAncGFzYWplcm8nKXtcbiAgICAgICAgICAgIG1hcmtlci50aXRsZSA9IFwiVHUgdWJpY2FjacOzbiBkZSByZWNvZ2lkYVwiOyAgXG4gICAgICAgICAgICBpbWFnZS5pbWFnZVNvdXJjZSA9IGltYWdlU291cmNlLmZyb21SZXNvdXJjZSgncGFzYWplcm8nKTtcbiAgICAgICAgICAgIG1hcmtlci5zbmlwcGV0ID0gJ0RlYmVzIGVzcGVyYXIgYSBsYSB2YW4gZW4gZXN0ZSBwdW50byc7XG4gICAgICAgIH0gXG5cbiAgICAgICAgXG4gICAgICAgIG1hcmtlci5wb3NpdGlvbiA9IFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhsYXQsIGxvbik7XG4gICAgICAgIG1hcmtlci5pY29uPWltYWdlO1xuICAgICAgICBcbiAgICAgICAgbWFya2VyLnVzZXJEYXRhID0ge2luZGV4OiAxLGlkOiBpZH07XG4gICAgICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIobWFya2VyKTsgXG4gICAgfVxuXG4gICAgZGlidWphclJ1dGEobGF0LGxvbixsYXQyLGxvbjIscGFyYWRhcykge1xuICAgICAgICBsb2FkZXIuc2hvdygpO1xuICAgICAgICB0aGlzLm15U2VydmljZS5nZXREYXRhKGxhdCxsb24sbGF0Mixsb24yLHBhcmFkYXMpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YVN1Y2Nlc3MocmVzdWx0KTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIGNoZWNrSW4oKXtcbiAgICAgICAgbGV0IG1vZGVsID0gdGhpcztcbiAgICAgICAgZGlhbG9ncy5jb25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkNoZWNrLUluIFZpYWplXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIsK/RGVzZWFzIGhhY2VyIENoZWNrLWluIGVuIGVzdGUgdmlhamU/XCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiQ2hlY2stSW5cIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsYXJcIixcbiAgICAgICAgICAgIC8vbmV1dHJhbEJ1dHRvblRleHQ6IFwiTmV1dHJhbCB0ZXh0XCIsXG4gICAgICAgICAgICAvL2RlZmF1bHRUZXh0OiBcIkRlZmF1bHQgdGV4dFwiLFxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICBpZihyKXtcbiAgICAgICAgICAgICAgICBpZihtb2RlbC50b2tlbnNDdW5kdWN0b3IubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBub21icmVzID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ25vbWJyZVVzdWFyaW8nKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkUGFzYWplcm8gPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnaWRVc3VhcmlvJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgbW9kZWwubXlTZXJ2aWNlLnJlZ2lzdHJhclBhc2FqZXJvKG1vZGVsLmlkdmlhamUsaWRQYXNhamVybywnMScsJzAnLCcwJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGUgcmVnaXN0cm8gZGUgcGFzYWplcm8nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLm15U2VydmljZS5lbnZpYXJQdXNoQ2hlY2tpbihlbmNvZGVVUkkobm9tYnJlcysnIHNlIGhhIHN1YmlkbyBhIGxhIHZhbicpLG1vZGVsLnRva2Vuc0N1bmR1Y3Rvcixtb2RlbC5pZHZpYWplLG1vZGVsLmlkcnV0YSxpZFBhc2FqZXJvLG5vbWJyZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdDIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXN1bHRhZG8gZGVsIHB1c2gnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzdWx0Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJMaXN0b1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiQ2hlY2stSW4gcmVhbGl6YWRvIGV4aXRvc2FtZW50ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPa1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmNoZWNraW49ZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJDaGVjay1JbiBmYWxsaWRvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJFbCBjaGVjay1pbiBubyBwdWRvIHNlciByZWFsaXphZG8uIEludGVudGEgZGUgbnVldm8gcG9yIGZhdm9yLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPa1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkVycm9yIGNvbmR1Y3RvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJUdSBtZW5zYWplIG5vIHB1ZG8gc2VyIGVudHJlZ2Fkby4gRWwgY29uZHVjdG9yIG5vIHRpZW5lIGRpc3Bvc2l0aXZvcyBhc2lnbmFkb3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPa1wiXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uR2V0RGF0YVN1Y2Nlc3MocmVzKSB7XG4gICAgICAgIHRoaXMuZW5jb2RlZFBvaW50cyA9IHBsLmRlY29kZShyZXMucm91dGVzWzBdLm92ZXJ2aWV3X3BvbHlsaW5lLnBvaW50cyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdBUVVJIFZBTiBMT1MgUFVOVE9TJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZW5jb2RlZFBvaW50cyk7IFxuICAgICAgICBjb25zdCBtYXAgPSB0aGlzLm1hcFZpZXc7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gdGhpcztcblxuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuZW5jb2RlZFBvaW50cztcblxuICAgICAgICBsZXQgbGluZSA9IG5ldyBQb2x5bGluZSgpO1xuICAgICAgICBsaW5lLnZpc2libGUgPSB0cnVlO1xuICAgICAgICBsaW5lLndpZHRoID0gNDtcbiAgICAgICAgbGluZS5jb2xvciA9IG5ldyBDb2xvcignIzE1M2Q3YScpO1xuICAgICAgICBsaW5lLmdlb2Rlc2ljID0gdHJ1ZTtcbiAgICAgICAgbGluZS5jbGlja2FibGU9dHJ1ZTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxpbmUuYWRkUG9pbnQoUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKGxpc3RbaV1bMF0sbGlzdFtpXVsxXSkpO1xuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIG1hcC5hZGRQb2x5bGluZShsaW5lKTtcblxuICAgICAgICBsb2FkZXIuaGlkZSgpO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkdldERhdGFFcnJvcihlcnJvcjogUmVzcG9uc2UgfCBhbnkpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJvbkdldERhdGFFcnJvcjogXCIgKyBKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgIH1cbn1cbiJdfQ==