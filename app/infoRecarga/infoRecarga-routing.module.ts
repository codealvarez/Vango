import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { InfoRecargaComponent } from "./infoRecarga.component";

const routes: Routes = [
    { path: "", component: InfoRecargaComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class InfoRecargaRoutingModule { }
