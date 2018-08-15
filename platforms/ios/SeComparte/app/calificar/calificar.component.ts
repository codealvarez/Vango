import { Component, OnInit } from "@angular/core";
import { registerElement } from 'nativescript-angular/element-registry';
import {RouterExtensions} from "nativescript-angular/router";
import * as dialogs from "ui/dialogs";
registerElement('StarRating', () => require('nativescript-star-ratings').StarRating);

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "calificar", loadChildren: "./calificar/calificar.module#CalificarModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "Calificar",
    moduleId: module.id,
    templateUrl: "./calificar.component.html"
})
export class CalificarComponent implements OnInit {
    value:number=0;
    value2:number=0;
    max:number=5;
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
    calificar(){
        let model= this;
        dialogs.alert({
            title: "Calificación exitosa",
            message: "Tu viaje fue calificado exitosamente"+model.value,
            okButtonText: "Ok"
        }).then(() => {
            console.log("Dialog closed!");
        });
    }
    irAtras() {
        this.routerExtensions.back();
    }
}
