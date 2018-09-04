"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var ws_service_1 = require("../ws.service");
var dialogs = require("ui/dialogs");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var ApplicationSettings = require("application-settings");
var observableArray = require("tns-core-modules/data/observable-array");
//Drawer
var app = require("application");
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "reservas", loadChildren: "./reservas/reservas.module#ReservasModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
var DataItem = /** @class */ (function () {
    function DataItem(idviaje, idruta, nombreruta, conductor, placa, capacidad, pasajes, fecha_viaje, hora_viaje) {
        this.idviaje = idviaje;
        this.idruta = idruta;
        this.nombreruta = nombreruta;
        this.conductor = conductor;
        this.placa = placa;
        this.capacidad = capacidad;
        this.pasajes = pasajes;
        this.fecha_viaje = fecha_viaje;
        this.hora_viaje = hora_viaje;
    }
    return DataItem;
}());
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var ReservasComponent = /** @class */ (function () {
    function ReservasComponent(routerExtensions, myService) {
        this.routerExtensions = routerExtensions;
        this.myService = myService;
        this.myItems = new observableArray.ObservableArray([]);
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }
    ReservasComponent.prototype.onDrawerButtonTap = function () {
        var sideDrawer = app.getRootView();
        sideDrawer.showDrawer();
    };
    ReservasComponent.prototype.ngOnInit = function () {
        var _this = this;
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
        var idUsuario = ApplicationSettings.getString('idUsuario');
        loader.show();
        this.myService.getRutasAsignadas(idUsuario).subscribe(function (res) {
            loader.hide();
            console.log('Respuesta de las rutas: ' + Object.keys(res).length);
            console.log(JSON.stringify(res));
            for (var i = 0; i < Object.keys(res).length; i++) {
                console.log('Pintando a:');
                console.log(res[i]); // "species"
                if (res[i].estadoviaje != 'FINALIZADO') {
                    //res[i].estadoviaje='EN TRANSITO';
                    _this.myItems.push(res[i]);
                }
            }
        }, function (error) {
            loader.hide();
            _this.onGetDataError(error);
        });
    };
    ReservasComponent.prototype.onItemTap = function (args) {
        console.log("------------------------ ItemTapped: " + args.index);
    };
    ReservasComponent.prototype.onGetDataError = function (error) {
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
    ReservasComponent.prototype.salir = function () {
        ApplicationSettings.setBoolean("authenticated", false);
        ApplicationSettings.remove("nombreUsuario");
        ApplicationSettings.remove("idUsuario");
        ApplicationSettings.remove("emailUsuario");
        this.routerExtensions.navigate(["/login"]);
    };
    ReservasComponent.prototype.reservar = function () {
        this.routerExtensions.navigate(["/home"]);
    };
    ReservasComponent = __decorate([
        core_1.Component({
            selector: "Reservas",
            moduleId: module.id,
            templateUrl: "./reservas.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions, ws_service_1.WebService])
    ], ReservasComponent);
    return ReservasComponent;
}());
exports.ReservasComponent = ReservasComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXJ2YXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzZXJ2YXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJFO0FBRTNFLHNEQUE2RDtBQUM3RCw0Q0FBMkM7QUFDM0Msb0NBQXNDO0FBQ3RDLGlGQUFnRTtBQUNoRSwwREFBNEQ7QUFDNUQsd0VBQTBFO0FBQzFFLFFBQVE7QUFDUixpQ0FBbUM7QUFJbkM7Ozs7OzhEQUs4RDtBQUM5RDtJQUNJLGtCQUFtQixPQUFlLEVBQVMsTUFBYyxFQUFTLFVBQWlCLEVBQVMsU0FBaUIsRUFBUyxLQUFZLEVBQVMsU0FBZ0IsRUFBUyxPQUFjLEVBQVMsV0FBa0IsRUFBUSxVQUFpQjtRQUFuTixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLGVBQVUsR0FBVixVQUFVLENBQU87UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBTztRQUFTLGNBQVMsR0FBVCxTQUFTLENBQU87UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFPO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQU87UUFBUSxlQUFVLEdBQVYsVUFBVSxDQUFPO0lBQUksQ0FBQztJQUMvTyxlQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFDRCxJQUFJLE1BQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7QUFPcEM7SUFJSSwyQkFBb0IsZ0JBQWtDLEVBQVMsU0FBcUI7UUFBaEUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFTLGNBQVMsR0FBVCxTQUFTLENBQVk7UUFGN0UsWUFBTyxHQUFHLElBQUksZUFBZSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUdyRDs7c0VBRThEO0lBQ2xFLENBQUM7SUFDRCw2Q0FBaUIsR0FBakI7UUFDSSxJQUFNLFVBQVUsR0FBa0IsR0FBRyxDQUFDLFdBQVcsRUFB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QkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1NBQ2xELENBQUM7eUNBS3dDLHlCQUFnQixFQUFvQix1QkFBVTtPQUozRSxpQkFBaUIsQ0FvRTdCO0lBQUQsd0JBQUM7Q0FBQSxBQXBFRCxJQW9FQztBQXBFWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFdlYlNlcnZpY2UgfSBmcm9tIFwiLi4vd3Muc2VydmljZVwiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0IHtMb2FkaW5nSW5kaWNhdG9yfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7XG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0ICogYXMgb2JzZXJ2YWJsZUFycmF5IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuLy9EcmF3ZXJcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwiYXBwbGljYXRpb25cIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXJcIjtcblxuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBCZWZvcmUgeW91IGNhbiBuYXZpZ2F0ZSB0byB0aGlzIHBhZ2UgZnJvbSB5b3VyIGFwcCwgeW91IG5lZWQgdG8gcmVmZXJlbmNlIHRoaXMgcGFnZSdzIG1vZHVsZSBpbiB0aGVcbiogZ2xvYmFsIGFwcCByb3V0ZXIgbW9kdWxlLiBBZGQgdGhlIGZvbGxvd2luZyBvYmplY3QgdG8gdGhlIGdsb2JhbCBhcnJheSBvZiByb3V0ZXM6XG4qIHsgcGF0aDogXCJyZXNlcnZhc1wiLCBsb2FkQ2hpbGRyZW46IFwiLi9yZXNlcnZhcy9yZXNlcnZhcy5tb2R1bGUjUmVzZXJ2YXNNb2R1bGVcIiB9XG4qIE5vdGUgdGhhdCB0aGlzIHNpbXBseSBwb2ludHMgdGhlIHBhdGggdG8gdGhlIHBhZ2UgbW9kdWxlIGZpbGUuIElmIHlvdSBtb3ZlIHRoZSBwYWdlLCB5b3UgbmVlZCB0byB1cGRhdGUgdGhlIHJvdXRlIHRvby5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5jbGFzcyBEYXRhSXRlbSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGlkdmlhamU6IHN0cmluZywgcHVibGljIGlkcnV0YTogc3RyaW5nLCBwdWJsaWMgbm9tYnJlcnV0YTpzdHJpbmcsIHB1YmxpYyBjb25kdWN0b3I6IHN0cmluZywgcHVibGljIHBsYWNhOnN0cmluZywgcHVibGljIGNhcGFjaWRhZDpudW1iZXIsIHB1YmxpYyBwYXNhamVzOm51bWJlciwgcHVibGljIGZlY2hhX3ZpYWplOm51bWJlcixwdWJsaWMgaG9yYV92aWFqZTpudW1iZXIpIHsgfSAgIFxufVxubGV0IGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJSZXNlcnZhc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9yZXNlcnZhcy5jb21wb25lbnQuaHRtbFwiLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFJlc2VydmFzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwcml2YXRlIF9tYWluQ29udGVudFRleHQ6IHN0cmluZztcbiAgICBwdWJsaWMgbXlJdGVtcyA9IG5ldyBvYnNlcnZhYmxlQXJyYXkuT2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgICBwcml2YXRlIGNvdW50ZXI6IG51bWJlcjtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMscHJpdmF0ZSBteVNlcnZpY2U6IFdlYlNlcnZpY2UpIHtcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBVc2UgdGhlIGNvbnN0cnVjdG9yIHRvIGluamVjdCBhcHAgc2VydmljZXMgdGhhdCB5b3UgbmVlZCBpbiB0aGlzIGNvbXBvbmVudC5cbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICB9XG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj5hcHAuZ2V0Um9vdFZpZXcoKTtcbiAgICAgICAgc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxuICAgIFxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogVXNlIHRoZSBcIm5nT25Jbml0XCIgaGFuZGxlciB0byBpbml0aWFsaXplIGRhdGEgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgICAgICBsZXQgaWRVc3VhcmlvID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ2lkVXN1YXJpbycpO1xuICAgICAgICBsb2FkZXIuc2hvdygpO1xuICAgICAgICB0aGlzLm15U2VydmljZS5nZXRSdXRhc0FzaWduYWRhcyhpZFVzdWFyaW8pLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZSBsYXMgcnV0YXM6ICcrT2JqZWN0LmtleXMocmVzKS5sZW5ndGgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzKSk7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDxPYmplY3Qua2V5cyhyZXMpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1BpbnRhbmRvIGE6Jyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzW2ldKTsgLy8gXCJzcGVjaWVzXCJcbiAgICAgICAgICAgICAgICBpZihyZXNbaV0uZXN0YWRvdmlhamUgIT0gJ0ZJTkFMSVpBRE8nKXtcbiAgICAgICAgICAgICAgICAgICAgLy9yZXNbaV0uZXN0YWRvdmlhamU9J0VOIFRSQU5TSVRPJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5teUl0ZW1zLnB1c2gocmVzW2ldKTsgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgIHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9IFxuICAgIHB1YmxpYyBvbkl0ZW1UYXAoYXJncykge1xuICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBJdGVtVGFwcGVkOiBcIiArIGFyZ3MuaW5kZXgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25HZXREYXRhRXJyb3IoZXJyb3I6IFJlc3BvbnNlIHwgYW55KSB7XG4gICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGUgZXJyb3InKTtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICB0aXRsZTogJ0Vycm9yIGRlIGNvbmV4acOzbicsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkxvIHNlbnRpbW9zLCBodWJvIHVuIHByb2JsZW1hIGVuY29udHJhbmRvIGVsIHNlcnZpZG9yLCB2ZXJpZmljYSB0dSBjb25leGnDs24gYSBJbnRlcm5ldCBlIGludGVudGEgbnVldmFtZW50ZS5cIixcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ09rJ1xuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNhbGlyKCk6dm9pZHtcbiAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRCb29sZWFuKFwiYXV0aGVudGljYXRlZFwiLCBmYWxzZSk7XG4gICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3MucmVtb3ZlKFwibm9tYnJlVXN1YXJpb1wiKTtcbiAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5yZW1vdmUoXCJpZFVzdWFyaW9cIik7XG4gICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3MucmVtb3ZlKFwiZW1haWxVc3VhcmlvXCIpO1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2xvZ2luXCJdKTtcbiAgICB9XG4gICAgcmVzZXJ2YXIoKTogdm9pZCB7IFxuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWVcIl0pOyBcbiAgICB9XG59XG4iXX0=