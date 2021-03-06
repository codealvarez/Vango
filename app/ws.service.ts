import { Injectable } from "@angular/core";
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import * as pl from 'google-polyline';
import * as platform from "platform";
/*import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";*/ 

@Injectable()
export class WebService {
    
    constructor(private http: HttpClient) { }

    getData(lat,lon,lat2,lon2,paradas) {
        var key = 'AIzaSyD-eKkwCJy0RbyZXBQSOxIWwY6U89Q1uU0';
        var waypoints = '';
        var coma = '%2C';
        var barra = '%7C';

        for(let i = 0; i < paradas.length; i++){
            if(paradas.length == (i-1)){
                waypoints += 'via:'+paradas[i][0].latitude+coma+paradas[i][0].longitude;
            }else{
                waypoints += 'via:'+paradas[i][0].latitude+coma+paradas[i][0].longitude+barra;    
            }
            
            //let waysDec = pl.encode([paradas[i][0],paradas[i][1]]);
            //console.log('Punto '+(i+1)+':'+[paradas[i][0],paradas[i][1]+' -- '+waysDec);
            console.log(JSON.stringify(paradas[i]));
            
        }
         
        var serverUrl = "https://maps.googleapis.com/maps/api/directions/json?origin="+lat+","+lon+"&destination="+lat2+","+lon2+"&waypoints="+waypoints+"&key="+key;
        //var serverUrl = "https://maps.googleapis.com/maps/api/directions/json?origin=4.7014128,-74.1466856&destination=4.6765584,-74.0536666&waypoints=via:Ricaurte,Bogot%C3%A1&key=AIzaSyD-eKkwCJy0RbyZXBQSOxIWwY6U89Q1uU0";
        console.log('Recibidos - Lat:'+lat+' - Lon: '+lon);
        console.log('URL: '+serverUrl);
        let headers = this.createRequestHeader();
        return this.http.get(serverUrl, { headers: headers })
            .pipe(map(res => res));
    } 

    getLogin(user,password) { 
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/valida_login_pasajero.aspx";
        
        console.log('Recibidos - User:'+user+' - Pass: '+password);
        let headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */

        return this.http.get(serverUrl, { params:{ codigousu:user, claveusu:password}, headers: headers })
            .pipe(map(res => res));
    }

    getClave(user) { 
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/recuperar_clave.aspx";
        
        let headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */

        return this.http.get(serverUrl, { params:{ codigousu:user}, headers: headers })
            .pipe(map(res => res));
    }

    guardarMensaje(user,asunto,mensaje) { 
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/guardar_mensaje.aspx";
        
        let headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */

        return this.http.get(serverUrl, { params:{ codigousu:user, asunto:asunto, mensaje:mensaje}, headers: headers })
            .pipe(map(res => res));
    }

    registrar(name,email,cedula,grupo) { 
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/registrar_usuario_pasajero.aspx";
        console.log('URL registro: '+serverUrl);

        let headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */

        if(!grupo){
            grupo = cedula;
        }
        console.log('Name: '+name+' - email: '+email+' - Cedula: '+cedula+' - Grupo: '+grupo);

        return this.http.get(serverUrl, { params:{ cedula:cedula, grupo:grupo, email:email, nombre:name}, headers: headers })
            .pipe(map(res => res));
    }
    enviarMensaje(asunto,mensaje,idUsuario) { 
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/registrar_mensaje_pasajero.aspx";
        console.log('URL registro: '+serverUrl);

        let headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */

        return this.http.get(serverUrl, { params:{ idpasajero:idUsuario, asunto:asunto, texto:mensaje}, headers: headers })
            .pipe(map(res => res));
    }

    actualizarDatos(nombre,email,idUsuario) { 
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/actualizar_datos_pasajero.aspx";
        console.log('URL registro: '+serverUrl);

        let headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */

        return this.http.get(serverUrl, { params:{ idpasajero:idUsuario, nombre:nombre, mail:email}, headers: headers })
            .pipe(map(res => res));
    }

    getRutasAsignadas(idUsuario) { 
        
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/listar_reservas_pasajero.aspx";
        
        let headers = this.createRequestHeader();

        return this.http.get(serverUrl, { params:{ idpasajero:idUsuario}, headers: headers })
            .pipe(map(res => res));
    }

    getMensajes() { 
        
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/traer_mensajes_predeterminados.aspx";
        
        let headers = this.createRequestHeader();

        return this.http.get(serverUrl, { params:{ origen:'pasajero',destino:'conductor'}, headers: headers })
            .pipe(map(res => res));
    }

