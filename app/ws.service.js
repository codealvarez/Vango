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
    WebService.prototype.getPuntosRuta = function (idRuta) {
        var serverUrl = "http://ctcarpoolimp.cloudapp.net/carpoolservices/traer_paraderos_ruta.aspx";
        var headers = this.createRequestHeader();
        return this.http.get(serverUrl, { params: { idruta: idRuta }, headers: headers })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0MsNENBQXdEO0FBQ3hELDZDQUE2RTtBQUU3RSxtQ0FBcUM7QUFDckM7O2dDQUVnQztBQUdoQztJQUVJLG9CQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO0lBQUksQ0FBQztJQUV6Qyw0QkFBTyxHQUFQLFVBQVEsR0FBRyxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE9BQU87UUFDN0IsSUFBSSxHQUFHLEdBQUcseUNBQXlDLENBQUM7UUFDcEQsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNqQixJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFbEIsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDLENBQUM7WUFDcEMsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUM7Z0JBQ3hCLFNBQVMsSUFBSSxNQUFNLEdBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBQyxJQUFJLEdBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUM1RSxDQUFDO1lBQUEsSUFBSSxDQUFBLENBQUM7Z0JBQ0YsU0FBUyxJQUFJLE1BQU0sR0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFDLElBQUksR0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxH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M0IsV0FBVyxFQUFDLFdBQVc7WUFDdkIsbUJBQW1CLEVBQUMsUUFBUTtZQUM1QixXQUFXLEVBQUMseUJBQXlCO1lBQ3JDLFdBQVcsRUFBQyx5QkFBeUI7WUFDckMsV0FBVyxFQUFDLHlCQUF5QjtZQUNyQyxvQkFBb0IsRUFBQyxtQkFBbUI7WUFDeEMsa0JBQWtCLEVBQUMsV0FBVztZQUM5QixrQkFBa0IsRUFBQyx1QkFBdUI7U0FDN0MsRUFBRTtZQUNDLE9BQU8sRUFBRSxPQUFPO1NBQ25CLENBQUM7YUFDRCxJQUFJLENBQUMsZUFBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7O09BSUc7SUFFSyx3Q0FBbUIsR0FBM0I7UUFDSSx3QkFBd0I7UUFDeEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxrQkFBVyxDQUFDO1lBQzFCLGNBQWMsRUFBRSxrQkFBa0I7U0FDcEMsQ0FBQyxDQUFDO1FBRUosTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBdFZRLFVBQVU7UUFEdEIsaUJBQVUsRUFBRTt5Q0FHaUIsaUJBQVU7T0FGM0IsVUFBVSxDQXVWdEI7SUFBRCxpQkFBQztDQUFBLEFBdlZELElBdVZDO0FBdlZZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCBSZXBsYXlTdWJqZWN0LCBmcm9tLCBvZiwgcmFuZ2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgZmlsdGVyLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQgKiBhcyBwbCBmcm9tICdnb29nbGUtcG9seWxpbmUnO1xuaW1wb3J0ICogYXMgcGxhdGZvcm0gZnJvbSBcInBsYXRmb3JtXCI7XG4vKmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvY2F0Y2hcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7Ki8gXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBXZWJTZXJ2aWNlIHtcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHsgfVxuXG4gICAgZ2V0RGF0YShsYXQsbG9uLGxhdDIsbG9uMixwYXJhZGFzKSB7XG4gICAgICAgIHZhciBrZXkgPSAnQUl6YVN5RC1lS2t3Q0p5MFJieVpYQlFTT3hJV3dZNlU4OVExdVUwJztcbiAgICAgICAgdmFyIHdheXBvaW50cyA9ICcnO1xuICAgICAgICB2YXIgY29tYSA9ICclMkMnO1xuICAgICAgICB2YXIgYmFycmEgPSAnJTdDJztcblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGFyYWRhcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBpZihwYXJhZGFzLmxlbmd0aCA9PSAoaS0xKSl7XG4gICAgICAgICAgICAgICAgd2F5cG9pbnRzICs9ICd2aWE6JytwYXJhZGFzW2ldWzBdLmxhdGl0dWRlK2NvbWErcGFyYWRhc1tpXVswXS5sb25naXR1ZGU7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB3YXlwb2ludHMgKz0gJ3ZpYTonK3BhcmFkYXNbaV1bMF0ubGF0aXR1ZGUrY29tYStwYXJhZGFzW2ldWzBdLmxvbmdpdHVkZStiYXJyYTsgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vbGV0IHdheXNEZWMgPSBwbC5lbmNvZGUoW3BhcmFkYXNbaV1bMF0scGFyYWRhc1tpXVsxXV0pO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnUHVudG8gJysoaSsxKSsnOicrW3BhcmFkYXNbaV1bMF0scGFyYWRhc1tpXVsxXSsnIC0tICcrd2F5c0RlYyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShwYXJhZGFzW2ldKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICAgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9kaXJlY3Rpb25zL2pzb24/b3JpZ2luPVwiK2xhdCtcIixcIitsb24rXCImZGVzdGluYXRpb249XCIrbGF0MitcIixcIitsb24yK1wiJndheXBvaW50cz1cIit3YXlwb2ludHMrXCIma2V5PVwiK2tleTtcbiAgICAgICAgLy92YXIgc2VydmVyVXJsID0gXCJodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvZGlyZWN0aW9ucy9qc29uP29yaWdpbj00LjcwMTQxMjgsLTc0LjE0NjY4NTYmZGVzdGluYXRpb249NC42NzY1NTg0LC03NC4wNTM2NjY2JndheXBvaW50cz12aWE6UmljYXVydGUsQm9nb3QlQzMlQTEma2V5PUFJemFTeUQtZUtrd0NKeTBSYnlaWEJRU094SVd3WTZVODlRMXVVMFwiO1xuICAgICAgICBjb25zb2xlLmxvZygnUmVjaWJpZG9zIC0gTGF0OicrbGF0KycgLSBMb246ICcrbG9uKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1VSTDogJytzZXJ2ZXJVcmwpO1xuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9IFxuXG4gICAgZ2V0TG9naW4odXNlcixwYXNzd29yZCkgeyBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2N0Y2FycG9vbGltcC5jbG91ZGFwcC5uZXQvY2FycG9vbHNlcnZpY2VzL3ZhbGlkYV9sb2dpbl9wYXNhamVyby5hc3B4XCI7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZygnUmVjaWJpZG9zIC0gVXNlcjonK3VzZXIrJyAtIFBhc3M6ICcrcGFzc3dvcmQpO1xuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybClcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7ICovXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IGNvZGlnb3VzdTp1c2VyLCBjbGF2ZXVzdTonMCd9LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIHJlZ2lzdHJhcihuYW1lLGVtYWlsLGNlZHVsYSxncnVwbykgeyBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2N0Y2FycG9vbGltcC5jbG91ZGFwcC5uZXQvY2FycG9vbHNlcnZpY2VzL3JlZ2lzdHJhcl91c3VhcmlvX3Bhc2FqZXJvLmFzcHhcIjtcbiAgICAgICAgY29uc29sZS5sb2coJ1VSTCByZWdpc3RybzogJytzZXJ2ZXJVcmwpO1xuXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTsgKi9cblxuICAgICAgICBpZighZ3J1cG8pe1xuICAgICAgICAgICAgZ3J1cG8gPSBjZWR1bGE7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ05hbWU6ICcrbmFtZSsnIC0gZW1haWw6ICcrZW1haWwrJyAtIENlZHVsYTogJytjZWR1bGErJyAtIEdydXBvOiAnK2dydXBvKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgcGFyYW1zOnsgY2VkdWxhOmNlZHVsYSwgZ3J1cG86Z3J1cG8sIGVtYWlsOmVtYWlsLCBub21icmU6bmFtZX0sIGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuICAgIGVudmlhck1lbnNhamUoYXN1bnRvLG1lbnNhamUsaWRVc3VhcmlvKSB7IFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvcmVnaXN0cmFyX21lbnNhamVfcGFzYWplcm8uYXNweFwiO1xuICAgICAgICBjb25zb2xlLmxvZygnVVJMIHJlZ2lzdHJvOiAnK3NlcnZlclVybCk7XG5cbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgLypyZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwpXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMpOyAqL1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBwYXJhbXM6eyBpZHBhc2FqZXJvOmlkVXN1YXJpbywgYXN1bnRvOmFzdW50bywgdGV4dG86bWVuc2FqZX0sIGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgYWN0dWFsaXphckRhdG9zKG5vbWJyZSxlbWFpbCxpZFVzdWFyaW8pIHsgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy9hY3R1YWxpemFyX2RhdG9zX3Bhc2FqZXJvLmFzcHhcIjtcbiAgICAgICAgY29uc29sZS5sb2coJ1VSTCByZWdpc3RybzogJytzZXJ2ZXJVcmwpO1xuXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTsgKi9cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgcGFyYW1zOnsgaWRwYXNhamVybzppZFVzdWFyaW8sIG5vbWJyZTpub21icmUsIG1haWw6ZW1haWx9LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIGdldFJ1dGFzQXNpZ25hZGFzKGlkVXN1YXJpbykgeyBcbiAgICAgICAgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy9saXN0YXJfcmVzZXJ2YXNfcGFzYWplcm8uYXNweFwiO1xuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgcGFyYW1zOnsgaWRwYXNhamVybzppZFVzdWFyaW99LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIGdldE1lbnNhamVzKCkgeyBcbiAgICAgICAgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy90cmFlcl9tZW5zYWplc19wcmVkZXRlcm1pbmFkb3MuYXNweFwiO1xuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgcGFyYW1zOnsgb3JpZ2VuOidwYXNhamVybycsZGVzdGlubzonY29uZHVjdG9yJ30sIGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgZ2V0UnV0YXNEaXNwb25pYmxlcyhpZFVzdWFyaW8pIHsgXG4gICAgICAgIC8vbGlzdGFyX3ZpYWplc19ydXRhcy5hc3B4P2lkY29uZHVjdG9yPTAmaWRwYXNhamVybz0yJmVzdGFkbz1QUk9HUkFNQURPXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy9saXN0YXJfcnV0YXNfZGlzcG9uaWJsZXMuYXNweFwiO1xuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBnZXRWaWFqZXNEaXNwb25pYmxlcyhpZFJ1dGEpIHsgXG4gICAgICAgIC8vbGlzdGFyX3ZpYWplc19ydXRhcy5hc3B4P2lkY29uZHVjdG9yPTAmaWRwYXNhamVybz0yJmVzdGFkbz1QUk9HUkFNQURPXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy9saXN0YXJfdmlhamVzX3J1dGFzLmFzcHhcIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IGlkcnV0YTppZFJ1dGF9LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIGdldFRva2Vuc0NvbmR1Y3RvcihpZENvbmR1Y3RvcikgeyBcbiAgICAgICAgLy9saXN0YXJfdmlhamVzX3J1dGFzLmFzcHg/aWRjb25kdWN0b3I9MCZpZHBhc2FqZXJvPTImZXN0YWRvPVBST0dSQU1BRE9cbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2N0Y2FycG9vbGltcC5jbG91ZGFwcC5uZXQvY2FycG9vbHNlcnZpY2VzL3RyYWVyX3Rva2Vuc19wdXNoLmFzcHhcIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IHBhcmFtczp7IGlkcGFzYWplcm86JzAnLGlkY29uZHVjdG9yOmlkQ29uZHVjdG9yfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBlbnZpYXJQdXNoKHRva2VucyxtZW5zYWplKSB7IFxuXG4gICAgICAgIGNvbnNvbGUubG9nKCdUb2tlbnMgcmVjaWJpZG9zJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRva2Vucyk7XG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9hcHBzLmVtZXJhbGRzdHVkaW8uY28vaW1wZXJpYWwvc2VydmljaW9zLnBocD9tZW5zYWplPVwiK21lbnNhamU7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgc2VydmVyVXJsPXNlcnZlclVybCsoJyZ0b2tlbnNbXT0nK3Rva2Vuc1tpXSlcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZygnVVJMIGEgZW52aWFyJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHNlcnZlclVybCk7XG4gICAgICAgIFxuICAgICAgICAvL2xpc3Rhcl92aWFqZXNfcnV0YXMuYXNweD9pZGNvbmR1Y3Rvcj0wJmlkcGFzYWplcm89MiZlc3RhZG89UFJPR1JBTUFET1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgZ2V0UHVudG9zUnV0YShpZFJ1dGEpIHsgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy90cmFlcl9wYXJhZGVyb3NfcnV0YS5hc3B4XCI7XG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBwYXJhbXM6eyBpZHJ1dGE6aWRSdXRhfSwgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBzZXRSZXNlcnZhKGlkUGFzYWplcm8saWRWaWFqZSxsYXRpdHVkLGxvbmdpdHVkLGRpcmVjY2lvbixjYW50aWRhZCkgeyBcbiAgICAgICAgLy9pZFBhc2FqZXJvLGlkVmlhamUsbGF0aXR1ZCxsb25naXR1ZCxkaXJlY2Npb24sY2FudGlkYWRcbiAgICAgICAgY29uc29sZS5sb2coJ0RhdG9zIHJlY2liaWRvczogJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpZFBhc2FqZXJvOiAnK2lkUGFzYWplcm8rJyAtIGlkVmlhamU6ICcraWRWaWFqZSsnIC0gY2FudGlkYWQ6ICcrY2FudGlkYWQrJyAtIGRpcmVjY2lvbjogJytkaXJlY2Npb24pO1xuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwOi8vY3RjYXJwb29saW1wLmNsb3VkYXBwLm5ldC9jYXJwb29sc2VydmljZXMvcmVnaXN0cmFyX3Jlc2VydmEuYXNweFwiO1xuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgcGFyYW1zOnsgaWRwYXNhamVybzppZFBhc2FqZXJvLCBpZHZpYWplOiBpZFZpYWplLCBjYW50aWRhZDpjYW50aWRhZCwgZGlyZWNjaW9uOiBkaXJlY2Npb24sIGxhdGl0dWQ6bGF0aXR1ZCwgbG9uZ2l0dWQ6bG9uZ2l0dWR9LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIGdldFViaWNhY2lvblZlaGljdWxvKHBsYWNhKXtcbiAgICAgICAgY29uc29sZS5sb2coJ09idGVuaWVuZG8gdWJpY2FjacOzbiBkZWwgdmVow61jdWxvOiAnK3BsYWNhKTtcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2N0Y2FycG9vbGltcC5jbG91ZGFwcC5uZXQvY2FycG9vbHNlcnZpY2VzL2RhdG9zX2dwc19wbGFjYS5hc3B4XCI7XG4gICAgICAgIFxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBwYXJhbXM6eyBwbGFjYTpwbGFjYX0sIGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgZ2V0SWRNZW1iZXIodXNlcixwYXNzd29yZCkgeyBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cHM6Ly9zZWN1cmUubW9kaXBheS5jby9tb2RpY2FyZC93ZWJyZXNvdXJjZXMvc2VydmljZS9jcmVhclVzdWFyaW9cIjtcbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKCdSZWNpYmlkb3MgLSBVc2VyOicrdXNlcisnIC0gUGFzczogJytwYXNzd29yZCk7XG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTsgKi9cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Qoc2VydmVyVXJsLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgdXNlckU6J2NAcnBvb2xpbmcrJywgcGFzc0U6J0YzT1ozSEBxKlUnLG5hbWU6dXNlcixwYXNzd25hbWU6cGFzc3dvcmRcbiAgICAgICAgICAgIH0pLCB7IFxuICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyBcbiAgICAgICAgfSkucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cbiAgICBhc2lnbmFySWRNZW1iZXIodXNlcixpZE1lbWJlcikgeyBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cDovL2N0Y2FycG9vbGltcC5jbG91ZGFwcC5uZXQvY2FycG9vbHNlcnZpY2VzL3JlZ2lzdHJhcl9pZG1vZGlwYXkuYXNweFwiO1xuICAgICAgICAvLz9pZHVzdWFyaW89NCZpZG1vZGlwYXk9MFxuICAgICAgICBjb25zb2xlLmxvZygnUmVjaWJpZG9zIC0gVXNlcjonK3VzZXIrJyAtIGlkTWVtYmVyOiAnK2lkTWVtYmVyKTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgLypyZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwpXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMpOyAqL1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwgeyBwYXJhbXM6eyBpZHVzdWFyaW86dXNlcixpZG1vZGlwYXk6aWRNZW1iZXJ9LCBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cbiAgICByZWdpc3RyYXJUb2tlbih0b2tlbixpZFVzdWFyaW8pIHsgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9jdGNhcnBvb2xpbXAuY2xvdWRhcHAubmV0L2NhcnBvb2xzZXJ2aWNlcy9yZWdpc3RyYXJfdG9rZW5fcHVzaC5hc3B4XCI7XG4gICAgICAgIC8vP2lkdXN1YXJpbz00JmlkbW9kaXBheT0wXG4gICAgICAgIGNvbnNvbGUubG9nKCdSZWNpYmlkb3MgLSBUb2tlbjonK3Rva2VuKycgaWRVc3VhcmlvOiAnK2lkVXN1YXJpbyk7XG4gICAgICAgIGxldCBwbGF0YWZvcm1hO1xuICAgICAgICBpZiAocGxhdGZvcm0uaXNJT1MpIHsgXG4gICAgICAgICAgcGxhdGFmb3JtYSA9ICdpT1MnO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBwbGF0YWZvcm1hID0gJ0FuZHJvaWQnO1xuICAgICAgICB9XG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTsgKi9cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgcGFyYW1zOnsgaWRwYXNhamVybzppZFVzdWFyaW8saWRjb25kdWN0b3I6JzAnLHNpc3RlbWE6cGxhdGFmb3JtYSxUb2tlbjp0b2tlbn0sIGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgfVxuXG4gICAgZ2V0VGFyamV0YXMoaWRtZW1iZXIscGFzc3dvcmQpIHsgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHBzOi8vc2VjdXJlLm1vZGlwYXkuY28vbW9kaWNhcmQvd2VicmVzb3VyY2VzL3NlcnZpY2UvbGlzdGFyVGFyamV0YXNcIjtcbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKCdSZWNpYmlkb3MgLSBVc2VyOicraWRtZW1iZXIrJyAtIFBhc3M6ICcrcGFzc3dvcmQpO1xuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvKnJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybClcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7ICovIFxuXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxuICAgICAgICAgICAgc2VydmVyVXJsLCB7IHVzZXJFOlwiY0BycG9vbGluZytcIiwgcGFzc0U6XCJGM09aM0hAcSpVXCIsaWRtZW1iZXI6aWRtZW1iZXIsbWVtYmVycGFzc3c6cGFzc3dvcmR9LCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cbiAgICBhZ3JlZ2FyVGFyamV0YShpZG1lbWJlcixtZW1iZXJwYXNzdyxudW1lcm9fdGFyamV0YSx2ZW5jaW1pZW50byxmcmFucXVpY2lhLGNvZGlnb19zZWd1cmlkYWQpIHsgXG4gICAgICAgIHZhciBzZXJ2ZXJVcmwgPSBcImh0dHBzOi8vc2VjdXJlLm1vZGlwYXkuY28vbW9kaWNhcmQvd2VicmVzb3VyY2VzL3NlcnZpY2UvYWdyZWdhclRhcmpldGFcIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTsgKi8gXG5cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXG4gICAgICAgICAgICBzZXJ2ZXJVcmwsIHsgXG4gICAgICAgICAgICAgICAgdXNlckU6XCJjQHJwb29saW5nK1wiLCBcbiAgICAgICAgICAgICAgICBwYXNzRTpcIkYzT1ozSEBxKlVcIixcbiAgICAgICAgICAgICAgICBpZG1lbWJlcjppZG1lbWJlcixcbiAgICAgICAgICAgICAgICBtZW1iZXJwYXNzdzptZW1iZXJwYXNzdyxcbiAgICAgICAgICAgICAgICBkaXJlY2Npb246J3Rva2VuZGlyMTIzNCcsXG4gICAgICAgICAgICAgICAgbnVtZXJvX3RhcmpldGE6bnVtZXJvX3RhcmpldGEsXG4gICAgICAgICAgICAgICAgdmVuY2ltaWVudG86dmVuY2ltaWVudG8sXG4gICAgICAgICAgICAgICAgZnJhbnF1aWNpYTpmcmFucXVpY2lhLFxuICAgICAgICAgICAgICAgIGNvZGlnb19zZWd1cmlkYWQ6Y29kaWdvX3NlZ3VyaWRhZFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMgXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICBlbGltaW5hclRhcmpldGEoaWRtZW1iZXIsbWVtYmVycGFzc3csaWR0YXJqZXRhKSB7IFxuICAgICAgICB2YXIgc2VydmVyVXJsID0gXCJodHRwczovL3NlY3VyZS5tb2RpcGF5LmNvL21vZGljYXJkL3dlYnJlc291cmNlcy9zZXJ2aWNlL2VsaW1pbmFyVGFyamV0YVwiO1xuICAgICAgICBcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgLypyZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwpKi8gXG5cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXG4gICAgICAgICAgICBzZXJ2ZXJVcmwsIHsgXG4gICAgICAgICAgICAgICAgdXNlckU6XCJjQHJwb29saW5nK1wiLCBcbiAgICAgICAgICAgICAgICBwYXNzRTpcIkYzT1ozSEBxKlVcIixcbiAgICAgICAgICAgICAgICBpZG1lbWJlcjppZG1lbWJlcixcbiAgICAgICAgICAgICAgICBtZW1iZXJwYXNzdzptZW1iZXJwYXNzdyxcbiAgICAgICAgICAgICAgICBpZGNhcmQ6aWR0YXJqZXRhXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIH1cblxuICAgIHBhZ2FyKGlkbWVtYmVyLG1lbWJlcnBhc3N3LGlkdGFyamV0YSx2YWxvcikgeyBcbiAgICAgICAgdmFyIHNlcnZlclVybCA9IFwiaHR0cHM6Ly9zZWN1cmUubW9kaXBheS5jby9tb2RpY2FyZC93ZWJyZXNvdXJjZXMvc2VydmljZS9wYWdvVG9rZW5cIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIC8qcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsKSovIFxuXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxuICAgICAgICAgICAgc2VydmVyVXJsLCB7IFxuICAgICAgICAgICAgICAgIHVzZXJFOlwiY0BycG9vbGluZytcIiwgXG4gICAgICAgICAgICAgICAgcGFzc0U6XCJGM09aM0hAcSpVXCIsXG4gICAgICAgICAgICAgICAgaWRtZW1iZXI6aWRtZW1iZXIsXG4gICAgICAgICAgICAgICAgbWVtYmVycGFzc3c6bWVtYmVycGFzc3csXG4gICAgICAgICAgICAgICAgaWRUYXJqZXRhOmlkdGFyamV0YSxcbiAgICAgICAgICAgICAgICBjdW90YXM6XCIxXCIsXG4gICAgICAgICAgICAgICAgdmFsb3I6dmFsb3IsXG4gICAgICAgICAgICAgICAgc3VidG90YWw6XCIwXCIsXG4gICAgICAgICAgICAgICAgaW1wdWVzdG9zOlwiMFwiLFxuICAgICAgICAgICAgICAgIGNvc3Rvc2RlZW52aW86XCIwXCIsXG4gICAgICAgICAgICAgICAgcHJvcGluYTpcIjBcIixcbiAgICAgICAgICAgICAgICBkaXJlY2Npb25JcDpcIjE5Mi4xNjguMzQuMjFcIixcbiAgICAgICAgICAgICAgICBwYWdhZG9yOlwiQ2FybG9zIENvcnRlc3JcIixcbiAgICAgICAgICAgICAgICBkZXNjcmlwY2lvbjpcIkRlc2NyaXBjacOzbiBkZSBsYSB2ZW50YVwiLFxuICAgICAgICAgICAgICAgIHJlZmVyZW5jaWE6XCJQYWdvIGRlIHJlc2VydmEgLSBTZUNvbXBhcnRlXCIsXG4gICAgICAgICAgICAgICAgdGVsZWZvbm9kZWVudmlvOlwiNTY0MDMyM1wiLFxuICAgICAgICAgICAgICAgIG5vbWJyZWNvbXByYWRvcjpcIkNvbXByYWRvclwiLFxuICAgICAgICAgICAgICAgIGRpcmVjY2lvbmVudmlvOlwiQXYgQ2FsbGUgOVwiLFxuICAgICAgICAgICAgICAgIHBhaXNkZWVudmlvOlwiQ29sb21iaWEgXCIsXG4gICAgICAgICAgICAgICAgY29kaWdvcG9zdGFsZGVlbnZpbzpcIjE2OTExMVwiLFxuICAgICAgICAgICAgICAgIHJlZmVyZW5jaWExOlwicmVmZXJlbmNpYSAxIEFwbGljYWNpb25cIixcbiAgICAgICAgICAgICAgICByZWZlcmVuY2lhMjpcInJlZmVyZW5jaWEgMiBBcGxpY2FjaW9uXCIsXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNpYTM6XCJyZWZlcmVuY2lhIDMgQXBsaWNhY2lvblwiLFxuICAgICAgICAgICAgICAgIHRpcG9kZWlkZW50aWZpY2FjaW9uOlwiQ2VkdWxhIENpdWRhZGFuaWFcIixcbiAgICAgICAgICAgICAgICBub2RlSWRlbnRpZmljYWNpb246XCIxMTExMTExMTFcIixcbiAgICAgICAgICAgICAgICBjb3JyZW9Ob3RpZmljYWNpb246XCJkYW5pZWwwNzA3OUBnbWFpbC5jb21cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMgXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICB9XG5cbiAgICAvKmdldFJlc3BvbnNlSW5mbygpIHtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5zZXJ2ZXJVcmwsIHsgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLmRvKHJlcyA9PiAgcmVzKTtcbiAgICB9Ki9cblxuICAgIHByaXZhdGUgY3JlYXRlUmVxdWVzdEhlYWRlcigpIHtcbiAgICAgICAgLy8gc2V0IGhlYWRlcnMgaGVyZSBlLmcuXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGhlYWRlcnM7XG4gICAgfVxufSJdfQ==