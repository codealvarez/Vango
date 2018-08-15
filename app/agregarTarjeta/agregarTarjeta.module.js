"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var forms_1 = require("nativescript-angular/forms");
var agregarTarjeta_routing_module_1 = require("./agregarTarjeta-routing.module");
var agregarTarjeta_component_1 = require("./agregarTarjeta.component");
//Mask
var angular_1 = require("nativescript-masked-text-field/angular");
var AgregarTarjetaModule = /** @class */ (function () {
    function AgregarTarjetaModule() {
    }
    AgregarTarjetaModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                forms_1.NativeScriptFormsModule,
                agregarTarjeta_routing_module_1.AgregarTarjetaRoutingModule,
                angular_1.MaskedTextFieldModule
            ],
            declarations: [
                agregarTarjeta_component_1.AgregarTarjetaComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], AgregarTarjetaModule);
    return AgregarTarjetaModule;
}());
exports.AgregarTarjetaModule = AgregarTarjetaModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdyZWdhclRhcmpldGEubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWdyZWdhclRhcmpldGEubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUN2RSxvREFBb0U7QUFFcEUsaUZBQThFO0FBQzlFLHVFQUFxRTtBQUVyRSxNQUFNO0FBQ04sa0VBQStFO0FBZ0IvRTtJQUFBO0lBQW9DLENBQUM7SUFBeEIsb0JBQW9CO1FBZGhDLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxpQ0FBd0I7Z0JBQ3hCLCtCQUF1QjtnQkFDdkIsMkRBQTJCO2dCQUMzQiwrQkFBcUI7YUFDeEI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1Ysa0RBQXVCO2FBQzFCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7T0FDVyxvQkFBb0IsQ0FBSTtJQUFELDJCQUFDO0NBQUEsQUFBckMsSUFBcUM7QUFBeEIsb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIlxuXG5pbXBvcnQgeyBBZ3JlZ2FyVGFyamV0YVJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hZ3JlZ2FyVGFyamV0YS1yb3V0aW5nLm1vZHVsZVwiO1xuaW1wb3J0IHsgQWdyZWdhclRhcmpldGFDb21wb25lbnQgfSBmcm9tIFwiLi9hZ3JlZ2FyVGFyamV0YS5jb21wb25lbnRcIjtcblxuLy9NYXNrXG5pbXBvcnQgeyBNYXNrZWRUZXh0RmllbGRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1hc2tlZC10ZXh0LWZpZWxkL2FuZ3VsYXJcIjtcbiBcbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuICAgICAgICBBZ3JlZ2FyVGFyamV0YVJvdXRpbmdNb2R1bGUsXG4gICAgICAgIE1hc2tlZFRleHRGaWVsZE1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEFncmVnYXJUYXJqZXRhQ29tcG9uZW50XG4gICAgXSxcbiAgICBzY2hlbWFzOiBbXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEFncmVnYXJUYXJqZXRhTW9kdWxlIHsgfVxuIl19