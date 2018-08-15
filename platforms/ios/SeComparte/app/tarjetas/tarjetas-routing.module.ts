import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { TarjetasComponent } from "./tarjetas.component";

const routes: Routes = [
    { path: "", component: TarjetasComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class TarjetasRoutingModule { }
