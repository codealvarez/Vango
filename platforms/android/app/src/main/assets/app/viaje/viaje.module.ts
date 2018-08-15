import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ViajeRoutingModule } from "./viaje-routing.module";
import { ViajeComponent } from "./viaje.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ViajeRoutingModule
    ],
    declarations: [
        ViajeComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ViajeModule { }
