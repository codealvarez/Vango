"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var element_registry_1 = require("nativescript-angular/element-registry");
//Drawer
var dialogs = require("ui/dialogs");
var app = require("application");
//Ubicación
var geolocation = require("nativescript-geolocation");
var enums_1 = require("ui/enums");
//Imágenes para los marcadores
var imageSource = require("tns-core-modules/image-source");
var ImageModule = require("tns-core-modules/ui/image");
//Rutas (Router)
var router_1 = require("nativescript-angular/router");
//Firebase para notificaciones push
//import firebase = require("nativescript-plugin-firebase");
var firebase = require("nativescript-plugin-firebase");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var ws_service_1 = require("../ws.service");
var ApplicationSettings = require("application-settings");
var color_1 = require("color");
var pl = require("google-polyline");
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "home", loadChildren: "./home/home.module#HomeModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
//Botón flotante
element_registry_1.registerElement("Fab", function () { return require("nativescript-floatingactionbutton").Fab; });
//Mapa
element_registry_1.registerElement("MapView", function () { return require("nativescript-google-maps-sdk").MapView; });
var HomeComponent = /** @class */ (function () {
    function HomeComponent(routerExtensions, myService) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
        this.routerExtensions = routerExtensions;
        this.myService = myService;
        this.latitude = 4.587799; //Colombia4.587799, -73.940960
        //latitude:number; //Colombia4.587799, -73.940960
        this.longitude = -73.940960; //Clombia
        this.zoom = 12;
        this.minZoom = 0;
        this.maxZoom = 22;
        this.bearing = 0;
        this.tilt = 0;
        this.padding = [40, 40, 40, 40];
        this.rutas = [];
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
        this.idPasajero = ApplicationSettings.getString('idUsuario');
    }
    HomeComponent.prototype.onDrawerButtonTap = function () {
        var sideDrawer = app.getRootView();
        sideDrawer.showDrawer();
    };
    HomeComponent.prototype.ngOnInit = function () {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
        /*appversion.getVersionCode().then((v: string) => {
            console.log("Your app's version code is: " + v);
            alert('Versión de app: '+v);
        });*/
        var model = this;
        if (!ApplicationSettings.getString('tokenPush')) {
            firebase.getCurrentPushToken().then(function (token) {
                // may be null if not known yet
                //alert("Current push token: " + token);
                ApplicationSettings.setString('tokenPush', token);
                loader.show();
                model.myService.registrarToken(token, model.idPasajero)
                    .subscribe(function (result) {
                    model.onGetDataSuccess(result);
                }, function (error) {
                    model.onGetDataError(error);
                });
            });
        }
    };
    HomeComponent.prototype.dibujarRuta = function (lat, lon, lat2, lon2, paradas) {
        var _this = this;
        console.log('Dibujando rutica');
        loader.show();
        this.myService.getData(lat, lon, lat2, lon2, paradas)
            .subscribe(function (result) {
            _this.resultadoRutas(result);
        }, function (error) {
            _this.onGetDataError(error);
        });
    };
    HomeComponent.prototype.onGetDataSuccess = function (res) {
        loader.hide();
        console.log('Respuesta del token');
        console.log(JSON.stringify(res));
    };
    HomeComponent.prototype.resultadoRutas = function (res) {
        console.log('Resultado de getData');
        console.log(res);
        loader.hide();
        var map = this.mapView;
        var model = this;
        var list = pl.decode(res.routes[0].overview_polyline.points);
        var line = new nativescript_google_maps_sdk_1.Polyline();
        line.visible = true;
        line.width = 4;
        var materialColors = [
            { color: '#B41540' }, { color: '#55AF14' }, { color: '#108659' },
            { color: '#C74E17' }, { color: '#87107D' }, { color: '#F9B741' },
            { color: '#580551' }, { color: '#812D08' }, { color: '#DA4970' },
        ];
        line.color = new color_1.Color(materialColors[Math.floor(Math.random() * materialColors.length)].color);
        line.geodesic = true;
        line.clickable = true;
        //line.userData.
        for (var i = 0; i < list.length; i++) {
            line.addPoint(nativescript_google_maps_sdk_1.Position.positionFromLatLng(list[i][0], list[i][1]));
        }
        map.addPolyline(line);
        loader.hide();
    };
    HomeComponent.prototype.onGetDataError = function (error) {
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
    HomeComponent.prototype.nuevaReserva = function () {
        this.routerExtensions.navigate(["/disponibles"]);
    };
    HomeComponent.prototype.verPagos = function () {
        this.routerExtensions.navigate(["/tarjetas"]);
    };
    HomeComponent.prototype.onMapReady = function (event) {
        /*this.latInicial = 4.7014128;
        this.lonInicial = -74.1466856;
        this.latFinal = 4.6765584;
        this.lonFinal = -74.0536666;*/
        console.log('Map Ready');
        var model = this;
        model.mapView = event.object;
        model.mapView.setStyle((this.styles));
        geolocation.isEnabled().then(function (isEnabled) {
            if (isEnabled) {
                var location_1 = geolocation.getCurrentLocation({
                    desiredAccuracy: enums_1.Accuracy.high,
                    maximumAge: 10000,
                    timeout: 20000
                })
                    .then(function (loc) {
                    if (loc) {
                        model.latitude = loc.latitude;
                        model.longitude = loc.longitude;
                        model.mapView.latitude = loc.latitude;
                        model.mapView.longitude = loc.longitude;
                        model.setMarcador(loc.latitude, loc.longitude, 'pasajero', 2);
                    }
                }, function (e) {
                    console.log('Error en getCurrentLocation');
                    console.log("Error: " + (e.message || e));
                });
            }
            else {
                geolocation.enableLocationRequest().then(function () {
                    var location = geolocation.getCurrentLocation({
                        desiredAccuracy: enums_1.Accuracy.high,
                        maximumAge: 5000,
                        timeout: 10000
                    }).then(function (loc) {
                        if (loc) {
                            model.latitude = loc.latitude;
                            model.longitude = loc.longitude;
                            console.log('Ubicado en ' + loc.latitude + ' - ' + loc.longitude);
                            model.setMarcador(loc.latitude, loc.longitude, 'pasajero', 2);
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
        model.myService.getRutasDisponibles(null)
            .subscribe(function (result) {
            console.log('Resultado de mensajes');
            console.log(result);
            for (var i = 0; i < Object.keys(result).length; i++) {
                console.log('Pintando a:');
                console.log(result[i]); // "species"
                model.rutas.push(result[i]);
                console.log(model.rutas);
                model.dibujarRuta(result[i].latorigen * 1, result[i].lonorigen * 1, result[i].latdestino * 1, result[i].londestino * 1, []);
            }
        }, function (error) {
            model.onGetDataError(error);
        });
    };
    HomeComponent.prototype.ubicar = function () {
        console.log('Ubicando');
        var model = this;
        geolocation.isEnabled().then(function (isEnabled) {
            if (isEnabled) {
                var location_2 = geolocation.getCurrentLocation({
                    desiredAccuracy: enums_1.Accuracy.high,
                    maximumAge: 5000,
                    timeout: 10000
                })
                    .then(function (loc) {
                    if (loc) {
                        model.latitude = loc.latitude;
                        model.longitude = loc.longitude;
                        console.log('Ubicado en ' + loc.latitude + ' - ' + loc.longitude);
                        model.setMarcador(loc.latitude, loc.longitude, 'pasajero', 2);
                    }
                }, function (e) {
                    console.log("Error: " + (e.message || e));
                });
            }
            else {
                geolocation.enableLocationRequest().then(function () {
                    var location = geolocation.getCurrentLocation({
                        desiredAccuracy: enums_1.Accuracy.high,
                        maximumAge: 5000,
                        timeout: 10000
                    }).then(function (loc) {
                        if (loc) {
                            model.latitude = loc.latitude;
                            model.longitude = loc.longitude;
                            console.log('Ubicado en ' + loc.latitude + ' - ' + loc.longitude);
                            model.setMarcador(loc.latitude, loc.longitude, 'pasajero', 2);
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
    };
    HomeComponent.prototype.setMarcador = function (lat, lon, tipo, id) {
        var model = this;
        console.log('Pintando marcador: ' + lat + ' - ' + lon + ' - ' + tipo);
        if (model.marker) {
            model.marker.position = nativescript_google_maps_sdk_1.Position.positionFromLatLng(lat, lon);
        }
        else {
            model.marker = new nativescript_google_maps_sdk_1.Marker();
            var image = new ImageModule.Image();
            image.width = 20;
            image.height = 20;
            if (tipo == 'inicio') {
                image.imageSource = imageSource.fromResource('inicio');
                model.marker.title = "Punto de inicio";
            }
            else if (tipo == 'fin') {
                image.imageSource = imageSource.fromResource('fin');
                model.marker.title = "Punto final";
            }
            else if (tipo == 'pasajero') {
                model.marker.title = "Tu ubicación";
                image.imageSource = imageSource.fromResource('pasajero');
            }
            model.marker.position = nativescript_google_maps_sdk_1.Position.positionFromLatLng(lat, lon);
            model.marker.icon = image;
            model.marker.snippet = 'Descripción del punto';
            model.marker.userData = { index: 1, id: id };
            model.mapView.addMarker(model.marker);
        }
    };
    HomeComponent.prototype.onCoordinateTapped = function (args) {
        //console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
    };
    HomeComponent.prototype.onMarkerEvent = function (args) {
    };
    HomeComponent.prototype.onCameraChanged = function (args) {
        console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
        this.lastCamera = JSON.stringify(args.camera);
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: "Home",
            moduleId: module.id,
            templateUrl: "./home.component.html"
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions, ws_service_1.WebService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCw2RUFBa0c7QUFDbEcsMEVBQXdFO0FBQ3hFLFFBQVE7QUFDUixvQ0FBc0M7QUFDdEMsaUNBQW1DO0FBRW5DLFdBQVc7QUFDWCxzREFBd0Q7QUFDeEQsa0NBQW9DO0FBQ3BDLDhCQUE4QjtBQUM5QiwyREFBNkQ7QUFDN0QsdURBQXlEO0FBQ3pELGdCQUFnQjtBQUNoQixzREFBNkQ7QUFDN0QsbUNBQW1DO0FBQ25DLDREQUE0RDtBQUM1RCx1REFBd0Q7QUFDeEQsaUZBQWdFO0FBQ2hFLDRDQUEyQztBQUMzQywwREFBNEQ7QUFFNUQsK0JBQTRCO0FBQzVCLG9DQUFzQztBQUN0QyxJQUFJLE1BQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7QUFFcEM7Ozs7OzhEQUs4RDtBQUM5RCxnQkFBZ0I7QUFDaEIsa0NBQWUsQ0FBQyxLQUFLLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLEdBQUcsRUFBaEQsQ0FBZ0QsQ0FBQyxDQUFDO0FBQy9FLE1BQU07QUFDTixrQ0FBZSxDQUFDLFNBQVMsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUMsT0FBTyxFQUEvQyxDQUErQyxDQUFDLENBQUM7QUFNbEY7SUE2VUksdUJBQW9CLGdCQUFrQyxFQUFTLFNBQXFCO1FBQ2hGOztzRUFFOEQ7UUFIOUMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFTLGNBQVMsR0FBVCxTQUFTLENBQVk7UUE1VXBGLGFBQVEsR0FBQyxRQUFRLENBQUMsQ0FBQyw4QkFBOEI7UUFDakQsaURBQWlEO1FBQ2pELGNBQVMsR0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVM7UUFDL0IsU0FBSSxHQUFHLEVBQUUsQ0FBQTtRQUNULFlBQU8sR0FBRyxD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Q0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUE3bEJRLGFBQWE7UUFMekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsdUJBQXVCO1NBQ3ZDLENBQUM7eUNBOFV3Qyx5QkFBZ0IsRUFBb0IsdUJBQVU7T0E3VTNFLGFBQWEsQ0E4bEJ6QjtJQUFELG9CQUFDO0NBQUEsQUE5bEJELElBOGxCQztBQTlsQlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBNYXBWaWV3LCBNYXJrZXIsIFBvc2l0aW9uLCBQb2x5bGluZSwgQm91bmRzLCBTdHlsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGsnO1xuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeSc7XG4vL0RyYXdlclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJhcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiO1xuLy9VYmljYWNpw7NuXG5pbXBvcnQgKiBhcyBnZW9sb2NhdGlvbiBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XG5pbXBvcnQgeyBBY2N1cmFjeSB9IGZyb20gXCJ1aS9lbnVtc1wiO1xuLy9JbcOhZ2VuZXMgcGFyYSBsb3MgbWFyY2Fkb3Jlc1xuaW1wb3J0ICogYXMgaW1hZ2VTb3VyY2UgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2Utc291cmNlXCI7XG5pbXBvcnQgKiBhcyBJbWFnZU1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9pbWFnZVwiO1xuLy9SdXRhcyAoUm91dGVyKVxuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG4vL0ZpcmViYXNlIHBhcmEgbm90aWZpY2FjaW9uZXMgcHVzaFxuLy9pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcbmltcG9ydCAqIGFzIGZpcmViYXNlIGZyb20gXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCJcbmltcG9ydCB7TG9hZGluZ0luZGljYXRvcn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xuaW1wb3J0IHsgV2ViU2VydmljZSB9IGZyb20gXCIuLi93cy5zZXJ2aWNlXCI7XG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0ICogYXMgYXBwdmVyc2lvbiBmcm9tIFwibmF0aXZlc2NyaXB0LWFwcHZlcnNpb25cIjtcbmltcG9ydCB7Q29sb3J9IGZyb20gJ2NvbG9yJztcbmltcG9ydCAqIGFzIHBsIGZyb20gJ2dvb2dsZS1wb2x5bGluZSc7XG5sZXQgbG9hZGVyID0gbmV3IExvYWRpbmdJbmRpY2F0b3IoKTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiogQmVmb3JlIHlvdSBjYW4gbmF2aWdhdGUgdG8gdGhpcyBwYWdlIGZyb20geW91ciBhcHAsIHlvdSBuZWVkIHRvIHJlZmVyZW5jZSB0aGlzIHBhZ2UncyBtb2R1bGUgaW4gdGhlXG4qIGdsb2JhbCBhcHAgcm91dGVyIG1vZHVsZS4gQWRkIHRoZSBmb2xsb3dpbmcgb2JqZWN0IHRvIHRoZSBnbG9iYWwgYXJyYXkgb2Ygcm91dGVzOlxuKiB7IHBhdGg6IFwiaG9tZVwiLCBsb2FkQ2hpbGRyZW46IFwiLi9ob21lL2hvbWUubW9kdWxlI0hvbWVNb2R1bGVcIiB9XG4qIE5vdGUgdGhhdCB0aGlzIHNpbXBseSBwb2ludHMgdGhlIHBhdGggdG8gdGhlIHBhZ2UgbW9kdWxlIGZpbGUuIElmIHlvdSBtb3ZlIHRoZSBwYWdlLCB5b3UgbmVlZCB0byB1cGRhdGUgdGhlIHJvdXRlIHRvby5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vL0JvdMOzbiBmbG90YW50ZVxucmVnaXN0ZXJFbGVtZW50KFwiRmFiXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtZmxvYXRpbmdhY3Rpb25idXR0b25cIikuRmFiKTsgXG4vL01hcGFcbnJlZ2lzdGVyRWxlbWVudChcIk1hcFZpZXdcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGtcIikuTWFwVmlldyk7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJIb21lXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2hvbWUuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBsYXRpdHVkZT00LjU4Nzc5OTsgLy9Db2xvbWJpYTQuNTg3Nzk5LCAtNzMuOTQwOTYwXG4gICAgLy9sYXRpdHVkZTpudW1iZXI7IC8vQ29sb21iaWE0LjU4Nzc5OSwgLTczLjk0MDk2MFxuICAgIGxvbmdpdHVkZT0tNzMuOTQwOTYwOyAvL0Nsb21iaWFcbiAgICB6b29tID0gMTJcbiAgICBtaW5ab29tID0gMDsgXG4gICAgbWF4Wm9vbSA9IDIyO1xuICAgIGJlYXJpbmcgPSAwO1xuICAgIHRpbHQgPSAwO1xuICAgIHBhZGRpbmcgPSBbNDAsIDQwLCA0MCwgNDBdO1xuICAgIG1hcFZpZXc6IE1hcFZpZXc7XG4gICAgbWFya2VyOk1hcmtlcjtcbiAgICBydXRhcyA9IFtdO1xuICAgIHN0eWxlcz1bXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM3YzkzYTNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiBcIi0xMFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlLmNvdW50cnlcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZS5jb3VudHJ5XCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2EwYTRhNVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlLnByb3ZpbmNlXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzYyODM4ZVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZVwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogXCItMjlcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGVcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2RkZTNlM1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZS5tYW5fbWFkZVwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlLm1hbl9tYWRlXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZS5tYW5fbWFkZVwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuc3Ryb2tlXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMzZjRhNTFcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIndlaWdodFwiOiBcIjAuMzBcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IFwiNzRcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kuYXR0cmFjdGlvblwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kuYnVzaW5lc3NcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5nb3Zlcm5tZW50XCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kubWVkaWNhbFwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kucGFya1wiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kucGxhY2Vfb2Zfd29yc2hpcFwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kuc2Nob29sXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kuc3BvcnRzX2NvbXBsZXhcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwic2F0dXJhdGlvblwiOiBcIi0xMDBcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNiYmNhY2ZcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IFwiMFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjYmJjYWNmXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ3ZWlnaHRcIjogXCIwLjUwXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHNcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHRcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheS5jb250cm9sbGVkX2FjY2Vzc1wiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5LmNvbnRyb2xsZWRfYWNjZXNzXCIsXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2E5YjRiOFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuYXJ0ZXJpYWxcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy5pY29uXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJpbnZlcnRfbGlnaHRuZXNzXCI6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJzYXR1cmF0aW9uXCI6IFwiLTdcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiBcIjNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImdhbW1hXCI6IFwiMS44MFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwid2VpZ2h0XCI6IFwiMC4wMVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQubG9jYWxcIixcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdFwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdC5zdGF0aW9uLmJ1c1wiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjYTNjN2RmXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH1cbl07XG5cbiAgICBsYXN0Q2FtZXJhOiBTdHJpbmc7XG4gICAgaWRQYXNhamVybzogc3RyaW5nID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ2lkVXN1YXJpbycpO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxwcml2YXRlIG15U2VydmljZTogV2ViU2VydmljZSkge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFVzZSB0aGUgY29uc3RydWN0b3IgdG8gaW5qZWN0IGFwcCBzZXJ2aWNlcyB0aGF0IHlvdSBuZWVkIGluIHRoaXMgY29tcG9uZW50LlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgICAgICBcbiAgICB9XG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj5hcHAuZ2V0Um9vdFZpZXcoKTtcbiAgICAgICAgc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7IFxuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFVzZSB0aGUgXCJuZ09uSW5pdFwiIGhhbmRsZXIgdG8gaW5pdGlhbGl6ZSBkYXRhIGZvciB0aGlzIGNvbXBvbmVudC5cbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAgICAgLyphcHB2ZXJzaW9uLmdldFZlcnNpb25Db2RlKCkudGhlbigodjogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIllvdXIgYXBwJ3MgdmVyc2lvbiBjb2RlIGlzOiBcIiArIHYpO1xuICAgICAgICAgICAgYWxlcnQoJ1ZlcnNpw7NuIGRlIGFwcDogJyt2KTsgXG4gICAgICAgIH0pOyovXG4gICAgICAgIGxldCBtb2RlbCA9IHRoaXM7XG4gICAgICAgIGlmKCFBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygndG9rZW5QdXNoJykpe1xuICAgICAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFB1c2hUb2tlbigpLnRoZW4oKHRva2VuOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBtYXkgYmUgbnVsbCBpZiBub3Qga25vd24geWV0XG4gICAgICAgICAgICAgICAgLy9hbGVydChcIkN1cnJlbnQgcHVzaCB0b2tlbjogXCIgKyB0b2tlbik7XG4gICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoJ3Rva2VuUHVzaCcsdG9rZW4pO1xuICAgICAgICAgICAgICAgIGxvYWRlci5zaG93KCk7XG4gICAgICAgICAgICAgICAgbW9kZWwubXlTZXJ2aWNlLnJlZ2lzdHJhclRva2VuKHRva2VuLG1vZGVsLmlkUGFzYWplcm8pXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLm9uR2V0RGF0YVN1Y2Nlc3MocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICAgICAgXG5cbiAgICB9XG4gICAgZGlidWphclJ1dGEobGF0LGxvbixsYXQyLGxvbjIscGFyYWRhcykge1xuICAgICAgICBjb25zb2xlLmxvZygnRGlidWphbmRvIHJ1dGljYScpO1xuICAgICAgICBsb2FkZXIuc2hvdygpO1xuICAgICAgICB0aGlzLm15U2VydmljZS5nZXREYXRhKGxhdCxsb24sbGF0Mixsb24yLHBhcmFkYXMpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdGFkb1J1dGFzKHJlc3VsdCk7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBvbkdldERhdGFTdWNjZXNzKHJlcykge1xuICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlbCB0b2tlbicpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlcykpOyBcbiAgICAgICAgXG4gICAgICAgIFxuXG4gICAgfVxuICAgIHJlc3VsdGFkb1J1dGFzKHJlcyl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXN1bHRhZG8gZGUgZ2V0RGF0YScpO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbWFwID0gdGhpcy5tYXBWaWV3O1xuICAgICAgICBjb25zdCBtb2RlbCA9IHRoaXM7XG5cbiAgICAgICAgbGV0IGxpc3QgPSBwbC5kZWNvZGUocmVzLnJvdXRlc1swXS5vdmVydmlld19wb2x5bGluZS5wb2ludHMpO1xuICAgICAgICBsZXQgbGluZSA9IG5ldyBQb2x5bGluZSgpO1xuICAgICAgICBsaW5lLnZpc2libGUgPSB0cnVlO1xuICAgICAgICBsaW5lLndpZHRoID0gNDtcbiAgICAgICAgbGV0IG1hdGVyaWFsQ29sb3JzID0gW1xuICAgICAgICAgICAgeyBjb2xvcjogJyNCNDE1NDAnIH0sIHsgY29sb3I6ICcjNTVBRjE0JyB9LCB7IGNvbG9yOiAnIzEwODY1OScgfSwgXG4gICAgICAgICAgICB7IGNvbG9yOiAnI0M3NEUxNycgfSwgeyBjb2xvcjogJyM4NzEwN0QnIH0sIHsgY29sb3I6ICcjRjlCNzQxJyB9LFxuICAgICAgICAgICAgeyBjb2xvcjogJyM1ODA1NTEnIH0sIHsgY29sb3I6ICcjODEyRDA4JyB9LCB7IGNvbG9yOiAnI0RBNDk3MCcgfSxcbiAgICAgICAgXTtcblxuICAgICAgICBsaW5lLmNvbG9yID0gbmV3IENvbG9yKG1hdGVyaWFsQ29sb3JzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1hdGVyaWFsQ29sb3JzLmxlbmd0aCldLmNvbG9yKTtcbiAgICAgICAgbGluZS5nZW9kZXNpYyA9IHRydWU7XG4gICAgICAgIGxpbmUuY2xpY2thYmxlPXRydWU7XG4gICAgICAgIC8vbGluZS51c2VyRGF0YS5cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxpbmUuYWRkUG9pbnQoUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKGxpc3RbaV1bMF0sbGlzdFtpXVsxXSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgbWFwLmFkZFBvbHlsaW5lKGxpbmUpO1xuXG4gICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkdldERhdGFFcnJvcihlcnJvcjogUmVzcG9uc2UgfCBhbnkpIHtcbiAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZSBlcnJvcicpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiAnRXJyb3IgZGUgY29uZXhpw7NuJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiTG8gc2VudGltb3MsIGh1Ym8gdW4gcHJvYmxlbWEgZW5jb250cmFuZG8gZWwgc2Vydmlkb3IsIHZlcmlmaWNhIHR1IGNvbmV4acOzbiBhIEludGVybmV0IGUgaW50ZW50YSBudWV2YW1lbnRlLlwiLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBudWV2YVJlc2VydmEoKTp2b2lke1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2Rpc3BvbmlibGVzXCJdKTtcbiAgICB9XG4gICAgdmVyUGFnb3MoKTp2b2lke1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3RhcmpldGFzXCJdKTsgICBcbiAgICB9XG4gICAgb25NYXBSZWFkeShldmVudCkge1xuXG4gICAgICAgIC8qdGhpcy5sYXRJbmljaWFsID0gNC43MDE0MTI4O1xuICAgICAgICB0aGlzLmxvbkluaWNpYWwgPSAtNzQuMTQ2Njg1NjtcbiAgICAgICAgdGhpcy5sYXRGaW5hbCA9IDQuNjc2NTU4NDtcbiAgICAgICAgdGhpcy5sb25GaW5hbCA9IC03NC4wNTM2NjY2OyovXG4gICAgICAgIGNvbnNvbGUubG9nKCdNYXAgUmVhZHknKTtcblxuICAgICAgICBcblxuICAgICAgICBsZXQgbW9kZWwgPSB0aGlzO1xuICAgICAgICBtb2RlbC5tYXBWaWV3ID0gZXZlbnQub2JqZWN0O1xuXG4gICAgICAgIG1vZGVsLm1hcFZpZXcuc2V0U3R5bGUoPFN0eWxlPih0aGlzLnN0eWxlcykpO1xuICAgICAgICBnZW9sb2NhdGlvbi5pc0VuYWJsZWQoKS50aGVuKGZ1bmN0aW9uIChpc0VuYWJsZWQpIHtcbiAgICAgICAgICAgIGlmIChpc0VuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgbG9jYXRpb24gPSBnZW9sb2NhdGlvbi5nZXRDdXJyZW50TG9jYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICBkZXNpcmVkQWNjdXJhY3k6IEFjY3VyYWN5LmhpZ2gsXG4gICAgICAgICAgICAgICAgICAgIG1heGltdW1BZ2U6IDEwMDAwLFxuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0OiAyMDAwMFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChsb2MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5sYXRpdHVkZSA9IGxvYy5sYXRpdHVkZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5sb25naXR1ZGUgPSBsb2MubG9uZ2l0dWRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLm1hcFZpZXcubGF0aXR1ZGUgPSBsb2MubGF0aXR1ZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwubWFwVmlldy5sb25naXR1ZGUgPSBsb2MubG9uZ2l0dWRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLnNldE1hcmNhZG9yKGxvYy5sYXRpdHVkZSxsb2MubG9uZ2l0dWRlLCdwYXNhamVybycsMik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgZW4gZ2V0Q3VycmVudExvY2F0aW9uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIChlLm1lc3NhZ2UgfHwgZSkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGdlb2xvY2F0aW9uLmVuYWJsZUxvY2F0aW9uUmVxdWVzdCgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbG9jYXRpb24gPSBnZW9sb2NhdGlvbi5nZXRDdXJyZW50TG9jYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVzaXJlZEFjY3VyYWN5OiBBY2N1cmFjeS5oaWdoLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4aW11bUFnZTogNTAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQ6IDEwMDAwXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGxvYykgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5sYXRpdHVkZSA9IGxvYy5sYXRpdHVkZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5sb25naXR1ZGUgPSBsb2MubG9uZ2l0dWRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVYmljYWRvIGVuICcrbG9jLmxhdGl0dWRlKycgLSAnK2xvYy5sb25naXR1ZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLnNldE1hcmNhZG9yKGxvYy5sYXRpdHVkZSxsb2MubG9uZ2l0dWRlLCdwYXNhamVybycsMik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIChlLm1lc3NhZ2UgfHwgZSkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBlbiBlbmFibGVMb2NhdGlvblJlcXVlc3QnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyAoZS5tZXNzYWdlIHx8IGUpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgKGUubWVzc2FnZSB8fCBlKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1vZGVsLm15U2VydmljZS5nZXRSdXRhc0Rpc3BvbmlibGVzKG51bGwpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXN1bHRhZG8gZGUgbWVuc2FqZXMnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDxPYmplY3Qua2V5cyhyZXN1bHQpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1BpbnRhbmRvIGE6Jyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0W2ldKTsgLy8gXCJzcGVjaWVzXCJcblxuICAgICAgICAgICAgICAgIG1vZGVsLnJ1dGFzLnB1c2gocmVzdWx0W2ldKTsgIFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1vZGVsLnJ1dGFzKTtcbiAgICAgICAgICAgICAgICBtb2RlbC5kaWJ1amFyUnV0YShyZXN1bHRbaV0ubGF0b3JpZ2VuKjEscmVzdWx0W2ldLmxvbm9yaWdlbioxLHJlc3VsdFtpXS5sYXRkZXN0aW5vKjEscmVzdWx0W2ldLmxvbmRlc3Rpbm8qMSxbXSlcblxuICAgICAgICAgICAgfVxuICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIG1vZGVsLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHViaWNhcigpe1xuICAgICAgICBjb25zb2xlLmxvZygnVWJpY2FuZG8nKTtcbiAgICAgICAgbGV0IG1vZGVsID0gdGhpcztcbiAgICAgICAgZ2VvbG9jYXRpb24uaXNFbmFibGVkKCkudGhlbihmdW5jdGlvbiAoaXNFbmFibGVkKSB7XG4gICAgICAgICAgICBpZiAoaXNFbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxvY2F0aW9uID0gZ2VvbG9jYXRpb24uZ2V0Q3VycmVudExvY2F0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgZGVzaXJlZEFjY3VyYWN5OiBBY2N1cmFjeS5oaWdoLFxuICAgICAgICAgICAgICAgICAgICBtYXhpbXVtQWdlOiA1MDAwLFxuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0OiAxMDAwMFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChsb2MpIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwubGF0aXR1ZGUgPSBsb2MubGF0aXR1ZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwubG9uZ2l0dWRlID0gbG9jLmxvbmdpdHVkZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVWJpY2FkbyBlbiAnK2xvYy5sYXRpdHVkZSsnIC0gJytsb2MubG9uZ2l0dWRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5zZXRNYXJjYWRvcihsb2MubGF0aXR1ZGUsbG9jLmxvbmdpdHVkZSwncGFzYWplcm8nLDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyAoZS5tZXNzYWdlIHx8IGUpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBnZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxvY2F0aW9uID0gZ2VvbG9jYXRpb24uZ2V0Q3VycmVudExvY2F0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2lyZWRBY2N1cmFjeTogQWNjdXJhY3kuaGlnaCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heGltdW1BZ2U6IDUwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0OiAxMDAwMFxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChsb2MpIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmxhdGl0dWRlID0gbG9jLmxhdGl0dWRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5sb25naXR1ZGUgPSBsb2MubG9uZ2l0dWRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVWJpY2FkbyBlbiAnK2xvYy5sYXRpdHVkZSsnIC0gJytsb2MubG9uZ2l0dWRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuc2V0TWFyY2Fkb3IobG9jLmxhdGl0dWRlLGxvYy5sb25naXR1ZGUsJ3Bhc2FqZXJvJywyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIChlLm1lc3NhZ2UgfHwgZSkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIChlLm1lc3NhZ2UgfHwgZSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyAoZS5tZXNzYWdlIHx8IGUpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNldE1hcmNhZG9yKGxhdCxsb24sdGlwbyxpZCl7XG4gICAgICAgIGxldCBtb2RlbCA9IHRoaXM7XG4gICAgICAgIGNvbnNvbGUubG9nKCdQaW50YW5kbyBtYXJjYWRvcjogJytsYXQrJyAtICcrbG9uKycgLSAnK3RpcG8pO1xuICAgICAgICBpZihtb2RlbC5tYXJrZXIpe1xuICAgICAgICAgICAgbW9kZWwubWFya2VyLnBvc2l0aW9uID0gUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKGxhdCwgbG9uKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBtb2RlbC5tYXJrZXIgPSBuZXcgTWFya2VyKCk7XG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZU1vZHVsZS5JbWFnZSgpO1xuICAgICAgICAgICAgaW1hZ2Uud2lkdGg9MjA7IFxuICAgICAgICAgICAgaW1hZ2UuaGVpZ2h0PTIwOyBcbiAgICAgICAgICAgIGlmKHRpcG8gPT0gJ2luaWNpbycpe1xuICAgICAgICAgICAgICAgIGltYWdlLmltYWdlU291cmNlID0gaW1hZ2VTb3VyY2UuZnJvbVJlc291cmNlKCdpbmljaW8nKTsgIFxuICAgICAgICAgICAgICAgIG1vZGVsLm1hcmtlci50aXRsZSA9IFwiUHVudG8gZGUgaW5pY2lvXCI7XG4gICAgICAgICAgICB9ZWxzZSBpZih0aXBvID09ICdmaW4nKXtcbiAgICAgICAgICAgICAgICBpbWFnZS5pbWFnZVNvdXJjZSA9IGltYWdlU291cmNlLmZyb21SZXNvdXJjZSgnZmluJyk7XG4gICAgICAgICAgICAgICAgbW9kZWwubWFya2VyLnRpdGxlID0gXCJQdW50byBmaW5hbFwiO1xuICAgICAgICAgICAgfWVsc2UgaWYodGlwbyA9PSAncGFzYWplcm8nKXtcbiAgICAgICAgICAgICAgICBtb2RlbC5tYXJrZXIudGl0bGUgPSBcIlR1IHViaWNhY2nDs25cIjsgIFxuICAgICAgICAgICAgICAgIGltYWdlLmltYWdlU291cmNlID0gaW1hZ2VTb3VyY2UuZnJvbVJlc291cmNlKCdwYXNhamVybycpO1xuICAgICAgICAgICAgfSBcblxuICAgICAgICAgICAgXG4gICAgICAgICAgICBtb2RlbC5tYXJrZXIucG9zaXRpb24gPSBQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcobGF0LCBsb24pO1xuICAgICAgICAgICAgbW9kZWwubWFya2VyLmljb249aW1hZ2U7XG4gICAgICAgICAgICBtb2RlbC5tYXJrZXIuc25pcHBldCA9ICdEZXNjcmlwY2nDs24gZGVsIHB1bnRvJztcbiAgICAgICAgICAgIG1vZGVsLm1hcmtlci51c2VyRGF0YSA9IHtpbmRleDogMSxpZDogaWR9O1xuICAgICAgICAgICAgbW9kZWwubWFwVmlldy5hZGRNYXJrZXIobW9kZWwubWFya2VyKTsgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuICAgIG9uQ29vcmRpbmF0ZVRhcHBlZChhcmdzKSB7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkNvb3JkaW5hdGUgVGFwcGVkLCBMYXQ6IFwiICsgYXJncy5wb3NpdGlvbi5sYXRpdHVkZSArIFwiLCBMb246IFwiICsgYXJncy5wb3NpdGlvbi5sb25naXR1ZGUsIGFyZ3MpO1xuICAgIH1cblxuICAgIG9uTWFya2VyRXZlbnQoYXJncykge1xuICAgIH0gXG5cbiAgICBvbkNhbWVyYUNoYW5nZWQoYXJncykge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNhbWVyYSBjaGFuZ2VkOiBcIiArIEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKSwgSlNPTi5zdHJpbmdpZnkoYXJncy5jYW1lcmEpID09PSB0aGlzLmxhc3RDYW1lcmEpO1xuICAgICAgICB0aGlzLmxhc3RDYW1lcmEgPSBKU09OLnN0cmluZ2lmeShhcmdzLmNhbWVyYSk7XG4gICAgfVxufVxuIl19