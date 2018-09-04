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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlhamUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmlhamUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBFQUEwRTtBQUMxRSw2RUFBeUY7QUFDekYsc0RBQTZEO0FBQzdELDBEQUE0RDtBQUM1RCxpRkFBZ0U7QUFDaEUsNENBQTJDO0FBQzNDLDBDQUFpRDtBQUNqRCwyREFBNkQ7QUFDN0QsdURBQXlEO0FBQ3pELCtCQUE0QjtBQUM1QixvQ0FBc0M7QUFDdEMsc0RBQXdEO0FBQ3hELGtDQUFvQztBQUNwQyxvQ0FBc0M7QUFFdEMsZ0NBQStCO0FBQy9COzs7Ozs4REFLOEQ7QUFDOUQsb0ZBQW9GO0FBQ3BGLElBQUksTUFBTSxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztBQWVwQztJQXFXSSx3QkFBb0IsZ0JBQWtDLEVBQVUsU0FBcUIsRUFBUyxLQUFxQixFQUFTLElBQVU7UUFBdEksaUJBY0M7UUFkbUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVk7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFTLFNBQUksR0FBSixJQUFJLENBQU07UUFuV3RJLDJEQUEyRDtRQUMzRCxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBT2IsYUFBUSxHQUFDLFFBQVEsQ0FBQyxDQUFDLDhCQUE4QjtRQUNqRCxjQUFTLEdBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTO1FBTy9CLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDVixZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLFlBQU8sR0FBRyxDQUFDLENBQUM7UUFDWixTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ1QsWUFBTyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFNM0IsY0FBUyxHQUFTLEtB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QUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7UUFHRCxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUVsQixDQUFDO0lBRU8sdUNBQWMsR0FBdEIsVUFBdUIsS0FBcUI7UUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQTczQlEsY0FBYztRQUwxQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE9BQU87WUFDakIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx3QkFBd0I7U0FDeEMsQ0FBQzt5Q0FzV3dDLHlCQUFnQixFQUFxQix1QkFBVSxFQUFnQix1QkFBYyxFQUFlLFdBQUk7T0FyVzdILGNBQWMsQ0E4M0IxQjtJQUFELHFCQUFDO0NBQUEsQUE5M0JELElBODNCQztBQTkzQlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG4vL2ltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnknO1xuaW1wb3J0IHsgTWFwVmlldywgTWFya2VyLCBQb3NpdGlvbiwgUG9seWxpbmUsIFN0eWxlfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrJztcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7TG9hZGluZ0luZGljYXRvcn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xuaW1wb3J0IHsgV2ViU2VydmljZSB9IGZyb20gXCIuLi93cy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCAqIGFzIGltYWdlU291cmNlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ltYWdlLXNvdXJjZVwiO1xuaW1wb3J0ICogYXMgSW1hZ2VNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvaW1hZ2VcIjtcbmltcG9ydCB7Q29sb3J9IGZyb20gJ2NvbG9yJztcbmltcG9ydCAqIGFzIHBsIGZyb20gJ2dvb2dsZS1wb2x5bGluZSc7XG5pbXBvcnQgKiBhcyBnZW9sb2NhdGlvbiBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XG5pbXBvcnQgeyBBY2N1cmFjeSB9IGZyb20gXCJ1aS9lbnVtc1wiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0ICogYXMgb2JzZXJ2YWJsZUFycmF5IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7IFxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiogQmVmb3JlIHlvdSBjYW4gbmF2aWdhdGUgdG8gdGhpcyBwYWdlIGZyb20geW91ciBhcHAsIHlvdSBuZWVkIHRvIHJlZmVyZW5jZSB0aGlzIHBhZ2UncyBtb2R1bGUgaW4gdGhlXG4qIGdsb2JhbCBhcHAgcm91dGVyIG1vZHVsZS4gQWRkIHRoZSBmb2xsb3dpbmcgb2JqZWN0IHRvIHRoZSBnbG9iYWwgYXJyYXkgb2Ygcm91dGVzOlxuKiB7IHBhdGg6IFwidmlhamVcIiwgbG9hZENoaWxkcmVuOiBcIi4vdmlhamUvdmlhamUubW9kdWxlI1ZpYWplTW9kdWxlXCIgfVxuKiBOb3RlIHRoYXQgdGhpcyBzaW1wbHkgcG9pbnRzIHRoZSBwYXRoIHRvIHRoZSBwYWdlIG1vZHVsZSBmaWxlLiBJZiB5b3UgbW92ZSB0aGUgcGFnZSwgeW91IG5lZWQgdG8gdXBkYXRlIHRoZSByb3V0ZSB0b28uXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLy9yZWdpc3RlckVsZW1lbnQoXCJNYXBWaWV3XCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrXCIpLk1hcFZpZXcpO1xubGV0IGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XG4vKmNsYXNzIFZlaGljdWxvIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbGF0aXR1ZDogbnVtYmVyLCBwdWJsaWMgbG9uZ2l0dWQ6IG51bWJlciwgcHVibGljIHBsYWNhX3Y6c3RyaW5nKSB7IH0gICBcbn0qL1xuaW50ZXJmYWNlIFZlaGljdWxvIHtcbiAgICBsYXRpdHVkOiBudW1iZXIsXG4gICAgbG9uZ2l0dWQ6IG51bWJlcixcbiAgICBwbGFjYTogc3RyaW5nXG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIlZpYWplXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3ZpYWplLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgVmlhamVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHB1YmxpYyBlbmNvZGVkUG9pbnRzOmFueTtcbiAgICAvL3B1YmxpYyBwYXJhZGFzID0gbmV3IG9ic2VydmFibGVBcnJheS5PYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgIHBhcmFkYXMgPSBbXTtcbiAgICBpZHJ1dGE6IG51bWJlcjtcbiAgICBpZHZpYWplOiBudW1iZXI7XG4gICAgaWRjb25kdWN0b3I6IG51bWJlcjtcbiAgICBwbGFjYTpzdHJpbmc7XG5cblxuICAgIGxhdGl0dWRlPTQuNTg3Nzk5OyAvL0NvbG9tYmlhNC41ODc3OTksIC03My45NDA5NjBcbiAgICBsb25naXR1ZGU9LTczLjk0MDk2MDsgLy9DbG9tYmlhXG5cbiAgICBsYXRJbmljaWFsOm51bWJlcjtcbiAgICBsb25JbmljaWFsOm51bWJlcjtcbiAgICBsYXRGaW5hbDpudW1iZXI7XG4gICAgbG9uRmluYWw6bnVtYmVyO1xuXG4gICAgem9vbSA9IDE1O1xuICAgIG1pblpvb20gPSAwOyBcbiAgICBtYXhab29tID0gMjI7XG4gICAgYmVhcmluZyA9IDA7XG4gICAgdGlsdCA9IDA7XG4gICAgcGFkZGluZyA9IFs0MCwgNDAsIDQwLCA0MF07XG4gICAgbWFwVmlldzogTWFwVmlldztcbiAgICBsYXN0Q2FtZXJhOiBTdHJpbmc7XG4gICAgdmVoaWN1bG86YW55O1xuICAgIHZhbjpNYXJrZXI7XG4gICAgdGltZW91dDphbnk7XG4gICAgcmVjb3JyaWRvOmJvb2xlYW49ZmFsc2U7XG4gICAgLy9wdWJsaWMgbWVuc2FqZXMgPSBuZXcgb2JzZXJ2YWJsZUFycmF5Lk9ic2VydmFibGVBcnJheShbXSk7XG4gICAgcHVibGljIG1lbnNhamVzPVtdOyBcbiAgICB0b2tlbnNDdW5kdWN0b3I9W107XG4gICAgcHVudG9SZWNvZ2lkYTphbnk7XG4gICAgY2hlY2tpbjpib29sZWFuPWZhbHNlO1xuICAgIG1vc3RyYXJWYW46Ym9vbGVhbj1mYWxzZTtcbiAgICBlc3RhZG9WaWFqZTpzdHJpbmc7XG5cbiAgICBzdHlsZXM9W1xuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuZmlsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjN2M5M2EzXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogXCItMTBcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZS5jb3VudHJ5XCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmUuY291bnRyeVwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuc3Ryb2tlXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNhMGE0YTVcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZS5wcm92aW5jZVwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuc3Ryb2tlXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM2MjgzOGVcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGVcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IFwiLTI5XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNkZGUzZTNcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGUubWFuX21hZGVcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZS5tYW5fbWFkZVwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGUubWFuX21hZGVcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjM2Y0YTUxXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ3ZWlnaHRcIjogXCIwLjMwXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiBcIjc0XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLmF0dHJhY3Rpb25cIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLmJ1c2luZXNzXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5nb3Zlcm5tZW50XCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kubWVkaWNhbFwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kucGFya1wiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kucGxhY2Vfb2Zfd29yc2hpcFwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kuc2Nob29sXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kuc3BvcnRzX2NvbXBsZXhcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwic2F0dXJhdGlvblwiOiBcIi0xMDBcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNiYmNhY2ZcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IFwiMFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjYmJjYWNmXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ3ZWlnaHRcIjogXCIwLjUwXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHNcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHRcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheS5jb250cm9sbGVkX2FjY2Vzc1wiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5LmNvbnRyb2xsZWRfYWNjZXNzXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2E5YjRiOFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuYXJ0ZXJpYWxcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy5pY29uXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJpbnZlcnRfbGlnaHRuZXNzXCI6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJzYXR1cmF0aW9uXCI6IFwiLTdcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiBcIjNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImdhbW1hXCI6IFwiMS44MFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwid2VpZ2h0XCI6IFwiMC4wMVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQubG9jYWxcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdFwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdC5zdGF0aW9uLmJ1c1wiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjYTNjN2RmXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH1cbl07XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSBteVNlcnZpY2U6IFdlYlNlcnZpY2UscHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUscHJpdmF0ZSBwYWdlOiBQYWdlKSB7XG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogVXNlIHRoZSBjb25zdHJ1Y3RvciB0byBpbmplY3QgYXBwIHNlcnZpY2VzIHRoYXQgeW91IG5lZWQgaW4gdGhpcyBjb21wb25lbnQuXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgICAgIHRoaXMucm91dGUucGFyYW1zXG4gICAgICAgICAgLmZvckVhY2goKHBhcmFtcykgPT4geyBcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1BhcmFtZXRyb3MgZGUgdXJsJyk7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHBhcmFtcykpO1xuICAgICAgICAgICAgICB0aGlzLmlkcnV0YSA9ICtwYXJhbXNbXCJpZHJ1dGFcIl07IFxuICAgICAgICAgICAgICB0aGlzLmlkdmlhamUgPSArcGFyYW1zW1wiaWR2aWFqZVwiXTsgXG4gICAgICAgICAgICAgIHRoaXMuaWRjb25kdWN0b3IgPSArcGFyYW1zW1wiaWRjb25kdWN0b3JcIl07IFxuICAgICAgICAgICAgICB0aGlzLnBsYWNhID0gcGFyYW1zW1wicGxhY2FcIl07IFxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmlkcnV0YSsnIC0gJyt0aGlzLmlkdmlhamUrJyAtICcrdGhpcy5wbGFjYSk7XG4gICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogVXNlIHRoZSBcIm5nT25Jbml0XCIgaGFuZGxlciB0byBpbml0aWFsaXplIGRhdGEgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgICAgICBjb25zdCBpZENvbmR1Y3RvciA9IHRoaXMuaWRjb25kdWN0b3I7XG4gICAgICAgIGxldCBtb2RlbCA9IHRoaXM7XG5cbiAgICAgICAgLypjb25zb2xlLmxvZygnVG9rZW4gUFVTSDogJytBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygndG9rZW5QdXNoJykpO1xuICAgICAgICB0aGlzLnRva2Vuc0N1bmR1Y3Rvci5wdXNoKEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCd0b2tlblB1c2gnKSk7XG4gICAgICAgIHRoaXMudG9rZW5zQ3VuZHVjdG9yLnB1c2goJ2NodXBlbG9mdWVydGUnKTtcbiAgICAgICAgKi9cbiAgICAgICAgbW9kZWwucGFnZS5vbignbmF2aWdhdGluZ1RvJywgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFbnRyYW5kbyBhIGxhIHZpc3RhJyk7XG4gICAgICAgICAgICAvLyBydW4gaW5pdCBjb2RlXG4gICAgICAgICAgICAvLyAobm90ZTogdGhpcyB3aWxsIHJ1biB3aGVuIHlvdSBlaXRoZXIgbW92ZSBmb3J3YXJkIG9yIGJhY2sgdG8gdGhpcyBwYWdlKVxuICAgICAgICB9KTtcblxuICAgICAgICBtb2RlbC5wYWdlLm9uKCduYXZpZ2F0aW5nRnJvbScsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU2FsaWVuZG8gZGUgbGEgdmlzdGEnKTtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwobW9kZWwudGltZW91dCk7IFxuICAgICAgICAgICAgLy8gcnVuIGRlc3Ryb3kgY29kZVxuICAgICAgICAgICAgLy8gKG5vdGU6IHRoaXMgd2lsbCBydW4gd2hlbiB5b3UgZWl0aGVyIG1vdmUgZm9yd2FyZCB0byBhIG5ldyBwYWdlIG9yIGJhY2sgdG8gdGhlIHByZXZpb3VzIHBhZ2UpXG4gICAgICAgIH0pOyBcbiAgICAgICAgbW9kZWwubXlTZXJ2aWNlLmdldE1lbnNhamVzKClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXN1bHRhZG8gZGUgbWVuc2FqZXMnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPE9iamVjdC5rZXlzKHJlc3VsdCkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1BpbnRhbmRvIGE6Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdFtpXSk7IC8vIFwic3BlY2llc1wiXG5cbiAgICAgICAgICAgICAgICAgICAgbW9kZWwubWVuc2FqZXMucHVzaChyZXN1bHRbaV0udGV4dG8pOyAgXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1vZGVsLm1lbnNhamVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBtb2RlbC5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTsgXG5cbiAgICAgICAgXG4gICAgICAgIG1vZGVsLm15U2VydmljZS5nZXRUb2tlbnNDb25kdWN0b3IoaWRDb25kdWN0b3IpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzdWx0YWRvIGRlIHRva2VucyBjb25kdWN0b3I6ICcraWRDb25kdWN0b3IpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXMocmVzdWx0KS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUGludGFuZG8gYTonKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0W2ldKTsgLy8gXCJzcGVjaWVzXCJcblxuICAgICAgICAgICAgICAgICAgICBtb2RlbC50b2tlbnNDdW5kdWN0b3IucHVzaChyZXN1bHRbaV0udG9rZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIG1vZGVsLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICB9XG4gICAgY2FuY2VsYXIoKXtcbiAgICAgICAgZGlhbG9ncy5jb25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkNhbmNlbGFyIHJlc2VydmFcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiwr9SZWFsbWVudGUgZGVzZWFzIGNhbmNlbGFyIGVzdGEgcmVzZXJ2YT9cIixcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJTaSwgY2FuY2VsYXJsYVwiLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJOb1wiXG4gICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIC8vIHJlc3VsdCBhcmd1bWVudCBpcyBib29sZWFuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyByZXN1bHQ6IFwiICsgcmVzdWx0KTtcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlJlc2VydmEgY2FuY2VsYWRhXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJUdSByZXNlcnZhIGhhIHNpZG8gY2FuY2VsYWRhIGV4aXRvc2FtZW50ZVwiLFxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPa1wiXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcmVzZXJ2YXNcIl0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB1YmljYXIoKXtcbiAgICAgICAgbGV0IG1vZGVsID0gdGhpcztcbiAgICAgICAgZ2VvbG9jYXRpb24uaXNFbmFibGVkKCkudGhlbihmdW5jdGlvbiAoaXNFbmFibGVkKSB7XG4gICAgICAgICAgICBpZiAoaXNFbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxvY2F0aW9uID0gZ2VvbG9jYXRpb24uZ2V0Q3VycmVudExvY2F0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgZGVzaXJlZEFjY3VyYWN5OiBBY2N1cmFjeS5oaWdoLFxuICAgICAgICAgICAgICAgICAgICBtYXhpbXVtQWdlOiA1MDAwLFxuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0OiAxMDAwMFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChsb2MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5sYXRpdHVkZSA9IGxvYy5sYXRpdHVkZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5sb25naXR1ZGUgPSBsb2MubG9uZ2l0dWRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbW9kZWwuc2V0TWFyY2Fkb3IobG9jLmxhdGl0dWRlLGxvYy5sb25naXR1ZGUsJ3Bhc2FqZXJvJywyLG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyAoZS5tZXNzYWdlIHx8IGUpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBnZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIChlLm1lc3NhZ2UgfHwgZSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyAoZS5tZXNzYWdlIHx8IGUpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlyQXRyYXMoKSB7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG4gICAgfVxuICAgIGNvbnRhY3Rhcigpe1xuICAgICAgICBsZXQgbW9kZWwgPSB0aGlzO1xuICAgICAgICBkaWFsb2dzLnByb21wdCh7XG4gICAgICAgICAgICB0aXRsZTogXCJDb250YWN0YXJcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiRW52w61hIHVuIG1lbnNhamUgYWwgY29uZHVjdG9yXCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiRW52aWFyXCIsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbGFyXCIsXG4gICAgICAgICAgICAvL25ldXRyYWxCdXR0b25UZXh0OiBcIk5ldXRyYWwgdGV4dFwiLFxuICAgICAgICAgICAgLy9kZWZhdWx0VGV4dDogXCJEZWZhdWx0IHRleHRcIixcbiAgICAgICAgICAgIGlucHV0VHlwZTogZGlhbG9ncy5pbnB1dFR5cGUudGV4dFxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyByZXN1bHQ6IFwiICsgci5yZXN1bHQgKyBcIiwgdGV4dDogXCIgKyByLnRleHQpO1xuICAgICAgICAgICAgaWYoci5yZXN1bHQpe1xuICAgICAgICAgICAgICAgIGlmKG1vZGVsLnRva2Vuc0N1bmR1Y3Rvci5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwubXlTZXJ2aWNlLmVudmlhclB1c2gobW9kZWwudG9rZW5zQ3VuZHVjdG9yLGVuY29kZVVSSShyLnRleHQpKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzdWx0YWRvIGRlbCBwdXNoJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3VsdDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTWVuc2FqZSBlbnZpYWRvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJUdSBtZW5zYWplIGZ1ZSBlbnZpYWRvIGV4aXRvc2FtZW50ZSBhbCBjb25kdWN0b3IuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJNZW5zYWplIGZhbGxpZG9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlR1IG1lbnNhamUgbm8gcHVkbyBzZXIgZW50cmVnYWRvLiBJbnRlbnRhIGRlIG51ZXZvIHBvciBmYXZvci5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvciBjb25kdWN0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVHUgbWVuc2FqZSBubyBwdWRvIHNlciBlbnRyZWdhZG8uIEVsIGNvbmR1Y3RvciBubyB0aWVuZSBkaXNwb3NpdGl2b3MgYXNpZ25hZG9zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICAgICAgLypkaWFsb2dzLmFjdGlvbih7XG4gICAgICAgICAgICBtZXNzYWdlOiBcIkVudsOtYSB1biBtZW5zYWplIGFsIGNvbmR1Y3RvclwiLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxhclwiLFxuICAgICAgICAgICAgYWN0aW9uczogdGhpcy5tZW5zYWplc1xuICAgICAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyByZXN1bHQ6IFwiICsgcmVzdWx0KTtcbiAgICAgICAgICAgIGlmKHJlc3VsdCAhPSAnQ2FuY2VsYXInKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnRva2Vuc0N1bmR1Y3Rvci5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5teVNlcnZpY2UuZW52aWFyUHVzaCh0aGlzLnRva2Vuc0N1bmR1Y3RvcixlbmNvZGVVUkkocmVzdWx0KSlcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0MikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3VsdGFkbyBkZWwgcHVzaCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyZXN1bHQyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk1lbnNhamUgZW52aWFkb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVHUgbWVuc2FqZSBmdWUgZW52aWFkbyBleGl0b3NhbWVudGUgYWwgY29uZHVjdG9yLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPa1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTWVuc2FqZSBmYWxsaWRvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJUdSBtZW5zYWplIG5vIHB1ZG8gc2VyIGVudHJlZ2Fkby4gSW50ZW50YSBkZSBudWV2byBwb3IgZmF2b3IuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRXJyb3IgY29uZHVjdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlR1IG1lbnNhamUgbm8gcHVkbyBzZXIgZW50cmVnYWRvLiBFbCBjb25kdWN0b3Igbm8gdGllbmUgZGlzcG9zaXRpdm9zIGFzaWduYWRvc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9rXCJcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfSk7Ki9cbiAgICB9XG4gICAgb25NYXBSZWFkeShldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnTWFwIFJlYWR5Jyk7XG5cbiAgICAgICAgdGhpcy5tYXBWaWV3ID0gZXZlbnQub2JqZWN0O1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2V0dGluZyBhIG1hcmtlci4uLlwiKTtcblxuICAgICAgICBsb2FkZXIuc2hvdygpO1xuICAgICAgICBsZXQgbW9kZWwgPSB0aGlzO1xuICAgICAgICBtb2RlbC5tYXBWaWV3LnNldFN0eWxlKDxTdHlsZT4odGhpcy5zdHlsZXMpKTtcblxuICAgICAgICBtb2RlbC5teVNlcnZpY2UuZ2V0RGF0b3NWaWFqZShtb2RlbC5pZHZpYWplKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0OmFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXN1bHRhZG8gZGVsIHZpYWplOiAnK21vZGVsLmlkdmlhamUpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgaWYocmVzdWx0WzBdLmVzdGFkbyA9PSBcIkVOIFBVTlRPIERFIElOSUNJT1wiIHx8IHJlc3VsdFswXS5lc3RhZG8gPT0gXCJFTiBTRVJWSUNJT1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLm1vc3RyYXJWYW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtb2RlbC5lc3RhZG9WaWFqZSA9IHJlc3VsdFswXS5lc3RhZG87XG4gICAgICAgICAgICAgICAgbW9kZWwubXlTZXJ2aWNlLmdldFBlcnNvbmFzKG1vZGVsLmlkdmlhamUpLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlIGxvcyBwYXNhamVyb3MgZGVsIHZpYWplOiAnK09iamVjdC5rZXlzKHJlcykubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXMpKTtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDxPYmplY3Qua2V5cyhyZXMpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEZXRhbGxlIGRlIHB1bnRvJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc1tpXSkpO1xuICAgICAgICAgICAgICAgICAgICBpZihyZXNbaV0uaWRwYXNhamVybyA9PT0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ2lkVXN1YXJpbycpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEZXRhbGxlcyBkZWwgcGFzYWplcm8nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5sYXRpdHVkZSA9IHJlc1tpXS5sYXRpdHVkKjE7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5sb25naXR1ZGUgPSByZXNbaV0ubG9uZ2l0dWQqMTsgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5zZXRNYXJjYWRvcihyZXNbaV0ubGF0aXR1ZCoxLHJlc1tpXS5sb25naXR1ZCoxLCdwYXNhamVybycscmVzW2ldLm5vbWJyZXBhc2FqZXJvLHJlc1tpXS5kaXJlY2Npb24pOyAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzW2ldLmVzdGFkb3B2PT0nMCcgJiYgKG1vZGVsLmVzdGFkb1ZpYWplPT0nRU4gU0VSVklDSU8nIHx8IG1vZGVsLmVzdGFkb1ZpYWplPT0nRU4gUFVOVE8gREUgSU5JQ0lPJykpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmNoZWNraW49dHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vbW9kZWwucGFyYWRhcy5wdXNoKFtQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcocmVzW2ldLmxhdGl0dWQscmVzW2ldLmxvbmdpdHVkKSxyZXNbaV0ubm9tYnJlcGFzYWplcm9dKTsgXG4gICAgICAgICAgICAgICAgICAgIC8qaWYocmVzW2ldLmVzdGFkb3B2ID09IFwiMFwiKXsgLy9TSSBlbCBwYXNhamVybyBubyBzZSBoYSBzdWJpZG9cbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLnNldE1hcmNhZG9yKHJlc1tpXS5sYXRpdHVkKjEscmVzW2ldLmxvbmdpdHVkKjEsJ3Bhc2FqZXJvJyxyZXNbaV0ubm9tYnJlcGFzYWplcm8scmVzW2ldLmRpcmVjY2lvbik7ICAgIFxuICAgICAgICAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgdHJheWVuZG8gbG9zIHBhcmFkZXJvcyBkZWwgdmlhamUnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIG1vZGVsLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pOyBcblxuXG4gICAgICAgIFxuXG4gICAgICAgIHRoaXMubXlTZXJ2aWNlLmdldFB1bnRvc1J1dGEodGhpcy5pZHJ1dGEpLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGUgbGEgcnV0YTogJyttb2RlbC5pZHJ1dGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzKSk7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDxPYmplY3Qua2V5cyhyZXMpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0RldGFsbGUgZGUgcHVudG8nKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXNbaV0pKTtcbiAgICAgICAgICAgICAgICBpZihyZXNbaV0udGlwbyA9PSAnSU5JQ0lPJyl7XG5cbiAgICAgICAgICAgICAgICAgICAgbW9kZWwubGF0SW5pY2lhbCA9IHJlc1tpXS5sYXRpdHVkO1xuICAgICAgICAgICAgICAgICAgICBtb2RlbC5sb25JbmljaWFsID0gcmVzW2ldLmxvbmdpdHVkO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vbW9kZWwubGF0aXR1ZGUgPSByZXNbaV0ubGF0aXR1ZCoxO1xuICAgICAgICAgICAgICAgICAgICAvL21vZGVsLmxvbmdpdHVkZSA9IHJlc1tpXS5sb25naXR1ZCoxO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdMQVQ6ICcrbW9kZWwubGF0aXR1ZGUrJyAtIExPTjogJyttb2RlbC5sb25naXR1ZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihyZXNbaV0udGlwbyA9PSAnRklOJyl7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmxhdEZpbmFsID0gcmVzW2ldLmxhdGl0dWQ7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmxvbkZpbmFsID0gcmVzW2ldLmxvbmdpdHVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihyZXNbaV0udGlwbyA9PSAnTk9STUFMJyl7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLnBhcmFkYXMucHVzaChbUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKHJlc1tpXS5sYXRpdHVkLHJlc1tpXS5sb25naXR1ZCkscmVzW2ldLmlkcGFyYWRhXSk7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1B1bnRvIGluaWNpYWw6IExBVDonK21vZGVsLmxhdEluaWNpYWwrJyAtIExPTjonK21vZGVsLmxvbkluaWNpYWwpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1B1bnRvIGZpbmFsOiBMQVQ6Jyttb2RlbC5sYXRGaW5hbCsnIC0gTE9OOicrbW9kZWwubG9uRmluYWwpO1xuICAgICAgICAgICAgbW9kZWwuc2V0TWFyY2Fkb3IobW9kZWwubGF0SW5pY2lhbCxtb2RlbC5sb25JbmljaWFsLCdpbmljaW8nLDAsbnVsbCk7XG4gICAgICAgICAgICBtb2RlbC5zZXRNYXJjYWRvcihtb2RlbC5sYXRGaW5hbCxtb2RlbC5sb25GaW5hbCwnZmluJywwLG51bGwpO1xuICAgICAgICAgICAgLy9tb2RlbC5zZXRNYXJjYWRvcihtb2RlbC52ZWhpY3Vsby5sYXRpdHVkLG1vZGVsLnZlaGljdWxvLmxhdGl0dWQsJ2NvbmR1Y3RvcicsMCk7XG4gICAgICAgICAgICBtb2RlbC51YmljYXJWZWhpY3VsbygpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1BBUkFEQVMgTk9STUFMRVMnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG1vZGVsLnBhcmFkYXMpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKCFtb2RlbC5yZWNvcnJpZG8peyBcbiAgICAgICAgICAgICAgICBtb2RlbC5kaWJ1amFyUnV0YShtb2RlbC5sYXRJbmljaWFsLG1vZGVsLmxvbkluaWNpYWwsbW9kZWwubGF0RmluYWwsbW9kZWwubG9uRmluYWwsbW9kZWwucGFyYWRhcyk7ICBcbiAgICAgICAgICAgICAgICBtb2RlbC5yZWNvcnJpZG89dHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgIFxuXG5cbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICAgICAgdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgIH0pOyBcblxuXG5cbiAgICB9XG4gICAgb25Db29yZGluYXRlVGFwcGVkKGFyZ3MpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJDb29yZGluYXRlIFRhcHBlZCwgTGF0OiBcIiArIGFyZ3MucG9zaXRpb24ubGF0aXR1ZGUgKyBcIiwgTG9uOiBcIiArIGFyZ3MucG9zaXRpb24ubG9uZ2l0dWRlLCBhcmdzKTtcbiAgICB9XG5cbiAgICBvbk1hcmtlckV2ZW50KGFyZ3MpIHtcbiAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICB0aXRsZTogXCJQdW50byBkZSByZWNvZ2lkYVwiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJFc3RlIGVzIGVsIHB1bnRvIGRlIHJlY29naWRhIGRlIHR1IHZpYWplLiDCoURlYmVzIGVzdGFyIGF0ZW50byFcIixcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPa1wiXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgfSk7XG4gICAgfSBcblxuICAgIG9uQ2FtZXJhQ2hhbmdlZChhcmdzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2FtZXJhIGNoYW5nZWQ6IFwiICsgSlNPTi5zdHJpbmdpZnkoYXJncy5jYW1lcmEpLCBKU09OLnN0cmluZ2lmeShhcmdzLmNhbWVyYSkgPT09IHRoaXMubGFzdENhbWVyYSk7XG4gICAgICAgIHRoaXMubGFzdENhbWVyYSA9IEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKTtcbiAgICB9IFxuICAgIHViaWNhclZlaGljdWxvKCl7XG4gICAgICAgIGxldCBtb2RlbCA9IHRoaXM7XG5cbiAgICAgICAgLy9CdXNjYXIgVkFOIGxhIHByaW1lciBcbiAgICAgICAgbW9kZWwubXlTZXJ2aWNlLmdldFViaWNhY2lvblZlaGljdWxvKHRoaXMucGxhY2EpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAvL3RoaXMudWJpY2FyVmVoaWN1bG8ocmVzdWx0KTtcbiAgICAgICAgICAgICAgICBtb2RlbC52ZWhpY3VsbyA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVkVISUNVTE8nKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtb2RlbC52ZWhpY3Vsbyk7XG4gICAgICAgICAgICAgICAgaWYobW9kZWwuZXN0YWRvVmlhamU9PSdFTiBQVU5UTyBERSBJTklDSU8nIHx8IG1vZGVsLmVzdGFkb1ZpYWplPT0nRU4gU0VSVklDSU8nKXtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuc2V0TWFyY2Fkb3JWYW4obW9kZWwudmVoaWN1bG8ubGF0aXR1ZCxtb2RlbC52ZWhpY3Vsby5sb25naXR1ZCwnY29uZHVjdG9yJywwKTsgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcblxuICAgICAgICBtb2RlbC50aW1lb3V0ID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgbW9kZWwubXlTZXJ2aWNlLmdldFViaWNhY2lvblZlaGljdWxvKHRoaXMucGxhY2EpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAvL3RoaXMudWJpY2FyVmVoaWN1bG8ocmVzdWx0KTtcbiAgICAgICAgICAgICAgICBtb2RlbC52ZWhpY3VsbyA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVkVISUNVTE8nKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtb2RlbC52ZWhpY3Vsbyk7XG4gICAgICAgICAgICAgICAgaWYobW9kZWwuZXN0YWRvVmlhamU9PSdFTiBQVU5UTyBERSBJTklDSU8nIHx8IG1vZGVsLmVzdGFkb1ZpYWplPT0nRU4gU0VSVklDSU8nKXtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuc2V0TWFyY2Fkb3JWYW4obW9kZWwudmVoaWN1bG8ubGF0aXR1ZCxtb2RlbC52ZWhpY3Vsby5sb25naXR1ZCwnY29uZHVjdG9yJywwKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgfVxuICAgIHViaWNhclZhbigpe1xuICAgICAgICBsZXQgbW9kZWwgPSB0aGlzO1xuICAgICAgICBtb2RlbC5tYXBWaWV3LmxhdGl0dWRlID0gbW9kZWwudmVoaWN1bG8ubGF0aXR1ZCoxO1xuICAgICAgICBtb2RlbC5tYXBWaWV3LmxvbmdpdHVkZSA9IG1vZGVsLnZlaGljdWxvLmxvbmdpdHVkKjE7XG4gICAgfVxuICAgIHNldE1hcmNhZG9yVmFuKGxhdCxsb24sdGlwbyxpZCl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdTZXRlYW5kbyBtYXJjYWRvciBkZSBsYSBWQU4nKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1BpbnRhbmRvIG1hcmNhZG9yOiAnK2xhdCsnIC0gJytsb24rJyAtICcrdGlwbyk7XG4gICAgICAgIGxldCBtb2RlbCA9IHRoaXM7XG4gICAgICAgIGlmKCFtb2RlbC52YW4pe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0NyZWFuZG8gdmFuIGRlIGNlcm8nKTtcbiAgICAgICAgICAgIG1vZGVsLnZhbiA9IG5ldyBNYXJrZXIoKTtcbiAgICAgICAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlTW9kdWxlLkltYWdlKCk7XG4gICAgICAgICAgICBpbWFnZS53aWR0aD0yMDsgXG4gICAgICAgICAgICBpbWFnZS5oZWlnaHQ9MjA7IFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpbWFnZS5pbWFnZVNvdXJjZSA9IGltYWdlU291cmNlLmZyb21SZXNvdXJjZSgndmFuJyk7XG5cbiAgICAgICAgICAgIG1vZGVsLnZhbi50aXRsZSA9IFwiVWJpY2FjacOzbiBkZWwgdmVow61jdWxvXCI7ICBcbiAgICAgICAgICAgIG1vZGVsLnZhbi5wb3NpdGlvbiA9IFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhsYXQsIGxvbik7XG4gICAgICAgICAgICBtb2RlbC52YW4uaWNvbj1pbWFnZTtcbiAgICAgICAgICAgIG1vZGVsLnZhbi5zbmlwcGV0ID0gJ0Rlc2NyaXBjacOzbiBkZWwgcHVudG8nO1xuICAgICAgICAgICAgbW9kZWwudmFuLnVzZXJEYXRhID0ge2luZGV4OiAxLGlkOiBpZH07XG4gICAgICAgICAgICBtb2RlbC5tYXBWaWV3LmFkZE1hcmtlcihtb2RlbC52YW4pOyBcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQWN0dWFsaXphbmRvIHZhbicpO1xuICAgICAgICAgICAgbW9kZWwudmFuLnBvc2l0aW9uID0gUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKG1vZGVsLnZlaGljdWxvLmxhdGl0dWQsbW9kZWwudmVoaWN1bG8ubG9uZ2l0dWQpO1xuXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICAgXG4gICAgfVxuXG4gICAgc2V0TWFyY2Fkb3IobGF0LGxvbix0aXBvLGlkLGRhdGEyKXtcbiAgICAgICAgY29uc29sZS5sb2coJ1BpbnRhbmRvIG1hcmNhZG9yOiAnK2xhdCsnIC0gJytsb24rJyAtICcrdGlwbyk7XG4gICAgICAgIHZhciBtYXJrZXIgPSBuZXcgTWFya2VyKCk7XG4gICAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlTW9kdWxlLkltYWdlKCk7XG4gICAgICAgIGltYWdlLndpZHRoPTIwOyBcbiAgICAgICAgaW1hZ2UuaGVpZ2h0PTIwOyBcbiAgICAgICAgbWFya2VyLnNuaXBwZXQgPSAnRGVzY3JpcGNpw7NuIGRlbCBwdW50byc7XG4gICAgICAgIGlmKHRpcG8gPT0gJ2luaWNpbycpe1xuICAgICAgICAgICAgaW1hZ2UuaW1hZ2VTb3VyY2UgPSBpbWFnZVNvdXJjZS5mcm9tUmVzb3VyY2UoJ2luaWNpbycpOyAgXG4gICAgICAgICAgICBtYXJrZXIudGl0bGUgPSBcIlB1bnRvIGRlIGluaWNpb1wiO1xuICAgICAgICB9ZWxzZSBpZih0aXBvID09ICdmaW4nKXtcbiAgICAgICAgICAgIGltYWdlLmltYWdlU291cmNlID0gaW1hZ2VTb3VyY2UuZnJvbVJlc291cmNlKCdmaW4nKTtcbiAgICAgICAgICAgIG1hcmtlci50aXRsZSA9IFwiUHVudG8gZmluYWxcIjtcbiAgICAgICAgfWVsc2UgaWYodGlwbyA9PSAncGFzYWplcm8nKXtcbiAgICAgICAgICAgIG1hcmtlci50aXRsZSA9IFwiVHUgdWJpY2FjacOzbiBkZSByZWNvZ2lkYVwiOyAgXG4gICAgICAgICAgICBpbWFnZS5pbWFnZVNvdXJjZSA9IGltYWdlU291cmNlLmZyb21SZXNvdXJjZSgncGFzYWplcm8nKTtcbiAgICAgICAgICAgIG1hcmtlci5zbmlwcGV0ID0gJ0RlYmVzIGVzcGVyYXIgYSBsYSB2YW4gZW4gZXN0ZSBwdW50byc7XG4gICAgICAgIH0gXG5cbiAgICAgICAgXG4gICAgICAgIG1hcmtlci5wb3NpdGlvbiA9IFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhsYXQsIGxvbik7XG4gICAgICAgIG1hcmtlci5pY29uPWltYWdlO1xuICAgICAgICBcbiAgICAgICAgbWFya2VyLnVzZXJEYXRhID0ge2luZGV4OiAxLGlkOiBpZH07XG4gICAgICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIobWFya2VyKTsgXG4gICAgfVxuXG4gICAgZGlidWphclJ1dGEobGF0LGxvbixsYXQyLGxvbjIscGFyYWRhcykge1xuICAgICAgICBsb2FkZXIuc2hvdygpO1xuICAgICAgICB0aGlzLm15U2VydmljZS5nZXREYXRhKGxhdCxsb24sbGF0Mixsb24yLHBhcmFkYXMpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YVN1Y2Nlc3MocmVzdWx0KTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIGNoZWNrSW4oKXtcbiAgICAgICAgbGV0IG1vZGVsID0gdGhpcztcbiAgICAgICAgZGlhbG9ncy5jb25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkNoZWNrLUluIFZpYWplXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIsK/RGVzZWFzIGhhY2VyIENoZWNrLWluIGVuIGVzdGUgdmlhamU/XCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiQ2hlY2stSW5cIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsYXJcIixcbiAgICAgICAgICAgIC8vbmV1dHJhbEJ1dHRvblRleHQ6IFwiTmV1dHJhbCB0ZXh0XCIsXG4gICAgICAgICAgICAvL2RlZmF1bHRUZXh0OiBcIkRlZmF1bHQgdGV4dFwiLFxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICBpZihyKXtcbiAgICAgICAgICAgICAgICBpZihtb2RlbC50b2tlbnNDdW5kdWN0b3IubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBub21icmVzID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ25vbWJyZVVzdWFyaW8nKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkUGFzYWplcm8gPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnaWRVc3VhcmlvJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgbW9kZWwubXlTZXJ2aWNlLnJlZ2lzdHJhclBhc2FqZXJvKG1vZGVsLmlkdmlhamUsaWRQYXNhamVybywnMScsJzAnLCcwJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGUgcmVnaXN0cm8gZGUgcGFzYWplcm8nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLm15U2VydmljZS5lbnZpYXJQdXNoQ2hlY2tpbihlbmNvZGVVUkkobm9tYnJlcysnIHNlIGhhIHN1YmlkbyBhIGxhIHZhbicpLG1vZGVsLnRva2Vuc0N1bmR1Y3Rvcixtb2RlbC5pZHZpYWplLG1vZGVsLmlkcnV0YSxpZFBhc2FqZXJvLG5vbWJyZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdDIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXN1bHRhZG8gZGVsIHB1c2gnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzdWx0Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJMaXN0b1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiQ2hlY2stSW4gcmVhbGl6YWRvIGV4aXRvc2FtZW50ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPa1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmNoZWNraW49ZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJDaGVjay1JbiBmYWxsaWRvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJFbCBjaGVjay1pbiBubyBwdWRvIHNlciByZWFsaXphZG8uIEludGVudGEgZGUgbnVldm8gcG9yIGZhdm9yLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPa1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkVycm9yIGNvbmR1Y3RvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJUdSBtZW5zYWplIG5vIHB1ZG8gc2VyIGVudHJlZ2Fkby4gRWwgY29uZHVjdG9yIG5vIHRpZW5lIGRpc3Bvc2l0aXZvcyBhc2lnbmFkb3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPa1wiXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uR2V0RGF0YVN1Y2Nlc3MocmVzKSB7XG4gICAgICAgIHRoaXMuZW5jb2RlZFBvaW50cyA9IHBsLmRlY29kZShyZXMucm91dGVzWzBdLm92ZXJ2aWV3X3BvbHlsaW5lLnBvaW50cyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdBUVVJIFZBTiBMT1MgUFVOVE9TJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZW5jb2RlZFBvaW50cyk7IFxuICAgICAgICBjb25zdCBtYXAgPSB0aGlzLm1hcFZpZXc7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gdGhpcztcblxuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuZW5jb2RlZFBvaW50cztcblxuICAgICAgICBsZXQgbGluZSA9IG5ldyBQb2x5bGluZSgpO1xuICAgICAgICBsaW5lLnZpc2libGUgPSB0cnVlO1xuICAgICAgICBsaW5lLndpZHRoID0gNDtcbiAgICAgICAgbGluZS5jb2xvciA9IG5ldyBDb2xvcignIzE1M2Q3YScpO1xuICAgICAgICBsaW5lLmdlb2Rlc2ljID0gdHJ1ZTtcbiAgICAgICAgbGluZS5jbGlja2FibGU9dHJ1ZTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxpbmUuYWRkUG9pbnQoUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKGxpc3RbaV1bMF0sbGlzdFtpXVsxXSkpO1xuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIG1hcC5hZGRQb2x5bGluZShsaW5lKTtcblxuICAgICAgICBsb2FkZXIuaGlkZSgpO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkdldERhdGFFcnJvcihlcnJvcjogUmVzcG9uc2UgfCBhbnkpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJvbkdldERhdGFFcnJvcjogXCIgKyBKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgIH1cbn1cbiJdfQ==