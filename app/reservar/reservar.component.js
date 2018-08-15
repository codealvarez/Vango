"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var router_1 = require("nativescript-angular/router");
var ws_service_1 = require("../ws.service");
var ApplicationSettings = require("application-settings");
var dialogs = require("ui/dialogs");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
//Imágenes para los marcadores
var imageSource = require("tns-core-modules/image-source");
var ImageModule = require("tns-core-modules/ui/image");
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "reservar", loadChildren: "./reservar/reservar.module#ReservarModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var ReservarComponent = /** @class */ (function () {
    function ReservarComponent(routerExtensions, myService) {
        this.routerExtensions = routerExtensions;
        this.myService = myService;
        this.valor = 0;
        this.valorTotal = 0;
        this.valido = false;
        this.tarjetas = [];
        this.tarjeta = 'Selecciona una tarjeta de pago';
        this.textoBoton = 'PAGAR Y RESERVAR';
        //MAPA
        this.latitude = ApplicationSettings.getNumber('latReserva'); //Colombia4.587799, -73.940960
        //latitude:number; //Colombia4.587799, -73.940960
        this.longitude = ApplicationSettings.getNumber('lonReserva'); //Clombia
        this.zoom = 19;
        this.minZoom = 0;
        this.maxZoom = 22;
        this.bearing = 0;
        this.tilt = 0;
        this.padding = [40, 40, 40, 40];
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
        this.pasajeros = 1;
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
        this.latitud = ApplicationSettings.getNumber('latReserva');
        this.longitud = ApplicationSettings.getNumber('lonReserva');
        this.direccion = ApplicationSettings.getString('dirReserva');
        this.idviaje = ApplicationSettings.getNumber('viajeReserva');
        this.idruta = ApplicationSettings.getNumber('rutaReserva');
        this.valor = ApplicationSettings.getNumber('precioReserva');
        this.valorTotal = this.valor;
        if (this.valor == 0) {
            this.textoBoton = 'RESERVAR';
        }
    }
    ReservarComponent.prototype.irAtras = function () {
        this.routerExtensions.back();
    };
    ReservarComponent.prototype.ngOnInit = function () {
        var _this = this;
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
        loader.show();
        var usuario = ApplicationSettings.getString('emailUsuario');
        var idmember = ApplicationSettings.getString('idmember');
        if (idmember) {
            this.valido = true;
            console.log('Con idmember: ' + idmember);
            this.myService.getTarjetas(idmember, usuario).subscribe(function (result) {
                _this.exitoTarjetas(result);
            }, function (error) {
                _this.onGetDataError(error);
            });
        }
        else {
            console.log('Sin idmember');
            this.valido = false;
            this.tarjeta = 'No tienes tarjetas asociadas a tu cuenta';
            loader.hide();
        }
    };
    ReservarComponent.prototype.exitoTarjetas = function (res) {
        loader.hide();
        console.log('Respuesta de las tarjetas: ' + Object.keys(res.tarjetas).length);
        console.log(JSON.stringify(res));
        if (Object.keys(res.tarjetas).length > 0) {
            for (var i = 0; i < Object.keys(res.tarjetas).length; i++) {
                console.log('Pintando a:');
                console.log(res.tarjetas[i]); // "species"
                this.tarjetas.push(res.tarjetas[i]);
            }
        }
        else {
        }
    };
    ReservarComponent.prototype.displayActionDialog = function () {
        var _this = this;
        // >> action-dialog-code
        console.log(this.tarjetas);
        var opciones = [];
        for (var i = 0; i < Object.keys(this.tarjetas).length; i++) {
            opciones.push('****-****-****-' + this.tarjetas[i].numero_tarjeta);
        }
        console.log(opciones);
        var options = {
            title: "Selecciona una tarjeta",
            message: "Selecciona una tarjeta",
            cancelButtonText: "Cancelar",
            actions: opciones
        };
        dialogs.action(options).then(function (result) {
            console.log(result);
            if (result == 'Cancelar') {
                _this.tarjeta = 'Selecciona una tarjeta de pago';
            }
            else {
                var numTarjeta = result.split('****-****-****-')[1];
                for (var i = 0; i < Object.keys(_this.tarjetas).length; i++) {
                    if (numTarjeta == _this.tarjetas[i].numero_tarjeta) {
                        _this.idTarjeta = _this.tarjetas[i].id;
                    }
                }
                _this.tarjeta = result;
            }
        });
        // << action-dialog-code
    };
    ReservarComponent.prototype.aumentar = function () {
        if (this.pasajeros < 6) {
            this.pasajeros++;
            this.valorTotal = this.valor * this.pasajeros;
        }
        console.log(this.pasajeros);
    };
    ReservarComponent.prototype.disminuir = function () {
        if (this.pasajeros > 1) {
            this.pasajeros--;
            this.valorTotal = this.valor * this.pasajeros;
        }
        console.log(this.pasajeros);
    };
    ReservarComponent.prototype.pagar = function () {
        var _this = this;
        loader.show();
        console.log('Precio a pagar: ' + this.valorTotal);
        if (this.valor == 0) {
            this.reservar();
        }
        else {
            console.log('Pagar con la tarjeta: ' + this.idTarjeta);
            if (this.idTarjeta) {
                var usuario = ApplicationSettings.getString('emailUsuario');
                var idmember = ApplicationSettings.getString('idmember');
                this.myService.pagar(idmember, usuario, '' + this.idTarjeta + '', '' + this.valorTotal + '').subscribe(function (result) {
                    _this.exitoPago(result);
                }, function (error) {
                    _this.onGetDataError(error);
                });
            }
            else {
                dialogs.alert({
                    title: 'Error',
                    message: "Debes seleccionar una tarjeta para realizar pago",
                    okButtonText: 'Ok'
                }).then(function () {
                    console.log("Dialog closed!");
                    loader.hide();
                });
            }
        }
    };
    ReservarComponent.prototype.exitoPago = function (res) {
        var _this = this;
        console.log('Respuesta del pago');
        console.log(JSON.stringify(res));
        loader.hide();
        if (res.numaprobacion) {
            dialogs.alert({
                title: 'Pago realizado exitosamente',
                message: "Tu pago se realizó correctamente, número de aprobación: " + res.numaprobacion + ", estamos realizando la reserva.",
                okButtonText: 'Ok'
            }).then(function () {
                console.log("Dialog closed!");
                _this.reservar();
            });
        }
        else {
            dialogs.alert({
                title: 'Error realizando pago',
                message: "Lo sentimos, hubo un problema realizando el pago. " + res.error,
                okButtonText: 'Ok'
            }).then(function () {
                console.log("Dialog closed!");
            });
        }
    };
    ReservarComponent.prototype.reservar = function () {
        var _this = this;
        loader.show();
        var idPasajero = ApplicationSettings.getString("idUsuario");
        var idViaje = this.idviaje;
        var latitud = this.latitud;
        var longitud = this.longitud;
        var cantidad = this.pasajeros;
        var direccion = this.direccion;
        this.myService.setReserva(idPasajero, idViaje, latitud, longitud, direccion, cantidad)
            .subscribe(function (result) {
            _this.onGetDataSuccess(result);
        }, function (error) {
            _this.onGetDataError(error);
        });
    };
    ReservarComponent.prototype.onGetDataSuccess = function (res) {
        var _this = this;
        console.log('Respuesta del login');
        console.log(JSON.stringify(res));
        loader.hide();
        if (res.resultado == 'OK') {
            dialogs.alert({
                title: "Reserva confirmada!",
                message: "Tu servicio ha sido reservado exitosamente.",
                okButtonText: 'Gracias!'
            }).then(function () {
                _this.routerExtensions.navigate(["/reservas"]);
            });
        }
        else {
            dialogs.alert({
                title: "Error de reserva",
                message: "Lo sentimos, hubo un problema realizando tu reserva. Por favor intenta nuevamente.",
                okButtonText: 'Ok'
            }).then(function () {
                _this.routerExtensions.navigate(["/reservas"]);
            });
        }
    };
    ReservarComponent.prototype.onGetDataError = function (error) {
        loader.hide();
        console.log('Respuesta de error');
        console.log(JSON.stringify(error));
        dialogs.alert({
            title: 'Error de conexión',
            message: "Lo sentimos, hubo un problema encontrando el servidor, verifica tu conexión a Internet e intenta nuevamente.",
            okButtonText: 'Ok'
        }).then(function () {
            console.log("Dialog closed!");
        });
    };
    ReservarComponent.prototype.onMapReady = function (event) {
        console.log('Map Ready');
        var model = this;
        model.mapView = event.object;
        model.mapView.setStyle((this.styles));
        model.setMarcador(model.latitude, model.longitude, 'pasajero', 2);
    };
    ReservarComponent.prototype.onCoordinateTapped = function (args) {
        //console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
    };
    ReservarComponent.prototype.onMarkerEvent = function (args) {
    };
    ReservarComponent.prototype.onCameraChanged = function (args) {
        console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
        this.lastCamera = JSON.stringify(args.camera);
    };
    ReservarComponent.prototype.setMarcador = function (lat, lon, tipo, id) {
        var model = this;
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
        model.mapView.addMarker(marker);
    };
    ReservarComponent = __decorate([
        core_1.Component({
            selector: "Reservar",
            moduleId: module.id,
            templateUrl: "./reservar.component.html"
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions, ws_service_1.WebService])
    ], ReservarComponent);
    return ReservarComponent;
}());
exports.ReservarComponent = ReservarComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXJ2YXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzZXJ2YXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDZFQUFrRztBQUNsRyxzREFBNkQ7QUFDN0QsNENBQTJDO0FBQzNDLDBEQUE0RDtBQUM1RCxvQ0FBc0M7QUFDdEMsaUZBQWdFO0FBR2hFLDhCQUE4QjtBQUM5QiwyREFBNkQ7QUFDN0QsdURBQXlEO0FBQ3pEOzs7Ozs4REFLOEQ7QUFDOUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxpREFBZ0IsRUFBRSxDQUFDO0FBTXBDO0lBd1ZJLDJCQUFvQixnQkFBa0MsRUFBVSxTQUFxQjtRQUFqRSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBWTtRQWxWOUUsVUFBSyxHQUFRLENBQUMsQ0FBQztRQUNmLGVBQVUsR0FBUSxDQUFDLENBQUM7UUFDcEIsV0FBTSxHQUFTLEtBQUssQ0FBQztRQUNyQixhQUFRLEdBQUMsRUFBRSxDQUFDO1FBQ1osWUFBTyxHQUFRLGdDQUFnQyxDQUFDO1FBRWhELGVBQVUsR0FBUSxrQkFBa0IsQ0FBQztRQUU1QyxNQUFNO1FBQ04sYUFBUSxHQUFFLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLDhCQUE4QjtRQUNyRixpREFBaUQ7UUFDakQsY0FBUyxHQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFNBQVM7UUFDaEUsU0FBSSxHQUFHLEVBQUUsQ0FBQTtRQUNULFlBQU8sR0FBRyxDQUFDLENBQUM7UUFDWixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2IsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLFNBQUksR0FBRyxDQUFDLENBQUM7UUFDVCxZQUFPLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMs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Q0FBQztRQUdELE1BQU0sQ0FBQyxRQUFRLEdBQUcsdUNBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDeEQsTUFBTSxDQUFDLElBQUksR0FBQyxLQUFLLENBQUM7UUFDbEIsTUFBTSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQztRQUN6QyxNQUFNLENBQUMsUUFBUSxHQUFHLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBQyxFQUFFLEVBQUUsRUFBRSxFQUFDLENBQUM7UUFDcEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQXZtQlEsaUJBQWlCO1FBTDdCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDJCQUEyQjtTQUMzQyxDQUFDO3lDQXlWd0MseUJBQWdCLEVBQXFCLHVCQUFVO09BeFY1RSxpQkFBaUIsQ0F3bUI3QjtJQUFELHdCQUFDO0NBQUEsQUF4bUJELElBd21CQztBQXhtQlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTWFwVmlldywgTWFya2VyLCBQb3NpdGlvbiwgUG9seWxpbmUsIEJvdW5kcywgU3R5bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrJztcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgV2ViU2VydmljZSB9IGZyb20gXCIuLi93cy5zZXJ2aWNlXCI7XG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0IHtMb2FkaW5nSW5kaWNhdG9yfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7XG5pbXBvcnQgKiBhcyBnZW9sb2NhdGlvbiBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XG5pbXBvcnQgeyBBY2N1cmFjeSB9IGZyb20gXCJ1aS9lbnVtc1wiO1xuLy9JbcOhZ2VuZXMgcGFyYSBsb3MgbWFyY2Fkb3Jlc1xuaW1wb3J0ICogYXMgaW1hZ2VTb3VyY2UgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2Utc291cmNlXCI7XG5pbXBvcnQgKiBhcyBJbWFnZU1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9pbWFnZVwiO1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiogQmVmb3JlIHlvdSBjYW4gbmF2aWdhdGUgdG8gdGhpcyBwYWdlIGZyb20geW91ciBhcHAsIHlvdSBuZWVkIHRvIHJlZmVyZW5jZSB0aGlzIHBhZ2UncyBtb2R1bGUgaW4gdGhlXG4qIGdsb2JhbCBhcHAgcm91dGVyIG1vZHVsZS4gQWRkIHRoZSBmb2xsb3dpbmcgb2JqZWN0IHRvIHRoZSBnbG9iYWwgYXJyYXkgb2Ygcm91dGVzOlxuKiB7IHBhdGg6IFwicmVzZXJ2YXJcIiwgbG9hZENoaWxkcmVuOiBcIi4vcmVzZXJ2YXIvcmVzZXJ2YXIubW9kdWxlI1Jlc2VydmFyTW9kdWxlXCIgfVxuKiBOb3RlIHRoYXQgdGhpcyBzaW1wbHkgcG9pbnRzIHRoZSBwYXRoIHRvIHRoZSBwYWdlIG1vZHVsZSBmaWxlLiBJZiB5b3UgbW92ZSB0aGUgcGFnZSwgeW91IG5lZWQgdG8gdXBkYXRlIHRoZSByb3V0ZSB0b28uXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xubGV0IGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJSZXNlcnZhclwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9yZXNlcnZhci5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIFJlc2VydmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwdWJsaWMgbGF0aXR1ZDpudW1iZXI7XG4gICAgcHVibGljIGxvbmdpdHVkOm51bWJlcjtcbiAgICBwdWJsaWMgZGlyZWNjaW9uOnN0cmluZztcbiAgICBwdWJsaWMgaWR2aWFqZTpudW1iZXI7XG4gICAgcHVibGljIGlkcnV0YTpudW1iZXI7XG4gICAgcHVibGljIHZhbG9yOm51bWJlcj0wO1xuICAgIHB1YmxpYyB2YWxvclRvdGFsOm51bWJlcj0wO1xuICAgIHB1YmxpYyB2YWxpZG86Ym9vbGVhbj1mYWxzZTtcbiAgICBwdWJsaWMgdGFyamV0YXM9W107XG4gICAgcHVibGljIHRhcmpldGE6c3RyaW5nPSdTZWxlY2Npb25hIHVuYSB0YXJqZXRhIGRlIHBhZ28nO1xuICAgIHB1YmxpYyBpZFRhcmpldGE6c3RyaW5nO1xuICAgIHB1YmxpYyB0ZXh0b0JvdG9uOnN0cmluZz0nUEFHQVIgWSBSRVNFUlZBUic7XG5cbiAgICAvL01BUEFcbiAgICBsYXRpdHVkZT0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXROdW1iZXIoJ2xhdFJlc2VydmEnKTsgLy9Db2xvbWJpYTQuNTg3Nzk5LCAtNzMuOTQwOTYwXG4gICAgLy9sYXRpdHVkZTpudW1iZXI7IC8vQ29sb21iaWE0LjU4Nzc5OSwgLTczLjk0MDk2MFxuICAgIGxvbmdpdHVkZT1BcHBsaWNhdGlvblNldHRpbmdzLmdldE51bWJlcignbG9uUmVzZXJ2YScpOyAvL0Nsb21iaWFcbiAgICB6b29tID0gMTlcbiAgICBtaW5ab29tID0gMDsgXG4gICAgbWF4Wm9vbSA9IDIyO1xuICAgIGJlYXJpbmcgPSAwO1xuICAgIHRpbHQgPSAwO1xuICAgIHBhZGRpbmcgPSBbNDAsIDQwLCA0MCwgNDBdO1xuICAgIG1hcFZpZXc6IE1hcFZpZXc7XG4gICAgc3R5bGVzPVtcbiAgICAgICAge1xuICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFsbFwiLFxuICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzdjOTNhM1wiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IFwiLTEwXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZS5jb3VudHJ5XCIsXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmUuY291bnRyeVwiLFxuICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjYTBhNGE1XCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZS5wcm92aW5jZVwiLFxuICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNjI4MzhlXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGVcIixcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiBcIi0yOVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlXCIsXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZGRlM2UzXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGUubWFuX21hZGVcIixcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZS5tYW5fbWFkZVwiLFxuICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGUubWFuX21hZGVcIixcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzNmNGE1MVwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwid2VpZ2h0XCI6IFwiMC4zMFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogXCI3NFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLmF0dHJhY3Rpb25cIixcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLmJ1c2luZXNzXCIsXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kuZ292ZXJubWVudFwiLFxuICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLm1lZGljYWxcIixcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLnBhcmtcIixcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLnBsYWNlX29mX3dvcnNoaXBcIixcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLnNjaG9vbFwiLFxuICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLnNwb3J0c19jb21wbGV4XCIsXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJzYXR1cmF0aW9uXCI6IFwiLTEwMFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuc3Ryb2tlXCIsXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2JiY2FjZlwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuc3Ryb2tlXCIsXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogXCIwXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNiYmNhY2ZcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcIndlaWdodFwiOiBcIjAuNTBcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLFxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dFwiLFxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXkuY29udHJvbGxlZF9hY2Nlc3NcIixcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheS5jb250cm9sbGVkX2FjY2Vzc1wiLFxuICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjYTliNGI4XCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmFydGVyaWFsXCIsXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLmljb25cIixcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImludmVydF9saWdodG5lc3NcIjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcInNhdHVyYXRpb25cIjogXCItN1wiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IFwiM1wiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiZ2FtbWFcIjogXCIxLjgwXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ3ZWlnaHRcIjogXCIwLjAxXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmxvY2FsXCIsXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXRcIixcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXQuc3RhdGlvbi5idXNcIixcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNhM2M3ZGZcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIF07XG5cbiAgICBsYXN0Q2FtZXJhOiBTdHJpbmc7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIG15U2VydmljZTogV2ViU2VydmljZSkge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFVzZSB0aGUgY29uc3RydWN0b3IgdG8gaW5qZWN0IGFwcCBzZXJ2aWNlcyB0aGF0IHlvdSBuZWVkIGluIHRoaXMgY29tcG9uZW50LlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgICAgICB0aGlzLmxhdGl0dWQgPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldE51bWJlcignbGF0UmVzZXJ2YScpO1xuICAgICAgICB0aGlzLmxvbmdpdHVkID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXROdW1iZXIoJ2xvblJlc2VydmEnKTtcbiAgICAgICAgdGhpcy5kaXJlY2Npb24gPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnZGlyUmVzZXJ2YScpO1xuICAgICAgICB0aGlzLmlkdmlhamUgPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldE51bWJlcigndmlhamVSZXNlcnZhJyk7XG4gICAgICAgIHRoaXMuaWRydXRhID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXROdW1iZXIoJ3J1dGFSZXNlcnZhJyk7XG4gICAgICAgIHRoaXMudmFsb3IgPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldE51bWJlcigncHJlY2lvUmVzZXJ2YScpO1xuICAgICAgICB0aGlzLnZhbG9yVG90YWwgPSB0aGlzLnZhbG9yO1xuICAgICAgICBpZih0aGlzLnZhbG9yID09IDApe1xuICAgICAgICAgICAgdGhpcy50ZXh0b0JvdG9uID0gJ1JFU0VSVkFSJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlyQXRyYXMoKSB7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBVc2UgdGhlIFwibmdPbkluaXRcIiBoYW5kbGVyIHRvIGluaXRpYWxpemUgZGF0YSBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgICAgIGxvYWRlci5zaG93KCk7XG4gICAgICAgIGxldCB1c3VhcmlvID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ2VtYWlsVXN1YXJpbycpO1xuICAgICAgICBsZXQgaWRtZW1iZXIgPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnaWRtZW1iZXInKTtcbiAgICAgICAgaWYoaWRtZW1iZXIpe1xuICAgICAgICAgICAgdGhpcy52YWxpZG89dHJ1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb24gaWRtZW1iZXI6ICcraWRtZW1iZXIpO1xuICAgICAgICAgICAgdGhpcy5teVNlcnZpY2UuZ2V0VGFyamV0YXMoaWRtZW1iZXIsdXN1YXJpbykuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4aXRvVGFyamV0YXMocmVzdWx0KTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU2luIGlkbWVtYmVyJyk7XG4gICAgICAgICAgICB0aGlzLnZhbGlkbz1mYWxzZTtcbiAgICAgICAgICAgIHRoaXMudGFyamV0YT0nTm8gdGllbmVzIHRhcmpldGFzIGFzb2NpYWRhcyBhIHR1IGN1ZW50YSc7XG4gICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfSBcbiAgICBleGl0b1RhcmpldGFzKHJlcykge1xuICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlIGxhcyB0YXJqZXRhczogJytPYmplY3Qua2V5cyhyZXMudGFyamV0YXMpLmxlbmd0aCk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlcykpO1xuICAgICAgICBpZihPYmplY3Qua2V5cyhyZXMudGFyamV0YXMpLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXMocmVzLnRhcmpldGFzKS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQaW50YW5kbyBhOicpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy50YXJqZXRhc1tpXSk7IC8vIFwic3BlY2llc1wiXG5cbiAgICAgICAgICAgICAgICB0aGlzLnRhcmpldGFzLnB1c2gocmVzLnRhcmpldGFzW2ldKTsgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuXG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICB9XG4gICAgZGlzcGxheUFjdGlvbkRpYWxvZygpIHtcbiAgICAgICAgLy8gPj4gYWN0aW9uLWRpYWxvZy1jb2RlXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudGFyamV0YXMpO1xuICAgICAgICBsZXQgb3BjaW9uZXMgPSBbXTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXModGhpcy50YXJqZXRhcykubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG9wY2lvbmVzLnB1c2goJyoqKiotKioqKi0qKioqLScrdGhpcy50YXJqZXRhc1tpXS5udW1lcm9fdGFyamV0YSk7IFxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKG9wY2lvbmVzKTtcblxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIlNlbGVjY2lvbmEgdW5hIHRhcmpldGFcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiU2VsZWNjaW9uYSB1bmEgdGFyamV0YVwiLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxhclwiLFxuICAgICAgICAgICAgYWN0aW9uczogb3BjaW9uZXNcbiAgICAgICAgfTtcblxuICAgICAgICBkaWFsb2dzLmFjdGlvbihvcHRpb25zKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICBpZihyZXN1bHQgPT0gJ0NhbmNlbGFyJyl7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJqZXRhID0gJ1NlbGVjY2lvbmEgdW5hIHRhcmpldGEgZGUgcGFnbyc7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBsZXQgbnVtVGFyamV0YSA9IHJlc3VsdC5zcGxpdCgnKioqKi0qKioqLSoqKiotJylbMV07XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXModGhpcy50YXJqZXRhcykubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYobnVtVGFyamV0YSA9PSB0aGlzLnRhcmpldGFzW2ldLm51bWVyb190YXJqZXRhKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaWRUYXJqZXRhID0gdGhpcy50YXJqZXRhc1tpXS5pZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnRhcmpldGEgPSByZXN1bHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gPDwgYWN0aW9uLWRpYWxvZy1jb2RlXG4gICAgfVxuXG4gICAgcHVibGljIHBhc2FqZXJvczogbnVtYmVyID0gMTtcblxuICAgIFxuICAgIHB1YmxpYyBhdW1lbnRhcigpe1xuICAgICAgICBpZih0aGlzLnBhc2FqZXJvcyA8IDYpe1xuICAgICAgICAgICAgdGhpcy5wYXNhamVyb3MrKztcbiAgICAgICAgICAgIHRoaXMudmFsb3JUb3RhbCA9IHRoaXMudmFsb3IqdGhpcy5wYXNhamVyb3M7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5wYXNhamVyb3MpO1xuICAgIH1cbiAgICBwdWJsaWMgZGlzbWludWlyKCl7XG4gICAgICAgIGlmKHRoaXMucGFzYWplcm9zID4gMSl7XG4gICAgICAgICAgICB0aGlzLnBhc2FqZXJvcy0tO1xuICAgICAgICAgICAgdGhpcy52YWxvclRvdGFsID0gdGhpcy52YWxvcip0aGlzLnBhc2FqZXJvcztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5wYXNhamVyb3MpO1xuICAgIH1cbiAgICBwdWJsaWMgcGFnYXIoKXtcbiAgICAgICAgbG9hZGVyLnNob3coKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1ByZWNpbyBhIHBhZ2FyOiAnK3RoaXMudmFsb3JUb3RhbCk7XG4gICAgICAgIGlmKHRoaXMudmFsb3IgPT0gMCl7XG4gICAgICAgICAgICB0aGlzLnJlc2VydmFyKCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1BhZ2FyIGNvbiBsYSB0YXJqZXRhOiAnK3RoaXMuaWRUYXJqZXRhKTtcbiAgICAgICAgICAgIGlmKHRoaXMuaWRUYXJqZXRhKXtcbiAgICAgICAgICAgICAgICBsZXQgdXN1YXJpbyA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdlbWFpbFVzdWFyaW8nKTtcbiAgICAgICAgICAgICAgICBsZXQgaWRtZW1iZXIgPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnaWRtZW1iZXInKTtcbiAgICAgICAgICAgICAgICB0aGlzLm15U2VydmljZS5wYWdhcihpZG1lbWJlcix1c3VhcmlvLCcnK3RoaXMuaWRUYXJqZXRhKycnLCcnK3RoaXMudmFsb3JUb3RhbCsnJykuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leGl0b1BhZ28ocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdFcnJvcicsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiRGViZXMgc2VsZWNjaW9uYXIgdW5hIHRhcmpldGEgcGFyYSByZWFsaXphciBwYWdvXCIsXG4gICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ09rJ1xuICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBleGl0b1BhZ28ocmVzKXtcbiAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZWwgcGFnbycpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXMpKTsgXG4gICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgIGlmKHJlcy5udW1hcHJvYmFjaW9uKXtcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnUGFnbyByZWFsaXphZG8gZXhpdG9zYW1lbnRlJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlR1IHBhZ28gc2UgcmVhbGl6w7MgY29ycmVjdGFtZW50ZSwgbsO6bWVybyBkZSBhcHJvYmFjacOzbjogXCIrcmVzLm51bWFwcm9iYWNpb24rXCIsIGVzdGFtb3MgcmVhbGl6YW5kbyBsYSByZXNlcnZhLlwiLFxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ09rJ1xuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2VydmFyKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0Vycm9yIHJlYWxpemFuZG8gcGFnbycsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJMbyBzZW50aW1vcywgaHVibyB1biBwcm9ibGVtYSByZWFsaXphbmRvIGVsIHBhZ28uIFwiK3Jlcy5lcnJvcixcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6ICdPaydcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgcmVzZXJ2YXIoKXtcbiAgICAgICAgbG9hZGVyLnNob3coKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGlkUGFzYWplcm8gPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcImlkVXN1YXJpb1wiKTtcbiAgICAgICAgY29uc3QgaWRWaWFqZSA9IHRoaXMuaWR2aWFqZTtcbiAgICAgICAgY29uc3QgbGF0aXR1ZCA9IHRoaXMubGF0aXR1ZDtcbiAgICAgICAgY29uc3QgbG9uZ2l0dWQgPSB0aGlzLmxvbmdpdHVkO1xuICAgICAgICBjb25zdCBjYW50aWRhZCA9IHRoaXMucGFzYWplcm9zO1xuICAgICAgICBjb25zdCBkaXJlY2Npb24gPSB0aGlzLmRpcmVjY2lvbjtcbiAgICAgICAgdGhpcy5teVNlcnZpY2Uuc2V0UmVzZXJ2YShpZFBhc2FqZXJvLGlkVmlhamUsbGF0aXR1ZCxsb25naXR1ZCxkaXJlY2Npb24sY2FudGlkYWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YVN1Y2Nlc3MocmVzdWx0KTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuXG4gICAgfVxuXG4gICAgb25HZXREYXRhU3VjY2VzcyhyZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZWwgbG9naW4nKTtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzKSk7IFxuICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICBpZihyZXMucmVzdWx0YWRvID09ICdPSycpe1xuICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiUmVzZXJ2YSBjb25maXJtYWRhIVwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6XCJUdSBzZXJ2aWNpbyBoYSBzaWRvIHJlc2VydmFkbyBleGl0b3NhbWVudGUuXCIsXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnR3JhY2lhcyEnXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3Jlc2VydmFzXCJdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICBcbiAgICAgICAgfWVsc2V7IFxuICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiRXJyb3IgZGUgcmVzZXJ2YVwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6XCJMbyBzZW50aW1vcywgaHVibyB1biBwcm9ibGVtYSByZWFsaXphbmRvIHR1IHJlc2VydmEuIFBvciBmYXZvciBpbnRlbnRhIG51ZXZhbWVudGUuXCIsXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3Jlc2VydmFzXCJdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkdldERhdGFFcnJvcihlcnJvcjogUmVzcG9uc2UgfCBhbnkpIHtcbiAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZSBlcnJvcicpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiAnRXJyb3IgZGUgY29uZXhpw7NuJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiTG8gc2VudGltb3MsIGh1Ym8gdW4gcHJvYmxlbWEgZW5jb250cmFuZG8gZWwgc2Vydmlkb3IsIHZlcmlmaWNhIHR1IGNvbmV4acOzbiBhIEludGVybmV0IGUgaW50ZW50YSBudWV2YW1lbnRlLlwiLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25NYXBSZWFkeShldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnTWFwIFJlYWR5Jyk7XG5cbiAgICAgICAgXG5cbiAgICAgICAgbGV0IG1vZGVsID0gdGhpcztcbiAgICAgICAgbW9kZWwubWFwVmlldyA9IGV2ZW50Lm9iamVjdDtcblxuICAgICAgICBtb2RlbC5tYXBWaWV3LnNldFN0eWxlKDxTdHlsZT4odGhpcy5zdHlsZXMpKTtcbiAgICAgICAgbW9kZWwuc2V0TWFyY2Fkb3IobW9kZWwubGF0aXR1ZGUsbW9kZWwubG9uZ2l0dWRlLCdwYXNhamVybycsMik7XG4gICAgICAgIFxuICAgIH1cbiAgICBvbkNvb3JkaW5hdGVUYXBwZWQoYXJncykge1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJDb29yZGluYXRlIFRhcHBlZCwgTGF0OiBcIiArIGFyZ3MucG9zaXRpb24ubGF0aXR1ZGUgKyBcIiwgTG9uOiBcIiArIGFyZ3MucG9zaXRpb24ubG9uZ2l0dWRlLCBhcmdzKTtcbiAgICB9XG5cbiAgICBvbk1hcmtlckV2ZW50KGFyZ3MpIHtcbiAgICB9IFxuXG4gICAgb25DYW1lcmFDaGFuZ2VkKGFyZ3MpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJDYW1lcmEgY2hhbmdlZDogXCIgKyBKU09OLnN0cmluZ2lmeShhcmdzLmNhbWVyYSksIEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKSA9PT0gdGhpcy5sYXN0Q2FtZXJhKTtcbiAgICAgICAgdGhpcy5sYXN0Q2FtZXJhID0gSlNPTi5zdHJpbmdpZnkoYXJncy5jYW1lcmEpO1xuICAgIH1cbiAgICBzZXRNYXJjYWRvcihsYXQsbG9uLHRpcG8saWQpe1xuICAgICAgICBsZXQgbW9kZWwgPSB0aGlzO1xuICAgICAgICBjb25zb2xlLmxvZygnUGludGFuZG8gbWFyY2Fkb3I6ICcrbGF0KycgLSAnK2xvbisnIC0gJyt0aXBvKTtcbiAgICAgICAgdmFyIG1hcmtlciA9IG5ldyBNYXJrZXIoKTtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2VNb2R1bGUuSW1hZ2UoKTtcbiAgICAgICAgaW1hZ2Uud2lkdGg9MjA7IFxuICAgICAgICBpbWFnZS5oZWlnaHQ9MjA7IFxuICAgICAgICBpZih0aXBvID09ICdpbmljaW8nKXtcbiAgICAgICAgICAgIGltYWdlLmltYWdlU291cmNlID0gaW1hZ2VTb3VyY2UuZnJvbVJlc291cmNlKCdpbmljaW8nKTsgIFxuICAgICAgICAgICAgbWFya2VyLnRpdGxlID0gXCJQdW50byBkZSBpbmljaW9cIjtcbiAgICAgICAgfWVsc2UgaWYodGlwbyA9PSAnZmluJyl7XG4gICAgICAgICAgICBpbWFnZS5pbWFnZVNvdXJjZSA9IGltYWdlU291cmNlLmZyb21SZXNvdXJjZSgnZmluJyk7XG4gICAgICAgICAgICBtYXJrZXIudGl0bGUgPSBcIlB1bnRvIGZpbmFsXCI7XG4gICAgICAgIH1lbHNlIGlmKHRpcG8gPT0gJ3Bhc2FqZXJvJyl7XG4gICAgICAgICAgICBtYXJrZXIudGl0bGUgPSBcIlR1IHViaWNhY2nDs25cIjsgIFxuICAgICAgICAgICAgaW1hZ2UuaW1hZ2VTb3VyY2UgPSBpbWFnZVNvdXJjZS5mcm9tUmVzb3VyY2UoJ3Bhc2FqZXJvJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSBcblxuICAgICAgICBcbiAgICAgICAgbWFya2VyLnBvc2l0aW9uID0gUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKGxhdCwgbG9uKTtcbiAgICAgICAgbWFya2VyLmljb249aW1hZ2U7XG4gICAgICAgIG1hcmtlci5zbmlwcGV0ID0gJ0Rlc2NyaXBjacOzbiBkZWwgcHVudG8nO1xuICAgICAgICBtYXJrZXIudXNlckRhdGEgPSB7aW5kZXg6IDEsaWQ6IGlkfTtcbiAgICAgICAgbW9kZWwubWFwVmlldy5hZGRNYXJrZXIobWFya2VyKTsgXG4gICAgfVxufVxuIl19