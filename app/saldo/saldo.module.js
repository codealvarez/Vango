"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var saldo_routing_module_1 = require("./saldo-routing.module");
var saldo_component_1 = require("./saldo.component");
var SaldoModule = /** @class */ (function () {
    function SaldoModule() {
    }
    SaldoModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                saldo_routing_module_1.SaldoRoutingModule
            ],
            declarations: [
                saldo_component_1.SaldoComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], SaldoModule);
    return SaldoModule;
}());
exports.SaldoModule = SaldoModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZG8ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2FsZG8ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUV2RSwrREFBNEQ7QUFDNUQscURBQW1EO0FBY25EO0lBQUE7SUFBMkIsQ0FBQztJQUFmLFdBQVc7UUFadkIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLGlDQUF3QjtnQkFDeEIseUNBQWtCO2FBQ3JCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLGdDQUFjO2FBQ2pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7T0FDVyxXQUFXLENBQUk7SUFBRCxrQkFBQztDQUFBLEFBQTVCLElBQTRCO0FBQWYsa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uXCI7XG5cbmltcG9ydCB7IFNhbGRvUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL3NhbGRvLXJvdXRpbmcubW9kdWxlXCI7XG5pbXBvcnQgeyBTYWxkb0NvbXBvbmVudCB9IGZyb20gXCIuL3NhbGRvLmNvbXBvbmVudFwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxuICAgICAgICBTYWxkb1JvdXRpbmdNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBTYWxkb0NvbXBvbmVudFxuICAgIF0sXG4gICAgc2NoZW1hczogW1xuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBTYWxkb01vZHVsZSB7IH1cbiJdfQ==