    getTerminos() { 
        
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/traer_mensajes_predeterminados.aspx";
        
        let headers = this.createRequestHeader();

        return this.http.get(serverUrl, { params:{ origen:'TYC'}, headers: headers })
            .pipe(map(res => res));
    }

    getRutasDisponibles(idUsuario) { 
        //listar_viajes_rutas.aspx?idconductor=0&idpasajero=2&estado=PROGRAMADO
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/listar_rutas_disponibles.aspx";
        
        let headers = this.createRequestHeader();

        return this.http.get(serverUrl, { headers: headers })
            .pipe(map(res => res));
    }

    getViajesDisponibles(idRuta) { 
        //listar_viajes_rutas.aspx?idconductor=0&idpasajero=2&estado=PROGRAMADO
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/listar_viajes_rutas.aspx";
        
        let headers = this.createRequestHeader();

        return this.http.get(serverUrl, { params:{ idruta:idRuta}, headers: headers })
            .pipe(map(res => res));
    }

    getDatosViaje(idViaje,idPasajero) { 
        //listar_viajes_rutas.aspx?idconductor=0&idpasajero=2&estado=PROGRAMADO
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/consultar_datos_viaje.aspx";
        
        let headers = this.createRequestHeader();

        return this.http.get(serverUrl, { params:{ idviaje:idViaje,idpasajero:idPasajero}, headers: headers })
            .pipe(map(res => res));
    }

    getTokensConductor(idConductor) { 
        //listar_viajes_rutas.aspx?idconductor=0&idpasajero=2&estado=PROGRAMADO
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/traer_tokens_push.aspx";
        
        let headers = this.createRequestHeader();

        return this.http.get(serverUrl, { params:{ idpasajero:'0',idconductor:idConductor}, headers: headers })
            .pipe(map(res => res));
    }

    enviarPush(tokens,mensaje) { 

        console.log('Tokens recibidos');
        console.log(tokens);
        var serverUrl = "http://apps.emeraldstudio.co/imperial/servicios.php?mensaje="+mensaje;
        for(let i = 0; i < tokens.length; i++){
            serverUrl=serverUrl+('&tokens[]='+tokens[i])
        }
        console.log('URL a enviar');
        console.log(serverUrl);
        
        //listar_viajes_rutas.aspx?idconductor=0&idpasajero=2&estado=PROGRAMADO
        
        
        let headers = this.createRequestHeader();

        return this.http.get(serverUrl, { headers: headers })
            .pipe(map(res => res));
    }

    enviarPushCheckin(mensaje,tokens,idRuta,idViaje,idPasajero,nombrePasajero){
        console.log('Notificando al conductor el mensaje: '+mensaje+' a los tokens:');
        console.log(tokens);
        var serverUrl = "http://apps.emeraldstudio.co/imperial/servicios3.php?idpasajero="+idPasajero+"&idruta="+idRuta+"&idviaje="+idViaje+"&nombrepasajero="+encodeURI(nombrePasajero)+"&mensaje="+encodeURI(mensaje);
        for(let i = 0; i < tokens.length; i++){
            serverUrl=serverUrl+('&tokens[]='+tokens[i])
        }
        console.log('URL a enviar');
        console.log(serverUrl);
        
        //listar_viajes_rutas.aspx?idconductor=0&idpasajero=2&estado=PROGRAMADO
        
        
        let headers = this.createRequestHeader();

        return this.http.get(serverUrl, { headers: headers })
            .pipe(map(res => res));
    }

    getPuntosRuta(idRuta) { 
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/traer_paraderos_ruta.aspx";
        
        let headers = this.createRequestHeader();

        return this.http.get(serverUrl, { params:{ idruta:idRuta}, headers: headers })
            .pipe(map(res => res));
    }

    getPersonas(idViaje) { 
        
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/listar_reservas_viaje.aspx";
        console.log('Consultando paraderos del viaje: '+idViaje);
        
        let headers = this.createRequestHeader();

        return this.http.get(serverUrl, { params:{ idviaje:idViaje}, headers: headers })
            .pipe(map(res => res));
    }

    setReserva(idPasajero,idViaje,latitud,longitud,direccion,cantidad) { 
        //idPasajero,idViaje,latitud,longitud,direccion,cantidad
        console.log('Datos recibidos: ');
        console.log('idPasajero: '+idPasajero+' - idViaje: '+idViaje+' - cantidad: '+cantidad+' - direccion: '+direccion);
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/registrar_reserva.aspx";
        
        let headers = this.createRequestHeader();

        return this.http.get(serverUrl, { params:{ idpasajero:idPasajero, idviaje: idViaje, cantidad:cantidad, direccion: direccion, latitud:latitud, longitud:longitud}, headers: headers })
            .pipe(map(res => res));
    }

