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
        this.saldo = 0;
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
        var idvango = ApplicationSettings.getString('idvango');
        if (idvango) {
            console.log('Con idmember: ' + idvango);
            this.myService.getSaldo(idvango).subscribe(function (result) {
                loader.hide();
                console.log('Resultado del saldo');
                console.log(result);
                if (result.balance) {
                    _this.saldo = result.balance * 1;
                }
            }, function (error) {
                loader.hide();
                console.log('Error consultando saldo');
                console.log(error);
            });
        }
        else {
            console.log('Sin idmember');
            /*this.myService.getIdVango(idUsuario,usuario).subscribe((result) => {
                this.exitoIdMember(result);
            }, (error) => {
                this.onGetDataError(error);
            });*/
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
        if (res.numaprobacion || res.transactionNumber) {
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
    ReservarComponent.prototype.pagarConSaldo = function () {
        var _this = this;
        loader.show();
        console.log('Precio a pagar: ' + this.valorTotal);
        if (this.valor == 0) {
            this.reservar();
        }
        else {
            console.log('Pagar con saldo: ' + this.saldo);
            if (this.saldo > this.valorTotal) {
                var idvango = ApplicationSettings.getString('idvango');
                this.myService.pagarConSaldo(idvango, '' + this.valorTotal + '').subscribe(function (result) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXJ2YXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzZXJ2YXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDZFQUFrRztBQUNsRyxzREFBNkQ7QUFDN0QsNENBQTJDO0FBQzNDLDBEQUE0RDtBQUM1RCxvQ0FBc0M7QUFDdEMsaUZBQWdFO0FBR2hFLDhCQUE4QjtBQUM5QiwyREFBNkQ7QUFDN0QsdURBQXlEO0FBQ3pEOzs7Ozs4REFLOEQ7QUFDOUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxpREFBZ0IsRUFBRSxDQUFDO0FBTXBDO0lBeVZJLDJCQUFvQixnQkFBa0MsRUFBVSxTQUFxQjtRQUFqRSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBWTtRQW5WOUUsVUFBSyxHQUFRLENBQUMsQ0FBQztRQUNmLGVBQVUsR0FBUSxDQUFDLENBQUM7UUFDcEIsV0FBTSxHQUFTLEtBQUssQ0FBQztRQUNyQixhQUFRLEdBQUMsRUFBRSxDQUFDO1FBQ1osWUFBTyxHQUFRLGdDQUFnQyxDQUFDO1FBRWhELGVBQVUsR0FBUSxrQkFBa0IsQ0FBQztRQUNyQyxVQUFLLEdBQVEsQ0FBQyxDQUFDO1FBRXRCLE1BQU07UUFDTixhQUFRLEdBQUUsbUJBQW1CLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsOEJBQThCO1FBQ3JGLGlEQUFpRDtRQUNqRCxjQUFTLEdBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsU0FBUztRQUNoRSxTQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ1QsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDYixZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osU0FBSSxHQUFHLENBQUMsQ0FBQztRQUNULFlBQU8sR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFF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QU0sQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDO1lBQzlCLEtBQUssQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUU1RDtRQUdELE1BQU0sQ0FBQyxRQUFRLEdBQUcsdUNBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDeEQsTUFBTSxDQUFDLElBQUksR0FBQyxLQUFLLENBQUM7UUFDbEIsTUFBTSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQztRQUN6QyxNQUFNLENBQUMsUUFBUSxHQUFHLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBQyxFQUFFLEVBQUUsRUFBRSxFQUFDLENBQUM7UUFDcEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQTlwQlEsaUJBQWlCO1FBTDdCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDJCQUEyQjtTQUMzQyxDQUFDO3lDQTBWd0MseUJBQWdCLEVBQXFCLHVCQUFVO09BelY1RSxpQkFBaUIsQ0ErcEI3QjtJQUFELHdCQUFDO0NBQUEsQUEvcEJELElBK3BCQztBQS9wQlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTWFwVmlldywgTWFya2VyLCBQb3NpdGlvbiwgUG9seWxpbmUsIEJvdW5kcywgU3R5bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrJztcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgV2ViU2VydmljZSB9IGZyb20gXCIuLi93cy5zZXJ2aWNlXCI7XG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0IHtMb2FkaW5nSW5kaWNhdG9yfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7XG5pbXBvcnQgKiBhcyBnZW9sb2NhdGlvbiBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XG5pbXBvcnQgeyBBY2N1cmFjeSB9IGZyb20gXCJ1aS9lbnVtc1wiO1xuLy9JbcOhZ2VuZXMgcGFyYSBsb3MgbWFyY2Fkb3Jlc1xuaW1wb3J0ICogYXMgaW1hZ2VTb3VyY2UgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2Utc291cmNlXCI7XG5pbXBvcnQgKiBhcyBJbWFnZU1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9pbWFnZVwiO1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiogQmVmb3JlIHlvdSBjYW4gbmF2aWdhdGUgdG8gdGhpcyBwYWdlIGZyb20geW91ciBhcHAsIHlvdSBuZWVkIHRvIHJlZmVyZW5jZSB0aGlzIHBhZ2UncyBtb2R1bGUgaW4gdGhlXG4qIGdsb2JhbCBhcHAgcm91dGVyIG1vZHVsZS4gQWRkIHRoZSBmb2xsb3dpbmcgb2JqZWN0IHRvIHRoZSBnbG9iYWwgYXJyYXkgb2Ygcm91dGVzOlxuKiB7IHBhdGg6IFwicmVzZXJ2YXJcIiwgbG9hZENoaWxkcmVuOiBcIi4vcmVzZXJ2YXIvcmVzZXJ2YXIubW9kdWxlI1Jlc2VydmFyTW9kdWxlXCIgfVxuKiBOb3RlIHRoYXQgdGhpcyBzaW1wbHkgcG9pbnRzIHRoZSBwYXRoIHRvIHRoZSBwYWdlIG1vZHVsZSBmaWxlLiBJZiB5b3UgbW92ZSB0aGUgcGFnZSwgeW91IG5lZWQgdG8gdXBkYXRlIHRoZSByb3V0ZSB0b28uXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xubGV0IGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJSZXNlcnZhclwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9yZXNlcnZhci5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIFJlc2VydmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwdWJsaWMgbGF0aXR1ZDpudW1iZXI7XG4gICAgcHVibGljIGxvbmdpdHVkOm51bWJlcjtcbiAgICBwdWJsaWMgZGlyZWNjaW9uOnN0cmluZztcbiAgICBwdWJsaWMgaWR2aWFqZTpudW1iZXI7XG4gICAgcHVibGljIGlkcnV0YTpudW1iZXI7XG4gICAgcHVibGljIHZhbG9yOm51bWJlcj0wO1xuICAgIHB1YmxpYyB2YWxvclRvdGFsOm51bWJlcj0wO1xuICAgIHB1YmxpYyB2YWxpZG86Ym9vbGVhbj1mYWxzZTtcbiAgICBwdWJsaWMgdGFyamV0YXM9W107XG4gICAgcHVibGljIHRhcmpldGE6c3RyaW5nPSdTZWxlY2Npb25hIHVuYSB0YXJqZXRhIGRlIHBhZ28nO1xuICAgIHB1YmxpYyBpZFRhcmpldGE6c3RyaW5nO1xuICAgIHB1YmxpYyB0ZXh0b0JvdG9uOnN0cmluZz0nUEFHQVIgWSBSRVNFUlZBUic7XG4gICAgcHVibGljIHNhbGRvOm51bWJlcj0wO1xuXG4gICAgLy9NQVBBXG4gICAgbGF0aXR1ZGU9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0TnVtYmVyKCdsYXRSZXNlcnZhJyk7IC8vQ29sb21iaWE0LjU4Nzc5OSwgLTczLjk0MDk2MFxuICAgIC8vbGF0aXR1ZGU6bnVtYmVyOyAvL0NvbG9tYmlhNC41ODc3OTksIC03My45NDA5NjBcbiAgICBsb25naXR1ZGU9QXBwbGljYXRpb25TZXR0aW5ncy5nZXROdW1iZXIoJ2xvblJlc2VydmEnKTsgLy9DbG9tYmlhXG4gICAgem9vbSA9IDE5XG4gICAgbWluWm9vbSA9IDA7IFxuICAgIG1heFpvb20gPSAyMjtcbiAgICBiZWFyaW5nID0gMDtcbiAgICB0aWx0ID0gMDtcbiAgICBwYWRkaW5nID0gWzQwLCA0MCwgNDAsIDQwXTtcbiAgICBtYXBWaWV3OiBNYXBWaWV3O1xuICAgIHN0eWxlcz1bXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM3YzkzYTNcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiBcIi0xMFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmUuY291bnRyeVwiLFxuICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlLmNvdW50cnlcIixcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2EwYTRhNVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmUucHJvdmluY2VcIixcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzYyODM4ZVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlXCIsXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogXCItMjlcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZVwiLFxuICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2RkZTNlM1wiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlLm1hbl9tYWRlXCIsXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGUubWFuX21hZGVcIixcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlLm1hbl9tYWRlXCIsXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuc3Ryb2tlXCIsXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMzZjRhNTFcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcIndlaWdodFwiOiBcIjAuMzBcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IFwiNzRcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaVwiLFxuICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5hdHRyYWN0aW9uXCIsXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5idXNpbmVzc1wiLFxuICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLmdvdmVybm1lbnRcIixcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5tZWRpY2FsXCIsXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5wYXJrXCIsXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5wbGFjZV9vZl93b3JzaGlwXCIsXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5zY2hvb2xcIixcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5zcG9ydHNfY29tcGxleFwiLFxuICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxuICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwic2F0dXJhdGlvblwiOiBcIi0xMDBcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxuICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNiYmNhY2ZcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IFwiMFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjYmJjYWNmXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ3ZWlnaHRcIjogXCIwLjUwXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHNcIixcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHRcIixcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5LmNvbnRyb2xsZWRfYWNjZXNzXCIsXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXkuY29udHJvbGxlZF9hY2Nlc3NcIixcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2E5YjRiOFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5hcnRlcmlhbFwiLFxuICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy5pY29uXCIsXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJpbnZlcnRfbGlnaHRuZXNzXCI6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJzYXR1cmF0aW9uXCI6IFwiLTdcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiBcIjNcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImdhbW1hXCI6IFwiMS44MFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwid2VpZ2h0XCI6IFwiMC4wMVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5sb2NhbFwiLFxuICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ0cmFuc2l0XCIsXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ0cmFuc2l0LnN0YXRpb24uYnVzXCIsXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjYTNjN2RmXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICBdO1xuXG4gICAgbGFzdENhbWVyYTogU3RyaW5nO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSBteVNlcnZpY2U6IFdlYlNlcnZpY2UpIHtcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBVc2UgdGhlIGNvbnN0cnVjdG9yIHRvIGluamVjdCBhcHAgc2VydmljZXMgdGhhdCB5b3UgbmVlZCBpbiB0aGlzIGNvbXBvbmVudC5cbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAgICAgdGhpcy5sYXRpdHVkID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXROdW1iZXIoJ2xhdFJlc2VydmEnKTtcbiAgICAgICAgdGhpcy5sb25naXR1ZCA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0TnVtYmVyKCdsb25SZXNlcnZhJyk7XG4gICAgICAgIHRoaXMuZGlyZWNjaW9uID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ2RpclJlc2VydmEnKTtcbiAgICAgICAgdGhpcy5pZHZpYWplID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXROdW1iZXIoJ3ZpYWplUmVzZXJ2YScpO1xuICAgICAgICB0aGlzLmlkcnV0YSA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0TnVtYmVyKCdydXRhUmVzZXJ2YScpO1xuICAgICAgICB0aGlzLnZhbG9yID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXROdW1iZXIoJ3ByZWNpb1Jlc2VydmEnKTtcbiAgICAgICAgdGhpcy52YWxvclRvdGFsID0gdGhpcy52YWxvcjtcbiAgICAgICAgaWYodGhpcy52YWxvciA9PSAwKXtcbiAgICAgICAgICAgIHRoaXMudGV4dG9Cb3RvbiA9ICdSRVNFUlZBUic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpckF0cmFzKCkge1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xuICAgIH1cblxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogVXNlIHRoZSBcIm5nT25Jbml0XCIgaGFuZGxlciB0byBpbml0aWFsaXplIGRhdGEgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgICAgICBsb2FkZXIuc2hvdygpO1xuICAgICAgICBsZXQgdXN1YXJpbyA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdlbWFpbFVzdWFyaW8nKTtcbiAgICAgICAgbGV0IGlkbWVtYmVyID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ2lkbWVtYmVyJyk7XG4gICAgICAgIGlmKGlkbWVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMudmFsaWRvPXRydWU7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ29uIGlkbWVtYmVyOiAnK2lkbWVtYmVyKTtcbiAgICAgICAgICAgIHRoaXMubXlTZXJ2aWNlLmdldFRhcmpldGFzKGlkbWVtYmVyLHVzdWFyaW8pLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5leGl0b1RhcmpldGFzKHJlc3VsdCk7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NpbiBpZG1lbWJlcicpO1xuICAgICAgICAgICAgdGhpcy52YWxpZG89ZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnRhcmpldGE9J05vIHRpZW5lcyB0YXJqZXRhcyBhc29jaWFkYXMgYSB0dSBjdWVudGEnO1xuICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpZHZhbmdvID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ2lkdmFuZ28nKTtcbiAgICAgICAgaWYoaWR2YW5nbyl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ29uIGlkbWVtYmVyOiAnK2lkdmFuZ28pO1xuICAgICAgICAgICAgdGhpcy5teVNlcnZpY2UuZ2V0U2FsZG8oaWR2YW5nbykuc3Vic2NyaWJlKChyZXN1bHQ6YW55KSA9PiB7XG4gICAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzdWx0YWRvIGRlbCBzYWxkbycpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgaWYocmVzdWx0LmJhbGFuY2Upe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNhbGRvPXJlc3VsdC5iYWxhbmNlKjE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgY29uc3VsdGFuZG8gc2FsZG8nKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NpbiBpZG1lbWJlcicpO1xuICAgICAgICAgICAgLyp0aGlzLm15U2VydmljZS5nZXRJZFZhbmdvKGlkVXN1YXJpbyx1c3VhcmlvKS5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhpdG9JZE1lbWJlcihyZXN1bHQpO1xuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTsqL1xuICAgICAgICB9XG4gICAgfSBcbiAgICBleGl0b1RhcmpldGFzKHJlcykge1xuICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlIGxhcyB0YXJqZXRhczogJytPYmplY3Qua2V5cyhyZXMudGFyamV0YXMpLmxlbmd0aCk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlcykpO1xuICAgICAgICBpZihPYmplY3Qua2V5cyhyZXMudGFyamV0YXMpLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXMocmVzLnRhcmpldGFzKS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQaW50YW5kbyBhOicpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy50YXJqZXRhc1tpXSk7IC8vIFwic3BlY2llc1wiXG5cbiAgICAgICAgICAgICAgICB0aGlzLnRhcmpldGFzLnB1c2gocmVzLnRhcmpldGFzW2ldKTsgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuXG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICB9XG4gICAgZGlzcGxheUFjdGlvbkRpYWxvZygpIHtcbiAgICAgICAgLy8gPj4gYWN0aW9uLWRpYWxvZy1jb2RlXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudGFyamV0YXMpO1xuICAgICAgICBsZXQgb3BjaW9uZXMgPSBbXTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXModGhpcy50YXJqZXRhcykubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG9wY2lvbmVzLnB1c2goJyoqKiotKioqKi0qKioqLScrdGhpcy50YXJqZXRhc1tpXS5udW1lcm9fdGFyamV0YSk7IFxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKG9wY2lvbmVzKTtcblxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIlNlbGVjY2lvbmEgdW5hIHRhcmpldGFcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiU2VsZWNjaW9uYSB1bmEgdGFyamV0YVwiLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxhclwiLFxuICAgICAgICAgICAgYWN0aW9uczogb3BjaW9uZXNcbiAgICAgICAgfTtcblxuICAgICAgICBkaWFsb2dzLmFjdGlvbihvcHRpb25zKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICBpZihyZXN1bHQgPT0gJ0NhbmNlbGFyJyl7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJqZXRhID0gJ1NlbGVjY2lvbmEgdW5hIHRhcmpldGEgZGUgcGFnbyc7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBsZXQgbnVtVGFyamV0YSA9IHJlc3VsdC5zcGxpdCgnKioqKi0qKioqLSoqKiotJylbMV07XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXModGhpcy50YXJqZXRhcykubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYobnVtVGFyamV0YSA9PSB0aGlzLnRhcmpldGFzW2ldLm51bWVyb190YXJqZXRhKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaWRUYXJqZXRhID0gdGhpcy50YXJqZXRhc1tpXS5pZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnRhcmpldGEgPSByZXN1bHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gPDwgYWN0aW9uLWRpYWxvZy1jb2RlXG4gICAgfVxuXG5cbiAgICBwdWJsaWMgcGFzYWplcm9zOiBudW1iZXIgPSAxO1xuXG4gICAgXG4gICAgcHVibGljIGF1bWVudGFyKCl7XG4gICAgICAgIGlmKHRoaXMucGFzYWplcm9zIDwgNil7XG4gICAgICAgICAgICB0aGlzLnBhc2FqZXJvcysrO1xuICAgICAgICAgICAgdGhpcy52YWxvclRvdGFsID0gdGhpcy52YWxvcip0aGlzLnBhc2FqZXJvcztcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBhc2FqZXJvcyk7XG4gICAgfVxuICAgIHB1YmxpYyBkaXNtaW51aXIoKXtcbiAgICAgICAgaWYodGhpcy5wYXNhamVyb3MgPiAxKXtcbiAgICAgICAgICAgIHRoaXMucGFzYWplcm9zLS07XG4gICAgICAgICAgICB0aGlzLnZhbG9yVG90YWwgPSB0aGlzLnZhbG9yKnRoaXMucGFzYWplcm9zO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBhc2FqZXJvcyk7XG4gICAgfVxuICAgIHB1YmxpYyBwYWdhcigpe1xuICAgICAgICBsb2FkZXIuc2hvdygpO1xuICAgICAgICBjb25zb2xlLmxvZygnUHJlY2lvIGEgcGFnYXI6ICcrdGhpcy52YWxvclRvdGFsKTtcbiAgICAgICAgaWYodGhpcy52YWxvciA9PSAwKXtcbiAgICAgICAgICAgIHRoaXMucmVzZXJ2YXIoKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUGFnYXIgY29uIGxhIHRhcmpldGE6ICcrdGhpcy5pZFRhcmpldGEpO1xuICAgICAgICAgICAgaWYodGhpcy5pZFRhcmpldGEpe1xuICAgICAgICAgICAgICAgIGxldCB1c3VhcmlvID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ2VtYWlsVXN1YXJpbycpO1xuICAgICAgICAgICAgICAgIGxldCBpZG1lbWJlciA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdpZG1lbWJlcicpO1xuICAgICAgICAgICAgICAgIHRoaXMubXlTZXJ2aWNlLnBhZ2FyKGlkbWVtYmVyLHVzdWFyaW8sJycrdGhpcy5pZFRhcmpldGErJycsJycrdGhpcy52YWxvclRvdGFsKycnKS5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4aXRvUGFnbyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0Vycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJEZWJlcyBzZWxlY2Npb25hciB1bmEgdGFyamV0YSBwYXJhIHJlYWxpemFyIHBhZ29cIixcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGV4aXRvUGFnbyhyZXMpe1xuICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlbCBwYWdvJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlcykpOyBcbiAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgaWYocmVzLm51bWFwcm9iYWNpb24gfHwgcmVzLnRyYW5zYWN0aW9uTnVtYmVyKXtcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnUGFnbyByZWFsaXphZG8gZXhpdG9zYW1lbnRlJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlR1IHBhZ28gc2UgcmVhbGl6w7MgY29ycmVjdGFtZW50ZSwgbsO6bWVybyBkZSBhcHJvYmFjacOzbjogXCIrcmVzLm51bWFwcm9iYWNpb24rXCIsIGVzdGFtb3MgcmVhbGl6YW5kbyBsYSByZXNlcnZhLlwiLFxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ09rJ1xuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2VydmFyKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0Vycm9yIHJlYWxpemFuZG8gcGFnbycsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJMbyBzZW50aW1vcywgaHVibyB1biBwcm9ibGVtYSByZWFsaXphbmRvIGVsIHBhZ28uIFwiK3Jlcy5lcnJvcixcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6ICdPaydcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgcGFnYXJDb25TYWxkbygpe1xuICAgICAgICBsb2FkZXIuc2hvdygpO1xuICAgICAgICBjb25zb2xlLmxvZygnUHJlY2lvIGEgcGFnYXI6ICcrdGhpcy52YWxvclRvdGFsKTtcbiAgICAgICAgaWYodGhpcy52YWxvciA9PSAwKXtcbiAgICAgICAgICAgIHRoaXMucmVzZXJ2YXIoKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUGFnYXIgY29uIHNhbGRvOiAnK3RoaXMuc2FsZG8pO1xuICAgICAgICAgICAgaWYodGhpcy5zYWxkbyA+IHRoaXMudmFsb3JUb3RhbCl7XG4gICAgICAgICAgICAgICAgbGV0IGlkdmFuZ28gPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnaWR2YW5nbycpO1xuICAgICAgICAgICAgICAgIHRoaXMubXlTZXJ2aWNlLnBhZ2FyQ29uU2FsZG8oaWR2YW5nbywnJyt0aGlzLnZhbG9yVG90YWwrJycpLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhpdG9QYWdvKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnRXJyb3InLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkRlYmVzIHNlbGVjY2lvbmFyIHVuYSB0YXJqZXRhIHBhcmEgcmVhbGl6YXIgcGFnb1wiLFxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6ICdPaydcbiAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgcmVzZXJ2YXIoKXtcbiAgICAgICAgbG9hZGVyLnNob3coKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGlkUGFzYWplcm8gPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcImlkVXN1YXJpb1wiKTtcbiAgICAgICAgY29uc3QgaWRWaWFqZSA9IHRoaXMuaWR2aWFqZTtcbiAgICAgICAgY29uc3QgbGF0aXR1ZCA9IHRoaXMubGF0aXR1ZDtcbiAgICAgICAgY29uc3QgbG9uZ2l0dWQgPSB0aGlzLmxvbmdpdHVkO1xuICAgICAgICBjb25zdCBjYW50aWRhZCA9IHRoaXMucGFzYWplcm9zO1xuICAgICAgICBjb25zdCBkaXJlY2Npb24gPSB0aGlzLmRpcmVjY2lvbjtcbiAgICAgICAgdGhpcy5teVNlcnZpY2Uuc2V0UmVzZXJ2YShpZFBhc2FqZXJvLGlkVmlhamUsbGF0aXR1ZCxsb25naXR1ZCxkaXJlY2Npb24sY2FudGlkYWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YVN1Y2Nlc3MocmVzdWx0KTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuXG4gICAgfVxuXG4gICAgb25HZXREYXRhU3VjY2VzcyhyZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZWwgbG9naW4nKTtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzKSk7IFxuICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICBpZihyZXMucmVzdWx0YWRvID09ICdPSycpe1xuICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiUmVzZXJ2YSBjb25maXJtYWRhIVwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6XCJUdSBzZXJ2aWNpbyBoYSBzaWRvIHJlc2VydmFkbyBleGl0b3NhbWVudGUuXCIsXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnR3JhY2lhcyEnXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3Jlc2VydmFzXCJdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICBcbiAgICAgICAgfWVsc2V7IFxuICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiRXJyb3IgZGUgcmVzZXJ2YVwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6XCJMbyBzZW50aW1vcywgaHVibyB1biBwcm9ibGVtYSByZWFsaXphbmRvIHR1IHJlc2VydmEuIFBvciBmYXZvciBpbnRlbnRhIG51ZXZhbWVudGUuXCIsXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3Jlc2VydmFzXCJdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkdldERhdGFFcnJvcihlcnJvcjogUmVzcG9uc2UgfCBhbnkpIHtcbiAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZSBlcnJvcicpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiAnRXJyb3IgZGUgY29uZXhpw7NuJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiTG8gc2VudGltb3MsIGh1Ym8gdW4gcHJvYmxlbWEgZW5jb250cmFuZG8gZWwgc2Vydmlkb3IsIHZlcmlmaWNhIHR1IGNvbmV4acOzbiBhIEludGVybmV0IGUgaW50ZW50YSBudWV2YW1lbnRlLlwiLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25NYXBSZWFkeShldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnTWFwIFJlYWR5Jyk7XG5cbiAgICAgICAgXG5cbiAgICAgICAgbGV0IG1vZGVsID0gdGhpcztcbiAgICAgICAgbW9kZWwubWFwVmlldyA9IGV2ZW50Lm9iamVjdDtcblxuICAgICAgICBtb2RlbC5tYXBWaWV3LnNldFN0eWxlKDxTdHlsZT4odGhpcy5zdHlsZXMpKTtcbiAgICAgICAgbW9kZWwuc2V0TWFyY2Fkb3IobW9kZWwubGF0aXR1ZGUsbW9kZWwubG9uZ2l0dWRlLCdwYXNhamVybycsMik7XG4gICAgICAgIFxuICAgIH1cbiAgICBvbkNvb3JkaW5hdGVUYXBwZWQoYXJncykge1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJDb29yZGluYXRlIFRhcHBlZCwgTGF0OiBcIiArIGFyZ3MucG9zaXRpb24ubGF0aXR1ZGUgKyBcIiwgTG9uOiBcIiArIGFyZ3MucG9zaXRpb24ubG9uZ2l0dWRlLCBhcmdzKTtcbiAgICB9XG5cbiAgICBvbk1hcmtlckV2ZW50KGFyZ3MpIHtcbiAgICB9IFxuXG4gICAgb25DYW1lcmFDaGFuZ2VkKGFyZ3MpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJDYW1lcmEgY2hhbmdlZDogXCIgKyBKU09OLnN0cmluZ2lmeShhcmdzLmNhbWVyYSksIEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKSA9PT0gdGhpcy5sYXN0Q2FtZXJhKTtcbiAgICAgICAgdGhpcy5sYXN0Q2FtZXJhID0gSlNPTi5zdHJpbmdpZnkoYXJncy5jYW1lcmEpO1xuICAgIH1cbiAgICBzZXRNYXJjYWRvcihsYXQsbG9uLHRpcG8saWQpe1xuICAgICAgICBsZXQgbW9kZWwgPSB0aGlzO1xuICAgICAgICBjb25zb2xlLmxvZygnUGludGFuZG8gbWFyY2Fkb3I6ICcrbGF0KycgLSAnK2xvbisnIC0gJyt0aXBvKTtcbiAgICAgICAgdmFyIG1hcmtlciA9IG5ldyBNYXJrZXIoKTtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2VNb2R1bGUuSW1hZ2UoKTtcbiAgICAgICAgaW1hZ2Uud2lkdGg9MjA7IFxuICAgICAgICBpbWFnZS5oZWlnaHQ9MjA7IFxuICAgICAgICBpZih0aXBvID09ICdpbmljaW8nKXtcbiAgICAgICAgICAgIGltYWdlLmltYWdlU291cmNlID0gaW1hZ2VTb3VyY2UuZnJvbVJlc291cmNlKCdpbmljaW8nKTsgIFxuICAgICAgICAgICAgbWFya2VyLnRpdGxlID0gXCJQdW50byBkZSBpbmljaW9cIjtcbiAgICAgICAgfWVsc2UgaWYodGlwbyA9PSAnZmluJyl7XG4gICAgICAgICAgICBpbWFnZS5pbWFnZVNvdXJjZSA9IGltYWdlU291cmNlLmZyb21SZXNvdXJjZSgnZmluJyk7XG4gICAgICAgICAgICBtYXJrZXIudGl0bGUgPSBcIlB1bnRvIGZpbmFsXCI7XG4gICAgICAgIH1lbHNlIGlmKHRpcG8gPT0gJ3Bhc2FqZXJvJyl7XG4gICAgICAgICAgICBtYXJrZXIudGl0bGUgPSBcIlR1IHViaWNhY2nDs25cIjsgIFxuICAgICAgICAgICAgaW1hZ2UuaW1hZ2VTb3VyY2UgPSBpbWFnZVNvdXJjZS5mcm9tUmVzb3VyY2UoJ3Bhc2FqZXJvJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSBcblxuICAgICAgICBcbiAgICAgICAgbWFya2VyLnBvc2l0aW9uID0gUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKGxhdCwgbG9uKTtcbiAgICAgICAgbWFya2VyLmljb249aW1hZ2U7XG4gICAgICAgIG1hcmtlci5zbmlwcGV0ID0gJ0Rlc2NyaXBjacOzbiBkZWwgcHVudG8nO1xuICAgICAgICBtYXJrZXIudXNlckRhdGEgPSB7aW5kZXg6IDEsaWQ6IGlkfTtcbiAgICAgICAgbW9kZWwubWFwVmlldy5hZGRNYXJrZXIobWFya2VyKTsgXG4gICAgfVxufVxuIl19