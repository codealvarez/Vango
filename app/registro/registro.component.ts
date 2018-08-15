import { Component, OnInit } from "@angular/core";
import {RouterExtensions} from "nativescript-angular/router";
import { WebService } from "../ws.service";
import * as ApplicationSettings from "application-settings";
import * as dialogs from "ui/dialogs";
import {LoadingIndicator} from "nativescript-loading-indicator"; 
import { Page } from "ui/page";
//import {MixpanelHelper} from "nativescript-mixpanel";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "registro", loadChildren: "./registro/registro.module#RegistroModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
let loader = new LoadingIndicator();
@Component({
    selector: "Registro",
    moduleId: module.id,
    templateUrl: "./registro.component.html",
    providers: [WebService]
})
export class RegistroComponent implements OnInit {
    name: string;
    email: string;
    email2: string;
    cedula: string;
    grupo: string;

    constructor(private routerExtensions: RouterExtensions, private myService: WebService,private page: Page) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
        this.page.actionBarHidden = true;
        //MixpanelHelper.track('EnRegistro','OK');
    }

    irAtras() {
        this.routerExtensions.back();
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    }

    onSignupWithSocialProviderButtonTap(): void {
        /* ***********************************************************
        * For sign up with social provider you can add your custom logic or
        * use NativeScript plugin for sign up with Facebook
        * http://market.nativescript.org/plugins/nativescript-facebook
        *************************************************************/
    }

    onSignupButtonTap(): void {
        loader.show();
        const name = this.name;
        const email = this.email;
        const email2 = this.email2;
        const cedula = this.cedula;
        const grupo = this.grupo;
        if(name&&email&&email2&&cedula){
            //MixpanelHelper.track('CreandoCuenta','OK');
            if(email != email2){
                loader.hide();
                dialogs.alert({
                    title: 'Error de cuenta',
                    message: 'Tus direcciones de correo no coinciden',
                    okButtonText: 'Ok'
                }).then(() => {
                    console.log("Dialog closed!");
                    
                });
            }else{
                this.myService.registrar(name,email,cedula,grupo)
                        .subscribe((result) => {
                            this.onGetDataSuccess(result);
                        }, (error) => {
                            this.onGetDataError(error);
                        });
            }
        }else{
            loader.hide();
            dialogs.alert({
                    title: 'Error de datos',
                    message: 'Debes completar los campos obligatorios',
                    okButtonText: 'Ok'
            }).then(() => {
                console.log("Dialog closed!");
                
            });
        }
        
        
        
        /* ***********************************************************
        * Call your custom signup logic using the email and password data.
        *************************************************************/
    }
    onGetDataSuccess(res) {
        console.log('Respuesta del registro');
        console.log(JSON.stringify(res)); 
        loader.hide();
        if(res.resultado == 'OK'){
            //MixpanelHelper.track('CreandoCuentaOK','OK');
            dialogs.alert({
                title: 'Cuenta creada',
                message: res.mensaje,
                okButtonText: 'Gracias!'
            }).then(() => {
                console.log("Dialog closed!");
                this.myService.getIdMember(this.cedula,this.email).subscribe((result) => {
                    this.exitoIdMember(result,res.idusuario);
                    //this.routerExtensions.navigate(["/login"]);
                }, (error) => {
                    this.onGetDataError(error);
                });
                
            });
            
        }else{
            //alert('NO'); 
            //MixpanelHelper.track('CreandoCuentaError','OK');
            dialogs.alert({
                title: 'Error de cuenta',
                message: res.mensaje,
                okButtonText: 'Gracias!'
            }).then(() => {
                console.log("Dialog closed!");
            });
            
        }
        

    }

    exitoIdMember(res,idUsuario) {
        console.log('Respuesta del exitoIdMember');
        console.log(JSON.stringify(res)); 
        loader.hide();
        this.myService.asignarIdMember(idUsuario,res.idmember).subscribe((result) => {
            console.log('Respuesta de asignación de ID Memebr');
            console.log(result);
            this.routerExtensions.navigate(["/login"]);
        }, (error) => {
            this.onGetDataError(error);
        });
        ApplicationSettings.setString("idmember",res.idmember);

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
