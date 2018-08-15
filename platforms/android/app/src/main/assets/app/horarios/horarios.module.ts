import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { HorariosRoutingModule } from "./horarios-routing.module";
import { HorariosComponent } from "./horarios.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HorariosRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        HorariosComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HorariosModule { }
