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
    //clave: string; 
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
        //const clave = this.clave;
        if (cedula) {
            this.hacerLogin(cedula, 0);
            //MixpanelHelper.track('IniciandoSesion','OK');   
        }
        else {
            dialogs.alert({
                title: "Error",
                message: "Debes ingresar tu número de cédula para iniciar sesión",
                okButtonText: 'Ok!'
            }).then(function () {
            });
        }
    };
    LoginComponent.prototype.onReturn = function (cedula) {
        console.log('Cedula ingresada: ' + cedula);
        this.cedula = cedula;
        if (this.cedula) {
            this.hacerLogin(cedula, 0);
            //MixpanelHelper.track('IniciandoSesion','OK');   
        }
        else {
            dialogs.alert({
                title: "Error",
                message: "Debes ingresar tu número de cédula para iniciar sesión",
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
            if (res.cedula) {
                ApplicationSettings.setString("cedulaUsuario", res.cedula);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUE2RDtBQUM3RCw0Q0FBMkM7QUFDM0Msb0NBQXNDO0FBQ3RDLDBEQUE0RDtBQUM1RCxpRkFBZ0U7QUFDaEUsZ0NBQStCO0FBRS9CLHVEQUF1RDtBQUV2RDs7Ozs7OERBSzhEO0FBQzlELElBQUksTUFBTSxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztBQVFwQztJQUVJLGlCQUFpQjtJQUVqQix3QkFBb0IsZ0JBQWtDLEVBQVUsU0FBcUIsRUFBUyxJQUFVO1FBQXBGLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFZO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNwRzs7c0VBRThEO1FBQzlELEVBQUUsQ0FBQSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDakMsdUNBQXVDO0lBQzNDLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0k7O3NFQUU4RDtJQUVsRSxDQUFDO0lBRUQsMkRBQWtDLEdBQWxDO1FBQ0k7Ozs7c0VBSThEO0lBQ2xFLENBQUM7SUFFRCwwQ0FBaUIsR0FBakI7UUFDSSxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNCLDJCQUEyQjtRQUMzQixFQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFDO1lBQ1AsSUFBSSxDQUFDLFVBQVUs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SkM7QUFsSlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFdlYlNlcnZpY2UgfSBmcm9tIFwiLi4vd3Muc2VydmljZVwiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7TG9hZGluZ0luZGljYXRvcn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7IFxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcbi8vaW1wb3J0IHtNaXhwYW5lbEhlbHBlcn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1taXhwYW5lbFwiO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBCZWZvcmUgeW91IGNhbiBuYXZpZ2F0ZSB0byB0aGlzIHBhZ2UgZnJvbSB5b3VyIGFwcCwgeW91IG5lZWQgdG8gcmVmZXJlbmNlIHRoaXMgcGFnZSdzIG1vZHVsZSBpbiB0aGVcbiogZ2xvYmFsIGFwcCByb3V0ZXIgbW9kdWxlLiBBZGQgdGhlIGZvbGxvd2luZyBvYmplY3QgdG8gdGhlIGdsb2JhbCBhcnJheSBvZiByb3V0ZXM6XG4qIHsgcGF0aDogXCJsb2dpblwiLCBsb2FkQ2hpbGRyZW46IFwiLi9sb2dpbi9sb2dpbi5tb2R1bGUjTG9naW5Nb2R1bGVcIiB9XG4qIE5vdGUgdGhhdCB0aGlzIHNpbXBseSBwb2ludHMgdGhlIHBhdGggdG8gdGhlIHBhZ2UgbW9kdWxlIGZpbGUuIElmIHlvdSBtb3ZlIHRoZSBwYWdlLCB5b3UgbmVlZCB0byB1cGRhdGUgdGhlIHJvdXRlIHRvby5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5sZXQgbG9hZGVyID0gbmV3IExvYWRpbmdJbmRpY2F0b3IoKTtcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIkxvZ2luXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2xvZ2luLmNvbXBvbmVudC5odG1sXCIsXG4gICAgcHJvdmlkZXJzOiBbV2ViU2VydmljZV1cbn0pXG5cbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgY2VkdWxhOiBzdHJpbmc7XG4gICAgLy9jbGF2ZTogc3RyaW5nOyBcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSBteVNlcnZpY2U6IFdlYlNlcnZpY2UscHJpdmF0ZSBwYWdlOiBQYWdlKSB7XG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogVXNlIHRoZSBjb25zdHJ1Y3RvciB0byBpbmplY3QgYXBwIHNlcnZpY2VzIHRoYXQgeW91IG5lZWQgaW4gdGhpcyBjb21wb25lbnQuXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgICAgIGlmKEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0Qm9vbGVhbihcImF1dGhlbnRpY2F0ZWRcIiwgZmFsc2UpKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWVcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgICAgICAvL01peHBhbmVsSGVscGVyLnRyYWNrKCdFbkxvZ2luJywnT0snKTtcbiAgICB9IFxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogVXNlIHRoZSBcIm5nT25Jbml0XCIgaGFuZGxlciB0byBpbml0aWFsaXplIGRhdGEgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgICAgICBcbiAgICB9XG5cbiAgICBvbkxvZ2luV2l0aFNvY2lhbFByb3ZpZGVyQnV0dG9uVGFwKCk6IHZvaWQge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIEZvciBsb2cgaW4gd2l0aCBzb2NpYWwgcHJvdmlkZXIgeW91IGNhbiBhZGQgeW91ciBjdXN0b20gbG9naWMgb3JcbiAgICAgICAgKiB1c2UgTmF0aXZlU2NyaXB0IHBsdWdpbiBmb3IgbG9nIGluIHdpdGggRmFjZWJvb2tcbiAgICAgICAgKiBodHRwOi8vbWFya2V0Lm5hdGl2ZXNjcmlwdC5vcmcvcGx1Z2lucy9uYXRpdmVzY3JpcHQtZmFjZWJvb2tcbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICB9XG5cbiAgICBvblNpZ25pbkJ1dHRvblRhcCgpOiB2b2lkIHsgXG4gICAgICAgIGNvbnN0IGNlZHVsYSA9IHRoaXMuY2VkdWxhO1xuICAgICAgICAvL2NvbnN0IGNsYXZlID0gdGhpcy5jbGF2ZTtcbiAgICAgICAgaWYoY2VkdWxhKXtcbiAgICAgICAgICAgIHRoaXMuaGFjZXJMb2dpbihjZWR1bGEsMCk7IFxuICAgICAgICAgICAgLy9NaXhwYW5lbEhlbHBlci50cmFjaygnSW5pY2lhbmRvU2VzaW9uJywnT0snKTsgICBcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvclwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiRGViZXMgaW5ncmVzYXIgdHUgbsO6bWVybyBkZSBjw6lkdWxhIHBhcmEgaW5pY2lhciBzZXNpw7NuXCIsXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2shJ1xuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICBwdWJsaWMgb25SZXR1cm4oY2VkdWxhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDZWR1bGEgaW5ncmVzYWRhOiAnK2NlZHVsYSk7XG4gICAgICAgIHRoaXMuY2VkdWxhID0gY2VkdWxhO1xuXG4gICAgICAgIGlmKHRoaXMuY2VkdWxhKXtcbiAgICAgICAgICAgIHRoaXMuaGFjZXJMb2dpbihjZWR1bGEsMCk7IFxuICAgICAgICAgICAgLy9NaXhwYW5lbEhlbHBlci50cmFjaygnSW5pY2lhbmRvU2VzaW9uJywnT0snKTsgICBcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvclwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiRGViZXMgaW5ncmVzYXIgdHUgbsO6bWVybyBkZSBjw6lkdWxhIHBhcmEgaW5pY2lhciBzZXNpw7NuXCIsXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2shJ1xuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhY2VyTG9naW4odSxjKSB7XG4gICAgICAgIGxvYWRlci5zaG93KCk7XG4gICAgICAgIHRoaXMubXlTZXJ2aWNlLmdldExvZ2luKHUsYylcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25HZXREYXRhU3VjY2VzcyhyZXN1bHQpO1xuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkdldERhdGFTdWNjZXNzKHJlcykge1xuICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlbCBsb2dpbicpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlcykpOyBcbiAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgaWYocmVzLnJlc3VsdGFkbyA9PSAnT0snKXtcbiAgICAgICAgICAgIC8vTWl4cGFuZWxIZWxwZXIudHJhY2soJ0xvZ2luRXhpdG9zbycsJ09LJyk7XG4gICAgICAgICAgICAvKmRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIkJpZW52ZW5pZG8hXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJIb2xhIFwiK3Jlcy5ub21icmUrXCIsIGJpZW52ZW5pZG8gbnVldmFtZW50ZSBhIFZhbmdvXCIsXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnR3JhY2lhcyEnXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0Qm9vbGVhbihcImF1dGhlbnRpY2F0ZWRcIiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJub21icmVVc3VhcmlvXCIscmVzLm5vbWJyZSk7XG4gICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJpZFVzdWFyaW9cIixyZXMuaWRwYXNhamVybyk7XG4gICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJlbWFpbFVzdWFyaW9cIixyZXMubWFpbCk7XG4gICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJpZG1lbWJlclwiLHJlcy5pZG1vZGlwYXkpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWVcIl0pO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSk7Ki9cbiAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0Qm9vbGVhbihcImF1dGhlbnRpY2F0ZWRcIiwgdHJ1ZSk7XG4gICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcIm5vbWJyZVVzdWFyaW9cIixyZXMubm9tYnJlKTtcbiAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiaWRVc3VhcmlvXCIscmVzLmlkcGFzYWplcm8pO1xuICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJlbWFpbFVzdWFyaW9cIixyZXMubWFpbCk7XG4gICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcImlkbWVtYmVyXCIscmVzLmlkbW9kaXBheSk7XG4gICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcImlkdmFuZ29cIixyZXMuaWR2YW5nbyk7XG4gICAgICAgICAgICBpZihyZXMuY2VkdWxhKXtcbiAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcImNlZHVsYVVzdWFyaW9cIixyZXMuY2VkdWxhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lXCJdKTtcbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfWVsc2V7IFxuICAgICAgICAgICAgLy9NaXhwYW5lbEhlbHBlci50cmFjaygnTG9naW5FcnJvbmVvJywnT0snKTtcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnRXJyb3IgZGUgYWNjZXNvJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkxvIHNlbnRpbW9zLCBodWJvIHVuIHByb2JsZW1hIGluZ3Jlc2FuZG8gY29uIHR1cyBkYXRvcy4gVmVyaWZpY2Fsb3MgZSBpbnRlbnRhIG51ZXZhbWVudGUuXCIsXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uR2V0RGF0YUVycm9yKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xuICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlIGVycm9yJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgdGl0bGU6ICdFcnJvciBkZSBjb25leGnDs24nLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJMbyBzZW50aW1vcywgaHVibyB1biBwcm9ibGVtYSBlbmNvbnRyYW5kbyBlbCBzZXJ2aWRvciwgdmVyaWZpY2EgdHUgY29uZXhpw7NuIGEgSW50ZXJuZXQgZSBpbnRlbnRhIG51ZXZhbWVudGUuXCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6ICdPaydcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgb25Gb3Jnb3RQYXNzd29yZFRhcCgpOiB2b2lkIHtcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBDYWxsIHlvdXIgRm9yZ290IFBhc3N3b3JkIGxvZ2ljIGhlcmUuXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgfVxufVxuIl19