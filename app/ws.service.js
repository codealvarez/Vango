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
    WebService.prototype.getIdVango = function (cedula, email, nombre, empresa, idEmpresa) {
        var serverUrl = "http://bimoney.co/vangoServices/webresources/service/registroMiembro";
        var headers = this.createRequestHeader();
        /*return this.http.get(serverUrl)
            .map(res => res); */
        return this.http.post(serverUrl, JSON.stringify({
            userE: 'c@rpooling+',
            passE: 'F3OZ3H@q*U',
            nombre: nombre,
            apellido: '',
            correo: email,
            password: cedula,
            ciudad: 'Bogota',
            empresa: empresa,
            centrodecosto: 'Centro Costo Prueba/Ciudad',
            referencia1: "Ref1 Prueba",
            referencia2: "Ref2 Prueba",
            referencia3: "Ref3 Prueba",
            fechadecaducidad: "",
            regladeConsumo: "",
            broker: idEmpresa,
            movil: ""
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
            transferTypeId: "",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0MsNENBQXdEO0FBQ3hELDZDQUE2RTtBQUU3RSxtQ0FBcUM7QUFDckM7O2dDQUVnQztBQUdoQztJQUVJLG9CQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO0lBQUksQ0FBQztJQUV6Qyw0QkFBTyxHQUFQLFVBQVEsR0FBRyxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE9BQU87UUFDN0IsSUFBSSxHQUFHLEdBQUcseUNBQXlDLENBQUM7UUFDcEQsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNqQixJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFbEIsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7WUFDbkMsSUFBRyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDO2dCQUN2QixTQUFTLElBQUksTUFBTSxHQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUMsSUFBSSxHQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7YUFDM0U7aUJBQUk7Z0JBQ0QsU0FBUyxJQUFJLE1BQU0sR0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFDLElBQUksR0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFDLEtBQUssQ0FBQzthQUNqRjtZQUVELHlEQUF5RDtZQUN6RCw4RUFBOEU7WUFDOUUsT0FB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RztJQUVLLHdDQUFtQixHQUEzQjtRQUNJLHdCQUF3QjtRQUN4QixJQUFJLE9BQU8sR0FBRyxJQUFJLGtCQUFXLENBQUM7WUFDMUIsY0FBYyxFQUFFLGtCQUFrQjtTQUNwQyxDQUFDLENBQUM7UUFFSixPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBdmlCUSxVQUFVO1FBRHRCLGlCQUFVLEVBQUU7eUNBR2lCLGlCQUFVO09BRjNCLFVBQVUsQ0F3aUJ0QjtJQUFELGlCQUFDO0NBQUEsQUF4aUJELElBd2lCQztBQXhpQlksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIFJlcGxheVN1YmplY3QsIGZyb20sIG9mLCByYW5nZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBmaWx0ZXIsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCAqIGFzIHBsIGZyb20gJ2dvb2dsZS1wb2x5bGluZSc7XG5pbXBvcnQgKiBhcyBwbGF0Zm9ybSBmcm9tIFwicGxhdGZvcm1cIjtcbi8qaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9jYXRjaFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjsqLyBcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdlYlNlcnZpY2Uge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkgeyB9XG5cbiAgICBnZXREYXRhKGxhdCxsb24sbGF0Mixsb24yLHBhcmFkYXMpIHtcbiAgICAgICAgdmFyIGtleSA9ICdBSXphU3lELWVLa3dDSnkwUmJ5WlhCUVNPeElXd1k2VTg5UTF1VTAnO1xuICAgICAgICB2YXIgd2F5cG9pbnRzID0gJyc7XG4gICAgICAgIHZhciBjb21hID0gJyUyQyc7XG4gICAgICAgIHZhciBiYXJyYSA9ICclN0MnO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwYXJhZGFzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGlmKHBhcmFkYXMubGVuZ3RoID09IChpLTEpKXtcbiAgICAgICAgICAgICAgICB3YXlwb2ludHMgKz0gJ3ZpYTonK3BhcmFkYXNbaV1bMF0ubGF0aXR1ZGUrY29tYStwYXJhZGFzW2ldWzBdLmxvbmdpdHVkZTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHdheXBvaW50cyArPSAndmlhOicrcGFyYWRhc1tpXVswXS5sYXRpdHVkZStjb21hK3BhcmFkYXNbaV1bMF0ubG9uZ2l0dWRlK2JhcnJhOyAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9sZXQgd2F5c0RlYyA9IHBsLmVuY29kZShbcGFyYWRhc1tpXVswXSxwYXJhZGFzW2ldWzFdXSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdQdW50byAnKyhpKzEpKyc6JytbcGFyYWRhc1tpXVswXSxwYXJhZGFzW2ldWzFdKycgLS0gJyt3YXlzRGVjKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHBhcmFkYXNbaV0pKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgICBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2RpcmVjdGlvbnMvanNvbj9vcmlnaW49XCIrbGF0K1wiLFwiK2xvbitcIiZkZXN0aW5hdGlvbj1cIitsYXQyK1wiLFwiK2xvbjIrXCImd2F5cG9pbnRzPVwiK3dheXBvaW50cytcIiZrZXk9XCIra2V5O1xuICAgICAgICAvL3ZhciBzZXJ2ZXJVcmwgPSBcImh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9kaXJlY3Rpb25zL2pzb24/b3JpZ2luPTQuNzAxNDEyOCwtNzQuMTQ2Njg1NiZkZXN0aW5hdGlvbj00LjY3NjU1ODQsLTc0LjA1MzY2NjYmd2F5cG9pbnRzPXZpYTpSaWNhdXJ0ZSxCb2dvdCVDMyVBMSZrZXk9QUl6YVN5RC1lS2t3Q0p5MFJieVpYQlFTT3hJV3dZNlU4OVExdVUwXCI7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZWNpYmlkb3MgLSBMYXQ6JytsYXQrJyAtIExvbjogJytsb24pO1xuICAgICAgICBjb25zb2xlLmxvZygnVVJMOiAnK3NlcnZlclVybCk7XG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH0gXG5cbiAgICBnZXRMb2dpbih1c2VyLHBhc3N3b3JkKSB7IFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvdmFsaWRhX2xvZ2luX3Bhc2FqZXJvLmFzcHhcIjtcbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKCdSZWNpYmlkb3MgLSBVc2VyOicrdXNlcisnIC0gUGFzczogJytwYXNzd29yZCk7XG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTsgKi9cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgcGFyYW1zOnsgY29kaWdvdXN1OnVzZXIsIGNsYXZldXN1OnBhc3N3b3JkfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBnZXRDbGF2ZSh1c2VyKSB7IFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvcmVjdXBlcmFyX2NsYXZlLmFzcHhcIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTsgKi9cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgcGFyYW1zOnsgY29kaWdvdXN1OnVzZXJ9LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIGd1YXJkYXJNZW5zYWplKHVzZXIsYXN1bnRvLG1lbnNhamUpIHsgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy9ndWFyZGFyX21lbnNhamUuYXNweFwiO1xuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgLypyZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwpXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMpOyAqL1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBwYXJhbXM6eyBjb2RpZ291c3U6dXNlciwgYXN1bnRvOmFzdW50bywgbWVuc2FqZTptZW5zYWplfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICByZWdpc3RyYXIobmFtZSxlbWFpbCxjZWR1bGEsZ3J1cG8pIHsgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy9yZWdpc3RyYXJfdXN1YXJpb19wYXNhamVyby5hc3B4XCI7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVUkwgcmVnaXN0cm86ICcrc2VydmVyVXJsKTtcblxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybClcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7ICovXG5cbiAgICAgICAgaWYoIWdydXBvKXtcbiAgICAgICAgICAgIGdydXBvID0gY2VkdWxhO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCdOYW1lOiAnK25hbWUrJyAtIGVtYWlsOiAnK2VtYWlsKycgLSBDZWR1bGE6ICcrY2VkdWxhKycgLSBHcnVwbzogJytncnVwbyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IGNlZHVsYTpjZWR1bGEsIGdydXBvOmdydXBvLCBlbWFpbDplbWFpbCwgbm9tYnJlOm5hbWV9LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cbiAgICBlbnZpYXJNZW5zYWplKGFzdW50byxtZW5zYWplLGlkVXN1YXJpbykgeyBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2N0Y2FycG9vbGltcC5jbG91ZGFwcC5uZXQvY2FycG9vbHNlcnZpY2VzL3JlZ2lzdHJhcl9tZW5zYWplX3Bhc2FqZXJvLmFzcHhcIjtcbiAgICAgICAgY29uc29sZS5sb2coJ1VSTCByZWdpc3RybzogJytzZXJ2ZXJVcmwpO1xuXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTsgKi9cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgcGFyYW1zOnsgaWRwYXNhamVybzppZFVzdWFyaW8sIGFzdW50bzphc3VudG8sIHRleHRvOm1lbnNhamV9LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIGFjdHVhbGl6YXJEYXRvcyhub21icmUsZW1haWwsaWRVc3VhcmlvKSB7IFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvYWN0dWFsaXphcl9kYXRvc19wYXNhamVyby5hc3B4XCI7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVUkwgcmVnaXN0cm86ICcrc2VydmVyVXJsKTtcblxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybClcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7ICovXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IGlkcGFzYWplcm86aWRVc3VhcmlvLCBub21icmU6bm9tYnJlLCBtYWlsOmVtYWlsfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBnZXRSdXRhc0FzaWduYWRhcyhpZFVzdWFyaW8pIHsgXG4gICAgICAgIFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvbGlzdGFyX3Jlc2VydmFzX3Bhc2FqZXJvLmFzcHhcIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IGlkcGFzYWplcm86aWRVc3VhcmlvfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBnZXRNZW5zYWplcygpIHsgXG4gICAgICAgIFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvdHJhZXJfbWVuc2FqZXNfcHJlZGV0ZXJtaW5hZG9zLmFzcHhcIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IG9yaWdlbjoncGFzYWplcm8nLGRlc3Rpbm86J2NvbmR1Y3Rvcid9LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIGdldFRlcm1pbm9zKCkgeyBcbiAgICAgICAgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy90cmFlcl9tZW5zYWplc19wcmVkZXRlcm1pbmFkb3MuYXNweFwiO1xuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgcGFyYW1zOnsgb3JpZ2VuOidUWUMnfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBnZXRSdXRhc0Rpc3BvbmlibGVzKGlkVXN1YXJpbykgeyBcbiAgICAgICAgLy9saXN0YXJfdmlhamVzX3J1dGFzLmFzcHg/aWRjb25kdWN0b3I9MCZpZHBhc2FqZXJvPTImZXN0YWRvPVBST0dSQU1BRE9cbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2N0Y2FycG9vbGltcC5jbG91ZGFwcC5uZXQvY2FycG9vbHNlcnZpY2VzL2xpc3Rhcl9ydXRhc19kaXNwb25pYmxlcy5hc3B4XCI7XG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIGdldFZpYWplc0Rpc3BvbmlibGVzKGlkUnV0YSkgeyBcbiAgICAgICAgLy9saXN0YXJfdmlhamVzX3J1dGFzLmFzcHg/aWRjb25kdWN0b3I9MCZpZHBhc2FqZXJvPTImZXN0YWRvPVBST0dSQU1BRE9cbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2N0Y2FycG9vbGltcC5jbG91ZGFwcC5uZXQvY2FycG9vbHNlcnZpY2VzL2xpc3Rhcl92aWFqZXNfcnV0YXMuYXNweFwiO1xuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgcGFyYW1zOnsgaWRydXRhOmlkUnV0YX0sIGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgZ2V0RGF0b3NWaWFqZShpZFZpYWplLGlkUGFzYWplcm8pIHsgXG4gICAgICAgIC8vbGlzdGFyX3ZpYWplc19ydXRhcy5hc3B4P2lkY29uZHVjdG9yPTAmaWRwYXNhamVybz0yJmVzdGFkbz1QUk9HUkFNQURPXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy9jb25zdWx0YXJfZGF0b3NfdmlhamUuYXNweFwiO1xuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgcGFyYW1zOnsgaWR2aWFqZTppZFZpYWplLGlkcGFzYWplcm86aWRQYXNhamVyb30sIGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgZ2V0VG9rZW5zQ29uZHVjdG9yKGlkQ29uZHVjdG9yKSB7IFxuICAgICAgICAvL2xpc3Rhcl92aWFqZXNfcnV0YXMuYXNweD9pZGNvbmR1Y3Rvcj0wJmlkcGFzYWplcm89MiZlc3RhZG89UFJPR1JBTUFET1xuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvdHJhZXJfdG9rZW5zX3B1c2guYXNweFwiO1xuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgcGFyYW1zOnsgaWRwYXNhamVybzonMCcsaWRjb25kdWN0b3I6aWRDb25kdWN0b3J9LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIGVudmlhclB1c2godG9rZW5zLG1lbnNhamUpIHsgXG5cbiAgICAgICAgY29uc29sZS5sb2coJ1Rva2VucyByZWNpYmlkb3MnKTtcbiAgICAgICAgY29uc29sZS5sb2codG9rZW5zKTtcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2FwcHMuZW1lcmFsZHN0dWRpby5jby9pbXBlcmlhbC9zZXJ2aWNpb3MucGhwP21lbnNhamU9XCIrbWVuc2FqZTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBzZXJ2ZXJVcmw9c2VydmVyVXJsKygnJnRva2Vuc1tdPScrdG9rZW5zW2ldKVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCdVUkwgYSBlbnZpYXInKTtcbiAgICAgICAgY29uc29sZS5sb2coc2VydmVyVXJsKTtcbiAgICAgICAgXG4gICAgICAgIC8vbGlzdGFyX3ZpYWplc19ydXRhcy5hc3B4P2lkY29uZHVjdG9yPTAmaWRwYXNhamVybz0yJmVzdGFkbz1QUk9HUkFNQURPXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBlbnZpYXJQdXNoQ2hlY2tpbihtZW5zYWplLHRva2VucyxpZFJ1dGEsaWRWaWFqZSxpZFBhc2FqZXJvLG5vbWJyZVBhc2FqZXJvKXtcbiAgICAgICAgY29uc29sZS5sb2coJ05vdGlmaWNhbmRvIGFsIGNvbmR1Y3RvciBlbCBtZW5zYWplOiAnK21lbnNhamUrJyBhIGxvcyB0b2tlbnM6Jyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRva2Vucyk7XG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9hcHBzLmVtZXJhbGRzdHVkaW8uY28vaW1wZXJpYWwvc2VydmljaW9zMy5waHA/aWRwYXNhamVybz1cIitpZFBhc2FqZXJvK1wiJmlkcnV0YT1cIitpZFJ1dGErXCImaWR2aWFqZT1cIitpZFZpYWplK1wiJm5vbWJyZXBhc2FqZXJvPVwiK2VuY29kZVVSSShub21icmVQYXNhamVybykrXCImbWVuc2FqZT1cIitlbmNvZGVVUkkobWVuc2FqZSk7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgc2VydmVyVXJsPXNlcnZlclVybCsoJyZ0b2tlbnNbXT0nK3Rva2Vuc1tpXSlcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZygnVVJMIGEgZW52aWFyJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHNlcnZlclVybCk7XG4gICAgICAgIFxuICAgICAgICAvL2xpc3Rhcl92aWFqZXNfcnV0YXMuYXNweD9pZGNvbmR1Y3Rvcj0wJmlkcGFzYWplcm89MiZlc3RhZG89UFJPR1JBTUFET1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgZ2V0UHVudG9zUnV0YShpZFJ1dGEpIHsgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy90cmFlcl9wYXJhZGVyb3NfcnV0YS5hc3B4XCI7XG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBwYXJhbXM6eyBpZHJ1dGE6aWRSdXRhfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBnZXRQZXJzb25hcyhpZFZpYWplKSB7IFxuICAgICAgICBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2N0Y2FycG9vbGltcC5jbG91ZGFwcC5uZXQvY2FycG9vbHNlcnZpY2VzL2xpc3Rhcl9yZXNlcnZhc192aWFqZS5hc3B4XCI7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDb25zdWx0YW5kbyBwYXJhZGVyb3MgZGVsIHZpYWplOiAnK2lkVmlhamUpO1xuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgcGFyYW1zOnsgaWR2aWFqZTppZFZpYWplfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBzZXRSZXNlcnZhKGlkUGFzYWplcm8saWRWaWFqZSxsYXRpdHVkLGxvbmdpdHVkLGRpcmVjY2lvbixjYW50aWRhZCkgeyBcbiAgICAgICAgLy9pZFBhc2FqZXJvLGlkVmlhamUsbGF0aXR1ZCxsb25naXR1ZCxkaXJlY2Npb24sY2FudGlkYWRcbiAgICAgICAgY29uc29sZS5sb2coJ0RhdG9zIHJlY2liaWRvczogJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpZFBhc2FqZXJvOiAnK2lkUGFzYWplcm8rJyAtIGlkVmlhamU6ICcraWRWaWFqZSsnIC0gY2FudGlkYWQ6ICcrY2FudGlkYWQrJyAtIGRpcmVjY2lvbjogJytkaXJlY2Npb24pO1xuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvcmVnaXN0cmFyX3Jlc2VydmEuYXNweFwiO1xuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgcGFyYW1zOnsgaWRwYXNhamVybzppZFBhc2FqZXJvLCBpZHZpYWplOiBpZFZpYWplLCBjYW50aWRhZDpjYW50aWRhZCwgZGlyZWNjaW9uOiBkaXJlY2Npb24sIGxhdGl0dWQ6bGF0aXR1ZCwgbG9uZ2l0dWQ6bG9uZ2l0dWR9LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIHJlZ2lzdHJhclBhc2FqZXJvKGlkVmlhamUsaWRQYXNhamVybyxlc3RhZG8sbGF0aXR1ZCxsb25naXR1ZCkgeyBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2N0Y2FycG9vbGltcC5jbG91ZGFwcC5uZXQvY2FycG9vbHNlcnZpY2VzL3JlZ2lzdHJhcl9lc3RhZG9fcGFzYWplcm9fdmlhamUuYXNweFwiO1xuICAgICAgICBjb25zb2xlLmxvZygnVVJMIHJlZ2lzdHJvOiAnK3NlcnZlclVybCk7XG5cbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgLypyZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwpXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMpOyAqL1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBwYXJhbXM6eyBpZHZpYWplOmlkVmlhamUsIGlkcGFzYWplcm86aWRQYXNhamVybyxlc3RhZG86ZXN0YWRvLGxhdGl0dWQ6bGF0aXR1ZCxsb25naXR1ZDpsb25naXR1ZH0sIGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgZ2V0VWJpY2FjaW9uVmVoaWN1bG8ocGxhY2Epe1xuICAgICAgICBjb25zb2xlLmxvZygnT2J0ZW5pZW5kbyB1YmljYWNpw7NuIGRlbCB2ZWjDrWN1bG86ICcrcGxhY2EpO1xuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvZGF0b3NfZ3BzX3BsYWNhLmFzcHhcIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IHBsYWNhOnBsYWNhfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBnZXRJZE1lbWJlcih1c2VyLHBhc3N3b3JkKSB7IFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwczovL3NlY3VyZS5tb2RpcGF5LmNvL21vZGljYXJkL3dlYnJlc291cmNlcy9zZXJ2aWNlL2NyZWFyVXN1YXJpb1wiO1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coJ1JlY2liaWRvcyAtIFVzZXI6Jyt1c2VyKycgLSBQYXNzOiAnK3Bhc3N3b3JkKTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgLypyZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwpXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMpOyAqL1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChzZXJ2ZXJVcmwsIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICB1c2VyRTonY0BycG9vbGluZysnLCBwYXNzRTonRjNPWjNIQHEqVScsbmFtZTp1c2VyLHBhc3N3bmFtZTpwYXNzd29yZFxuICAgICAgICAgICAgfSksIHsgXG4gICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzIFxuICAgICAgICB9KS5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuICAgIGFzaWduYXJJZE1lbWJlcih1c2VyLGlkTWVtYmVyKSB7IFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvcmVnaXN0cmFyX2lkbW9kaXBheS5hc3B4XCI7XG4gICAgICAgIC8vP2lkdXN1YXJpbz00JmlkbW9kaXBheT0wXG4gICAgICAgIGNvbnNvbGUubG9nKCdSZWNpYmlkb3MgLSBVc2VyOicrdXNlcisnIC0gaWRNZW1iZXI6ICcraWRNZW1iZXIpO1xuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybClcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7ICovXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IGlkdXN1YXJpbzp1c2VyLGlkbW9kaXBheTppZE1lbWJlcn0sIGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuICAgIGdldElkVmFuZ28oY2VkdWxhLGVtYWlsLG5vbWJyZSxlbXByZXNhLGlkRW1wcmVzYSkgeyBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2JpbW9uZXkuY28vdmFuZ29TZXJ2aWNlcy93ZWJyZXNvdXJjZXMvc2VydmljZS9yZWdpc3Ryb01pZW1icm9cIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTsgKi9cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Qoc2VydmVyVXJsLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgdXNlckU6J2NAcnBvb2xpbmcrJywgXG4gICAgICAgICAgICAgICAgcGFzc0U6J0YzT1ozSEBxKlUnLFxuICAgICAgICAgICAgICAgIG5vbWJyZTpub21icmUsXG4gICAgICAgICAgICAgICAgYXBlbGxpZG86JycsXG4gICAgICAgICAgICAgICAgY29ycmVvOmVtYWlsLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOmNlZHVsYSxcbiAgICAgICAgICAgICAgICBjaXVkYWQ6J0JvZ290YScsXG4gICAgICAgICAgICAgICAgZW1wcmVzYTplbXByZXNhLFxuICAgICAgICAgICAgICAgIGNlbnRyb2RlY29zdG86J0NlbnRybyBDb3N0byBQcnVlYmEvQ2l1ZGFkJyxcbiAgICAgICAgICAgICAgICByZWZlcmVuY2lhMTpcIlJlZjEgUHJ1ZWJhXCIsXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNpYTI6XCJSZWYyIFBydWViYVwiLFxuICAgICAgICAgICAgICAgIHJlZmVyZW5jaWEzOlwiUmVmMyBQcnVlYmFcIixcbiAgICAgICAgICAgICAgICBmZWNoYWRlY2FkdWNpZGFkOlwiXCIsXG4gICAgICAgICAgICAgICAgcmVnbGFkZUNvbnN1bW86XCJcIixcbiAgICAgICAgICAgICAgICBicm9rZXI6aWRFbXByZXNhLFxuICAgICAgICAgICAgICAgIG1vdmlsOlwiXCJcbiAgICAgICAgICAgIH0pLCB7IFxuICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyBcbiAgICAgICAgfSkucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cbiAgICBnZXRTYWxkbyhpZFZhbmdvKXtcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2JpbW9uZXkuY28vdmFuZ29TZXJ2aWNlcy93ZWJyZXNvdXJjZXMvc2VydmljZS9zYWxkb1ZhbmdvXCI7XG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybClcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7ICovXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHNlcnZlclVybCwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIHVzZXJFOidjQHJwb29saW5nKycsIFxuICAgICAgICAgICAgICAgIHBhc3NFOidGM09aM0hAcSpVJyxcbiAgICAgICAgICAgICAgICBpZHR4OlwiMTFcIixcbiAgICAgICAgICAgICAgICBpZHZhbmdvOmlkVmFuZ29cbiAgICAgICAgICAgICAgICAvL2lkdmFuZ286XCI2NjA1MzAyOFwiXG4gICAgICAgICAgICB9KSwgeyBcbiAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMgXG4gICAgICAgIH0pLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG4gICAgZ2V0VHJhbnNhY2Npb25lcyhpZFZhbmdvKXtcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2JpbW9uZXkuY28vdmFuZ29TZXJ2aWNlcy93ZWJyZXNvdXJjZXMvc2VydmljZS9oaXN0b3JpY29UeFwiO1xuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgLypyZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwpXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMpOyAqL1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChzZXJ2ZXJVcmwsIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICB1c2VyRTonY0BycG9vbGluZysnLCBcbiAgICAgICAgICAgICAgICBwYXNzRTonRjNPWjNIQHEqVScsXG4gICAgICAgICAgICAgICAgaWR0eDpcIjExXCIsXG4gICAgICAgICAgICAgICAgaWR2YW5nbzppZFZhbmdvXG4gICAgICAgICAgICAgICAgLy9pZHZhbmdvOlwiNjYwNTMwMjhcIlxuICAgICAgICAgICAgfSksIHsgXG4gICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzIFxuICAgICAgICB9KS5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuICAgIGFzaWduYXJJZFZhbmdvKHVzZXIsaWRWYW5nbykgeyBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2N0Y2FycG9vbGltcC5jbG91ZGFwcC5uZXQvY2FycG9vbHNlcnZpY2VzL3JlZ2lzdHJhcl9pZHZhbmdvLmFzcHhcIjtcbiAgICAgICAgLy8/aWR1c3VhcmlvPTQmaWRtb2RpcGF5PTBcbiAgICAgICAgY29uc29sZS5sb2coJ1JlY2liaWRvcyAtIFVzZXI6Jyt1c2VyKycgLSBpZE1lbWJlcjogJytpZFZhbmdvKTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgLypyZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwpXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMpOyAqL1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBwYXJhbXM6eyBpZHVzdWFyaW86dXNlcixpZHZhbmdvOmlkVmFuZ299LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cbiAgICBnZXRFbXByZXNhcygpIHsgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9iaW1vbmV5LmNvL3ZhbmdvU2VydmljZXMvd2VicmVzb3VyY2VzL3NlcnZpY2UvdmFuZ29FbXByZXNhc1wiO1xuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgLypyZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwpXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMpOyAqL1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChzZXJ2ZXJVcmwsIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIHVzZXJFOidjQHJwb29saW5nKycsIFxuICAgICAgICAgICAgcGFzc0U6J0YzT1ozSEBxKlUnXG4gICAgICAgIH0pLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSkucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cbiAgICByZWdpc3RyYXJUb2tlbih0b2tlbixpZFVzdWFyaW8pIHsgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy9yZWdpc3RyYXJfdG9rZW5fcHVzaC5hc3B4XCI7XG4gICAgICAgIC8vP2lkdXN1YXJpbz00JmlkbW9kaXBheT0wXG4gICAgICAgIGNvbnNvbGUubG9nKCdSZWNpYmlkb3MgLSBUb2tlbjonK3Rva2VuKycgaWRVc3VhcmlvOiAnK2lkVXN1YXJpbyk7XG4gICAgICAgIGxldCBwbGF0YWZvcm1hO1xuICAgICAgICBpZiAocGxhdGZvcm0uaXNJT1MpIHsgXG4gICAgICAgICAgcGxhdGFmb3JtYSA9ICdpT1MnO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBwbGF0YWZvcm1hID0gJ0FuZHJvaWQnO1xuICAgICAgICB9XG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTsgKi9cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgcGFyYW1zOnsgaWRwYXNhamVybzppZFVzdWFyaW8saWRjb25kdWN0b3I6JzAnLHNpc3RlbWE6cGxhdGFmb3JtYSxUb2tlbjp0b2tlbn0sIGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgZ2V0VGFyamV0YXMoaWRtZW1iZXIscGFzc3dvcmQpIHsgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHBzOi8vc2VjdXJlLm1vZGlwYXkuY28vbW9kaWNhcmQvd2VicmVzb3VyY2VzL3NlcnZpY2UvbGlzdGFyVGFyamV0YXNcIjtcbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKCdSZWNpYmlkb3MgLSBVc2VyOicraWRtZW1iZXIrJyAtIFBhc3M6ICcrcGFzc3dvcmQpO1xuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybClcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7ICovIFxuXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxuICAgICAgICAgICAgc2VydmVyVXJsLCB7IHVzZXJFOlwiY0BycG9vbGluZytcIiwgcGFzc0U6XCJGM09aM0hAcSpVXCIsaWRtZW1iZXI6aWRtZW1iZXIsbWVtYmVycGFzc3c6cGFzc3dvcmR9LCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cbiAgICBhZ3JlZ2FyVGFyamV0YShpZG1lbWJlcixtZW1iZXJwYXNzdyxudW1lcm9fdGFyamV0YSx2ZW5jaW1pZW50byxmcmFucXVpY2lhLGNvZGlnb19zZWd1cmlkYWQpIHsgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHBzOi8vc2VjdXJlLm1vZGlwYXkuY28vbW9kaWNhcmQvd2VicmVzb3VyY2VzL3NlcnZpY2UvYWdyZWdhclRhcmpldGFcIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTsgKi8gXG5cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXG4gICAgICAgICAgICBzZXJ2ZXJVcmwsIHsgXG4gICAgICAgICAgICAgICAgdXNlckU6XCJjQHJwb29saW5nK1wiLCBcbiAgICAgICAgICAgICAgICBwYXNzRTpcIkYzT1ozSEBxKlVcIixcbiAgICAgICAgICAgICAgICBpZG1lbWJlcjppZG1lbWJlcixcbiAgICAgICAgICAgICAgICBtZW1iZXJwYXNzdzptZW1iZXJwYXNzdyxcbiAgICAgICAgICAgICAgICBkaXJlY2Npb246J3Rva2VuZGlyMTIzNCcsXG4gICAgICAgICAgICAgICAgbnVtZXJvX3RhcmpldGE6bnVtZXJvX3RhcmpldGEsXG4gICAgICAgICAgICAgICAgdmVuY2ltaWVudG86dmVuY2ltaWVudG8sXG4gICAgICAgICAgICAgICAgZnJhbnF1aWNpYTpmcmFucXVpY2lhLFxuICAgICAgICAgICAgICAgIGNvZGlnb19zZWd1cmlkYWQ6Y29kaWdvX3NlZ3VyaWRhZFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMgXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBlbGltaW5hclRhcmpldGEoaWRtZW1iZXIsbWVtYmVycGFzc3csaWR0YXJqZXRhKSB7IFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwczovL3NlY3VyZS5tb2RpcGF5LmNvL21vZGljYXJkL3dlYnJlc291cmNlcy9zZXJ2aWNlL2VsaW1pbmFyVGFyamV0YVwiO1xuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgLypyZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwpKi8gXG5cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXG4gICAgICAgICAgICBzZXJ2ZXJVcmwsIHsgXG4gICAgICAgICAgICAgICAgdXNlckU6XCJjQHJwb29saW5nK1wiLCBcbiAgICAgICAgICAgICAgICBwYXNzRTpcIkYzT1ozSEBxKlVcIixcbiAgICAgICAgICAgICAgICBpZG1lbWJlcjppZG1lbWJlcixcbiAgICAgICAgICAgICAgICBtZW1iZXJwYXNzdzptZW1iZXJwYXNzdyxcbiAgICAgICAgICAgICAgICBpZGNhcmQ6aWR0YXJqZXRhXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIHBhZ2FyKGlkbWVtYmVyLG1lbWJlcnBhc3N3LGlkdGFyamV0YSx2YWxvcikgeyBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cHM6Ly9zZWN1cmUubW9kaXBheS5jby9tb2RpY2FyZC93ZWJyZXNvdXJjZXMvc2VydmljZS9wYWdvVG9rZW5cIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsKSovIFxuXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxuICAgICAgICAgICAgc2VydmVyVXJsLCB7IFxuICAgICAgICAgICAgICAgIHVzZXJFOlwiY0BycG9vbGluZytcIiwgXG4gICAgICAgICAgICAgICAgcGFzc0U6XCJGM09aM0hAcSpVXCIsXG4gICAgICAgICAgICAgICAgaWRtZW1iZXI6aWRtZW1iZXIsXG4gICAgICAgICAgICAgICAgbWVtYmVycGFzc3c6bWVtYmVycGFzc3csXG4gICAgICAgICAgICAgICAgaWRUYXJqZXRhOmlkdGFyamV0YSxcbiAgICAgICAgICAgICAgICBjdW90YXM6XCIxXCIsXG4gICAgICAgICAgICAgICAgdmFsb3I6dmFsb3IsXG4gICAgICAgICAgICAgICAgc3VidG90YWw6XCIwXCIsXG4gICAgICAgICAgICAgICAgaW1wdWVzdG9zOlwiMFwiLFxuICAgICAgICAgICAgICAgIGNvc3Rvc2RlZW52aW86XCIwXCIsXG4gICAgICAgICAgICAgICAgcHJvcGluYTpcIjBcIixcbiAgICAgICAgICAgICAgICBkaXJlY2Npb25JcDpcIjE5Mi4xNjguMzQuMjFcIixcbiAgICAgICAgICAgICAgICBwYWdhZG9yOlwiQ2FybG9zIENvcnRlc3JcIixcbiAgICAgICAgICAgICAgICBkZXNjcmlwY2lvbjpcIkRlc2NyaXBjacOzbiBkZSBsYSB2ZW50YVwiLFxuICAgICAgICAgICAgICAgIHJlZmVyZW5jaWE6XCJQYWdvIGRlIHJlc2VydmEgLSBTZUNvbXBhcnRlXCIsXG4gICAgICAgICAgICAgICAgdGVsZWZvbm9kZWVudmlvOlwiNTY0MDMyM1wiLFxuICAgICAgICAgICAgICAgIG5vbWJyZWNvbXByYWRvcjpcIkNvbXByYWRvclwiLFxuICAgICAgICAgICAgICAgIGRpcmVjY2lvbmVudmlvOlwiQXYgQ2FsbGUgOVwiLFxuICAgICAgICAgICAgICAgIHBhaXNkZWVudmlvOlwiQ29sb21iaWEgXCIsXG4gICAgICAgICAgICAgICAgY29kaWdvcG9zdGFsZGVlbnZpbzpcIjE2OTExMVwiLFxuICAgICAgICAgICAgICAgIHJlZmVyZW5jaWExOlwicmVmZXJlbmNpYSAxIEFwbGljYWNpb25cIixcbiAgICAgICAgICAgICAgICByZWZlcmVuY2lhMjpcInJlZmVyZW5jaWEgMiBBcGxpY2FjaW9uXCIsXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNpYTM6XCJyZWZlcmVuY2lhIDMgQXBsaWNhY2lvblwiLFxuICAgICAgICAgICAgICAgIHRpcG9kZWlkZW50aWZpY2FjaW9uOlwiQ2VkdWxhIENpdWRhZGFuaWFcIixcbiAgICAgICAgICAgICAgICBub2RlSWRlbnRpZmljYWNpb246XCIxMTExMTExMTFcIixcbiAgICAgICAgICAgICAgICBjb3JyZW9Ob3RpZmljYWNpb246XCJkYW5pZWwwNzA3OUBnbWFpbC5jb21cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMgXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBwYWdhckNvblNhbGRvKGlkVmFuZ28sdmFsb3IpIHsgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9iaW1vbmV5LmNvL3ZhbmdvU2VydmljZXMvd2VicmVzb3VyY2VzL3NlcnZpY2UvcGFnb3NWYW5nb1wiO1xuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgLypyZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwpKi8gXG5cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXG4gICAgICAgICAgICBzZXJ2ZXJVcmwsIHsgXG4gICAgICAgICAgICAgICAgdXNlckU6XCJjQHJwb29saW5nK1wiLFxuICAgICAgICAgICAgICAgIHBhc3NFOlwiRjNPWjNIQHEqVVwiLFxuICAgICAgICAgICAgICAgIGlkdmFuZ286aWRWYW5nbyxcbiAgICAgICAgICAgICAgICB2YWxvcjp2YWxvcixcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjpcIlwiLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyVHlwZUlkOlwiXCIsXG4gICAgICAgICAgICAgICAgb3JpZ2VuOlwiMjAxOC0wOC0xMCAxMDozNzoxN3xIT1RFTCBOSCBMQSBCT0hFTUUsIENBTExFIDgyLCBCT0dPVMOBLCBDT0xPTUJJQVwiLFxuICAgICAgICAgICAgICAgIGRlc3Rpbm86XCIyMDE4LTA4LTEwIDEwOjM4OjI4fEFORFLDiVMgQ0FSTkUgREUgUkVTLCBDSElBLCBDVU5ESU5BTUFSQ0EsIENPTE9NQklBXCIsXG4gICAgICAgICAgICAgICAgdmlhamFzdGVjb246XCJOb21icmUgQ29tcGxldG8gQ29uZHVjdG9yXCIsXG4gICAgICAgICAgICAgICAgcGxhY2E6XCJQbGFjYSB2YW5cIixcbiAgICAgICAgICAgICAgICBtb2RlbG86XCJWQU4gTWVyY2VkZXpcIixcbiAgICAgICAgICAgICAgICBrbTpcIjMsMzQgS21cIixcbiAgICAgICAgICAgICAgICB0aWVtcG9kZWx2aWFqZTpcIjQ1IE1pbnV0b3NcIixcbiAgICAgICAgICAgICAgICBydXRhOlwiR2VvcG9zaWNpb25cIixcbiAgICAgICAgICAgICAgICByZWNhcmdvOlwiMCAgICAgIC8gICAgNCw1MDBcIixcbiAgICAgICAgICAgICAgICBkZXNjdWVudG86XCIwICAgLyAgICAgNCwwMDBcIixcbiAgICAgICAgICAgICAgICBjb3J0ZXNpYTpcIjAgIC8gICAxLDUwMC4wMFwiLFxuICAgICAgICAgICAgICAgIHJlc2VydmE6XCI0MzQyMzRcIixcbiAgICAgICAgICAgICAgICB2YWxlRGlnaXRhbDpcImNvZGlnbyBkZSB2YWxlIHNpIGVzIG5lY2VzYXJpb1wiLFxuICAgICAgICAgICAgICAgIHB1bnRvc1JlZGltaWRvczpcIjMzIFB1bnRvc1wiLFxuICAgICAgICAgICAgICAgIGNhbGlmaWNhY2lvbjpcIjVcIixcbiAgICAgICAgICAgICAgICBkZXNjcmlwY2lvbjpcInJldW5pb25cIixcbiAgICAgICAgICAgICAgICBnZW9Qb3NpY2lvbjpcImdlb1Bvc2ljaW9uXCIsXG4gICAgICAgICAgICAgICAgdmFsaWRhZG9yR1BTOlwiaW1laSBlcXVpcG9cIixcbiAgICAgICAgICAgICAgICBpZFNlcnZpY2lvOlwiY29kaWdvIGludGVncmFjaW9uIGNvbiBvdHJvcyBzaXN0ZW1hc1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIC8qZ2V0UmVzcG9uc2VJbmZvKCkge1xuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnNlcnZlclVybCwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAuZG8ocmVzID0+ICByZXMpO1xuICAgIH0qL1xuXG4gICAgcHJpdmF0ZSBjcmVhdGVSZXF1ZXN0SGVhZGVyKCkge1xuICAgICAgICAvLyBzZXQgaGVhZGVycyBoZXJlIGUuZy5cbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaGVhZGVycztcbiAgICB9XG59Il19