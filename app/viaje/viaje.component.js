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
        model.myService.getDatosViaje(model.idviaje)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlhamUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmlhamUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBFQUEwRTtBQUMxRSw2RUFBeUY7QUFDekYsc0RBQTZEO0FBQzdELDBEQUE0RDtBQUM1RCxpRkFBZ0U7QUFDaEUsNENBQTJDO0FBQzNDLDBDQUFpRDtBQUNqRCwyREFBNkQ7QUFDN0QsdURBQXlEO0FBQ3pELCtCQUE0QjtBQUM1QixvQ0FBc0M7QUFDdEMsc0RBQXdEO0FBQ3hELGtDQUFvQztBQUNwQyxvQ0FBc0M7QUFFdEMsZ0NBQStCO0FBQy9COzs7Ozs4REFLOEQ7QUFDOUQsb0ZBQW9GO0FBQ3BGLElBQUksTUFBTSxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztBQWVwQztJQTJXSSx3QkFBb0IsZ0JBQWtDLEVBQVUsU0FBcUIsRUFBUyxLQUFxQixFQUFTLElBQVU7UUFBdEksaUJBY0M7UUFkbUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVk7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFTLFNBQUksR0FBSixJQUFJLENBQU07UUF6V3RJLDJEQUEyRDtRQUMzRCxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBS2IsZUFBVSxHQUFRLGFBQWEsQ0FBQztRQUNoQyxzQkFBaUIsR0FBUSx1QkFBdUIsQ0FBQztRQUNqRCxlQUFVLEdBQVEsWUFBWSxDQUFDO1FBQy9CLGNBQVMsR0FBUSxPQUFPLENBQUM7UUFDekIsc0JBQWlCLEdBQVEsR0FBRyxDQUFDO1FBQzdCLG9CQUFlLEdBQVEsa0JBQWtCLENBQUM7UUFHMUMsYUFBUSxHQUFDLFFBQVEsQ0FBQyxDQUFDLDhCQUE4QjtRQUNqRCxjQUFTLEdBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTO1FBTy9CLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDVixZQUFPLEdBQUcsQ0FB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RyxJQUFJLENBQUM7WUFDaEMsQ0FBQztZQUNELEVBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQSxDQUFDO2dCQUNyQixLQUFLLENBQUMsVUFBVSxHQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7WUFDMUMsQ0FBQztZQUNELEVBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBLENBQUM7Z0JBQzVCLEtBQUssQ0FBQyxpQkFBaUIsR0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUM7WUFDeEQsQ0FBQztZQUNELEVBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQSxDQUFDO2dCQUNyQixLQUFLLENBQUMsVUFBVSxHQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7WUFDMUMsQ0FBQztZQUNELEVBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQSxDQUFDO2dCQUNwQixLQUFLLENBQUMsU0FBUyxHQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDeEMsQ0FBQztZQUNELEVBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQSxDQUFDO2dCQUMxQixLQUFLLENBQUMsZUFBZSxHQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUM7WUFDcEQsQ0FBQztZQUNELEVBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBLENBQUM7Z0JBQzVCLEtBQUssQ0FBQyxpQkFBaUIsR0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUM7WUFDeEQsQ0FBQztZQUNELEtBQUssQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLENB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QUFFLENBQUM7WUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1Q0FBUSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7UUFHRCxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUVsQixDQUFDO0lBRU8sdUNBQWMsR0FBdEIsVUFBdUIsS0FBcUI7UUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQXI1QlEsY0FBYztRQUwxQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE9BQU87WUFDakIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx3QkFBd0I7U0FDeEMsQ0FBQzt5Q0E0V3dDLHlCQUFnQixFQUFxQix1QkFBVSxFQUFnQix1QkFBYyxFQUFlLFdBQUk7T0EzVzdILGNBQWMsQ0FzNUIxQjtJQUFELHFCQUFDO0NBQUEsQUF0NUJELElBczVCQztBQXQ1Qlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG4vL2ltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnknO1xuaW1wb3J0IHsgTWFwVmlldywgTWFya2VyLCBQb3NpdGlvbiwgUG9seWxpbmUsIFN0eWxlfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrJztcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7TG9hZGluZ0luZGljYXRvcn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xuaW1wb3J0IHsgV2ViU2VydmljZSB9IGZyb20gXCIuLi93cy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCAqIGFzIGltYWdlU291cmNlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ltYWdlLXNvdXJjZVwiO1xuaW1wb3J0ICogYXMgSW1hZ2VNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvaW1hZ2VcIjtcbmltcG9ydCB7Q29sb3J9IGZyb20gJ2NvbG9yJztcbmltcG9ydCAqIGFzIHBsIGZyb20gJ2dvb2dsZS1wb2x5bGluZSc7XG5pbXBvcnQgKiBhcyBnZW9sb2NhdGlvbiBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XG5pbXBvcnQgeyBBY2N1cmFjeSB9IGZyb20gXCJ1aS9lbnVtc1wiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0ICogYXMgb2JzZXJ2YWJsZUFycmF5IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7IFxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiogQmVmb3JlIHlvdSBjYW4gbmF2aWdhdGUgdG8gdGhpcyBwYWdlIGZyb20geW91ciBhcHAsIHlvdSBuZWVkIHRvIHJlZmVyZW5jZSB0aGlzIHBhZ2UncyBtb2R1bGUgaW4gdGhlXG4qIGdsb2JhbCBhcHAgcm91dGVyIG1vZHVsZS4gQWRkIHRoZSBmb2xsb3dpbmcgb2JqZWN0IHRvIHRoZSBnbG9iYWwgYXJyYXkgb2Ygcm91dGVzOlxuKiB7IHBhdGg6IFwidmlhamVcIiwgbG9hZENoaWxkcmVuOiBcIi4vdmlhamUvdmlhamUubW9kdWxlI1ZpYWplTW9kdWxlXCIgfVxuKiBOb3RlIHRoYXQgdGhpcyBzaW1wbHkgcG9pbnRzIHRoZSBwYXRoIHRvIHRoZSBwYWdlIG1vZHVsZSBmaWxlLiBJZiB5b3UgbW92ZSB0aGUgcGFnZSwgeW91IG5lZWQgdG8gdXBkYXRlIHRoZSByb3V0ZSB0b28uXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLy9yZWdpc3RlckVsZW1lbnQoXCJNYXBWaWV3XCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrXCIpLk1hcFZpZXcpO1xubGV0IGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XG4vKmNsYXNzIFZlaGljdWxvIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbGF0aXR1ZDogbnVtYmVyLCBwdWJsaWMgbG9uZ2l0dWQ6IG51bWJlciwgcHVibGljIHBsYWNhX3Y6c3RyaW5nKSB7IH0gICBcbn0qL1xuaW50ZXJmYWNlIFZlaGljdWxvIHtcbiAgICBsYXRpdHVkOiBudW1iZXIsXG4gICAgbG9uZ2l0dWQ6IG51bWJlcixcbiAgICBwbGFjYTogc3RyaW5nXG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIlZpYWplXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3ZpYWplLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgVmlhamVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHB1YmxpYyBlbmNvZGVkUG9pbnRzOmFueTtcbiAgICAvL3B1YmxpYyBwYXJhZGFzID0gbmV3IG9ic2VydmFibGVBcnJheS5PYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgIHBhcmFkYXMgPSBbXTtcbiAgICBpZHJ1dGE6IG51bWJlcjtcbiAgICBpZHZpYWplOiBudW1iZXI7XG4gICAgaWRjb25kdWN0b3I6IG51bWJlcjtcbiAgICBwbGFjYTpzdHJpbmc7XG4gICAgbm9tYnJlUnV0YTpzdHJpbmc9XCJOb21icmUgcnV0YVwiO1xuICAgIGRpcmVjY2lvblJlY29naWRhOnN0cmluZz1cIkRpcmVjY2nDs24gZGUgcmVjb2dpZGFcIjtcbiAgICBmZWNoYVZpYWplOnN0cmluZz1cIjAwLTAwLTAwMDBcIjtcbiAgICBob3JhVmlhamU6c3RyaW5nPVwiMDA6MDBcIjtcbiAgICBjYW50aWRhZFBhc2FqZXJvczpzdHJpbmc9JzAnO1xuICAgIG5vbWJyZUNvbmR1Y3RvcjpzdHJpbmc9J05vbWJyZSBDb25kdWN0b3InO1xuXG5cbiAgICBsYXRpdHVkZT00LjU4Nzc5OTsgLy9Db2xvbWJpYTQuNTg3Nzk5LCAtNzMuOTQwOTYwXG4gICAgbG9uZ2l0dWRlPS03My45NDA5NjA7IC8vQ2xvbWJpYVxuXG4gICAgbGF0SW5pY2lhbDpudW1iZXI7XG4gICAgbG9uSW5pY2lhbDpudW1iZXI7XG4gICAgbGF0RmluYWw6bnVtYmVyO1xuICAgIGxvbkZpbmFsOm51bWJlcjtcblxuICAgIHpvb20gPSAxNTtcbiAgICBtaW5ab29tID0gMDsgXG4gICAgbWF4Wm9vbSA9IDIyO1xuICAgIGJlYXJpbmcgPSAwO1xuICAgIHRpbHQgPSAwO1xuICAgIHBhZGRpbmcgPSBbNDAsIDQwLCA0MCwgNDBdO1xuICAgIG1hcFZpZXc6IE1hcFZpZXc7XG4gICAgbGFzdENhbWVyYTogU3RyaW5nO1xuICAgIHZlaGljdWxvOmFueTtcbiAgICB2YW46TWFya2VyO1xuICAgIHRpbWVvdXQ6YW55O1xuICAgIHJlY29ycmlkbzpib29sZWFuPWZhbHNlO1xuICAgIC8vcHVibGljIG1lbnNhamVzID0gbmV3IG9ic2VydmFibGVBcnJheS5PYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgIHB1YmxpYyBtZW5zYWplcz1bXTsgXG4gICAgdG9rZW5zQ3VuZHVjdG9yPVtdO1xuICAgIHB1bnRvUmVjb2dpZGE6YW55O1xuICAgIGNoZWNraW46Ym9vbGVhbj1mYWxzZTtcbiAgICBtb3N0cmFyVmFuOmJvb2xlYW49ZmFsc2U7XG4gICAgZXN0YWRvVmlhamU6c3RyaW5nO1xuXG4gICAgc3R5bGVzPVtcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzdjOTNhM1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IFwiLTEwXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmUuY291bnRyeVwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlLmNvdW50cnlcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjYTBhNGE1XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmUucHJvdmluY2VcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNjI4MzhlXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiBcIi0yOVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZVwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZGRlM2UzXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlLm1hbl9tYWRlXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGUubWFuX21hZGVcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlLm1hbl9tYWRlXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzNmNGE1MVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwid2VpZ2h0XCI6IFwiMC4zMFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogXCI3NFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaVwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5hdHRyYWN0aW9uXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5idXNpbmVzc1wiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kuZ292ZXJubWVudFwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLm1lZGljYWxcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLnBhcmtcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLnBsYWNlX29mX3dvcnNoaXBcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLnNjaG9vbFwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLnNwb3J0c19jb21wbGV4XCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInNhdHVyYXRpb25cIjogXCItMTAwXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjYmJjYWNmXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiBcIjBcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2JiY2FjZlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwid2VpZ2h0XCI6IFwiMC41MFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0XCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXkuY29udHJvbGxlZF9hY2Nlc3NcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheS5jb250cm9sbGVkX2FjY2Vzc1wiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuc3Ryb2tlXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNhOWI0YjhcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmFydGVyaWFsXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMuaWNvblwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiaW52ZXJ0X2xpZ2h0bmVzc1wiOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwic2F0dXJhdGlvblwiOiBcIi03XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogXCIzXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJnYW1tYVwiOiBcIjEuODBcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIndlaWdodFwiOiBcIjAuMDFcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmxvY2FsXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXRcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXQuc3RhdGlvbi5idXNcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2EzYzdkZlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9XG5dO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgbXlTZXJ2aWNlOiBXZWJTZXJ2aWNlLHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLHByaXZhdGUgcGFnZTogUGFnZSkge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFVzZSB0aGUgY29uc3RydWN0b3IgdG8gaW5qZWN0IGFwcCBzZXJ2aWNlcyB0aGF0IHlvdSBuZWVkIGluIHRoaXMgY29tcG9uZW50LlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgICAgICB0aGlzLnJvdXRlLnBhcmFtc1xuICAgICAgICAgIC5mb3JFYWNoKChwYXJhbXMpID0+IHsgXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQYXJhbWV0cm9zIGRlIHVybCcpO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShwYXJhbXMpKTtcbiAgICAgICAgICAgICAgdGhpcy5pZHJ1dGEgPSArcGFyYW1zW1wiaWRydXRhXCJdOyBcbiAgICAgICAgICAgICAgdGhpcy5pZHZpYWplID0gK3BhcmFtc1tcImlkdmlhamVcIl07IFxuICAgICAgICAgICAgICB0aGlzLmlkY29uZHVjdG9yID0gK3BhcmFtc1tcImlkY29uZHVjdG9yXCJdOyBcbiAgICAgICAgICAgICAgdGhpcy5wbGFjYSA9IHBhcmFtc1tcInBsYWNhXCJdOyBcbiAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5pZHJ1dGErJyAtICcrdGhpcy5pZHZpYWplKycgLSAnK3RoaXMucGxhY2EpO1xuICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFVzZSB0aGUgXCJuZ09uSW5pdFwiIGhhbmRsZXIgdG8gaW5pdGlhbGl6ZSBkYXRhIGZvciB0aGlzIGNvbXBvbmVudC5cbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAgICAgY29uc3QgaWRDb25kdWN0b3IgPSB0aGlzLmlkY29uZHVjdG9yO1xuICAgICAgICBsZXQgbW9kZWwgPSB0aGlzO1xuXG4gICAgICAgIC8qY29uc29sZS5sb2coJ1Rva2VuIFBVU0g6ICcrQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ3Rva2VuUHVzaCcpKTtcbiAgICAgICAgdGhpcy50b2tlbnNDdW5kdWN0b3IucHVzaChBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygndG9rZW5QdXNoJykpO1xuICAgICAgICB0aGlzLnRva2Vuc0N1bmR1Y3Rvci5wdXNoKCdjaHVwZWxvZnVlcnRlJyk7XG4gICAgICAgICovXG4gICAgICAgIG1vZGVsLnBhZ2Uub24oJ25hdmlnYXRpbmdUbycsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRW50cmFuZG8gYSBsYSB2aXN0YScpO1xuICAgICAgICAgICAgLy8gcnVuIGluaXQgY29kZVxuICAgICAgICAgICAgLy8gKG5vdGU6IHRoaXMgd2lsbCBydW4gd2hlbiB5b3UgZWl0aGVyIG1vdmUgZm9yd2FyZCBvciBiYWNrIHRvIHRoaXMgcGFnZSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbW9kZWwucGFnZS5vbignbmF2aWdhdGluZ0Zyb20nLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NhbGllbmRvIGRlIGxhIHZpc3RhJyk7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKG1vZGVsLnRpbWVvdXQpOyBcbiAgICAgICAgICAgIC8vIHJ1biBkZXN0cm95IGNvZGVcbiAgICAgICAgICAgIC8vIChub3RlOiB0aGlzIHdpbGwgcnVuIHdoZW4geW91IGVpdGhlciBtb3ZlIGZvcndhcmQgdG8gYSBuZXcgcGFnZSBvciBiYWNrIHRvIHRoZSBwcmV2aW91cyBwYWdlKVxuICAgICAgICB9KTsgXG4gICAgICAgIG1vZGVsLm15U2VydmljZS5nZXRNZW5zYWplcygpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzdWx0YWRvIGRlIG1lbnNhamVzJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDxPYmplY3Qua2V5cyhyZXN1bHQpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQaW50YW5kbyBhOicpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHRbaV0pOyAvLyBcInNwZWNpZXNcIlxuXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLm1lbnNhamVzLnB1c2gocmVzdWx0W2ldLnRleHRvKTsgIFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtb2RlbC5tZW5zYWplcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgbW9kZWwub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7IFxuXG4gICAgICAgIFxuICAgICAgICBtb2RlbC5teVNlcnZpY2UuZ2V0VG9rZW5zQ29uZHVjdG9yKGlkQ29uZHVjdG9yKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3VsdGFkbyBkZSB0b2tlbnMgY29uZHVjdG9yOiAnK2lkQ29uZHVjdG9yKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPE9iamVjdC5rZXlzKHJlc3VsdCkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1BpbnRhbmRvIGE6Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdFtpXSk7IC8vIFwic3BlY2llc1wiXG5cbiAgICAgICAgICAgICAgICAgICAgbW9kZWwudG9rZW5zQ3VuZHVjdG9yLnB1c2gocmVzdWx0W2ldLnRva2VuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBtb2RlbC5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgfVxuICAgIGNhbmNlbGFyKCl7XG4gICAgICAgIGRpYWxvZ3MuY29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogXCJDYW5jZWxhciByZXNlcnZhXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIsK/UmVhbG1lbnRlIGRlc2VhcyBjYW5jZWxhciBlc3RhIHJlc2VydmE/XCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiU2ksIGNhbmNlbGFybGFcIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiTm9cIlxuICAgICAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAvLyByZXN1bHQgYXJndW1lbnQgaXMgYm9vbGVhblxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgcmVzdWx0OiBcIiArIHJlc3VsdCk7XG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJSZXNlcnZhIGNhbmNlbGFkYVwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVHUgcmVzZXJ2YSBoYSBzaWRvIGNhbmNlbGFkYSBleGl0b3NhbWVudGVcIixcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3Jlc2VydmFzXCJdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgdWJpY2FyKCl7XG4gICAgICAgIGxldCBtb2RlbCA9IHRoaXM7XG4gICAgICAgIGdlb2xvY2F0aW9uLmlzRW5hYmxlZCgpLnRoZW4oZnVuY3Rpb24gKGlzRW5hYmxlZCkge1xuICAgICAgICAgICAgaWYgKGlzRW5hYmxlZCkge1xuICAgICAgICAgICAgICAgIGxldCBsb2NhdGlvbiA9IGdlb2xvY2F0aW9uLmdldEN1cnJlbnRMb2NhdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIGRlc2lyZWRBY2N1cmFjeTogQWNjdXJhY3kuaGlnaCxcbiAgICAgICAgICAgICAgICAgICAgbWF4aW11bUFnZTogNTAwMCxcbiAgICAgICAgICAgICAgICAgICAgdGltZW91dDogMTAwMDBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAobG9jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwubGF0aXR1ZGUgPSBsb2MubGF0aXR1ZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwubG9uZ2l0dWRlID0gbG9jLmxvbmdpdHVkZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL21vZGVsLnNldE1hcmNhZG9yKGxvYy5sYXRpdHVkZSxsb2MubG9uZ2l0dWRlLCdwYXNhamVybycsMixudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgKGUubWVzc2FnZSB8fCBlKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZ2VvbG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyAoZS5tZXNzYWdlIHx8IGUpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgKGUubWVzc2FnZSB8fCBlKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpckF0cmFzKCkge1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xuICAgIH1cbiAgICBjb250YWN0YXIoKXtcbiAgICAgICAgbGV0IG1vZGVsID0gdGhpcztcbiAgICAgICAgZGlhbG9ncy5wcm9tcHQoe1xuICAgICAgICAgICAgdGl0bGU6IFwiQ29udGFjdGFyXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkVudsOtYSB1biBtZW5zYWplIGFsIGNvbmR1Y3RvclwiLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIkVudmlhclwiLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxhclwiLFxuICAgICAgICAgICAgLy9uZXV0cmFsQnV0dG9uVGV4dDogXCJOZXV0cmFsIHRleHRcIixcbiAgICAgICAgICAgIC8vZGVmYXVsdFRleHQ6IFwiRGVmYXVsdCB0ZXh0XCIsXG4gICAgICAgICAgICBpbnB1dFR5cGU6IGRpYWxvZ3MuaW5wdXRUeXBlLnRleHRcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgcmVzdWx0OiBcIiArIHIucmVzdWx0ICsgXCIsIHRleHQ6IFwiICsgci50ZXh0KTtcbiAgICAgICAgICAgIGlmKHIucmVzdWx0KXtcbiAgICAgICAgICAgICAgICBpZihtb2RlbC50b2tlbnNDdW5kdWN0b3IubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLm15U2VydmljZS5lbnZpYXJQdXNoKG1vZGVsLnRva2Vuc0N1bmR1Y3RvcixlbmNvZGVVUkkoci50ZXh0KSlcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0MikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3VsdGFkbyBkZWwgcHVzaCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyZXN1bHQyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk1lbnNhamUgZW52aWFkb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVHUgbWVuc2FqZSBmdWUgZW52aWFkbyBleGl0b3NhbWVudGUgYWwgY29uZHVjdG9yLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPa1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTWVuc2FqZSBmYWxsaWRvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJUdSBtZW5zYWplIG5vIHB1ZG8gc2VyIGVudHJlZ2Fkby4gSW50ZW50YSBkZSBudWV2byBwb3IgZmF2b3IuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRXJyb3IgY29uZHVjdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlR1IG1lbnNhamUgbm8gcHVkbyBzZXIgZW50cmVnYWRvLiBFbCBjb25kdWN0b3Igbm8gdGllbmUgZGlzcG9zaXRpdm9zIGFzaWduYWRvc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9rXCJcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgICAgIC8qZGlhbG9ncy5hY3Rpb24oe1xuICAgICAgICAgICAgbWVzc2FnZTogXCJFbnbDrWEgdW4gbWVuc2FqZSBhbCBjb25kdWN0b3JcIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsYXJcIixcbiAgICAgICAgICAgIGFjdGlvbnM6IHRoaXMubWVuc2FqZXNcbiAgICAgICAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgcmVzdWx0OiBcIiArIHJlc3VsdCk7XG4gICAgICAgICAgICBpZihyZXN1bHQgIT0gJ0NhbmNlbGFyJyl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy50b2tlbnNDdW5kdWN0b3IubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXlTZXJ2aWNlLmVudmlhclB1c2godGhpcy50b2tlbnNDdW5kdWN0b3IsZW5jb2RlVVJJKHJlc3VsdCkpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdDIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXN1bHRhZG8gZGVsIHB1c2gnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzdWx0Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJNZW5zYWplIGVudmlhZG9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlR1IG1lbnNhamUgZnVlIGVudmlhZG8gZXhpdG9zYW1lbnRlIGFsIGNvbmR1Y3Rvci5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk1lbnNhamUgZmFsbGlkb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVHUgbWVuc2FqZSBubyBwdWRvIHNlciBlbnRyZWdhZG8uIEludGVudGEgZGUgbnVldm8gcG9yIGZhdm9yLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPa1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkVycm9yIGNvbmR1Y3RvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJUdSBtZW5zYWplIG5vIHB1ZG8gc2VyIGVudHJlZ2Fkby4gRWwgY29uZHVjdG9yIG5vIHRpZW5lIGRpc3Bvc2l0aXZvcyBhc2lnbmFkb3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPa1wiXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0pOyovXG4gICAgfVxuICAgIG9uTWFwUmVhZHkoZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ01hcCBSZWFkeScpO1xuXG4gICAgICAgIHRoaXMubWFwVmlldyA9IGV2ZW50Lm9iamVjdDtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIlNldHRpbmcgYSBtYXJrZXIuLi5cIik7XG5cbiAgICAgICAgbG9hZGVyLnNob3coKTtcbiAgICAgICAgbGV0IG1vZGVsID0gdGhpcztcbiAgICAgICAgbW9kZWwubWFwVmlldy5zZXRTdHlsZSg8U3R5bGU+KHRoaXMuc3R5bGVzKSk7XG5cbiAgICAgICAgbW9kZWwubXlTZXJ2aWNlLmdldERhdG9zVmlhamUobW9kZWwuaWR2aWFqZSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdDphbnkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzdWx0YWRvIGRlbCB2aWFqZTogJyttb2RlbC5pZHZpYWplKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIGlmKHJlc3VsdFswXS5lc3RhZG8gPT0gXCJFTiBQVU5UTyBERSBJTklDSU9cIiB8fCByZXN1bHRbMF0uZXN0YWRvID09IFwiRU4gU0VSVklDSU9cIil7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5tb3N0cmFyVmFuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYocmVzdWx0WzBdLm5vbWJyZXJ1dGEpe1xuICAgICAgICAgICAgICAgICAgICBtb2RlbC5ub21icmVSdXRhPXJlc3VsdFswXS5ub21icmVydXRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihyZXN1bHRbMF0uZGlyZWNjaW9ucmVjb2dpZGEpe1xuICAgICAgICAgICAgICAgICAgICBtb2RlbC5kaXJlY2Npb25SZWNvZ2lkYT1yZXN1bHRbMF0uZGlyZWNjaW9ucmVjb2dpZGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHJlc3VsdFswXS5mZWNoYXZpYWplKXtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuZmVjaGFWaWFqZT1yZXN1bHRbMF0uZmVjaGF2aWFqZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYocmVzdWx0WzBdLmhvcmF2aWFqZSl7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmhvcmFWaWFqZT1yZXN1bHRbMF0uaG9yYXZpYWplO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihyZXN1bHRbMF0ubm9tYnJlY29uZHVjdG9yKXtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwubm9tYnJlQ29uZHVjdG9yPXJlc3VsdFswXS5ub21icmVjb25kdWN0b3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHJlc3VsdFswXS5jYW50aWRhZHBhc2FqZXJvcyl7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmNhbnRpZGFkUGFzYWplcm9zPXJlc3VsdFswXS5jYW50aWRhZHBhc2FqZXJvcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbW9kZWwuZXN0YWRvVmlhamUgPSByZXN1bHRbMF0uZXN0YWRvO1xuICAgICAgICAgICAgICAgIG1vZGVsLm15U2VydmljZS5nZXRQZXJzb25hcyhtb2RlbC5pZHZpYWplKS5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZSBsb3MgcGFzYWplcm9zIGRlbCB2aWFqZTogJytPYmplY3Qua2V5cyhyZXMpLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzKSk7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXMocmVzKS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRGV0YWxsZSBkZSBwdW50bycpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXNbaV0pKTtcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzW2ldLmlkcGFzYWplcm8gPT09IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdpZFVzdWFyaW8nKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRGV0YWxsZXMgZGVsIHBhc2FqZXJvJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwubGF0aXR1ZGUgPSByZXNbaV0ubGF0aXR1ZCoxO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwubG9uZ2l0dWRlID0gcmVzW2ldLmxvbmdpdHVkKjE7ICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuc2V0TWFyY2Fkb3IocmVzW2ldLmxhdGl0dWQqMSxyZXNbaV0ubG9uZ2l0dWQqMSwncGFzYWplcm8nLHJlc1tpXS5ub21icmVwYXNhamVybyxyZXNbaV0uZGlyZWNjaW9uKTsgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc1tpXS5lc3RhZG9wdj09JzAnICYmIChtb2RlbC5lc3RhZG9WaWFqZT09J0VOIFNFUlZJQ0lPJyB8fCBtb2RlbC5lc3RhZG9WaWFqZT09J0VOIFBVTlRPIERFIElOSUNJTycpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5jaGVja2luPXRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvL21vZGVsLnBhcmFkYXMucHVzaChbUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKHJlc1tpXS5sYXRpdHVkLHJlc1tpXS5sb25naXR1ZCkscmVzW2ldLm5vbWJyZXBhc2FqZXJvXSk7IFxuICAgICAgICAgICAgICAgICAgICAvKmlmKHJlc1tpXS5lc3RhZG9wdiA9PSBcIjBcIil7IC8vU0kgZWwgcGFzYWplcm8gbm8gc2UgaGEgc3ViaWRvXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5zZXRNYXJjYWRvcihyZXNbaV0ubGF0aXR1ZCoxLHJlc1tpXS5sb25naXR1ZCoxLCdwYXNhamVybycscmVzW2ldLm5vbWJyZXBhc2FqZXJvLHJlc1tpXS5kaXJlY2Npb24pOyAgICBcbiAgICAgICAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIHRyYXllbmRvIGxvcyBwYXJhZGVyb3MgZGVsIHZpYWplJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBtb2RlbC5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTsgXG5cblxuICAgICAgICBcblxuICAgICAgICB0aGlzLm15U2VydmljZS5nZXRQdW50b3NSdXRhKHRoaXMuaWRydXRhKS5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlIGxhIHJ1dGE6ICcrbW9kZWwuaWRydXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlcykpO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXMocmVzKS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEZXRhbGxlIGRlIHB1bnRvJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzW2ldKSk7XG4gICAgICAgICAgICAgICAgaWYocmVzW2ldLnRpcG8gPT0gJ0lOSUNJTycpe1xuXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmxhdEluaWNpYWwgPSByZXNbaV0ubGF0aXR1ZDtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwubG9uSW5pY2lhbCA9IHJlc1tpXS5sb25naXR1ZDtcblxuICAgICAgICAgICAgICAgICAgICAvL21vZGVsLmxhdGl0dWRlID0gcmVzW2ldLmxhdGl0dWQqMTtcbiAgICAgICAgICAgICAgICAgICAgLy9tb2RlbC5sb25naXR1ZGUgPSByZXNbaV0ubG9uZ2l0dWQqMTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnTEFUOiAnK21vZGVsLmxhdGl0dWRlKycgLSBMT046ICcrbW9kZWwubG9uZ2l0dWRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYocmVzW2ldLnRpcG8gPT0gJ0ZJTicpe1xuICAgICAgICAgICAgICAgICAgICBtb2RlbC5sYXRGaW5hbCA9IHJlc1tpXS5sYXRpdHVkO1xuICAgICAgICAgICAgICAgICAgICBtb2RlbC5sb25GaW5hbCA9IHJlc1tpXS5sb25naXR1ZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYocmVzW2ldLnRpcG8gPT0gJ05PUk1BTCcpe1xuICAgICAgICAgICAgICAgICAgICBtb2RlbC5wYXJhZGFzLnB1c2goW1Bvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhyZXNbaV0ubGF0aXR1ZCxyZXNbaV0ubG9uZ2l0dWQpLHJlc1tpXS5pZHBhcmFkYV0pOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQdW50byBpbmljaWFsOiBMQVQ6Jyttb2RlbC5sYXRJbmljaWFsKycgLSBMT046Jyttb2RlbC5sb25JbmljaWFsKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQdW50byBmaW5hbDogTEFUOicrbW9kZWwubGF0RmluYWwrJyAtIExPTjonK21vZGVsLmxvbkZpbmFsKTtcbiAgICAgICAgICAgIG1vZGVsLnNldE1hcmNhZG9yKG1vZGVsLmxhdEluaWNpYWwsbW9kZWwubG9uSW5pY2lhbCwnaW5pY2lvJywwLG51bGwpO1xuICAgICAgICAgICAgbW9kZWwuc2V0TWFyY2Fkb3IobW9kZWwubGF0RmluYWwsbW9kZWwubG9uRmluYWwsJ2ZpbicsMCxudWxsKTtcbiAgICAgICAgICAgIC8vbW9kZWwuc2V0TWFyY2Fkb3IobW9kZWwudmVoaWN1bG8ubGF0aXR1ZCxtb2RlbC52ZWhpY3Vsby5sYXRpdHVkLCdjb25kdWN0b3InLDApO1xuICAgICAgICAgICAgbW9kZWwudWJpY2FyVmVoaWN1bG8oKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQQVJBREFTIE5PUk1BTEVTJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShtb2RlbC5wYXJhZGFzKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgXG4gICAgICAgICAgICBpZighbW9kZWwucmVjb3JyaWRvKXsgXG4gICAgICAgICAgICAgICAgbW9kZWwuZGlidWphclJ1dGEobW9kZWwubGF0SW5pY2lhbCxtb2RlbC5sb25JbmljaWFsLG1vZGVsLmxhdEZpbmFsLG1vZGVsLmxvbkZpbmFsLG1vZGVsLnBhcmFkYXMpOyAgXG4gICAgICAgICAgICAgICAgbW9kZWwucmVjb3JyaWRvPXRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgICAgICBcblxuXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgIHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICB9KTsgXG5cblxuXG4gICAgfVxuICAgIG9uQ29vcmRpbmF0ZVRhcHBlZChhcmdzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29vcmRpbmF0ZSBUYXBwZWQsIExhdDogXCIgKyBhcmdzLnBvc2l0aW9uLmxhdGl0dWRlICsgXCIsIExvbjogXCIgKyBhcmdzLnBvc2l0aW9uLmxvbmdpdHVkZSwgYXJncyk7XG4gICAgfVxuXG4gICAgb25NYXJrZXJFdmVudChhcmdzKSB7XG4gICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgdGl0bGU6IFwiUHVudG8gZGUgcmVjb2dpZGFcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiRXN0ZSBlcyBlbCBwdW50byBkZSByZWNvZ2lkYSBkZSB0dSB2aWFqZS4gwqFEZWJlcyBlc3RhciBhdGVudG8hXCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgIH0pO1xuICAgIH0gXG5cbiAgICBvbkNhbWVyYUNoYW5nZWQoYXJncykge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNhbWVyYSBjaGFuZ2VkOiBcIiArIEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKSwgSlNPTi5zdHJpbmdpZnkoYXJncy5jYW1lcmEpID09PSB0aGlzLmxhc3RDYW1lcmEpO1xuICAgICAgICB0aGlzLmxhc3RDYW1lcmEgPSBKU09OLnN0cmluZ2lmeShhcmdzLmNhbWVyYSk7XG4gICAgfSBcbiAgICB1YmljYXJWZWhpY3Vsbygpe1xuICAgICAgICBsZXQgbW9kZWwgPSB0aGlzO1xuXG4gICAgICAgIC8vQnVzY2FyIFZBTiBsYSBwcmltZXIgXG4gICAgICAgIG1vZGVsLm15U2VydmljZS5nZXRVYmljYWNpb25WZWhpY3Vsbyh0aGlzLnBsYWNhKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgLy90aGlzLnViaWNhclZlaGljdWxvKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgbW9kZWwudmVoaWN1bG8gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1ZFSElDVUxPJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobW9kZWwudmVoaWN1bG8pO1xuICAgICAgICAgICAgICAgIGlmKG1vZGVsLmVzdGFkb1ZpYWplPT0nRU4gUFVOVE8gREUgSU5JQ0lPJyB8fCBtb2RlbC5lc3RhZG9WaWFqZT09J0VOIFNFUlZJQ0lPJyl7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLnNldE1hcmNhZG9yVmFuKG1vZGVsLnZlaGljdWxvLmxhdGl0dWQsbW9kZWwudmVoaWN1bG8ubG9uZ2l0dWQsJ2NvbmR1Y3RvcicsMCk7ICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgXG5cbiAgICAgICAgbW9kZWwudGltZW91dCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIG1vZGVsLm15U2VydmljZS5nZXRVYmljYWNpb25WZWhpY3Vsbyh0aGlzLnBsYWNhKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgLy90aGlzLnViaWNhclZlaGljdWxvKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgbW9kZWwudmVoaWN1bG8gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1ZFSElDVUxPJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobW9kZWwudmVoaWN1bG8pO1xuICAgICAgICAgICAgICAgIGlmKG1vZGVsLmVzdGFkb1ZpYWplPT0nRU4gUFVOVE8gREUgSU5JQ0lPJyB8fCBtb2RlbC5lc3RhZG9WaWFqZT09J0VOIFNFUlZJQ0lPJyl7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLnNldE1hcmNhZG9yVmFuKG1vZGVsLnZlaGljdWxvLmxhdGl0dWQsbW9kZWwudmVoaWN1bG8ubG9uZ2l0dWQsJ2NvbmR1Y3RvcicsMCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgIH1cbiAgICB1YmljYXJWYW4oKXtcbiAgICAgICAgbGV0IG1vZGVsID0gdGhpcztcbiAgICAgICAgbW9kZWwubWFwVmlldy5sYXRpdHVkZSA9IG1vZGVsLnZlaGljdWxvLmxhdGl0dWQqMTtcbiAgICAgICAgbW9kZWwubWFwVmlldy5sb25naXR1ZGUgPSBtb2RlbC52ZWhpY3Vsby5sb25naXR1ZCoxO1xuICAgIH1cbiAgICBzZXRNYXJjYWRvclZhbihsYXQsbG9uLHRpcG8saWQpe1xuICAgICAgICBjb25zb2xlLmxvZygnU2V0ZWFuZG8gbWFyY2Fkb3IgZGUgbGEgVkFOJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdQaW50YW5kbyBtYXJjYWRvcjogJytsYXQrJyAtICcrbG9uKycgLSAnK3RpcG8pO1xuICAgICAgICBsZXQgbW9kZWwgPSB0aGlzO1xuICAgICAgICBpZighbW9kZWwudmFuKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDcmVhbmRvIHZhbiBkZSBjZXJvJyk7XG4gICAgICAgICAgICBtb2RlbC52YW4gPSBuZXcgTWFya2VyKCk7XG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZU1vZHVsZS5JbWFnZSgpO1xuICAgICAgICAgICAgaW1hZ2Uud2lkdGg9MjA7IFxuICAgICAgICAgICAgaW1hZ2UuaGVpZ2h0PTIwOyBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaW1hZ2UuaW1hZ2VTb3VyY2UgPSBpbWFnZVNvdXJjZS5mcm9tUmVzb3VyY2UoJ3ZhbicpO1xuXG4gICAgICAgICAgICBtb2RlbC52YW4udGl0bGUgPSBcIlViaWNhY2nDs24gZGVsIHZlaMOtY3Vsb1wiOyAgXG4gICAgICAgICAgICBtb2RlbC52YW4ucG9zaXRpb24gPSBQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcobGF0LCBsb24pO1xuICAgICAgICAgICAgbW9kZWwudmFuLmljb249aW1hZ2U7XG4gICAgICAgICAgICBtb2RlbC52YW4uc25pcHBldCA9ICdEZXNjcmlwY2nDs24gZGVsIHB1bnRvJztcbiAgICAgICAgICAgIG1vZGVsLnZhbi51c2VyRGF0YSA9IHtpbmRleDogMSxpZDogaWR9O1xuICAgICAgICAgICAgbW9kZWwubWFwVmlldy5hZGRNYXJrZXIobW9kZWwudmFuKTsgXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0FjdHVhbGl6YW5kbyB2YW4nKTtcbiAgICAgICAgICAgIG1vZGVsLnZhbi5wb3NpdGlvbiA9IFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhtb2RlbC52ZWhpY3Vsby5sYXRpdHVkLG1vZGVsLnZlaGljdWxvLmxvbmdpdHVkKTtcblxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgIFxuICAgIH1cblxuICAgIHNldE1hcmNhZG9yKGxhdCxsb24sdGlwbyxpZCxkYXRhMil7XG4gICAgICAgIGNvbnNvbGUubG9nKCdQaW50YW5kbyBtYXJjYWRvcjogJytsYXQrJyAtICcrbG9uKycgLSAnK3RpcG8pO1xuICAgICAgICB2YXIgbWFya2VyID0gbmV3IE1hcmtlcigpO1xuICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZU1vZHVsZS5JbWFnZSgpO1xuICAgICAgICBpbWFnZS53aWR0aD0yMDsgXG4gICAgICAgIGltYWdlLmhlaWdodD0yMDsgXG4gICAgICAgIG1hcmtlci5zbmlwcGV0ID0gJ0Rlc2NyaXBjacOzbiBkZWwgcHVudG8nO1xuICAgICAgICBpZih0aXBvID09ICdpbmljaW8nKXtcbiAgICAgICAgICAgIGltYWdlLmltYWdlU291cmNlID0gaW1hZ2VTb3VyY2UuZnJvbVJlc291cmNlKCdpbmljaW8nKTsgIFxuICAgICAgICAgICAgbWFya2VyLnRpdGxlID0gXCJQdW50byBkZSBpbmljaW9cIjtcbiAgICAgICAgfWVsc2UgaWYodGlwbyA9PSAnZmluJyl7XG4gICAgICAgICAgICBpbWFnZS5pbWFnZVNvdXJjZSA9IGltYWdlU291cmNlLmZyb21SZXNvdXJjZSgnZmluJyk7XG4gICAgICAgICAgICBtYXJrZXIudGl0bGUgPSBcIlB1bnRvIGZpbmFsXCI7XG4gICAgICAgIH1lbHNlIGlmKHRpcG8gPT0gJ3Bhc2FqZXJvJyl7XG4gICAgICAgICAgICBtYXJrZXIudGl0bGUgPSBcIlR1IHViaWNhY2nDs24gZGUgcmVjb2dpZGFcIjsgIFxuICAgICAgICAgICAgaW1hZ2UuaW1hZ2VTb3VyY2UgPSBpbWFnZVNvdXJjZS5mcm9tUmVzb3VyY2UoJ3Bhc2FqZXJvJyk7XG4gICAgICAgICAgICBtYXJrZXIuc25pcHBldCA9ICdEZWJlcyBlc3BlcmFyIGEgbGEgdmFuIGVuIGVzdGUgcHVudG8nO1xuICAgICAgICB9IFxuXG4gICAgICAgIFxuICAgICAgICBtYXJrZXIucG9zaXRpb24gPSBQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcobGF0LCBsb24pO1xuICAgICAgICBtYXJrZXIuaWNvbj1pbWFnZTtcbiAgICAgICAgXG4gICAgICAgIG1hcmtlci51c2VyRGF0YSA9IHtpbmRleDogMSxpZDogaWR9O1xuICAgICAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKG1hcmtlcik7IFxuICAgIH1cblxuICAgIGRpYnVqYXJSdXRhKGxhdCxsb24sbGF0Mixsb24yLHBhcmFkYXMpIHtcbiAgICAgICAgbG9hZGVyLnNob3coKTtcbiAgICAgICAgdGhpcy5teVNlcnZpY2UuZ2V0RGF0YShsYXQsbG9uLGxhdDIsbG9uMixwYXJhZGFzKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFTdWNjZXNzKHJlc3VsdCk7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBjaGVja0luKCl7XG4gICAgICAgIGxldCBtb2RlbCA9IHRoaXM7XG4gICAgICAgIGRpYWxvZ3MuY29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogXCJDaGVjay1JbiBWaWFqZVwiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCLCv0Rlc2VhcyBoYWNlciBDaGVjay1pbiBlbiBlc3RlIHZpYWplP1wiLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIkNoZWNrLUluXCIsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbGFyXCIsXG4gICAgICAgICAgICAvL25ldXRyYWxCdXR0b25UZXh0OiBcIk5ldXRyYWwgdGV4dFwiLFxuICAgICAgICAgICAgLy9kZWZhdWx0VGV4dDogXCJEZWZhdWx0IHRleHRcIixcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgaWYocil7XG4gICAgICAgICAgICAgICAgaWYobW9kZWwudG9rZW5zQ3VuZHVjdG9yLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICBsZXQgbm9tYnJlcyA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdub21icmVVc3VhcmlvJyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpZFBhc2FqZXJvID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ2lkVXN1YXJpbycpO1xuXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLm15U2VydmljZS5yZWdpc3RyYXJQYXNhamVybyhtb2RlbC5pZHZpYWplLGlkUGFzYWplcm8sJzEnLCcwJywnMCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlIHJlZ2lzdHJvIGRlIHBhc2FqZXJvJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5teVNlcnZpY2UuZW52aWFyUHVzaENoZWNraW4oZW5jb2RlVVJJKG5vbWJyZXMrJyBzZSBoYSBzdWJpZG8gYSBsYSB2YW4nKSxtb2RlbC50b2tlbnNDdW5kdWN0b3IsbW9kZWwuaWR2aWFqZSxtb2RlbC5pZHJ1dGEsaWRQYXNhamVybyxub21icmVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzdWx0YWRvIGRlbCBwdXNoJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3VsdDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTGlzdG9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkNoZWNrLUluIHJlYWxpemFkbyBleGl0b3NhbWVudGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5jaGVja2luPWZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQ2hlY2stSW4gZmFsbGlkb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiRWwgY2hlY2staW4gbm8gcHVkbyBzZXIgcmVhbGl6YWRvLiBJbnRlbnRhIGRlIG51ZXZvIHBvciBmYXZvci5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvciBjb25kdWN0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVHUgbWVuc2FqZSBubyBwdWRvIHNlciBlbnRyZWdhZG8uIEVsIGNvbmR1Y3RvciBubyB0aWVuZSBkaXNwb3NpdGl2b3MgYXNpZ25hZG9zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkdldERhdGFTdWNjZXNzKHJlcykge1xuICAgICAgICB0aGlzLmVuY29kZWRQb2ludHMgPSBwbC5kZWNvZGUocmVzLnJvdXRlc1swXS5vdmVydmlld19wb2x5bGluZS5wb2ludHMpO1xuICAgICAgICBjb25zb2xlLmxvZygnQVFVSSBWQU4gTE9TIFBVTlRPUycpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmVuY29kZWRQb2ludHMpOyBcbiAgICAgICAgY29uc3QgbWFwID0gdGhpcy5tYXBWaWV3O1xuICAgICAgICBjb25zdCBtb2RlbCA9IHRoaXM7XG5cbiAgICAgICAgbGV0IGxpc3QgPSB0aGlzLmVuY29kZWRQb2ludHM7XG5cbiAgICAgICAgbGV0IGxpbmUgPSBuZXcgUG9seWxpbmUoKTtcbiAgICAgICAgbGluZS52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgbGluZS53aWR0aCA9IDQ7XG4gICAgICAgIGxpbmUuY29sb3IgPSBuZXcgQ29sb3IoJyMxNTNkN2EnKTtcbiAgICAgICAgbGluZS5nZW9kZXNpYyA9IHRydWU7XG4gICAgICAgIGxpbmUuY2xpY2thYmxlPXRydWU7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsaW5lLmFkZFBvaW50KFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhsaXN0W2ldWzBdLGxpc3RbaV1bMV0pKTtcbiAgICAgICAgfVxuICAgICAgICBcblxuICAgICAgICBtYXAuYWRkUG9seWxpbmUobGluZSk7XG5cbiAgICAgICAgbG9hZGVyLmhpZGUoKTtcblxuICAgIH1cblxuICAgIHByaXZhdGUgb25HZXREYXRhRXJyb3IoZXJyb3I6IFJlc3BvbnNlIHwgYW55KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25HZXREYXRhRXJyb3I6IFwiICsgSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICB9XG59XG4iXX0=