"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var core_2 = require("@angular/core");
//Importar HTTPClient para usar el WS
var http_client_1 = require("nativescript-angular/http-client");
//Importar servicio para llamadas al WebService
var ws_service_1 = require("./ws.service");
//Poder usar el mapa en iOS
var platform = require("platform");
if (platform.isIOS) {
    GMSServices.provideAPIKey("AIzaSyBw13TAYsGCkJKhARjx9F70ymnIt_OnRXU");
}
var common_1 = require("@angular/common");
var es_1 = require("@angular/common/locales/es");
common_1.registerLocaleData(es_1.default, 'es-CO');
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            imports: [
                app_routing_module_1.AppRoutingModule,
                nativescript_module_1.NativeScriptModule,
                angular_1.NativeScriptUISideDrawerModule,
                http_client_1.NativeScriptHttpClientModule
            ],
            declarations: [
                app_component_1.AppComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ],
            providers: [
                ws_service_1.WebService,
                { provide: core_2.LOCALE_ID, useValue: "es-CO" }
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Y7QUFDbEYsZ0ZBQThFO0FBQzlFLDhEQUFvRjtBQUdwRiwyREFBd0Q7QUFDeEQsaURBQStDO0FBQy9DLHNDQUEwQztBQUUxQyxxQ0FBcUM7QUFDckMsZ0VBQWdGO0FBQ2hGLCtDQUErQztBQUMvQywyQ0FBMEM7QUFDMUMsMkJBQTJCO0FBQzNCLG1DQUFxQztBQUVyQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7SUFDbEIsV0FBVyxDQUFDLGFBQWEsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0NBQ3RFO0FBRUQsMENBQXFEO0FBQ3JELGlEQUFrRDtBQUVsRCwyQkFBa0IsQ0FBQyxZQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7QUF1QnRDO0lBQUE7SUFBeUIsQ0FBQztJQUFiLFNBQVM7UUFyQnJCLGVBQVEsQ0FBQztZQUNOLFNBQVMsRUFBRTtnQkFDUCw0QkFBWTthQUNmO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHFDQUFnQjtnQkFDaEIsd0NBQWtCO2dCQUNsQix3Q0FBOEI7Z0JBQzlCLDBDQUE0QjthQUMvQjtZQUNELFlBQVksRUFBRTtnQkFDViw0QkFBWTthQUNmO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtZQUNELFNBQVMsRUFBQztnQkFDTix1QkFBVTtnQkFDVixFQUFFLE9BQU8sRUFBRSxnQkFBUyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUU7YUFDNUM7U0FDSixDQUFDO09BQ1csU0FBUyxDQUFJO0lBQUQsZ0JBQUM7Q0FBQSxBQUExQixJQUEwQjtBQUFiLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5nTW9kdWxlRmFjdG9yeUxvYWRlciwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcblxuXG5pbXBvcnQgeyBBcHBSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vYXBwLXJvdXRpbmcubW9kdWxlXCI7XG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBMT0NBTEVfSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLy9JbXBvcnRhciBIVFRQQ2xpZW50IHBhcmEgdXNhciBlbCBXU1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cENsaWVudE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwLWNsaWVudFwiO1xuLy9JbXBvcnRhciBzZXJ2aWNpbyBwYXJhIGxsYW1hZGFzIGFsIFdlYlNlcnZpY2VcbmltcG9ydCB7IFdlYlNlcnZpY2UgfSBmcm9tIFwiLi93cy5zZXJ2aWNlXCI7XG4vL1BvZGVyIHVzYXIgZWwgbWFwYSBlbiBpT1NcbmltcG9ydCAqIGFzIHBsYXRmb3JtIGZyb20gXCJwbGF0Zm9ybVwiO1xuZGVjbGFyZSB2YXIgR01TU2VydmljZXM6IGFueTtcbmlmIChwbGF0Zm9ybS5pc0lPUykgeyBcbiAgR01TU2VydmljZXMucHJvdmlkZUFQSUtleShcIkFJemFTeUJ3MTNUQVlzR0NrSktoQVJqeDlGNzB5bW5JdF9PblJYVVwiKTtcbn0gXG5cbmltcG9ydCB7IHJlZ2lzdGVyTG9jYWxlRGF0YSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgbG9jYWxlRnIgZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2xvY2FsZXMvZXMnO1xuXG5yZWdpc3RlckxvY2FsZURhdGEobG9jYWxlRnIsICdlcy1DTycpO1xuXG5ATmdNb2R1bGUoe1xuICAgIGJvb3RzdHJhcDogW1xuICAgICAgICBBcHBDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQXBwUm91dGluZ01vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBBcHBDb21wb25lbnRcbiAgICBdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOltcbiAgICAgICAgV2ViU2VydmljZSxcbiAgICAgICAgeyBwcm92aWRlOiBMT0NBTEVfSUQsIHVzZVZhbHVlOiBcImVzLUNPXCIgfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxuIl19