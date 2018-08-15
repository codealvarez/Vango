import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Page } from "ui/page";
import {RouterExtensions} from "nativescript-angular/router";
import { WebService } from "../ws.service";
import * as dialogs from "ui/dialogs";
import {LoadingIndicator} from "nativescript-loading-indicator";
import * as ApplicationSettings from "application-settings";
import * as observableArray from "tns-core-modules/data/observable-array";
//Drawer
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";


/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "reservas", loadChildren: "./reservas/reservas.module#ReservasModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
class DataItem {
    constructor(public idviaje: string, public idruta: string, public nombreruta:string, public conductor: string, public placa:string, public capacidad:number, public pasajes:number, public fecha_viaje:number,public hora_viaje:number) { }   
}
let loader = new LoadingIndicator();
@Component({
    selector: "Reservas",
    moduleId: module.id,
    templateUrl: "./reservas.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservasComponent implements OnInit {
    private _mainContentText: string;
    public myItems = new observableArray.ObservableArray([]);
    private counter: number;
    constructor(private routerExtensions: RouterExtensions,private myService: WebService) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
        let idUsuario = ApplicationSettings.getString('idUsuario');
        loader.show();
        this.myService.getRutasAsignadas(idUsuario).subscribe((res) => {
            loader.hide();
            console.log('Respuesta de las rutas: '+Object.keys(res).length);
            console.log(JSON.stringify(res));
            for(let i = 0; i <Object.keys(res).length; i++) {
                console.log('Pintando a:');
                console.log(res[i]); // "species"

                this.myItems.push(res[i]); 
            }

            
        }, (error) => {
            loader.hide();
            this.onGetDataError(error);
        });
    } 
    public onItemTap(args) {
        console.log("------------------------ ItemTapped: " + args.index);
    }

    private onGetDataError(error: Response | any) {
        loader.hide();
        console.log('Respuesta de error');
        console.log(JSON.stringify(error));
        dialogs.alert({
            title: 'Error de conexión',
            message: "Lo sentimos, hubo un problema encontrando el servidor, verifica tu conexión a Internet e intenta nuevamente.",
            okButtonText: 'Ok'
        }).then(() => {
            console.log("Dialog closed!");
            
        });
    }
    salir():void{
        ApplicationSettings.setBoolean("authenticated", false);
        ApplicationSettings.remove("nombreUsuario");
        ApplicationSettings.remove("idUsuario");
        ApplicationSettings.remove("emailUsuario");
        this.routerExtensions.navigate(["/login"]);
    }
    reservar(): void { 
        this.routerExtensions.navigate(["/home"]); 
    }
}
