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
        //public mensajes = new observableArray.ObservableArray([]);
        this.mensajes = [];
        this.tokensCunductor = [];
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
        var _this = this;
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
        var idConductor = this.idconductor;
        /*console.log('Token PUSH: '+ApplicationSettings.getString('tokenPush'));
        this.tokensCunductor.push(ApplicationSettings.getString('tokenPush'));
        this.tokensCunductor.push('chupelofuerte');
        */
        this.page.on('navigatingTo', function (data) {
            console.log('Entrando por loka');
            // run init code
            // (note: this will run when you either move forward or back to this page)
        });
        this.page.on('navigatingFrom', function (data) {
            console.log('Saliendo por loka');
            clearInterval(_this.timeout);
            // run destroy code
            // (note: this will run when you either move forward to a new page or back to the previous page)
        });
        this.myService.getMensajes()
            .subscribe(function (result) {
            console.log('Resultado de mensajes');
            console.log(result);
            for (var i = 0; i < Object.keys(result).length; i++) {
                console.log('Pintando a:');
                console.log(result[i]); // "species"
                _this.mensajes.push(result[i].texto);
                console.log(_this.mensajes);
            }
        }, function (error) {
            _this.onGetDataError(error);
        });
        this.myService.getTokensConductor(idConductor)
            .subscribe(function (result) {
            console.log('Resultado de tokens conductor: ' + idConductor);
            console.log(result);
            for (var i = 0; i < Object.keys(result).length; i++) {
                console.log('Pintando a:');
                console.log(result[i]); // "species"
                _this.tokensCunductor.push(result[i].token);
            }
        }, function (error) {
            _this.onGetDataError(error);
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
                        model.setMarcador(loc.latitude, loc.longitude, 'pasajero', 2);
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
        console.log('Map Ready');
        this.mapView = event.object;
        console.log("Setting a marker...");
        loader.show();
        var model = this;
        model.mapView.setStyle((this.styles));
        this.myService.getPuntosRuta(this.idruta).subscribe(function (res) {
            console.log('Respuesta de la ruta: ' + model.idruta);
            console.log(JSON.stringify(res));
            for (var i = 0; i < Object.keys(res).length; i++) {
                console.log('Detalle de punto');
                console.log(JSON.stringify(res[i]));
                if (res[i].tipo == 'INICIO') {
                    model.latInicial = res[i].latitud;
                    model.lonInicial = res[i].longitud;
                    model.latitude = res[i].latitud * 1;
                    model.longitude = res[i].longitud * 1;
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
            model.setMarcador(model.latInicial, model.lonInicial, 'inicio', 0);
            model.setMarcador(model.latFinal, model.lonFinal, 'fin', 0);
            //model.setMarcador(model.vehiculo.latitud,model.vehiculo.latitud,'conductor',0);
            model.ubicarVehiculo();
            console.log('PARADAS NORMALES');
            console.log(JSON.stringify(model.paradas));
            model.dibujarRuta(model.latInicial, model.lonInicial, model.latFinal, model.lonFinal, model.paradas);
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
        ApplicationSettings.setString('idParada', args.marker.userData.id);
        ApplicationSettings.setNumber('idViaje', this.idviaje);
        this.routerExtensions.navigate(["/reservar"]);
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
            model.setMarcadorVan(model.vehiculo.latitud, model.vehiculo.longitud, 'conductor', 0);
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
                model.setMarcadorVan(model.vehiculo.latitud, model.vehiculo.longitud, 'conductor', 0);
            }, function (error) {
                _this.onGetDataError(error);
            });
        }, 5000);
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
    ViajeComponent.prototype.setMarcador = function (lat, lon, tipo, id) {
        console.log('Pintando marcador: ' + lat + ' - ' + lon + ' - ' + tipo);
        var marker = new nativescript_google_maps_sdk_1.Marker();
        var image = new ImageModule.Image();
        image.width = 20;
        image.height = 20;
        if (tipo == 'inicio') {
            image.imageSource = imageSource.fromResource('inicio');
            marker.title = "Punto de inicio";
        }
        else if (tipo == 'fin') {
            image.imageSource = imageSource.fromResource('fin');
            marker.title = "Punto final";
        }
        else if (tipo == 'pasajero') {
            marker.title = "Tu ubicación";
            image.imageSource = imageSource.fromResource('pasajero');
        }
        marker.position = nativescript_google_maps_sdk_1.Position.positionFromLatLng(lat, lon);
        marker.icon = image;
        marker.snippet = 'Descripción del punto';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlhamUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmlhamUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBFQUEwRTtBQUMxRSw2RUFBeUY7QUFDekYsc0RBQTZEO0FBQzdELDBEQUE0RDtBQUM1RCxpRkFBZ0U7QUFDaEUsNENBQTJDO0FBQzNDLDBDQUFpRDtBQUNqRCwyREFBNkQ7QUFDN0QsdURBQXlEO0FBQ3pELCtCQUE0QjtBQUM1QixvQ0FBc0M7QUFDdEMsc0RBQXdEO0FBQ3hELGtDQUFvQztBQUNwQyxvQ0FBc0M7QUFFdEMsZ0NBQStCO0FBQy9COzs7Ozs4REFLOEQ7QUFDOUQsb0ZBQW9GO0FBQ3BGLElBQUksTUFBTSxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztBQWVwQztJQWdXSSx3QkFBb0IsZ0JBQWtDLEVBQVUsU0FBcUIsRUFBUyxLQUFxQixFQUFTLElBQVU7UUFBdEksaUJBY0M7UUFkbUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVk7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFTLFNBQUksR0FBSixJQUFJLENBQU07UUE5VnRJLDJEQUEyRDtRQUMzRCxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBT2IsYUFBUSxHQUFDLFFBQVEsQ0FBQyxDQUFDLDhCQUE4QjtRQUNqRCxjQUFTLEdBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTO1FBTy9CLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDVixZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLFlBQU8sR0FBRyxDQUFDLENBQUM7UUFDWixTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ1QsWUFBTyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFNM0IsNERBQTREO1FBQ3JE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LHdCQUF3QjtTQUN4QyxDQUFDO3lDQWlXd0MseUJBQWdCLEVBQXFCLHVCQUFVLEVBQWdCLHVCQUFjLEVBQWUsV0FBSTtPQWhXN0gsY0FBYyxDQXd2QjFCO0lBQUQscUJBQUM7Q0FBQSxBQXh2QkQsSUF3dkJDO0FBeHZCWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbi8vaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeSc7XG5pbXBvcnQgeyBNYXBWaWV3LCBNYXJrZXIsIFBvc2l0aW9uLCBQb2x5bGluZSwgU3R5bGV9IGZyb20gJ25hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGsnO1xuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IHtMb2FkaW5nSW5kaWNhdG9yfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7XG5pbXBvcnQgeyBXZWJTZXJ2aWNlIH0gZnJvbSBcIi4uL3dzLnNlcnZpY2VcIjtcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0ICogYXMgaW1hZ2VTb3VyY2UgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2Utc291cmNlXCI7XG5pbXBvcnQgKiBhcyBJbWFnZU1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9pbWFnZVwiO1xuaW1wb3J0IHtDb2xvcn0gZnJvbSAnY29sb3InO1xuaW1wb3J0ICogYXMgcGwgZnJvbSAnZ29vZ2xlLXBvbHlsaW5lJztcbmltcG9ydCAqIGFzIGdlb2xvY2F0aW9uIGZyb20gXCJuYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb25cIjtcbmltcG9ydCB7IEFjY3VyYWN5IH0gZnJvbSBcInVpL2VudW1zXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgKiBhcyBvYnNlcnZhYmxlQXJyYXkgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjsgXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBCZWZvcmUgeW91IGNhbiBuYXZpZ2F0ZSB0byB0aGlzIHBhZ2UgZnJvbSB5b3VyIGFwcCwgeW91IG5lZWQgdG8gcmVmZXJlbmNlIHRoaXMgcGFnZSdzIG1vZHVsZSBpbiB0aGVcbiogZ2xvYmFsIGFwcCByb3V0ZXIgbW9kdWxlLiBBZGQgdGhlIGZvbGxvd2luZyBvYmplY3QgdG8gdGhlIGdsb2JhbCBhcnJheSBvZiByb3V0ZXM6XG4qIHsgcGF0aDogXCJ2aWFqZVwiLCBsb2FkQ2hpbGRyZW46IFwiLi92aWFqZS92aWFqZS5tb2R1bGUjVmlhamVNb2R1bGVcIiB9XG4qIE5vdGUgdGhhdCB0aGlzIHNpbXBseSBwb2ludHMgdGhlIHBhdGggdG8gdGhlIHBhZ2UgbW9kdWxlIGZpbGUuIElmIHlvdSBtb3ZlIHRoZSBwYWdlLCB5b3UgbmVlZCB0byB1cGRhdGUgdGhlIHJvdXRlIHRvby5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vL3JlZ2lzdGVyRWxlbWVudChcIk1hcFZpZXdcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGtcIikuTWFwVmlldyk7XG5sZXQgbG9hZGVyID0gbmV3IExvYWRpbmdJbmRpY2F0b3IoKTtcbi8qY2xhc3MgVmVoaWN1bG8ge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBsYXRpdHVkOiBudW1iZXIsIHB1YmxpYyBsb25naXR1ZDogbnVtYmVyLCBwdWJsaWMgcGxhY2FfdjpzdHJpbmcpIHsgfSAgIFxufSovXG5pbnRlcmZhY2UgVmVoaWN1bG8ge1xuICAgIGxhdGl0dWQ6IG51bWJlcixcbiAgICBsb25naXR1ZDogbnVtYmVyLFxuICAgIHBsYWNhOiBzdHJpbmdcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiVmlhamVcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdmlhamUuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBWaWFqZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHVibGljIGVuY29kZWRQb2ludHM6YW55O1xuICAgIC8vcHVibGljIHBhcmFkYXMgPSBuZXcgb2JzZXJ2YWJsZUFycmF5Lk9ic2VydmFibGVBcnJheShbXSk7XG4gICAgcGFyYWRhcyA9IFtdO1xuICAgIGlkcnV0YTogbnVtYmVyO1xuICAgIGlkdmlhamU6IG51bWJlcjtcbiAgICBpZGNvbmR1Y3RvcjogbnVtYmVyO1xuICAgIHBsYWNhOnN0cmluZztcblxuXG4gICAgbGF0aXR1ZGU9NC41ODc3OTk7IC8vQ29sb21iaWE0LjU4Nzc5OSwgLTczLjk0MDk2MFxuICAgIGxvbmdpdHVkZT0tNzMuOTQwOTYwOyAvL0Nsb21iaWFcblxuICAgIGxhdEluaWNpYWw6bnVtYmVyO1xuICAgIGxvbkluaWNpYWw6bnVtYmVyO1xuICAgIGxhdEZpbmFsOm51bWJlcjtcbiAgICBsb25GaW5hbDpudW1iZXI7XG5cbiAgICB6b29tID0gMTU7XG4gICAgbWluWm9vbSA9IDA7IFxuICAgIG1heFpvb20gPSAyMjtcbiAgICBiZWFyaW5nID0gMDtcbiAgICB0aWx0ID0gMDtcbiAgICBwYWRkaW5nID0gWzQwLCA0MCwgNDAsIDQwXTtcbiAgICBtYXBWaWV3OiBNYXBWaWV3O1xuICAgIGxhc3RDYW1lcmE6IFN0cmluZztcbiAgICB2ZWhpY3Vsbzphbnk7XG4gICAgdmFuOk1hcmtlcjtcbiAgICB0aW1lb3V0OmFueTtcbiAgICAvL3B1YmxpYyBtZW5zYWplcyA9IG5ldyBvYnNlcnZhYmxlQXJyYXkuT2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgICBwdWJsaWMgbWVuc2FqZXM9W107IFxuICAgIHRva2Vuc0N1bmR1Y3Rvcj1bXTtcblxuICAgIHN0eWxlcz1bXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM3YzkzYTNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiBcIi0xMFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlLmNvdW50cnlcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZS5jb3VudHJ5XCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2EwYTRhNVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlLnByb3ZpbmNlXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzYyODM4ZVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZVwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogXCItMjlcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGVcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2RkZTNlM1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZS5tYW5fbWFkZVwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlLm1hbl9tYWRlXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZS5tYW5fbWFkZVwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuc3Ryb2tlXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMzZjRhNTFcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIndlaWdodFwiOiBcIjAuMzBcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IFwiNzRcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kuYXR0cmFjdGlvblwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kuYnVzaW5lc3NcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLmdvdmVybm1lbnRcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5tZWRpY2FsXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5wYXJrXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5wbGFjZV9vZl93b3JzaGlwXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5zY2hvb2xcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5zcG9ydHNfY29tcGxleFwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJzYXR1cmF0aW9uXCI6IFwiLTEwMFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuc3Ryb2tlXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2JiY2FjZlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuc3Ryb2tlXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogXCIwXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNiYmNhY2ZcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIndlaWdodFwiOiBcIjAuNTBcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5LmNvbnRyb2xsZWRfYWNjZXNzXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXkuY29udHJvbGxlZF9hY2Nlc3NcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjYTliNGI4XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5hcnRlcmlhbFwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLmljb25cIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImludmVydF9saWdodG5lc3NcIjogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInNhdHVyYXRpb25cIjogXCItN1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IFwiM1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZ2FtbWFcIjogXCIxLjgwXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ3ZWlnaHRcIjogXCIwLjAxXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5sb2NhbFwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ0cmFuc2l0XCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ0cmFuc2l0LnN0YXRpb24uYnVzXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNhM2M3ZGZcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfVxuXTtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIG15U2VydmljZTogV2ViU2VydmljZSxwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxwcml2YXRlIHBhZ2U6IFBhZ2UpIHtcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBVc2UgdGhlIGNvbnN0cnVjdG9yIHRvIGluamVjdCBhcHAgc2VydmljZXMgdGhhdCB5b3UgbmVlZCBpbiB0aGlzIGNvbXBvbmVudC5cbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAgICAgdGhpcy5yb3V0ZS5wYXJhbXNcbiAgICAgICAgICAuZm9yRWFjaCgocGFyYW1zKSA9PiB7IFxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUGFyYW1ldHJvcyBkZSB1cmwnKTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocGFyYW1zKSk7XG4gICAgICAgICAgICAgIHRoaXMuaWRydXRhID0gK3BhcmFtc1tcImlkcnV0YVwiXTsgXG4gICAgICAgICAgICAgIHRoaXMuaWR2aWFqZSA9ICtwYXJhbXNbXCJpZHZpYWplXCJdOyBcbiAgICAgICAgICAgICAgdGhpcy5pZGNvbmR1Y3RvciA9ICtwYXJhbXNbXCJpZGNvbmR1Y3RvclwiXTsgXG4gICAgICAgICAgICAgIHRoaXMucGxhY2EgPSBwYXJhbXNbXCJwbGFjYVwiXTsgXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaWRydXRhKycgLSAnK3RoaXMuaWR2aWFqZSsnIC0gJyt0aGlzLnBsYWNhKTtcbiAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBVc2UgdGhlIFwibmdPbkluaXRcIiBoYW5kbGVyIHRvIGluaXRpYWxpemUgZGF0YSBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgICAgIGNvbnN0IGlkQ29uZHVjdG9yID0gdGhpcy5pZGNvbmR1Y3RvcjtcblxuICAgICAgICAvKmNvbnNvbGUubG9nKCdUb2tlbiBQVVNIOiAnK0FwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCd0b2tlblB1c2gnKSk7XG4gICAgICAgIHRoaXMudG9rZW5zQ3VuZHVjdG9yLnB1c2goQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ3Rva2VuUHVzaCcpKTtcbiAgICAgICAgdGhpcy50b2tlbnNDdW5kdWN0b3IucHVzaCgnY2h1cGVsb2Z1ZXJ0ZScpO1xuICAgICAgICAqL1xuICAgICAgICB0aGlzLnBhZ2Uub24oJ25hdmlnYXRpbmdUbycsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRW50cmFuZG8gcG9yIGxva2EnKTtcbiAgICAgICAgICAgIC8vIHJ1biBpbml0IGNvZGVcbiAgICAgICAgICAgIC8vIChub3RlOiB0aGlzIHdpbGwgcnVuIHdoZW4geW91IGVpdGhlciBtb3ZlIGZvcndhcmQgb3IgYmFjayB0byB0aGlzIHBhZ2UpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucGFnZS5vbignbmF2aWdhdGluZ0Zyb20nLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NhbGllbmRvIHBvciBsb2thJyk7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZW91dCk7IFxuICAgICAgICAgICAgLy8gcnVuIGRlc3Ryb3kgY29kZVxuICAgICAgICAgICAgLy8gKG5vdGU6IHRoaXMgd2lsbCBydW4gd2hlbiB5b3UgZWl0aGVyIG1vdmUgZm9yd2FyZCB0byBhIG5ldyBwYWdlIG9yIGJhY2sgdG8gdGhlIHByZXZpb3VzIHBhZ2UpXG4gICAgICAgIH0pOyBcbiAgICAgICAgdGhpcy5teVNlcnZpY2UuZ2V0TWVuc2FqZXMoKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3VsdGFkbyBkZSBtZW5zYWplcycpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXMocmVzdWx0KS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUGludGFuZG8gYTonKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0W2ldKTsgLy8gXCJzcGVjaWVzXCJcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnNhamVzLnB1c2gocmVzdWx0W2ldLnRleHRvKTsgIFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm1lbnNhamVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB0aGlzLm15U2VydmljZS5nZXRUb2tlbnNDb25kdWN0b3IoaWRDb25kdWN0b3IpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzdWx0YWRvIGRlIHRva2VucyBjb25kdWN0b3I6ICcraWRDb25kdWN0b3IpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXMocmVzdWx0KS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUGludGFuZG8gYTonKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0W2ldKTsgLy8gXCJzcGVjaWVzXCJcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRva2Vuc0N1bmR1Y3Rvci5wdXNoKHJlc3VsdFtpXS50b2tlbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgfVxuICAgIGNhbmNlbGFyKCl7XG4gICAgICAgIGRpYWxvZ3MuY29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogXCJDYW5jZWxhciByZXNlcnZhXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIsK/UmVhbG1lbnRlIGRlc2VhcyBjYW5jZWxhciBlc3RhIHJlc2VydmE/XCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiU2ksIGNhbmNlbGFybGFcIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiTm9cIlxuICAgICAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAvLyByZXN1bHQgYXJndW1lbnQgaXMgYm9vbGVhblxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgcmVzdWx0OiBcIiArIHJlc3VsdCk7XG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJSZXNlcnZhIGNhbmNlbGFkYVwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVHUgcmVzZXJ2YSBoYSBzaWRvIGNhbmNlbGFkYSBleGl0b3NhbWVudGVcIixcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3Jlc2VydmFzXCJdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgdWJpY2FyKCl7XG4gICAgICAgIGxldCBtb2RlbCA9IHRoaXM7XG4gICAgICAgIGdlb2xvY2F0aW9uLmlzRW5hYmxlZCgpLnRoZW4oZnVuY3Rpb24gKGlzRW5hYmxlZCkge1xuICAgICAgICAgICAgaWYgKGlzRW5hYmxlZCkge1xuICAgICAgICAgICAgICAgIGxldCBsb2NhdGlvbiA9IGdlb2xvY2F0aW9uLmdldEN1cnJlbnRMb2NhdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIGRlc2lyZWRBY2N1cmFjeTogQWNjdXJhY3kuaGlnaCxcbiAgICAgICAgICAgICAgICAgICAgbWF4aW11bUFnZTogNTAwMCxcbiAgICAgICAgICAgICAgICAgICAgdGltZW91dDogMTAwMDBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAobG9jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwubGF0aXR1ZGUgPSBsb2MubGF0aXR1ZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwubG9uZ2l0dWRlID0gbG9jLmxvbmdpdHVkZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5zZXRNYXJjYWRvcihsb2MubGF0aXR1ZGUsbG9jLmxvbmdpdHVkZSwncGFzYWplcm8nLDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyAoZS5tZXNzYWdlIHx8IGUpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBnZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIChlLm1lc3NhZ2UgfHwgZSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyAoZS5tZXNzYWdlIHx8IGUpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlyQXRyYXMoKSB7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG4gICAgfVxuICAgIGNvbnRhY3Rhcigpe1xuICAgICAgICBsZXQgbW9kZWwgPSB0aGlzO1xuICAgICAgICBkaWFsb2dzLnByb21wdCh7XG4gICAgICAgICAgICB0aXRsZTogXCJDb250YWN0YXJcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiRW52w61hIHVuIG1lbnNhamUgYWwgY29uZHVjdG9yXCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiRW52aWFyXCIsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbGFyXCIsXG4gICAgICAgICAgICAvL25ldXRyYWxCdXR0b25UZXh0OiBcIk5ldXRyYWwgdGV4dFwiLFxuICAgICAgICAgICAgLy9kZWZhdWx0VGV4dDogXCJEZWZhdWx0IHRleHRcIixcbiAgICAgICAgICAgIGlucHV0VHlwZTogZGlhbG9ncy5pbnB1dFR5cGUudGV4dFxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyByZXN1bHQ6IFwiICsgci5yZXN1bHQgKyBcIiwgdGV4dDogXCIgKyByLnRleHQpO1xuICAgICAgICAgICAgaWYobW9kZWwudG9rZW5zQ3VuZHVjdG9yLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIG1vZGVsLm15U2VydmljZS5lbnZpYXJQdXNoKG1vZGVsLnRva2Vuc0N1bmR1Y3RvcixlbmNvZGVVUkkoci50ZXh0KSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXN1bHRhZG8gZGVsIHB1c2gnKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyZXN1bHQyKTtcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJNZW5zYWplIGVudmlhZG9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVHUgbWVuc2FqZSBmdWUgZW52aWFkbyBleGl0b3NhbWVudGUgYWwgY29uZHVjdG9yLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9rXCJcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJNZW5zYWplIGZhbGxpZG9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVHUgbWVuc2FqZSBubyBwdWRvIHNlciBlbnRyZWdhZG8uIEludGVudGEgZGUgbnVldm8gcG9yIGZhdm9yLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9rXCJcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvciBjb25kdWN0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJUdSBtZW5zYWplIG5vIHB1ZG8gc2VyIGVudHJlZ2Fkby4gRWwgY29uZHVjdG9yIG5vIHRpZW5lIGRpc3Bvc2l0aXZvcyBhc2lnbmFkb3NcIixcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9rXCJcbiAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8qZGlhbG9ncy5hY3Rpb24oe1xuICAgICAgICAgICAgbWVzc2FnZTogXCJFbnbDrWEgdW4gbWVuc2FqZSBhbCBjb25kdWN0b3JcIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsYXJcIixcbiAgICAgICAgICAgIGFjdGlvbnM6IHRoaXMubWVuc2FqZXNcbiAgICAgICAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgcmVzdWx0OiBcIiArIHJlc3VsdCk7XG4gICAgICAgICAgICBpZihyZXN1bHQgIT0gJ0NhbmNlbGFyJyl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy50b2tlbnNDdW5kdWN0b3IubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXlTZXJ2aWNlLmVudmlhclB1c2godGhpcy50b2tlbnNDdW5kdWN0b3IsZW5jb2RlVVJJKHJlc3VsdCkpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdDIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXN1bHRhZG8gZGVsIHB1c2gnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzdWx0Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJNZW5zYWplIGVudmlhZG9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlR1IG1lbnNhamUgZnVlIGVudmlhZG8gZXhpdG9zYW1lbnRlIGFsIGNvbmR1Y3Rvci5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk1lbnNhamUgZmFsbGlkb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVHUgbWVuc2FqZSBubyBwdWRvIHNlciBlbnRyZWdhZG8uIEludGVudGEgZGUgbnVldm8gcG9yIGZhdm9yLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPa1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkVycm9yIGNvbmR1Y3RvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJUdSBtZW5zYWplIG5vIHB1ZG8gc2VyIGVudHJlZ2Fkby4gRWwgY29uZHVjdG9yIG5vIHRpZW5lIGRpc3Bvc2l0aXZvcyBhc2lnbmFkb3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPa1wiXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0pOyovXG4gICAgfVxuICAgIG9uTWFwUmVhZHkoZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ01hcCBSZWFkeScpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdNYXAgUmVhZHknKTtcblxuICAgICAgICB0aGlzLm1hcFZpZXcgPSBldmVudC5vYmplY3Q7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJTZXR0aW5nIGEgbWFya2VyLi4uXCIpO1xuXG4gICAgICAgIGxvYWRlci5zaG93KCk7XG4gICAgICAgIGxldCBtb2RlbCA9IHRoaXM7XG4gICAgICAgIG1vZGVsLm1hcFZpZXcuc2V0U3R5bGUoPFN0eWxlPih0aGlzLnN0eWxlcykpO1xuICAgICAgICB0aGlzLm15U2VydmljZS5nZXRQdW50b3NSdXRhKHRoaXMuaWRydXRhKS5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlIGxhIHJ1dGE6ICcrbW9kZWwuaWRydXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlcykpO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXMocmVzKS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEZXRhbGxlIGRlIHB1bnRvJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzW2ldKSk7XG4gICAgICAgICAgICAgICAgaWYocmVzW2ldLnRpcG8gPT0gJ0lOSUNJTycpe1xuXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmxhdEluaWNpYWwgPSByZXNbaV0ubGF0aXR1ZDtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwubG9uSW5pY2lhbCA9IHJlc1tpXS5sb25naXR1ZDtcblxuICAgICAgICAgICAgICAgICAgICBtb2RlbC5sYXRpdHVkZSA9IHJlc1tpXS5sYXRpdHVkKjE7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmxvbmdpdHVkZSA9IHJlc1tpXS5sb25naXR1ZCoxO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdMQVQ6ICcrbW9kZWwubGF0aXR1ZGUrJyAtIExPTjogJyttb2RlbC5sb25naXR1ZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihyZXNbaV0udGlwbyA9PSAnRklOJyl7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmxhdEZpbmFsID0gcmVzW2ldLmxhdGl0dWQ7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmxvbkZpbmFsID0gcmVzW2ldLmxvbmdpdHVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihyZXNbaV0udGlwbyA9PSAnTk9STUFMJyl7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLnBhcmFkYXMucHVzaChbUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKHJlc1tpXS5sYXRpdHVkLHJlc1tpXS5sb25naXR1ZCkscmVzW2ldLmlkcGFyYWRhXSk7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1B1bnRvIGluaWNpYWw6IExBVDonK21vZGVsLmxhdEluaWNpYWwrJyAtIExPTjonK21vZGVsLmxvbkluaWNpYWwpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1B1bnRvIGZpbmFsOiBMQVQ6Jyttb2RlbC5sYXRGaW5hbCsnIC0gTE9OOicrbW9kZWwubG9uRmluYWwpO1xuICAgICAgICAgICAgbW9kZWwuc2V0TWFyY2Fkb3IobW9kZWwubGF0SW5pY2lhbCxtb2RlbC5sb25JbmljaWFsLCdpbmljaW8nLDApO1xuICAgICAgICAgICAgbW9kZWwuc2V0TWFyY2Fkb3IobW9kZWwubGF0RmluYWwsbW9kZWwubG9uRmluYWwsJ2ZpbicsMCk7XG4gICAgICAgICAgICAvL21vZGVsLnNldE1hcmNhZG9yKG1vZGVsLnZlaGljdWxvLmxhdGl0dWQsbW9kZWwudmVoaWN1bG8ubGF0aXR1ZCwnY29uZHVjdG9yJywwKTtcbiAgICAgICAgICAgIG1vZGVsLnViaWNhclZlaGljdWxvKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUEFSQURBUyBOT1JNQUxFUycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobW9kZWwucGFyYWRhcykpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgIFxuXG4gICAgICAgICAgICBtb2RlbC5kaWJ1amFyUnV0YShtb2RlbC5sYXRJbmljaWFsLG1vZGVsLmxvbkluaWNpYWwsbW9kZWwubGF0RmluYWwsbW9kZWwubG9uRmluYWwsbW9kZWwucGFyYWRhcyk7XG4gICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICAgICAgXG5cblxuICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgfSk7IFxuICAgIH1cbiAgICBvbkNvb3JkaW5hdGVUYXBwZWQoYXJncykge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNvb3JkaW5hdGUgVGFwcGVkLCBMYXQ6IFwiICsgYXJncy5wb3NpdGlvbi5sYXRpdHVkZSArIFwiLCBMb246IFwiICsgYXJncy5wb3NpdGlvbi5sb25naXR1ZGUsIGFyZ3MpO1xuICAgIH1cblxuICAgIG9uTWFya2VyRXZlbnQoYXJncykge1xuICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZygnaWRQYXJhZGEnLGFyZ3MubWFya2VyLnVzZXJEYXRhLmlkKTtcbiAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXROdW1iZXIoJ2lkVmlhamUnLHRoaXMuaWR2aWFqZSk7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcmVzZXJ2YXJcIl0pO1xuICAgIH0gXG5cbiAgICBvbkNhbWVyYUNoYW5nZWQoYXJncykge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNhbWVyYSBjaGFuZ2VkOiBcIiArIEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKSwgSlNPTi5zdHJpbmdpZnkoYXJncy5jYW1lcmEpID09PSB0aGlzLmxhc3RDYW1lcmEpO1xuICAgICAgICB0aGlzLmxhc3RDYW1lcmEgPSBKU09OLnN0cmluZ2lmeShhcmdzLmNhbWVyYSk7XG4gICAgfSBcbiAgICB1YmljYXJWZWhpY3Vsbygpe1xuICAgICAgICBsZXQgbW9kZWwgPSB0aGlzO1xuXG4gICAgICAgIC8vQnVzY2FyIFZBTiBsYSBwcmltZXIgXG4gICAgICAgIG1vZGVsLm15U2VydmljZS5nZXRVYmljYWNpb25WZWhpY3Vsbyh0aGlzLnBsYWNhKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgLy90aGlzLnViaWNhclZlaGljdWxvKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgbW9kZWwudmVoaWN1bG8gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1ZFSElDVUxPJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobW9kZWwudmVoaWN1bG8pO1xuICAgICAgICAgICAgICAgIG1vZGVsLnNldE1hcmNhZG9yVmFuKG1vZGVsLnZlaGljdWxvLmxhdGl0dWQsbW9kZWwudmVoaWN1bG8ubG9uZ2l0dWQsJ2NvbmR1Y3RvcicsMCk7XG5cbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuXG4gICAgICAgIG1vZGVsLnRpbWVvdXQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBtb2RlbC5teVNlcnZpY2UuZ2V0VWJpY2FjaW9uVmVoaWN1bG8odGhpcy5wbGFjYSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vdGhpcy51YmljYXJWZWhpY3VsbyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIG1vZGVsLnZlaGljdWxvID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdWRUhJQ1VMTycpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1vZGVsLnZlaGljdWxvKTtcbiAgICAgICAgICAgICAgICBtb2RlbC5zZXRNYXJjYWRvclZhbihtb2RlbC52ZWhpY3Vsby5sYXRpdHVkLG1vZGVsLnZlaGljdWxvLmxvbmdpdHVkLCdjb25kdWN0b3InLDApO1xuXG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCA1MDAwKTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgIH1cbiAgICB1YmljYXJWYW4oKXtcbiAgICAgICAgbGV0IG1vZGVsID0gdGhpcztcbiAgICAgICAgbW9kZWwubWFwVmlldy5sYXRpdHVkZSA9IG1vZGVsLnZlaGljdWxvLmxhdGl0dWQqMTtcbiAgICAgICAgbW9kZWwubWFwVmlldy5sb25naXR1ZGUgPSBtb2RlbC52ZWhpY3Vsby5sb25naXR1ZCoxO1xuICAgIH1cbiAgICBzZXRNYXJjYWRvclZhbihsYXQsbG9uLHRpcG8saWQpe1xuICAgICAgICBjb25zb2xlLmxvZygnU2V0ZWFuZG8gbWFyY2Fkb3IgZGUgbGEgVkFOJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdQaW50YW5kbyBtYXJjYWRvcjogJytsYXQrJyAtICcrbG9uKycgLSAnK3RpcG8pO1xuICAgICAgICBsZXQgbW9kZWwgPSB0aGlzO1xuICAgICAgICBpZighbW9kZWwudmFuKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDcmVhbmRvIHZhbiBkZSBjZXJvJyk7XG4gICAgICAgICAgICBtb2RlbC52YW4gPSBuZXcgTWFya2VyKCk7XG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZU1vZHVsZS5JbWFnZSgpO1xuICAgICAgICAgICAgaW1hZ2Uud2lkdGg9MjA7IFxuICAgICAgICAgICAgaW1hZ2UuaGVpZ2h0PTIwOyBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaW1hZ2UuaW1hZ2VTb3VyY2UgPSBpbWFnZVNvdXJjZS5mcm9tUmVzb3VyY2UoJ3ZhbicpO1xuXG4gICAgICAgICAgICBtb2RlbC52YW4udGl0bGUgPSBcIlViaWNhY2nDs24gZGVsIHZlaMOtY3Vsb1wiOyAgXG4gICAgICAgICAgICBtb2RlbC52YW4ucG9zaXRpb24gPSBQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcobGF0LCBsb24pO1xuICAgICAgICAgICAgbW9kZWwudmFuLmljb249aW1hZ2U7XG4gICAgICAgICAgICBtb2RlbC52YW4uc25pcHBldCA9ICdEZXNjcmlwY2nDs24gZGVsIHB1bnRvJztcbiAgICAgICAgICAgIG1vZGVsLnZhbi51c2VyRGF0YSA9IHtpbmRleDogMSxpZDogaWR9O1xuICAgICAgICAgICAgbW9kZWwubWFwVmlldy5hZGRNYXJrZXIobW9kZWwudmFuKTsgXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0FjdHVhbGl6YW5kbyB2YW4nKTtcbiAgICAgICAgICAgIG1vZGVsLnZhbi5wb3NpdGlvbiA9IFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhtb2RlbC52ZWhpY3Vsby5sYXRpdHVkLG1vZGVsLnZlaGljdWxvLmxvbmdpdHVkKTtcblxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgIFxuICAgIH1cblxuICAgIHNldE1hcmNhZG9yKGxhdCxsb24sdGlwbyxpZCl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdQaW50YW5kbyBtYXJjYWRvcjogJytsYXQrJyAtICcrbG9uKycgLSAnK3RpcG8pO1xuICAgICAgICB2YXIgbWFya2VyID0gbmV3IE1hcmtlcigpO1xuICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZU1vZHVsZS5JbWFnZSgpO1xuICAgICAgICBpbWFnZS53aWR0aD0yMDsgXG4gICAgICAgIGltYWdlLmhlaWdodD0yMDsgXG4gICAgICAgIGlmKHRpcG8gPT0gJ2luaWNpbycpe1xuICAgICAgICAgICAgaW1hZ2UuaW1hZ2VTb3VyY2UgPSBpbWFnZVNvdXJjZS5mcm9tUmVzb3VyY2UoJ2luaWNpbycpOyAgXG4gICAgICAgICAgICBtYXJrZXIudGl0bGUgPSBcIlB1bnRvIGRlIGluaWNpb1wiO1xuICAgICAgICB9ZWxzZSBpZih0aXBvID09ICdmaW4nKXtcbiAgICAgICAgICAgIGltYWdlLmltYWdlU291cmNlID0gaW1hZ2VTb3VyY2UuZnJvbVJlc291cmNlKCdmaW4nKTtcbiAgICAgICAgICAgIG1hcmtlci50aXRsZSA9IFwiUHVudG8gZmluYWxcIjtcbiAgICAgICAgfWVsc2UgaWYodGlwbyA9PSAncGFzYWplcm8nKXtcbiAgICAgICAgICAgIG1hcmtlci50aXRsZSA9IFwiVHUgdWJpY2FjacOzblwiOyAgXG4gICAgICAgICAgICBpbWFnZS5pbWFnZVNvdXJjZSA9IGltYWdlU291cmNlLmZyb21SZXNvdXJjZSgncGFzYWplcm8nKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9IFxuXG4gICAgICAgIFxuICAgICAgICBtYXJrZXIucG9zaXRpb24gPSBQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcobGF0LCBsb24pO1xuICAgICAgICBtYXJrZXIuaWNvbj1pbWFnZTtcbiAgICAgICAgbWFya2VyLnNuaXBwZXQgPSAnRGVzY3JpcGNpw7NuIGRlbCBwdW50byc7XG4gICAgICAgIG1hcmtlci51c2VyRGF0YSA9IHtpbmRleDogMSxpZDogaWR9O1xuICAgICAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKG1hcmtlcik7IFxuICAgIH1cblxuICAgIGRpYnVqYXJSdXRhKGxhdCxsb24sbGF0Mixsb24yLHBhcmFkYXMpIHtcbiAgICAgICAgbG9hZGVyLnNob3coKTtcbiAgICAgICAgdGhpcy5teVNlcnZpY2UuZ2V0RGF0YShsYXQsbG9uLGxhdDIsbG9uMixwYXJhZGFzKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFTdWNjZXNzKHJlc3VsdCk7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uR2V0RGF0YVN1Y2Nlc3MocmVzKSB7XG4gICAgICAgIHRoaXMuZW5jb2RlZFBvaW50cyA9IHBsLmRlY29kZShyZXMucm91dGVzWzBdLm92ZXJ2aWV3X3BvbHlsaW5lLnBvaW50cyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdBUVVJIFZBTiBMT1MgUFVOVE9TJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZW5jb2RlZFBvaW50cyk7IFxuICAgICAgICBjb25zdCBtYXAgPSB0aGlzLm1hcFZpZXc7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gdGhpcztcblxuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuZW5jb2RlZFBvaW50cztcblxuICAgICAgICBsZXQgbGluZSA9IG5ldyBQb2x5bGluZSgpO1xuICAgICAgICBsaW5lLnZpc2libGUgPSB0cnVlO1xuICAgICAgICBsaW5lLndpZHRoID0gNDtcbiAgICAgICAgbGluZS5jb2xvciA9IG5ldyBDb2xvcignIzE1M2Q3YScpO1xuICAgICAgICBsaW5lLmdlb2Rlc2ljID0gdHJ1ZTtcbiAgICAgICAgbGluZS5jbGlja2FibGU9dHJ1ZTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxpbmUuYWRkUG9pbnQoUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKGxpc3RbaV1bMF0sbGlzdFtpXVsxXSkpO1xuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIG1hcC5hZGRQb2x5bGluZShsaW5lKTtcblxuICAgICAgICBsb2FkZXIuaGlkZSgpO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkdldERhdGFFcnJvcihlcnJvcjogUmVzcG9uc2UgfCBhbnkpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJvbkdldERhdGFFcnJvcjogXCIgKyBKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgIH1cbn1cbiJdfQ==