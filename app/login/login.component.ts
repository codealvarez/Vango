import { Component, OnInit } from "@angular/core";
import {RouterExtensions} from "nativescript-angular/router";
import { WebService } from "../ws.service";
import * as dialogs from "ui/dialogs";
import * as ApplicationSettings from "application-settings";
import {LoadingIndicator} from "nativescript-loading-indicator";
import { Page } from "ui/page"; 
import { TextField } from "ui/text-field";
//import {MixpanelHelper} from "nativescript-mixpanel";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "login", loadChildren: "./login/login.module#LoginModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
let loader = new LoadingIndicator();
@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    providers: [WebService]
})

export class LoginComponent implements OnInit {
    cedula: string;
    clave: string; 

    constructor(private routerExtensions: RouterExtensions, private myService: WebService,private page: Page) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
        if(ApplicationSettings.getBoolean("authenticated", false)) {
            this.routerExtensions.navigate(["/home"], { clearHistory: true });
        }
        this.page.actionBarHidden = true;
        //MixpanelHelper.track('EnLogin','OK');
    } 

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
        
    }

    onLoginWithSocialProviderButtonTap(): void {
        /* ***********************************************************
        * For log in with social provider you can add your custom logic or
        * use NativeScript plugin for log in with Facebook
        * http://market.nativescript.org/plugins/nativescript-facebook
        *************************************************************/
    }

    onSigninButtonTap(): void { 
        const cedula = this.cedula;
        const clave = this.clave;
        if(cedula && clave){
            this.hacerLogin(cedula,clave); 
            //MixpanelHelper.track('IniciandoSesion','OK');   
        }else{
            dialogs.alert({
                title: "Error",
                message: "Debes ingresar tu número de cédula y contraseña para iniciar sesión",
                okButtonText: 'Ok!'
            }).then(() => {
            });
        }
        
    }

    public onReturn(cedula,clave) {
        console.log('Cedula ingresada: '+cedula);
        this.cedula = cedula;
        this.clave = clave;
        if(this.cedula && this.clave){
            this.hacerLogin(cedula,clave); 
            //MixpanelHelper.track('IniciandoSesion','OK');   
        }else{
            dialogs.alert({
                title: "Error",
                message: "Debes ingresar tu número de cédula y contraseña para iniciar sesión",
                okButtonText: 'Ok!'
            }).then(() => {
            });
        }
    }

    hacerLogin(u,c) {
        loader.show();
        this.myService.getLogin(u,c)
            .subscribe((result) => {
                this.onGetDataSuccess(result);
            }, (error) => {
                this.onGetDataError(error);
            });
    }

    onGetDataSuccess(res) {
        console.log('Respuesta del login');

        console.log(JSON.stringify(res)); 
        loader.hide();
        if(res.resultado == 'OK'){
            //MixpanelHelper.track('LoginExitoso','OK');
            /*dialogs.alert({
                title: "Bienvenido!",
                message: "Hola "+res.nombre+", bienvenido nuevamente a Vango",
                okButtonText: 'Gracias!'
            }).then(() => {
                console.log("Dialog closed!");
                ApplicationSettings.setBoolean("authenticated", true);
                ApplicationSettings.setString("nombreUsuario",res.nombre);
                ApplicationSettings.setString("idUsuario",res.idpasajero);
                ApplicationSettings.setString("emailUsuario",res.mail);
                ApplicationSettings.setString("idmember",res.idmodipay);
                setTimeout(() => {
                    this.routerExtensions.navigate(["/home"]);
                }, 1000);
                
            });*/
            ApplicationSettings.setBoolean("authenticated", true);
            ApplicationSettings.setString("nombreUsuario",res.nombre);
            ApplicationSettings.setString("idUsuario",res.idpasajero);
            ApplicationSettings.setString("emailUsuario",res.mail);
            ApplicationSettings.setString("idmember",res.idmodipay);
            ApplicationSettings.setString("idvango",res.idvango);
            ApplicationSettings.setString("cedulaUsuario",this.cedula);
            
            
            setTimeout(() => {
                this.routerExtensions.navigate(["/home"]);
            }, 200);
            
        }else{ 
            //MixpanelHelper.track('LoginErroneo','OK');
            dialogs.alert({
                title: 'Error de acceso',
                message: "Lo sentimos, hubo un problema ingresando con tus datos. Verificalos e intenta nuevamente.",
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


    onForgotPasswordTap(): void {
        /* ***********************************************************
        * Call your Forgot Password logic here.
        *************************************************************/
        
    }
}
