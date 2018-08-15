import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { TarjetasRoutingModule } from "./tarjetas-routing.module";
import { TarjetasComponent } from "./tarjetas.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        TarjetasRoutingModule
    ],
    declarations: [
        TarjetasComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TarjetasModule { }
