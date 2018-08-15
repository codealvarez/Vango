import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { DisponiblesComponent } from "./disponibles.component";

const routes: Routes = [
    { path: "", component: DisponiblesComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class DisponiblesRoutingModule { }
