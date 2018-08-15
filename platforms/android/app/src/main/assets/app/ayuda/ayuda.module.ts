import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms"

import { AyudaRoutingModule } from "./ayuda-routing.module";
import { AyudaComponent } from "./ayuda.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AyudaRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AyudaComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AyudaModule { }
