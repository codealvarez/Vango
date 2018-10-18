"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var ws_service_1 = require("../ws.service");
var ApplicationSettings = require("application-settings");
var dialogs = require("ui/dialogs");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var page_1 = require("ui/page");
//import { ListViewEventData } from "nativescript-ui-listview";
//import {MixpanelHelper} from "nativescript-mixpanel";
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "registro", loadChildren: "./registro/registro.module#RegistroModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var RegistroComponent = /** @class */ (function () {
    //public empresas=new observableArray.ObservableArray([]);
    function RegistroComponent(routerExtensions, myService, page) {
        this.routerExtensions = routerExtensions;
        this.myService = myService;
        this.page = page;
        this.empresa = 'Selecciona tu empresa';
        this.empresas = [];
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
        this.page.actionBarHidden = true;
        //MixpanelHelper.track('EnRegistro','OK');
    }
    /*get dataItems(): ObservableArray<any> {
        return this._dataItems;
    }*/
    RegistroComponent.prototype.irAtras = function () {
        this.routerExtensions.back();
    };
    RegistroComponent.prototype.ngOnInit = function () {
        var _this = this;
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
        //this.empresas = new ObservableArray<any>();
        this.myService.getEmpresas().subscribe(function (result) {
            console.log('Listado de empresas');
            console.log(result);
            for (var i = 0; i < Object.keys(result).length; i++) {
                _this.empresas.push(result[i]);
            }
            console.log(_this.empresas);
        }, function (error) {
            _this.onGetDataError(error);
        });
    };
    RegistroComponent.prototype.onSignupWithSocialProviderButtonTap = function () {
        /* ***********************************************************
        * For sign up with social provider you can add your custom logic or
        * use NativeScript plugin for sign up with Facebook
        * http://market.nativescript.org/plugins/nativescript-facebook
        *************************************************************/
    };
    RegistroComponent.prototype.seleccionarEmpresa = function () {
        var _this = this;
        var empresas = [];
        for (var i = 0; i < Object.keys(this.empresas).length; i++) {
            console.log(this.empresas[i]);
            empresas.push(this.empresas[i].name);
        }
        dialogs.action({
            message: "Empresas",
            cancelButtonText: "Cancelar",
            actions: empresas
        }).then(function (result) {
            if (result) {
                _this.empresa = result;
                for (var i = 0; i < Object.keys(_this.empresas).length; i++) {
                    console.log(_this.empresas[i]);
                    if (result == _this.empresas[i].name)
                        _this.empresaId = _this.empresas[i].username;
                }
            }
            console.log("Dialog result: " + result);
            if (result == "Option1") {
                //Do action1
            }
            else if (result == "Option2") {
                //Do action2
            }
        });
    };
    RegistroComponent.prototype.onSignupButtonTap = function () {
        var _this = this;
        loader.show();
        var name = this.name;
        var lastname = this.lastname;
        var email = this.email;
        var email2 = this.email2;
        var cedula = this.cedula;
        var celular = this.celular;
        var grupo = this.grupo;
        var empresa = this.empresa;
        var empresaId = this.empresaId;
        if (name && email && email2 && cedula && empresa && empresaId && lastname && celular) {
            //MixpanelHelper.track('CreandoCuenta','OK');
            if (email != email2) {
                loader.hide();
                dialogs.alert({
                    title: 'Error de cuenta',
                    message: 'Tus direcciones de correo no coinciden',
                    okButtonText: 'Ok'
                }).then(function () {
                    console.log("Dialog closed!");
                });
            }
            else {
                this.myService.registrar((name + ' ' + lastname), email, cedula, grupo).subscribe(function (result) {
                    _this.onGetDataSuccess(result);
                }, function (error) {
                    _this.onGetDataError(error);
                });
            }
        }
        else {
            loader.hide();
            dialogs.alert({
                title: 'Error de datos',
                message: 'Debes completar los campos obligatorios',
                okButtonText: 'Ok'
            }).then(function () {
                console.log("Dialog closed!");
            });
        }
        /* ***********************************************************
        * Call your custom signup logic using the email and password data.
        *************************************************************/
    };
    RegistroComponent.prototype.onGetDataSuccess = function (res) {
        var _this = this;
        console.log('Respuesta del registro');
        console.log(JSON.stringify(res));
        loader.hide();
        if (res.resultado == 'OK') {
            //MixpanelHelper.track('CreandoCuentaOK','OK');
            dialogs.alert({
                title: 'Cuenta creada',
                message: res.mensaje,
                okButtonText: 'Gracias!'
            }).then(function () {
                console.log("Dialog closed!");
                _this.myService.getIdMember(_this.cedula, _this.email).subscribe(function (result) {
                    _this.exitoIdMember(result, res.idusuario);
                    //ApplicationSettings.setString('idRegistro',res.idusuario);
                    //this.routerExtensions.navigate(["/login"]);
                }, function (error) {
                    _this.onGetDataError(error);
                });
            });
        }
        else {
            //alert('NO'); 
            //MixpanelHelper.track('CreandoCuentaError','OK');
            dialogs.alert({
                title: 'Error de cuenta',
                message: res.mensaje,
                okButtonText: 'Gracias!'
            }).then(function () {
                console.log("Dialog closed!");
            });
        }
    };
    RegistroComponent.prototype.exitoIdMember = function (res, idUsuario) {
        var _this = this;
        console.log('Respuesta del exitoIdMember');
        console.log(JSON.stringify(res));
        loader.hide();
        this.myService.asignarIdMember(idUsuario, res.idmember).subscribe(function (result) {
            console.log('Respuesta de asignación de ID Memebr');
            console.log(result);
            _this.exitoAsignacionModipay(idUsuario);
        }, function (error) {
            _this.onGetDataError(error);
        });
        ApplicationSettings.setString("idmember", res.idmember);
    };
    RegistroComponent.prototype.exitoAsignacionModipay = function (idUsuario) {
        var _this = this;
        console.log('Respuesta del exitoIdMember');
        loader.hide();
        this.myService.getIdVango(this.cedula, this.email, this.name, this.empresa, this.empresaId, this.celular, this.lastname).subscribe(function (result) {
            console.log('Respuesta de asignación de ID Memebr');
            console.log(result);
            ApplicationSettings.setString("idvango", result.idvango);
            _this.exitoIdVango(idUsuario, result.idvango);
            //this.routerExtensions.navigate(["/login"]);
        }, function (error) {
            _this.onGetDataError(error);
        });
    };
    RegistroComponent.prototype.exitoIdVango = function (idUsuario, idVango) {
        var _this = this;
        console.log('Respuesta del exitoIdMember');
        loader.hide();
        this.myService.asignarIdVango(idUsuario, idVango).subscribe(function (result) {
            console.log('Respuesta de asignación de ID Vango');
            console.log(result);
            _this.routerExtensions.navigate(["/login"]);
        }, function (error) {
            _this.onGetDataError(error);
        });
    };
    RegistroComponent.prototype.onGetDataError = function (error) {
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
    RegistroComponent = __decorate([
        core_1.Component({
            selector: "Registro",
            moduleId: module.id,
            templateUrl: "./registro.component.html",
            providers: [ws_service_1.WebService]
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions, ws_service_1.WebService, page_1.Page])
    ], RegistroComponent);
    return RegistroComponent;
}());
exports.RegistroComponent = RegistroComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cm8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0cm8uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUE2RDtBQUM3RCw0Q0FBMkM7QUFDM0MsMERBQTREO0FBQzVELG9DQUFzQztBQUN0QyxpRkFBZ0U7QUFDaEUsZ0NBQStCO0FBRS9CLCtEQUErRDtBQUMvRCx1REFBdUQ7QUFFdkQ7Ozs7OzhEQUs4RDtBQUM5RCxJQUFJLE1BQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7QUFPcEM7SUFXSSwwREFBMEQ7SUFFMUQsMkJBQW9CLGdCQUFrQyxFQUFVLFNBQXFCLEVBQVMsSUFBVTtRQUFwRixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBWTtRQUFTLFNBQUksR0FBSixJQUFJLENBQU07UUFMeEcsWUFBTyxHQUFRLHVCQUF1QixDQUFDO1FBRXZDLGFBQVEsR0FBQyxFQUFFLENBQUM7UUFJUjs7c0VBRThEO1FBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNqQywwQ0FBMEM7SUFFOUMsQ0FBQztJQUNEOztPQUVHO0lBRUgsbUNBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUFBLGlCQWVDO1FBZEc7O3NFQUU4RDtRQUM5RCw2Q0FBNkM7UUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQyxNQUFNO1lBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BCLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxD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Q0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQy9DLENBQUMsRUFBRSxVQUFDLEtBQUs7WUFDTCxLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVPLDBDQUFjLEdBQXRCLFVBQXVCLEtBQXFCO1FBQ3hDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNuQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ1YsS0FBSyxFQUFFLG1CQUFtQjtZQUMxQixPQUFPLEVBQUUsOEdBQThHO1lBQ3ZILFlBQVksRUFBRSxJQUFJO1NBQ3JCLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFbEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBaE9RLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSwyQkFBMkI7WUFDeEMsU0FBUyxFQUFFLENBQUMsdUJBQVUsQ0FBQztTQUMxQixDQUFDO3lDQWN3Qyx5QkFBZ0IsRUFBcUIsdUJBQVUsRUFBZSxXQUFJO09BYi9GLGlCQUFpQixDQWlPN0I7SUFBRCx3QkFBQztDQUFBLEFBak9ELElBaU9DO0FBak9ZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgV2ViU2VydmljZSB9IGZyb20gXCIuLi93cy5zZXJ2aWNlXCI7XG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0IHtMb2FkaW5nSW5kaWNhdG9yfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7IFxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgKiBhcyBvYnNlcnZhYmxlQXJyYXkgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG4vL2ltcG9ydCB7IExpc3RWaWV3RXZlbnREYXRhIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1saXN0dmlld1wiO1xuLy9pbXBvcnQge01peHBhbmVsSGVscGVyfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1peHBhbmVsXCI7XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qIEJlZm9yZSB5b3UgY2FuIG5hdmlnYXRlIHRvIHRoaXMgcGFnZSBmcm9tIHlvdXIgYXBwLCB5b3UgbmVlZCB0byByZWZlcmVuY2UgdGhpcyBwYWdlJ3MgbW9kdWxlIGluIHRoZVxuKiBnbG9iYWwgYXBwIHJvdXRlciBtb2R1bGUuIEFkZCB0aGUgZm9sbG93aW5nIG9iamVjdCB0byB0aGUgZ2xvYmFsIGFycmF5IG9mIHJvdXRlczpcbiogeyBwYXRoOiBcInJlZ2lzdHJvXCIsIGxvYWRDaGlsZHJlbjogXCIuL3JlZ2lzdHJvL3JlZ2lzdHJvLm1vZHVsZSNSZWdpc3Ryb01vZHVsZVwiIH1cbiogTm90ZSB0aGF0IHRoaXMgc2ltcGx5IHBvaW50cyB0aGUgcGF0aCB0byB0aGUgcGFnZSBtb2R1bGUgZmlsZS4gSWYgeW91IG1vdmUgdGhlIHBhZ2UsIHlvdSBuZWVkIHRvIHVwZGF0ZSB0aGUgcm91dGUgdG9vLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmxldCBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiUmVnaXN0cm9cIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcmVnaXN0cm8uY29tcG9uZW50Lmh0bWxcIixcbiAgICBwcm92aWRlcnM6IFtXZWJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBSZWdpc3Ryb0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGxhc3RuYW1lOnN0cmluZztcbiAgICBlbWFpbDogc3RyaW5nO1xuICAgIGVtYWlsMjogc3RyaW5nO1xuICAgIGNlZHVsYTogc3RyaW5nO1xuICAgIGNlbHVsYXI6c3RyaW5nO1xuICAgIGdydXBvOiBzdHJpbmc7XG4gICAgZW1wcmVzYTpzdHJpbmc9J1NlbGVjY2lvbmEgdHUgZW1wcmVzYSc7XG4gICAgZW1wcmVzYUlkOnN0cmluZztcbiAgICBlbXByZXNhcz1bXTtcbiAgICAvL3B1YmxpYyBlbXByZXNhcz1uZXcgb2JzZXJ2YWJsZUFycmF5Lk9ic2VydmFibGVBcnJheShbXSk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgbXlTZXJ2aWNlOiBXZWJTZXJ2aWNlLHByaXZhdGUgcGFnZTogUGFnZSkge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFVzZSB0aGUgY29uc3RydWN0b3IgdG8gaW5qZWN0IGFwcCBzZXJ2aWNlcyB0aGF0IHlvdSBuZWVkIGluIHRoaXMgY29tcG9uZW50LlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgICAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgLy9NaXhwYW5lbEhlbHBlci50cmFjaygnRW5SZWdpc3RybycsJ09LJyk7XG4gICAgICAgIFxuICAgIH1cbiAgICAvKmdldCBkYXRhSXRlbXMoKTogT2JzZXJ2YWJsZUFycmF5PGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YUl0ZW1zO1xuICAgIH0qL1xuXG4gICAgaXJBdHJhcygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBVc2UgdGhlIFwibmdPbkluaXRcIiBoYW5kbGVyIHRvIGluaXRpYWxpemUgZGF0YSBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgICAgIC8vdGhpcy5lbXByZXNhcyA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8YW55PigpO1xuICAgICAgICB0aGlzLm15U2VydmljZS5nZXRFbXByZXNhcygpLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTGlzdGFkbyBkZSBlbXByZXNhcycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPE9iamVjdC5rZXlzKHJlc3VsdCkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtcHJlc2FzLnB1c2gocmVzdWx0W2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZW1wcmVzYXMpO1xuICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvblNpZ251cFdpdGhTb2NpYWxQcm92aWRlckJ1dHRvblRhcCgpOiB2b2lkIHtcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBGb3Igc2lnbiB1cCB3aXRoIHNvY2lhbCBwcm92aWRlciB5b3UgY2FuIGFkZCB5b3VyIGN1c3RvbSBsb2dpYyBvclxuICAgICAgICAqIHVzZSBOYXRpdmVTY3JpcHQgcGx1Z2luIGZvciBzaWduIHVwIHdpdGggRmFjZWJvb2tcbiAgICAgICAgKiBodHRwOi8vbWFya2V0Lm5hdGl2ZXNjcmlwdC5vcmcvcGx1Z2lucy9uYXRpdmVzY3JpcHQtZmFjZWJvb2tcbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICB9XG4gICAgc2VsZWNjaW9uYXJFbXByZXNhKCl7XG4gICAgICAgIGxldCBlbXByZXNhcyA9IFtdO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDxPYmplY3Qua2V5cyh0aGlzLmVtcHJlc2FzKS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5lbXByZXNhc1tpXSlcbiAgICAgICAgICAgIGVtcHJlc2FzLnB1c2godGhpcy5lbXByZXNhc1tpXS5uYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBkaWFsb2dzLmFjdGlvbih7XG4gICAgICAgICAgICBtZXNzYWdlOiBcIkVtcHJlc2FzXCIsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbGFyXCIsXG4gICAgICAgICAgICBhY3Rpb25zOiBlbXByZXNhc1xuICAgICAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICBpZihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIHRoaXMuZW1wcmVzYSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDxPYmplY3Qua2V5cyh0aGlzLmVtcHJlc2FzKS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmVtcHJlc2FzW2ldKVxuICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQ9PXRoaXMuZW1wcmVzYXNbaV0ubmFtZSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbXByZXNhSWQ9dGhpcy5lbXByZXNhc1tpXS51c2VybmFtZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIHJlc3VsdDogXCIgKyByZXN1bHQpO1xuICAgICAgICAgICAgaWYocmVzdWx0ID09IFwiT3B0aW9uMVwiKXtcbiAgICAgICAgICAgICAgICAvL0RvIGFjdGlvbjFcbiAgICAgICAgICAgIH1lbHNlIGlmKHJlc3VsdCA9PSBcIk9wdGlvbjJcIil7XG4gICAgICAgICAgICAgICAgLy9EbyBhY3Rpb24yXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uU2lnbnVwQnV0dG9uVGFwKCk6IHZvaWQge1xuICAgICAgICBsb2FkZXIuc2hvdygpO1xuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5uYW1lO1xuICAgICAgICBjb25zdCBsYXN0bmFtZSA9IHRoaXMubGFzdG5hbWU7XG4gICAgICAgIGNvbnN0IGVtYWlsID0gdGhpcy5lbWFpbDtcbiAgICAgICAgY29uc3QgZW1haWwyID0gdGhpcy5lbWFpbDI7XG4gICAgICAgIGNvbnN0IGNlZHVsYSA9IHRoaXMuY2VkdWxhO1xuICAgICAgICBjb25zdCBjZWx1bGFyID0gdGhpcy5jZWx1bGFyO1xuICAgICAgICBjb25zdCBncnVwbyA9IHRoaXMuZ3J1cG87XG4gICAgICAgIGNvbnN0IGVtcHJlc2EgPSB0aGlzLmVtcHJlc2E7XG4gICAgICAgIGNvbnN0IGVtcHJlc2FJZCA9IHRoaXMuZW1wcmVzYUlkO1xuICAgICAgICBpZihuYW1lJiZlbWFpbCYmZW1haWwyJiZjZWR1bGEmJmVtcHJlc2EmJmVtcHJlc2FJZCYmbGFzdG5hbWUmJmNlbHVsYXIpe1xuICAgICAgICAgICAgLy9NaXhwYW5lbEhlbHBlci50cmFjaygnQ3JlYW5kb0N1ZW50YScsJ09LJyk7XG4gICAgICAgICAgICBpZihlbWFpbCAhPSBlbWFpbDIpe1xuICAgICAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnRXJyb3IgZGUgY3VlbnRhJyxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ1R1cyBkaXJlY2Npb25lcyBkZSBjb3JyZW8gbm8gY29pbmNpZGVuJyxcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5teVNlcnZpY2UucmVnaXN0cmFyKChuYW1lKycgJytsYXN0bmFtZSksZW1haWwsY2VkdWxhLGdydXBvKS5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YVN1Y2Nlc3MocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0Vycm9yIGRlIGRhdG9zJyxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ0RlYmVzIGNvbXBsZXRhciBsb3MgY2FtcG9zIG9ibGlnYXRvcmlvcycsXG4gICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ09rJ1xuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogQ2FsbCB5b3VyIGN1c3RvbSBzaWdudXAgbG9naWMgdXNpbmcgdGhlIGVtYWlsIGFuZCBwYXNzd29yZCBkYXRhLlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIH1cbiAgICBcbiAgICBvbkdldERhdGFTdWNjZXNzKHJlcykgeyBcbiAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZWwgcmVnaXN0cm8nKTtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzKSk7IFxuICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICBpZihyZXMucmVzdWx0YWRvID09ICdPSycpe1xuICAgICAgICAgICAgLy9NaXhwYW5lbEhlbHBlci50cmFjaygnQ3JlYW5kb0N1ZW50YU9LJywnT0snKTtcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnQ3VlbnRhIGNyZWFkYScsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogcmVzLm1lbnNhamUsXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnR3JhY2lhcyEnXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMubXlTZXJ2aWNlLmdldElkTWVtYmVyKHRoaXMuY2VkdWxhLHRoaXMuZW1haWwpLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhpdG9JZE1lbWJlcihyZXN1bHQscmVzLmlkdXN1YXJpbyk7XG4gICAgICAgICAgICAgICAgICAgIC8vQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoJ2lkUmVnaXN0cm8nLHJlcy5pZHVzdWFyaW8pO1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvbG9naW5cIl0pO1xuICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgLy9hbGVydCgnTk8nKTsgXG4gICAgICAgICAgICAvL01peHBhbmVsSGVscGVyLnRyYWNrKCdDcmVhbmRvQ3VlbnRhRXJyb3InLCdPSycpO1xuICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdFcnJvciBkZSBjdWVudGEnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHJlcy5tZW5zYWplLFxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ0dyYWNpYXMhJ1xuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICBleGl0b0lkTWVtYmVyKHJlcyxpZFVzdWFyaW8pIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZWwgZXhpdG9JZE1lbWJlcicpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXMpKTsgXG4gICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgIHRoaXMubXlTZXJ2aWNlLmFzaWduYXJJZE1lbWJlcihpZFVzdWFyaW8scmVzLmlkbWVtYmVyKS5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZSBhc2lnbmFjacOzbiBkZSBJRCBNZW1lYnInKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICB0aGlzLmV4aXRvQXNpZ25hY2lvbk1vZGlwYXkoaWRVc3VhcmlvKTtcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiaWRtZW1iZXJcIixyZXMuaWRtZW1iZXIpO1xuICAgIH1cblxuICAgIGV4aXRvQXNpZ25hY2lvbk1vZGlwYXkoaWRVc3VhcmlvKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGVsIGV4aXRvSWRNZW1iZXInKTtcbiAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgdGhpcy5teVNlcnZpY2UuZ2V0SWRWYW5nbyh0aGlzLmNlZHVsYSx0aGlzLmVtYWlsLHRoaXMubmFtZSx0aGlzLmVtcHJlc2EsdGhpcy5lbXByZXNhSWQsdGhpcy5jZWx1bGFyLHRoaXMubGFzdG5hbWUpLnN1YnNjcmliZSgocmVzdWx0OmFueSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZSBhc2lnbmFjacOzbiBkZSBJRCBNZW1lYnInKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcImlkdmFuZ29cIixyZXN1bHQuaWR2YW5nbyk7XG4gICAgICAgICAgICB0aGlzLmV4aXRvSWRWYW5nbyhpZFVzdWFyaW8scmVzdWx0LmlkdmFuZ28pXG4gICAgICAgICAgICAvL3RoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvbG9naW5cIl0pO1xuICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICBleGl0b0lkVmFuZ28oaWRVc3VhcmlvLGlkVmFuZ28pIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZWwgZXhpdG9JZE1lbWJlcicpO1xuICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICB0aGlzLm15U2VydmljZS5hc2lnbmFySWRWYW5nbyhpZFVzdWFyaW8saWRWYW5nbykuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGUgYXNpZ25hY2nDs24gZGUgSUQgVmFuZ28nKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2xvZ2luXCJdKTtcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uR2V0RGF0YUVycm9yKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xuICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlIGVycm9yJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgdGl0bGU6ICdFcnJvciBkZSBjb25leGnDs24nLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJMbyBzZW50aW1vcywgaHVibyB1biBwcm9ibGVtYSBlbmNvbnRyYW5kbyBlbCBzZXJ2aWRvciwgdmVyaWZpY2EgdHUgY29uZXhpw7NuIGEgSW50ZXJuZXQgZSBpbnRlbnRhIG51ZXZhbWVudGUuXCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6ICdPaydcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==