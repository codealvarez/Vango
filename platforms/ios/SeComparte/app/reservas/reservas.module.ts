import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ReservasRoutingModule } from "./reservas-routing.module";
import { ReservasComponent } from "./reservas.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ReservasRoutingModule
    ],
    declarations: [
        ReservasComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ReservasModule { }
