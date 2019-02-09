import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ReservarRoutingModule } from "./reservar-routing.module";
import { ReservarComponent } from "./reservar.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ReservarRoutingModule
    ],
    declarations: [
        ReservarComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ReservarModule { }
