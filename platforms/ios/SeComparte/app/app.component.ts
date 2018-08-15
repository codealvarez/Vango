import { Component, OnInit, ViewChild } from "@angular/core";
import * as app from "application";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import * as ApplicationSettings from "application-settings";
import * as dialogs from "ui/dialogs";
import * as utilidades from "utils/utils";
const firebase = require("nativescript-plugin-firebase");

 
@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit{
	private _selectedPage: string;
    private _sideDrawerTransition: DrawerTransitionBase;
    public emailUsuario:string;
    public nombreUsuario:string;

    constructor(private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject services.
        this.emailUsuario = ApplicationSettings.getString('emailUsuario');
        this.nombreUsuario = ApplicationSettings.getString('nombreUsuario');
    }

    ngOnInit(): void { 
        this._selectedPage = "Home";
        this._sideDrawerTransition = new SlideInOnTopTransition();
        
        firebase.init({ 
            // Optionally pass in properties for database, authentication and cloud messaging,
            // see their respective docs.
            onMessageReceivedCallback: (message: any) => {
              console.log('PUSH recibida');
              console.log(JSON.stringify(message)); 
              dialogs.action({
                    //title: message.data.titulo,
                    message: 'El contuctor de tu viaje ha cambiado el estado a: '+message.data.text,
                    //message:'Tienes una notificación',
                    cancelButtonText: "Cancelar",
                    actions: ["Ver viaje"]
                }).then(result => {
                    console.log("Dialog closed!");
                    if(result != 'Cancelar'){
                        this.routerExtensions.navigate(["/viaje/"+message.data.idRuta+"/"+message.data.idViaje+"/"+message.data.placa+"/"+message.data.idConductor]);
                    }
                });
              
            }
            
        }).then(instance => {
            console.log("firebase.init done");
        },error => {
            console.log("firebase.init error: ${error}");
        });
    } 

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    abrirPagina(){
        utilidades.openUrl('https://secomparte.smart4.com.co/');
    }

    isPageSelected(pageTitle: string): boolean {
        return pageTitle === this._selectedPage;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
    cerrarDrawer():void{
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
    salir():void{
        dialogs.confirm({
            title: "Salir",
            message: "¿Realmente deseas cerrar tu sesión?",
            okButtonText: "Salir",
            cancelButtonText: "Cancelar"
        }).then(result => {
            // result argument is boolean
            if(result){
                const sideDrawer = <RadSideDrawer>app.getRootView();
                sideDrawer.closeDrawer();
                ApplicationSettings.setBoolean("authenticated", false);
                ApplicationSettings.remove("nombreUsuario");
                ApplicationSettings.remove("idUsuario");
                ApplicationSettings.remove("emailUsuario");
                ApplicationSettings.remove("idmember");

                this.routerExtensions.navigate(["/login"]);
            }
            console.log("Dialog result: " + result);
            
        });
        
    }
}
