import { Component, OnInit } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { WebService } from "../ws.service";
import {RouterExtensions} from "nativescript-angular/router";
import {LoadingIndicator} from "nativescript-loading-indicator";
import * as ApplicationSettings from "application-settings";
import * as observableArray from "tns-core-modules/data/observable-array";
import * as dialogs from "tns-core-modules/ui/dialogs";
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "saldo", loadChildren: "./saldo/saldo.module#SaldoModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
let loader = new LoadingIndicator();
@Component({
    selector: "Saldo",
    moduleId: module.id,
    templateUrl: "./saldo.component.html"
})
export class SaldoComponent implements OnInit {
    saldo:number=0;
    public myItems = new observableArray.ObservableArray([]);
    empresaId:string;
    empresas=[];
    idvango = ApplicationSettings.getString('idvango');
    constructor(private myService: WebService) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
        
    }
    agregarSaldo(){
        dialogs.alert({
            title: "Carga tu cuenta",
            message: "Puedes agregar saldo a tu cuenta haciendo un pago en Baloto, con la referencia: "+this.idvango+". Automáticamente verás tu saldo actualizado",
            okButtonText: "Entendido"
        }).then(() => {
            console.log("Dialog closed!");
        });
    }
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
        this.consultarDatos();
    }
    consultarDatos(){
        loader.show({
            message:'Consultando tu saldo y transacciones'
        });
        let idUsuario = ApplicationSettings.getString('idUsuario');
        let usuario = ApplicationSettings.getString('emailUsuario');
        let idvango = ApplicationSettings.getString('idvango');
        let cedula = ApplicationSettings.getString('cedulaUsuario');
        //et cedula = '1024494634';
        let nombres = ApplicationSettings.getString('nombreUsuario');
        if(idvango != '0'){
            console.log('Con idmember: '+idvango);
            this.myService.getSaldo(idvango).subscribe((result:any) => {
                loader.hide();
                console.log('Resultado del saldo');
                console.log(result);
                if(result.balance){
                    this.saldo=result.balance*1;
                }
                
            }, (error) => {
                loader.hide();
                console.log('Error consultando saldo');
                console.log(error);
            });
            //Consultar historico de transacciones
            this.myService.getTransacciones(idvango).subscribe((res:any) => {
                loader.hide();
                console.log('Resultado de las transacciones');
                console.log(res);
                for(let i = 0; i <Object.keys(res).length; i++) {
                    this.myItems.push(res[i]); 
                }
                //this.saldo=result.balance*1;
            }, (error) => {
                loader.hide();
                console.log('Error consultando saldo');
                console.log(error);
            });

        }else{
            console.log('Sin idvango');
            
            this.seleccionarEmpresa()
        }
    }
    seleccionarEmpresa(){
        let idUsuario = ApplicationSettings.getString('idUsuario');
        let usuario = ApplicationSettings.getString('emailUsuario');
        let idvango = ApplicationSettings.getString('idvango');
        let cedula = ApplicationSettings.getString('cedulaUsuario');
        //let cedula = '1024494634';
        let nombres = ApplicationSettings.getString('nombreUsuario');
        let empresas = [];
        this.myService.getEmpresas().subscribe((result) => {
            console.log('Listado de empresas');
            console.log(result);
            for(let i = 0; i <Object.keys(result).length; i++) {
                this.empresas.push(result[i]);
            }

            console.log(this.empresas);
            for(let i = 0; i <Object.keys(this.empresas).length; i++) {
                console.log(this.empresas[i])
                empresas.push(this.empresas[i].name);
            }
            dialogs.action({
                message: "Selecciona tu empresa",
                cancelButtonText: "Cancelar",
                actions: empresas
            }).then(result => {
                if(result){
                    let empresa = result;
                    let idEmpresa;
                    for(let i = 0; i <Object.keys(this.empresas).length; i++) {
                        console.log(this.empresas[i])
                        if(result==this.empresas[i].name)
                        idEmpresa=this.empresas[i].username;
                    }

                    if(cedula){
                        //cedula,email,nombre,empresa,idEmpresa
                        this.myService.getIdVango(cedula,usuario,nombres,empresa,idEmpresa,'','').subscribe((result:any) => {
                            ApplicationSettings.setString("idvango",result.idvango);
                            this.exitoIdVango(idUsuario,result.idvango)
                        }, (error) => {
                            console.log('Error en getIdVango');
                            console.log(error)
                        });
                    }
                    

                    

                }
                console.log("Dialog result: " + result);
                if(result == "Option1"){
                    //Do action1
                }else if(result == "Option2"){
                    //Do action2
                }
            });
        }, (error) => {
            console.log('Error consultando empresas:');
            console.log(error);
        });
        
    }
    exitoIdVango(idUsuario,idVango) {
        console.log('Respuesta del exitoIdMember');
        loader.hide();
        this.myService.asignarIdVango(idUsuario,idVango).subscribe((result) => {
            console.log('Respuesta de asignación de ID Vango');
            console.log(result);
            this.consultarDatos();
        }, (error) => {
            console.log('Error asignando idVango');
        });

    }
}
