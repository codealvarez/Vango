import { Component, OnInit } from "@angular/core";
import { MapView, Marker, Position, Polyline, Bounds, Style } from 'nativescript-google-maps-sdk';
import {RouterExtensions} from "nativescript-angular/router";
import { WebService } from "../ws.service";
import * as ApplicationSettings from "application-settings";
import * as dialogs from "ui/dialogs";
import {LoadingIndicator} from "nativescript-loading-indicator";
import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "ui/enums";
//Imágenes para los marcadores
import * as imageSource from "tns-core-modules/image-source";
import * as ImageModule from "tns-core-modules/ui/image";
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "reservar", loadChildren: "./reservar/reservar.module#ReservarModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
let loader = new LoadingIndicator();
@Component({
    selector: "Reservar",
    moduleId: module.id,
    templateUrl: "./reservar.component.html"
})
export class ReservarComponent implements OnInit {
    public latitud:number;
    public longitud:number;
    public direccion:string;
    public idviaje:number;
    public idruta:number;
    public valor:number=0;
    public valorTotal:number=0;
    public valido:boolean=false;
    public tarjetas=[];
    public tarjeta:string='Selecciona una tarjeta de pago';
    public idTarjeta:string;
    public textoBoton:string='PAGAR Y RESERVAR';
    public saldo:number=0;

