import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SaldoRoutingModule } from "./saldo-routing.module";
import { SaldoComponent } from "./saldo.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SaldoRoutingModule
    ],
    declarations: [
        SaldoComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SaldoModule { }
