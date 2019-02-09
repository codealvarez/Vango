import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { RecuperarRoutingModule } from "./recuperar-routing.module";
import { RecuperarComponent } from "./recuperar.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        RecuperarRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        RecuperarComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class RecuperarModule { }
