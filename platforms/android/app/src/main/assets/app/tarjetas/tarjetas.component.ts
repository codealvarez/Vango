import { Component, OnInit } from "@angular/core";

//Drawer
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as dialogs from "ui/dialogs";
import * as ApplicationSettings from "application-settings";
import {LoadingIndicator} from "nativescript-loading-indicator";
import { WebService } from "../ws.service";
import {RouterExtensions} from "nativescript-angular/router";
import * as observableArray from "tns-core-modules/data/observable-array";
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "tarjetas", loadChildren: "./tarjetas/tarjetas.module#TarjetasModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
let loader = new LoadingIndicator();
@Component({
    selector: "Tarjetas",
    moduleId: module.id,
    templateUrl: "./tarjetas.component.html"
})
export class TarjetasComponent implements OnInit {
    public myItems = new observableArray.ObservableArray([]);
    constructor(private routerExtensions: RouterExtensions, private myService: WebService) {
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
        loader.show();
        let idUsuario = ApplicationSettings.getString('idUsuario');
        let usuario = ApplicationSettings.getString('emailUsuario');
        let idmember = ApplicationSettings.getString('idmember');
        if(idmember){
            console.log('Con idmember: '+idmember);
            this.myService.getTarjetas(idmember,usuario).subscribe((result) => {
                this.myService.asignarIdMember(idUsuario,idmember).subscribe((result) => {
                    console.log('Respuesta de asignación de ID Memebr');
                    console.log(result);
                }, (error) => {
                    this.onGetDataError(error);
                });
                this.exitoTarjetas(result);
            }, (error) => {
                this.onGetDataError(error);
            });

        }else{
            console.log('Sin idmember');
            this.myService.getIdMember(idUsuario,usuario).subscribe((result) => {
                this.exitoIdMember(result);
            }, (error) => {
                this.onGetDataError(error);
            });
        }

    }

    exitoTarjetas(res) {
        loader.hide();
        console.log('Respuesta de las tarjetas: '+Object.keys(res.tarjetas).length);
        console.log(JSON.stringify(res));
        if(Object.keys(res.tarjetas).length > 0){
            for(let i = 0; i <Object.keys(res.tarjetas).length; i++) {
                console.log('Pintando a:');
                console.log(res.tarjetas[i]); // "species"

                this.myItems.push(res.tarjetas[i]); 
            }
        }else{

        }
        

    }
    eliminar(id){
        dialogs.confirm({
            title: "Eliminar tarjeta",
            message: "¿Realmente deseas eliminar esta tarjeta?",
            okButtonText: "Si",
            cancelButtonText: "No"
        }).then(result => {
            // result argument is boolean
            if(result){
                loader.show();
                let usuario = ApplicationSettings.getString('emailUsuario');
                let idmember = ApplicationSettings.getString('idmember');
                this.myService.eliminarTarjeta(idmember,usuario,''+id+'').subscribe((result) => {
                    this.exitoEliminar(result);
                }, (error) => {
                    this.onGetDataError(error);
                });
            }
            console.log("Dialog result: " + result);
        });
        

    }

    exitoEliminar(res) {
        console.log('Respuesta del eliminarTarjeta');
        console.log(JSON.stringify(res)); 
        loader.hide();
        if(res.delCard == 'OK'){
            dialogs.alert({
                title: 'Tarjeta eliminada',
                message: "Tu tarjeta fue eliminada exitosamente",
                okButtonText: 'Ok'
            }).then(() => {
                console.log("Dialog closed!");
                this.myItems=res.tarjetas;
            });
        }else{
            dialogs.alert({
                title: 'Error eliminando tarjeta',
                message: "Lo sentimos, hubo un problema eliminando la tarjeta",
                okButtonText: 'Ok'
            }).then(() => {
                console.log("Dialog closed!");
                
            });
        }

    }

    exitoIdMember(res) {
        console.log('Respuesta del crearUsuario');
        console.log(JSON.stringify(res)); 
        loader.hide();
        let usuario = ApplicationSettings.getString('idUsuario');
        this.myService.asignarIdMember(usuario,res.idmember).subscribe((result) => {
            console.log('Respuesta de asignación de ID Memebr');
            console.log(result);
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
