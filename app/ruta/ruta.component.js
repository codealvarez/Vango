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
        console.log('ios webview en setup');
        console.log(webView.ios);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnV0YS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJydXRhLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwRztBQUMxRyxzREFBNkQ7QUFDN0QsMEVBQTBFO0FBRTFFLDRDQUEyQztBQUMzQywwQ0FBaUQ7QUFDakQsMERBQTREO0FBQzVELGlGQUFnRTtBQUVoRSx3Q0FBcUQ7QUFFckQsb0NBQXNDO0FBR3RDLElBQUksc0JBQXNCLEdBQUcsT0FBTyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7QUFHdkU7Ozs7OzhEQUs4RDtBQUM5RCxvRkFBb0Y7QUFDcEYsSUFBSSxNQUFNLEdBQUcsSUFBSSxpREFBZ0IsRUFBRSxDQUFDO0FBT3BDO0lBaUJJLHVCQUFvQixpQkFBb0MsRUFBUyxnQkFBa0MsRUFBVSxTQUFxQixFQUFTLEtBQXFCO1FBQWhLLGlCQXFCQztRQXJCbUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUFTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFZO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFKaEssZUFBVSxHQUFXLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUs1RDs7c0VBRThEO1FBQzlELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07YUFDZCxPQUFPLENBQUMsVUFBQyxNQUFNO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2pDLEtBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEMsS0FBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNsQyxLQUFJLENBQUMsTUFBTSxH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QUM7b0JBQzNELEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2lCQUNqRDtnQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxDQUFDO1lBQzVDLENBQUMsQ0FBQyxDQUFDO1FBR1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBQyxVQUFDLEtBQUs7WUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXZCLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVELCtCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELGdDQUFRLEdBQVI7SUFLQSxDQUFDO0lBN0dxQjtRQUFyQixnQkFBUyxDQUFDLFNBQVMsQ0FBQztrQ0FBVSxpQkFBVTtrREFBQztJQUZqQyxhQUFhO1FBTnpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxTQUFTLEVBQUUsQ0FBQyx1QkFBVSxDQUFDO1NBQzFCLENBQUM7eUNBa0J5Qyx3QkFBaUIsRUFBMkIseUJBQWdCLEVBQXFCLHVCQUFVLEVBQWdCLHVCQUFjO09BakJ2SixhQUFhLENBbUh6QjtJQUFELG9CQUFDO0NBQUEsQUFuSEQsSUFtSEM7QUFuSFksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCxFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsQ2hhbmdlRGV0ZWN0b3JSZWYgIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuLy9pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5JztcblxuaW1wb3J0IHsgV2ViU2VydmljZSB9IGZyb20gXCIuLi93cy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQge0xvYWRpbmdJbmRpY2F0b3J9IGZyb20gXCJuYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3JcIjtcblxuaW1wb3J0IHsgV2ViVmlldywgTG9hZEV2ZW50RGF0YSB9IGZyb20gXCJ1aS93ZWItdmlld1wiO1xuaW1wb3J0IHsgTGFiZWwgfSBmcm9tIFwidWkvbGFiZWxcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcblxuXG5sZXQgd2ViVmlld0ludGVyZmFjZU1vZHVsZSA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC13ZWJ2aWV3LWludGVyZmFjZScpO1xuXG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qIEJlZm9yZSB5b3UgY2FuIG5hdmlnYXRlIHRvIHRoaXMgcGFnZSBmcm9tIHlvdXIgYXBwLCB5b3UgbmVlZCB0byByZWZlcmVuY2UgdGhpcyBwYWdlJ3MgbW9kdWxlIGluIHRoZVxuKiBnbG9iYWwgYXBwIHJvdXRlciBtb2R1bGUuIEFkZCB0aGUgZm9sbG93aW5nIG9iamVjdCB0byB0aGUgZ2xvYmFsIGFycmF5IG9mIHJvdXRlczpcbiogeyBwYXRoOiBcInJ1dGFcIiwgbG9hZENoaWxkcmVuOiBcIi4vcnV0YS9ydXRhLm1vZHVsZSNSdXRhTW9kdWxlXCIgfVxuKiBOb3RlIHRoYXQgdGhpcyBzaW1wbHkgcG9pbnRzIHRoZSBwYXRoIHRvIHRoZSBwYWdlIG1vZHVsZSBmaWxlLiBJZiB5b3UgbW92ZSB0aGUgcGFnZSwgeW91IG5lZWQgdG8gdXBkYXRlIHRoZSByb3V0ZSB0b28uXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLy9yZWdpc3RlckVsZW1lbnQoXCJNYXBWaWV3XCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrXCIpLk1hcFZpZXcpO1xubGV0IGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJSdXRhXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3J1dGEuY29tcG9uZW50Lmh0bWxcIixcbiAgICBwcm92aWRlcnM6IFtXZWJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBSdXRhQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgICBwdWJsaWMgd2ViVmlld1NyYzogc3RyaW5nO1xuICAgIEBWaWV3Q2hpbGQoJ3dlYlZpZXcnKSB3ZWJWaWV3OiBFbGVtZW50UmVmO1xuICAgIHByaXZhdGUgb0xhbmdXZWJWaWV3SW50ZXJmYWNlO1xuXG5cblxuXG4gICAgXG4gICAgaWRydXRhOiBudW1iZXI7XG4gICAgaWR2aWFqZTogbnVtYmVyO1xuICAgIHByZWNpbzpudW1iZXI7XG4gICAgbm9tYnJlUnV0YTpzdHJpbmc7XG4gICAgaWRQYXNhamVybzogc3RyaW5nID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ2lkVXN1YXJpbycpO1xuXG5cbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgbXlTZXJ2aWNlOiBXZWJTZXJ2aWNlLHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogVXNlIHRoZSBjb25zdHJ1Y3RvciB0byBpbmplY3QgYXBwIHNlcnZpY2VzIHRoYXQgeW91IG5lZWQgaW4gdGhpcyBjb21wb25lbnQuXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucm91dGUucGFyYW1zKTtcbiAgICAgICAgdGhpcy5yb3V0ZS5wYXJhbXNcbiAgICAgICAgICAuZm9yRWFjaCgocGFyYW1zKSA9PiB7IFxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUGFyYW1ldHJvcyBkZSB1cmwnKTtcbiAgICAgICAgICAgICAgdGhpcy5pZHJ1dGEgPSArcGFyYW1zW1wiaWRydXRhXCJdOyBcbiAgICAgICAgICAgICAgdGhpcy5pZHZpYWplID0gK3BhcmFtc1tcImlkdmlhamVcIl07IFxuICAgICAgICAgICAgICB0aGlzLnByZWNpbyA9ICtwYXJhbXNbXCJwcmVjaW9cIl07XG4gICAgICAgICAgICAgIHRoaXMubm9tYnJlUnV0YSA9IHBhcmFtc1tcIm5vbWJyZVwiXTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5pZHJ1dGErJyAtICcrdGhpcy5pZHZpYWplKycgLSAnK3RoaXMucHJlY2lvKycgLSAnK3RoaXMubm9tYnJlUnV0YSk7XG4gICAgICAgICAgICAgIHRoaXMud2ViVmlld1NyYyA9ICdodHRwczovL2FwcHMuZW1lcmFsZHN0dWRpby5jby9pbXBlcmlhbC8/aWRydXRhPScrdGhpcy5pZHJ1dGErJyZpZHZpYWplPScrdGhpcy5pZHZpYWplKycmaWRwYXNhamVybz0nK3RoaXMuaWRQYXNhamVybztcbiAgICAgICAgICAgICAgLy90aGlzLndlYlZpZXdTcmMgPSBcImh0dHA6Ly90dXJ1dGFlc2NvbGFyLmNsb3VkYXBwLm5ldC9zd3R1cnV0YWVzL3NlcnZpY2VzL3Jlc2VydmFfbWFwYV9pbXBlcmlhbC5odG1sP2lkcnV0YT1cIit0aGlzLmlkcnV0YStcIiZpZHZpYWplPVwiK3RoaXMuaWR2aWFqZStcIiZpZHBhc2FqZXJvPVwiK3RoaXMuaWRQYXNhamVybztcbiAgICAgICAgICAgICAgLy90aGlzLndlYlZpZXdTcmMgPSAnaHR0cHM6Ly93d3cuZW1lcmFsZC5zdHVkaW8nO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVVJMIFdFQjogJyt0aGlzLndlYlZpZXdTcmMpO1xuXG4gICAgICAgICAgfSk7IFxuICAgICAgICBcblxuICAgIH1cblxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLnNldHVwV2ViVmlld0ludGVyZmFjZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0dXBXZWJWaWV3SW50ZXJmYWNlKCkge1xuICAgICAgICBsZXQgd2ViVmlldzogV2ViVmlldyA9IHRoaXMud2ViVmlldy5uYXRpdmVFbGVtZW50O1xuICAgICAgICAvL3dlYlZpZXcuaW9zLlxuICAgICAgICBjb25zb2xlLmxvZygnaW9zIHdlYnZpZXcgZW4gc2V0dXAnKTtcbiAgICAgICAgY29uc29sZS5sb2cod2ViVmlldy5pb3MpO1xuICAgICAgICB0aGlzLm9MYW5nV2ViVmlld0ludGVyZmFjZSA9IG5ldyB3ZWJWaWV3SW50ZXJmYWNlTW9kdWxlLldlYlZpZXdJbnRlcmZhY2Uod2ViVmlldywgdGhpcy53ZWJWaWV3U3JjKTtcblxuICAgICAgICAvLyBsb2FkaW5nIGxhbmd1YWdlcyBpbiBkcm9wZG93biwgb24gbG9hZCBvZiB3ZWJWaWV3LlxuICAgICAgICB3ZWJWaWV3Lm9uKFdlYlZpZXcubG9hZEZpbmlzaGVkRXZlbnQsIChhcmdzOiBMb2FkRXZlbnREYXRhKSA9PiB7XG4gICAgICAgICAgaWYgKCFhcmdzLmVycm9yKSB7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmxpc3RlbkxhbmdXZWJWaWV3RXZlbnRzKCk7XG4gICAgfVxuXG4gICAgXG5cbiAgICAvKipcbiAgICAqIEhhbmRsZXMgYW55IGV2ZW50L2NvbW1hbmQgZW1pdHRlZCBieSBsYW5ndWFnZSB3ZWJ2aWV3LlxuICAgICovIFxuICAgIHByaXZhdGUgbGlzdGVuTGFuZ1dlYlZpZXdFdmVudHMoKSB7XG4gICAgICAgIC8vIGhhbmRsZXMgbGFuZ3VhZ2Ugc2VsZWN0aW9uQ2hhbmdlIGV2ZW50LlxuICAgICAgICBjb25zb2xlLmxvZygnRW4gbGlzdGFkbyBkZSBsaXN0ZW5MYW5nV2ViIHRhbGVzJyk7XG5cbiAgICAgICAgdGhpcy5vTGFuZ1dlYlZpZXdJbnRlcmZhY2Uub24oJ2V4aXRvTmF0aXZlJywocmVzcHVlc3RhKSA9PntcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdleGl0b05hdGl2ZScpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcHVlc3RhKTtcbiAgICAgICAgICAgIGRpYWxvZ3MuY29uZmlybSh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiUmVhbGl6YXIgcmVzZXJ2YVwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiUmVhbG1lbnRlIGRlc2VhcyByZWFsaXphciBsYSByZXNlcnZhIGVuIFwiK3Jlc3B1ZXN0YS5kaXJlY2Npb24rXCI/XCIsXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIlNpXCIsXG4gICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJOb1wiXG4gICAgICAgICAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gcmVzdWx0IGFyZ3VtZW50IGlzIGJvb2xlYW5cbiAgICAgICAgICAgICAgICBpZihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldE51bWJlcignbGF0UmVzZXJ2YScscmVzcHVlc3RhLmxhdGl0dWQpO1xuICAgICAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldE51bWJlcignbG9uUmVzZXJ2YScscmVzcHVlc3RhLmxvbmdpdHVkKTtcbiAgICAgICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoJ2RpclJlc2VydmEnLHJlc3B1ZXN0YS5kaXJlY2Npb24pO1xuICAgICAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldE51bWJlcigndmlhamVSZXNlcnZhJyx0aGlzLmlkdmlhamUpO1xuICAgICAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldE51bWJlcigncnV0YVJlc2VydmEnLHRoaXMuaWRydXRhKTtcbiAgICAgICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXROdW1iZXIoJ3ByZWNpb1Jlc2VydmEnLHRoaXMucHJlY2lvKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9yZXNlcnZhclwiXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIHJlc3VsdDogXCIgKyByZXN1bHQpO1xuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vTGFuZ1dlYlZpZXdJbnRlcmZhY2Uub24oJ2Vycm9yTmF0aXZlJywoZXJyb3IpID0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIHdpaWlpJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBpckF0cmFzKCkge1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xuICAgIH1cbiAgICBcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcblxuXG5cbiAgICAgICAgXG4gICAgfVxuICAgIFxuXG4gICAgXG59XG4iXX0=