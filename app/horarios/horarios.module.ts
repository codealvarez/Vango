import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { GridViewModule } from 'nativescript-grid-view/angular';

import { HorariosRoutingModule } from "./horarios-routing.module";
import { HorariosComponent } from "./horarios.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HorariosRoutingModule,
        NativeScriptFormsModule,
        GridViewModule
    ],
    declarations: [
        HorariosComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HorariosModule { }
