"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var forms_1 = require("nativescript-angular/forms");
var angular_1 = require("nativescript-grid-view/angular");
var horarios_routing_module_1 = require("./horarios-routing.module");
var horarios_component_1 = require("./horarios.component");
var HorariosModule = /** @class */ (function () {
    function HorariosModule() {
    }
    HorariosModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                horarios_routing_module_1.HorariosRoutingModule,
                forms_1.NativeScriptFormsModule,
                angular_1.GridViewModule
            ],
            declarations: [
                horarios_component_1.HorariosComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], HorariosModule);
    return HorariosModule;
}());
exports.HorariosModule = HorariosModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9yYXJpb3MubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9yYXJpb3MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUN2RSxvREFBcUU7QUFDckUsMERBQWdFO0FBRWhFLHFFQUFrRTtBQUNsRSwyREFBeUQ7QUFnQnpEO0lBQUE7SUFBOEIsQ0FBQztJQUFsQixjQUFjO1FBZDFCLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxpQ0FBd0I7Z0JBQ3hCLCtDQUFxQjtnQkFDckIsK0JBQXVCO2dCQUN2Qix3QkFBYzthQUNqQjtZQUNELFlBQVksRUFBRTtnQkFDVixzQ0FBaUI7YUFDcEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztPQUNXLGNBQWMsQ0FBSTtJQUFELHFCQUFDO0NBQUEsQUFBL0IsSUFBK0I7QUFBbEIsd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgR3JpZFZpZXdNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtZ3JpZC12aWV3L2FuZ3VsYXInO1xuXG5pbXBvcnQgeyBIb3Jhcmlvc1JvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9ob3Jhcmlvcy1yb3V0aW5nLm1vZHVsZVwiO1xuaW1wb3J0IHsgSG9yYXJpb3NDb21wb25lbnQgfSBmcm9tIFwiLi9ob3Jhcmlvcy5jb21wb25lbnRcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSxcbiAgICAgICAgSG9yYXJpb3NSb3V0aW5nTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICAgICAgR3JpZFZpZXdNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBIb3Jhcmlvc0NvbXBvbmVudFxuICAgIF0sXG4gICAgc2NoZW1hczogW1xuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBIb3Jhcmlvc01vZHVsZSB7IH1cbiJdfQ==