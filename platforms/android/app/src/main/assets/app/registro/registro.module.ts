import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms"

import { RegistroRoutingModule } from "./registro-routing.module";
import { RegistroComponent } from "./registro.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        RegistroRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        RegistroComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class RegistroModule { }
