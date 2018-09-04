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
* { path: "historial", loadChildren: "./historial/historial.module#HistorialModule" }
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
var HistorialComponent = /** @class */ (function () {
    function HistorialComponent(routerExtensions, myService) {
        this.routerExtensions = routerExtensions;
        this.myService = myService;
        this.myItems = new observableArray.ObservableArray([]);
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }
    HistorialComponent.prototype.onDrawerButtonTap = function () {
        var sideDrawer = app.getRootView();
        sideDrawer.showDrawer();
    };
    HistorialComponent.prototype.ngOnInit = function () {
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
                if (res[i].estadoviaje == 'FINALIZADO') {
                    _this.myItems.push(res[i]);
                }
            }
        }, function (error) {
            loader.hide();
            _this.onGetDataError(error);
        });
    };
    HistorialComponent.prototype.onItemTap = function (args) {
        console.log("------------------------ ItemTapped: " + args.index);
    };
    HistorialComponent.prototype.onGetDataError = function (error) {
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
    HistorialComponent.prototype.salir = function () {
        ApplicationSettings.setBoolean("authenticated", false);
        ApplicationSettings.remove("nombreUsuario");
        ApplicationSettings.remove("idUsuario");
        ApplicationSettings.remove("emailUsuario");
        this.routerExtensions.navigate(["/login"]);
    };
    HistorialComponent.prototype.reservar = function () {
        this.routerExtensions.navigate(["/home"]);
    };
    HistorialComponent = __decorate([
        core_1.Component({
            selector: "Historial",
            moduleId: module.id,
            templateUrl: "./historial.component.html"
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions, ws_service_1.WebService])
    ], HistorialComponent);
    return HistorialComponent;
}());
exports.HistorialComponent = HistorialComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWFsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhpc3RvcmlhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkU7QUFFM0Usc0RBQTZEO0FBQzdELDRDQUEyQztBQUMzQyxvQ0FBc0M7QUFDdEMsaUZBQWdFO0FBQ2hFLDBEQUE0RDtBQUM1RCx3RUFBMEU7QUFDMUUsUUFBUTtBQUNSLGlDQUFtQztBQUduQzs7Ozs7OERBSzhEO0FBQzlEO0lBQ0ksa0JBQW1CLE9BQWUsRUFBUyxNQUFjLEVBQVMsVUFBaUIsRUFBUyxTQUFpQixFQUFTLEtBQVksRUFBUyxTQUFnQixFQUFTLE9BQWMsRUFBUyxXQUFrQixFQUFRLFVBQWlCO1FBQW5OLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBTztRQUFTLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFPO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBTztRQUFTLFlBQU8sR0FBUCxPQUFPLENBQU87UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBTztRQUFRLGVBQVUsR0FBVixVQUFVLENBQU87SUFBSSxDQUFDO0lBQy9PLGVBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUNELElBQUksTUFBTSxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztBQU1wQztJQUlJLDRCQUFvQixnQkFBa0MsRUFBUyxTQUFxQjtRQUFoRSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBWTtRQUY3RSxZQUFPLEdBQUcsSUFBSSxlQUFlLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBR3JEOztzRUFFOEQ7SUFDbEUsQ0FBQztJQUNELDhDQUFpQixHQUFqQjtRQUNJLElBQU0sVUFBVSxHQUFrQixHQUFHLENBQUMsV0FBVyxF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Z0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsNEJBQTRCO1NBQzVDLENBQUM7eUNBS3dDLHlCQUFnQixFQUFvQix1QkFBVTtPQUozRSxrQkFBa0IsQ0FrRTlCO0lBQUQseUJBQUM7Q0FBQSxBQWxFRCxJQWtFQztBQWxFWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFdlYlNlcnZpY2UgfSBmcm9tIFwiLi4vd3Muc2VydmljZVwiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0IHtMb2FkaW5nSW5kaWNhdG9yfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7XG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0ICogYXMgb2JzZXJ2YWJsZUFycmF5IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuLy9EcmF3ZXJcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwiYXBwbGljYXRpb25cIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXJcIjtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiogQmVmb3JlIHlvdSBjYW4gbmF2aWdhdGUgdG8gdGhpcyBwYWdlIGZyb20geW91ciBhcHAsIHlvdSBuZWVkIHRvIHJlZmVyZW5jZSB0aGlzIHBhZ2UncyBtb2R1bGUgaW4gdGhlXG4qIGdsb2JhbCBhcHAgcm91dGVyIG1vZHVsZS4gQWRkIHRoZSBmb2xsb3dpbmcgb2JqZWN0IHRvIHRoZSBnbG9iYWwgYXJyYXkgb2Ygcm91dGVzOlxuKiB7IHBhdGg6IFwiaGlzdG9yaWFsXCIsIGxvYWRDaGlsZHJlbjogXCIuL2hpc3RvcmlhbC9oaXN0b3JpYWwubW9kdWxlI0hpc3RvcmlhbE1vZHVsZVwiIH1cbiogTm90ZSB0aGF0IHRoaXMgc2ltcGx5IHBvaW50cyB0aGUgcGF0aCB0byB0aGUgcGFnZSBtb2R1bGUgZmlsZS4gSWYgeW91IG1vdmUgdGhlIHBhZ2UsIHlvdSBuZWVkIHRvIHVwZGF0ZSB0aGUgcm91dGUgdG9vLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNsYXNzIERhdGFJdGVtIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaWR2aWFqZTogc3RyaW5nLCBwdWJsaWMgaWRydXRhOiBzdHJpbmcsIHB1YmxpYyBub21icmVydXRhOnN0cmluZywgcHVibGljIGNvbmR1Y3Rvcjogc3RyaW5nLCBwdWJsaWMgcGxhY2E6c3RyaW5nLCBwdWJsaWMgY2FwYWNpZGFkOm51bWJlciwgcHVibGljIHBhc2FqZXM6bnVtYmVyLCBwdWJsaWMgZmVjaGFfdmlhamU6bnVtYmVyLHB1YmxpYyBob3JhX3ZpYWplOm51bWJlcikgeyB9ICAgXG59XG5sZXQgbG9hZGVyID0gbmV3IExvYWRpbmdJbmRpY2F0b3IoKTtcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIkhpc3RvcmlhbFwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9oaXN0b3JpYWwuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBIaXN0b3JpYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHByaXZhdGUgX21haW5Db250ZW50VGV4dDogc3RyaW5nO1xuICAgIHB1YmxpYyBteUl0ZW1zID0gbmV3IG9ic2VydmFibGVBcnJheS5PYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgIHByaXZhdGUgY291bnRlcjogbnVtYmVyO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxwcml2YXRlIG15U2VydmljZTogV2ViU2VydmljZSkge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFVzZSB0aGUgY29uc3RydWN0b3IgdG8gaW5qZWN0IGFwcCBzZXJ2aWNlcyB0aGF0IHlvdSBuZWVkIGluIHRoaXMgY29tcG9uZW50LlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIH1cbiAgICBvbkRyYXdlckJ1dHRvblRhcCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc2lkZURyYXdlciA9IDxSYWRTaWRlRHJhd2VyPmFwcC5nZXRSb290VmlldygpO1xuICAgICAgICBzaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcbiAgICB9XG4gICAgXG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBVc2UgdGhlIFwibmdPbkluaXRcIiBoYW5kbGVyIHRvIGluaXRpYWxpemUgZGF0YSBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgICAgIGxldCBpZFVzdWFyaW8gPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnaWRVc3VhcmlvJyk7XG4gICAgICAgIGxvYWRlci5zaG93KCk7XG4gICAgICAgIHRoaXMubXlTZXJ2aWNlLmdldFJ1dGFzQXNpZ25hZGFzKGlkVXN1YXJpbykuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlIGxhcyBydXRhczogJytPYmplY3Qua2V5cyhyZXMpLmxlbmd0aCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXMpKTtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPE9iamVjdC5rZXlzKHJlcykubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUGludGFuZG8gYTonKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNbaV0pOyAvLyBcInNwZWNpZXNcIlxuICAgICAgICAgICAgICAgIGlmKHJlc1tpXS5lc3RhZG92aWFqZSA9PSAnRklOQUxJWkFETycpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm15SXRlbXMucHVzaChyZXNbaV0pOyAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICAgICAgdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0gXG4gICAgcHVibGljIG9uSXRlbVRhcChhcmdzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEl0ZW1UYXBwZWQ6IFwiICsgYXJncy5pbmRleCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkdldERhdGFFcnJvcihlcnJvcjogUmVzcG9uc2UgfCBhbnkpIHtcbiAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZSBlcnJvcicpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiAnRXJyb3IgZGUgY29uZXhpw7NuJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiTG8gc2VudGltb3MsIGh1Ym8gdW4gcHJvYmxlbWEgZW5jb250cmFuZG8gZWwgc2Vydmlkb3IsIHZlcmlmaWNhIHR1IGNvbmV4acOzbiBhIEludGVybmV0IGUgaW50ZW50YSBudWV2YW1lbnRlLlwiLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2FsaXIoKTp2b2lke1xuICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIGZhbHNlKTtcbiAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5yZW1vdmUoXCJub21icmVVc3VhcmlvXCIpO1xuICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnJlbW92ZShcImlkVXN1YXJpb1wiKTtcbiAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5yZW1vdmUoXCJlbWFpbFVzdWFyaW9cIik7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvbG9naW5cIl0pO1xuICAgIH1cbiAgICByZXNlcnZhcigpOiB2b2lkIHsgXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZVwiXSk7IFxuICAgIH1cbn1cbiJdfQ==