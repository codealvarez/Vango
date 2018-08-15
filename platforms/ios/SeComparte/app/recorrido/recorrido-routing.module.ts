import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { RecorridoComponent } from "./recorrido.component";

const routes: Routes = [
    { path: "", component: RecorridoComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class RecorridoRoutingModule { }
