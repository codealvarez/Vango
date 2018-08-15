import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { DisponiblesRoutingModule } from "./disponibles-routing.module";
import { DisponiblesComponent } from "./disponibles.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        DisponiblesRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        DisponiblesComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class DisponiblesModule { }
