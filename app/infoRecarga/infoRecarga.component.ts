import { Component, OnInit } from "@angular/core";
import * as ApplicationSettings from "application-settings";
import {RouterExtensions} from "nativescript-angular/router";
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "infoRecarga", loadChildren: "./infoRecarga/infoRecarga.module#InfoRecargaModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "InfoRecarga",
    moduleId: module.id,
    templateUrl: "./infoRecarga.component.html"
})
export class InfoRecargaComponent implements OnInit {
    idvango = ApplicationSettings.getString('idvango');
    constructor(private routerExtensions: RouterExtensions) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    }
    irAtras() {
        this.routerExtensions.back();
    }
}
