"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
//import { registerElement } from 'nativescript-angular/element-registry';
var ws_service_1 = require("../ws.service");
var router_2 = require("@angular/router");
var ApplicationSettings = require("application-settings");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var web_view_1 = require("ui/web-view");
var dialogs = require("ui/dialogs");
var webViewInterfaceModule = require('nativescript-webview-interface');
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "ruta", loadChildren: "./ruta/ruta.module#RutaModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
//registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var RutaComponent = /** @class */ (function () {
    function RutaComponent(changeDetectorRef, routerExtensions, myService, route) {
        var _this = this;
        this.changeDetectorRef = changeDetectorRef;
        this.routerExtensions = routerExtensions;
        this.myService = myService;
        this.route = route;
        this.idPasajero = ApplicationSettings.getString('idUsuario');
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
        console.log(this.route.params);
        this.route.params
            .forEach(function (params) {
            console.log('Parametros de url');
            _this.idruta = +params["idruta"];
            _this.idviaje = +params["idviaje"];
            _this.precio = +params["precio"];
            _this.nombreRuta = params["nombre"];
            console.log(_this.idruta + ' - ' + _this.idviaje + ' - ' + _this.precio + ' - ' + _this.nombreRuta);
            _this.webViewSrc = 'https://apps.emeraldstudio.co/imperial/?idruta=' + _this.idruta + '&idviaje=' + _this.idviaje + '&idpasajero=' + _this.idPasajero;
            //this.webViewSrc = "http://turutaescolar.cloudapp.net/swturutaes/services/reserva_mapa_imperial.html?idruta="+this.idruta+"&idviaje="+this.idviaje+"&idpasajero="+this.idPasajero;
            //this.webViewSrc = 'https://www.emerald.studio';
            console.log('URL WEB: ' + _this.webViewSrc);
        });
    }
    RutaComponent.prototype.ngAfterViewInit = function () {
        this.setupWebViewInterface();
    };
    RutaComponent.prototype.setupWebViewInterface = function () {
        var webView = this.webView.nativeElement;
        //webView.ios.
        this.oLangWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView, this.webViewSrc);
        // loading languages in dropdown, on load of webView.
        webView.on(web_view_1.WebView.loadFinishedEvent, function (args) {
            if (!args.error) {
            }
        });
        this.listenLangWebViewEvents();
    };
    /**
    * Handles any event/command emitted by language webview.
    */
    RutaComponent.prototype.listenLangWebViewEvents = function () {
        var _this = this;
        // handles language selectionChange event.
        console.log('En listado de listenLangWeb tales');
        this.oLangWebViewInterface.on('exitoNative', function (respuesta) {
            console.log('exitoNative');
            console.log(respuesta);
            dialogs.confirm({
                title: "Realizar reserva",
                message: "Realmente deseas realizar la reserva en " + respuesta.direccion + "?",
                okButtonText: "Si",
                cancelButtonText: "No"
            }).then(function (result) {
                // result argument is boolean
                if (result) {
                    ApplicationSettings.setNumber('latReserva', respuesta.latitud);
                    ApplicationSettings.setNumber('lonReserva', respuesta.longitud);
                    ApplicationSettings.setString('dirReserva', respuesta.direccion);
                    ApplicationSettings.setNumber('viajeReserva', _this.idviaje);
                    ApplicationSettings.setNumber('rutaReserva', _this.idruta);
                    ApplicationSettings.setNumber('precioReserva', _this.precio);
                    _this.routerExtensions.navigate(["/reservar"]);
                }
                console.log("Dialog result: " + result);
            });
        });
        this.oLangWebViewInterface.on('errorNative', function (error) {
            console.log('Error wiiii');
            console.log(error);
        });
    };
    RutaComponent.prototype.irAtras = function () {
        this.routerExtensions.back();
    };
    RutaComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.ViewChild('webView'),
        __metadata("design:type", core_1.ElementRef)
    ], RutaComponent.prototype, "webView", void 0);
    RutaComponent = __decorate([
        core_1.Component({
            selector: "Ruta",
            moduleId: module.id,
            templateUrl: "./ruta.component.html",
            providers: [ws_service_1.WebService]
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef, router_1.RouterExtensions, ws_service_1.WebService, router_2.ActivatedRoute])
    ], RutaComponent);
    return RutaComponent;
}());
exports.RutaComponent = RutaComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnV0YS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJydXRhLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwRztBQUMxRyxzREFBNkQ7QUFDN0QsMEVBQTBFO0FBRTFFLDRDQUEyQztBQUMzQywwQ0FBaUQ7QUFDakQsMERBQTREO0FBQzVELGlGQUFnRTtBQUVoRSx3Q0FBcUQ7QUFFckQsb0NBQXNDO0FBR3RDLElBQUksc0JBQXNCLEdBQUcsT0FBTyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7QUFHdkU7Ozs7OzhEQUs4RDtBQUM5RCxvRkFBb0Y7QUFDcEYsSUFBSSxNQUFNLEdBQUcsSUFBSSxpREFBZ0IsRUFBRSxDQUFDO0FBT3BDO0lBaUJJLHVCQUFvQixpQkFBb0MsRUFBUyxnQkFBa0MsRUFBVSxTQUFxQixFQUFTLEtBQXFCO1FBQWhLLGlCQXFCQztRQXJCbUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUFTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFZO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFKaEssZUFBVSxHQUFXLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUs1RDs7c0VBRThEO1FBQzlELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07YUFDZCxPQUFPLENBQUMsVUFBQyxNQUFNO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2pDLEtBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEMsS0FBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNsQyxLQUFJLENBQUMsTUFBTSxH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QVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELENBQUM7Z0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsQ0FBQztZQUM1QyxDQUFDLENBQUMsQ0FBQztRQUdQLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUMsVUFBQyxLQUFLO1lBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV2QixDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFRCwrQkFBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxnQ0FBUSxHQUFSO0lBS0EsQ0FBQztJQTNHcUI7UUFBckIsZ0JBQVMsQ0FBQyxTQUFTLENBQUM7a0NBQVUsaUJBQVU7a0RBQUM7SUFGakMsYUFBYTtRQU56QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsdUJBQVUsQ0FBQztTQUMxQixDQUFDO3lDQWtCeUMsd0JBQWlCLEVBQTJCLHlCQUFnQixFQUFxQix1QkFBVSxFQUFnQix1QkFBYztPQWpCdkosYUFBYSxDQWlIekI7SUFBRCxvQkFBQztDQUFBLEFBakhELElBaUhDO0FBakhZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsRWxlbWVudFJlZiwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0LENoYW5nZURldGVjdG9yUmVmICB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbi8vaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeSc7XG5cbmltcG9ydCB7IFdlYlNlcnZpY2UgfSBmcm9tIFwiLi4vd3Muc2VydmljZVwiO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IHtMb2FkaW5nSW5kaWNhdG9yfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7XG5cbmltcG9ydCB7IFdlYlZpZXcsIExvYWRFdmVudERhdGEgfSBmcm9tIFwidWkvd2ViLXZpZXdcIjtcbmltcG9ydCB7IExhYmVsIH0gZnJvbSBcInVpL2xhYmVsXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5cblxubGV0IHdlYlZpZXdJbnRlcmZhY2VNb2R1bGUgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtd2Vidmlldy1pbnRlcmZhY2UnKTtcblxuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBCZWZvcmUgeW91IGNhbiBuYXZpZ2F0ZSB0byB0aGlzIHBhZ2UgZnJvbSB5b3VyIGFwcCwgeW91IG5lZWQgdG8gcmVmZXJlbmNlIHRoaXMgcGFnZSdzIG1vZHVsZSBpbiB0aGVcbiogZ2xvYmFsIGFwcCByb3V0ZXIgbW9kdWxlLiBBZGQgdGhlIGZvbGxvd2luZyBvYmplY3QgdG8gdGhlIGdsb2JhbCBhcnJheSBvZiByb3V0ZXM6XG4qIHsgcGF0aDogXCJydXRhXCIsIGxvYWRDaGlsZHJlbjogXCIuL3J1dGEvcnV0YS5tb2R1bGUjUnV0YU1vZHVsZVwiIH1cbiogTm90ZSB0aGF0IHRoaXMgc2ltcGx5IHBvaW50cyB0aGUgcGF0aCB0byB0aGUgcGFnZSBtb2R1bGUgZmlsZS4gSWYgeW91IG1vdmUgdGhlIHBhZ2UsIHlvdSBuZWVkIHRvIHVwZGF0ZSB0aGUgcm91dGUgdG9vLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8vcmVnaXN0ZXJFbGVtZW50KFwiTWFwVmlld1wiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWdvb2dsZS1tYXBzLXNka1wiKS5NYXBWaWV3KTtcbmxldCBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiUnV0YVwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9ydXRhLmNvbXBvbmVudC5odG1sXCIsXG4gICAgcHJvdmlkZXJzOiBbV2ViU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgUnV0YUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gICAgcHVibGljIHdlYlZpZXdTcmM6IHN0cmluZztcbiAgICBAVmlld0NoaWxkKCd3ZWJWaWV3Jykgd2ViVmlldzogRWxlbWVudFJlZjtcbiAgICBwcml2YXRlIG9MYW5nV2ViVmlld0ludGVyZmFjZTtcblxuXG5cblxuICAgIFxuICAgIGlkcnV0YTogbnVtYmVyO1xuICAgIGlkdmlhamU6IG51bWJlcjtcbiAgICBwcmVjaW86bnVtYmVyO1xuICAgIG5vbWJyZVJ1dGE6c3RyaW5nO1xuICAgIGlkUGFzYWplcm86IHN0cmluZyA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdpZFVzdWFyaW8nKTtcblxuXG4gICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYscHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIG15U2VydmljZTogV2ViU2VydmljZSxwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFVzZSB0aGUgY29uc3RydWN0b3IgdG8gaW5qZWN0IGFwcCBzZXJ2aWNlcyB0aGF0IHlvdSBuZWVkIGluIHRoaXMgY29tcG9uZW50LlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJvdXRlLnBhcmFtcyk7XG4gICAgICAgIHRoaXMucm91dGUucGFyYW1zXG4gICAgICAgICAgLmZvckVhY2goKHBhcmFtcykgPT4geyBcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1BhcmFtZXRyb3MgZGUgdXJsJyk7XG4gICAgICAgICAgICAgIHRoaXMuaWRydXRhID0gK3BhcmFtc1tcImlkcnV0YVwiXTsgXG4gICAgICAgICAgICAgIHRoaXMuaWR2aWFqZSA9ICtwYXJhbXNbXCJpZHZpYWplXCJdOyBcbiAgICAgICAgICAgICAgdGhpcy5wcmVjaW8gPSArcGFyYW1zW1wicHJlY2lvXCJdO1xuICAgICAgICAgICAgICB0aGlzLm5vbWJyZVJ1dGEgPSBwYXJhbXNbXCJub21icmVcIl07XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaWRydXRhKycgLSAnK3RoaXMuaWR2aWFqZSsnIC0gJyt0aGlzLnByZWNpbysnIC0gJyt0aGlzLm5vbWJyZVJ1dGEpO1xuICAgICAgICAgICAgICB0aGlzLndlYlZpZXdTcmMgPSAnaHR0cHM6Ly9hcHBzLmVtZXJhbGRzdHVkaW8uY28vaW1wZXJpYWwvP2lkcnV0YT0nK3RoaXMuaWRydXRhKycmaWR2aWFqZT0nK3RoaXMuaWR2aWFqZSsnJmlkcGFzYWplcm89Jyt0aGlzLmlkUGFzYWplcm87XG4gICAgICAgICAgICAgIC8vdGhpcy53ZWJWaWV3U3JjID0gXCJodHRwOi8vdHVydXRhZXNjb2xhci5jbG91ZGFwcC5uZXQvc3d0dXJ1dGFlcy9zZXJ2aWNlcy9yZXNlcnZhX21hcGFfaW1wZXJpYWwuaHRtbD9pZHJ1dGE9XCIrdGhpcy5pZHJ1dGErXCImaWR2aWFqZT1cIit0aGlzLmlkdmlhamUrXCImaWRwYXNhamVybz1cIit0aGlzLmlkUGFzYWplcm87XG4gICAgICAgICAgICAgIC8vdGhpcy53ZWJWaWV3U3JjID0gJ2h0dHBzOi8vd3d3LmVtZXJhbGQuc3R1ZGlvJztcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1VSTCBXRUI6ICcrdGhpcy53ZWJWaWV3U3JjKTtcblxuICAgICAgICAgIH0pOyBcbiAgICAgICAgXG5cbiAgICB9XG5cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZXR1cFdlYlZpZXdJbnRlcmZhY2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldHVwV2ViVmlld0ludGVyZmFjZSgpIHtcbiAgICAgICAgbGV0IHdlYlZpZXc6IFdlYlZpZXcgPSB0aGlzLndlYlZpZXcubmF0aXZlRWxlbWVudDtcbiAgICAgICAgLy93ZWJWaWV3Lmlvcy5cbiAgICAgICAgdGhpcy5vTGFuZ1dlYlZpZXdJbnRlcmZhY2UgPSBuZXcgd2ViVmlld0ludGVyZmFjZU1vZHVsZS5XZWJWaWV3SW50ZXJmYWNlKHdlYlZpZXcsIHRoaXMud2ViVmlld1NyYyk7XG5cbiAgICAgICAgLy8gbG9hZGluZyBsYW5ndWFnZXMgaW4gZHJvcGRvd24sIG9uIGxvYWQgb2Ygd2ViVmlldy5cbiAgICAgICAgd2ViVmlldy5vbihXZWJWaWV3LmxvYWRGaW5pc2hlZEV2ZW50LCAoYXJnczogTG9hZEV2ZW50RGF0YSkgPT4ge1xuICAgICAgICAgIGlmICghYXJncy5lcnJvcikge1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5saXN0ZW5MYW5nV2ViVmlld0V2ZW50cygpO1xuICAgIH1cblxuICAgIFxuXG4gICAgLyoqXG4gICAgKiBIYW5kbGVzIGFueSBldmVudC9jb21tYW5kIGVtaXR0ZWQgYnkgbGFuZ3VhZ2Ugd2Vidmlldy5cbiAgICAqLyBcbiAgICBwcml2YXRlIGxpc3RlbkxhbmdXZWJWaWV3RXZlbnRzKCkge1xuICAgICAgICAvLyBoYW5kbGVzIGxhbmd1YWdlIHNlbGVjdGlvbkNoYW5nZSBldmVudC5cbiAgICAgICAgY29uc29sZS5sb2coJ0VuIGxpc3RhZG8gZGUgbGlzdGVuTGFuZ1dlYiB0YWxlcycpO1xuXG4gICAgICAgIHRoaXMub0xhbmdXZWJWaWV3SW50ZXJmYWNlLm9uKCdleGl0b05hdGl2ZScsKHJlc3B1ZXN0YSkgPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZXhpdG9OYXRpdmUnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3B1ZXN0YSk7XG4gICAgICAgICAgICBkaWFsb2dzLmNvbmZpcm0oe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlJlYWxpemFyIHJlc2VydmFcIixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlJlYWxtZW50ZSBkZXNlYXMgcmVhbGl6YXIgbGEgcmVzZXJ2YSBlbiBcIityZXNwdWVzdGEuZGlyZWNjaW9uK1wiP1wiLFxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJTaVwiLFxuICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiTm9cIlxuICAgICAgICAgICAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHJlc3VsdCBhcmd1bWVudCBpcyBib29sZWFuXG4gICAgICAgICAgICAgICAgaWYocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXROdW1iZXIoJ2xhdFJlc2VydmEnLHJlc3B1ZXN0YS5sYXRpdHVkKTtcbiAgICAgICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXROdW1iZXIoJ2xvblJlc2VydmEnLHJlc3B1ZXN0YS5sb25naXR1ZCk7XG4gICAgICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKCdkaXJSZXNlcnZhJyxyZXNwdWVzdGEuZGlyZWNjaW9uKTtcbiAgICAgICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXROdW1iZXIoJ3ZpYWplUmVzZXJ2YScsdGhpcy5pZHZpYWplKTtcbiAgICAgICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXROdW1iZXIoJ3J1dGFSZXNlcnZhJyx0aGlzLmlkcnV0YSk7XG4gICAgICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0TnVtYmVyKCdwcmVjaW9SZXNlcnZhJyx0aGlzLnByZWNpbyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcmVzZXJ2YXJcIl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyByZXN1bHQ6IFwiICsgcmVzdWx0KTtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub0xhbmdXZWJWaWV3SW50ZXJmYWNlLm9uKCdlcnJvck5hdGl2ZScsKGVycm9yKSA9PntcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciB3aWlpaScpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgaXJBdHJhcygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcbiAgICB9XG4gICAgXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG5cblxuXG4gICAgICAgIFxuICAgIH1cbiAgICBcblxuICAgIFxufVxuIl19