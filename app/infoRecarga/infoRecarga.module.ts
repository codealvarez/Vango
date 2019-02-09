import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { InfoRecargaRoutingModule } from "./infoRecarga-routing.module";
import { InfoRecargaComponent } from "./infoRecarga.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        InfoRecargaRoutingModule
    ],
    declarations: [
        InfoRecargaComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class InfoRecargaModule { }
