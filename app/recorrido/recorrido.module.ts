import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { RecorridoRoutingModule } from "./recorrido-routing.module";
import { RecorridoComponent } from "./recorrido.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        RecorridoRoutingModule
    ],
    declarations: [
        RecorridoComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class RecorridoModule { }
