import { Component, OnInit } from "@angular/core";
//Drawer
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
//Action
import * as dialogs from "ui/dialogs";
//Setting de la app (Variables almacenadas)
import * as ApplicationSettings from "application-settings";
import {LoadingIndicator} from "nativescript-loading-indicator";
import { WebService } from "../ws.service";
import { isIOS, isAndroid } from "platform";
import * as utils from "utils/utils";
import * as application from "application";


/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "perfil", loadChildren: "./perfil/perfil.module#PerfilModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
declare var UIApplication, android;
let loader = new LoadingIndicator();
@Component({
    selector: "Perfil",
    moduleId: module.id,
    templateUrl: "./perfil.component.html"
})
export class PerfilComponent implements OnInit {
    public emailUsuario = ApplicationSettings.getString('emailUsuario');
    public email2:string;
    public nombreUsuario = ApplicationSettings.getString('nombreUsuario');
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

    cambiarImagen():void{
        dialogs.action({
            message: "Imagen de perfil",
            cancelButtonText: "Cancelar",
            actions: ["Tomar una foto", "Seleccionar de la galería"]
        }).then(result => {
            console.log("Dialog result: " + result);
            if(result == "Tomar una foto"){
                //Do action1
                alert('Tomar foto');
            }else if(result == "Seleccionar de la galería"){
                //Do action2
                alert('Seleccionar foto');
            }
        });
    }
    actualizar():void{
        const nombre = this.nombreUsuario;
        const email = this.emailUsuario;
        const email2 = this.email2;
        const usuario= this.idPasajero;
        if(nombre && email){
            if(email == email2){
                loader.show();

                this.myService.actualizarDatos(nombre,email,usuario)
                .subscribe((result) => {
                    this.onGetDataSuccess(result);
                    ApplicationSettings.setString('emailUsuario',email);
                    ApplicationSettings.setString('nombreUsuario',nombre);
                }, (error) => {
                    this.onGetDataError(error);
                });
            }else{
                dialogs.alert({
                    title: 'Error en email',
                    message: "Lo sentimos, los correos electrónicos ingresados no coinciden",
                    okButtonText: 'Ok'
                }).then(() => {
                    console.log("Dialog closed!");
                    
                });
            }
            
        }else{
            dialogs.alert({
                title: 'Datos obligatorios',
                message: "Lo sentimos, debes ingresar todos los datos",
                okButtonText: 'Ok'
            }).then(() => {
                console.log("Dialog closed!");
                
            });
        }
    }
    onGetDataSuccess(res) {
        console.log('Respuesta del login');

        console.log(JSON.stringify(res)); 
        loader.hide();
        dialogs.alert({
            title: 'Perfil actualizado',
            message: "Tu perfil ha sido actualizado exitosamente, gracias.",
            okButtonText: 'Ok'
        }).then(() => {
            console.log("Dialog closed!");
            
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

