import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

//Importar HTTPClient para usar el WS
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
//Importar servicio para llamadas al WebService
import { WebService } from "./ws.service";
//Poder usar el mapa en iOS
import * as platform from "platform";
declare var GMSServices: any;
if (platform.isIOS) { 
  GMSServices.provideAPIKey("AIzaSyBw13TAYsGCkJKhARjx9F70ymnIt_OnRXU");
} 

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        NativeScriptHttpClientModule
    ],
    declarations: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers:[WebService]
})
export class AppModule { }
