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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cm8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0cm8uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUE2RDtBQUM3RCw0Q0FBMkM7QUFDM0MsMERBQTREO0FBQzVELG9DQUFzQztBQUN0QyxpRkFBZ0U7QUFDaEUsZ0NBQStCO0FBRS9CLCtEQUErRDtBQUMvRCx1REFBdUQ7QUFFdkQ7Ozs7OzhEQUs4RDtBQUM5RCxJQUFJLE1BQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7QUFPcEM7SUFTSSwwREFBMEQ7SUFFMUQsMkJBQW9CLGdCQUFrQyxFQUFVLFNBQXFCLEVBQVMsSUFBVTtRQUFwRixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBWTtRQUFTLFNBQUksR0FBSixJQUFJLENBQU07UUFMeEcsWUFBTyxHQUFRLHVCQUF1QixDQUFDO1FBRXZDLGFBQVEsR0FBQyxFQUFFLENBQUM7UUFJUjs7c0VBRThEO1FBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNqQywwQ0FBMEM7SUFFOUMsQ0FBQztJQUNEOztPQUVHO0lBRUgsbUNBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUFBLGlCQWVDO1FBZEc7O3NFQUU4RDtRQUM5RCw2Q0FBNkM7UUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQyxNQUFNO1lBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BCLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxD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TUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDVixLQUFLLEVBQUUsbUJBQW1CO1lBQzFCLE9BQU8sRUFBRSw4R0FBOEc7WUFDdkgsWUFBWSxFQUFFLElBQUk7U0FDckIsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUVsQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUE1TlEsaUJBQWlCO1FBTjdCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDJCQUEyQjtZQUN4QyxTQUFTLEVBQUUsQ0FBQyx1QkFBVSxDQUFDO1NBQzFCLENBQUM7eUNBWXdDLHlCQUFnQixFQUFxQix1QkFBVSxFQUFlLFdBQUk7T0FYL0YsaUJBQWlCLENBNk43QjtJQUFELHdCQUFDO0NBQUEsQUE3TkQsSUE2TkM7QUE3TlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBXZWJTZXJ2aWNlIH0gZnJvbSBcIi4uL3dzLnNlcnZpY2VcIjtcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQge0xvYWRpbmdJbmRpY2F0b3J9IGZyb20gXCJuYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3JcIjsgXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCAqIGFzIG9ic2VydmFibGVBcnJheSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbi8vaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3XCI7XG4vL2ltcG9ydCB7TWl4cGFuZWxIZWxwZXJ9IGZyb20gXCJuYXRpdmVzY3JpcHQtbWl4cGFuZWxcIjtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiogQmVmb3JlIHlvdSBjYW4gbmF2aWdhdGUgdG8gdGhpcyBwYWdlIGZyb20geW91ciBhcHAsIHlvdSBuZWVkIHRvIHJlZmVyZW5jZSB0aGlzIHBhZ2UncyBtb2R1bGUgaW4gdGhlXG4qIGdsb2JhbCBhcHAgcm91dGVyIG1vZHVsZS4gQWRkIHRoZSBmb2xsb3dpbmcgb2JqZWN0IHRvIHRoZSBnbG9iYWwgYXJyYXkgb2Ygcm91dGVzOlxuKiB7IHBhdGg6IFwicmVnaXN0cm9cIiwgbG9hZENoaWxkcmVuOiBcIi4vcmVnaXN0cm8vcmVnaXN0cm8ubW9kdWxlI1JlZ2lzdHJvTW9kdWxlXCIgfVxuKiBOb3RlIHRoYXQgdGhpcyBzaW1wbHkgcG9pbnRzIHRoZSBwYXRoIHRvIHRoZSBwYWdlIG1vZHVsZSBmaWxlLiBJZiB5b3UgbW92ZSB0aGUgcGFnZSwgeW91IG5lZWQgdG8gdXBkYXRlIHRoZSByb3V0ZSB0b28uXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xubGV0IGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJSZWdpc3Ryb1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9yZWdpc3Ryby5jb21wb25lbnQuaHRtbFwiLFxuICAgIHByb3ZpZGVyczogW1dlYlNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFJlZ2lzdHJvQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZW1haWw6IHN0cmluZztcbiAgICBlbWFpbDI6IHN0cmluZztcbiAgICBjZWR1bGE6IHN0cmluZztcbiAgICBncnVwbzogc3RyaW5nO1xuICAgIGVtcHJlc2E6c3RyaW5nPSdTZWxlY2Npb25hIHR1IGVtcHJlc2EnO1xuICAgIGVtcHJlc2FJZDpzdHJpbmc7XG4gICAgZW1wcmVzYXM9W107XG4gICAgLy9wdWJsaWMgZW1wcmVzYXM9bmV3IG9ic2VydmFibGVBcnJheS5PYnNlcnZhYmxlQXJyYXkoW10pO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIG15U2VydmljZTogV2ViU2VydmljZSxwcml2YXRlIHBhZ2U6IFBhZ2UpIHtcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBVc2UgdGhlIGNvbnN0cnVjdG9yIHRvIGluamVjdCBhcHAgc2VydmljZXMgdGhhdCB5b3UgbmVlZCBpbiB0aGlzIGNvbXBvbmVudC5cbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgICAgIC8vTWl4cGFuZWxIZWxwZXIudHJhY2soJ0VuUmVnaXN0cm8nLCdPSycpO1xuICAgICAgICBcbiAgICB9XG4gICAgLypnZXQgZGF0YUl0ZW1zKCk6IE9ic2VydmFibGVBcnJheTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFJdGVtcztcbiAgICB9Ki9cblxuICAgIGlyQXRyYXMoKSB7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogVXNlIHRoZSBcIm5nT25Jbml0XCIgaGFuZGxlciB0byBpbml0aWFsaXplIGRhdGEgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgICAgICAvL3RoaXMuZW1wcmVzYXMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PGFueT4oKTtcbiAgICAgICAgdGhpcy5teVNlcnZpY2UuZ2V0RW1wcmVzYXMoKS5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0xpc3RhZG8gZGUgZW1wcmVzYXMnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDxPYmplY3Qua2V5cyhyZXN1bHQpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbXByZXNhcy5wdXNoKHJlc3VsdFtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmVtcHJlc2FzKTtcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25TaWdudXBXaXRoU29jaWFsUHJvdmlkZXJCdXR0b25UYXAoKTogdm9pZCB7XG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogRm9yIHNpZ24gdXAgd2l0aCBzb2NpYWwgcHJvdmlkZXIgeW91IGNhbiBhZGQgeW91ciBjdXN0b20gbG9naWMgb3JcbiAgICAgICAgKiB1c2UgTmF0aXZlU2NyaXB0IHBsdWdpbiBmb3Igc2lnbiB1cCB3aXRoIEZhY2Vib29rXG4gICAgICAgICogaHR0cDovL21hcmtldC5uYXRpdmVzY3JpcHQub3JnL3BsdWdpbnMvbmF0aXZlc2NyaXB0LWZhY2Vib29rXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgfVxuICAgIHNlbGVjY2lvbmFyRW1wcmVzYSgpe1xuICAgICAgICBsZXQgZW1wcmVzYXMgPSBbXTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXModGhpcy5lbXByZXNhcykubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZW1wcmVzYXNbaV0pXG4gICAgICAgICAgICBlbXByZXNhcy5wdXNoKHRoaXMuZW1wcmVzYXNbaV0ubmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgZGlhbG9ncy5hY3Rpb24oe1xuICAgICAgICAgICAgbWVzc2FnZTogXCJFbXByZXNhc1wiLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxhclwiLFxuICAgICAgICAgICAgYWN0aW9uczogZW1wcmVzYXNcbiAgICAgICAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgaWYocmVzdWx0KXtcbiAgICAgICAgICAgICAgICB0aGlzLmVtcHJlc2EgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXModGhpcy5lbXByZXNhcykubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5lbXByZXNhc1tpXSlcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0PT10aGlzLmVtcHJlc2FzW2ldLm5hbWUpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1wcmVzYUlkPXRoaXMuZW1wcmVzYXNbaV0udXNlcm5hbWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyByZXN1bHQ6IFwiICsgcmVzdWx0KTtcbiAgICAgICAgICAgIGlmKHJlc3VsdCA9PSBcIk9wdGlvbjFcIil7XG4gICAgICAgICAgICAgICAgLy9EbyBhY3Rpb24xXG4gICAgICAgICAgICB9ZWxzZSBpZihyZXN1bHQgPT0gXCJPcHRpb24yXCIpe1xuICAgICAgICAgICAgICAgIC8vRG8gYWN0aW9uMlxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvblNpZ251cEJ1dHRvblRhcCgpOiB2b2lkIHtcbiAgICAgICAgbG9hZGVyLnNob3coKTtcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMubmFtZTtcbiAgICAgICAgY29uc3QgZW1haWwgPSB0aGlzLmVtYWlsO1xuICAgICAgICBjb25zdCBlbWFpbDIgPSB0aGlzLmVtYWlsMjtcbiAgICAgICAgY29uc3QgY2VkdWxhID0gdGhpcy5jZWR1bGE7XG4gICAgICAgIGNvbnN0IGdydXBvID0gdGhpcy5ncnVwbztcbiAgICAgICAgY29uc3QgZW1wcmVzYSA9IHRoaXMuZW1wcmVzYTtcbiAgICAgICAgY29uc3QgZW1wcmVzYUlkID0gdGhpcy5lbXByZXNhSWQ7XG4gICAgICAgIGlmKG5hbWUmJmVtYWlsJiZlbWFpbDImJmNlZHVsYSYmZW1wcmVzYSYmZW1wcmVzYUlkKXtcbiAgICAgICAgICAgIC8vTWl4cGFuZWxIZWxwZXIudHJhY2soJ0NyZWFuZG9DdWVudGEnLCdPSycpO1xuICAgICAgICAgICAgaWYoZW1haWwgIT0gZW1haWwyKXtcbiAgICAgICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0Vycm9yIGRlIGN1ZW50YScsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdUdXMgZGlyZWNjaW9uZXMgZGUgY29ycmVvIG5vIGNvaW5jaWRlbicsXG4gICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ09rJ1xuICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMubXlTZXJ2aWNlLnJlZ2lzdHJhcihuYW1lLGVtYWlsLGNlZHVsYSxncnVwbykuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFTdWNjZXNzKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdFcnJvciBkZSBkYXRvcycsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdEZWJlcyBjb21wbGV0YXIgbG9zIGNhbXBvcyBvYmxpZ2F0b3Jpb3MnLFxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6ICdPaydcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIENhbGwgeW91ciBjdXN0b20gc2lnbnVwIGxvZ2ljIHVzaW5nIHRoZSBlbWFpbCBhbmQgcGFzc3dvcmQgZGF0YS5cbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICB9XG4gICAgXG4gICAgb25HZXREYXRhU3VjY2VzcyhyZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZWwgcmVnaXN0cm8nKTtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzKSk7IFxuICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICBpZihyZXMucmVzdWx0YWRvID09ICdPSycpe1xuICAgICAgICAgICAgLy9NaXhwYW5lbEhlbHBlci50cmFjaygnQ3JlYW5kb0N1ZW50YU9LJywnT0snKTtcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnQ3VlbnRhIGNyZWFkYScsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogcmVzLm1lbnNhamUsXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnR3JhY2lhcyEnXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMubXlTZXJ2aWNlLmdldElkTWVtYmVyKHRoaXMuY2VkdWxhLHRoaXMuZW1haWwpLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhpdG9JZE1lbWJlcihyZXN1bHQscmVzLmlkdXN1YXJpbyk7XG4gICAgICAgICAgICAgICAgICAgIC8vQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoJ2lkUmVnaXN0cm8nLHJlcy5pZHVzdWFyaW8pO1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvbG9naW5cIl0pO1xuICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgLy9hbGVydCgnTk8nKTsgXG4gICAgICAgICAgICAvL01peHBhbmVsSGVscGVyLnRyYWNrKCdDcmVhbmRvQ3VlbnRhRXJyb3InLCdPSycpO1xuICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdFcnJvciBkZSBjdWVudGEnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHJlcy5tZW5zYWplLFxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ0dyYWNpYXMhJ1xuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICBleGl0b0lkTWVtYmVyKHJlcyxpZFVzdWFyaW8pIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZWwgZXhpdG9JZE1lbWJlcicpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXMpKTsgXG4gICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgIHRoaXMubXlTZXJ2aWNlLmFzaWduYXJJZE1lbWJlcihpZFVzdWFyaW8scmVzLmlkbWVtYmVyKS5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZSBhc2lnbmFjacOzbiBkZSBJRCBNZW1lYnInKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICB0aGlzLmV4aXRvQXNpZ25hY2lvbk1vZGlwYXkoaWRVc3VhcmlvKTtcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiaWRtZW1iZXJcIixyZXMuaWRtZW1iZXIpO1xuICAgIH1cblxuICAgIGV4aXRvQXNpZ25hY2lvbk1vZGlwYXkoaWRVc3VhcmlvKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGVsIGV4aXRvSWRNZW1iZXInKTtcbiAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgdGhpcy5teVNlcnZpY2UuZ2V0SWRWYW5nbyh0aGlzLmNlZHVsYSx0aGlzLmVtYWlsLHRoaXMubmFtZSx0aGlzLmVtcHJlc2EsdGhpcy5lbXByZXNhSWQpLnN1YnNjcmliZSgocmVzdWx0OmFueSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZSBhc2lnbmFjacOzbiBkZSBJRCBNZW1lYnInKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcImlkdmFuZ29cIixyZXN1bHQuaWR2YW5nbyk7XG4gICAgICAgICAgICB0aGlzLmV4aXRvSWRWYW5nbyhpZFVzdWFyaW8scmVzdWx0LmlkdmFuZ28pXG4gICAgICAgICAgICAvL3RoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvbG9naW5cIl0pO1xuICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICBleGl0b0lkVmFuZ28oaWRVc3VhcmlvLGlkVmFuZ28pIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZWwgZXhpdG9JZE1lbWJlcicpO1xuICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICB0aGlzLm15U2VydmljZS5hc2lnbmFySWRWYW5nbyhpZFVzdWFyaW8saWRWYW5nbykuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGUgYXNpZ25hY2nDs24gZGUgSUQgVmFuZ28nKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2xvZ2luXCJdKTtcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uR2V0RGF0YUVycm9yKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xuICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlIGVycm9yJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgdGl0bGU6ICdFcnJvciBkZSBjb25leGnDs24nLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJMbyBzZW50aW1vcywgaHVibyB1biBwcm9ibGVtYSBlbmNvbnRyYW5kbyBlbCBzZXJ2aWRvciwgdmVyaWZpY2EgdHUgY29uZXhpw7NuIGEgSW50ZXJuZXQgZSBpbnRlbnRhIG51ZXZhbWVudGUuXCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6ICdPaydcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==