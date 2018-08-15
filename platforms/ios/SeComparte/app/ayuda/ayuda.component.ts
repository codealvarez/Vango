import { Component, OnInit } from "@angular/core";
//Drawer
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import {LoadingIndicator} from "nativescript-loading-indicator";
import { WebService } from "../ws.service";
import * as dialogs from "ui/dialogs";
import * as ApplicationSettings from "application-settings";
import { isIOS, isAndroid } from "platform";
import * as utils from "utils/utils";
import * as application from "application";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "ayuda", loadChildren: "./ayuda/ayuda.module#AyudaModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
declare var UIApplication, android;
let loader = new LoadingIndicator();
@Component({
    selector: "Ayuda",
    moduleId: module.id,
    templateUrl: "./ayuda.component.html"
})
export class AyudaComponent implements OnInit {
    public asunto:string;
    public mensaje:string;
    public idPasajero: string = ApplicationSettings.getString('idUsuario');
    constructor(private myService: WebService) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    }
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    public enviar(){
        const asunto = this.asunto;
        const mensaje = this.mensaje;
        const usuario= this.idPasajero;
        if(asunto && mensaje){
            loader.show();
            this.myService.enviarMensaje(asunto,mensaje,usuario)
                .subscribe((result) => {
                    this.onGetDataSuccess(result);
                }, (error) => {
                    this.onGetDataError(error);
                });
        }
    }
     onGetDataSuccess(res) {
        console.log('Respuesta del login');

        console.log(JSON.stringify(res)); 
        loader.hide();
        dialogs.alert({
            title: 'Mensaje enviado',
            message: "Gracias por contactarnos, nos comunicaremos contigo lo más pronto posible.",
            okButtonText: 'Ok'
        }).then(() => {
            console.log("Dialog closed!");
            this.asunto = '';
            this.mensaje = '';
            if (isIOS) {
                utils.ios.getter(UIApplication, UIApplication.sharedApplication)
                    .keyWindow
                    .endEditing(true);
            }
            if (isAndroid) {
                const dialogFragment = application.android
                    .foregroundActivity
                    .getFragmentManager()
                    .findFragmentByTag("dialog");
                if (dialogFragment) {
                    utils.ad.dismissSoftInput(dialogFragment.getDialog().getCurrentFocus());
                } else {
                    utils.ad.dismissSoftInput();
                }
            }
            
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
