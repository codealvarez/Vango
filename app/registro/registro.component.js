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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cm8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0cm8uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUE2RDtBQUM3RCw0Q0FBMkM7QUFDM0MsMERBQTREO0FBQzVELG9DQUFzQztBQUN0QyxpRkFBZ0U7QUFDaEUsZ0NBQStCO0FBRS9CLCtEQUErRDtBQUMvRCx1REFBdUQ7QUFFdkQ7Ozs7OzhEQUs4RDtBQUM5RCxJQUFJLE1BQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7QUFPcEM7SUFXSSwwREFBMEQ7SUFFMUQsMkJBQW9CLGdCQUFrQyxFQUFVLFNBQXFCLEVBQVMsSUFBVTtRQUFwRixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBWTtRQUFTLFNBQUksR0FBSixJQUFJLENBQU07UUFMeEcsWUFBTyxHQUFRLHVCQUF1QixDQUFDO1FBRXZDLGFBQVEsR0FBQyxFQUFFLENBQUM7UUFJUjs7c0VBRThEO1FBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNqQywwQ0FBMEM7SUFFOUMsQ0FBQztJQUNEOztPQUVHO0lBRUgsbUNBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUFBLGlCQWVDO1FBZEc7O3NFQUU4RDtRQUM5RCw2Q0FBNkM7UUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQyxNQUFNO1lBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BCLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRSxN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QUFDLENBQUM7UUFDbkMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUNWLEtBQUssRUFBRSxtQkFBbUI7WUFDMUIsT0FBTyxFQUFFLDhHQUE4RztZQUN2SCxZQUFZLEVBQUUsSUFBSTtTQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRWxDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQWhPUSxpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLFNBQVMsRUFBRSxDQUFDLHVCQUFVLENBQUM7U0FDMUIsQ0FBQzt5Q0Fjd0MseUJBQWdCLEVBQXFCLHVCQUFVLEVBQWUsV0FBSTtPQWIvRixpQkFBaUIsQ0FpTzdCO0lBQUQsd0JBQUM7Q0FBQSxBQWpPRCxJQWlPQztBQWpPWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFdlYlNlcnZpY2UgfSBmcm9tIFwiLi4vd3Muc2VydmljZVwiO1xuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCB7TG9hZGluZ0luZGljYXRvcn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiOyBcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0ICogYXMgb2JzZXJ2YWJsZUFycmF5IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuLy9pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktbGlzdHZpZXdcIjtcbi8vaW1wb3J0IHtNaXhwYW5lbEhlbHBlcn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1taXhwYW5lbFwiO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBCZWZvcmUgeW91IGNhbiBuYXZpZ2F0ZSB0byB0aGlzIHBhZ2UgZnJvbSB5b3VyIGFwcCwgeW91IG5lZWQgdG8gcmVmZXJlbmNlIHRoaXMgcGFnZSdzIG1vZHVsZSBpbiB0aGVcbiogZ2xvYmFsIGFwcCByb3V0ZXIgbW9kdWxlLiBBZGQgdGhlIGZvbGxvd2luZyBvYmplY3QgdG8gdGhlIGdsb2JhbCBhcnJheSBvZiByb3V0ZXM6XG4qIHsgcGF0aDogXCJyZWdpc3Ryb1wiLCBsb2FkQ2hpbGRyZW46IFwiLi9yZWdpc3Ryby9yZWdpc3Ryby5tb2R1bGUjUmVnaXN0cm9Nb2R1bGVcIiB9XG4qIE5vdGUgdGhhdCB0aGlzIHNpbXBseSBwb2ludHMgdGhlIHBhdGggdG8gdGhlIHBhZ2UgbW9kdWxlIGZpbGUuIElmIHlvdSBtb3ZlIHRoZSBwYWdlLCB5b3UgbmVlZCB0byB1cGRhdGUgdGhlIHJvdXRlIHRvby5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5sZXQgbG9hZGVyID0gbmV3IExvYWRpbmdJbmRpY2F0b3IoKTtcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIlJlZ2lzdHJvXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3JlZ2lzdHJvLmNvbXBvbmVudC5odG1sXCIsXG4gICAgcHJvdmlkZXJzOiBbV2ViU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgUmVnaXN0cm9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBsYXN0bmFtZTpzdHJpbmc7XG4gICAgZW1haWw6IHN0cmluZztcbiAgICBlbWFpbDI6IHN0cmluZztcbiAgICBjZWR1bGE6IHN0cmluZztcbiAgICBjZWx1bGFyOnN0cmluZztcbiAgICBncnVwbzogc3RyaW5nO1xuICAgIGVtcHJlc2E6c3RyaW5nPSdTZWxlY2Npb25hIHR1IGVtcHJlc2EnO1xuICAgIGVtcHJlc2FJZDpzdHJpbmc7XG4gICAgZW1wcmVzYXM9W107XG4gICAgLy9wdWJsaWMgZW1wcmVzYXM9bmV3IG9ic2VydmFibGVBcnJheS5PYnNlcnZhYmxlQXJyYXkoW10pO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIG15U2VydmljZTogV2ViU2VydmljZSxwcml2YXRlIHBhZ2U6IFBhZ2UpIHtcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBVc2UgdGhlIGNvbnN0cnVjdG9yIHRvIGluamVjdCBhcHAgc2VydmljZXMgdGhhdCB5b3UgbmVlZCBpbiB0aGlzIGNvbXBvbmVudC5cbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgICAgIC8vTWl4cGFuZWxIZWxwZXIudHJhY2soJ0VuUmVnaXN0cm8nLCdPSycpO1xuICAgICAgICBcbiAgICB9XG4gICAgLypnZXQgZGF0YUl0ZW1zKCk6IE9ic2VydmFibGVBcnJheTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFJdGVtcztcbiAgICB9Ki9cblxuICAgIGlyQXRyYXMoKSB7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogVXNlIHRoZSBcIm5nT25Jbml0XCIgaGFuZGxlciB0byBpbml0aWFsaXplIGRhdGEgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgICAgICAvL3RoaXMuZW1wcmVzYXMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PGFueT4oKTtcbiAgICAgICAgdGhpcy5teVNlcnZpY2UuZ2V0RW1wcmVzYXMoKS5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0xpc3RhZG8gZGUgZW1wcmVzYXMnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDxPYmplY3Qua2V5cyhyZXN1bHQpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbXByZXNhcy5wdXNoKHJlc3VsdFtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmVtcHJlc2FzKTtcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25TaWdudXBXaXRoU29jaWFsUHJvdmlkZXJCdXR0b25UYXAoKTogdm9pZCB7XG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogRm9yIHNpZ24gdXAgd2l0aCBzb2NpYWwgcHJvdmlkZXIgeW91IGNhbiBhZGQgeW91ciBjdXN0b20gbG9naWMgb3JcbiAgICAgICAgKiB1c2UgTmF0aXZlU2NyaXB0IHBsdWdpbiBmb3Igc2lnbiB1cCB3aXRoIEZhY2Vib29rXG4gICAgICAgICogaHR0cDovL21hcmtldC5uYXRpdmVzY3JpcHQub3JnL3BsdWdpbnMvbmF0aXZlc2NyaXB0LWZhY2Vib29rXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgfVxuICAgIHNlbGVjY2lvbmFyRW1wcmVzYSgpe1xuICAgICAgICBsZXQgZW1wcmVzYXMgPSBbXTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXModGhpcy5lbXByZXNhcykubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZW1wcmVzYXNbaV0pXG4gICAgICAgICAgICBlbXByZXNhcy5wdXNoKHRoaXMuZW1wcmVzYXNbaV0ubmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgZGlhbG9ncy5hY3Rpb24oe1xuICAgICAgICAgICAgbWVzc2FnZTogXCJFbXByZXNhc1wiLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxhclwiLFxuICAgICAgICAgICAgYWN0aW9uczogZW1wcmVzYXNcbiAgICAgICAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgaWYocmVzdWx0KXtcbiAgICAgICAgICAgICAgICB0aGlzLmVtcHJlc2EgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXModGhpcy5lbXByZXNhcykubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5lbXByZXNhc1tpXSlcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0PT10aGlzLmVtcHJlc2FzW2ldLm5hbWUpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1wcmVzYUlkPXRoaXMuZW1wcmVzYXNbaV0udXNlcm5hbWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyByZXN1bHQ6IFwiICsgcmVzdWx0KTtcbiAgICAgICAgICAgIGlmKHJlc3VsdCA9PSBcIk9wdGlvbjFcIil7XG4gICAgICAgICAgICAgICAgLy9EbyBhY3Rpb24xXG4gICAgICAgICAgICB9ZWxzZSBpZihyZXN1bHQgPT0gXCJPcHRpb24yXCIpe1xuICAgICAgICAgICAgICAgIC8vRG8gYWN0aW9uMlxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvblNpZ251cEJ1dHRvblRhcCgpOiB2b2lkIHtcbiAgICAgICAgbG9hZGVyLnNob3coKTtcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMubmFtZTtcbiAgICAgICAgY29uc3QgbGFzdG5hbWUgPSB0aGlzLmxhc3RuYW1lO1xuICAgICAgICBjb25zdCBlbWFpbCA9IHRoaXMuZW1haWw7XG4gICAgICAgIGNvbnN0IGVtYWlsMiA9IHRoaXMuZW1haWwyO1xuICAgICAgICBjb25zdCBjZWR1bGEgPSB0aGlzLmNlZHVsYTtcbiAgICAgICAgY29uc3QgY2VsdWxhciA9IHRoaXMuY2VsdWxhcjtcbiAgICAgICAgY29uc3QgZ3J1cG8gPSB0aGlzLmdydXBvO1xuICAgICAgICBjb25zdCBlbXByZXNhID0gdGhpcy5lbXByZXNhO1xuICAgICAgICBjb25zdCBlbXByZXNhSWQgPSB0aGlzLmVtcHJlc2FJZDtcbiAgICAgICAgaWYobmFtZSYmZW1haWwmJmVtYWlsMiYmY2VkdWxhJiZlbXByZXNhJiZlbXByZXNhSWQmJmxhc3RuYW1lJiZjZWx1bGFyKXtcbiAgICAgICAgICAgIC8vTWl4cGFuZWxIZWxwZXIudHJhY2soJ0NyZWFuZG9DdWVudGEnLCdPSycpO1xuICAgICAgICAgICAgaWYoZW1haWwgIT0gZW1haWwyKXtcbiAgICAgICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0Vycm9yIGRlIGN1ZW50YScsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdUdXMgZGlyZWNjaW9uZXMgZGUgY29ycmVvIG5vIGNvaW5jaWRlbicsXG4gICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ09rJ1xuICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMubXlTZXJ2aWNlLnJlZ2lzdHJhcigobmFtZSsnICcrbGFzdG5hbWUpLGVtYWlsLGNlZHVsYSxncnVwbykuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFTdWNjZXNzKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdFcnJvciBkZSBkYXRvcycsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdEZWJlcyBjb21wbGV0YXIgbG9zIGNhbXBvcyBvYmxpZ2F0b3Jpb3MnLFxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6ICdPaydcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIENhbGwgeW91ciBjdXN0b20gc2lnbnVwIGxvZ2ljIHVzaW5nIHRoZSBlbWFpbCBhbmQgcGFzc3dvcmQgZGF0YS5cbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICB9XG4gICAgXG4gICAgb25HZXREYXRhU3VjY2VzcyhyZXMpIHsgXG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGVsIHJlZ2lzdHJvJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlcykpOyBcbiAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgaWYocmVzLnJlc3VsdGFkbyA9PSAnT0snKXtcbiAgICAgICAgICAgIC8vTWl4cGFuZWxIZWxwZXIudHJhY2soJ0NyZWFuZG9DdWVudGFPSycsJ09LJyk7XG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0N1ZW50YSBjcmVhZGEnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHJlcy5tZW5zYWplLFxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ0dyYWNpYXMhJ1xuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLm15U2VydmljZS5nZXRJZE1lbWJlcih0aGlzLmNlZHVsYSx0aGlzLmVtYWlsKS5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4aXRvSWRNZW1iZXIocmVzdWx0LHJlcy5pZHVzdWFyaW8pO1xuICAgICAgICAgICAgICAgICAgICAvL0FwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKCdpZFJlZ2lzdHJvJyxyZXMuaWR1c3VhcmlvKTtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2xvZ2luXCJdKTtcbiAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIC8vYWxlcnQoJ05PJyk7IFxuICAgICAgICAgICAgLy9NaXhwYW5lbEhlbHBlci50cmFjaygnQ3JlYW5kb0N1ZW50YUVycm9yJywnT0snKTtcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnRXJyb3IgZGUgY3VlbnRhJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiByZXMubWVuc2FqZSxcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6ICdHcmFjaWFzISdcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgfVxuXG4gICAgZXhpdG9JZE1lbWJlcihyZXMsaWRVc3VhcmlvKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGVsIGV4aXRvSWRNZW1iZXInKTtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzKSk7IFxuICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICB0aGlzLm15U2VydmljZS5hc2lnbmFySWRNZW1iZXIoaWRVc3VhcmlvLHJlcy5pZG1lbWJlcikuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGUgYXNpZ25hY2nDs24gZGUgSUQgTWVtZWJyJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgdGhpcy5leGl0b0FzaWduYWNpb25Nb2RpcGF5KGlkVXN1YXJpbyk7XG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgIH0pO1xuICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcImlkbWVtYmVyXCIscmVzLmlkbWVtYmVyKTtcbiAgICB9XG5cbiAgICBleGl0b0FzaWduYWNpb25Nb2RpcGF5KGlkVXN1YXJpbykge1xuICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlbCBleGl0b0lkTWVtYmVyJyk7XG4gICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgIHRoaXMubXlTZXJ2aWNlLmdldElkVmFuZ28odGhpcy5jZWR1bGEsdGhpcy5lbWFpbCx0aGlzLm5hbWUsdGhpcy5lbXByZXNhLHRoaXMuZW1wcmVzYUlkLHRoaXMuY2VsdWxhcix0aGlzLmxhc3RuYW1lKS5zdWJzY3JpYmUoKHJlc3VsdDphbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGUgYXNpZ25hY2nDs24gZGUgSUQgTWVtZWJyJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJpZHZhbmdvXCIscmVzdWx0LmlkdmFuZ28pO1xuICAgICAgICAgICAgdGhpcy5leGl0b0lkVmFuZ28oaWRVc3VhcmlvLHJlc3VsdC5pZHZhbmdvKVxuICAgICAgICAgICAgLy90aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2xvZ2luXCJdKTtcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuXG4gICAgfVxuXG4gICAgZXhpdG9JZFZhbmdvKGlkVXN1YXJpbyxpZFZhbmdvKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGVsIGV4aXRvSWRNZW1iZXInKTtcbiAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgdGhpcy5teVNlcnZpY2UuYXNpZ25hcklkVmFuZ28oaWRVc3VhcmlvLGlkVmFuZ28pLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlIGFzaWduYWNpw7NuIGRlIElEIFZhbmdvJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9sb2dpblwiXSk7XG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkdldERhdGFFcnJvcihlcnJvcjogUmVzcG9uc2UgfCBhbnkpIHtcbiAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZSBlcnJvcicpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiAnRXJyb3IgZGUgY29uZXhpw7NuJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiTG8gc2VudGltb3MsIGh1Ym8gdW4gcHJvYmxlbWEgZW5jb250cmFuZG8gZWwgc2Vydmlkb3IsIHZlcmlmaWNhIHR1IGNvbmV4acOzbiBhIEludGVybmV0IGUgaW50ZW50YSBudWV2YW1lbnRlLlwiLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=