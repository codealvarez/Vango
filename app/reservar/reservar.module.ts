import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ReservarRoutingModule } from "./reservar-routing.module";
import { ReservarComponent } from "./reservar.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ReservarRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        ReservarComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ReservarModule { }