    //MAPA
    latitude= ApplicationSettings.getNumber('latReserva'); //Colombia4.587799, -73.940960
    //latitude:number; //Colombia4.587799, -73.940960
    longitude=ApplicationSettings.getNumber('lonReserva'); //Clombia
    zoom = 19
    minZoom = 0; 
    maxZoom = 22;
    bearing = 0;
    tilt = 0;
    padding = [40, 40, 40, 40];
    mapView: MapView;
    styles=[
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#7c93a3"
                },
                {
                    "lightness": "-10"
                }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#a0a4a5"
                }
            ]
        },
        {
            "featureType": "administrative.province",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#62838e"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                },
                {
                    "lightness": "-29"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#dde3e3"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#3f4a51"
                },
                {
                    "weight": "0.30"
                },
                {
                    "visibility": "on"
                },
                {
                    "lightness": "74"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "poi.attraction",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.government",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.medical",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi.place_of_worship",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi.school",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.sports_complex",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": "-100"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#bbcacf"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "lightness": "0"
                },
                {
                    "color": "#bbcacf"
                },
                {
                    "weight": "0.50"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#a9b4b8"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "invert_lightness": true
                },
                {
                    "saturation": "-7"
                },
                {
                    "lightness": "3"
                },
                {
                    "gamma": "1.80"
                },
                {
                    "weight": "0.01"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit.station.bus",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#a3c7df"
                }
            ]
        }
    ];

    lastCamera: String;
    constructor(private routerExtensions: RouterExtensions, private myService: WebService) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
        this.latitud = ApplicationSettings.getNumber('latReserva');
        this.longitud = ApplicationSettings.getNumber('lonReserva');
        this.direccion = ApplicationSettings.getString('dirReserva');
        this.idviaje = ApplicationSettings.getNumber('viajeReserva');
        this.idruta = ApplicationSettings.getNumber('rutaReserva');
        this.valor = ApplicationSettings.getNumber('precioReserva');
        this.valorTotal = this.valor;
        if(this.valor == 0){
            this.textoBoton = 'RESERVAR';
        }
    }

    irAtras() {
        this.routerExtensions.back();
    }


    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
        loader.show();
        let usuario = ApplicationSettings.getString('emailUsuario');
        let idmember = ApplicationSettings.getString('idmember');
        if(idmember){
            this.valido=true;
            console.log('Con idmember: '+idmember);
            this.myService.getTarjetas(idmember,usuario).subscribe((result) => {
                this.exitoTarjetas(result);
            }, (error) => {
                this.onGetDataError(error);
            });

        }else{
            console.log('Sin idmember');
            this.valido=false;
            this.tarjeta='No tienes tarjetas asociadas a tu cuenta';
            loader.hide();
        }

        let idvango = ApplicationSettings.getString('idvango');
        if(idvango){
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
            

        }else{
            console.log('Sin idmember');
            /*this.myService.getIdVango(idUsuario,usuario).subscribe((result) => {
                this.exitoIdMember(result);
            }, (error) => {
                this.onGetDataError(error);
            });*/
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

                this.tarjetas.push(res.tarjetas[i]); 
            }
        }else{

        }
        

    }
    displayActionDialog() {
        // >> action-dialog-code
        console.log(this.tarjetas);
        let opciones = [];
        for(let i = 0; i <Object.keys(this.tarjetas).length; i++) {
            opciones.push('****-****-****-'+this.tarjetas[i].numero_tarjeta); 
        }
        console.log(opciones);

        let options = {
            title: "Selecciona una tarjeta",
            message: "Selecciona una tarjeta",
            cancelButtonText: "Cancelar",
            actions: opciones
        };

        dialogs.action(options).then((result) => {
            console.log(result);
            if(result == 'Cancelar'){
                this.tarjeta = 'Selecciona una tarjeta de pago';
            }else{
                let numTarjeta = result.split('****-****-****-')[1];
                for(let i = 0; i <Object.keys(this.tarjetas).length; i++) {
                    if(numTarjeta == this.tarjetas[i].numero_tarjeta){
                        this.idTarjeta = this.tarjetas[i].id;
                    }
                }
                this.tarjeta = result;
            }

            
        });
        // << action-dialog-code
    }


    public pasajeros: number = 1;

    
    public aumentar(){
        if(this.pasajeros < 6){
            this.pasajeros++;
            this.valorTotal = this.valor*this.pasajeros;
        }
        console.log(this.pasajeros);
    }
    public disminuir(){
        if(this.pasajeros > 1){
            this.pasajeros--;
            this.valorTotal = this.valor*this.pasajeros;
        }
        
        console.log(this.pasajeros);
    }
    public pagar(){
        loader.show();
        console.log('Precio a pagar: '+this.valorTotal);
        if(this.valor == 0){
            this.reservar();
        }else{
            console.log('Pagar con la tarjeta: '+this.idTarjeta);
            if(this.idTarjeta){
                let usuario = ApplicationSettings.getString('emailUsuario');
                let idmember = ApplicationSettings.getString('idmember');
                this.myService.pagar(idmember,usuario,''+this.idTarjeta+'',''+this.valorTotal+'').subscribe((result) => {
                    this.exitoPago(result);
                }, (error) => {
                    this.onGetDataError(error);
                });
            }else{
                dialogs.alert({
                    title: 'Error',
                    message: "Debes seleccionar una tarjeta para realizar pago",
                    okButtonText: 'Ok'
                }).then(() => {
                    console.log("Dialog closed!");
                    loader.hide();
                });
            }
        }
    }
    public exitoPago(res){
        console.log('Respuesta del pago');
        console.log(JSON.stringify(res)); 
        loader.hide();
        if(res.numaprobacion || res.transactionNumber){
            dialogs.alert({
                title: 'Pago realizado exitosamente',
                message: "Tu pago se realizó correctamente, número de aprobación: "+res.numaprobacion+", estamos realizando la reserva.",
                okButtonText: 'Ok'
            }).then(() => {
                console.log("Dialog closed!");
                this.reservar();
            });
        }else{
            dialogs.alert({
                title: 'Error realizando pago',
                message: "Lo sentimos, hubo un problema realizando el pago. "+res.error,
                okButtonText: 'Ok'
            }).then(() => {
                console.log("Dialog closed!");
            });
        }
    }
    public pagarConSaldo(){
        loader.show();
        console.log('Precio a pagar: '+this.valorTotal);
        if(this.valor == 0){
            this.reservar();
        }else{
            console.log('Pagar con saldo: '+this.saldo);
            if(this.saldo > this.valorTotal){
                let idvango = ApplicationSettings.getString('idvango');
                this.myService.pagarConSaldo(idvango,''+this.valorTotal+'').subscribe((result) => {
                    this.exitoPago(result);
                }, (error) => {
                    this.onGetDataError(error);
                });
            }else{
                dialogs.alert({
                    title: 'Error',
                    message: "Debes seleccionar una tarjeta para realizar pago",
                    okButtonText: 'Ok'
                }).then(() => {
                    console.log("Dialog closed!");
                    loader.hide();
                });
            }
        }
    }
    public reservar(){
        loader.show();
        
        const idPasajero = ApplicationSettings.getString("idUsuario");
        const idViaje = this.idviaje;
        const latitud = this.latitud;
        const longitud = this.longitud;
        const cantidad = this.pasajeros;
        const direccion = this.direccion;
        this.myService.setReserva(idPasajero,idViaje,latitud,longitud,direccion,cantidad)
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
            dialogs.alert({
                title: "Reserva confirmada!",
                message:"Tu servicio ha sido reservado exitosamente.",
                okButtonText: 'Gracias!'
            }).then(() => {
                this.routerExtensions.navigate(["/reservas"]);
            });
           
        }else{ 
            dialogs.alert({
                title: "Error de reserva",
                message:"Lo sentimos, hubo un problema realizando tu reserva. Por favor intenta nuevamente.",
                okButtonText: 'Ok'
            }).then(() => {
                this.routerExtensions.navigate(["/reservas"]);
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
    onMapReady(event) {
        console.log('Map Ready');

        

        let model = this;
        model.mapView = event.object;

        model.mapView.setStyle(<Style>(this.styles));
        model.setMarcador(model.latitude,model.longitude,'pasajero',2);
        
    }
    onCoordinateTapped(args) {

        //console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
    }

    onMarkerEvent(args) {
    } 

    onCameraChanged(args) {
        console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
        this.lastCamera = JSON.stringify(args.camera);
    }
    setMarcador(lat,lon,tipo,id){
        let model = this;
        console.log('Pintando marcador: '+lat+' - '+lon+' - '+tipo);
        var marker = new Marker();
        const image = new ImageModule.Image();
        image.width=20; 
        image.height=20; 
        if(tipo == 'inicio'){
            image.imageSource = imageSource.fromResource('inicio');  
            marker.title = "Punto de inicio";
        }else if(tipo == 'fin'){
            image.imageSource = imageSource.fromResource('fin');
            marker.title = "Punto final";
        }else if(tipo == 'pasajero'){
            marker.title = "Tu ubicación";  
            image.imageSource = imageSource.fromResource('pasajero');
            
        } 

        
        marker.position = Position.positionFromLatLng(lat, lon);
        marker.icon=image;
        marker.snippet = 'Descripción del punto';
        marker.userData = {index: 1,id: id};
        model.mapView.addMarker(marker); 
    }
}
