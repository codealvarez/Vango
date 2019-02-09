import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { TerminosRoutingModule } from "./terminos-routing.module";
import { TerminosComponent } from "./terminos.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        TerminosRoutingModule
    ],
    declarations: [
        TerminosComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TerminosModule { }
