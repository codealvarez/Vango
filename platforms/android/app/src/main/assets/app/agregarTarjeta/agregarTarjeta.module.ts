import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms"

import { AgregarTarjetaRoutingModule } from "./agregarTarjeta-routing.module";
import { AgregarTarjetaComponent } from "./agregarTarjeta.component";

//Mask
import { MaskedTextFieldModule } from "nativescript-masked-text-field/angular";
 
@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        AgregarTarjetaRoutingModule,
        MaskedTextFieldModule
    ],
    declarations: [
        AgregarTarjetaComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AgregarTarjetaModule { }
