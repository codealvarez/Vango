import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HistorialRoutingModule } from "./historial-routing.module";
import { HistorialComponent } from "./historial.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HistorialRoutingModule
    ],
    declarations: [
        HistorialComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HistorialModule { }
