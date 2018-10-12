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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Y7QUFDbEYsZ0ZBQThFO0FBQzlFLDhEQUFvRjtBQUdwRiwyREFBd0Q7QUFDeEQsaURBQStDO0FBQy9DLHNDQUEwQztBQUUxQyxxQ0FBcUM7QUFDckMsZ0VBQWdGO0FBQ2hGLCtDQUErQztBQUMvQywyQ0FBMEM7QUFDMUMsMkJBQTJCO0FBQzNCLG1DQUFxQztBQUVyQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNuQixXQUFXLENBQUMsYUFBYSxDQUFDLHlDQUF5QyxDQUFDLENBQUM7QUFDdkUsQ0FBQztBQUVELDBDQUFxRDtBQUNyRCxpREFBa0Q7QUFFbEQsMkJBQWtCLENBQUMsWUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBdUJ0QztJQUFBO0lBQXlCLENBQUM7SUFBYixTQUFTO1FBckJyQixlQUFRLENBQUM7WUFDTixTQUFTLEVBQUU7Z0JBQ1AsNEJBQVk7YUFDZjtZQUNELE9BQU8sRUFBRTtnQkFDTCxxQ0FBZ0I7Z0JBQ2hCLHdDQUFrQjtnQkFDbEIsd0NBQThCO2dCQUM5QiwwQ0FBNEI7YUFDL0I7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsNEJBQVk7YUFDZjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7WUFDRCxTQUFTLEVBQUM7Z0JBQ04sdUJBQVU7Z0JBQ1YsRUFBRSxPQUFPLEVBQUUsZ0JBQVMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFO2FBQzVDO1NBQ0osQ0FBQztPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5cblxuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC1yb3V0aW5nLm1vZHVsZVwiO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTE9DQUxFX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8vSW1wb3J0YXIgSFRUUENsaWVudCBwYXJhIHVzYXIgZWwgV1NcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cC1jbGllbnRcIjtcbi8vSW1wb3J0YXIgc2VydmljaW8gcGFyYSBsbGFtYWRhcyBhbCBXZWJTZXJ2aWNlXG5pbXBvcnQgeyBXZWJTZXJ2aWNlIH0gZnJvbSBcIi4vd3Muc2VydmljZVwiO1xuLy9Qb2RlciB1c2FyIGVsIG1hcGEgZW4gaU9TXG5pbXBvcnQgKiBhcyBwbGF0Zm9ybSBmcm9tIFwicGxhdGZvcm1cIjtcbmRlY2xhcmUgdmFyIEdNU1NlcnZpY2VzOiBhbnk7XG5pZiAocGxhdGZvcm0uaXNJT1MpIHsgXG4gIEdNU1NlcnZpY2VzLnByb3ZpZGVBUElLZXkoXCJBSXphU3lCdzEzVEFZc0dDa0pLaEFSang5RjcweW1uSXRfT25SWFVcIik7XG59IFxuXG5pbXBvcnQgeyByZWdpc3RlckxvY2FsZURhdGEgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IGxvY2FsZUZyIGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9sb2NhbGVzL2VzJztcblxucmVnaXN0ZXJMb2NhbGVEYXRhKGxvY2FsZUZyLCAnZXMtQ08nKTtcblxuQE5nTW9kdWxlKHtcbiAgICBib290c3RyYXA6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIEFwcFJvdXRpbmdNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50XG4gICAgXSxcbiAgICBzY2hlbWFzOiBbXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgICBdLFxuICAgIHByb3ZpZGVyczpbXG4gICAgICAgIFdlYlNlcnZpY2UsXG4gICAgICAgIHsgcHJvdmlkZTogTE9DQUxFX0lELCB1c2VWYWx1ZTogXCJlcy1DT1wiIH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cbiJdfQ==