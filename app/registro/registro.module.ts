import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { RegistroRoutingModule } from "./registro-routing.module";
import { RegistroComponent } from "./registro.component"; 

@NgModule({
    imports: [
        NativeScriptCommonModule,
        RegistroRoutingModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        RegistroComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class RegistroModule { }
