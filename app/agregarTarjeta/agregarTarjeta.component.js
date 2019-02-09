"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var ws_service_1 = require("../ws.service");
var ApplicationSettings = require("application-settings");
var dialogs = require("ui/dialogs");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "agregarTarjeta", loadChildren: "./agregarTarjeta/agregarTarjeta.module#AgregarTarjetaModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var AgregarTarjetaComponent = /** @class */ (function () {
    function AgregarTarjetaComponent(routerExtensions, myService) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
        this.routerExtensions = routerExtensions;
        this.myService = myService;
        this.franquicia = 'Selecciona una franquicia';
        this.idFranquicia = '0';
    }
    AgregarTarjetaComponent.prototype.irAtras = function () {
        this.routerExtensions.back();
    };
    AgregarTarjetaComponent.prototype.seleccionarFranquicia = function (id) {
        this.idFranquicia = id;
        if (id == '1') {
            this.franquicia = 'VISA';
        }
        else if (id == '2') {
            this.franquicia = 'Mastercard';
        }
        else if (id == '3') {
            this.franquicia = 'American Express';
        }
        else if (id == '4') {
            this.franquicia = 'Diners Club';
        }
    };
    AgregarTarjetaComponent.prototype.ngOnInit = function () {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    };
    AgregarTarjetaComponent.prototype.agregarTarjeta = function () {
        var _this = this;
        if (this.numero && this.franquicia != 'Selecciona una franquicia' && this.fecha && this.cvv) {
            loader.show();
            var usuario = ApplicationSettings.getString('emailUsuario');
            var idmember = ApplicationSettings.getString('idmember');
            var numero = this.numero.replace(/-/g, "");
            var fechaDiv = this.fecha.split('/');
            var anio = fechaDiv[1];
            var mes = fechaDiv[0];
            var fecha = mes + anio;
            this.myService.agregarTarjeta(idmember, usuario, numero, fecha, this.idFranquicia, this.cvv)
                .subscribe(function (result) {
                _this.exitoTarjeta(result);
            }, function (error) {
                _this.onGetDataError(error);
            });
        }
        else {
            dialogs.alert({
                title: "Error",
                message: "Debes ingresar todos los datos de la tarjeta",
                okButtonText: 'Ok!'
            }).then(function () {
            });
        }
    };
    AgregarTarjetaComponent.prototype.exitoTarjeta = function (res) {
        var _this = this;
        console.log('Respuesta de ingresar tarjeta');
        console.log(JSON.stringify(res));
        loader.hide();
        if (res.addCard == 'OK') {
            dialogs.alert({
                title: 'Tarjeta agregada',
                message: "Gracias, tu tarjeta se a agregado exitosamente.",
                okButtonText: 'Ok'
            }).then(function () {
                console.log("Dialog closed!");
                _this.routerExtensions.navigate(["/tarjetas"], { clearHistory: true });
            });
        }
        else {
            dialogs.alert({
                title: 'Error agregando tarjeta',
                message: "Lo sentimos, hubo un problema agregando la tarjeta. " + res.addCard,
                okButtonText: 'Ok'
            }).then(function () {
                console.log("Dialog closed!");
            });
        }
    };
    AgregarTarjetaComponent.prototype.onGetDataError = function (error) {
        loader.hide();
        console.log('Respuesta de error');
        console.log(JSON.stringify(error));
        dialogs.alert({
            title: 'Error de conexión',
            message: "Lo sentimos, hubo un problema encontrando el servidor, verifica tu conexión a Internet e intenta nuevamente.",
            okButtonText: 'Ok'
        }).then(function () {
            console.log("Dialog closed!");
        });
    };
    AgregarTarjetaComponent = __decorate([
        core_1.Component({
            selector: "AgregarTarjeta",
            moduleId: module.id,
            templateUrl: "./agregarTarjeta.component.html"
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions, ws_service_1.WebService])
    ], AgregarTarjetaComponent);
    return AgregarTarjetaComponent;
}());
exports.AgregarTarjetaComponent = AgregarTarjetaComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdyZWdhclRhcmpldGEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWdyZWdhclRhcmpldGEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUE2RDtBQUM3RCw0Q0FBMkM7QUFDM0MsMERBQTREO0FBQzVELG9DQUFzQztBQUN0QyxpRkFBZ0U7QUFHaEU7Ozs7OzhEQUs4RDtBQUM5RCxJQUFJLE1BQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7QUFNcEM7SUFPSSxpQ0FBb0IsZ0JBQWtDLEVBQVUsU0FBcUI7UUFDakY7O3NFQUU4RDtRQUg5QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBWTtRQUhyRixlQUFVLEdBQVUsMkJBQTJCLENBQUM7UUFDaEQsaUJBQVksR0FBUSxHQUFHLENBQUM7SUFPeEIsQ0FBQztJQUNELHlDQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUNELHVEQUFxQixHQUFyQixVQUFzQixFQUFFO1FBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUcsRUFBRSxJQUFJLEdBQUcsRUFBQztZQUNULElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1NBQzVCO2FBQUssSUFBRyxFQUFFLElBQUksR0FBRyxFQUFDO1lBQ2YsSUFBSSxDQUFDLFVBQVUsR0FBRyxZQUFZLENBQUM7U0FDbEM7YUFBSyxJQUFHLEVBQUUsSUFBSSxHQUFHLEVBQUM7WUFDZixJQUFJLENBQUMsVUFBVSxHQUFHLGtCQUFrQixDQUFDO1NBQ3hDO2FBQUssSUFBRyxFQUFFLElBQUksR0FBRyxFQUFDO1lBQ2YsSUFBSSxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQUM7U0FDbkM7SUFDTCxDQUFDO0lBR0QsMENBQVEsR0FBUjtRQUNJOztzRUFF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QyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNuQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ1YsS0FBSyxFQUFFLG1CQUFtQjtZQUMxQixPQUFPLEVBQUUsOEdBQThHO1lBQ3ZILFlBQVksRUFBRSxJQUFJO1NBQ3JCLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFbEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBckdRLHVCQUF1QjtRQUxuQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGlDQUFpQztTQUNqRCxDQUFDO3lDQVF3Qyx5QkFBZ0IsRUFBcUIsdUJBQVU7T0FQNUUsdUJBQXVCLENBdUduQztJQUFELDhCQUFDO0NBQUEsQUF2R0QsSUF1R0M7QUF2R1ksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBXZWJTZXJ2aWNlIH0gZnJvbSBcIi4uL3dzLnNlcnZpY2VcIjtcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQge0xvYWRpbmdJbmRpY2F0b3J9IGZyb20gXCJuYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3JcIjsgXG5cblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiogQmVmb3JlIHlvdSBjYW4gbmF2aWdhdGUgdG8gdGhpcyBwYWdlIGZyb20geW91ciBhcHAsIHlvdSBuZWVkIHRvIHJlZmVyZW5jZSB0aGlzIHBhZ2UncyBtb2R1bGUgaW4gdGhlXG4qIGdsb2JhbCBhcHAgcm91dGVyIG1vZHVsZS4gQWRkIHRoZSBmb2xsb3dpbmcgb2JqZWN0IHRvIHRoZSBnbG9iYWwgYXJyYXkgb2Ygcm91dGVzOlxuKiB7IHBhdGg6IFwiYWdyZWdhclRhcmpldGFcIiwgbG9hZENoaWxkcmVuOiBcIi4vYWdyZWdhclRhcmpldGEvYWdyZWdhclRhcmpldGEubW9kdWxlI0FncmVnYXJUYXJqZXRhTW9kdWxlXCIgfVxuKiBOb3RlIHRoYXQgdGhpcyBzaW1wbHkgcG9pbnRzIHRoZSBwYXRoIHRvIHRoZSBwYWdlIG1vZHVsZSBmaWxlLiBJZiB5b3UgbW92ZSB0aGUgcGFnZSwgeW91IG5lZWQgdG8gdXBkYXRlIHRoZSByb3V0ZSB0b28uXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xubGV0IGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJBZ3JlZ2FyVGFyamV0YVwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9hZ3JlZ2FyVGFyamV0YS5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIEFncmVnYXJUYXJqZXRhQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBudW1lcm86c3RyaW5nO1xuICAgIGZlY2hhOnN0cmluZztcbiAgICBjdnY6c3RyaW5nO1xuICAgIGZyYW5xdWljaWE6c3RyaW5nID0gJ1NlbGVjY2lvbmEgdW5hIGZyYW5xdWljaWEnO1xuICAgIGlkRnJhbnF1aWNpYTpzdHJpbmc9JzAnO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSBteVNlcnZpY2U6IFdlYlNlcnZpY2UpIHtcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBVc2UgdGhlIGNvbnN0cnVjdG9yIHRvIGluamVjdCBhcHAgc2VydmljZXMgdGhhdCB5b3UgbmVlZCBpbiB0aGlzIGNvbXBvbmVudC5cbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAgICAgXG4gICAgfVxuICAgIGlyQXRyYXMoKSB7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG4gICAgfVxuICAgIHNlbGVjY2lvbmFyRnJhbnF1aWNpYShpZCl7XG4gICAgICAgIHRoaXMuaWRGcmFucXVpY2lhID0gaWQ7XG4gICAgICAgIGlmKGlkID09ICcxJyl7XG4gICAgICAgICAgICB0aGlzLmZyYW5xdWljaWEgPSAnVklTQSc7XG4gICAgICAgIH1lbHNlIGlmKGlkID09ICcyJyl7XG4gICAgICAgICAgICB0aGlzLmZyYW5xdWljaWEgPSAnTWFzdGVyY2FyZCc7XG4gICAgICAgIH1lbHNlIGlmKGlkID09ICczJyl7XG4gICAgICAgICAgICB0aGlzLmZyYW5xdWljaWEgPSAnQW1lcmljYW4gRXhwcmVzcyc7XG4gICAgICAgIH1lbHNlIGlmKGlkID09ICc0Jyl7XG4gICAgICAgICAgICB0aGlzLmZyYW5xdWljaWEgPSAnRGluZXJzIENsdWInO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBVc2UgdGhlIFwibmdPbkluaXRcIiBoYW5kbGVyIHRvIGluaXRpYWxpemUgZGF0YSBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgfVxuICAgIGFncmVnYXJUYXJqZXRhKCl7XG4gICAgICAgIGlmKHRoaXMubnVtZXJvICYmIHRoaXMuZnJhbnF1aWNpYSAhPSAnU2VsZWNjaW9uYSB1bmEgZnJhbnF1aWNpYScgJiYgdGhpcy5mZWNoYSAmJiB0aGlzLmN2dil7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxvYWRlci5zaG93KCk7XG4gICAgICAgICAgICBsZXQgdXN1YXJpbyA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdlbWFpbFVzdWFyaW8nKTtcbiAgICAgICAgICAgIGxldCBpZG1lbWJlciA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdpZG1lbWJlcicpO1xuICAgICAgICAgICAgbGV0IG51bWVybyA9IHRoaXMubnVtZXJvLnJlcGxhY2UoLy0vZywgXCJcIik7XG4gICAgICAgICAgICBsZXQgZmVjaGFEaXYgPSB0aGlzLmZlY2hhLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICBsZXQgYW5pbyA9IGZlY2hhRGl2WzFdO1xuICAgICAgICAgICAgbGV0IG1lcyA9IGZlY2hhRGl2WzBdO1xuICAgICAgICAgICAgbGV0IGZlY2hhID0gbWVzK2FuaW87XG5cbiAgICAgICAgICAgIHRoaXMubXlTZXJ2aWNlLmFncmVnYXJUYXJqZXRhKGlkbWVtYmVyLHVzdWFyaW8sbnVtZXJvLGZlY2hhLHRoaXMuaWRGcmFucXVpY2lhLHRoaXMuY3Z2KVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4aXRvVGFyamV0YShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTsgICAgXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiRXJyb3JcIixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkRlYmVzIGluZ3Jlc2FyIHRvZG9zIGxvcyBkYXRvcyBkZSBsYSB0YXJqZXRhXCIsXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2shJ1xuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICBleGl0b1RhcmpldGEocmVzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGUgaW5ncmVzYXIgdGFyamV0YScpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXMpKTsgXG4gICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgIGlmKHJlcy5hZGRDYXJkID09ICdPSycpe1xuICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdUYXJqZXRhIGFncmVnYWRhJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkdyYWNpYXMsIHR1IHRhcmpldGEgc2UgYSBhZ3JlZ2FkbyBleGl0b3NhbWVudGUuXCIsXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvdGFyamV0YXNcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdFcnJvciBhZ3JlZ2FuZG8gdGFyamV0YScsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJMbyBzZW50aW1vcywgaHVibyB1biBwcm9ibGVtYSBhZ3JlZ2FuZG8gbGEgdGFyamV0YS4gXCIrcmVzLmFkZENhcmQsXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uR2V0RGF0YUVycm9yKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xuICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlIGVycm9yJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgdGl0bGU6ICdFcnJvciBkZSBjb25leGnDs24nLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJMbyBzZW50aW1vcywgaHVibyB1biBwcm9ibGVtYSBlbmNvbnRyYW5kbyBlbCBzZXJ2aWRvciwgdmVyaWZpY2EgdHUgY29uZXhpw7NuIGEgSW50ZXJuZXQgZSBpbnRlbnRhIG51ZXZhbWVudGUuXCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6ICdPaydcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgIH1cbiAgIFxufVxuIl19