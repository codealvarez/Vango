import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { RutaRoutingModule } from "./ruta-routing.module";
import { RutaComponent } from "./ruta.component";

@NgModule({
    imports: [
        RutaRoutingModule,
        NativeScriptCommonModule
    ],
    declarations: [
        RutaComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class RutaModule { }
