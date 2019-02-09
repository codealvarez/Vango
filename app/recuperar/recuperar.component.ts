import { Component, OnInit } from "@angular/core";
import {LoadingIndicator} from "nativescript-loading-indicator";
import { WebService } from "../ws.service";
import * as dialogs from "ui/dialogs";
import { Page } from "ui/page";
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "recuperar", loadChildren: "./recuperar/recuperar.module#RecuperarModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
let loader = new LoadingIndicator();
@Component({
    selector: "Recuperar",
    moduleId: module.id,
    templateUrl: "./recuperar.component.html"
})
export class RecuperarComponent implements OnInit {
    cedula: string;
    constructor(private myService: WebService,private page: Page) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
        this.page.actionBarHidden = true;
    }
    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    }
    onSigninButtonTap(): void { 
        const cedula = this.cedula;
        if(cedula){
            this.recuperarClave(cedula); 
            //MixpanelHelper.track('IniciandoSesion','OK');   
        }else{
            dialogs.alert({
                title: "Error",
                message: "Debes ingresar tu número de cédula para recuperar tu contraseña",
                okButtonText: 'Ok!'
            }).then(() => {
            });
        }
        
    }

    recuperarClave(u) {
        loader.show();
        this.myService.getClave(u)
            .subscribe((result:any) => {
                loader.hide();
                if(result.resultado == 'OK'){
                    dialogs.alert({
                        title: 'Mensaje enviado',
                        message: "Gracias, hemos enviado a tu cuenta de correo tu nueva contraseña.",
                        okButtonText: 'Ok'
                    }).then(() => {
                        console.log("Dialog closed!");
                        
                    });
                }else{
                    dialogs.alert({
                        title: 'Error de recuperación',
                        message: "Lo sentimos, hubo un problema encontrando tu usuario, verifica los datos e intenta nuevamente.",
                        okButtonText: 'Ok'
                    }).then(() => {
                        console.log("Dialog closed!");
                        
                    });
                }
            }, (error) => {
                loader.hide();
                dialogs.alert({
                    title: 'Error de conexión',
                    message: "Lo sentimos, hubo un problema encontrando el servidor, verifica tu conexión a Internet e intenta nuevamente.",
                    okButtonText: 'Ok'
                }).then(() => {
                    console.log("Dialog closed!");
                    
                });
            });
    }
}
