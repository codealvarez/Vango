import { Component, OnInit,ElementRef, ViewChild, AfterViewInit,ChangeDetectorRef  } from "@angular/core";
import {RouterExtensions} from "nativescript-angular/router";
//import { registerElement } from 'nativescript-angular/element-registry';

import { WebService } from "../ws.service";
import { ActivatedRoute } from "@angular/router";
import * as ApplicationSettings from "application-settings";
import {LoadingIndicator} from "nativescript-loading-indicator";

import { WebView, LoadEventData } from "ui/web-view";
import { Label } from "ui/label";
import * as dialogs from "ui/dialogs";


let webViewInterfaceModule = require('nativescript-webview-interface');


/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "ruta", loadChildren: "./ruta/ruta.module#RutaModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
//registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);
let loader = new LoadingIndicator();
@Component({
    selector: "Ruta",
    moduleId: module.id,
    templateUrl: "./ruta.component.html",
    providers: [WebService]
})
export class RutaComponent implements OnInit, AfterViewInit {
    public webViewSrc: string;
    @ViewChild('webView') webView: ElementRef;
    private oLangWebViewInterface;




    
    idruta: number;
    idviaje: number;
    precio:number;
    nombreRuta:string;
    idPasajero: string = ApplicationSettings.getString('idUsuario');


    
    constructor(private changeDetectorRef: ChangeDetectorRef,private routerExtensions: RouterExtensions, private myService: WebService,private route: ActivatedRoute) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
        console.log(this.route.params);
        this.route.params
          .forEach((params) => { 
              console.log('Parametros de url');
              this.idruta = +params["idruta"]; 
              this.idviaje = +params["idviaje"]; 
              this.precio = +params["precio"];
              this.nombreRuta = params["nombre"];
              console.log(this.idruta+' - '+this.idviaje+' - '+this.precio+' - '+this.nombreRuta);
              this.webViewSrc = 'https://apps.emeraldstudio.co/imperial/?idruta='+this.idruta+'&idviaje='+this.idviaje+'&idpasajero='+this.idPasajero;
              //this.webViewSrc = "http://turutaescolar.cloudapp.net/swturutaes/services/reserva_mapa_imperial.html?idruta="+this.idruta+"&idviaje="+this.idviaje+"&idpasajero="+this.idPasajero;
              //this.webViewSrc = 'https://www.emerald.studio';
              console.log('URL WEB: '+this.webViewSrc);

          }); 
        

    }


    ngAfterViewInit() {
        this.setupWebViewInterface();
    }

    private setupWebViewInterface() {
        let webView: WebView = this.webView.nativeElement;
        //webView.ios.
        console.log('ios webview en setup');
        console.log(webView.ios);
        this.oLangWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView, this.webViewSrc);

        // loading languages in dropdown, on load of webView.
        webView.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
          if (!args.error) {
          }
        });

        this.listenLangWebViewEvents();
    }

    

    /**
    * Handles any event/command emitted by language webview.
    */ 
    private listenLangWebViewEvents() {
        // handles language selectionChange event.
        console.log('En listado de listenLangWeb tales');

        this.oLangWebViewInterface.on('exitoNative',(respuesta) =>{
            console.log('exitoNative');
            console.log(respuesta);
            dialogs.confirm({
                title: "Realizar reserva",
                message: "Realmente deseas realizar la reserva en "+respuesta.direccion+"?",
                okButtonText: "Si",
                cancelButtonText: "No"
            }).then(result => {
                // result argument is boolean
                if(result){
                    ApplicationSettings.setNumber('latReserva',respuesta.latitud);
                    ApplicationSettings.setNumber('lonReserva',respuesta.longitud);
                    ApplicationSettings.setString('dirReserva',respuesta.direccion);
                    ApplicationSettings.setNumber('viajeReserva',this.idviaje);
                    ApplicationSettings.setNumber('rutaReserva',this.idruta);
                    ApplicationSettings.setNumber('precioReserva',this.precio);
                    this.routerExtensions.navigate(["/reservar"]);
                }
                console.log("Dialog result: " + result);
            });


        });
        this.oLangWebViewInterface.on('errorNative',(error) =>{
            console.log('Error wiiii');
            console.log(error);

        });

    }

    irAtras() {
        this.routerExtensions.back();
    }
    
    ngOnInit(): void {



        
    }
    

    
}
