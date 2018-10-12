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
            image.imageSource = imageSource.fromResource('van');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlhamUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmlhamUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBFQUEwRTtBQUMxRSw2RUFBeUY7QUFDekYsc0RBQTZEO0FBQzdELDBEQUE0RDtBQUM1RCxpRkFBZ0U7QUFDaEUsNENBQTJDO0FBQzNDLDBDQUFpRDtBQUNqRCwyREFBNkQ7QUFDN0QsdURBQXlEO0FBQ3pELCtCQUE0QjtBQUM1QixvQ0FBc0M7QUFDdEMsc0RBQXdEO0FBQ3hELGtDQUFvQztBQUNwQyxvQ0FBc0M7QUFFdEMsZ0NBQStCO0FBQy9COzs7Ozs4REFLOEQ7QUFDOUQsb0ZBQW9GO0FBQ3BGLElBQUksTUFBTSxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztBQWVwQztJQTJXSSx3QkFBb0IsZ0JBQWtDLEVBQVUsU0FBcUIsRUFBUyxLQUFxQixFQUFTLElBQVU7UUFBdEksaUJBY0M7UUFkbUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVk7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFTLFNBQUksR0FBSixJQUFJLENBQU07UUF6V3RJLDJEQUEyRDtRQUMzRCxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBS2IsZUFBVSxHQUFRLGFBQWEsQ0FBQztRQUNoQyxzQkFBaUIsR0FBUSx1QkFBdUIsQ0FBQztRQUNqRCxlQUFVLEdBQVEsWUFBWSxDQUFDO1FBQy9CLGNBQVMsR0FBUSxPQUFPLENBQUM7UUFDekIsc0JBQWlCLEdBQVEsR0FBRyxDQUFDO1FBQzdCLG9CQUFlLEdBQVEsa0JBQWtCLENBQUM7UUFHMUMsYUFBUSxHQUFDLFFBQVEsQ0FBQyxDQUFDLDhCQUE4QjtRQUNqRCxjQUFTLEdBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTO1FBTy9CLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDVixZQUFPLEdBQUcsQ0FB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QyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLHVDQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEUsQ0FBQztRQUdELEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEIsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRWxCLENBQUM7SUFFTyx1Q0FBYyxHQUF0QixVQUF1QixLQUFxQjtRQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBcjVCUSxjQUFjO1FBTDFCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsT0FBTztZQUNqQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtTQUN4QyxDQUFDO3lDQTRXd0MseUJBQWdCLEVBQXFCLHVCQUFVLEVBQWdCLHVCQUFjLEVBQWUsV0FBSTtPQTNXN0gsY0FBYyxDQXM1QjFCO0lBQUQscUJBQUM7Q0FBQSxBQXQ1QkQsSUFzNUJDO0FBdDVCWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbi8vaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeSc7XG5pbXBvcnQgeyBNYXBWaWV3LCBNYXJrZXIsIFBvc2l0aW9uLCBQb2x5bGluZSwgU3R5bGV9IGZyb20gJ25hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGsnO1xuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IHtMb2FkaW5nSW5kaWNhdG9yfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7XG5pbXBvcnQgeyBXZWJTZXJ2aWNlIH0gZnJvbSBcIi4uL3dzLnNlcnZpY2VcIjtcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0ICogYXMgaW1hZ2VTb3VyY2UgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2Utc291cmNlXCI7XG5pbXBvcnQgKiBhcyBJbWFnZU1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9pbWFnZVwiO1xuaW1wb3J0IHtDb2xvcn0gZnJvbSAnY29sb3InO1xuaW1wb3J0ICogYXMgcGwgZnJvbSAnZ29vZ2xlLXBvbHlsaW5lJztcbmltcG9ydCAqIGFzIGdlb2xvY2F0aW9uIGZyb20gXCJuYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb25cIjtcbmltcG9ydCB7IEFjY3VyYWN5IH0gZnJvbSBcInVpL2VudW1zXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgKiBhcyBvYnNlcnZhYmxlQXJyYXkgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjsgXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBCZWZvcmUgeW91IGNhbiBuYXZpZ2F0ZSB0byB0aGlzIHBhZ2UgZnJvbSB5b3VyIGFwcCwgeW91IG5lZWQgdG8gcmVmZXJlbmNlIHRoaXMgcGFnZSdzIG1vZHVsZSBpbiB0aGVcbiogZ2xvYmFsIGFwcCByb3V0ZXIgbW9kdWxlLiBBZGQgdGhlIGZvbGxvd2luZyBvYmplY3QgdG8gdGhlIGdsb2JhbCBhcnJheSBvZiByb3V0ZXM6XG4qIHsgcGF0aDogXCJ2aWFqZVwiLCBsb2FkQ2hpbGRyZW46IFwiLi92aWFqZS92aWFqZS5tb2R1bGUjVmlhamVNb2R1bGVcIiB9XG4qIE5vdGUgdGhhdCB0aGlzIHNpbXBseSBwb2ludHMgdGhlIHBhdGggdG8gdGhlIHBhZ2UgbW9kdWxlIGZpbGUuIElmIHlvdSBtb3ZlIHRoZSBwYWdlLCB5b3UgbmVlZCB0byB1cGRhdGUgdGhlIHJvdXRlIHRvby5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vL3JlZ2lzdGVyRWxlbWVudChcIk1hcFZpZXdcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGtcIikuTWFwVmlldyk7XG5sZXQgbG9hZGVyID0gbmV3IExvYWRpbmdJbmRpY2F0b3IoKTtcbi8qY2xhc3MgVmVoaWN1bG8ge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBsYXRpdHVkOiBudW1iZXIsIHB1YmxpYyBsb25naXR1ZDogbnVtYmVyLCBwdWJsaWMgcGxhY2FfdjpzdHJpbmcpIHsgfSAgIFxufSovXG5pbnRlcmZhY2UgVmVoaWN1bG8ge1xuICAgIGxhdGl0dWQ6IG51bWJlcixcbiAgICBsb25naXR1ZDogbnVtYmVyLFxuICAgIHBsYWNhOiBzdHJpbmdcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiVmlhamVcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdmlhamUuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBWaWFqZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHVibGljIGVuY29kZWRQb2ludHM6YW55O1xuICAgIC8vcHVibGljIHBhcmFkYXMgPSBuZXcgb2JzZXJ2YWJsZUFycmF5Lk9ic2VydmFibGVBcnJheShbXSk7XG4gICAgcGFyYWRhcyA9IFtdO1xuICAgIGlkcnV0YTogbnVtYmVyO1xuICAgIGlkdmlhamU6IG51bWJlcjtcbiAgICBpZGNvbmR1Y3RvcjogbnVtYmVyO1xuICAgIHBsYWNhOnN0cmluZztcbiAgICBub21icmVSdXRhOnN0cmluZz1cIk5vbWJyZSBydXRhXCI7XG4gICAgZGlyZWNjaW9uUmVjb2dpZGE6c3RyaW5nPVwiRGlyZWNjacOzbiBkZSByZWNvZ2lkYVwiO1xuICAgIGZlY2hhVmlhamU6c3RyaW5nPVwiMDAtMDAtMDAwMFwiO1xuICAgIGhvcmFWaWFqZTpzdHJpbmc9XCIwMDowMFwiO1xuICAgIGNhbnRpZGFkUGFzYWplcm9zOnN0cmluZz0nMCc7XG4gICAgbm9tYnJlQ29uZHVjdG9yOnN0cmluZz0nTm9tYnJlIENvbmR1Y3Rvcic7XG5cblxuICAgIGxhdGl0dWRlPTQuNTg3Nzk5OyAvL0NvbG9tYmlhNC41ODc3OTksIC03My45NDA5NjBcbiAgICBsb25naXR1ZGU9LTczLjk0MDk2MDsgLy9DbG9tYmlhXG5cbiAgICBsYXRJbmljaWFsOm51bWJlcjtcbiAgICBsb25JbmljaWFsOm51bWJlcjtcbiAgICBsYXRGaW5hbDpudW1iZXI7XG4gICAgbG9uRmluYWw6bnVtYmVyO1xuXG4gICAgem9vbSA9IDE1O1xuICAgIG1pblpvb20gPSAwOyBcbiAgICBtYXhab29tID0gMjI7XG4gICAgYmVhcmluZyA9IDA7XG4gICAgdGlsdCA9IDA7XG4gICAgcGFkZGluZyA9IFs0MCwgNDAsIDQwLCA0MF07XG4gICAgbWFwVmlldzogTWFwVmlldztcbiAgICBsYXN0Q2FtZXJhOiBTdHJpbmc7XG4gICAgdmVoaWN1bG86YW55O1xuICAgIHZhbjpNYXJrZXI7XG4gICAgdGltZW91dDphbnk7XG4gICAgcmVjb3JyaWRvOmJvb2xlYW49ZmFsc2U7XG4gICAgLy9wdWJsaWMgbWVuc2FqZXMgPSBuZXcgb2JzZXJ2YWJsZUFycmF5Lk9ic2VydmFibGVBcnJheShbXSk7XG4gICAgcHVibGljIG1lbnNhamVzPVtdOyBcbiAgICB0b2tlbnNDdW5kdWN0b3I9W107XG4gICAgcHVudG9SZWNvZ2lkYTphbnk7XG4gICAgY2hlY2tpbjpib29sZWFuPWZhbHNlO1xuICAgIG1vc3RyYXJWYW46Ym9vbGVhbj1mYWxzZTtcbiAgICBlc3RhZG9WaWFqZTpzdHJpbmc7XG5cbiAgICBzdHlsZXM9W1xuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuZmlsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjN2M5M2EzXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogXCItMTBcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZS5jb3VudHJ5XCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmUuY291bnRyeVwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuc3Ryb2tlXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNhMGE0YTVcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZS5wcm92aW5jZVwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuc3Ryb2tlXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM2MjgzOGVcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGVcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IFwiLTI5XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNkZGUzZTNcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGUubWFuX21hZGVcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZS5tYW5fbWFkZVwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGUubWFuX21hZGVcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjM2Y0YTUxXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ3ZWlnaHRcIjogXCIwLjMwXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiBcIjc0XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLmF0dHJhY3Rpb25cIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLmJ1c2luZXNzXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5nb3Zlcm5tZW50XCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kubWVkaWNhbFwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kucGFya1wiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kucGxhY2Vfb2Zfd29yc2hpcFwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kuc2Nob29sXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kuc3BvcnRzX2NvbXBsZXhcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwic2F0dXJhdGlvblwiOiBcIi0xMDBcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNiYmNhY2ZcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IFwiMFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjYmJjYWNmXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ3ZWlnaHRcIjogXCIwLjUwXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHNcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHRcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheS5jb250cm9sbGVkX2FjY2Vzc1wiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5LmNvbnRyb2xsZWRfYWNjZXNzXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2E5YjRiOFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuYXJ0ZXJpYWxcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy5pY29uXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJpbnZlcnRfbGlnaHRuZXNzXCI6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJzYXR1cmF0aW9uXCI6IFwiLTdcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiBcIjNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImdhbW1hXCI6IFwiMS44MFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwid2VpZ2h0XCI6IFwiMC4wMVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQubG9jYWxcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdFwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdC5zdGF0aW9uLmJ1c1wiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjYTNjN2RmXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH1cbl07XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSBteVNlcnZpY2U6IFdlYlNlcnZpY2UscHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUscHJpdmF0ZSBwYWdlOiBQYWdlKSB7XG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogVXNlIHRoZSBjb25zdHJ1Y3RvciB0byBpbmplY3QgYXBwIHNlcnZpY2VzIHRoYXQgeW91IG5lZWQgaW4gdGhpcyBjb21wb25lbnQuXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgICAgIHRoaXMucm91dGUucGFyYW1zXG4gICAgICAgICAgLmZvckVhY2goKHBhcmFtcykgPT4geyBcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1BhcmFtZXRyb3MgZGUgdXJsJyk7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHBhcmFtcykpO1xuICAgICAgICAgICAgICB0aGlzLmlkcnV0YSA9ICtwYXJhbXNbXCJpZHJ1dGFcIl07IFxuICAgICAgICAgICAgICB0aGlzLmlkdmlhamUgPSArcGFyYW1zW1wiaWR2aWFqZVwiXTsgXG4gICAgICAgICAgICAgIHRoaXMuaWRjb25kdWN0b3IgPSArcGFyYW1zW1wiaWRjb25kdWN0b3JcIl07IFxuICAgICAgICAgICAgICB0aGlzLnBsYWNhID0gcGFyYW1zW1wicGxhY2FcIl07IFxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmlkcnV0YSsnIC0gJyt0aGlzLmlkdmlhamUrJyAtICcrdGhpcy5wbGFjYSk7XG4gICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogVXNlIHRoZSBcIm5nT25Jbml0XCIgaGFuZGxlciB0byBpbml0aWFsaXplIGRhdGEgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgICAgICBjb25zdCBpZENvbmR1Y3RvciA9IHRoaXMuaWRjb25kdWN0b3I7XG4gICAgICAgIGxldCBtb2RlbCA9IHRoaXM7XG5cbiAgICAgICAgLypjb25zb2xlLmxvZygnVG9rZW4gUFVTSDogJytBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygndG9rZW5QdXNoJykpO1xuICAgICAgICB0aGlzLnRva2Vuc0N1bmR1Y3Rvci5wdXNoKEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCd0b2tlblB1c2gnKSk7XG4gICAgICAgIHRoaXMudG9rZW5zQ3VuZHVjdG9yLnB1c2goJ2NodXBlbG9mdWVydGUnKTtcbiAgICAgICAgKi9cbiAgICAgICAgbW9kZWwucGFnZS5vbignbmF2aWdhdGluZ1RvJywgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFbnRyYW5kbyBhIGxhIHZpc3RhJyk7XG4gICAgICAgICAgICAvLyBydW4gaW5pdCBjb2RlXG4gICAgICAgICAgICAvLyAobm90ZTogdGhpcyB3aWxsIHJ1biB3aGVuIHlvdSBlaXRoZXIgbW92ZSBmb3J3YXJkIG9yIGJhY2sgdG8gdGhpcyBwYWdlKVxuICAgICAgICB9KTtcblxuICAgICAgICBtb2RlbC5wYWdlLm9uKCduYXZpZ2F0aW5nRnJvbScsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU2FsaWVuZG8gZGUgbGEgdmlzdGEnKTtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwobW9kZWwudGltZW91dCk7IFxuICAgICAgICAgICAgLy8gcnVuIGRlc3Ryb3kgY29kZVxuICAgICAgICAgICAgLy8gKG5vdGU6IHRoaXMgd2lsbCBydW4gd2hlbiB5b3UgZWl0aGVyIG1vdmUgZm9yd2FyZCB0byBhIG5ldyBwYWdlIG9yIGJhY2sgdG8gdGhlIHByZXZpb3VzIHBhZ2UpXG4gICAgICAgIH0pOyBcbiAgICAgICAgbW9kZWwubXlTZXJ2aWNlLmdldE1lbnNhamVzKClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXN1bHRhZG8gZGUgbWVuc2FqZXMnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPE9iamVjdC5rZXlzKHJlc3VsdCkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1BpbnRhbmRvIGE6Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdFtpXSk7IC8vIFwic3BlY2llc1wiXG5cbiAgICAgICAgICAgICAgICAgICAgbW9kZWwubWVuc2FqZXMucHVzaChyZXN1bHRbaV0udGV4dG8pOyAgXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1vZGVsLm1lbnNhamVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBtb2RlbC5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTsgXG5cbiAgICAgICAgXG4gICAgICAgIG1vZGVsLm15U2VydmljZS5nZXRUb2tlbnNDb25kdWN0b3IoaWRDb25kdWN0b3IpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzdWx0YWRvIGRlIHRva2VucyBjb25kdWN0b3I6ICcraWRDb25kdWN0b3IpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXMocmVzdWx0KS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUGludGFuZG8gYTonKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0W2ldKTsgLy8gXCJzcGVjaWVzXCJcblxuICAgICAgICAgICAgICAgICAgICBtb2RlbC50b2tlbnNDdW5kdWN0b3IucHVzaChyZXN1bHRbaV0udG9rZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIG1vZGVsLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICB9XG4gICAgY2FuY2VsYXIoKXtcbiAgICAgICAgZGlhbG9ncy5jb25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkNhbmNlbGFyIHJlc2VydmFcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiwr9SZWFsbWVudGUgZGVzZWFzIGNhbmNlbGFyIGVzdGEgcmVzZXJ2YT9cIixcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJTaSwgY2FuY2VsYXJsYVwiLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJOb1wiXG4gICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIC8vIHJlc3VsdCBhcmd1bWVudCBpcyBib29sZWFuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyByZXN1bHQ6IFwiICsgcmVzdWx0KTtcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlJlc2VydmEgY2FuY2VsYWRhXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJUdSByZXNlcnZhIGhhIHNpZG8gY2FuY2VsYWRhIGV4aXRvc2FtZW50ZVwiLFxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPa1wiXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcmVzZXJ2YXNcIl0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB1YmljYXIoKXtcbiAgICAgICAgbGV0IG1vZGVsID0gdGhpcztcbiAgICAgICAgZ2VvbG9jYXRpb24uaXNFbmFibGVkKCkudGhlbihmdW5jdGlvbiAoaXNFbmFibGVkKSB7XG4gICAgICAgICAgICBpZiAoaXNFbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxvY2F0aW9uID0gZ2VvbG9jYXRpb24uZ2V0Q3VycmVudExvY2F0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgZGVzaXJlZEFjY3VyYWN5OiBBY2N1cmFjeS5oaWdoLFxuICAgICAgICAgICAgICAgICAgICBtYXhpbXVtQWdlOiA1MDAwLFxuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0OiAxMDAwMFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChsb2MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5sYXRpdHVkZSA9IGxvYy5sYXRpdHVkZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5sb25naXR1ZGUgPSBsb2MubG9uZ2l0dWRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbW9kZWwuc2V0TWFyY2Fkb3IobG9jLmxhdGl0dWRlLGxvYy5sb25naXR1ZGUsJ3Bhc2FqZXJvJywyLG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyAoZS5tZXNzYWdlIHx8IGUpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBnZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIChlLm1lc3NhZ2UgfHwgZSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyAoZS5tZXNzYWdlIHx8IGUpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlyQXRyYXMoKSB7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG4gICAgfVxuICAgIGNvbnRhY3Rhcigpe1xuICAgICAgICBsZXQgbW9kZWwgPSB0aGlzO1xuICAgICAgICBkaWFsb2dzLnByb21wdCh7XG4gICAgICAgICAgICB0aXRsZTogXCJDb250YWN0YXJcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiRW52w61hIHVuIG1lbnNhamUgYWwgY29uZHVjdG9yXCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiRW52aWFyXCIsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbGFyXCIsXG4gICAgICAgICAgICAvL25ldXRyYWxCdXR0b25UZXh0OiBcIk5ldXRyYWwgdGV4dFwiLFxuICAgICAgICAgICAgLy9kZWZhdWx0VGV4dDogXCJEZWZhdWx0IHRleHRcIixcbiAgICAgICAgICAgIGlucHV0VHlwZTogZGlhbG9ncy5pbnB1dFR5cGUudGV4dFxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyByZXN1bHQ6IFwiICsgci5yZXN1bHQgKyBcIiwgdGV4dDogXCIgKyByLnRleHQpO1xuICAgICAgICAgICAgaWYoci5yZXN1bHQpe1xuICAgICAgICAgICAgICAgIGlmKG1vZGVsLnRva2Vuc0N1bmR1Y3Rvci5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwubXlTZXJ2aWNlLmVudmlhclB1c2gobW9kZWwudG9rZW5zQ3VuZHVjdG9yLGVuY29kZVVSSShyLnRleHQpKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzdWx0YWRvIGRlbCBwdXNoJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3VsdDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTWVuc2FqZSBlbnZpYWRvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJUdSBtZW5zYWplIGZ1ZSBlbnZpYWRvIGV4aXRvc2FtZW50ZSBhbCBjb25kdWN0b3IuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJNZW5zYWplIGZhbGxpZG9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlR1IG1lbnNhamUgbm8gcHVkbyBzZXIgZW50cmVnYWRvLiBJbnRlbnRhIGRlIG51ZXZvIHBvciBmYXZvci5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvciBjb25kdWN0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVHUgbWVuc2FqZSBubyBwdWRvIHNlciBlbnRyZWdhZG8uIEVsIGNvbmR1Y3RvciBubyB0aWVuZSBkaXNwb3NpdGl2b3MgYXNpZ25hZG9zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICAgICAgLypkaWFsb2dzLmFjdGlvbih7XG4gICAgICAgICAgICBtZXNzYWdlOiBcIkVudsOtYSB1biBtZW5zYWplIGFsIGNvbmR1Y3RvclwiLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxhclwiLFxuICAgICAgICAgICAgYWN0aW9uczogdGhpcy5tZW5zYWplc1xuICAgICAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyByZXN1bHQ6IFwiICsgcmVzdWx0KTtcbiAgICAgICAgICAgIGlmKHJlc3VsdCAhPSAnQ2FuY2VsYXInKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnRva2Vuc0N1bmR1Y3Rvci5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5teVNlcnZpY2UuZW52aWFyUHVzaCh0aGlzLnRva2Vuc0N1bmR1Y3RvcixlbmNvZGVVUkkocmVzdWx0KSlcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0MikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3VsdGFkbyBkZWwgcHVzaCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyZXN1bHQyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk1lbnNhamUgZW52aWFkb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVHUgbWVuc2FqZSBmdWUgZW52aWFkbyBleGl0b3NhbWVudGUgYWwgY29uZHVjdG9yLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPa1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTWVuc2FqZSBmYWxsaWRvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJUdSBtZW5zYWplIG5vIHB1ZG8gc2VyIGVudHJlZ2Fkby4gSW50ZW50YSBkZSBudWV2byBwb3IgZmF2b3IuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRXJyb3IgY29uZHVjdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlR1IG1lbnNhamUgbm8gcHVkbyBzZXIgZW50cmVnYWRvLiBFbCBjb25kdWN0b3Igbm8gdGllbmUgZGlzcG9zaXRpdm9zIGFzaWduYWRvc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9rXCJcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfSk7Ki9cbiAgICB9XG4gICAgb25NYXBSZWFkeShldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnTWFwIFJlYWR5Jyk7XG5cbiAgICAgICAgdGhpcy5tYXBWaWV3ID0gZXZlbnQub2JqZWN0O1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2V0dGluZyBhIG1hcmtlci4uLlwiKTtcblxuICAgICAgICBsb2FkZXIuc2hvdygpO1xuICAgICAgICBsZXQgbW9kZWwgPSB0aGlzO1xuICAgICAgICBtb2RlbC5tYXBWaWV3LnNldFN0eWxlKDxTdHlsZT4odGhpcy5zdHlsZXMpKTtcbiAgICAgICAgbGV0IGlkUGFzYWplcm8gPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnaWRVc3VhcmlvJyk7XG4gICAgICAgIG1vZGVsLm15U2VydmljZS5nZXREYXRvc1ZpYWplKG1vZGVsLmlkdmlhamUsaWRQYXNhamVybylcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdDphbnkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzdWx0YWRvIGRlbCB2aWFqZTogJyttb2RlbC5pZHZpYWplKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIGlmKHJlc3VsdFswXS5lc3RhZG8gPT0gXCJFTiBQVU5UTyBERSBJTklDSU9cIiB8fCByZXN1bHRbMF0uZXN0YWRvID09IFwiRU4gU0VSVklDSU9cIil7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5tb3N0cmFyVmFuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYocmVzdWx0WzBdLm5vbWJyZXJ1dGEpe1xuICAgICAgICAgICAgICAgICAgICBtb2RlbC5ub21icmVSdXRhPXJlc3VsdFswXS5ub21icmVydXRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihyZXN1bHRbMF0uZGlyZWNjaW9ucmVjb2dpZGEpe1xuICAgICAgICAgICAgICAgICAgICBtb2RlbC5kaXJlY2Npb25SZWNvZ2lkYT1yZXN1bHRbMF0uZGlyZWNjaW9ucmVjb2dpZGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHJlc3VsdFswXS5mZWNoYXZpYWplKXtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuZmVjaGFWaWFqZT1yZXN1bHRbMF0uZmVjaGF2aWFqZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYocmVzdWx0WzBdLmhvcmF2aWFqZSl7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmhvcmFWaWFqZT1yZXN1bHRbMF0uaG9yYXZpYWplO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihyZXN1bHRbMF0ubm9tYnJlY29uZHVjdG9yKXtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwubm9tYnJlQ29uZHVjdG9yPXJlc3VsdFswXS5ub21icmVjb25kdWN0b3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHJlc3VsdFswXS5jYW50aWRhZHBhc2FqZXJvcyl7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmNhbnRpZGFkUGFzYWplcm9zPXJlc3VsdFswXS5jYW50aWRhZHBhc2FqZXJvcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbW9kZWwuZXN0YWRvVmlhamUgPSByZXN1bHRbMF0uZXN0YWRvO1xuICAgICAgICAgICAgICAgIG1vZGVsLm15U2VydmljZS5nZXRQZXJzb25hcyhtb2RlbC5pZHZpYWplKS5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZSBsb3MgcGFzYWplcm9zIGRlbCB2aWFqZTogJytPYmplY3Qua2V5cyhyZXMpLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzKSk7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXMocmVzKS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRGV0YWxsZSBkZSBwdW50bycpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXNbaV0pKTtcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzW2ldLmlkcGFzYWplcm8gPT09IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdpZFVzdWFyaW8nKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRGV0YWxsZXMgZGVsIHBhc2FqZXJvJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwubGF0aXR1ZGUgPSByZXNbaV0ubGF0aXR1ZCoxO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwubG9uZ2l0dWRlID0gcmVzW2ldLmxvbmdpdHVkKjE7ICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuc2V0TWFyY2Fkb3IocmVzW2ldLmxhdGl0dWQqMSxyZXNbaV0ubG9uZ2l0dWQqMSwncGFzYWplcm8nLHJlc1tpXS5ub21icmVwYXNhamVybyxyZXNbaV0uZGlyZWNjaW9uKTsgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc1tpXS5lc3RhZG9wdj09JzAnICYmIChtb2RlbC5lc3RhZG9WaWFqZT09J0VOIFNFUlZJQ0lPJyB8fCBtb2RlbC5lc3RhZG9WaWFqZT09J0VOIFBVTlRPIERFIElOSUNJTycpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5jaGVja2luPXRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvL21vZGVsLnBhcmFkYXMucHVzaChbUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKHJlc1tpXS5sYXRpdHVkLHJlc1tpXS5sb25naXR1ZCkscmVzW2ldLm5vbWJyZXBhc2FqZXJvXSk7IFxuICAgICAgICAgICAgICAgICAgICAvKmlmKHJlc1tpXS5lc3RhZG9wdiA9PSBcIjBcIil7IC8vU0kgZWwgcGFzYWplcm8gbm8gc2UgaGEgc3ViaWRvXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5zZXRNYXJjYWRvcihyZXNbaV0ubGF0aXR1ZCoxLHJlc1tpXS5sb25naXR1ZCoxLCdwYXNhamVybycscmVzW2ldLm5vbWJyZXBhc2FqZXJvLHJlc1tpXS5kaXJlY2Npb24pOyAgICBcbiAgICAgICAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIHRyYXllbmRvIGxvcyBwYXJhZGVyb3MgZGVsIHZpYWplJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBtb2RlbC5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTsgXG5cblxuICAgICAgICBcblxuICAgICAgICB0aGlzLm15U2VydmljZS5nZXRQdW50b3NSdXRhKHRoaXMuaWRydXRhKS5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlIGxhIHJ1dGE6ICcrbW9kZWwuaWRydXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlcykpO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXMocmVzKS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEZXRhbGxlIGRlIHB1bnRvJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzW2ldKSk7XG4gICAgICAgICAgICAgICAgaWYocmVzW2ldLnRpcG8gPT0gJ0lOSUNJTycpe1xuXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmxhdEluaWNpYWwgPSByZXNbaV0ubGF0aXR1ZDtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwubG9uSW5pY2lhbCA9IHJlc1tpXS5sb25naXR1ZDtcblxuICAgICAgICAgICAgICAgICAgICAvL21vZGVsLmxhdGl0dWRlID0gcmVzW2ldLmxhdGl0dWQqMTtcbiAgICAgICAgICAgICAgICAgICAgLy9tb2RlbC5sb25naXR1ZGUgPSByZXNbaV0ubG9uZ2l0dWQqMTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnTEFUOiAnK21vZGVsLmxhdGl0dWRlKycgLSBMT046ICcrbW9kZWwubG9uZ2l0dWRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYocmVzW2ldLnRpcG8gPT0gJ0ZJTicpe1xuICAgICAgICAgICAgICAgICAgICBtb2RlbC5sYXRGaW5hbCA9IHJlc1tpXS5sYXRpdHVkO1xuICAgICAgICAgICAgICAgICAgICBtb2RlbC5sb25GaW5hbCA9IHJlc1tpXS5sb25naXR1ZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYocmVzW2ldLnRpcG8gPT0gJ05PUk1BTCcpe1xuICAgICAgICAgICAgICAgICAgICBtb2RlbC5wYXJhZGFzLnB1c2goW1Bvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhyZXNbaV0ubGF0aXR1ZCxyZXNbaV0ubG9uZ2l0dWQpLHJlc1tpXS5pZHBhcmFkYV0pOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQdW50byBpbmljaWFsOiBMQVQ6Jyttb2RlbC5sYXRJbmljaWFsKycgLSBMT046Jyttb2RlbC5sb25JbmljaWFsKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQdW50byBmaW5hbDogTEFUOicrbW9kZWwubGF0RmluYWwrJyAtIExPTjonK21vZGVsLmxvbkZpbmFsKTtcbiAgICAgICAgICAgIG1vZGVsLnNldE1hcmNhZG9yKG1vZGVsLmxhdEluaWNpYWwsbW9kZWwubG9uSW5pY2lhbCwnaW5pY2lvJywwLG51bGwpO1xuICAgICAgICAgICAgbW9kZWwuc2V0TWFyY2Fkb3IobW9kZWwubGF0RmluYWwsbW9kZWwubG9uRmluYWwsJ2ZpbicsMCxudWxsKTtcbiAgICAgICAgICAgIC8vbW9kZWwuc2V0TWFyY2Fkb3IobW9kZWwudmVoaWN1bG8ubGF0aXR1ZCxtb2RlbC52ZWhpY3Vsby5sYXRpdHVkLCdjb25kdWN0b3InLDApO1xuICAgICAgICAgICAgbW9kZWwudWJpY2FyVmVoaWN1bG8oKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQQVJBREFTIE5PUk1BTEVTJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShtb2RlbC5wYXJhZGFzKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgXG4gICAgICAgICAgICBpZighbW9kZWwucmVjb3JyaWRvKXsgXG4gICAgICAgICAgICAgICAgbW9kZWwuZGlidWphclJ1dGEobW9kZWwubGF0SW5pY2lhbCxtb2RlbC5sb25JbmljaWFsLG1vZGVsLmxhdEZpbmFsLG1vZGVsLmxvbkZpbmFsLG1vZGVsLnBhcmFkYXMpOyAgXG4gICAgICAgICAgICAgICAgbW9kZWwucmVjb3JyaWRvPXRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgICAgICBcblxuXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgIHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICB9KTsgXG5cblxuXG4gICAgfVxuICAgIG9uQ29vcmRpbmF0ZVRhcHBlZChhcmdzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29vcmRpbmF0ZSBUYXBwZWQsIExhdDogXCIgKyBhcmdzLnBvc2l0aW9uLmxhdGl0dWRlICsgXCIsIExvbjogXCIgKyBhcmdzLnBvc2l0aW9uLmxvbmdpdHVkZSwgYXJncyk7XG4gICAgfVxuXG4gICAgb25NYXJrZXJFdmVudChhcmdzKSB7XG4gICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgdGl0bGU6IFwiUHVudG8gZGUgcmVjb2dpZGFcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiRXN0ZSBlcyBlbCBwdW50byBkZSByZWNvZ2lkYSBkZSB0dSB2aWFqZS4gwqFEZWJlcyBlc3RhciBhdGVudG8hXCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgIH0pO1xuICAgIH0gXG5cbiAgICBvbkNhbWVyYUNoYW5nZWQoYXJncykge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNhbWVyYSBjaGFuZ2VkOiBcIiArIEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKSwgSlNPTi5zdHJpbmdpZnkoYXJncy5jYW1lcmEpID09PSB0aGlzLmxhc3RDYW1lcmEpO1xuICAgICAgICB0aGlzLmxhc3RDYW1lcmEgPSBKU09OLnN0cmluZ2lmeShhcmdzLmNhbWVyYSk7XG4gICAgfSBcbiAgICB1YmljYXJWZWhpY3Vsbygpe1xuICAgICAgICBsZXQgbW9kZWwgPSB0aGlzO1xuXG4gICAgICAgIC8vQnVzY2FyIFZBTiBsYSBwcmltZXIgXG4gICAgICAgIG1vZGVsLm15U2VydmljZS5nZXRVYmljYWNpb25WZWhpY3Vsbyh0aGlzLnBsYWNhKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgLy90aGlzLnViaWNhclZlaGljdWxvKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgbW9kZWwudmVoaWN1bG8gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1ZFSElDVUxPJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobW9kZWwudmVoaWN1bG8pO1xuICAgICAgICAgICAgICAgIGlmKG1vZGVsLmVzdGFkb1ZpYWplPT0nRU4gUFVOVE8gREUgSU5JQ0lPJyB8fCBtb2RlbC5lc3RhZG9WaWFqZT09J0VOIFNFUlZJQ0lPJyl7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLnNldE1hcmNhZG9yVmFuKG1vZGVsLnZlaGljdWxvLmxhdGl0dWQsbW9kZWwudmVoaWN1bG8ubG9uZ2l0dWQsJ2NvbmR1Y3RvcicsMCk7ICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgXG5cbiAgICAgICAgbW9kZWwudGltZW91dCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIG1vZGVsLm15U2VydmljZS5nZXRVYmljYWNpb25WZWhpY3Vsbyh0aGlzLnBsYWNhKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgLy90aGlzLnViaWNhclZlaGljdWxvKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgbW9kZWwudmVoaWN1bG8gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1ZFSElDVUxPJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobW9kZWwudmVoaWN1bG8pO1xuICAgICAgICAgICAgICAgIGlmKG1vZGVsLmVzdGFkb1ZpYWplPT0nRU4gUFVOVE8gREUgSU5JQ0lPJyB8fCBtb2RlbC5lc3RhZG9WaWFqZT09J0VOIFNFUlZJQ0lPJyl7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLnNldE1hcmNhZG9yVmFuKG1vZGVsLnZlaGljdWxvLmxhdGl0dWQsbW9kZWwudmVoaWN1bG8ubG9uZ2l0dWQsJ2NvbmR1Y3RvcicsMCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgIH1cbiAgICB1YmljYXJWYW4oKXtcbiAgICAgICAgbGV0IG1vZGVsID0gdGhpcztcbiAgICAgICAgbW9kZWwubWFwVmlldy5sYXRpdHVkZSA9IG1vZGVsLnZlaGljdWxvLmxhdGl0dWQqMTtcbiAgICAgICAgbW9kZWwubWFwVmlldy5sb25naXR1ZGUgPSBtb2RlbC52ZWhpY3Vsby5sb25naXR1ZCoxO1xuICAgIH1cbiAgICBzZXRNYXJjYWRvclZhbihsYXQsbG9uLHRpcG8saWQpe1xuICAgICAgICBjb25zb2xlLmxvZygnU2V0ZWFuZG8gbWFyY2Fkb3IgZGUgbGEgVkFOJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdQaW50YW5kbyBtYXJjYWRvcjogJytsYXQrJyAtICcrbG9uKycgLSAnK3RpcG8pO1xuICAgICAgICBsZXQgbW9kZWwgPSB0aGlzO1xuICAgICAgICBpZighbW9kZWwudmFuKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDcmVhbmRvIHZhbiBkZSBjZXJvJyk7XG4gICAgICAgICAgICBtb2RlbC52YW4gPSBuZXcgTWFya2VyKCk7XG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZU1vZHVsZS5JbWFnZSgpO1xuICAgICAgICAgICAgaW1hZ2Uud2lkdGg9MjA7IFxuICAgICAgICAgICAgaW1hZ2UuaGVpZ2h0PTIwOyBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaW1hZ2UuaW1hZ2VTb3VyY2UgPSBpbWFnZVNvdXJjZS5mcm9tUmVzb3VyY2UoJ3ZhbicpO1xuXG4gICAgICAgICAgICBtb2RlbC52YW4udGl0bGUgPSBcIlViaWNhY2nDs24gZGVsIHZlaMOtY3Vsb1wiOyAgXG4gICAgICAgICAgICBtb2RlbC52YW4ucG9zaXRpb24gPSBQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcobGF0LCBsb24pO1xuICAgICAgICAgICAgbW9kZWwudmFuLmljb249aW1hZ2U7XG4gICAgICAgICAgICBtb2RlbC52YW4uc25pcHBldCA9ICdEZXNjcmlwY2nDs24gZGVsIHB1bnRvJztcbiAgICAgICAgICAgIG1vZGVsLnZhbi51c2VyRGF0YSA9IHtpbmRleDogMSxpZDogaWR9O1xuICAgICAgICAgICAgbW9kZWwubWFwVmlldy5hZGRNYXJrZXIobW9kZWwudmFuKTsgXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0FjdHVhbGl6YW5kbyB2YW4nKTtcbiAgICAgICAgICAgIG1vZGVsLnZhbi5wb3NpdGlvbiA9IFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhtb2RlbC52ZWhpY3Vsby5sYXRpdHVkLG1vZGVsLnZlaGljdWxvLmxvbmdpdHVkKTtcblxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgIFxuICAgIH1cblxuICAgIHNldE1hcmNhZG9yKGxhdCxsb24sdGlwbyxpZCxkYXRhMil7XG4gICAgICAgIGNvbnNvbGUubG9nKCdQaW50YW5kbyBtYXJjYWRvcjogJytsYXQrJyAtICcrbG9uKycgLSAnK3RpcG8pO1xuICAgICAgICB2YXIgbWFya2VyID0gbmV3IE1hcmtlcigpO1xuICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZU1vZHVsZS5JbWFnZSgpO1xuICAgICAgICBpbWFnZS53aWR0aD0yMDsgXG4gICAgICAgIGltYWdlLmhlaWdodD0yMDsgXG4gICAgICAgIG1hcmtlci5zbmlwcGV0ID0gJ0Rlc2NyaXBjacOzbiBkZWwgcHVudG8nO1xuICAgICAgICBpZih0aXBvID09ICdpbmljaW8nKXtcbiAgICAgICAgICAgIGltYWdlLmltYWdlU291cmNlID0gaW1hZ2VTb3VyY2UuZnJvbVJlc291cmNlKCdpbmljaW8nKTsgIFxuICAgICAgICAgICAgbWFya2VyLnRpdGxlID0gXCJQdW50byBkZSBpbmljaW9cIjtcbiAgICAgICAgfWVsc2UgaWYodGlwbyA9PSAnZmluJyl7XG4gICAgICAgICAgICBpbWFnZS5pbWFnZVNvdXJjZSA9IGltYWdlU291cmNlLmZyb21SZXNvdXJjZSgnZmluJyk7XG4gICAgICAgICAgICBtYXJrZXIudGl0bGUgPSBcIlB1bnRvIGZpbmFsXCI7XG4gICAgICAgIH1lbHNlIGlmKHRpcG8gPT0gJ3Bhc2FqZXJvJyl7XG4gICAgICAgICAgICBtYXJrZXIudGl0bGUgPSBcIlR1IHViaWNhY2nDs24gZGUgcmVjb2dpZGFcIjsgIFxuICAgICAgICAgICAgaW1hZ2UuaW1hZ2VTb3VyY2UgPSBpbWFnZVNvdXJjZS5mcm9tUmVzb3VyY2UoJ3Bhc2FqZXJvJyk7XG4gICAgICAgICAgICBtYXJrZXIuc25pcHBldCA9ICdEZWJlcyBlc3BlcmFyIGEgbGEgdmFuIGVuIGVzdGUgcHVudG8nO1xuICAgICAgICB9IFxuXG4gICAgICAgIFxuICAgICAgICBtYXJrZXIucG9zaXRpb24gPSBQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcobGF0LCBsb24pO1xuICAgICAgICBtYXJrZXIuaWNvbj1pbWFnZTtcbiAgICAgICAgXG4gICAgICAgIG1hcmtlci51c2VyRGF0YSA9IHtpbmRleDogMSxpZDogaWR9O1xuICAgICAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKG1hcmtlcik7IFxuICAgIH1cblxuICAgIGRpYnVqYXJSdXRhKGxhdCxsb24sbGF0Mixsb24yLHBhcmFkYXMpIHtcbiAgICAgICAgbG9hZGVyLnNob3coKTtcbiAgICAgICAgdGhpcy5teVNlcnZpY2UuZ2V0RGF0YShsYXQsbG9uLGxhdDIsbG9uMixwYXJhZGFzKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFTdWNjZXNzKHJlc3VsdCk7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBjaGVja0luKCl7XG4gICAgICAgIGxldCBtb2RlbCA9IHRoaXM7XG4gICAgICAgIGRpYWxvZ3MuY29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogXCJDaGVjay1JbiBWaWFqZVwiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCLCv0Rlc2VhcyBoYWNlciBDaGVjay1pbiBlbiBlc3RlIHZpYWplP1wiLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIkNoZWNrLUluXCIsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbGFyXCIsXG4gICAgICAgICAgICAvL25ldXRyYWxCdXR0b25UZXh0OiBcIk5ldXRyYWwgdGV4dFwiLFxuICAgICAgICAgICAgLy9kZWZhdWx0VGV4dDogXCJEZWZhdWx0IHRleHRcIixcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgaWYocil7XG4gICAgICAgICAgICAgICAgaWYobW9kZWwudG9rZW5zQ3VuZHVjdG9yLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICBsZXQgbm9tYnJlcyA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdub21icmVVc3VhcmlvJyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpZFBhc2FqZXJvID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ2lkVXN1YXJpbycpO1xuXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLm15U2VydmljZS5yZWdpc3RyYXJQYXNhamVybyhtb2RlbC5pZHZpYWplLGlkUGFzYWplcm8sJzEnLCcwJywnMCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlIHJlZ2lzdHJvIGRlIHBhc2FqZXJvJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5teVNlcnZpY2UuZW52aWFyUHVzaENoZWNraW4oZW5jb2RlVVJJKG5vbWJyZXMrJyBzZSBoYSBzdWJpZG8gYSBsYSB2YW4nKSxtb2RlbC50b2tlbnNDdW5kdWN0b3IsbW9kZWwuaWR2aWFqZSxtb2RlbC5pZHJ1dGEsaWRQYXNhamVybyxub21icmVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzdWx0YWRvIGRlbCBwdXNoJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3VsdDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTGlzdG9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkNoZWNrLUluIHJlYWxpemFkbyBleGl0b3NhbWVudGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5jaGVja2luPWZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQ2hlY2stSW4gZmFsbGlkb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiRWwgY2hlY2staW4gbm8gcHVkbyBzZXIgcmVhbGl6YWRvLiBJbnRlbnRhIGRlIG51ZXZvIHBvciBmYXZvci5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvciBjb25kdWN0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVHUgbWVuc2FqZSBubyBwdWRvIHNlciBlbnRyZWdhZG8uIEVsIGNvbmR1Y3RvciBubyB0aWVuZSBkaXNwb3NpdGl2b3MgYXNpZ25hZG9zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkdldERhdGFTdWNjZXNzKHJlcykge1xuICAgICAgICB0aGlzLmVuY29kZWRQb2ludHMgPSBwbC5kZWNvZGUocmVzLnJvdXRlc1swXS5vdmVydmlld19wb2x5bGluZS5wb2ludHMpO1xuICAgICAgICBjb25zb2xlLmxvZygnQVFVSSBWQU4gTE9TIFBVTlRPUycpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmVuY29kZWRQb2ludHMpOyBcbiAgICAgICAgY29uc3QgbWFwID0gdGhpcy5tYXBWaWV3O1xuICAgICAgICBjb25zdCBtb2RlbCA9IHRoaXM7XG5cbiAgICAgICAgbGV0IGxpc3QgPSB0aGlzLmVuY29kZWRQb2ludHM7XG5cbiAgICAgICAgbGV0IGxpbmUgPSBuZXcgUG9seWxpbmUoKTtcbiAgICAgICAgbGluZS52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgbGluZS53aWR0aCA9IDQ7XG4gICAgICAgIGxpbmUuY29sb3IgPSBuZXcgQ29sb3IoJyMxNTNkN2EnKTtcbiAgICAgICAgbGluZS5nZW9kZXNpYyA9IHRydWU7XG4gICAgICAgIGxpbmUuY2xpY2thYmxlPXRydWU7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsaW5lLmFkZFBvaW50KFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhsaXN0W2ldWzBdLGxpc3RbaV1bMV0pKTtcbiAgICAgICAgfVxuICAgICAgICBcblxuICAgICAgICBtYXAuYWRkUG9seWxpbmUobGluZSk7XG5cbiAgICAgICAgbG9hZGVyLmhpZGUoKTtcblxuICAgIH1cblxuICAgIHByaXZhdGUgb25HZXREYXRhRXJyb3IoZXJyb3I6IFJlc3BvbnNlIHwgYW55KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25HZXREYXRhRXJyb3I6IFwiICsgSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICB9XG59XG4iXX0=