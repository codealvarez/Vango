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
        return this.http.get(serverUrl, { params: { codigousu: user, claveusu: password }, headers: headers })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.getClave = function (user) {
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/recuperar_clave.aspx";
        var headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */
        return this.http.get(serverUrl, { params: { codigousu: user }, headers: headers })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.guardarMensaje = function (user, asunto, mensaje) {
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/guardar_mensaje.aspx";
        var headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */
        return this.http.get(serverUrl, { params: { codigousu: user, asunto: asunto, mensaje: mensaje }, headers: headers })
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
    WebService.prototype.getTerminos = function () {
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/traer_mensajes_predeterminados.aspx";
        var headers = this.createRequestHeader();
        return this.http.get(serverUrl, { params: { origen: 'TYC' }, headers: headers })
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
    WebService.prototype.getDatosViaje = function (idViaje, idPasajero) {
        //listar_viajes_rutas.aspx?idconductor=0&idpasajero=2&estado=PROGRAMADO
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/consultar_datos_viaje.aspx";
        var headers = this.createRequestHeader();
        return this.http.get(serverUrl, { params: { idviaje: idViaje, idpasajero: idPasajero }, headers: headers })
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
    WebService.prototype.getIdVango = function (cedula, email, nombre, empresa, idEmpresa, celular, apellidos) {
        var serverUrl = "http://bimoney.co/vangoServices/webresources/service/registroMiembro";
        var headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */
        return this.http.post(serverUrl, JSON.stringify({
            userE: 'c@rpooling+',
            passE: 'F3OZ3H@q*U',
            nombre: nombre,
            apellido: apellidos,
            correo: email,
            password: cedula,
            numIdentificacion: cedula,
            ciudad: 'Bogota',
            empresa: empresa,
            centrodecosto: '',
            referencia1: "",
            referencia2: "",
            referencia3: "",
            fechadecaducidad: "",
            regladeConsumo: "",
            broker: idEmpresa,
            movil: celular
        }), {
            headers: headers
        }).pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.getSaldo = function (idVango) {
        var serverUrl = "http://bimoney.co/vangoServices/webresources/service/saldoVango";
        var headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */
        return this.http.post(serverUrl, JSON.stringify({
            userE: 'c@rpooling+',
            passE: 'F3OZ3H@q*U',
            idtx: "11",
            idvango: idVango
            //idvango:"66053028"
        }), {
            headers: headers
        }).pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.getTransacciones = function (idVango) {
        var serverUrl = "http://bimoney.co/vangoServices/webresources/service/historicoTx";
        var headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */
        return this.http.post(serverUrl, JSON.stringify({
            userE: 'c@rpooling+',
            passE: 'F3OZ3H@q*U',
            idtx: "11",
            idvango: idVango
            //idvango:"66053028"
        }), {
            headers: headers
        }).pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.asignarIdVango = function (user, idVango) {
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/registrar_idvango.aspx";
        //?idusuario=4&idmodipay=0
        console.log('Recibidos - User:' + user + ' - idMember: ' + idVango);
        var headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */
        return this.http.get(serverUrl, { params: { idusuario: user, idvango: idVango }, headers: headers })
            .pipe(operators_1.map(function (res) { return res; }));
    };
    WebService.prototype.getEmpresas = function () {
        var serverUrl = "http://bimoney.co/vangoServices/webresources/service/vangoEmpresas";
        var headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */
        return this.http.post(serverUrl, JSON.stringify({
            userE: 'c@rpooling+',
            passE: 'F3OZ3H@q*U'
        }), { headers: headers }).pipe(operators_1.map(function (res) { return res; }));
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
    WebService.prototype.pagarConSaldo = function (idVango, valor) {
        var serverUrl = "http://bimoney.co/vangoServices/webresources/service/pagosVango";
        var headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)*/
        return this.http.post(serverUrl, {
            userE: "c@rpooling+",
            passE: "F3OZ3H@q*U",
            idvango: idVango,
            valor: valor,
            description: "",
            transferTypeId: "34",
            origen: "2018-08-10 10:37:17|HOTEL NH LA BOHEME, CALLE 82, BOGOTÁ, COLOMBIA",
            destino: "2018-08-10 10:38:28|ANDRÉS CARNE DE RES, CHIA, CUNDINAMARCA, COLOMBIA",
            viajastecon: "Nombre Completo Conductor",
            placa: "Placa van",
            modelo: "VAN Mercedez",
            km: "3,34 Km",
            tiempodelviaje: "45 Minutos",
            ruta: "Geoposicion",
            recargo: "0      /    4,500",
            descuento: "0   /     4,000",
            cortesia: "0  /   1,500.00",
            reserva: "434234",
            valeDigital: "codigo de vale si es necesario",
            puntosRedimidos: "33 Puntos",
            calificacion: "5",
            descripcion: "reunion",
            geoPosicion: "geoPosicion",
            validadorGPS: "imei equipo",
            idServicio: "codigo integracion con otros sistemas"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0MsNENBQXdEO0FBQ3hELDZDQUE2RTtBQUU3RSxtQ0FBcUM7QUFDckM7O2dDQUVnQztBQUdoQztJQUVJLG9CQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO0lBQUksQ0FBQztJQUV6Qyw0QkFBTyxHQUFQLFVBQVEsR0FBRyxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE9BQU87UUFDN0IsSUFBSSxHQUFHLEdBQUcseUNBQXlDLENBQUM7UUFDcEQsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNqQixJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFbEIsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7WUFDbkMsSUFBRyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDO2dCQUN2QixTQUFTLElBQUksTUFBTSxHQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUMsSUFBSSxHQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7YUFDM0U7aUJBQUk7Z0JBQ0QsU0FBUyxJQUFJLE1BQU0sR0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFDLElBQUksR0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFDLEtBQUssQ0FBQzthQUNqRjtZQUVELHlEQUF5RDtZQUN6RCw4RUFBOEU7WUFDOUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FFM0M7UUFFRCxJQUFJLFNBQVMsR0FBRyw4REFBOEQsR0FBQyxHQUFHLEdBQUMsR0FBRyxHQUFDLEdBQUcsR0FBQyxlQUFlLEdBQUMsSUFBSSxHQUFDLEdBQUcsR0FBQyxJQUFJLEdBQUMsYUFBYSxHQUFDLFNBQVMsR0FBQyxPQUFPLEdBQUMsR0FBRyxDQUFDO1FBQzdKLHVOQUF1TjtRQUN2TixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFDLEdBQUcsR0FBQyxVQUFVLEdBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDekMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDaEQsSUFBSSxDQUFDLGVBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCw2QkFBUSxHQUFSLFVBQVMsSUFBSSxFQUFDLFFBQVE7UUFDbEIsSUFBSSxTQUFTLEdBQUcsNkVBQTZFLENBQUM7UUFFOUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsR0FBQyxJQUFJLEdBQUMsV0FBVyxHQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQ3pDO2dDQUN3QjtRQUV4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBQyxFQUFFLFNBQVMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLFFBQVEsRUFBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUM3RixJQUFJLENBQUMsZUFBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELDZCQUFRLEdBQVIsVUFBUyxJQUFJO1FBQ1QsSUFBSSxTQUFTLEdBQUcsdUVBQXVFLENBQUM7UUFFeEYsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDekM7Z0NBQ3dCO1FBRXhCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFDLEVBQUUsU0FBUyxFQUFDLElBQUksRUFBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUMxRSxJQUFJLENBQUMsZUFBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELG1DQUFjLEdBQWQsVUFBZSxJQUFJLEVBQUMsTUFBTSxFQUFDLE9BQU87UUFDOUIsSUFBSSxTQUFTLEdBQUcsdUVBQXVFLENBQUM7UUFFeEYsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDekM7Z0NBQ3dCO1FBRXhCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFDLEVBQUUsU0FBUyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDMUcsSUFBSSxDQUFDLGVBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCw4QkFBUyxHQUFULFVBQVUsSUFBSSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsS0FBSztRQUM3QixJQUFJLFNBQVMsR0FBRyxrRkFBa0YsQ0FBQztRQUNuRyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXhDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQ3pDO2dDQUN3QjtRQUV4QixJQUFHLENBQUMsS0FBSyxFQUFDO1lBQ04sS0FBSyxHQUFHLE1BQU0sQ0FBQztTQUNsQjtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFDLElBQUksR0FBQyxZQUFZLEdBQUMsS0FBSyxHQUFDLGFBQWEsR0FBQyxNQUFNLEdBQUMsWUFBWSxHQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXRGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFDLEVBQUUsTUFBTSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFDLElBQUksRUFBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUNoSCxJQUFJLENBQUMsZUFBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUNELGtDQUFhLEdBQWIsVUFBYyxNQUFNLEVBQUMsT0FBTyxFQUFDLFNBQVM7UUFDbEMsSUFBSSxTQUFTLEdBQUcsa0ZBQWtGLENBQUM7UUFDbkcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBQyxTQUFTLENBQUMsQ0FBQztRQUV4QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN6QztnQ0FDd0I7UUFFeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUMsRUFBRSxVQUFVLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLE9BQU8sRUFBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUM5RyxJQUFJLENBQUMsZUFBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELG9DQUFlLEdBQWYsVUFBZ0IsTUFBTSxFQUFDLEtBQUssRUFBQyxTQUFTO1FBQ2xDLElBQUksU0FBUyxHQUFHLGlGQUFpRixDQUFDO1FBQ2xHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUMsU0FBUyxDQUFDLENBQUM7UUFFeEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDekM7Z0NBQ3dCO1FBRXhCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFDLEVBQUUsVUFBVSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxLQUFLLEVBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDM0csSUFBSSxDQUFDLGVBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxzQ0FBaUIsR0FBakIsVUFBa0IsU0FBUztRQUV2QixJQUFJLFNBQVMsR0FBRyxnRkFBZ0YsQ0FBQztRQUVqRyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUV6QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBQyxFQUFFLFVBQVUsRUFBQyxTQUFTLEVBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDaEYsSUFBSSxDQUFDLGVBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxnQ0FBVyxHQUFYO1FBRUksSUFBSSxTQUFTLEdBQUcsc0ZBQXNGLENBQUM7UUFFdkcsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFFekMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUMsRUFBRSxNQUFNLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxXQUFXLEVBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDakcsSUFBSSxDQUFDLGVBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxnQ0FBVyxHQUFYO1FBRUksSUFBSSxTQUFTLEdBQUcsc0ZBQXNGLENBQUM7UUFFdkcsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFFekMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUMsRUFBRSxNQUFNLEVBQUMsS0FBSyxFQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ3hFLElBQUksQ0FBQyxlQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsd0NBQW1CLEdBQW5CLFVBQW9CLFNBQVM7UUFDekIsdUVBQXVFO1FBQ3ZFLElBQUksU0FBUyxHQUFHLGdGQUFnRixDQUFDO1FBRWpHLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRXpDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ2hELElBQUksQ0FBQyxlQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQseUNBQW9CLEdBQXBCLFVBQXFCLE1BQU07UUFDdkIsdUVBQXVFO1FBQ3ZFLElBQUksU0FBUyxHQUFHLDJFQUEyRSxDQUFDO1FBRTVGLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRXpDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFDLEVBQUUsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUN6RSxJQUFJLENBQUMsZUFBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELGtDQUFhLEdBQWIsVUFBYyxPQUFPLEVBQUMsVUFBVTtRQUM1Qix1RUFBdUU7UUFDdkUsSUFBSSxTQUFTLEdBQUcsNkVBQTZFLENBQUM7UUFFOUYsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFFekMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxVQUFVLEVBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDakcsSUFBSSxDQUFDLGVBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCx1Q0FBa0IsR0FBbEIsVUFBbUIsV0FBVztRQUMxQix1RUFBdUU7UUFDdkUsSUFBSSxTQUFTLEdBQUcseUVBQXlFLENBQUM7UUFFMUYsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFFekMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUMsRUFBRSxVQUFVLEVBQUMsR0FBRyxFQUFDLFdBQVcsRUFBQyxXQUFXLEVBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDbEcsSUFBSSxDQUFDLGVBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCwrQkFBVSxHQUFWLFVBQVcsTUFBTSxFQUFDLE9BQU87UUFFckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsSUFBSSxTQUFTLEdBQUcsOERBQThELEdBQUMsT0FBTyxDQUFDO1FBQ3ZGLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO1lBQ2xDLFNBQVMsR0FBQyxTQUFTLEdBQUMsQ0FBQyxZQUFZLEdBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDL0M7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdkIsdUVBQXVFO1FBR3ZFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRXpDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ2hELElBQUksQ0FBQyxlQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsc0NBQWlCLEdBQWpCLFVBQWtCLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsY0FBYztRQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxHQUFDLE9BQU8sR0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsSUFBSSxTQUFTLEdBQUcsa0VBQWtFLEdBQUMsVUFBVSxHQUFDLFVBQVUsR0FBQyxNQUFNLEdBQUMsV0FBVyxHQUFDLE9BQU8sR0FBQyxrQkFBa0IsR0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLEdBQUMsV0FBVyxHQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoTixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztZQUNsQyxTQUFTLEdBQUMsU0FBUyxHQUFDLENBQUMsWUFBWSxHQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQy9DO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXZCLHVFQUF1RTtRQUd2RSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUV6QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUNoRCxJQUFJLENBQUMsZUFBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELGtDQUFhLEdBQWIsVUFBYyxNQUFNO1FBQ2hCLElBQUksU0FBUyxHQUFHLDRFQUE0RSxDQUFDO1FBRTdGLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRXpDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFDLEVBQUUsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUN6RSxJQUFJLENBQUMsZUFBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELGdDQUFXLEdBQVgsVUFBWSxPQUFPO1FBRWYsSUFBSSxTQUFTLEdBQUcsNkVBQTZFLENBQUM7UUFDOUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsR0FBQyxPQUFPLENBQUMsQ0FBQztRQUV6RCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUV6QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBQyxFQUFFLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDM0UsSUFBSSxDQUFDLGVBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCwrQkFBVSxHQUFWLFVBQVcsVUFBVSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxRQUFRO1FBQzdELHdEQUF3RDtRQUN4RCxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUMsVUFBVSxHQUFDLGNBQWMsR0FBQyxPQUFPLEdBQUMsZUFBZSxHQUFDLFFBQVEsR0FBQyxnQkFBZ0IsR0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsSCxJQUFJLFNBQVMsR0FBRyx5RUFBeUUsQ0FBQztRQUUxRixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUV6QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBQyxFQUFFLFVBQVUsRUFBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUMsUUFBUSxFQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ2hMLElBQUksQ0FBQyxlQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsc0NBQWlCLEdBQWpCLFVBQWtCLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxRQUFRO1FBQ3hELElBQUksU0FBUyxHQUFHLHVGQUF1RixDQUFDO1FBQ3hHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUMsU0FBUyxDQUFDLENBQUM7UUFFeEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDekM7Z0NBQ3dCO1FBRXhCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFDLEVBQUUsT0FBTyxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ2xKLElBQUksQ0FBQyxlQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQseUNBQW9CLEdBQXBCLFVBQXFCLEtBQUs7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsR0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6RCxJQUFJLFNBQVMsR0FBRyx1RUFBdUUsQ0FBQztRQUV4RixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUV6QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBQyxFQUFFLEtBQUssRUFBQyxLQUFLLEVBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDdkUsSUFBSSxDQUFDLGVBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxnQ0FBVyxHQUFYLFVBQVksSUFBSSxFQUFDLFFBQVE7UUFDckIsSUFBSSxTQUFTLEdBQUcsc0VBQXNFLENBQUM7UUFFdkYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsR0FBQyxJQUFJLEdBQUMsV0FBVyxHQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQ3pDO2dDQUN3QjtRQUV4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3hDLEtBQUssRUFBQyxhQUFhLEVBQUUsS0FBSyxFQUFDLFlBQVksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBQyxRQUFRO1NBQ3ZFLENBQUMsRUFBRTtZQUNKLE9BQU8sRUFBRSxPQUFPO1NBQ25CLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNELG9DQUFlLEdBQWYsVUFBZ0IsSUFBSSxFQUFDLFFBQVE7UUFDekIsSUFBSSxTQUFTLEdBQUcsMkVBQTJFLENBQUM7UUFDNUYsMEJBQTBCO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEdBQUMsSUFBSSxHQUFDLGVBQWUsR0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN6QztnQ0FDd0I7UUFFeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUMsRUFBRSxTQUFTLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDN0YsSUFBSSxDQUFDLGVBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDRCwrQkFBVSxHQUFWLFVBQVcsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsU0FBUztRQUM5RCxJQUFJLFNBQVMsR0FBRyxzRUFBc0UsQ0FBQztRQUV2RixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN6QztnQ0FDd0I7UUFFeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUN4QyxLQUFLLEVBQUMsYUFBYTtZQUNuQixLQUFLLEVBQUMsWUFBWTtZQUNsQixNQUFNLEVBQUMsTUFBTTtZQUNiLFFBQVEsRUFBQyxTQUFTO1lBQ2xCLE1BQU0sRUFBQyxLQUFLO1lBQ1osUUFBUSxFQUFDLE1BQU07WUFDZixpQkFBaUIsRUFBQyxNQUFNO1lBQ3hCLE1BQU0sRUFBQyxRQUFRO1lBQ2YsT0FBTyxFQUFDLE9BQU87WUFDZixhQUFhLEVBQUMsRUFBRTtZQUNoQixXQUFXLEVBQUMsRUFBRTtZQUNkLFdBQVcsRUFBQyxFQUFFO1lBQ2QsV0FBVyxFQUFDLEVBQUU7WUFDZCxnQkFBZ0IsRUFBQyxFQUFFO1lBQ25CLGNBQWMsRUFBQyxFQUFFO1lBQ2pCLE1BQU0sRUFBQyxTQUFTO1lBQ2hCLEtBQUssRUFBQyxPQUFPO1NBQ2hCLENBQUMsRUFBRTtZQUNKLE9BQU8sRUFBRSxPQUFPO1NBQ25CLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNELDZCQUFRLEdBQVIsVUFBUyxPQUFPO1FBQ1osSUFBSSxTQUFTLEdBQUcsaUVBQWlFLENBQUM7UUFFbEYsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDekM7Z0NBQ3dCO1FBRXhCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDeEMsS0FBSyxFQUFDLGFBQWE7WUFDbkIsS0FBSyxFQUFDLFlBQVk7WUFDbEIsSUFBSSxFQUFDLElBQUk7WUFDVCxPQUFPLEVBQUMsT0FBTztZQUNmLG9CQUFvQjtTQUN2QixDQUFDLEVBQUU7WUFDSixPQUFPLEVBQUUsT0FBTztTQUNuQixDQUFDLENBQUMsSUFBSSxDQUFDLGVBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxxQ0FBZ0IsR0FBaEIsVUFBaUIsT0FBTztRQUNwQixJQUFJLFNBQVMsR0FBRyxrRUFBa0UsQ0FBQztRQUVuRixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN6QztnQ0FDd0I7UUFFeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUN4QyxLQUFLLEVBQUMsYUFBYTtZQUNuQixLQUFLLEVBQUMsWUFBWTtZQUNsQixJQUFJLEVBQUMsSUFBSTtZQUNULE9BQU8sRUFBQyxPQUFPO1lBQ2Ysb0JBQW9CO1NBQ3ZCLENBQUMsRUFBRTtZQUNKLE9BQU8sRUFBRSxPQUFPO1NBQ25CLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNELG1DQUFjLEdBQWQsVUFBZSxJQUFJLEVBQUMsT0FBTztRQUN2QixJQUFJLFNBQVMsR0FBRyx5RUFBeUUsQ0FBQztRQUMxRiwwQkFBMEI7UUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsR0FBQyxJQUFJLEdBQUMsZUFBZSxHQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQ3pDO2dDQUN3QjtRQUV4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBQyxFQUFFLFNBQVMsRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUMxRixJQUFJLENBQUMsZUFBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUNELGdDQUFXLEdBQVg7UUFDSSxJQUFJLFNBQVMsR0FBRyxvRUFBb0UsQ0FBQztRQUVyRixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN6QztnQ0FDd0I7UUFFeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUM1QyxLQUFLLEVBQUMsYUFBYTtZQUNuQixLQUFLLEVBQUMsWUFBWTtTQUNyQixDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUNELG1DQUFjLEdBQWQsVUFBZSxLQUFLLEVBQUMsU0FBUztRQUMxQixJQUFJLFNBQVMsR0FBRyw0RUFBNEUsQ0FBQztRQUM3RiwwQkFBMEI7UUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsR0FBQyxLQUFLLEdBQUMsY0FBYyxHQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksVUFBVSxDQUFDO1FBQ2YsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO1lBQ2xCLFVBQVUsR0FBRyxLQUFLLENBQUM7U0FDcEI7YUFBSTtZQUNILFVBQVUsR0FBRyxTQUFTLENBQUM7U0FDeEI7UUFDRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN6QztnQ0FDd0I7UUFFeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUMsRUFBRSxVQUFVLEVBQUMsU0FBUyxFQUFDLFdBQVcsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQy9ILElBQUksQ0FBQyxlQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsZ0NBQVcsR0FBWCxVQUFZLFFBQVEsRUFBQyxRQUFRO1FBQ3pCLElBQUksU0FBUyxHQUFHLHdFQUF3RSxDQUFDO1FBRXpGLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEdBQUMsUUFBUSxHQUFDLFdBQVcsR0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN6QztnQ0FDd0I7UUFHeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDakIsU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUMsWUFBWSxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsV0FBVyxFQUFDLFFBQVEsRUFBQyxFQUFFO1lBQzFGLE9BQU8sRUFBRSxPQUFPO1NBQ25CLENBQUM7YUFDRCxJQUFJLENBQUMsZUFBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUNELG1DQUFjLEdBQWQsVUFBZSxRQUFRLEVBQUMsV0FBVyxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsVUFBVSxFQUFDLGdCQUFnQjtRQUN0RixJQUFJLFNBQVMsR0FBRyx3RUFBd0UsQ0FBQztRQUV6RixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN6QztnQ0FDd0I7UUFHeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDakIsU0FBUyxFQUFFO1lBQ1AsS0FBSyxFQUFDLGFBQWE7WUFDbkIsS0FBSyxFQUFDLFlBQVk7WUFDbEIsUUFBUSxFQUFDLFFBQVE7WUFDakIsV0FBVyxFQUFDLFdBQVc7WUFDdkIsU0FBUyxFQUFDLGNBQWM7WUFDeEIsY0FBYyxFQUFDLGNBQWM7WUFDN0IsV0FBVyxFQUFDLFdBQVc7WUFDdkIsVUFBVSxFQUFDLFVBQVU7WUFDckIsZ0JBQWdCLEVBQUMsZ0JBQWdCO1NBQ3BDLEVBQUU7WUFDQyxPQUFPLEVBQUUsT0FBTztTQUNuQixDQUFDO2FBQ0QsSUFBSSxDQUFDLGVBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxvQ0FBZSxHQUFmLFVBQWdCLFFBQVEsRUFBQyxXQUFXLEVBQUMsU0FBUztRQUMxQyxJQUFJLFNBQVMsR0FBRyx5RUFBeUUsQ0FBQztRQUUxRixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN6QyxtQ0FBbUM7UUFHbkMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDakIsU0FBUyxFQUFFO1lBQ1AsS0FBSyxFQUFDLGFBQWE7WUFDbkIsS0FBSyxFQUFDLFlBQVk7WUFDbEIsUUFBUSxFQUFDLFFBQVE7WUFDakIsV0FBVyxFQUFDLFdBQVc7WUFDdkIsTUFBTSxFQUFDLFNBQVM7U0FDbkIsRUFBRTtZQUNDLE9BQU8sRUFBRSxPQUFPO1NBQ25CLENBQUM7YUFDRCxJQUFJLENBQUMsZUFBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELDBCQUFLLEdBQUwsVUFBTSxRQUFRLEVBQUMsV0FBVyxFQUFDLFNBQVMsRUFBQyxLQUFLO1FBQ3RDLElBQUksU0FBUyxHQUFHLG1FQUFtRSxDQUFDO1FBRXBGLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQ3pDLG1DQUFtQztRQUduQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNqQixTQUFTLEVBQUU7WUFDUCxLQUFLLEVBQUMsYUFBYTtZQUNuQixLQUFLLEVBQUMsWUFBWTtZQUNsQixRQUFRLEVBQUMsUUFBUTtZQUNqQixXQUFXLEVBQUMsV0FBVztZQUN2QixTQUFTLEVBQUMsU0FBUztZQUNuQixNQUFNLEVBQUMsR0FBRztZQUNWLEtBQUssRUFBQyxLQUFLO1lBQ1gsUUFBUSxFQUFDLEdBQUc7WUFDWixTQUFTLEVBQUMsR0FBRztZQUNiLGFBQWEsRUFBQyxHQUFHO1lBQ2pCLE9BQU8sRUFBQyxHQUFHO1lBQ1gsV0FBVyxFQUFDLGVBQWU7WUFDM0IsT0FBTyxFQUFDLGdCQUFnQjtZQUN4QixXQUFXLEVBQUMseUJBQXlCO1lBQ3JDLFVBQVUsRUFBQyw4QkFBOEI7WUFDekMsZUFBZSxFQUFDLFNBQVM7WUFDekIsZUFBZSxFQUFDLFdBQVc7WUFDM0IsY0FBYyxFQUFDLFlBQVk7WUFDM0IsV0FBVyxFQUFDLFdBQVc7WUFDdkIsbUJBQW1CLEVBQUMsUUFBUTtZQUM1QixXQUFXLEVBQUMseUJBQXlCO1lBQ3JDLFdBQVcsRUFBQyx5QkFBeUI7WUFDckMsV0FBVyxFQUFDLHlCQUF5QjtZQUNyQyxvQkFBb0IsRUFBQyxtQkFBbUI7WUFDeEMsa0JBQWtCLEVBQUMsV0FBVztZQUM5QixrQkFBa0IsRUFBQyx1QkFBdUI7U0FDN0MsRUFBRTtZQUNDLE9BQU8sRUFBRSxPQUFPO1NBQ25CLENBQUM7YUFDRCxJQUFJLENBQUMsZUFBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELGtDQUFhLEdBQWIsVUFBYyxPQUFPLEVBQUMsS0FBSztRQUN2QixJQUFJLFNBQVMsR0FBRyxpRUFBaUUsQ0FBQztRQUVsRixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN6QyxtQ0FBbUM7UUFHbkMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDakIsU0FBUyxFQUFFO1lBQ1AsS0FBSyxFQUFDLGFBQWE7WUFDbkIsS0FBSyxFQUFDLFlBQVk7WUFDbEIsT0FBTyxFQUFDLE9BQU87WUFDZixLQUFLLEVBQUMsS0FBSztZQUNYLFdBQVcsRUFBQyxFQUFFO1lBQ2QsY0FBYyxFQUFDLElBQUk7WUFDbkIsTUFBTSxFQUFDLG9FQUFvRTtZQUMzRSxPQUFPLEVBQUMsdUVBQXVFO1lBQy9FLFdBQVcsRUFBQywyQkFBMkI7WUFDdkMsS0FBSyxFQUFDLFdBQVc7WUFDakIsTUFBTSxFQUFDLGNBQWM7WUFDckIsRUFBRSxFQUFDLFNBQVM7WUFDWixjQUFjLEVBQUMsWUFBWTtZQUMzQixJQUFJLEVBQUMsYUFBYTtZQUNsQixPQUFPLEVBQUMsbUJBQW1CO1lBQzNCLFNBQVMsRUFBQyxpQkFBaUI7WUFDM0IsUUFBUSxFQUFDLGlCQUFpQjtZQUMxQixPQUFPLEVBQUMsUUFBUTtZQUNoQixXQUFXLEVBQUMsZ0NBQWdDO1lBQzVDLGVBQWUsRUFBQyxXQUFXO1lBQzNCLFlBQVksRUFBQyxHQUFHO1lBQ2hCLFdBQVcsRUFBQyxTQUFTO1lBQ3JCLFdBQVcsRUFBQyxhQUFhO1lBQ3pCLFlBQVksRUFBQyxhQUFhO1lBQzFCLFVBQVUsRUFBQyx1Q0FBdUM7U0FDckQsRUFBRTtZQUNDLE9BQU8sRUFBRSxPQUFPO1NBQ25CLENBQUM7YUFDRCxJQUFJLENBQUMsZUFBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7O09BSUc7SUFFSyx3Q0FBbUIsR0FBM0I7UUFDSSx3QkFBd0I7UUFDeEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxrQkFBVyxDQUFDO1lBQzFCLGNBQWMsRUFBRSxrQkFBa0I7U0FDcEMsQ0FBQyxDQUFDO1FBRUosT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQXhpQlEsVUFBVTtRQUR0QixpQkFBVSxFQUFFO3lDQUdpQixpQkFBVTtPQUYzQixVQUFVLENBeWlCdEI7SUFBRCxpQkFBQztDQUFBLEFBemlCRCxJQXlpQkM7QUF6aUJZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCBSZXBsYXlTdWJqZWN0LCBmcm9tLCBvZiwgcmFuZ2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgZmlsdGVyLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQgKiBhcyBwbCBmcm9tICdnb29nbGUtcG9seWxpbmUnO1xuaW1wb3J0ICogYXMgcGxhdGZvcm0gZnJvbSBcInBsYXRmb3JtXCI7XG4vKmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvY2F0Y2hcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7Ki8gXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBXZWJTZXJ2aWNlIHtcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHsgfVxuXG4gICAgZ2V0RGF0YShsYXQsbG9uLGxhdDIsbG9uMixwYXJhZGFzKSB7XG4gICAgICAgIHZhciBrZXkgPSAnQUl6YVN5RC1lS2t3Q0p5MFJieVpYQlFTT3hJV3dZNlU4OVExdVUwJztcbiAgICAgICAgdmFyIHdheXBvaW50cyA9ICcnO1xuICAgICAgICB2YXIgY29tYSA9ICclMkMnO1xuICAgICAgICB2YXIgYmFycmEgPSAnJTdDJztcblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGFyYWRhcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBpZihwYXJhZGFzLmxlbmd0aCA9PSAoaS0xKSl7XG4gICAgICAgICAgICAgICAgd2F5cG9pbnRzICs9ICd2aWE6JytwYXJhZGFzW2ldWzBdLmxhdGl0dWRlK2NvbWErcGFyYWRhc1tpXVswXS5sb25naXR1ZGU7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB3YXlwb2ludHMgKz0gJ3ZpYTonK3BhcmFkYXNbaV1bMF0ubGF0aXR1ZGUrY29tYStwYXJhZGFzW2ldWzBdLmxvbmdpdHVkZStiYXJyYTsgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vbGV0IHdheXNEZWMgPSBwbC5lbmNvZGUoW3BhcmFkYXNbaV1bMF0scGFyYWRhc1tpXVsxXV0pO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnUHVudG8gJysoaSsxKSsnOicrW3BhcmFkYXNbaV1bMF0scGFyYWRhc1tpXVsxXSsnIC0tICcrd2F5c0RlYyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShwYXJhZGFzW2ldKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICAgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9kaXJlY3Rpb25zL2pzb24/b3JpZ2luPVwiK2xhdCtcIixcIitsb24rXCImZGVzdGluYXRpb249XCIrbGF0MitcIixcIitsb24yK1wiJndheXBvaW50cz1cIit3YXlwb2ludHMrXCIma2V5PVwiK2tleTtcbiAgICAgICAgLy92YXIgc2VydmVyVXJsID0gXCJodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvZGlyZWN0aW9ucy9qc29uP29yaWdpbj00LjcwMTQxMjgsLTc0LjE0NjY4NTYmZGVzdGluYXRpb249NC42NzY1NTg0LC03NC4wNTM2NjY2JndheXBvaW50cz12aWE6UmljYXVydGUsQm9nb3QlQzMlQTEma2V5PUFJemFTeUQtZUtrd0NKeTBSYnlaWEJRU094SVd3WTZVODlRMXVVMFwiO1xuICAgICAgICBjb25zb2xlLmxvZygnUmVjaWJpZG9zIC0gTGF0OicrbGF0KycgLSBMb246ICcrbG9uKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1VSTDogJytzZXJ2ZXJVcmwpO1xuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9IFxuXG4gICAgZ2V0TG9naW4odXNlcixwYXNzd29yZCkgeyBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2N0Y2FycG9vbGltcC5jbG91ZGFwcC5uZXQvY2FycG9vbHNlcnZpY2VzL3ZhbGlkYV9sb2dpbl9wYXNhamVyby5hc3B4XCI7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZygnUmVjaWJpZG9zIC0gVXNlcjonK3VzZXIrJyAtIFBhc3M6ICcrcGFzc3dvcmQpO1xuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybClcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7ICovXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IGNvZGlnb3VzdTp1c2VyLCBjbGF2ZXVzdTpwYXNzd29yZH0sIGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhdmUodXNlcikgeyBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2N0Y2FycG9vbGltcC5jbG91ZGFwcC5uZXQvY2FycG9vbHNlcnZpY2VzL3JlY3VwZXJhcl9jbGF2ZS5hc3B4XCI7XG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybClcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7ICovXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IGNvZGlnb3VzdTp1c2VyfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBndWFyZGFyTWVuc2FqZSh1c2VyLGFzdW50byxtZW5zYWplKSB7IFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvZ3VhcmRhcl9tZW5zYWplLmFzcHhcIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTsgKi9cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgcGFyYW1zOnsgY29kaWdvdXN1OnVzZXIsIGFzdW50bzphc3VudG8sIG1lbnNhamU6bWVuc2FqZX0sIGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgcmVnaXN0cmFyKG5hbWUsZW1haWwsY2VkdWxhLGdydXBvKSB7IFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvcmVnaXN0cmFyX3VzdWFyaW9fcGFzYWplcm8uYXNweFwiO1xuICAgICAgICBjb25zb2xlLmxvZygnVVJMIHJlZ2lzdHJvOiAnK3NlcnZlclVybCk7XG5cbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgLypyZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwpXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMpOyAqL1xuXG4gICAgICAgIGlmKCFncnVwbyl7XG4gICAgICAgICAgICBncnVwbyA9IGNlZHVsYTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZygnTmFtZTogJytuYW1lKycgLSBlbWFpbDogJytlbWFpbCsnIC0gQ2VkdWxhOiAnK2NlZHVsYSsnIC0gR3J1cG86ICcrZ3J1cG8pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBwYXJhbXM6eyBjZWR1bGE6Y2VkdWxhLCBncnVwbzpncnVwbywgZW1haWw6ZW1haWwsIG5vbWJyZTpuYW1lfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG4gICAgZW52aWFyTWVuc2FqZShhc3VudG8sbWVuc2FqZSxpZFVzdWFyaW8pIHsgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy9yZWdpc3RyYXJfbWVuc2FqZV9wYXNhamVyby5hc3B4XCI7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVUkwgcmVnaXN0cm86ICcrc2VydmVyVXJsKTtcblxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybClcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7ICovXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IGlkcGFzYWplcm86aWRVc3VhcmlvLCBhc3VudG86YXN1bnRvLCB0ZXh0bzptZW5zYWplfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBhY3R1YWxpemFyRGF0b3Mobm9tYnJlLGVtYWlsLGlkVXN1YXJpbykgeyBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2N0Y2FycG9vbGltcC5jbG91ZGFwcC5uZXQvY2FycG9vbHNlcnZpY2VzL2FjdHVhbGl6YXJfZGF0b3NfcGFzYWplcm8uYXNweFwiO1xuICAgICAgICBjb25zb2xlLmxvZygnVVJMIHJlZ2lzdHJvOiAnK3NlcnZlclVybCk7XG5cbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgLypyZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwpXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMpOyAqL1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBwYXJhbXM6eyBpZHBhc2FqZXJvOmlkVXN1YXJpbywgbm9tYnJlOm5vbWJyZSwgbWFpbDplbWFpbH0sIGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgZ2V0UnV0YXNBc2lnbmFkYXMoaWRVc3VhcmlvKSB7IFxuICAgICAgICBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2N0Y2FycG9vbGltcC5jbG91ZGFwcC5uZXQvY2FycG9vbHNlcnZpY2VzL2xpc3Rhcl9yZXNlcnZhc19wYXNhamVyby5hc3B4XCI7XG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBwYXJhbXM6eyBpZHBhc2FqZXJvOmlkVXN1YXJpb30sIGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgZ2V0TWVuc2FqZXMoKSB7IFxuICAgICAgICBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2N0Y2FycG9vbGltcC5jbG91ZGFwcC5uZXQvY2FycG9vbHNlcnZpY2VzL3RyYWVyX21lbnNhamVzX3ByZWRldGVybWluYWRvcy5hc3B4XCI7XG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBwYXJhbXM6eyBvcmlnZW46J3Bhc2FqZXJvJyxkZXN0aW5vOidjb25kdWN0b3InfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBnZXRUZXJtaW5vcygpIHsgXG4gICAgICAgIFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvdHJhZXJfbWVuc2FqZXNfcHJlZGV0ZXJtaW5hZG9zLmFzcHhcIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IG9yaWdlbjonVFlDJ30sIGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgZ2V0UnV0YXNEaXNwb25pYmxlcyhpZFVzdWFyaW8pIHsgXG4gICAgICAgIC8vbGlzdGFyX3ZpYWplc19ydXRhcy5hc3B4P2lkY29uZHVjdG9yPTAmaWRwYXNhamVybz0yJmVzdGFkbz1QUk9HUkFNQURPXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy9saXN0YXJfcnV0YXNfZGlzcG9uaWJsZXMuYXNweFwiO1xuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBnZXRWaWFqZXNEaXNwb25pYmxlcyhpZFJ1dGEpIHsgXG4gICAgICAgIC8vbGlzdGFyX3ZpYWplc19ydXRhcy5hc3B4P2lkY29uZHVjdG9yPTAmaWRwYXNhamVybz0yJmVzdGFkbz1QUk9HUkFNQURPXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy9saXN0YXJfdmlhamVzX3J1dGFzLmFzcHhcIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IGlkcnV0YTppZFJ1dGF9LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIGdldERhdG9zVmlhamUoaWRWaWFqZSxpZFBhc2FqZXJvKSB7IFxuICAgICAgICAvL2xpc3Rhcl92aWFqZXNfcnV0YXMuYXNweD9pZGNvbmR1Y3Rvcj0wJmlkcGFzYWplcm89MiZlc3RhZG89UFJPR1JBTUFET1xuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvY29uc3VsdGFyX2RhdG9zX3ZpYWplLmFzcHhcIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IGlkdmlhamU6aWRWaWFqZSxpZHBhc2FqZXJvOmlkUGFzYWplcm99LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIGdldFRva2Vuc0NvbmR1Y3RvcihpZENvbmR1Y3RvcikgeyBcbiAgICAgICAgLy9saXN0YXJfdmlhamVzX3J1dGFzLmFzcHg/aWRjb25kdWN0b3I9MCZpZHBhc2FqZXJvPTImZXN0YWRvPVBST0dSQU1BRE9cbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2N0Y2FycG9vbGltcC5jbG91ZGFwcC5uZXQvY2FycG9vbHNlcnZpY2VzL3RyYWVyX3Rva2Vuc19wdXNoLmFzcHhcIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IGlkcGFzYWplcm86JzAnLGlkY29uZHVjdG9yOmlkQ29uZHVjdG9yfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBlbnZpYXJQdXNoKHRva2VucyxtZW5zYWplKSB7IFxuXG4gICAgICAgIGNvbnNvbGUubG9nKCdUb2tlbnMgcmVjaWJpZG9zJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRva2Vucyk7XG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9hcHBzLmVtZXJhbGRzdHVkaW8uY28vaW1wZXJpYWwvc2VydmljaW9zLnBocD9tZW5zYWplPVwiK21lbnNhamU7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgc2VydmVyVXJsPXNlcnZlclVybCsoJyZ0b2tlbnNbXT0nK3Rva2Vuc1tpXSlcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZygnVVJMIGEgZW52aWFyJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHNlcnZlclVybCk7XG4gICAgICAgIFxuICAgICAgICAvL2xpc3Rhcl92aWFqZXNfcnV0YXMuYXNweD9pZGNvbmR1Y3Rvcj0wJmlkcGFzYWplcm89MiZlc3RhZG89UFJPR1JBTUFET1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgZW52aWFyUHVzaENoZWNraW4obWVuc2FqZSx0b2tlbnMsaWRSdXRhLGlkVmlhamUsaWRQYXNhamVybyxub21icmVQYXNhamVybyl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdOb3RpZmljYW5kbyBhbCBjb25kdWN0b3IgZWwgbWVuc2FqZTogJyttZW5zYWplKycgYSBsb3MgdG9rZW5zOicpO1xuICAgICAgICBjb25zb2xlLmxvZyh0b2tlbnMpO1xuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vYXBwcy5lbWVyYWxkc3R1ZGlvLmNvL2ltcGVyaWFsL3NlcnZpY2lvczMucGhwP2lkcGFzYWplcm89XCIraWRQYXNhamVybytcIiZpZHJ1dGE9XCIraWRSdXRhK1wiJmlkdmlhamU9XCIraWRWaWFqZStcIiZub21icmVwYXNhamVybz1cIitlbmNvZGVVUkkobm9tYnJlUGFzYWplcm8pK1wiJm1lbnNhamU9XCIrZW5jb2RlVVJJKG1lbnNhamUpO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIHNlcnZlclVybD1zZXJ2ZXJVcmwrKCcmdG9rZW5zW109Jyt0b2tlbnNbaV0pXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ1VSTCBhIGVudmlhcicpO1xuICAgICAgICBjb25zb2xlLmxvZyhzZXJ2ZXJVcmwpO1xuICAgICAgICBcbiAgICAgICAgLy9saXN0YXJfdmlhamVzX3J1dGFzLmFzcHg/aWRjb25kdWN0b3I9MCZpZHBhc2FqZXJvPTImZXN0YWRvPVBST0dSQU1BRE9cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIGdldFB1bnRvc1J1dGEoaWRSdXRhKSB7IFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvdHJhZXJfcGFyYWRlcm9zX3J1dGEuYXNweFwiO1xuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgcGFyYW1zOnsgaWRydXRhOmlkUnV0YX0sIGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgZ2V0UGVyc29uYXMoaWRWaWFqZSkgeyBcbiAgICAgICAgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy9saXN0YXJfcmVzZXJ2YXNfdmlhamUuYXNweFwiO1xuICAgICAgICBjb25zb2xlLmxvZygnQ29uc3VsdGFuZG8gcGFyYWRlcm9zIGRlbCB2aWFqZTogJytpZFZpYWplKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IGlkdmlhamU6aWRWaWFqZX0sIGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgc2V0UmVzZXJ2YShpZFBhc2FqZXJvLGlkVmlhamUsbGF0aXR1ZCxsb25naXR1ZCxkaXJlY2Npb24sY2FudGlkYWQpIHsgXG4gICAgICAgIC8vaWRQYXNhamVybyxpZFZpYWplLGxhdGl0dWQsbG9uZ2l0dWQsZGlyZWNjaW9uLGNhbnRpZGFkXG4gICAgICAgIGNvbnNvbGUubG9nKCdEYXRvcyByZWNpYmlkb3M6ICcpO1xuICAgICAgICBjb25zb2xlLmxvZygnaWRQYXNhamVybzogJytpZFBhc2FqZXJvKycgLSBpZFZpYWplOiAnK2lkVmlhamUrJyAtIGNhbnRpZGFkOiAnK2NhbnRpZGFkKycgLSBkaXJlY2Npb246ICcrZGlyZWNjaW9uKTtcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2N0Y2FycG9vbGltcC5jbG91ZGFwcC5uZXQvY2FycG9vbHNlcnZpY2VzL3JlZ2lzdHJhcl9yZXNlcnZhLmFzcHhcIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IGlkcGFzYWplcm86aWRQYXNhamVybywgaWR2aWFqZTogaWRWaWFqZSwgY2FudGlkYWQ6Y2FudGlkYWQsIGRpcmVjY2lvbjogZGlyZWNjaW9uLCBsYXRpdHVkOmxhdGl0dWQsIGxvbmdpdHVkOmxvbmdpdHVkfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICByZWdpc3RyYXJQYXNhamVybyhpZFZpYWplLGlkUGFzYWplcm8sZXN0YWRvLGxhdGl0dWQsbG9uZ2l0dWQpIHsgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy9yZWdpc3RyYXJfZXN0YWRvX3Bhc2FqZXJvX3ZpYWplLmFzcHhcIjtcbiAgICAgICAgY29uc29sZS5sb2coJ1VSTCByZWdpc3RybzogJytzZXJ2ZXJVcmwpO1xuXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTsgKi9cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgcGFyYW1zOnsgaWR2aWFqZTppZFZpYWplLCBpZHBhc2FqZXJvOmlkUGFzYWplcm8sZXN0YWRvOmVzdGFkbyxsYXRpdHVkOmxhdGl0dWQsbG9uZ2l0dWQ6bG9uZ2l0dWR9LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIGdldFViaWNhY2lvblZlaGljdWxvKHBsYWNhKXtcbiAgICAgICAgY29uc29sZS5sb2coJ09idGVuaWVuZG8gdWJpY2FjacOzbiBkZWwgdmVow61jdWxvOiAnK3BsYWNhKTtcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2N0Y2FycG9vbGltcC5jbG91ZGFwcC5uZXQvY2FycG9vbHNlcnZpY2VzL2RhdG9zX2dwc19wbGFjYS5hc3B4XCI7XG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBwYXJhbXM6eyBwbGFjYTpwbGFjYX0sIGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgZ2V0SWRNZW1iZXIodXNlcixwYXNzd29yZCkgeyBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cHM6Ly9zZWN1cmUubW9kaXBheS5jby9tb2RpY2FyZC93ZWJyZXNvdXJjZXMvc2VydmljZS9jcmVhclVzdWFyaW9cIjtcbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKCdSZWNpYmlkb3MgLSBVc2VyOicrdXNlcisnIC0gUGFzczogJytwYXNzd29yZCk7XG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTsgKi9cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Qoc2VydmVyVXJsLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgdXNlckU6J2NAcnBvb2xpbmcrJywgcGFzc0U6J0YzT1ozSEBxKlUnLG5hbWU6dXNlcixwYXNzd25hbWU6cGFzc3dvcmRcbiAgICAgICAgICAgIH0pLCB7IFxuICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyBcbiAgICAgICAgfSkucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cbiAgICBhc2lnbmFySWRNZW1iZXIodXNlcixpZE1lbWJlcikgeyBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2N0Y2FycG9vbGltcC5jbG91ZGFwcC5uZXQvY2FycG9vbHNlcnZpY2VzL3JlZ2lzdHJhcl9pZG1vZGlwYXkuYXNweFwiO1xuICAgICAgICAvLz9pZHVzdWFyaW89NCZpZG1vZGlwYXk9MFxuICAgICAgICBjb25zb2xlLmxvZygnUmVjaWJpZG9zIC0gVXNlcjonK3VzZXIrJyAtIGlkTWVtYmVyOiAnK2lkTWVtYmVyKTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgLypyZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwpXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMpOyAqL1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBwYXJhbXM6eyBpZHVzdWFyaW86dXNlcixpZG1vZGlwYXk6aWRNZW1iZXJ9LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cbiAgICBnZXRJZFZhbmdvKGNlZHVsYSxlbWFpbCxub21icmUsZW1wcmVzYSxpZEVtcHJlc2EsY2VsdWxhcixhcGVsbGlkb3MpIHsgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9iaW1vbmV5LmNvL3ZhbmdvU2VydmljZXMvd2VicmVzb3VyY2VzL3NlcnZpY2UvcmVnaXN0cm9NaWVtYnJvXCI7XG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybClcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7ICovXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHNlcnZlclVybCwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIHVzZXJFOidjQHJwb29saW5nKycsIFxuICAgICAgICAgICAgICAgIHBhc3NFOidGM09aM0hAcSpVJyxcbiAgICAgICAgICAgICAgICBub21icmU6bm9tYnJlLFxuICAgICAgICAgICAgICAgIGFwZWxsaWRvOmFwZWxsaWRvcyxcbiAgICAgICAgICAgICAgICBjb3JyZW86ZW1haWwsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6Y2VkdWxhLFxuICAgICAgICAgICAgICAgIG51bUlkZW50aWZpY2FjaW9uOmNlZHVsYSxcbiAgICAgICAgICAgICAgICBjaXVkYWQ6J0JvZ290YScsXG4gICAgICAgICAgICAgICAgZW1wcmVzYTplbXByZXNhLFxuICAgICAgICAgICAgICAgIGNlbnRyb2RlY29zdG86JycsXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNpYTE6XCJcIixcbiAgICAgICAgICAgICAgICByZWZlcmVuY2lhMjpcIlwiLFxuICAgICAgICAgICAgICAgIHJlZmVyZW5jaWEzOlwiXCIsXG4gICAgICAgICAgICAgICAgZmVjaGFkZWNhZHVjaWRhZDpcIlwiLFxuICAgICAgICAgICAgICAgIHJlZ2xhZGVDb25zdW1vOlwiXCIsXG4gICAgICAgICAgICAgICAgYnJva2VyOmlkRW1wcmVzYSxcbiAgICAgICAgICAgICAgICBtb3ZpbDpjZWx1bGFyXG4gICAgICAgICAgICB9KSwgeyBcbiAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMgXG4gICAgICAgIH0pLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG4gICAgZ2V0U2FsZG8oaWRWYW5nbyl7XG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9iaW1vbmV5LmNvL3ZhbmdvU2VydmljZXMvd2VicmVzb3VyY2VzL3NlcnZpY2Uvc2FsZG9WYW5nb1wiO1xuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgLypyZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwpXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMpOyAqL1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChzZXJ2ZXJVcmwsIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICB1c2VyRTonY0BycG9vbGluZysnLCBcbiAgICAgICAgICAgICAgICBwYXNzRTonRjNPWjNIQHEqVScsXG4gICAgICAgICAgICAgICAgaWR0eDpcIjExXCIsXG4gICAgICAgICAgICAgICAgaWR2YW5nbzppZFZhbmdvXG4gICAgICAgICAgICAgICAgLy9pZHZhbmdvOlwiNjYwNTMwMjhcIlxuICAgICAgICAgICAgfSksIHsgXG4gICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzIFxuICAgICAgICB9KS5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuICAgIGdldFRyYW5zYWNjaW9uZXMoaWRWYW5nbyl7XG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9iaW1vbmV5LmNvL3ZhbmdvU2VydmljZXMvd2VicmVzb3VyY2VzL3NlcnZpY2UvaGlzdG9yaWNvVHhcIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTsgKi9cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Qoc2VydmVyVXJsLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgdXNlckU6J2NAcnBvb2xpbmcrJywgXG4gICAgICAgICAgICAgICAgcGFzc0U6J0YzT1ozSEBxKlUnLFxuICAgICAgICAgICAgICAgIGlkdHg6XCIxMVwiLFxuICAgICAgICAgICAgICAgIGlkdmFuZ286aWRWYW5nb1xuICAgICAgICAgICAgICAgIC8vaWR2YW5nbzpcIjY2MDUzMDI4XCJcbiAgICAgICAgICAgIH0pLCB7IFxuICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyBcbiAgICAgICAgfSkucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cbiAgICBhc2lnbmFySWRWYW5nbyh1c2VyLGlkVmFuZ28pIHsgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy9yZWdpc3RyYXJfaWR2YW5nby5hc3B4XCI7XG4gICAgICAgIC8vP2lkdXN1YXJpbz00JmlkbW9kaXBheT0wXG4gICAgICAgIGNvbnNvbGUubG9nKCdSZWNpYmlkb3MgLSBVc2VyOicrdXNlcisnIC0gaWRNZW1iZXI6ICcraWRWYW5nbyk7XG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTsgKi9cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgcGFyYW1zOnsgaWR1c3VhcmlvOnVzZXIsaWR2YW5nbzppZFZhbmdvfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG4gICAgZ2V0RW1wcmVzYXMoKSB7IFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vYmltb25leS5jby92YW5nb1NlcnZpY2VzL3dlYnJlc291cmNlcy9zZXJ2aWNlL3ZhbmdvRW1wcmVzYXNcIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTsgKi9cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Qoc2VydmVyVXJsLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICB1c2VyRTonY0BycG9vbGluZysnLCBcbiAgICAgICAgICAgIHBhc3NFOidGM09aM0hAcSpVJ1xuICAgICAgICB9KSwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG4gICAgcmVnaXN0cmFyVG9rZW4odG9rZW4saWRVc3VhcmlvKSB7IFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvcmVnaXN0cmFyX3Rva2VuX3B1c2guYXNweFwiO1xuICAgICAgICAvLz9pZHVzdWFyaW89NCZpZG1vZGlwYXk9MFxuICAgICAgICBjb25zb2xlLmxvZygnUmVjaWJpZG9zIC0gVG9rZW46Jyt0b2tlbisnIGlkVXN1YXJpbzogJytpZFVzdWFyaW8pO1xuICAgICAgICBsZXQgcGxhdGFmb3JtYTtcbiAgICAgICAgaWYgKHBsYXRmb3JtLmlzSU9TKSB7IFxuICAgICAgICAgIHBsYXRhZm9ybWEgPSAnaU9TJztcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgcGxhdGFmb3JtYSA9ICdBbmRyb2lkJztcbiAgICAgICAgfVxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybClcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7ICovXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IGlkcGFzYWplcm86aWRVc3VhcmlvLGlkY29uZHVjdG9yOicwJyxzaXN0ZW1hOnBsYXRhZm9ybWEsVG9rZW46dG9rZW59LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIGdldFRhcmpldGFzKGlkbWVtYmVyLHBhc3N3b3JkKSB7IFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwczovL3NlY3VyZS5tb2RpcGF5LmNvL21vZGljYXJkL3dlYnJlc291cmNlcy9zZXJ2aWNlL2xpc3RhclRhcmpldGFzXCI7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZygnUmVjaWJpZG9zIC0gVXNlcjonK2lkbWVtYmVyKycgLSBQYXNzOiAnK3Bhc3N3b3JkKTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgLypyZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwpXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMpOyAqLyBcblxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcbiAgICAgICAgICAgIHNlcnZlclVybCwgeyB1c2VyRTpcImNAcnBvb2xpbmcrXCIsIHBhc3NFOlwiRjNPWjNIQHEqVVwiLGlkbWVtYmVyOmlkbWVtYmVyLG1lbWJlcnBhc3N3OnBhc3N3b3JkfSwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMgXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG4gICAgYWdyZWdhclRhcmpldGEoaWRtZW1iZXIsbWVtYmVycGFzc3csbnVtZXJvX3RhcmpldGEsdmVuY2ltaWVudG8sZnJhbnF1aWNpYSxjb2RpZ29fc2VndXJpZGFkKSB7IFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwczovL3NlY3VyZS5tb2RpcGF5LmNvL21vZGljYXJkL3dlYnJlc291cmNlcy9zZXJ2aWNlL2FncmVnYXJUYXJqZXRhXCI7XG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybClcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7ICovIFxuXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxuICAgICAgICAgICAgc2VydmVyVXJsLCB7IFxuICAgICAgICAgICAgICAgIHVzZXJFOlwiY0BycG9vbGluZytcIiwgXG4gICAgICAgICAgICAgICAgcGFzc0U6XCJGM09aM0hAcSpVXCIsXG4gICAgICAgICAgICAgICAgaWRtZW1iZXI6aWRtZW1iZXIsXG4gICAgICAgICAgICAgICAgbWVtYmVycGFzc3c6bWVtYmVycGFzc3csXG4gICAgICAgICAgICAgICAgZGlyZWNjaW9uOid0b2tlbmRpcjEyMzQnLFxuICAgICAgICAgICAgICAgIG51bWVyb190YXJqZXRhOm51bWVyb190YXJqZXRhLFxuICAgICAgICAgICAgICAgIHZlbmNpbWllbnRvOnZlbmNpbWllbnRvLFxuICAgICAgICAgICAgICAgIGZyYW5xdWljaWE6ZnJhbnF1aWNpYSxcbiAgICAgICAgICAgICAgICBjb2RpZ29fc2VndXJpZGFkOmNvZGlnb19zZWd1cmlkYWRcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgZWxpbWluYXJUYXJqZXRhKGlkbWVtYmVyLG1lbWJlcnBhc3N3LGlkdGFyamV0YSkgeyBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cHM6Ly9zZWN1cmUubW9kaXBheS5jby9tb2RpY2FyZC93ZWJyZXNvdXJjZXMvc2VydmljZS9lbGltaW5hclRhcmpldGFcIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsKSovIFxuXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxuICAgICAgICAgICAgc2VydmVyVXJsLCB7IFxuICAgICAgICAgICAgICAgIHVzZXJFOlwiY0BycG9vbGluZytcIiwgXG4gICAgICAgICAgICAgICAgcGFzc0U6XCJGM09aM0hAcSpVXCIsXG4gICAgICAgICAgICAgICAgaWRtZW1iZXI6aWRtZW1iZXIsXG4gICAgICAgICAgICAgICAgbWVtYmVycGFzc3c6bWVtYmVycGFzc3csXG4gICAgICAgICAgICAgICAgaWRjYXJkOmlkdGFyamV0YVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMgXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBwYWdhcihpZG1lbWJlcixtZW1iZXJwYXNzdyxpZHRhcmpldGEsdmFsb3IpIHsgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHBzOi8vc2VjdXJlLm1vZGlwYXkuY28vbW9kaWNhcmQvd2VicmVzb3VyY2VzL3NlcnZpY2UvcGFnb1Rva2VuXCI7XG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCkqLyBcblxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcbiAgICAgICAgICAgIHNlcnZlclVybCwgeyBcbiAgICAgICAgICAgICAgICB1c2VyRTpcImNAcnBvb2xpbmcrXCIsIFxuICAgICAgICAgICAgICAgIHBhc3NFOlwiRjNPWjNIQHEqVVwiLFxuICAgICAgICAgICAgICAgIGlkbWVtYmVyOmlkbWVtYmVyLFxuICAgICAgICAgICAgICAgIG1lbWJlcnBhc3N3Om1lbWJlcnBhc3N3LFxuICAgICAgICAgICAgICAgIGlkVGFyamV0YTppZHRhcmpldGEsXG4gICAgICAgICAgICAgICAgY3VvdGFzOlwiMVwiLFxuICAgICAgICAgICAgICAgIHZhbG9yOnZhbG9yLFxuICAgICAgICAgICAgICAgIHN1YnRvdGFsOlwiMFwiLFxuICAgICAgICAgICAgICAgIGltcHVlc3RvczpcIjBcIixcbiAgICAgICAgICAgICAgICBjb3N0b3NkZWVudmlvOlwiMFwiLFxuICAgICAgICAgICAgICAgIHByb3BpbmE6XCIwXCIsXG4gICAgICAgICAgICAgICAgZGlyZWNjaW9uSXA6XCIxOTIuMTY4LjM0LjIxXCIsXG4gICAgICAgICAgICAgICAgcGFnYWRvcjpcIkNhcmxvcyBDb3J0ZXNyXCIsXG4gICAgICAgICAgICAgICAgZGVzY3JpcGNpb246XCJEZXNjcmlwY2nDs24gZGUgbGEgdmVudGFcIixcbiAgICAgICAgICAgICAgICByZWZlcmVuY2lhOlwiUGFnbyBkZSByZXNlcnZhIC0gU2VDb21wYXJ0ZVwiLFxuICAgICAgICAgICAgICAgIHRlbGVmb25vZGVlbnZpbzpcIjU2NDAzMjNcIixcbiAgICAgICAgICAgICAgICBub21icmVjb21wcmFkb3I6XCJDb21wcmFkb3JcIixcbiAgICAgICAgICAgICAgICBkaXJlY2Npb25lbnZpbzpcIkF2IENhbGxlIDlcIixcbiAgICAgICAgICAgICAgICBwYWlzZGVlbnZpbzpcIkNvbG9tYmlhIFwiLFxuICAgICAgICAgICAgICAgIGNvZGlnb3Bvc3RhbGRlZW52aW86XCIxNjkxMTFcIixcbiAgICAgICAgICAgICAgICByZWZlcmVuY2lhMTpcInJlZmVyZW5jaWEgMSBBcGxpY2FjaW9uXCIsXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNpYTI6XCJyZWZlcmVuY2lhIDIgQXBsaWNhY2lvblwiLFxuICAgICAgICAgICAgICAgIHJlZmVyZW5jaWEzOlwicmVmZXJlbmNpYSAzIEFwbGljYWNpb25cIixcbiAgICAgICAgICAgICAgICB0aXBvZGVpZGVudGlmaWNhY2lvbjpcIkNlZHVsYSBDaXVkYWRhbmlhXCIsXG4gICAgICAgICAgICAgICAgbm9kZUlkZW50aWZpY2FjaW9uOlwiMTExMTExMTExXCIsXG4gICAgICAgICAgICAgICAgY29ycmVvTm90aWZpY2FjaW9uOlwiZGFuaWVsMDcwNzlAZ21haWwuY29tXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgcGFnYXJDb25TYWxkbyhpZFZhbmdvLHZhbG9yKSB7IFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vYmltb25leS5jby92YW5nb1NlcnZpY2VzL3dlYnJlc291cmNlcy9zZXJ2aWNlL3BhZ29zVmFuZ29cIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsKSovIFxuXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxuICAgICAgICAgICAgc2VydmVyVXJsLCB7IFxuICAgICAgICAgICAgICAgIHVzZXJFOlwiY0BycG9vbGluZytcIixcbiAgICAgICAgICAgICAgICBwYXNzRTpcIkYzT1ozSEBxKlVcIixcbiAgICAgICAgICAgICAgICBpZHZhbmdvOmlkVmFuZ28sXG4gICAgICAgICAgICAgICAgdmFsb3I6dmFsb3IsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246XCJcIixcbiAgICAgICAgICAgICAgICB0cmFuc2ZlclR5cGVJZDpcIjM0XCIsXG4gICAgICAgICAgICAgICAgb3JpZ2VuOlwiMjAxOC0wOC0xMCAxMDozNzoxN3xIT1RFTCBOSCBMQSBCT0hFTUUsIENBTExFIDgyLCBCT0dPVMOBLCBDT0xPTUJJQVwiLFxuICAgICAgICAgICAgICAgIGRlc3Rpbm86XCIyMDE4LTA4LTEwIDEwOjM4OjI4fEFORFLDiVMgQ0FSTkUgREUgUkVTLCBDSElBLCBDVU5ESU5BTUFSQ0EsIENPTE9NQklBXCIsXG4gICAgICAgICAgICAgICAgdmlhamFzdGVjb246XCJOb21icmUgQ29tcGxldG8gQ29uZHVjdG9yXCIsXG4gICAgICAgICAgICAgICAgcGxhY2E6XCJQbGFjYSB2YW5cIixcbiAgICAgICAgICAgICAgICBtb2RlbG86XCJWQU4gTWVyY2VkZXpcIixcbiAgICAgICAgICAgICAgICBrbTpcIjMsMzQgS21cIixcbiAgICAgICAgICAgICAgICB0aWVtcG9kZWx2aWFqZTpcIjQ1IE1pbnV0b3NcIixcbiAgICAgICAgICAgICAgICBydXRhOlwiR2VvcG9zaWNpb25cIixcbiAgICAgICAgICAgICAgICByZWNhcmdvOlwiMCAgICAgIC8gICAgNCw1MDBcIixcbiAgICAgICAgICAgICAgICBkZXNjdWVudG86XCIwICAgLyAgICAgNCwwMDBcIixcbiAgICAgICAgICAgICAgICBjb3J0ZXNpYTpcIjAgIC8gICAxLDUwMC4wMFwiLFxuICAgICAgICAgICAgICAgIHJlc2VydmE6XCI0MzQyMzRcIixcbiAgICAgICAgICAgICAgICB2YWxlRGlnaXRhbDpcImNvZGlnbyBkZSB2YWxlIHNpIGVzIG5lY2VzYXJpb1wiLFxuICAgICAgICAgICAgICAgIHB1bnRvc1JlZGltaWRvczpcIjMzIFB1bnRvc1wiLFxuICAgICAgICAgICAgICAgIGNhbGlmaWNhY2lvbjpcIjVcIixcbiAgICAgICAgICAgICAgICBkZXNjcmlwY2lvbjpcInJldW5pb25cIixcbiAgICAgICAgICAgICAgICBnZW9Qb3NpY2lvbjpcImdlb1Bvc2ljaW9uXCIsXG4gICAgICAgICAgICAgICAgdmFsaWRhZG9yR1BTOlwiaW1laSBlcXVpcG9cIixcbiAgICAgICAgICAgICAgICBpZFNlcnZpY2lvOlwiY29kaWdvIGludGVncmFjaW9uIGNvbiBvdHJvcyBzaXN0ZW1hc1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIC8qZ2V0UmVzcG9uc2VJbmZvKCkge1xuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnNlcnZlclVybCwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAuZG8ocmVzID0+ICByZXMpO1xuICAgIH0qL1xuXG4gICAgcHJpdmF0ZSBjcmVhdGVSZXF1ZXN0SGVhZGVyKCkge1xuICAgICAgICAvLyBzZXQgaGVhZGVycyBoZXJlIGUuZy5cbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaGVhZGVycztcbiAgICB9XG59Il19