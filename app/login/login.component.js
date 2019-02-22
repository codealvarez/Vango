"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var ws_service_1 = require("../ws.service");
var dialogs = require("ui/dialogs");
var ApplicationSettings = require("application-settings");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var page_1 = require("ui/page");
//import {MixpanelHelper} from "nativescript-mixpanel";
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "login", loadChildren: "./login/login.module#LoginModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var LoginComponent = /** @class */ (function () {
    function LoginComponent(routerExtensions, myService, page) {
        this.routerExtensions = routerExtensions;
        this.myService = myService;
        this.page = page;
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
        if (ApplicationSettings.getBoolean("authenticated", false)) {
            this.routerExtensions.navigate(["/home"], { clearHistory: true });
        }
        this.page.actionBarHidden = true;
        //MixpanelHelper.track('EnLogin','OK');
    }
    LoginComponent.prototype.ngOnInit = function () {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    };
    LoginComponent.prototype.onLoginWithSocialProviderButtonTap = function () {
        /* ***********************************************************
        * For log in with social provider you can add your custom logic or
        * use NativeScript plugin for log in with Facebook
        * http://market.nativescript.org/plugins/nativescript-facebook
        *************************************************************/
    };
    LoginComponent.prototype.onSigninButtonTap = function () {
        var cedula = this.cedula;
        var clave = this.clave;
        if (cedula && clave) {
            this.hacerLogin(cedula, clave);
            //MixpanelHelper.track('IniciandoSesion','OK');   
        }
        else {
            dialogs.alert({
                title: "Error",
                message: "Debes ingresar tu número de cédula y contraseña para iniciar sesión",
                okButtonText: 'Ok!'
            }).then(function () {
            });
        }
    };
    LoginComponent.prototype.onReturn = function (cedula, clave) {
        console.log('Cedula ingresada: ' + cedula);
        this.cedula = cedula;
        this.clave = clave;
        if (this.cedula && this.clave) {
            this.hacerLogin(cedula, clave);
            //MixpanelHelper.track('IniciandoSesion','OK');   
        }
        else {
            dialogs.alert({
                title: "Error",
                message: "Debes ingresar tu número de cédula y contraseña para iniciar sesión",
                okButtonText: 'Ok!'
            }).then(function () {
            });
        }
    };
    LoginComponent.prototype.hacerLogin = function (u, c) {
        var _this = this;
        loader.show();
        this.myService.getLogin(u, c)
            .subscribe(function (result) {
            _this.onGetDataSuccess(result);
        }, function (error) {
            _this.onGetDataError(error);
        });
    };
    LoginComponent.prototype.onGetDataSuccess = function (res) {
        var _this = this;
        console.log('Respuesta del login');
        console.log(JSON.stringify(res));
        loader.hide();
        if (res.resultado == 'OK') {
            //MixpanelHelper.track('LoginExitoso','OK');
            /*dialogs.alert({
                title: "Bienvenido!",
                message: "Hola "+res.nombre+", bienvenido nuevamente a Vango",
                okButtonText: 'Gracias!'
            }).then(() => {
                console.log("Dialog closed!");
                ApplicationSettings.setBoolean("authenticated", true);
                ApplicationSettings.setString("nombreUsuario",res.nombre);
                ApplicationSettings.setString("idUsuario",res.idpasajero);
                ApplicationSettings.setString("emailUsuario",res.mail);
                ApplicationSettings.setString("idmember",res.idmodipay);
                setTimeout(() => {
                    this.routerExtensions.navigate(["/home"]);
                }, 1000);
                
            });*/
            ApplicationSettings.setBoolean("authenticated", true);
            ApplicationSettings.setString("nombreUsuario", res.nombre);
            ApplicationSettings.setString("idUsuario", res.idpasajero);
            ApplicationSettings.setString("emailUsuario", res.mail);
            ApplicationSettings.setString("idmember", res.idmodipay);
            ApplicationSettings.setString("idvango", res.idvango);
            ApplicationSettings.setString("cedulaUsuario", this.cedula);
            setTimeout(function () {
                _this.routerExtensions.navigate(["/home"]);
            }, 200);
        }
        else {
            //MixpanelHelper.track('LoginErroneo','OK');
            dialogs.alert({
                title: 'Error de acceso',
                message: "Lo sentimos, hubo un problema ingresando con tus datos. Verificalos e intenta nuevamente.",
                okButtonText: 'Ok'
            }).then(function () {
                console.log("Dialog closed!");
            });
        }
    };
    LoginComponent.prototype.onGetDataError = function (error) {
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
    LoginComponent.prototype.onForgotPasswordTap = function () {
        /* ***********************************************************
        * Call your Forgot Password logic here.
        *************************************************************/
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: "Login",
            moduleId: module.id,
            templateUrl: "./login.component.html",
            providers: [ws_service_1.WebService]
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions, ws_service_1.WebService, page_1.Page])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUE2RDtBQUM3RCw0Q0FBMkM7QUFDM0Msb0NBQXNDO0FBQ3RDLDBEQUE0RDtBQUM1RCxpRkFBZ0U7QUFDaEUsZ0NBQStCO0FBRS9CLHVEQUF1RDtBQUV2RDs7Ozs7OERBSzhEO0FBQzlELElBQUksTUFBTSxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztBQVFwQztJQUlJLHdCQUFvQixnQkFBa0MsRUFBVSxTQUFxQixFQUFTLElBQVU7UUFBcEYscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVk7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ3BHOztzRUFFOEQ7UUFDOUQsSUFBRyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ3ZELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ3JFO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLHVDQUF1QztJQUMzQyxDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUNJOztzRUFFOEQ7SUFFbEUsQ0FBQztJQUVELDJEQUFrQyxHQUFsQztRQUNJOzs7O3NFQUk4RDtJQUNsRSxDQUFDO0lBRUQsMENBQWlCLEdBQWpCO1FBQ0ksSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3pCLElBQUcsTUFBTSxJQUFJLEtBQUssRUFBQztZQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFDLEtBQUss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QixPQUFPLEVBQUUsMkZBQTJGO2dCQUNwRyxZQUFZLEVBQUUsSUFBSTthQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUVsQyxDQUFDLENBQUMsQ0FBQztTQUNOO0lBR0wsQ0FBQztJQUVPLHVDQUFjLEdBQXRCLFVBQXVCLEtBQXFCO1FBQ3hDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNuQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ1YsS0FBSyxFQUFFLG1CQUFtQjtZQUMxQixPQUFPLEVBQUUsOEdBQThHO1lBQ3ZILFlBQVksRUFBRSxJQUFJO1NBQ3JCLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFbEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBR0QsNENBQW1CLEdBQW5CO1FBQ0k7O3NFQUU4RDtJQUVsRSxDQUFDO0lBakpRLGNBQWM7UUFQMUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsd0JBQXdCO1lBQ3JDLFNBQVMsRUFBRSxDQUFDLHVCQUFVLENBQUM7U0FDMUIsQ0FBQzt5Q0FNd0MseUJBQWdCLEVBQXFCLHVCQUFVLEVBQWUsV0FBSTtPQUovRixjQUFjLENBa0oxQjtJQUFELHFCQUFDO0NBQUEsQUFsSkQsSUFrSkM7QUFsSlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFdlYlNlcnZpY2UgfSBmcm9tIFwiLi4vd3Muc2VydmljZVwiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7TG9hZGluZ0luZGljYXRvcn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7IFxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcbi8vaW1wb3J0IHtNaXhwYW5lbEhlbHBlcn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1taXhwYW5lbFwiO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBCZWZvcmUgeW91IGNhbiBuYXZpZ2F0ZSB0byB0aGlzIHBhZ2UgZnJvbSB5b3VyIGFwcCwgeW91IG5lZWQgdG8gcmVmZXJlbmNlIHRoaXMgcGFnZSdzIG1vZHVsZSBpbiB0aGVcbiogZ2xvYmFsIGFwcCByb3V0ZXIgbW9kdWxlLiBBZGQgdGhlIGZvbGxvd2luZyBvYmplY3QgdG8gdGhlIGdsb2JhbCBhcnJheSBvZiByb3V0ZXM6XG4qIHsgcGF0aDogXCJsb2dpblwiLCBsb2FkQ2hpbGRyZW46IFwiLi9sb2dpbi9sb2dpbi5tb2R1bGUjTG9naW5Nb2R1bGVcIiB9XG4qIE5vdGUgdGhhdCB0aGlzIHNpbXBseSBwb2ludHMgdGhlIHBhdGggdG8gdGhlIHBhZ2UgbW9kdWxlIGZpbGUuIElmIHlvdSBtb3ZlIHRoZSBwYWdlLCB5b3UgbmVlZCB0byB1cGRhdGUgdGhlIHJvdXRlIHRvby5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5sZXQgbG9hZGVyID0gbmV3IExvYWRpbmdJbmRpY2F0b3IoKTtcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIkxvZ2luXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2xvZ2luLmNvbXBvbmVudC5odG1sXCIsXG4gICAgcHJvdmlkZXJzOiBbV2ViU2VydmljZV1cbn0pXG5cbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgY2VkdWxhOiBzdHJpbmc7XG4gICAgY2xhdmU6IHN0cmluZzsgXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgbXlTZXJ2aWNlOiBXZWJTZXJ2aWNlLHByaXZhdGUgcGFnZTogUGFnZSkge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFVzZSB0aGUgY29uc3RydWN0b3IgdG8gaW5qZWN0IGFwcCBzZXJ2aWNlcyB0aGF0IHlvdSBuZWVkIGluIHRoaXMgY29tcG9uZW50LlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgICAgICBpZihBcHBsaWNhdGlvblNldHRpbmdzLmdldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIGZhbHNlKSkge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgLy9NaXhwYW5lbEhlbHBlci50cmFjaygnRW5Mb2dpbicsJ09LJyk7XG4gICAgfSBcblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFVzZSB0aGUgXCJuZ09uSW5pdFwiIGhhbmRsZXIgdG8gaW5pdGlhbGl6ZSBkYXRhIGZvciB0aGlzIGNvbXBvbmVudC5cbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAgICAgXG4gICAgfVxuXG4gICAgb25Mb2dpbldpdGhTb2NpYWxQcm92aWRlckJ1dHRvblRhcCgpOiB2b2lkIHtcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBGb3IgbG9nIGluIHdpdGggc29jaWFsIHByb3ZpZGVyIHlvdSBjYW4gYWRkIHlvdXIgY3VzdG9tIGxvZ2ljIG9yXG4gICAgICAgICogdXNlIE5hdGl2ZVNjcmlwdCBwbHVnaW4gZm9yIGxvZyBpbiB3aXRoIEZhY2Vib29rXG4gICAgICAgICogaHR0cDovL21hcmtldC5uYXRpdmVzY3JpcHQub3JnL3BsdWdpbnMvbmF0aXZlc2NyaXB0LWZhY2Vib29rXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgfVxuXG4gICAgb25TaWduaW5CdXR0b25UYXAoKTogdm9pZCB7IFxuICAgICAgICBjb25zdCBjZWR1bGEgPSB0aGlzLmNlZHVsYTtcbiAgICAgICAgY29uc3QgY2xhdmUgPSB0aGlzLmNsYXZlO1xuICAgICAgICBpZihjZWR1bGEgJiYgY2xhdmUpe1xuICAgICAgICAgICAgdGhpcy5oYWNlckxvZ2luKGNlZHVsYSxjbGF2ZSk7IFxuICAgICAgICAgICAgLy9NaXhwYW5lbEhlbHBlci50cmFjaygnSW5pY2lhbmRvU2VzaW9uJywnT0snKTsgICBcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvclwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiRGViZXMgaW5ncmVzYXIgdHUgbsO6bWVybyBkZSBjw6lkdWxhIHkgY29udHJhc2XDsWEgcGFyYSBpbmljaWFyIHNlc2nDs25cIixcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6ICdPayEnXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIHB1YmxpYyBvblJldHVybihjZWR1bGEsY2xhdmUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NlZHVsYSBpbmdyZXNhZGE6ICcrY2VkdWxhKTtcbiAgICAgICAgdGhpcy5jZWR1bGEgPSBjZWR1bGE7XG4gICAgICAgIHRoaXMuY2xhdmUgPSBjbGF2ZTtcbiAgICAgICAgaWYodGhpcy5jZWR1bGEgJiYgdGhpcy5jbGF2ZSl7XG4gICAgICAgICAgICB0aGlzLmhhY2VyTG9naW4oY2VkdWxhLGNsYXZlKTsgXG4gICAgICAgICAgICAvL01peHBhbmVsSGVscGVyLnRyYWNrKCdJbmljaWFuZG9TZXNpb24nLCdPSycpOyAgIFxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIkVycm9yXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJEZWJlcyBpbmdyZXNhciB0dSBuw7ptZXJvIGRlIGPDqWR1bGEgeSBjb250cmFzZcOxYSBwYXJhIGluaWNpYXIgc2VzacOzblwiLFxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ09rISdcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYWNlckxvZ2luKHUsYykge1xuICAgICAgICBsb2FkZXIuc2hvdygpO1xuICAgICAgICB0aGlzLm15U2VydmljZS5nZXRMb2dpbih1LGMpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YVN1Y2Nlc3MocmVzdWx0KTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25HZXREYXRhU3VjY2VzcyhyZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZWwgbG9naW4nKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXMpKTsgXG4gICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgIGlmKHJlcy5yZXN1bHRhZG8gPT0gJ09LJyl7XG4gICAgICAgICAgICAvL01peHBhbmVsSGVscGVyLnRyYWNrKCdMb2dpbkV4aXRvc28nLCdPSycpO1xuICAgICAgICAgICAgLypkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJCaWVudmVuaWRvIVwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiSG9sYSBcIityZXMubm9tYnJlK1wiLCBiaWVudmVuaWRvIG51ZXZhbWVudGUgYSBWYW5nb1wiLFxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ0dyYWNpYXMhJ1xuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwibm9tYnJlVXN1YXJpb1wiLHJlcy5ub21icmUpO1xuICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiaWRVc3VhcmlvXCIscmVzLmlkcGFzYWplcm8pO1xuICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiZW1haWxVc3VhcmlvXCIscmVzLm1haWwpO1xuICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiaWRtZW1iZXJcIixyZXMuaWRtb2RpcGF5KTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lXCJdKTtcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pOyovXG4gICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIHRydWUpO1xuICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJub21icmVVc3VhcmlvXCIscmVzLm5vbWJyZSk7XG4gICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcImlkVXN1YXJpb1wiLHJlcy5pZHBhc2FqZXJvKTtcbiAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiZW1haWxVc3VhcmlvXCIscmVzLm1haWwpO1xuICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJpZG1lbWJlclwiLHJlcy5pZG1vZGlwYXkpO1xuICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJpZHZhbmdvXCIscmVzLmlkdmFuZ28pO1xuICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJjZWR1bGFVc3VhcmlvXCIsdGhpcy5jZWR1bGEpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZVwiXSk7XG4gICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICAgICAgXG4gICAgICAgIH1lbHNleyBcbiAgICAgICAgICAgIC8vTWl4cGFuZWxIZWxwZXIudHJhY2soJ0xvZ2luRXJyb25lbycsJ09LJyk7XG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0Vycm9yIGRlIGFjY2VzbycsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJMbyBzZW50aW1vcywgaHVibyB1biBwcm9ibGVtYSBpbmdyZXNhbmRvIGNvbiB0dXMgZGF0b3MuIFZlcmlmaWNhbG9zIGUgaW50ZW50YSBudWV2YW1lbnRlLlwiLFxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ09rJ1xuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkdldERhdGFFcnJvcihlcnJvcjogUmVzcG9uc2UgfCBhbnkpIHtcbiAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZSBlcnJvcicpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiAnRXJyb3IgZGUgY29uZXhpw7NuJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiTG8gc2VudGltb3MsIGh1Ym8gdW4gcHJvYmxlbWEgZW5jb250cmFuZG8gZWwgc2Vydmlkb3IsIHZlcmlmaWNhIHR1IGNvbmV4acOzbiBhIEludGVybmV0IGUgaW50ZW50YSBudWV2YW1lbnRlLlwiLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIG9uRm9yZ290UGFzc3dvcmRUYXAoKTogdm9pZCB7XG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogQ2FsbCB5b3VyIEZvcmdvdCBQYXNzd29yZCBsb2dpYyBoZXJlLlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgICAgICBcbiAgICB9XG59XG4iXX0=