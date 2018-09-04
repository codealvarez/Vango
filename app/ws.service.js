"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var http_1 = require("@angular/common/http");
var platform = require("platform");
/*import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";*/
var WebService = /** @class */ (function () {
    function WebService(http) {
        this.http = http;
    }
    WebService.prototype.getData = function (lat, lon, lat2, lon2, paradas) {
        var key = 'AIzaSyD-eKkwCJy0RbyZXBQSOxIWwY6U89Q1uU0';
        var waypoints = '';
        var coma = '%2C';
        var barra = '%7C';
        for (var i = 0; i < paradas.length; i++) {
            if (paradas.length == (i - 1)) {
                waypoints += 'via:' + paradas[i][0].latitude + coma + paradas[i][0].longitude;
            }
            else {
                waypoints += 'via:' + paradas[i][0].latitude + coma + paradas[i][0].longitude + barra;
            }
            //let waysDec = pl.encode([paradas[i][0],paradas[i][1]]);
            //console.log('Punto '+(i+1)+':'+[paradas[i][0],paradas[i][1]+' -- '+waysDec);
            console.log(JSON.stringify(paradas[i]));
        }
        var serverUrl = "https://maps.googleapis.com/maps/api/directions/json?origin=" + lat + "," + lon + "&destination=" + lat2 + "," + lon2 + "&waypoints=" + waypoints + "&key=" + key;
        //var serverUrl = "https://maps.googleapis.com/maps/api/directions/json?origin=4.7014128,-74.1466856&destination=4.6765584,-74.0536666&waypoints=via:Ricaurte,Bogot%C3%A1&key=AIzaSyD-eKkwCJy0RbyZXBQSOxIWwY6U89Q1uU0";
        console.log('Recibidos - Lat:' + lat + ' - Lon: ' + lon);
        console.log('URL: ' + serverUrl);
        var headers = this.createRequestHeader();
        return this.http.get(serverUrl, { headers: headers })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.getLogin = function (user, password) {
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/valida_login_pasajero.aspx";
        console.log('Recibidos - User:' + user + ' - Pass: ' + password);
        var headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */
        return this.http.get(serverUrl, { params: { codigousu: user, claveusu: '0' }, headers: headers })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.registrar = function (name, email, cedula, grupo) {
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/registrar_usuario_pasajero.aspx";
        console.log('URL registro: ' + serverUrl);
        var headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */
        if (!grupo) {
            grupo = cedula;
        }
        console.log('Name: ' + name + ' - email: ' + email + ' - Cedula: ' + cedula + ' - Grupo: ' + grupo);
        return this.http.get(serverUrl, { params: { cedula: cedula, grupo: grupo, email: email, nombre: name }, headers: headers })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.enviarMensaje = function (asunto, mensaje, idUsuario) {
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/registrar_mensaje_pasajero.aspx";
        console.log('URL registro: ' + serverUrl);
        var headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */
        return this.http.get(serverUrl, { params: { idpasajero: idUsuario, asunto: asunto, texto: mensaje }, headers: headers })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.actualizarDatos = function (nombre, email, idUsuario) {
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/actualizar_datos_pasajero.aspx";
        console.log('URL registro: ' + serverUrl);
        var headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */
        return this.http.get(serverUrl, { params: { idpasajero: idUsuario, nombre: nombre, mail: email }, headers: headers })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.getRutasAsignadas = function (idUsuario) {
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/listar_reservas_pasajero.aspx";
        var headers = this.createRequestHeader();
        return this.http.get(serverUrl, { params: { idpasajero: idUsuario }, headers: headers })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.getMensajes = function () {
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/traer_mensajes_predeterminados.aspx";
        var headers = this.createRequestHeader();
        return this.http.get(serverUrl, { params: { origen: 'pasajero', destino: 'conductor' }, headers: headers })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.getRutasDisponibles = function (idUsuario) {
        //listar_viajes_rutas.aspx?idconductor=0&idpasajero=2&estado=PROGRAMADO
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/listar_rutas_disponibles.aspx";
        var headers = this.createRequestHeader();
        return this.http.get(serverUrl, { headers: headers })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.getViajesDisponibles = function (idRuta) {
        //listar_viajes_rutas.aspx?idconductor=0&idpasajero=2&estado=PROGRAMADO
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/listar_viajes_rutas.aspx";
        var headers = this.createRequestHeader();
        return this.http.get(serverUrl, { params: { idruta: idRuta }, headers: headers })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.getDatosViaje = function (idViaje) {
        //listar_viajes_rutas.aspx?idconductor=0&idpasajero=2&estado=PROGRAMADO
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/consultar_datos_viaje.aspx";
        var headers = this.createRequestHeader();
        return this.http.get(serverUrl, { params: { idviaje: idViaje }, headers: headers })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.getTokensConductor = function (idConductor) {
        //listar_viajes_rutas.aspx?idconductor=0&idpasajero=2&estado=PROGRAMADO
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/traer_tokens_push.aspx";
        var headers = this.createRequestHeader();
        return this.http.get(serverUrl, { params: { idpasajero: '0', idconductor: idConductor }, headers: headers })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.enviarPush = function (tokens, mensaje) {
        console.log('Tokens recibidos');
        console.log(tokens);
        var serverUrl = "http://apps.emeraldstudio.co/imperial/servicios.php?mensaje=" + mensaje;
        for (var i = 0; i < tokens.length; i++) {
            serverUrl = serverUrl + ('&tokens[]=' + tokens[i]);
        }
        console.log('URL a enviar');
        console.log(serverUrl);
        //listar_viajes_rutas.aspx?idconductor=0&idpasajero=2&estado=PROGRAMADO
        var headers = this.createRequestHeader();
        return this.http.get(serverUrl, { headers: headers })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.enviarPushCheckin = function (mensaje, tokens, idRuta, idViaje, idPasajero, nombrePasajero) {
        console.log('Notificando al conductor el mensaje: ' + mensaje + ' a los tokens:');
        console.log(tokens);
        var serverUrl = "http://apps.emeraldstudio.co/imperial/servicios3.php?idpasajero=" + idPasajero + "&idruta=" + idRuta + "&idviaje=" + idViaje + "&nombrepasajero=" + encodeURI(nombrePasajero) + "&mensaje=" + encodeURI(mensaje);
        for (var i = 0; i < tokens.length; i++) {
            serverUrl = serverUrl + ('&tokens[]=' + tokens[i]);
        }
        console.log('URL a enviar');
        console.log(serverUrl);
        //listar_viajes_rutas.aspx?idconductor=0&idpasajero=2&estado=PROGRAMADO
        var headers = this.createRequestHeader();
        return this.http.get(serverUrl, { headers: headers })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.getPuntosRuta = function (idRuta) {
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/traer_paraderos_ruta.aspx";
        var headers = this.createRequestHeader();
        return this.http.get(serverUrl, { params: { idruta: idRuta }, headers: headers })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.getPersonas = function (idViaje) {
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/listar_reservas_viaje.aspx";
        console.log('Consultando paraderos del viaje: ' + idViaje);
        var headers = this.createRequestHeader();
        return this.http.get(serverUrl, { params: { idviaje: idViaje }, headers: headers })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.setReserva = function (idPasajero, idViaje, latitud, longitud, direccion, cantidad) {
        //idPasajero,idViaje,latitud,longitud,direccion,cantidad
        console.log('Datos recibidos: ');
        console.log('idPasajero: ' + idPasajero + ' - idViaje: ' + idViaje + ' - cantidad: ' + cantidad + ' - direccion: ' + direccion);
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/registrar_reserva.aspx";
        var headers = this.createRequestHeader();
        return this.http.get(serverUrl, { params: { idpasajero: idPasajero, idviaje: idViaje, cantidad: cantidad, direccion: direccion, latitud: latitud, longitud: longitud }, headers: headers })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.registrarPasajero = function (idViaje, idPasajero, estado, latitud, longitud) {
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/registrar_estado_pasajero_viaje.aspx";
        console.log('URL registro: ' + serverUrl);
        var headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */
        return this.http.get(serverUrl, { params: { idviaje: idViaje, idpasajero: idPasajero, estado: estado, latitud: latitud, longitud: longitud }, headers: headers })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.getUbicacionVehiculo = function (placa) {
        console.log('Obteniendo ubicación del vehículo: ' + placa);
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/datos_gps_placa.aspx";
        var headers = this.createRequestHeader();
        return this.http.get(serverUrl, { params: { placa: placa }, headers: headers })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.getIdMember = function (user, password) {
        var serverUrl = "https://secure.modipay.co/modicard/webresources/service/crearUsuario";
        console.log('Recibidos - User:' + user + ' - Pass: ' + password);
        var headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */
        return this.http.post(serverUrl, JSON.stringify({
            userE: 'c@rpooling+', passE: 'F3OZ3H@q*U', name: user, passwname: password
        }), {
            headers: headers
        }).pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.asignarIdMember = function (user, idMember) {
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/registrar_idmodipay.aspx";
        //?idusuario=4&idmodipay=0
        console.log('Recibidos - User:' + user + ' - idMember: ' + idMember);
        var headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */
        return this.http.get(serverUrl, { params: { idusuario: user, idmodipay: idMember }, headers: headers })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.registrarToken = function (token, idUsuario) {
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/registrar_token_push.aspx";
        //?idusuario=4&idmodipay=0
        console.log('Recibidos - Token:' + token + ' idUsuario: ' + idUsuario);
        var plataforma;
        if (platform.isIOS) {
            plataforma = 'iOS';
        }
        else {
            plataforma = 'Android';
        }
        var headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */
        return this.http.get(serverUrl, { params: { idpasajero: idUsuario, idconductor: '0', sistema: plataforma, Token: token }, headers: headers })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.getTarjetas = function (idmember, password) {
        var serverUrl = "https://secure.modipay.co/modicard/webresources/service/listarTarjetas";
        console.log('Recibidos - User:' + idmember + ' - Pass: ' + password);
        var headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */
        return this.http.post(serverUrl, { userE: "c@rpooling+", passE: "F3OZ3H@q*U", idmember: idmember, memberpassw: password }, {
            headers: headers
        })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.agregarTarjeta = function (idmember, memberpassw, numero_tarjeta, vencimiento, franquicia, codigo_seguridad) {
        var serverUrl = "https://secure.modipay.co/modicard/webresources/service/agregarTarjeta";
        var headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */
        return this.http.post(serverUrl, {
            userE: "c@rpooling+",
            passE: "F3OZ3H@q*U",
            idmember: idmember,
            memberpassw: memberpassw,
            direccion: 'tokendir1234',
            numero_tarjeta: numero_tarjeta,
            vencimiento: vencimiento,
            franquicia: franquicia,
            codigo_seguridad: codigo_seguridad
        }, {
            headers: headers
        })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.eliminarTarjeta = function (idmember, memberpassw, idtarjeta) {
        var serverUrl = "https://secure.modipay.co/modicard/webresources/service/eliminarTarjeta";
        var headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)*/
        return this.http.post(serverUrl, {
            userE: "c@rpooling+",
            passE: "F3OZ3H@q*U",
            idmember: idmember,
            memberpassw: memberpassw,
            idcard: idtarjeta
        }, {
            headers: headers
        })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.pagar = function (idmember, memberpassw, idtarjeta, valor) {
        var serverUrl = "https://secure.modipay.co/modicard/webresources/service/pagoToken";
        var headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)*/
        return this.http.post(serverUrl, {
            userE: "c@rpooling+",
            passE: "F3OZ3H@q*U",
            idmember: idmember,
            memberpassw: memberpassw,
            idTarjeta: idtarjeta,
            cuotas: "1",
            valor: valor,
            subtotal: "0",
            impuestos: "0",
            costosdeenvio: "0",
            propina: "0",
            direccionIp: "192.168.34.21",
            pagador: "Carlos Cortesr",
            descripcion: "Descripción de la venta",
            referencia: "Pago de reserva - SeComparte",
            telefonodeenvio: "5640323",
            nombrecomprador: "Comprador",
            direccionenvio: "Av Calle 9",
            paisdeenvio: "Colombia ",
            codigopostaldeenvio: "169111",
            referencia1: "referencia 1 Aplicacion",
            referencia2: "referencia 2 Aplicacion",
            referencia3: "referencia 3 Aplicacion",
            tipodeidentificacion: "Cedula Ciudadania",
            nodeIdentificacion: "111111111",
            correoNotificacion: "daniel07079@gmail.com"
        }, {
            headers: headers
        })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    /*getResponseInfo() {
        let headers = this.createRequestHeader();
        return this.http.get(this.serverUrl, { headers: headers })
            .do(res =>  res);
    }*/
    WebService.prototype.createRequestHeader = function () {
        // set headers here e.g.
        var headers = new http_1.HttpHeaders({
            "Content-Type": "application/json",
        });
        return headers;
    };
    WebService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], WebService);
    return WebService;
}());
exports.WebService = WebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0MsNENBQXdEO0FBQ3hELDZDQUE2RTtBQUU3RSxtQ0FBcUM7QUFDckM7O2dDQUVnQztBQUdoQztJQUVJLG9CQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO0lBQUksQ0FBQztJQUV6Qyw0QkFBTyxHQUFQLFVBQVEsR0FBRyxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE9BQU87UUFDN0IsSUFBSSxHQUFHLEdBQUcseUNBQXlDLENBQUM7UUFDcEQsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNqQixJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFbEIsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDLENBQUM7WUFDcEMsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUM7Z0JBQ3hCLFNBQVMsSUFBSSxNQUFNLEdBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBQyxJQUFJLEdBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUM1RSxDQUFDO1lBQUEsSUFBSSxDQUFBLENBQUM7Z0JBQ0YsU0FBUyxJQUFJLE1BQU0sR0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFDLElBQUksR0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxH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LEVBQUMsS0FBSztZQUNYLFFBQVEsRUFBQyxHQUFHO1lBQ1osU0FBUyxFQUFDLEdBQUc7WUFDYixhQUFhLEVBQUMsR0FBRztZQUNqQixPQUFPLEVBQUMsR0FBRztZQUNYLFdBQVcsRUFBQyxlQUFlO1lBQzNCLE9BQU8sRUFBQyxnQkFBZ0I7WUFDeEIsV0FBVyxFQUFDLHlCQUF5QjtZQUNyQyxVQUFVLEVBQUMsOEJBQThCO1lBQ3pDLGVBQWUsRUFBQyxTQUFTO1lBQ3pCLGVBQWUsRUFBQyxXQUFXO1lBQzNCLGNBQWMsRUFBQyxZQUFZO1lBQzNCLFdBQVcsRUFBQyxXQUFXO1lBQ3ZCLG1CQUFtQixFQUFDLFFBQVE7WUFDNUIsV0FBVyxFQUFDLHlCQUF5QjtZQUNyQyxXQUFXLEVBQUMseUJBQXlCO1lBQ3JDLFdBQVcsRUFBQyx5QkFBeUI7WUFDckMsb0JBQW9CLEVBQUMsbUJBQW1CO1lBQ3hDLGtCQUFrQixFQUFDLFdBQVc7WUFDOUIsa0JBQWtCLEVBQUMsdUJBQXVCO1NBQzdDLEVBQUU7WUFDQyxPQUFPLEVBQUUsT0FBTztTQUNuQixDQUFDO2FBQ0QsSUFBSSxDQUFDLGVBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRDs7OztPQUlHO0lBRUssd0NBQW1CLEdBQTNCO1FBQ0ksd0JBQXdCO1FBQ3hCLElBQUksT0FBTyxHQUFHLElBQUksa0JBQVcsQ0FBQztZQUMxQixjQUFjLEVBQUUsa0JBQWtCO1NBQ3BDLENBQUMsQ0FBQztRQUVKLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQTFZUSxVQUFVO1FBRHRCLGlCQUFVLEVBQUU7eUNBR2lCLGlCQUFVO09BRjNCLFVBQVUsQ0EyWXRCO0lBQUQsaUJBQUM7Q0FBQSxBQTNZRCxJQTJZQztBQTNZWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgUmVwbGF5U3ViamVjdCwgZnJvbSwgb2YsIHJhbmdlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIGZpbHRlciwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0ICogYXMgcGwgZnJvbSAnZ29vZ2xlLXBvbHlsaW5lJztcbmltcG9ydCAqIGFzIHBsYXRmb3JtIGZyb20gXCJwbGF0Zm9ybVwiO1xuLyppbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2NhdGNoXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiOyovIFxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV2ViU2VydmljZSB7XG4gICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IH1cblxuICAgIGdldERhdGEobGF0LGxvbixsYXQyLGxvbjIscGFyYWRhcykge1xuICAgICAgICB2YXIga2V5ID0gJ0FJemFTeUQtZUtrd0NKeTBSYnlaWEJRU094SVd3WTZVODlRMXVVMCc7XG4gICAgICAgIHZhciB3YXlwb2ludHMgPSAnJztcbiAgICAgICAgdmFyIGNvbWEgPSAnJTJDJztcbiAgICAgICAgdmFyIGJhcnJhID0gJyU3Qyc7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBhcmFkYXMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgaWYocGFyYWRhcy5sZW5ndGggPT0gKGktMSkpe1xuICAgICAgICAgICAgICAgIHdheXBvaW50cyArPSAndmlhOicrcGFyYWRhc1tpXVswXS5sYXRpdHVkZStjb21hK3BhcmFkYXNbaV1bMF0ubG9uZ2l0dWRlO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgd2F5cG9pbnRzICs9ICd2aWE6JytwYXJhZGFzW2ldWzBdLmxhdGl0dWRlK2NvbWErcGFyYWRhc1tpXVswXS5sb25naXR1ZGUrYmFycmE7ICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL2xldCB3YXlzRGVjID0gcGwuZW5jb2RlKFtwYXJhZGFzW2ldWzBdLHBhcmFkYXNbaV1bMV1dKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ1B1bnRvICcrKGkrMSkrJzonK1twYXJhZGFzW2ldWzBdLHBhcmFkYXNbaV1bMV0rJyAtLSAnK3dheXNEZWMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocGFyYWRhc1tpXSkpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgIFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvZGlyZWN0aW9ucy9qc29uP29yaWdpbj1cIitsYXQrXCIsXCIrbG9uK1wiJmRlc3RpbmF0aW9uPVwiK2xhdDIrXCIsXCIrbG9uMitcIiZ3YXlwb2ludHM9XCIrd2F5cG9pbnRzK1wiJmtleT1cIitrZXk7XG4gICAgICAgIC8vdmFyIHNlcnZlclVybCA9IFwiaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2RpcmVjdGlvbnMvanNvbj9vcmlnaW49NC43MDE0MTI4LC03NC4xNDY2ODU2JmRlc3RpbmF0aW9uPTQuNjc2NTU4NCwtNzQuMDUzNjY2NiZ3YXlwb2ludHM9dmlhOlJpY2F1cnRlLEJvZ290JUMzJUExJmtleT1BSXphU3lELWVLa3dDSnkwUmJ5WlhCUVNPeElXd1k2VTg5UTF1VTBcIjtcbiAgICAgICAgY29uc29sZS5sb2coJ1JlY2liaWRvcyAtIExhdDonK2xhdCsnIC0gTG9uOiAnK2xvbik7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVUkw6ICcrc2VydmVyVXJsKTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfSBcblxuICAgIGdldExvZ2luKHVzZXIscGFzc3dvcmQpIHsgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy92YWxpZGFfbG9naW5fcGFzYWplcm8uYXNweFwiO1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coJ1JlY2liaWRvcyAtIFVzZXI6Jyt1c2VyKycgLSBQYXNzOiAnK3Bhc3N3b3JkKTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgLypyZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwpXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMpOyAqL1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBwYXJhbXM6eyBjb2RpZ291c3U6dXNlciwgY2xhdmV1c3U6JzAnfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICByZWdpc3RyYXIobmFtZSxlbWFpbCxjZWR1bGEsZ3J1cG8pIHsgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy9yZWdpc3RyYXJfdXN1YXJpb19wYXNhamVyby5hc3B4XCI7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVUkwgcmVnaXN0cm86ICcrc2VydmVyVXJsKTtcblxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybClcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7ICovXG5cbiAgICAgICAgaWYoIWdydXBvKXtcbiAgICAgICAgICAgIGdydXBvID0gY2VkdWxhO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCdOYW1lOiAnK25hbWUrJyAtIGVtYWlsOiAnK2VtYWlsKycgLSBDZWR1bGE6ICcrY2VkdWxhKycgLSBHcnVwbzogJytncnVwbyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IGNlZHVsYTpjZWR1bGEsIGdydXBvOmdydXBvLCBlbWFpbDplbWFpbCwgbm9tYnJlOm5hbWV9LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cbiAgICBlbnZpYXJNZW5zYWplKGFzdW50byxtZW5zYWplLGlkVXN1YXJpbykgeyBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2N0Y2FycG9vbGltcC5jbG91ZGFwcC5uZXQvY2FycG9vbHNlcnZpY2VzL3JlZ2lzdHJhcl9tZW5zYWplX3Bhc2FqZXJvLmFzcHhcIjtcbiAgICAgICAgY29uc29sZS5sb2coJ1VSTCByZWdpc3RybzogJytzZXJ2ZXJVcmwpO1xuXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTsgKi9cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgcGFyYW1zOnsgaWRwYXNhamVybzppZFVzdWFyaW8sIGFzdW50bzphc3VudG8sIHRleHRvOm1lbnNhamV9LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIGFjdHVhbGl6YXJEYXRvcyhub21icmUsZW1haWwsaWRVc3VhcmlvKSB7IFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvYWN0dWFsaXphcl9kYXRvc19wYXNhamVyby5hc3B4XCI7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVUkwgcmVnaXN0cm86ICcrc2VydmVyVXJsKTtcblxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybClcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7ICovXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IGlkcGFzYWplcm86aWRVc3VhcmlvLCBub21icmU6bm9tYnJlLCBtYWlsOmVtYWlsfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBnZXRSdXRhc0FzaWduYWRhcyhpZFVzdWFyaW8pIHsgXG4gICAgICAgIFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvbGlzdGFyX3Jlc2VydmFzX3Bhc2FqZXJvLmFzcHhcIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IGlkcGFzYWplcm86aWRVc3VhcmlvfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBnZXRNZW5zYWplcygpIHsgXG4gICAgICAgIFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvdHJhZXJfbWVuc2FqZXNfcHJlZGV0ZXJtaW5hZG9zLmFzcHhcIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IG9yaWdlbjoncGFzYWplcm8nLGRlc3Rpbm86J2NvbmR1Y3Rvcid9LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIGdldFJ1dGFzRGlzcG9uaWJsZXMoaWRVc3VhcmlvKSB7IFxuICAgICAgICAvL2xpc3Rhcl92aWFqZXNfcnV0YXMuYXNweD9pZGNvbmR1Y3Rvcj0wJmlkcGFzYWplcm89MiZlc3RhZG89UFJPR1JBTUFET1xuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvbGlzdGFyX3J1dGFzX2Rpc3BvbmlibGVzLmFzcHhcIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgZ2V0VmlhamVzRGlzcG9uaWJsZXMoaWRSdXRhKSB7IFxuICAgICAgICAvL2xpc3Rhcl92aWFqZXNfcnV0YXMuYXNweD9pZGNvbmR1Y3Rvcj0wJmlkcGFzYWplcm89MiZlc3RhZG89UFJPR1JBTUFET1xuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvbGlzdGFyX3ZpYWplc19ydXRhcy5hc3B4XCI7XG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBwYXJhbXM6eyBpZHJ1dGE6aWRSdXRhfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBnZXREYXRvc1ZpYWplKGlkVmlhamUpIHsgXG4gICAgICAgIC8vbGlzdGFyX3ZpYWplc19ydXRhcy5hc3B4P2lkY29uZHVjdG9yPTAmaWRwYXNhamVybz0yJmVzdGFkbz1QUk9HUkFNQURPXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy9jb25zdWx0YXJfZGF0b3NfdmlhamUuYXNweFwiO1xuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgcGFyYW1zOnsgaWR2aWFqZTppZFZpYWplfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBnZXRUb2tlbnNDb25kdWN0b3IoaWRDb25kdWN0b3IpIHsgXG4gICAgICAgIC8vbGlzdGFyX3ZpYWplc19ydXRhcy5hc3B4P2lkY29uZHVjdG9yPTAmaWRwYXNhamVybz0yJmVzdGFkbz1QUk9HUkFNQURPXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy90cmFlcl90b2tlbnNfcHVzaC5hc3B4XCI7XG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBwYXJhbXM6eyBpZHBhc2FqZXJvOicwJyxpZGNvbmR1Y3RvcjppZENvbmR1Y3Rvcn0sIGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgZW52aWFyUHVzaCh0b2tlbnMsbWVuc2FqZSkgeyBcblxuICAgICAgICBjb25zb2xlLmxvZygnVG9rZW5zIHJlY2liaWRvcycpO1xuICAgICAgICBjb25zb2xlLmxvZyh0b2tlbnMpO1xuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vYXBwcy5lbWVyYWxkc3R1ZGlvLmNvL2ltcGVyaWFsL3NlcnZpY2lvcy5waHA/bWVuc2FqZT1cIittZW5zYWplO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIHNlcnZlclVybD1zZXJ2ZXJVcmwrKCcmdG9rZW5zW109Jyt0b2tlbnNbaV0pXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ1VSTCBhIGVudmlhcicpO1xuICAgICAgICBjb25zb2xlLmxvZyhzZXJ2ZXJVcmwpO1xuICAgICAgICBcbiAgICAgICAgLy9saXN0YXJfdmlhamVzX3J1dGFzLmFzcHg/aWRjb25kdWN0b3I9MCZpZHBhc2FqZXJvPTImZXN0YWRvPVBST0dSQU1BRE9cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIGVudmlhclB1c2hDaGVja2luKG1lbnNhamUsdG9rZW5zLGlkUnV0YSxpZFZpYWplLGlkUGFzYWplcm8sbm9tYnJlUGFzYWplcm8pe1xuICAgICAgICBjb25zb2xlLmxvZygnTm90aWZpY2FuZG8gYWwgY29uZHVjdG9yIGVsIG1lbnNhamU6ICcrbWVuc2FqZSsnIGEgbG9zIHRva2VuczonKTtcbiAgICAgICAgY29uc29sZS5sb2codG9rZW5zKTtcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2FwcHMuZW1lcmFsZHN0dWRpby5jby9pbXBlcmlhbC9zZXJ2aWNpb3MzLnBocD9pZHBhc2FqZXJvPVwiK2lkUGFzYWplcm8rXCImaWRydXRhPVwiK2lkUnV0YStcIiZpZHZpYWplPVwiK2lkVmlhamUrXCImbm9tYnJlcGFzYWplcm89XCIrZW5jb2RlVVJJKG5vbWJyZVBhc2FqZXJvKStcIiZtZW5zYWplPVwiK2VuY29kZVVSSShtZW5zYWplKTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBzZXJ2ZXJVcmw9c2VydmVyVXJsKygnJnRva2Vuc1tdPScrdG9rZW5zW2ldKVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCdVUkwgYSBlbnZpYXInKTtcbiAgICAgICAgY29uc29sZS5sb2coc2VydmVyVXJsKTtcbiAgICAgICAgXG4gICAgICAgIC8vbGlzdGFyX3ZpYWplc19ydXRhcy5hc3B4P2lkY29uZHVjdG9yPTAmaWRwYXNhamVybz0yJmVzdGFkbz1QUk9HUkFNQURPXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBnZXRQdW50b3NSdXRhKGlkUnV0YSkgeyBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2N0Y2FycG9vbGltcC5jbG91ZGFwcC5uZXQvY2FycG9vbHNlcnZpY2VzL3RyYWVyX3BhcmFkZXJvc19ydXRhLmFzcHhcIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IGlkcnV0YTppZFJ1dGF9LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIGdldFBlcnNvbmFzKGlkVmlhamUpIHsgXG4gICAgICAgIFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvbGlzdGFyX3Jlc2VydmFzX3ZpYWplLmFzcHhcIjtcbiAgICAgICAgY29uc29sZS5sb2coJ0NvbnN1bHRhbmRvIHBhcmFkZXJvcyBkZWwgdmlhamU6ICcraWRWaWFqZSk7XG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBwYXJhbXM6eyBpZHZpYWplOmlkVmlhamV9LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIHNldFJlc2VydmEoaWRQYXNhamVybyxpZFZpYWplLGxhdGl0dWQsbG9uZ2l0dWQsZGlyZWNjaW9uLGNhbnRpZGFkKSB7IFxuICAgICAgICAvL2lkUGFzYWplcm8saWRWaWFqZSxsYXRpdHVkLGxvbmdpdHVkLGRpcmVjY2lvbixjYW50aWRhZFxuICAgICAgICBjb25zb2xlLmxvZygnRGF0b3MgcmVjaWJpZG9zOiAnKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2lkUGFzYWplcm86ICcraWRQYXNhamVybysnIC0gaWRWaWFqZTogJytpZFZpYWplKycgLSBjYW50aWRhZDogJytjYW50aWRhZCsnIC0gZGlyZWNjaW9uOiAnK2RpcmVjY2lvbik7XG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy9yZWdpc3RyYXJfcmVzZXJ2YS5hc3B4XCI7XG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBwYXJhbXM6eyBpZHBhc2FqZXJvOmlkUGFzYWplcm8sIGlkdmlhamU6IGlkVmlhamUsIGNhbnRpZGFkOmNhbnRpZGFkLCBkaXJlY2Npb246IGRpcmVjY2lvbiwgbGF0aXR1ZDpsYXRpdHVkLCBsb25naXR1ZDpsb25naXR1ZH0sIGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgcmVnaXN0cmFyUGFzYWplcm8oaWRWaWFqZSxpZFBhc2FqZXJvLGVzdGFkbyxsYXRpdHVkLGxvbmdpdHVkKSB7IFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvcmVnaXN0cmFyX2VzdGFkb19wYXNhamVyb192aWFqZS5hc3B4XCI7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVUkwgcmVnaXN0cm86ICcrc2VydmVyVXJsKTtcblxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybClcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7ICovXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IGlkdmlhamU6aWRWaWFqZSwgaWRwYXNhamVybzppZFBhc2FqZXJvLGVzdGFkbzplc3RhZG8sbGF0aXR1ZDpsYXRpdHVkLGxvbmdpdHVkOmxvbmdpdHVkfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBnZXRVYmljYWNpb25WZWhpY3VsbyhwbGFjYSl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdPYnRlbmllbmRvIHViaWNhY2nDs24gZGVsIHZlaMOtY3VsbzogJytwbGFjYSk7XG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy9kYXRvc19ncHNfcGxhY2EuYXNweFwiO1xuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgcGFyYW1zOnsgcGxhY2E6cGxhY2F9LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIGdldElkTWVtYmVyKHVzZXIscGFzc3dvcmQpIHsgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHBzOi8vc2VjdXJlLm1vZGlwYXkuY28vbW9kaWNhcmQvd2VicmVzb3VyY2VzL3NlcnZpY2UvY3JlYXJVc3VhcmlvXCI7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZygnUmVjaWJpZG9zIC0gVXNlcjonK3VzZXIrJyAtIFBhc3M6ICcrcGFzc3dvcmQpO1xuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybClcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7ICovXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHNlcnZlclVybCwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIHVzZXJFOidjQHJwb29saW5nKycsIHBhc3NFOidGM09aM0hAcSpVJyxuYW1lOnVzZXIscGFzc3duYW1lOnBhc3N3b3JkXG4gICAgICAgICAgICB9KSwgeyBcbiAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMgXG4gICAgICAgIH0pLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG4gICAgYXNpZ25hcklkTWVtYmVyKHVzZXIsaWRNZW1iZXIpIHsgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy9yZWdpc3RyYXJfaWRtb2RpcGF5LmFzcHhcIjtcbiAgICAgICAgLy8/aWR1c3VhcmlvPTQmaWRtb2RpcGF5PTBcbiAgICAgICAgY29uc29sZS5sb2coJ1JlY2liaWRvcyAtIFVzZXI6Jyt1c2VyKycgLSBpZE1lbWJlcjogJytpZE1lbWJlcik7XG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTsgKi9cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgcGFyYW1zOnsgaWR1c3VhcmlvOnVzZXIsaWRtb2RpcGF5OmlkTWVtYmVyfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG4gICAgcmVnaXN0cmFyVG9rZW4odG9rZW4saWRVc3VhcmlvKSB7IFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvcmVnaXN0cmFyX3Rva2VuX3B1c2guYXNweFwiO1xuICAgICAgICAvLz9pZHVzdWFyaW89NCZpZG1vZGlwYXk9MFxuICAgICAgICBjb25zb2xlLmxvZygnUmVjaWJpZG9zIC0gVG9rZW46Jyt0b2tlbisnIGlkVXN1YXJpbzogJytpZFVzdWFyaW8pO1xuICAgICAgICBsZXQgcGxhdGFmb3JtYTtcbiAgICAgICAgaWYgKHBsYXRmb3JtLmlzSU9TKSB7IFxuICAgICAgICAgIHBsYXRhZm9ybWEgPSAnaU9TJztcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgcGxhdGFmb3JtYSA9ICdBbmRyb2lkJztcbiAgICAgICAgfVxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybClcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7ICovXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IGlkcGFzYWplcm86aWRVc3VhcmlvLGlkY29uZHVjdG9yOicwJyxzaXN0ZW1hOnBsYXRhZm9ybWEsVG9rZW46dG9rZW59LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIGdldFRhcmpldGFzKGlkbWVtYmVyLHBhc3N3b3JkKSB7IFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwczovL3NlY3VyZS5tb2RpcGF5LmNvL21vZGljYXJkL3dlYnJlc291cmNlcy9zZXJ2aWNlL2xpc3RhclRhcmpldGFzXCI7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZygnUmVjaWJpZG9zIC0gVXNlcjonK2lkbWVtYmVyKycgLSBQYXNzOiAnK3Bhc3N3b3JkKTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgLypyZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwpXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMpOyAqLyBcblxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcbiAgICAgICAgICAgIHNlcnZlclVybCwgeyB1c2VyRTpcImNAcnBvb2xpbmcrXCIsIHBhc3NFOlwiRjNPWjNIQHEqVVwiLGlkbWVtYmVyOmlkbWVtYmVyLG1lbWJlcnBhc3N3OnBhc3N3b3JkfSwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMgXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG4gICAgYWdyZWdhclRhcmpldGEoaWRtZW1iZXIsbWVtYmVycGFzc3csbnVtZXJvX3RhcmpldGEsdmVuY2ltaWVudG8sZnJhbnF1aWNpYSxjb2RpZ29fc2VndXJpZGFkKSB7IFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwczovL3NlY3VyZS5tb2RpcGF5LmNvL21vZGljYXJkL3dlYnJlc291cmNlcy9zZXJ2aWNlL2FncmVnYXJUYXJqZXRhXCI7XG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybClcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7ICovIFxuXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxuICAgICAgICAgICAgc2VydmVyVXJsLCB7IFxuICAgICAgICAgICAgICAgIHVzZXJFOlwiY0BycG9vbGluZytcIiwgXG4gICAgICAgICAgICAgICAgcGFzc0U6XCJGM09aM0hAcSpVXCIsXG4gICAgICAgICAgICAgICAgaWRtZW1iZXI6aWRtZW1iZXIsXG4gICAgICAgICAgICAgICAgbWVtYmVycGFzc3c6bWVtYmVycGFzc3csXG4gICAgICAgICAgICAgICAgZGlyZWNjaW9uOid0b2tlbmRpcjEyMzQnLFxuICAgICAgICAgICAgICAgIG51bWVyb190YXJqZXRhOm51bWVyb190YXJqZXRhLFxuICAgICAgICAgICAgICAgIHZlbmNpbWllbnRvOnZlbmNpbWllbnRvLFxuICAgICAgICAgICAgICAgIGZyYW5xdWljaWE6ZnJhbnF1aWNpYSxcbiAgICAgICAgICAgICAgICBjb2RpZ29fc2VndXJpZGFkOmNvZGlnb19zZWd1cmlkYWRcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgZWxpbWluYXJUYXJqZXRhKGlkbWVtYmVyLG1lbWJlcnBhc3N3LGlkdGFyamV0YSkgeyBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cHM6Ly9zZWN1cmUubW9kaXBheS5jby9tb2RpY2FyZC93ZWJyZXNvdXJjZXMvc2VydmljZS9lbGltaW5hclRhcmpldGFcIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsKSovIFxuXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxuICAgICAgICAgICAgc2VydmVyVXJsLCB7IFxuICAgICAgICAgICAgICAgIHVzZXJFOlwiY0BycG9vbGluZytcIiwgXG4gICAgICAgICAgICAgICAgcGFzc0U6XCJGM09aM0hAcSpVXCIsXG4gICAgICAgICAgICAgICAgaWRtZW1iZXI6aWRtZW1iZXIsXG4gICAgICAgICAgICAgICAgbWVtYmVycGFzc3c6bWVtYmVycGFzc3csXG4gICAgICAgICAgICAgICAgaWRjYXJkOmlkdGFyamV0YVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMgXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBwYWdhcihpZG1lbWJlcixtZW1iZXJwYXNzdyxpZHRhcmpldGEsdmFsb3IpIHsgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHBzOi8vc2VjdXJlLm1vZGlwYXkuY28vbW9kaWNhcmQvd2VicmVzb3VyY2VzL3NlcnZpY2UvcGFnb1Rva2VuXCI7XG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCkqLyBcblxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcbiAgICAgICAgICAgIHNlcnZlclVybCwgeyBcbiAgICAgICAgICAgICAgICB1c2VyRTpcImNAcnBvb2xpbmcrXCIsIFxuICAgICAgICAgICAgICAgIHBhc3NFOlwiRjNPWjNIQHEqVVwiLFxuICAgICAgICAgICAgICAgIGlkbWVtYmVyOmlkbWVtYmVyLFxuICAgICAgICAgICAgICAgIG1lbWJlcnBhc3N3Om1lbWJlcnBhc3N3LFxuICAgICAgICAgICAgICAgIGlkVGFyamV0YTppZHRhcmpldGEsXG4gICAgICAgICAgICAgICAgY3VvdGFzOlwiMVwiLFxuICAgICAgICAgICAgICAgIHZhbG9yOnZhbG9yLFxuICAgICAgICAgICAgICAgIHN1YnRvdGFsOlwiMFwiLFxuICAgICAgICAgICAgICAgIGltcHVlc3RvczpcIjBcIixcbiAgICAgICAgICAgICAgICBjb3N0b3NkZWVudmlvOlwiMFwiLFxuICAgICAgICAgICAgICAgIHByb3BpbmE6XCIwXCIsXG4gICAgICAgICAgICAgICAgZGlyZWNjaW9uSXA6XCIxOTIuMTY4LjM0LjIxXCIsXG4gICAgICAgICAgICAgICAgcGFnYWRvcjpcIkNhcmxvcyBDb3J0ZXNyXCIsXG4gICAgICAgICAgICAgICAgZGVzY3JpcGNpb246XCJEZXNjcmlwY2nDs24gZGUgbGEgdmVudGFcIixcbiAgICAgICAgICAgICAgICByZWZlcmVuY2lhOlwiUGFnbyBkZSByZXNlcnZhIC0gU2VDb21wYXJ0ZVwiLFxuICAgICAgICAgICAgICAgIHRlbGVmb25vZGVlbnZpbzpcIjU2NDAzMjNcIixcbiAgICAgICAgICAgICAgICBub21icmVjb21wcmFkb3I6XCJDb21wcmFkb3JcIixcbiAgICAgICAgICAgICAgICBkaXJlY2Npb25lbnZpbzpcIkF2IENhbGxlIDlcIixcbiAgICAgICAgICAgICAgICBwYWlzZGVlbnZpbzpcIkNvbG9tYmlhIFwiLFxuICAgICAgICAgICAgICAgIGNvZGlnb3Bvc3RhbGRlZW52aW86XCIxNjkxMTFcIixcbiAgICAgICAgICAgICAgICByZWZlcmVuY2lhMTpcInJlZmVyZW5jaWEgMSBBcGxpY2FjaW9uXCIsXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNpYTI6XCJyZWZlcmVuY2lhIDIgQXBsaWNhY2lvblwiLFxuICAgICAgICAgICAgICAgIHJlZmVyZW5jaWEzOlwicmVmZXJlbmNpYSAzIEFwbGljYWNpb25cIixcbiAgICAgICAgICAgICAgICB0aXBvZGVpZGVudGlmaWNhY2lvbjpcIkNlZHVsYSBDaXVkYWRhbmlhXCIsXG4gICAgICAgICAgICAgICAgbm9kZUlkZW50aWZpY2FjaW9uOlwiMTExMTExMTExXCIsXG4gICAgICAgICAgICAgICAgY29ycmVvTm90aWZpY2FjaW9uOlwiZGFuaWVsMDcwNzlAZ21haWwuY29tXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgLypnZXRSZXNwb25zZUluZm8oKSB7XG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuc2VydmVyVXJsLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5kbyhyZXMgPT4gIHJlcyk7XG4gICAgfSovXG5cbiAgICBwcml2YXRlIGNyZWF0ZVJlcXVlc3RIZWFkZXIoKSB7XG4gICAgICAgIC8vIHNldCBoZWFkZXJzIGhlcmUgZS5nLlxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xuICAgIH1cbn0iXX0=