    registrarPasajero(idViaje,idPasajero,estado,latitud,longitud) { 
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/registrar_estado_pasajero_viaje.aspx";
        console.log('URL registro: '+serverUrl);

        let headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */

        return this.http.get(serverUrl, { params:{ idviaje:idViaje, idpasajero:idPasajero,estado:estado,latitud:latitud,longitud:longitud}, headers: headers })
            .pipe(map(res => res));
    }

    getUbicacionVehiculo(placa){
        console.log('Obteniendo ubicación del vehículo: '+placa);
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/datos_gps_placa.aspx";
        
        let headers = this.createRequestHeader();

        return this.http.get(serverUrl, { params:{ placa:placa}, headers: headers })
            .pipe(map(res => res));
    }

    getIdMember(user,password) { 
        var serverUrl = "https://secure.modipay.co/modicard/webresources/service/crearUsuario";
        
        console.log('Recibidos - User:'+user+' - Pass: '+password);
        let headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */

        return this.http.post(serverUrl, JSON.stringify({
                userE:'c@rpooling+', passE:'F3OZ3H@q*U',name:user,passwname:password
            }), { 
            headers: headers 
        }).pipe(map(res => res));
    }
    asignarIdMember(user,idMember) { 
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/registrar_idmodipay.aspx";
        //?idusuario=4&idmodipay=0
        console.log('Recibidos - User:'+user+' - idMember: '+idMember);
        let headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */

        return this.http.get(serverUrl, { params:{ idusuario:user,idmodipay:idMember}, headers: headers })
            .pipe(map(res => res));
    }
    getIdVango(cedula,email,nombre,empresa,idEmpresa) { 
        var serverUrl = "http://bimoney.co/vangoServices/webresources/service/registroMiembro";
        
        let headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */

        return this.http.post(serverUrl, JSON.stringify({
                userE:'c@rpooling+', 
                passE:'F3OZ3H@q*U',
                nombre:nombre,
                apellido:'',
                correo:email,
                password:cedula,
                ciudad:'Bogota',
                empresa:empresa,
                centrodecosto:'Centro Costo Prueba/Ciudad',
                referencia1:"Ref1 Prueba",
                referencia2:"Ref2 Prueba",
                referencia3:"Ref3 Prueba",
                fechadecaducidad:"",
                regladeConsumo:"",
                broker:idEmpresa,
                movil:""
            }), { 
            headers: headers 
        }).pipe(map(res => res));
    }
    getSaldo(idVango){
        var serverUrl = "http://bimoney.co/vangoServices/webresources/service/saldoVango";
        
        let headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */

        return this.http.post(serverUrl, JSON.stringify({
                userE:'c@rpooling+', 
                passE:'F3OZ3H@q*U',
                idtx:"11",
                idvango:idVango
                //idvango:"66053028"
            }), { 
            headers: headers 
        }).pipe(map(res => res));
    }
    getTransacciones(idVango){
        var serverUrl = "http://bimoney.co/vangoServices/webresources/service/historicoTx";
        
        let headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */

        return this.http.post(serverUrl, JSON.stringify({
                userE:'c@rpooling+', 
                passE:'F3OZ3H@q*U',
                idtx:"11",
                idvango:idVango
                //idvango:"66053028"
            }), { 
            headers: headers 
        }).pipe(map(res => res));
    }
    asignarIdVango(user,idVango) { 
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/registrar_idvango.aspx";
        //?idusuario=4&idmodipay=0
        console.log('Recibidos - User:'+user+' - idMember: '+idVango);
        let headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */

        return this.http.get(serverUrl, { params:{ idusuario:user,idvango:idVango}, headers: headers })
            .pipe(map(res => res));
    }
    getEmpresas() { 
        var serverUrl = "http://bimoney.co/vangoServices/webresources/service/vangoEmpresas";
        
        let headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */

        return this.http.post(serverUrl, JSON.stringify({
            userE:'c@rpooling+', 
            passE:'F3OZ3H@q*U'
        }), { headers: headers }).pipe(map(res => res));
    }
    registrarToken(token,idUsuario) { 
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/registrar_token_push.aspx";
        //?idusuario=4&idmodipay=0
        console.log('Recibidos - Token:'+token+' idUsuario: '+idUsuario);
        let plataforma;
        if (platform.isIOS) { 
          plataforma = 'iOS';
        }else{
          plataforma = 'Android';
        }
        let headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */

        return this.http.get(serverUrl, { params:{ idpasajero:idUsuario,idconductor:'0',sistema:plataforma,Token:token}, headers: headers })
            .pipe(map(res => res));
    }

