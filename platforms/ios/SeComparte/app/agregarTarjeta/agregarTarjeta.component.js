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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdyZWdhclRhcmpldGEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWdyZWdhclRhcmpldGEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUE2RDtBQUM3RCw0Q0FBMkM7QUFDM0MsMERBQTREO0FBQzVELG9DQUFzQztBQUN0QyxpRkFBZ0U7QUFHaEU7Ozs7OzhEQUs4RDtBQUM5RCxJQUFJLE1BQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7QUFNcEM7SUFPSSxpQ0FBb0IsZ0JBQWtDLEVBQVUsU0FBcUI7UUFDakY7O3NFQUU4RDtRQUg5QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBWTtRQUhyRixlQUFVLEdBQVUsMkJBQTJCLENBQUM7UUFDaEQsaUJBQVksR0FBUSxHQUFHLENBQUM7SUFPeEIsQ0FBQztJQUNELHlDQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUNELHVEQUFxQixHQUFyQixVQUFzQixFQUFFO1FBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLEVBQUUsQ0FBQSxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQSxDQUFDO1lBQ1YsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFDN0IsQ0FBQztRQUFBLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUEsQ0FBQztZQUNoQixJQUFJLENBQUMsVUFBVSxHQUFHLFlBQVksQ0FBQztRQUNuQyxDQUFDO1FBQUEsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxVQUFVLEdBQUcsa0JBQWtCLENBQUM7UUFDekMsQ0FBQztRQUFBLElBQUks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QUMsR0FBRyxDQUFDLE9BQU87Z0JBQzNFLFlBQVksRUFBRSxJQUFJO2FBQ3JCLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRWxDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNMLENBQUM7SUFFTyxnREFBYyxHQUF0QixVQUF1QixLQUFxQjtRQUN4QyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbkMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUNWLEtBQUssRUFBRSxtQkFBbUI7WUFDMUIsT0FBTyxFQUFFLDhHQUE4RztZQUN2SCxZQUFZLEVBQUUsSUFBSTtTQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRWxDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXJHUSx1QkFBdUI7UUFMbkMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxpQ0FBaUM7U0FDakQsQ0FBQzt5Q0FRd0MseUJBQWdCLEVBQXFCLHVCQUFVO09BUDVFLHVCQUF1QixDQXVHbkM7SUFBRCw4QkFBQztDQUFBLEFBdkdELElBdUdDO0FBdkdZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgV2ViU2VydmljZSB9IGZyb20gXCIuLi93cy5zZXJ2aWNlXCI7XG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0IHtMb2FkaW5nSW5kaWNhdG9yfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7IFxuXG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qIEJlZm9yZSB5b3UgY2FuIG5hdmlnYXRlIHRvIHRoaXMgcGFnZSBmcm9tIHlvdXIgYXBwLCB5b3UgbmVlZCB0byByZWZlcmVuY2UgdGhpcyBwYWdlJ3MgbW9kdWxlIGluIHRoZVxuKiBnbG9iYWwgYXBwIHJvdXRlciBtb2R1bGUuIEFkZCB0aGUgZm9sbG93aW5nIG9iamVjdCB0byB0aGUgZ2xvYmFsIGFycmF5IG9mIHJvdXRlczpcbiogeyBwYXRoOiBcImFncmVnYXJUYXJqZXRhXCIsIGxvYWRDaGlsZHJlbjogXCIuL2FncmVnYXJUYXJqZXRhL2FncmVnYXJUYXJqZXRhLm1vZHVsZSNBZ3JlZ2FyVGFyamV0YU1vZHVsZVwiIH1cbiogTm90ZSB0aGF0IHRoaXMgc2ltcGx5IHBvaW50cyB0aGUgcGF0aCB0byB0aGUgcGFnZSBtb2R1bGUgZmlsZS4gSWYgeW91IG1vdmUgdGhlIHBhZ2UsIHlvdSBuZWVkIHRvIHVwZGF0ZSB0aGUgcm91dGUgdG9vLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmxldCBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiQWdyZWdhclRhcmpldGFcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vYWdyZWdhclRhcmpldGEuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBBZ3JlZ2FyVGFyamV0YUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgbnVtZXJvOnN0cmluZztcbiAgICBmZWNoYTpzdHJpbmc7XG4gICAgY3Z2OnN0cmluZztcbiAgICBmcmFucXVpY2lhOnN0cmluZyA9ICdTZWxlY2Npb25hIHVuYSBmcmFucXVpY2lhJztcbiAgICBpZEZyYW5xdWljaWE6c3RyaW5nPScwJztcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgbXlTZXJ2aWNlOiBXZWJTZXJ2aWNlKSB7XG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogVXNlIHRoZSBjb25zdHJ1Y3RvciB0byBpbmplY3QgYXBwIHNlcnZpY2VzIHRoYXQgeW91IG5lZWQgaW4gdGhpcyBjb21wb25lbnQuXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgICAgIFxuICAgIH1cbiAgICBpckF0cmFzKCkge1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xuICAgIH1cbiAgICBzZWxlY2Npb25hckZyYW5xdWljaWEoaWQpe1xuICAgICAgICB0aGlzLmlkRnJhbnF1aWNpYSA9IGlkO1xuICAgICAgICBpZihpZCA9PSAnMScpe1xuICAgICAgICAgICAgdGhpcy5mcmFucXVpY2lhID0gJ1ZJU0EnO1xuICAgICAgICB9ZWxzZSBpZihpZCA9PSAnMicpe1xuICAgICAgICAgICAgdGhpcy5mcmFucXVpY2lhID0gJ01hc3RlcmNhcmQnO1xuICAgICAgICB9ZWxzZSBpZihpZCA9PSAnMycpe1xuICAgICAgICAgICAgdGhpcy5mcmFucXVpY2lhID0gJ0FtZXJpY2FuIEV4cHJlc3MnO1xuICAgICAgICB9ZWxzZSBpZihpZCA9PSAnNCcpe1xuICAgICAgICAgICAgdGhpcy5mcmFucXVpY2lhID0gJ0RpbmVycyBDbHViJztcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogVXNlIHRoZSBcIm5nT25Jbml0XCIgaGFuZGxlciB0byBpbml0aWFsaXplIGRhdGEgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIH1cbiAgICBhZ3JlZ2FyVGFyamV0YSgpe1xuICAgICAgICBpZih0aGlzLm51bWVybyAmJiB0aGlzLmZyYW5xdWljaWEgIT0gJ1NlbGVjY2lvbmEgdW5hIGZyYW5xdWljaWEnICYmIHRoaXMuZmVjaGEgJiYgdGhpcy5jdnYpe1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsb2FkZXIuc2hvdygpO1xuICAgICAgICAgICAgbGV0IHVzdWFyaW8gPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnZW1haWxVc3VhcmlvJyk7XG4gICAgICAgICAgICBsZXQgaWRtZW1iZXIgPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnaWRtZW1iZXInKTtcbiAgICAgICAgICAgIGxldCBudW1lcm8gPSB0aGlzLm51bWVyby5yZXBsYWNlKC8tL2csIFwiXCIpO1xuICAgICAgICAgICAgbGV0IGZlY2hhRGl2ID0gdGhpcy5mZWNoYS5zcGxpdCgnLycpO1xuICAgICAgICAgICAgbGV0IGFuaW8gPSBmZWNoYURpdlsxXTtcbiAgICAgICAgICAgIGxldCBtZXMgPSBmZWNoYURpdlswXTtcbiAgICAgICAgICAgIGxldCBmZWNoYSA9IG1lcythbmlvO1xuXG4gICAgICAgICAgICB0aGlzLm15U2VydmljZS5hZ3JlZ2FyVGFyamV0YShpZG1lbWJlcix1c3VhcmlvLG51bWVybyxmZWNoYSx0aGlzLmlkRnJhbnF1aWNpYSx0aGlzLmN2dilcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leGl0b1RhcmpldGEocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7ICAgIFxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIkVycm9yXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJEZWJlcyBpbmdyZXNhciB0b2RvcyBsb3MgZGF0b3MgZGUgbGEgdGFyamV0YVwiLFxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ09rISdcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgZXhpdG9UYXJqZXRhKHJlcykge1xuICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlIGluZ3Jlc2FyIHRhcmpldGEnKTtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzKSk7IFxuICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICBpZihyZXMuYWRkQ2FyZCA9PSAnT0snKXtcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnVGFyamV0YSBhZ3JlZ2FkYScsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJHcmFjaWFzLCB0dSB0YXJqZXRhIHNlIGEgYWdyZWdhZG8gZXhpdG9zYW1lbnRlLlwiLFxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ09rJ1xuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3RhcmpldGFzXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnRXJyb3IgYWdyZWdhbmRvIHRhcmpldGEnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiTG8gc2VudGltb3MsIGh1Ym8gdW4gcHJvYmxlbWEgYWdyZWdhbmRvIGxhIHRhcmpldGEuIFwiK3Jlcy5hZGRDYXJkLFxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ09rJ1xuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkdldERhdGFFcnJvcihlcnJvcjogUmVzcG9uc2UgfCBhbnkpIHtcbiAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZSBlcnJvcicpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiAnRXJyb3IgZGUgY29uZXhpw7NuJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiTG8gc2VudGltb3MsIGh1Ym8gdW4gcHJvYmxlbWEgZW5jb250cmFuZG8gZWwgc2Vydmlkb3IsIHZlcmlmaWNhIHR1IGNvbmV4acOzbiBhIEludGVybmV0IGUgaW50ZW50YSBudWV2YW1lbnRlLlwiLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICB9XG4gICBcbn1cbiJdfQ==