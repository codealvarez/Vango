import { Component, OnInit, Input, ChangeDetectionStrategy } from "@angular/core";
import {RouterExtensions} from "nativescript-angular/router";
import {LoadingIndicator} from "nativescript-loading-indicator";
import { WebService } from "../ws.service";
import * as dialogs from "ui/dialogs";
import * as ApplicationSettings from "application-settings";
import * as observableArray from "tns-core-modules/data/observable-array";

//Drawer
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

import { SearchBar } from "ui/search-bar";

class DataItem { 
    constructor(public idviaje: string, public idruta: string, public nombreruta:string, public conductor: string, public placa:string, public capacidad:number, public disponibles:number, public fecha_viaje:number,public hora_viaje:number) { }
}
var loader = new LoadingIndicator();
@Component({
    selector: "Disponibles",
    moduleId: module.id,
    templateUrl: "./disponibles.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisponiblesComponent implements OnInit {

    //public myItems: ObservableArray<DataItem>;
    //public myItems: Array<DataItem>;
    public myItems = new observableArray.ObservableArray([]);
    public arrayItems= new observableArray.ObservableArray([]);
    private counter: number;
    public searchPhrase:string;

    constructor(private routerExtensions: RouterExtensions,private myService: WebService) {
        /*this.myItems = [];
        this.counter = 0;
        for (var i = 0; i < 5; i++) {
            this.myItems.push(new DataItem(i, "Chicó","Aeropuerto","8:00AM","ABC-123",i+2));
            this.counter = i;
        }*/
    }

    public onSubmit(args) {
        let searchBar = <SearchBar>args.object;
        let searchValue = searchBar.text.toLowerCase();

        console.log('Buscando '+searchValue);
        this.myItems = new observableArray.ObservableArray([]);
        if (searchValue !== "") {
            for (let i = 0; i < this.arrayItems.length; i++) {
                if (this.arrayItems.getItem(i).terminos.toLowerCase().indexOf(searchValue) !== -1) {
                    this.myItems.push(this.arrayItems.getItem(i));
                    console.log(this.arrayItems.getItem(i));
                }
                
            } 
        }
    }
    onClear(args){
        let searchBar = <SearchBar>args.object;
        searchBar.text = "";
        searchBar.hint = "Busca por barrio o lugar";

        this.myItems = new observableArray.ObservableArray([]);
        this.arrayItems.forEach(item => {
            this.myItems.push(item);
        });

    }
    onSearchLayoutLoaded(event) {
        if (event.object.android) {
            event.object.android.setFocusableInTouchMode(true);
        }
    }
    onSearchBarLoaded(event) {
        if (event.object.android) {
            event.object.android.clearFocus();
        }
    }

    public onTextChanged(args) {
        let searchBar = <SearchBar>args.object;
        console.log("SearchBar text changed! New value: " + searchBar.text);
    }

    irAtras() {
        this.routerExtensions.back();
    }

    public onItemTap(args) {
        console.log(args);
        console.log("------------------------ ItemTapped: " + args.index);
    }

    ngOnInit(): void {
        let idUsuario = ApplicationSettings.getString('idUsuario');
        loader.show();
        this.myService.getRutasDisponibles(idUsuario).subscribe((res) => {
            loader.hide();
            console.log('Respuesta de las rutas: '+Object.keys(res).length);
            console.log(JSON.stringify(res));
            for(let i = 0; i <Object.keys(res).length; i++) {
                this.arrayItems.push(res[i]); 
                this.myItems.push(res[i]); 
            }

            
        }, (error) => {
            loader.hide();
            this.onGetDataError(error);
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

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