    getTarjetas(idmember,password) { 
        var serverUrl = "https://secure.modipay.co/modicard/webresources/service/listarTarjetas";
        
        console.log('Recibidos - User:'+idmember+' - Pass: '+password);
        let headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */ 


        return this.http.post(
            serverUrl, { userE:"c@rpooling+", passE:"F3OZ3H@q*U",idmember:idmember,memberpassw:password}, {
                headers: headers 
            })
            .pipe(map(res => res));
    }
    agregarTarjeta(idmember,memberpassw,numero_tarjeta,vencimiento,franquicia,codigo_seguridad) { 
        var serverUrl = "https://secure.modipay.co/modicard/webresources/service/agregarTarjeta";
        
        let headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */ 


        return this.http.post(
            serverUrl, { 
                userE:"c@rpooling+", 
                passE:"F3OZ3H@q*U",
                idmember:idmember,
                memberpassw:memberpassw,
                direccion:'tokendir1234',
                numero_tarjeta:numero_tarjeta,
                vencimiento:vencimiento,
                franquicia:franquicia,
                codigo_seguridad:codigo_seguridad
            }, {
                headers: headers 
            })
            .pipe(map(res => res));
    }

    eliminarTarjeta(idmember,memberpassw,idtarjeta) { 
        var serverUrl = "https://secure.modipay.co/modicard/webresources/service/eliminarTarjeta";
        
        let headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)*/ 


        return this.http.post(
            serverUrl, { 
                userE:"c@rpooling+", 
                passE:"F3OZ3H@q*U",
                idmember:idmember,
                memberpassw:memberpassw,
                idcard:idtarjeta
            }, {
                headers: headers 
            })
            .pipe(map(res => res));
    }

    pagar(idmember,memberpassw,idtarjeta,valor) { 
        var serverUrl = "https://secure.modipay.co/modicard/webresources/service/pagoToken";
        
        let headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)*/ 


        return this.http.post(
            serverUrl, { 
                userE:"c@rpooling+", 
                passE:"F3OZ3H@q*U",
                idmember:idmember,
                memberpassw:memberpassw,
                idTarjeta:idtarjeta,
                cuotas:"1",
                valor:valor,
                subtotal:"0",
                impuestos:"0",
                costosdeenvio:"0",
                propina:"0",
                direccionIp:"192.168.34.21",
                pagador:"Carlos Cortesr",
                descripcion:"Descripción de la venta",
                referencia:"Pago de reserva - SeComparte",
                telefonodeenvio:"5640323",
                nombrecomprador:"Comprador",
                direccionenvio:"Av Calle 9",
                paisdeenvio:"Colombia ",
                codigopostaldeenvio:"169111",
                referencia1:"referencia 1 Aplicacion",
                referencia2:"referencia 2 Aplicacion",
                referencia3:"referencia 3 Aplicacion",
                tipodeidentificacion:"Cedula Ciudadania",
                nodeIdentificacion:"111111111",
                correoNotificacion:"daniel07079@gmail.com"
            }, {
                headers: headers 
            })
            .pipe(map(res => res));
    }

    pagarConSaldo(idVango,valor) { 
        var serverUrl = "http://bimoney.co/vangoServices/webresources/service/pagosVango";
        
        let headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)*/ 


        return this.http.post(
            serverUrl, { 
                userE:"c@rpooling+",
                passE:"F3OZ3H@q*U",
                idvango:idVango,
                valor:valor,
                description:"",
                transferTypeId:"",
                origen:"2018-08-10 10:37:17|HOTEL NH LA BOHEME, CALLE 82, BOGOTÁ, COLOMBIA",
                destino:"2018-08-10 10:38:28|ANDRÉS CARNE DE RES, CHIA, CUNDINAMARCA, COLOMBIA",
                viajastecon:"Nombre Completo Conductor",
                placa:"Placa van",
                modelo:"VAN Mercedez",
                km:"3,34 Km",
                tiempodelviaje:"45 Minutos",
                ruta:"Geoposicion",
                recargo:"0      /    4,500",
                descuento:"0   /     4,000",
                cortesia:"0  /   1,500.00",
                reserva:"434234",
                valeDigital:"codigo de vale si es necesario",
                puntosRedimidos:"33 Puntos",
                calificacion:"5",
                descripcion:"reunion",
                geoPosicion:"geoPosicion",
                validadorGPS:"imei equipo",
                idServicio:"codigo integracion con otros sistemas"
            }, {
                headers: headers 
            })
            .pipe(map(res => res));
    }

    /*getResponseInfo() {
        let headers = this.createRequestHeader();
        return this.http.get(this.serverUrl, { headers: headers })
            .do(res =>  res);
    }*/

    private createRequestHeader() {
        // set headers here e.g.
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
         });

        return headers;
    }
}