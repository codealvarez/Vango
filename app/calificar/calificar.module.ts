import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import {NativeScriptFormsModule} from "nativescript-angular/forms"

import { CalificarRoutingModule } from "./calificar-routing.module";
import { CalificarComponent } from "./calificar.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        CalificarRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        CalificarComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CalificarModule { }
