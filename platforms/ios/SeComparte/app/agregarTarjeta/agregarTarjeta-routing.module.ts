import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AgregarTarjetaComponent } from "./agregarTarjeta.component";

const routes: Routes = [
    { path: "", component: AgregarTarjetaComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class AgregarTarjetaRoutingModule { }
