import { Component, OnInit, Input, ChangeDetectionStrategy } from "@angular/core";
import {RouterExtensions} from "nativescript-angular/router";
import {LoadingIndicator} from "nativescript-loading-indicator";
import { WebService } from "../ws.service";
import * as dialogs from "ui/dialogs";
import * as ApplicationSettings from "application-settings";
import * as observableArray from "tns-core-modules/data/observable-array";
import { ActivatedRoute } from "@angular/router";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "horarios", loadChildren: "./horarios/horarios.module#HorariosModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/


var loader = new LoadingIndicator();
@Component({
    selector: "Horarios",
    moduleId: module.id,
    templateUrl: "./horarios.component.html"
})
export class HorariosComponent implements OnInit {
    public myItems = new observableArray.ObservableArray([]);
    public arrayItems= new observableArray.ObservableArray([]);
    private counter: number;
    public searchPhrase:string;
    public idruta: number;
    public nombreRuta:string;
    constructor(private routerExtensions: RouterExtensions,private myService: WebService,private route: ActivatedRoute) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
        console.log(this.route.params);
        this.route.params
          .forEach((params) => { 
              console.log('Parametros de url');
              this.idruta = +params["idruta"];
              this.nombreRuta = params["nombreruta"];
              console.log(this.idruta+' - '+this.nombreRuta);
              

          });
    }
    /*reservar(idruta,precio,nombreruta){
        console.log('Qué pasó?');
        //this.routerExtensions.navigate(["/home"]);
        //[nsRouterLink]="['/ruta/'+item.idruta+'/'+item.idviaje+'/'+item.precio+'/'+item.nombreruta]"
    }*/
    irAtras() {
        this.routerExtensions.back();
    }

    public onItemTap(args) {
        console.log(args);
        console.log("------------------------ ItemTapped: " + args.index);
    }

    ngOnInit(): void {
        let idRuta = this.idruta;
        loader.show();
        this.myService.getViajesDisponibles(idRuta).subscribe((res) => {
            loader.hide();
            console.log('Respuesta de los viajes: '+Object.keys(res).length);
            console.log(JSON.stringify(res));
            for(let i = 0; i <Object.keys(res).length; i++) {
                this.arrayItems.push(res[i]); 
                this.myItems.push(res[i]); 
            }

            
        }, (error) => {
            loader.hide();
            this.onGetDataError(error);
        });
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

    
}
