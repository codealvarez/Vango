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
        var email = this.email;
        var email2 = this.email2;
        var cedula = this.cedula;
        var grupo = this.grupo;
        var empresa = this.empresa;
        var empresaId = this.empresaId;
        if (name && email && email2 && cedula && empresa && empresaId) {
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
                this.myService.registrar(name, email, cedula, grupo).subscribe(function (result) {
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
        this.myService.getIdVango(this.cedula, this.email, this.name, this.empresa, this.empresaId).subscribe(function (result) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cm8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0cm8uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUE2RDtBQUM3RCw0Q0FBMkM7QUFDM0MsMERBQTREO0FBQzVELG9DQUFzQztBQUN0QyxpRkFBZ0U7QUFDaEUsZ0NBQStCO0FBRS9CLCtEQUErRDtBQUMvRCx1REFBdUQ7QUFFdkQ7Ozs7OzhEQUs4RDtBQUM5RCxJQUFJLE1BQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7QUFPcEM7SUFTSSwwREFBMEQ7SUFFMUQsMkJBQW9CLGdCQUFrQyxFQUFVLFNBQXFCLEVBQVMsSUFBVTtRQUFwRixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBWTtRQUFTLFNBQUksR0FBSixJQUFJLENBQU07UUFMeEcsWUFBTyxHQUFRLHVCQUF1QixDQUFDO1FBRXZDLGFBQVEsR0FBQyxFQUFFLENBQUM7UUFJUjs7c0VBRThEO1FBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNqQywwQ0FBMEM7SUFFOUMsQ0FBQztJQUNEOztPQUVHO0lBRUgsbUNBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUFBLGlCQWVDO1FBZEc7O3NFQUU4RDtRQUM5RCw2Q0FBNkM7UUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQyxNQUFNO1lBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BCLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRSxN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bEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBNU5RLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSwyQkFBMkI7WUFDeEMsU0FBUyxFQUFFLENBQUMsdUJBQVUsQ0FBQztTQUMxQixDQUFDO3lDQVl3Qyx5QkFBZ0IsRUFBcUIsdUJBQVUsRUFBZSxXQUFJO09BWC9GLGlCQUFpQixDQTZON0I7SUFBRCx3QkFBQztDQUFBLEFBN05ELElBNk5DO0FBN05ZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgV2ViU2VydmljZSB9IGZyb20gXCIuLi93cy5zZXJ2aWNlXCI7XG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0IHtMb2FkaW5nSW5kaWNhdG9yfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7IFxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgKiBhcyBvYnNlcnZhYmxlQXJyYXkgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG4vL2ltcG9ydCB7IExpc3RWaWV3RXZlbnREYXRhIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1saXN0dmlld1wiO1xuLy9pbXBvcnQge01peHBhbmVsSGVscGVyfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1peHBhbmVsXCI7XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qIEJlZm9yZSB5b3UgY2FuIG5hdmlnYXRlIHRvIHRoaXMgcGFnZSBmcm9tIHlvdXIgYXBwLCB5b3UgbmVlZCB0byByZWZlcmVuY2UgdGhpcyBwYWdlJ3MgbW9kdWxlIGluIHRoZVxuKiBnbG9iYWwgYXBwIHJvdXRlciBtb2R1bGUuIEFkZCB0aGUgZm9sbG93aW5nIG9iamVjdCB0byB0aGUgZ2xvYmFsIGFycmF5IG9mIHJvdXRlczpcbiogeyBwYXRoOiBcInJlZ2lzdHJvXCIsIGxvYWRDaGlsZHJlbjogXCIuL3JlZ2lzdHJvL3JlZ2lzdHJvLm1vZHVsZSNSZWdpc3Ryb01vZHVsZVwiIH1cbiogTm90ZSB0aGF0IHRoaXMgc2ltcGx5IHBvaW50cyB0aGUgcGF0aCB0byB0aGUgcGFnZSBtb2R1bGUgZmlsZS4gSWYgeW91IG1vdmUgdGhlIHBhZ2UsIHlvdSBuZWVkIHRvIHVwZGF0ZSB0aGUgcm91dGUgdG9vLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmxldCBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiUmVnaXN0cm9cIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcmVnaXN0cm8uY29tcG9uZW50Lmh0bWxcIixcbiAgICBwcm92aWRlcnM6IFtXZWJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBSZWdpc3Ryb0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGVtYWlsOiBzdHJpbmc7XG4gICAgZW1haWwyOiBzdHJpbmc7XG4gICAgY2VkdWxhOiBzdHJpbmc7XG4gICAgZ3J1cG86IHN0cmluZztcbiAgICBlbXByZXNhOnN0cmluZz0nU2VsZWNjaW9uYSB0dSBlbXByZXNhJztcbiAgICBlbXByZXNhSWQ6c3RyaW5nO1xuICAgIGVtcHJlc2FzPVtdO1xuICAgIC8vcHVibGljIGVtcHJlc2FzPW5ldyBvYnNlcnZhYmxlQXJyYXkuT2JzZXJ2YWJsZUFycmF5KFtdKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSBteVNlcnZpY2U6IFdlYlNlcnZpY2UscHJpdmF0ZSBwYWdlOiBQYWdlKSB7XG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogVXNlIHRoZSBjb25zdHJ1Y3RvciB0byBpbmplY3QgYXBwIHNlcnZpY2VzIHRoYXQgeW91IG5lZWQgaW4gdGhpcyBjb21wb25lbnQuXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgICAgICAvL01peHBhbmVsSGVscGVyLnRyYWNrKCdFblJlZ2lzdHJvJywnT0snKTtcbiAgICAgICAgXG4gICAgfVxuICAgIC8qZ2V0IGRhdGFJdGVtcygpOiBPYnNlcnZhYmxlQXJyYXk8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhSXRlbXM7XG4gICAgfSovXG5cbiAgICBpckF0cmFzKCkge1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFVzZSB0aGUgXCJuZ09uSW5pdFwiIGhhbmRsZXIgdG8gaW5pdGlhbGl6ZSBkYXRhIGZvciB0aGlzIGNvbXBvbmVudC5cbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAgICAgLy90aGlzLmVtcHJlc2FzID0gbmV3IE9ic2VydmFibGVBcnJheTxhbnk+KCk7XG4gICAgICAgIHRoaXMubXlTZXJ2aWNlLmdldEVtcHJlc2FzKCkuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMaXN0YWRvIGRlIGVtcHJlc2FzJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXMocmVzdWx0KS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1wcmVzYXMucHVzaChyZXN1bHRbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5lbXByZXNhcyk7XG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uU2lnbnVwV2l0aFNvY2lhbFByb3ZpZGVyQnV0dG9uVGFwKCk6IHZvaWQge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIEZvciBzaWduIHVwIHdpdGggc29jaWFsIHByb3ZpZGVyIHlvdSBjYW4gYWRkIHlvdXIgY3VzdG9tIGxvZ2ljIG9yXG4gICAgICAgICogdXNlIE5hdGl2ZVNjcmlwdCBwbHVnaW4gZm9yIHNpZ24gdXAgd2l0aCBGYWNlYm9va1xuICAgICAgICAqIGh0dHA6Ly9tYXJrZXQubmF0aXZlc2NyaXB0Lm9yZy9wbHVnaW5zL25hdGl2ZXNjcmlwdC1mYWNlYm9va1xuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIH1cbiAgICBzZWxlY2Npb25hckVtcHJlc2EoKXtcbiAgICAgICAgbGV0IGVtcHJlc2FzID0gW107XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPE9iamVjdC5rZXlzKHRoaXMuZW1wcmVzYXMpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmVtcHJlc2FzW2ldKVxuICAgICAgICAgICAgZW1wcmVzYXMucHVzaCh0aGlzLmVtcHJlc2FzW2ldLm5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGRpYWxvZ3MuYWN0aW9uKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiRW1wcmVzYXNcIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsYXJcIixcbiAgICAgICAgICAgIGFjdGlvbnM6IGVtcHJlc2FzXG4gICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGlmKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgdGhpcy5lbXByZXNhID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPE9iamVjdC5rZXlzKHRoaXMuZW1wcmVzYXMpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZW1wcmVzYXNbaV0pXG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdD09dGhpcy5lbXByZXNhc1tpXS5uYW1lKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtcHJlc2FJZD10aGlzLmVtcHJlc2FzW2ldLnVzZXJuYW1lO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgcmVzdWx0OiBcIiArIHJlc3VsdCk7XG4gICAgICAgICAgICBpZihyZXN1bHQgPT0gXCJPcHRpb24xXCIpe1xuICAgICAgICAgICAgICAgIC8vRG8gYWN0aW9uMVxuICAgICAgICAgICAgfWVsc2UgaWYocmVzdWx0ID09IFwiT3B0aW9uMlwiKXtcbiAgICAgICAgICAgICAgICAvL0RvIGFjdGlvbjJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25TaWdudXBCdXR0b25UYXAoKTogdm9pZCB7XG4gICAgICAgIGxvYWRlci5zaG93KCk7XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLm5hbWU7XG4gICAgICAgIGNvbnN0IGVtYWlsID0gdGhpcy5lbWFpbDtcbiAgICAgICAgY29uc3QgZW1haWwyID0gdGhpcy5lbWFpbDI7XG4gICAgICAgIGNvbnN0IGNlZHVsYSA9IHRoaXMuY2VkdWxhO1xuICAgICAgICBjb25zdCBncnVwbyA9IHRoaXMuZ3J1cG87XG4gICAgICAgIGNvbnN0IGVtcHJlc2EgPSB0aGlzLmVtcHJlc2E7XG4gICAgICAgIGNvbnN0IGVtcHJlc2FJZCA9IHRoaXMuZW1wcmVzYUlkO1xuICAgICAgICBpZihuYW1lJiZlbWFpbCYmZW1haWwyJiZjZWR1bGEmJmVtcHJlc2EmJmVtcHJlc2FJZCl7XG4gICAgICAgICAgICAvL01peHBhbmVsSGVscGVyLnRyYWNrKCdDcmVhbmRvQ3VlbnRhJywnT0snKTtcbiAgICAgICAgICAgIGlmKGVtYWlsICE9IGVtYWlsMil7XG4gICAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdFcnJvciBkZSBjdWVudGEnLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVHVzIGRpcmVjY2lvbmVzIGRlIGNvcnJlbyBubyBjb2luY2lkZW4nLFxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6ICdPaydcbiAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLm15U2VydmljZS5yZWdpc3RyYXIobmFtZSxlbWFpbCxjZWR1bGEsZ3J1cG8pLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25HZXREYXRhU3VjY2VzcyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnRXJyb3IgZGUgZGF0b3MnLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnRGViZXMgY29tcGxldGFyIGxvcyBjYW1wb3Mgb2JsaWdhdG9yaW9zJyxcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBDYWxsIHlvdXIgY3VzdG9tIHNpZ251cCBsb2dpYyB1c2luZyB0aGUgZW1haWwgYW5kIHBhc3N3b3JkIGRhdGEuXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgfVxuICAgIFxuICAgIG9uR2V0RGF0YVN1Y2Nlc3MocmVzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGVsIHJlZ2lzdHJvJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlcykpOyBcbiAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgaWYocmVzLnJlc3VsdGFkbyA9PSAnT0snKXtcbiAgICAgICAgICAgIC8vTWl4cGFuZWxIZWxwZXIudHJhY2soJ0NyZWFuZG9DdWVudGFPSycsJ09LJyk7XG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0N1ZW50YSBjcmVhZGEnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHJlcy5tZW5zYWplLFxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ0dyYWNpYXMhJ1xuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLm15U2VydmljZS5nZXRJZE1lbWJlcih0aGlzLmNlZHVsYSx0aGlzLmVtYWlsKS5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4aXRvSWRNZW1iZXIocmVzdWx0LHJlcy5pZHVzdWFyaW8pO1xuICAgICAgICAgICAgICAgICAgICAvL0FwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKCdpZFJlZ2lzdHJvJyxyZXMuaWR1c3VhcmlvKTtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2xvZ2luXCJdKTtcbiAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIC8vYWxlcnQoJ05PJyk7IFxuICAgICAgICAgICAgLy9NaXhwYW5lbEhlbHBlci50cmFjaygnQ3JlYW5kb0N1ZW50YUVycm9yJywnT0snKTtcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnRXJyb3IgZGUgY3VlbnRhJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiByZXMubWVuc2FqZSxcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6ICdHcmFjaWFzISdcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgfVxuXG4gICAgZXhpdG9JZE1lbWJlcihyZXMsaWRVc3VhcmlvKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGVsIGV4aXRvSWRNZW1iZXInKTtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzKSk7IFxuICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICB0aGlzLm15U2VydmljZS5hc2lnbmFySWRNZW1iZXIoaWRVc3VhcmlvLHJlcy5pZG1lbWJlcikuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGUgYXNpZ25hY2nDs24gZGUgSUQgTWVtZWJyJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgdGhpcy5leGl0b0FzaWduYWNpb25Nb2RpcGF5KGlkVXN1YXJpbyk7XG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgIH0pO1xuICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcImlkbWVtYmVyXCIscmVzLmlkbWVtYmVyKTtcbiAgICB9XG5cbiAgICBleGl0b0FzaWduYWNpb25Nb2RpcGF5KGlkVXN1YXJpbykge1xuICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlbCBleGl0b0lkTWVtYmVyJyk7XG4gICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgIHRoaXMubXlTZXJ2aWNlLmdldElkVmFuZ28odGhpcy5jZWR1bGEsdGhpcy5lbWFpbCx0aGlzLm5hbWUsdGhpcy5lbXByZXNhLHRoaXMuZW1wcmVzYUlkKS5zdWJzY3JpYmUoKHJlc3VsdDphbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGUgYXNpZ25hY2nDs24gZGUgSUQgTWVtZWJyJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJpZHZhbmdvXCIscmVzdWx0LmlkdmFuZ28pO1xuICAgICAgICAgICAgdGhpcy5leGl0b0lkVmFuZ28oaWRVc3VhcmlvLHJlc3VsdC5pZHZhbmdvKVxuICAgICAgICAgICAgLy90aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2xvZ2luXCJdKTtcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuXG4gICAgfVxuXG4gICAgZXhpdG9JZFZhbmdvKGlkVXN1YXJpbyxpZFZhbmdvKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGVsIGV4aXRvSWRNZW1iZXInKTtcbiAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgdGhpcy5teVNlcnZpY2UuYXNpZ25hcklkVmFuZ28oaWRVc3VhcmlvLGlkVmFuZ28pLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlIGFzaWduYWNpw7NuIGRlIElEIFZhbmdvJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9sb2dpblwiXSk7XG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkdldERhdGFFcnJvcihlcnJvcjogUmVzcG9uc2UgfCBhbnkpIHtcbiAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZSBlcnJvcicpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiAnRXJyb3IgZGUgY29uZXhpw7NuJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiTG8gc2VudGltb3MsIGh1Ym8gdW4gcHJvYmxlbWEgZW5jb250cmFuZG8gZWwgc2Vydmlkb3IsIHZlcmlmaWNhIHR1IGNvbmV4acOzbiBhIEludGVybmV0IGUgaW50ZW50YSBudWV2YW1lbnRlLlwiLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=