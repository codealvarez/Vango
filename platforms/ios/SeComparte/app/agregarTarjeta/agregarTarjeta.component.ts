import { Component, OnInit } from "@angular/core";
import {RouterExtensions} from "nativescript-angular/router";
import { WebService } from "../ws.service";
import * as ApplicationSettings from "application-settings";
import * as dialogs from "ui/dialogs";
import {LoadingIndicator} from "nativescript-loading-indicator"; 


/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "agregarTarjeta", loadChildren: "./agregarTarjeta/agregarTarjeta.module#AgregarTarjetaModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
let loader = new LoadingIndicator();
@Component({
    selector: "AgregarTarjeta",
    moduleId: module.id,
    templateUrl: "./agregarTarjeta.component.html"
})
export class AgregarTarjetaComponent implements OnInit {
    numero:string;
    fecha:string;
    cvv:string;
    franquicia:string = 'Selecciona una franquicia';
    idFranquicia:string='0';
    
    constructor(private routerExtensions: RouterExtensions, private myService: WebService) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
        
    }
    irAtras() {
        this.routerExtensions.back();
    }
    seleccionarFranquicia(id){
        this.idFranquicia = id;
        if(id == '1'){
            this.franquicia = 'VISA';
        }else if(id == '2'){
            this.franquicia = 'Mastercard';
        }else if(id == '3'){
            this.franquicia = 'American Express';
        }else if(id == '4'){
            this.franquicia = 'Diners Club';
        }
    }


    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    }
    agregarTarjeta(){
        if(this.numero && this.franquicia != 'Selecciona una franquicia' && this.fecha && this.cvv){
            
            loader.show();
            let usuario = ApplicationSettings.getString('emailUsuario');
            let idmember = ApplicationSettings.getString('idmember');
            let numero = this.numero.replace(/-/g, "");
            let fechaDiv = this.fecha.split('/');
            let anio = fechaDiv[1];
            let mes = fechaDiv[0];
            let fecha = mes+anio;

            this.myService.agregarTarjeta(idmember,usuario,numero,fecha,this.idFranquicia,this.cvv)
                .subscribe((result) => {
                    this.exitoTarjeta(result);
                }, (error) => {
                    this.onGetDataError(error);
                });    
        }else{
            dialogs.alert({
                title: "Error",
                message: "Debes ingresar todos los datos de la tarjeta",
                okButtonText: 'Ok!'
            }).then(() => {
            });
        }
        
    }

    exitoTarjeta(res) {
        console.log('Respuesta de ingresar tarjeta');
        console.log(JSON.stringify(res)); 
        loader.hide();
        if(res.addCard == 'OK'){
            dialogs.alert({
                title: 'Tarjeta agregada',
                message: "Gracias, tu tarjeta se a agregado exitosamente.",
                okButtonText: 'Ok'
            }).then(() => {
                console.log("Dialog closed!");
                this.routerExtensions.navigate(["/tarjetas"], { clearHistory: true });
            });
        }else{
            dialogs.alert({
                title: 'Error agregando tarjeta',
                message: "Lo sentimos, hubo un problema agregando la tarjeta. "+res.addCard,
                okButtonText: 'Ok'
            }).then(() => {
                console.log("Dialog closed!");
                
            });
        }
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
