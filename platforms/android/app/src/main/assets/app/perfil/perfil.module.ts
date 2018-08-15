import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms"

import { PerfilRoutingModule } from "./perfil-routing.module";
import { PerfilComponent } from "./perfil.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PerfilRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        PerfilComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PerfilModule { }
