"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var infoRecarga_routing_module_1 = require("./infoRecarga-routing.module");
var infoRecarga_component_1 = require("./infoRecarga.component");
var InfoRecargaModule = /** @class */ (function () {
    function InfoRecargaModule() {
    }
    InfoRecargaModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                infoRecarga_routing_module_1.InfoRecargaRoutingModule
            ],
            declarations: [
                infoRecarga_component_1.InfoRecargaComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], InfoRecargaModule);
    return InfoRecargaModule;
}());
exports.InfoRecargaModule = InfoRecargaModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb1JlY2FyZ2EubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5mb1JlY2FyZ2EubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUV2RSwyRUFBd0U7QUFDeEUsaUVBQStEO0FBYy9EO0lBQUE7SUFBaUMsQ0FBQztJQUFyQixpQkFBaUI7UUFaN0IsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLGlDQUF3QjtnQkFDeEIscURBQXdCO2FBQzNCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLDRDQUFvQjthQUN2QjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csaUJBQWlCLENBQUk7SUFBRCx3QkFBQztDQUFBLEFBQWxDLElBQWtDO0FBQXJCLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9jb21tb25cIjtcblxuaW1wb3J0IHsgSW5mb1JlY2FyZ2FSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vaW5mb1JlY2FyZ2Etcm91dGluZy5tb2R1bGVcIjtcbmltcG9ydCB7IEluZm9SZWNhcmdhQ29tcG9uZW50IH0gZnJvbSBcIi4vaW5mb1JlY2FyZ2EuY29tcG9uZW50XCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUsXG4gICAgICAgIEluZm9SZWNhcmdhUm91dGluZ01vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEluZm9SZWNhcmdhQ29tcG9uZW50XG4gICAgXSxcbiAgICBzY2hlbWFzOiBbXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEluZm9SZWNhcmdhTW9kdWxlIHsgfVxuIl19