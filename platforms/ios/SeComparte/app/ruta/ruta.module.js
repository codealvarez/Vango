"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var ruta_routing_module_1 = require("./ruta-routing.module");
var ruta_component_1 = require("./ruta.component");
var RutaModule = /** @class */ (function () {
    function RutaModule() {
    }
    RutaModule = __decorate([
        core_1.NgModule({
            imports: [
                ruta_routing_module_1.RutaRoutingModule,
                common_1.NativeScriptCommonModule
            ],
            declarations: [
                ruta_component_1.RutaComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], RutaModule);
    return RutaModule;
}());
exports.RutaModule = RutaModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnV0YS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJydXRhLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUMzRCxzREFBdUU7QUFFdkUsNkRBQTBEO0FBQzFELG1EQUFpRDtBQWNqRDtJQUFBO0lBQTBCLENBQUM7SUFBZCxVQUFVO1FBWnRCLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCx1Q0FBaUI7Z0JBQ2pCLGlDQUF3QjthQUMzQjtZQUNELFlBQVksRUFBRTtnQkFDViw4QkFBYTthQUNoQjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csVUFBVSxDQUFJO0lBQUQsaUJBQUM7Q0FBQSxBQUEzQixJQUEyQjtBQUFkLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vblwiO1xuXG5pbXBvcnQgeyBSdXRhUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL3J1dGEtcm91dGluZy5tb2R1bGVcIjtcbmltcG9ydCB7IFJ1dGFDb21wb25lbnQgfSBmcm9tIFwiLi9ydXRhLmNvbXBvbmVudFwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgUnV0YVJvdXRpbmdNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFJ1dGFDb21wb25lbnRcbiAgICBdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgUnV0YU1vZHVsZSB7IH1cbiJdfQ==