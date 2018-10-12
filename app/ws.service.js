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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0MsNENBQXdEO0FBQ3hELDZDQUE2RTtBQUU3RSxtQ0FBcUM7QUFDckM7O2dDQUVnQztBQUdoQztJQUVJLG9CQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO0lBQUksQ0FBQztJQUV6Qyw0QkFBTyxHQUFQLFVBQVEsR0FBRyxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE9BQU87UUFDN0IsSUFBSSxHQUFHLEdBQUcseUNBQXlDLENBQUM7UUFDcEQsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNqQixJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFbEIsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDLENBQUM7WUFDcEMsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUM7Z0JBQ3hCLFNBQVMsSUFBSSxNQUFNLEdBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBQyxJQUFJLEdBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUM1RSxDQUFDO1lBQUEsSUFBSSxDQUFBLENBQUM7Z0JBQ0YsU0FBUyxJQUFJLE1BQU0sR0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFDLElBQUksR0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxH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LFNBQVM7WUFDckIsV0FBVyxFQUFDLGFBQWE7WUFDekIsWUFBWSxFQUFDLGFBQWE7WUFDMUIsVUFBVSxFQUFDLHVDQUF1QztTQUNyRCxFQUFFO1lBQ0MsT0FBTyxFQUFFLE9BQU87U0FDbkIsQ0FBQzthQUNELElBQUksQ0FBQyxlQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUVLLHdDQUFtQixHQUEzQjtRQUNJLHdCQUF3QjtRQUN4QixJQUFJLE9BQU8sR0FBRyxJQUFJLGtCQUFXLENBQUM7WUFDMUIsY0FBYyxFQUFFLGtCQUFrQjtTQUNwQyxDQUFDLENBQUM7UUFFSixNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUF2Z0JRLFVBQVU7UUFEdEIsaUJBQVUsRUFBRTt5Q0FHaUIsaUJBQVU7T0FGM0IsVUFBVSxDQXdnQnRCO0lBQUQsaUJBQUM7Q0FBQSxBQXhnQkQsSUF3Z0JDO0FBeGdCWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgUmVwbGF5U3ViamVjdCwgZnJvbSwgb2YsIHJhbmdlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIGZpbHRlciwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0ICogYXMgcGwgZnJvbSAnZ29vZ2xlLXBvbHlsaW5lJztcbmltcG9ydCAqIGFzIHBsYXRmb3JtIGZyb20gXCJwbGF0Zm9ybVwiO1xuLyppbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2NhdGNoXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiOyovIFxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV2ViU2VydmljZSB7XG4gICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IH1cblxuICAgIGdldERhdGEobGF0LGxvbixsYXQyLGxvbjIscGFyYWRhcykge1xuICAgICAgICB2YXIga2V5ID0gJ0FJemFTeUQtZUtrd0NKeTBSYnlaWEJRU094SVd3WTZVODlRMXVVMCc7XG4gICAgICAgIHZhciB3YXlwb2ludHMgPSAnJztcbiAgICAgICAgdmFyIGNvbWEgPSAnJTJDJztcbiAgICAgICAgdmFyIGJhcnJhID0gJyU3Qyc7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBhcmFkYXMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgaWYocGFyYWRhcy5sZW5ndGggPT0gKGktMSkpe1xuICAgICAgICAgICAgICAgIHdheXBvaW50cyArPSAndmlhOicrcGFyYWRhc1tpXVswXS5sYXRpdHVkZStjb21hK3BhcmFkYXNbaV1bMF0ubG9uZ2l0dWRlO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgd2F5cG9pbnRzICs9ICd2aWE6JytwYXJhZGFzW2ldWzBdLmxhdGl0dWRlK2NvbWErcGFyYWRhc1tpXVswXS5sb25naXR1ZGUrYmFycmE7ICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL2xldCB3YXlzRGVjID0gcGwuZW5jb2RlKFtwYXJhZGFzW2ldWzBdLHBhcmFkYXNbaV1bMV1dKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ1B1bnRvICcrKGkrMSkrJzonK1twYXJhZGFzW2ldWzBdLHBhcmFkYXNbaV1bMV0rJyAtLSAnK3dheXNEZWMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocGFyYWRhc1tpXSkpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgIFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvZGlyZWN0aW9ucy9qc29uP29yaWdpbj1cIitsYXQrXCIsXCIrbG9uK1wiJmRlc3RpbmF0aW9uPVwiK2xhdDIrXCIsXCIrbG9uMitcIiZ3YXlwb2ludHM9XCIrd2F5cG9pbnRzK1wiJmtleT1cIitrZXk7XG4gICAgICAgIC8vdmFyIHNlcnZlclVybCA9IFwiaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2RpcmVjdGlvbnMvanNvbj9vcmlnaW49NC43MDE0MTI4LC03NC4xNDY2ODU2JmRlc3RpbmF0aW9uPTQuNjc2NTU4NCwtNzQuMDUzNjY2NiZ3YXlwb2ludHM9dmlhOlJpY2F1cnRlLEJvZ290JUMzJUExJmtleT1BSXphU3lELWVLa3dDSnkwUmJ5WlhCUVNPeElXd1k2VTg5UTF1VTBcIjtcbiAgICAgICAgY29uc29sZS5sb2coJ1JlY2liaWRvcyAtIExhdDonK2xhdCsnIC0gTG9uOiAnK2xvbik7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVUkw6ICcrc2VydmVyVXJsKTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfSBcblxuICAgIGdldExvZ2luKHVzZXIscGFzc3dvcmQpIHsgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy92YWxpZGFfbG9naW5fcGFzYWplcm8uYXNweFwiO1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coJ1JlY2liaWRvcyAtIFVzZXI6Jyt1c2VyKycgLSBQYXNzOiAnK3Bhc3N3b3JkKTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgLypyZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwpXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMpOyAqL1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBwYXJhbXM6eyBjb2RpZ291c3U6dXNlciwgY2xhdmV1c3U6JzAnfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICByZWdpc3RyYXIobmFtZSxlbWFpbCxjZWR1bGEsZ3J1cG8pIHsgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy9yZWdpc3RyYXJfdXN1YXJpb19wYXNhamVyby5hc3B4XCI7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVUkwgcmVnaXN0cm86ICcrc2VydmVyVXJsKTtcblxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybClcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7ICovXG5cbiAgICAgICAgaWYoIWdydXBvKXtcbiAgICAgICAgICAgIGdydXBvID0gY2VkdWxhO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCdOYW1lOiAnK25hbWUrJyAtIGVtYWlsOiAnK2VtYWlsKycgLSBDZWR1bGE6ICcrY2VkdWxhKycgLSBHcnVwbzogJytncnVwbyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IGNlZHVsYTpjZWR1bGEsIGdydXBvOmdydXBvLCBlbWFpbDplbWFpbCwgbm9tYnJlOm5hbWV9LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cbiAgICBlbnZpYXJNZW5zYWplKGFzdW50byxtZW5zYWplLGlkVXN1YXJpbykgeyBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2N0Y2FycG9vbGltcC5jbG91ZGFwcC5uZXQvY2FycG9vbHNlcnZpY2VzL3JlZ2lzdHJhcl9tZW5zYWplX3Bhc2FqZXJvLmFzcHhcIjtcbiAgICAgICAgY29uc29sZS5sb2coJ1VSTCByZWdpc3RybzogJytzZXJ2ZXJVcmwpO1xuXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTsgKi9cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgcGFyYW1zOnsgaWRwYXNhamVybzppZFVzdWFyaW8sIGFzdW50bzphc3VudG8sIHRleHRvOm1lbnNhamV9LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIGFjdHVhbGl6YXJEYXRvcyhub21icmUsZW1haWwsaWRVc3VhcmlvKSB7IFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvYWN0dWFsaXphcl9kYXRvc19wYXNhamVyby5hc3B4XCI7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVUkwgcmVnaXN0cm86ICcrc2VydmVyVXJsKTtcblxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybClcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7ICovXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IGlkcGFzYWplcm86aWRVc3VhcmlvLCBub21icmU6bm9tYnJlLCBtYWlsOmVtYWlsfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBnZXRSdXRhc0FzaWduYWRhcyhpZFVzdWFyaW8pIHsgXG4gICAgICAgIFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvbGlzdGFyX3Jlc2VydmFzX3Bhc2FqZXJvLmFzcHhcIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IGlkcGFzYWplcm86aWRVc3VhcmlvfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBnZXRNZW5zYWplcygpIHsgXG4gICAgICAgIFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvdHJhZXJfbWVuc2FqZXNfcHJlZGV0ZXJtaW5hZG9zLmFzcHhcIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IG9yaWdlbjoncGFzYWplcm8nLGRlc3Rpbm86J2NvbmR1Y3Rvcid9LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIGdldFJ1dGFzRGlzcG9uaWJsZXMoaWRVc3VhcmlvKSB7IFxuICAgICAgICAvL2xpc3Rhcl92aWFqZXNfcnV0YXMuYXNweD9pZGNvbmR1Y3Rvcj0wJmlkcGFzYWplcm89MiZlc3RhZG89UFJPR1JBTUFET1xuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvbGlzdGFyX3J1dGFzX2Rpc3BvbmlibGVzLmFzcHhcIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgZ2V0VmlhamVzRGlzcG9uaWJsZXMoaWRSdXRhKSB7IFxuICAgICAgICAvL2xpc3Rhcl92aWFqZXNfcnV0YXMuYXNweD9pZGNvbmR1Y3Rvcj0wJmlkcGFzYWplcm89MiZlc3RhZG89UFJPR1JBTUFET1xuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvbGlzdGFyX3ZpYWplc19ydXRhcy5hc3B4XCI7XG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBwYXJhbXM6eyBpZHJ1dGE6aWRSdXRhfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBnZXREYXRvc1ZpYWplKGlkVmlhamUsaWRQYXNhamVybykgeyBcbiAgICAgICAgLy9saXN0YXJfdmlhamVzX3J1dGFzLmFzcHg/aWRjb25kdWN0b3I9MCZpZHBhc2FqZXJvPTImZXN0YWRvPVBST0dSQU1BRE9cbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2N0Y2FycG9vbGltcC5jbG91ZGFwcC5uZXQvY2FycG9vbHNlcnZpY2VzL2NvbnN1bHRhcl9kYXRvc192aWFqZS5hc3B4XCI7XG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBwYXJhbXM6eyBpZHZpYWplOmlkVmlhamUsaWRwYXNhamVybzppZFBhc2FqZXJvfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBnZXRUb2tlbnNDb25kdWN0b3IoaWRDb25kdWN0b3IpIHsgXG4gICAgICAgIC8vbGlzdGFyX3ZpYWplc19ydXRhcy5hc3B4P2lkY29uZHVjdG9yPTAmaWRwYXNhamVybz0yJmVzdGFkbz1QUk9HUkFNQURPXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy90cmFlcl90b2tlbnNfcHVzaC5hc3B4XCI7XG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBwYXJhbXM6eyBpZHBhc2FqZXJvOicwJyxpZGNvbmR1Y3RvcjppZENvbmR1Y3Rvcn0sIGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgZW52aWFyUHVzaCh0b2tlbnMsbWVuc2FqZSkgeyBcblxuICAgICAgICBjb25zb2xlLmxvZygnVG9rZW5zIHJlY2liaWRvcycpO1xuICAgICAgICBjb25zb2xlLmxvZyh0b2tlbnMpO1xuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vYXBwcy5lbWVyYWxkc3R1ZGlvLmNvL2ltcGVyaWFsL3NlcnZpY2lvcy5waHA/bWVuc2FqZT1cIittZW5zYWplO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIHNlcnZlclVybD1zZXJ2ZXJVcmwrKCcmdG9rZW5zW109Jyt0b2tlbnNbaV0pXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ1VSTCBhIGVudmlhcicpO1xuICAgICAgICBjb25zb2xlLmxvZyhzZXJ2ZXJVcmwpO1xuICAgICAgICBcbiAgICAgICAgLy9saXN0YXJfdmlhamVzX3J1dGFzLmFzcHg/aWRjb25kdWN0b3I9MCZpZHBhc2FqZXJvPTImZXN0YWRvPVBST0dSQU1BRE9cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIGVudmlhclB1c2hDaGVja2luKG1lbnNhamUsdG9rZW5zLGlkUnV0YSxpZFZpYWplLGlkUGFzYWplcm8sbm9tYnJlUGFzYWplcm8pe1xuICAgICAgICBjb25zb2xlLmxvZygnTm90aWZpY2FuZG8gYWwgY29uZHVjdG9yIGVsIG1lbnNhamU6ICcrbWVuc2FqZSsnIGEgbG9zIHRva2VuczonKTtcbiAgICAgICAgY29uc29sZS5sb2codG9rZW5zKTtcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2FwcHMuZW1lcmFsZHN0dWRpby5jby9pbXBlcmlhbC9zZXJ2aWNpb3MzLnBocD9pZHBhc2FqZXJvPVwiK2lkUGFzYWplcm8rXCImaWRydXRhPVwiK2lkUnV0YStcIiZpZHZpYWplPVwiK2lkVmlhamUrXCImbm9tYnJlcGFzYWplcm89XCIrZW5jb2RlVVJJKG5vbWJyZVBhc2FqZXJvKStcIiZtZW5zYWplPVwiK2VuY29kZVVSSShtZW5zYWplKTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBzZXJ2ZXJVcmw9c2VydmVyVXJsKygnJnRva2Vuc1tdPScrdG9rZW5zW2ldKVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCdVUkwgYSBlbnZpYXInKTtcbiAgICAgICAgY29uc29sZS5sb2coc2VydmVyVXJsKTtcbiAgICAgICAgXG4gICAgICAgIC8vbGlzdGFyX3ZpYWplc19ydXRhcy5hc3B4P2lkY29uZHVjdG9yPTAmaWRwYXNhamVybz0yJmVzdGFkbz1QUk9HUkFNQURPXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBnZXRQdW50b3NSdXRhKGlkUnV0YSkgeyBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2N0Y2FycG9vbGltcC5jbG91ZGFwcC5uZXQvY2FycG9vbHNlcnZpY2VzL3RyYWVyX3BhcmFkZXJvc19ydXRhLmFzcHhcIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IGlkcnV0YTppZFJ1dGF9LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIGdldFBlcnNvbmFzKGlkVmlhamUpIHsgXG4gICAgICAgIFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvbGlzdGFyX3Jlc2VydmFzX3ZpYWplLmFzcHhcIjtcbiAgICAgICAgY29uc29sZS5sb2coJ0NvbnN1bHRhbmRvIHBhcmFkZXJvcyBkZWwgdmlhamU6ICcraWRWaWFqZSk7XG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBwYXJhbXM6eyBpZHZpYWplOmlkVmlhamV9LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIHNldFJlc2VydmEoaWRQYXNhamVybyxpZFZpYWplLGxhdGl0dWQsbG9uZ2l0dWQsZGlyZWNjaW9uLGNhbnRpZGFkKSB7IFxuICAgICAgICAvL2lkUGFzYWplcm8saWRWaWFqZSxsYXRpdHVkLGxvbmdpdHVkLGRpcmVjY2lvbixjYW50aWRhZFxuICAgICAgICBjb25zb2xlLmxvZygnRGF0b3MgcmVjaWJpZG9zOiAnKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2lkUGFzYWplcm86ICcraWRQYXNhamVybysnIC0gaWRWaWFqZTogJytpZFZpYWplKycgLSBjYW50aWRhZDogJytjYW50aWRhZCsnIC0gZGlyZWNjaW9uOiAnK2RpcmVjY2lvbik7XG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy9yZWdpc3RyYXJfcmVzZXJ2YS5hc3B4XCI7XG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBwYXJhbXM6eyBpZHBhc2FqZXJvOmlkUGFzYWplcm8sIGlkdmlhamU6IGlkVmlhamUsIGNhbnRpZGFkOmNhbnRpZGFkLCBkaXJlY2Npb246IGRpcmVjY2lvbiwgbGF0aXR1ZDpsYXRpdHVkLCBsb25naXR1ZDpsb25naXR1ZH0sIGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgcmVnaXN0cmFyUGFzYWplcm8oaWRWaWFqZSxpZFBhc2FqZXJvLGVzdGFkbyxsYXRpdHVkLGxvbmdpdHVkKSB7IFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvcmVnaXN0cmFyX2VzdGFkb19wYXNhamVyb192aWFqZS5hc3B4XCI7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVUkwgcmVnaXN0cm86ICcrc2VydmVyVXJsKTtcblxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybClcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7ICovXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IGlkdmlhamU6aWRWaWFqZSwgaWRwYXNhamVybzppZFBhc2FqZXJvLGVzdGFkbzplc3RhZG8sbGF0aXR1ZDpsYXRpdHVkLGxvbmdpdHVkOmxvbmdpdHVkfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBnZXRVYmljYWNpb25WZWhpY3VsbyhwbGFjYSl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdPYnRlbmllbmRvIHViaWNhY2nDs24gZGVsIHZlaMOtY3VsbzogJytwbGFjYSk7XG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy9kYXRvc19ncHNfcGxhY2EuYXNweFwiO1xuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgcGFyYW1zOnsgcGxhY2E6cGxhY2F9LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIGdldElkTWVtYmVyKHVzZXIscGFzc3dvcmQpIHsgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHBzOi8vc2VjdXJlLm1vZGlwYXkuY28vbW9kaWNhcmQvd2VicmVzb3VyY2VzL3NlcnZpY2UvY3JlYXJVc3VhcmlvXCI7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZygnUmVjaWJpZG9zIC0gVXNlcjonK3VzZXIrJyAtIFBhc3M6ICcrcGFzc3dvcmQpO1xuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybClcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7ICovXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHNlcnZlclVybCwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIHVzZXJFOidjQHJwb29saW5nKycsIHBhc3NFOidGM09aM0hAcSpVJyxuYW1lOnVzZXIscGFzc3duYW1lOnBhc3N3b3JkXG4gICAgICAgICAgICB9KSwgeyBcbiAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMgXG4gICAgICAgIH0pLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG4gICAgYXNpZ25hcklkTWVtYmVyKHVzZXIsaWRNZW1iZXIpIHsgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy9yZWdpc3RyYXJfaWRtb2RpcGF5LmFzcHhcIjtcbiAgICAgICAgLy8/aWR1c3VhcmlvPTQmaWRtb2RpcGF5PTBcbiAgICAgICAgY29uc29sZS5sb2coJ1JlY2liaWRvcyAtIFVzZXI6Jyt1c2VyKycgLSBpZE1lbWJlcjogJytpZE1lbWJlcik7XG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTsgKi9cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgcGFyYW1zOnsgaWR1c3VhcmlvOnVzZXIsaWRtb2RpcGF5OmlkTWVtYmVyfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG4gICAgZ2V0SWRWYW5nbyhjZWR1bGEsZW1haWwsbm9tYnJlLGVtcHJlc2EsaWRFbXByZXNhKSB7IFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vYmltb25leS5jby92YW5nb1NlcnZpY2VzL3dlYnJlc291cmNlcy9zZXJ2aWNlL3JlZ2lzdHJvTWllbWJyb1wiO1xuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgLypyZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwpXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMpOyAqL1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChzZXJ2ZXJVcmwsIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICB1c2VyRTonY0BycG9vbGluZysnLCBcbiAgICAgICAgICAgICAgICBwYXNzRTonRjNPWjNIQHEqVScsXG4gICAgICAgICAgICAgICAgbm9tYnJlOm5vbWJyZSxcbiAgICAgICAgICAgICAgICBhcGVsbGlkbzonJyxcbiAgICAgICAgICAgICAgICBjb3JyZW86ZW1haWwsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6Y2VkdWxhLFxuICAgICAgICAgICAgICAgIGNpdWRhZDonQm9nb3RhJyxcbiAgICAgICAgICAgICAgICBlbXByZXNhOmVtcHJlc2EsXG4gICAgICAgICAgICAgICAgY2VudHJvZGVjb3N0bzonQ2VudHJvIENvc3RvIFBydWViYS9DaXVkYWQnLFxuICAgICAgICAgICAgICAgIHJlZmVyZW5jaWExOlwiUmVmMSBQcnVlYmFcIixcbiAgICAgICAgICAgICAgICByZWZlcmVuY2lhMjpcIlJlZjIgUHJ1ZWJhXCIsXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNpYTM6XCJSZWYzIFBydWViYVwiLFxuICAgICAgICAgICAgICAgIGZlY2hhZGVjYWR1Y2lkYWQ6XCJcIixcbiAgICAgICAgICAgICAgICByZWdsYWRlQ29uc3VtbzpcIlwiLFxuICAgICAgICAgICAgICAgIGJyb2tlcjppZEVtcHJlc2EsXG4gICAgICAgICAgICAgICAgbW92aWw6XCJcIlxuICAgICAgICAgICAgfSksIHsgXG4gICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzIFxuICAgICAgICB9KS5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuICAgIGdldFNhbGRvKGlkVmFuZ28pe1xuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vYmltb25leS5jby92YW5nb1NlcnZpY2VzL3dlYnJlc291cmNlcy9zZXJ2aWNlL3NhbGRvVmFuZ29cIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTsgKi9cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Qoc2VydmVyVXJsLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgdXNlckU6J2NAcnBvb2xpbmcrJywgXG4gICAgICAgICAgICAgICAgcGFzc0U6J0YzT1ozSEBxKlUnLFxuICAgICAgICAgICAgICAgIGlkdHg6XCIxMVwiLFxuICAgICAgICAgICAgICAgIGlkdmFuZ286aWRWYW5nb1xuICAgICAgICAgICAgICAgIC8vaWR2YW5nbzpcIjY2MDUzMDI4XCJcbiAgICAgICAgICAgIH0pLCB7IFxuICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyBcbiAgICAgICAgfSkucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cbiAgICBnZXRUcmFuc2FjY2lvbmVzKGlkVmFuZ28pe1xuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vYmltb25leS5jby92YW5nb1NlcnZpY2VzL3dlYnJlc291cmNlcy9zZXJ2aWNlL2hpc3Rvcmljb1R4XCI7XG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybClcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7ICovXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHNlcnZlclVybCwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIHVzZXJFOidjQHJwb29saW5nKycsIFxuICAgICAgICAgICAgICAgIHBhc3NFOidGM09aM0hAcSpVJyxcbiAgICAgICAgICAgICAgICBpZHR4OlwiMTFcIixcbiAgICAgICAgICAgICAgICBpZHZhbmdvOmlkVmFuZ29cbiAgICAgICAgICAgICAgICAvL2lkdmFuZ286XCI2NjA1MzAyOFwiXG4gICAgICAgICAgICB9KSwgeyBcbiAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMgXG4gICAgICAgIH0pLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG4gICAgYXNpZ25hcklkVmFuZ28odXNlcixpZFZhbmdvKSB7IFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvcmVnaXN0cmFyX2lkdmFuZ28uYXNweFwiO1xuICAgICAgICAvLz9pZHVzdWFyaW89NCZpZG1vZGlwYXk9MFxuICAgICAgICBjb25zb2xlLmxvZygnUmVjaWJpZG9zIC0gVXNlcjonK3VzZXIrJyAtIGlkTWVtYmVyOiAnK2lkVmFuZ28pO1xuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybClcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7ICovXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IGlkdXN1YXJpbzp1c2VyLGlkdmFuZ286aWRWYW5nb30sIGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuICAgIGdldEVtcHJlc2FzKCkgeyBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2JpbW9uZXkuY28vdmFuZ29TZXJ2aWNlcy93ZWJyZXNvdXJjZXMvc2VydmljZS92YW5nb0VtcHJlc2FzXCI7XG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybClcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7ICovXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHNlcnZlclVybCwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgdXNlckU6J2NAcnBvb2xpbmcrJywgXG4gICAgICAgICAgICBwYXNzRTonRjNPWjNIQHEqVSdcbiAgICAgICAgfSksIHsgaGVhZGVyczogaGVhZGVycyB9KS5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuICAgIHJlZ2lzdHJhclRva2VuKHRva2VuLGlkVXN1YXJpbykgeyBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2N0Y2FycG9vbGltcC5jbG91ZGFwcC5uZXQvY2FycG9vbHNlcnZpY2VzL3JlZ2lzdHJhcl90b2tlbl9wdXNoLmFzcHhcIjtcbiAgICAgICAgLy8/aWR1c3VhcmlvPTQmaWRtb2RpcGF5PTBcbiAgICAgICAgY29uc29sZS5sb2coJ1JlY2liaWRvcyAtIFRva2VuOicrdG9rZW4rJyBpZFVzdWFyaW86ICcraWRVc3VhcmlvKTtcbiAgICAgICAgbGV0IHBsYXRhZm9ybWE7XG4gICAgICAgIGlmIChwbGF0Zm9ybS5pc0lPUykgeyBcbiAgICAgICAgICBwbGF0YWZvcm1hID0gJ2lPUyc7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHBsYXRhZm9ybWEgPSAnQW5kcm9pZCc7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgLypyZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwpXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMpOyAqL1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBwYXJhbXM6eyBpZHBhc2FqZXJvOmlkVXN1YXJpbyxpZGNvbmR1Y3RvcjonMCcsc2lzdGVtYTpwbGF0YWZvcm1hLFRva2VuOnRva2VufSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBnZXRUYXJqZXRhcyhpZG1lbWJlcixwYXNzd29yZCkgeyBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cHM6Ly9zZWN1cmUubW9kaXBheS5jby9tb2RpY2FyZC93ZWJyZXNvdXJjZXMvc2VydmljZS9saXN0YXJUYXJqZXRhc1wiO1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coJ1JlY2liaWRvcyAtIFVzZXI6JytpZG1lbWJlcisnIC0gUGFzczogJytwYXNzd29yZCk7XG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTsgKi8gXG5cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXG4gICAgICAgICAgICBzZXJ2ZXJVcmwsIHsgdXNlckU6XCJjQHJwb29saW5nK1wiLCBwYXNzRTpcIkYzT1ozSEBxKlVcIixpZG1lbWJlcjppZG1lbWJlcixtZW1iZXJwYXNzdzpwYXNzd29yZH0sIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuICAgIGFncmVnYXJUYXJqZXRhKGlkbWVtYmVyLG1lbWJlcnBhc3N3LG51bWVyb190YXJqZXRhLHZlbmNpbWllbnRvLGZyYW5xdWljaWEsY29kaWdvX3NlZ3VyaWRhZCkgeyBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cHM6Ly9zZWN1cmUubW9kaXBheS5jby9tb2RpY2FyZC93ZWJyZXNvdXJjZXMvc2VydmljZS9hZ3JlZ2FyVGFyamV0YVwiO1xuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgLypyZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwpXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMpOyAqLyBcblxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcbiAgICAgICAgICAgIHNlcnZlclVybCwgeyBcbiAgICAgICAgICAgICAgICB1c2VyRTpcImNAcnBvb2xpbmcrXCIsIFxuICAgICAgICAgICAgICAgIHBhc3NFOlwiRjNPWjNIQHEqVVwiLFxuICAgICAgICAgICAgICAgIGlkbWVtYmVyOmlkbWVtYmVyLFxuICAgICAgICAgICAgICAgIG1lbWJlcnBhc3N3Om1lbWJlcnBhc3N3LFxuICAgICAgICAgICAgICAgIGRpcmVjY2lvbjondG9rZW5kaXIxMjM0JyxcbiAgICAgICAgICAgICAgICBudW1lcm9fdGFyamV0YTpudW1lcm9fdGFyamV0YSxcbiAgICAgICAgICAgICAgICB2ZW5jaW1pZW50bzp2ZW5jaW1pZW50byxcbiAgICAgICAgICAgICAgICBmcmFucXVpY2lhOmZyYW5xdWljaWEsXG4gICAgICAgICAgICAgICAgY29kaWdvX3NlZ3VyaWRhZDpjb2RpZ29fc2VndXJpZGFkXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIGVsaW1pbmFyVGFyamV0YShpZG1lbWJlcixtZW1iZXJwYXNzdyxpZHRhcmpldGEpIHsgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHBzOi8vc2VjdXJlLm1vZGlwYXkuY28vbW9kaWNhcmQvd2VicmVzb3VyY2VzL3NlcnZpY2UvZWxpbWluYXJUYXJqZXRhXCI7XG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCkqLyBcblxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcbiAgICAgICAgICAgIHNlcnZlclVybCwgeyBcbiAgICAgICAgICAgICAgICB1c2VyRTpcImNAcnBvb2xpbmcrXCIsIFxuICAgICAgICAgICAgICAgIHBhc3NFOlwiRjNPWjNIQHEqVVwiLFxuICAgICAgICAgICAgICAgIGlkbWVtYmVyOmlkbWVtYmVyLFxuICAgICAgICAgICAgICAgIG1lbWJlcnBhc3N3Om1lbWJlcnBhc3N3LFxuICAgICAgICAgICAgICAgIGlkY2FyZDppZHRhcmpldGFcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgcGFnYXIoaWRtZW1iZXIsbWVtYmVycGFzc3csaWR0YXJqZXRhLHZhbG9yKSB7IFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwczovL3NlY3VyZS5tb2RpcGF5LmNvL21vZGljYXJkL3dlYnJlc291cmNlcy9zZXJ2aWNlL3BhZ29Ub2tlblwiO1xuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgLypyZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwpKi8gXG5cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXG4gICAgICAgICAgICBzZXJ2ZXJVcmwsIHsgXG4gICAgICAgICAgICAgICAgdXNlckU6XCJjQHJwb29saW5nK1wiLCBcbiAgICAgICAgICAgICAgICBwYXNzRTpcIkYzT1ozSEBxKlVcIixcbiAgICAgICAgICAgICAgICBpZG1lbWJlcjppZG1lbWJlcixcbiAgICAgICAgICAgICAgICBtZW1iZXJwYXNzdzptZW1iZXJwYXNzdyxcbiAgICAgICAgICAgICAgICBpZFRhcmpldGE6aWR0YXJqZXRhLFxuICAgICAgICAgICAgICAgIGN1b3RhczpcIjFcIixcbiAgICAgICAgICAgICAgICB2YWxvcjp2YWxvcixcbiAgICAgICAgICAgICAgICBzdWJ0b3RhbDpcIjBcIixcbiAgICAgICAgICAgICAgICBpbXB1ZXN0b3M6XCIwXCIsXG4gICAgICAgICAgICAgICAgY29zdG9zZGVlbnZpbzpcIjBcIixcbiAgICAgICAgICAgICAgICBwcm9waW5hOlwiMFwiLFxuICAgICAgICAgICAgICAgIGRpcmVjY2lvbklwOlwiMTkyLjE2OC4zNC4yMVwiLFxuICAgICAgICAgICAgICAgIHBhZ2Fkb3I6XCJDYXJsb3MgQ29ydGVzclwiLFxuICAgICAgICAgICAgICAgIGRlc2NyaXBjaW9uOlwiRGVzY3JpcGNpw7NuIGRlIGxhIHZlbnRhXCIsXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNpYTpcIlBhZ28gZGUgcmVzZXJ2YSAtIFNlQ29tcGFydGVcIixcbiAgICAgICAgICAgICAgICB0ZWxlZm9ub2RlZW52aW86XCI1NjQwMzIzXCIsXG4gICAgICAgICAgICAgICAgbm9tYnJlY29tcHJhZG9yOlwiQ29tcHJhZG9yXCIsXG4gICAgICAgICAgICAgICAgZGlyZWNjaW9uZW52aW86XCJBdiBDYWxsZSA5XCIsXG4gICAgICAgICAgICAgICAgcGFpc2RlZW52aW86XCJDb2xvbWJpYSBcIixcbiAgICAgICAgICAgICAgICBjb2RpZ29wb3N0YWxkZWVudmlvOlwiMTY5MTExXCIsXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNpYTE6XCJyZWZlcmVuY2lhIDEgQXBsaWNhY2lvblwiLFxuICAgICAgICAgICAgICAgIHJlZmVyZW5jaWEyOlwicmVmZXJlbmNpYSAyIEFwbGljYWNpb25cIixcbiAgICAgICAgICAgICAgICByZWZlcmVuY2lhMzpcInJlZmVyZW5jaWEgMyBBcGxpY2FjaW9uXCIsXG4gICAgICAgICAgICAgICAgdGlwb2RlaWRlbnRpZmljYWNpb246XCJDZWR1bGEgQ2l1ZGFkYW5pYVwiLFxuICAgICAgICAgICAgICAgIG5vZGVJZGVudGlmaWNhY2lvbjpcIjExMTExMTExMVwiLFxuICAgICAgICAgICAgICAgIGNvcnJlb05vdGlmaWNhY2lvbjpcImRhbmllbDA3MDc5QGdtYWlsLmNvbVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIHBhZ2FyQ29uU2FsZG8oaWRWYW5nbyx2YWxvcikgeyBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2JpbW9uZXkuY28vdmFuZ29TZXJ2aWNlcy93ZWJyZXNvdXJjZXMvc2VydmljZS9wYWdvc1ZhbmdvXCI7XG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCkqLyBcblxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcbiAgICAgICAgICAgIHNlcnZlclVybCwgeyBcbiAgICAgICAgICAgICAgICB1c2VyRTpcImNAcnBvb2xpbmcrXCIsXG4gICAgICAgICAgICAgICAgcGFzc0U6XCJGM09aM0hAcSpVXCIsXG4gICAgICAgICAgICAgICAgaWR2YW5nbzppZFZhbmdvLFxuICAgICAgICAgICAgICAgIHZhbG9yOnZhbG9yLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOlwiXCIsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXJUeXBlSWQ6XCJcIixcbiAgICAgICAgICAgICAgICBvcmlnZW46XCIyMDE4LTA4LTEwIDEwOjM3OjE3fEhPVEVMIE5IIExBIEJPSEVNRSwgQ0FMTEUgODIsIEJPR09Uw4EsIENPTE9NQklBXCIsXG4gICAgICAgICAgICAgICAgZGVzdGlubzpcIjIwMTgtMDgtMTAgMTA6Mzg6Mjh8QU5EUsOJUyBDQVJORSBERSBSRVMsIENISUEsIENVTkRJTkFNQVJDQSwgQ09MT01CSUFcIixcbiAgICAgICAgICAgICAgICB2aWFqYXN0ZWNvbjpcIk5vbWJyZSBDb21wbGV0byBDb25kdWN0b3JcIixcbiAgICAgICAgICAgICAgICBwbGFjYTpcIlBsYWNhIHZhblwiLFxuICAgICAgICAgICAgICAgIG1vZGVsbzpcIlZBTiBNZXJjZWRlelwiLFxuICAgICAgICAgICAgICAgIGttOlwiMywzNCBLbVwiLFxuICAgICAgICAgICAgICAgIHRpZW1wb2RlbHZpYWplOlwiNDUgTWludXRvc1wiLFxuICAgICAgICAgICAgICAgIHJ1dGE6XCJHZW9wb3NpY2lvblwiLFxuICAgICAgICAgICAgICAgIHJlY2FyZ286XCIwICAgICAgLyAgICA0LDUwMFwiLFxuICAgICAgICAgICAgICAgIGRlc2N1ZW50bzpcIjAgICAvICAgICA0LDAwMFwiLFxuICAgICAgICAgICAgICAgIGNvcnRlc2lhOlwiMCAgLyAgIDEsNTAwLjAwXCIsXG4gICAgICAgICAgICAgICAgcmVzZXJ2YTpcIjQzNDIzNFwiLFxuICAgICAgICAgICAgICAgIHZhbGVEaWdpdGFsOlwiY29kaWdvIGRlIHZhbGUgc2kgZXMgbmVjZXNhcmlvXCIsXG4gICAgICAgICAgICAgICAgcHVudG9zUmVkaW1pZG9zOlwiMzMgUHVudG9zXCIsXG4gICAgICAgICAgICAgICAgY2FsaWZpY2FjaW9uOlwiNVwiLFxuICAgICAgICAgICAgICAgIGRlc2NyaXBjaW9uOlwicmV1bmlvblwiLFxuICAgICAgICAgICAgICAgIGdlb1Bvc2ljaW9uOlwiZ2VvUG9zaWNpb25cIixcbiAgICAgICAgICAgICAgICB2YWxpZGFkb3JHUFM6XCJpbWVpIGVxdWlwb1wiLFxuICAgICAgICAgICAgICAgIGlkU2VydmljaW86XCJjb2RpZ28gaW50ZWdyYWNpb24gY29uIG90cm9zIHNpc3RlbWFzXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgLypnZXRSZXNwb25zZUluZm8oKSB7XG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuc2VydmVyVXJsLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5kbyhyZXMgPT4gIHJlcyk7XG4gICAgfSovXG5cbiAgICBwcml2YXRlIGNyZWF0ZVJlcXVlc3RIZWFkZXIoKSB7XG4gICAgICAgIC8vIHNldCBoZWFkZXJzIGhlcmUgZS5nLlxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xuICAgIH1cbn0iXX0=