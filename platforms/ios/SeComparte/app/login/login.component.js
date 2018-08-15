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
            dialogs.alert({
                title: "Bienvenido!",
                message: "Hola " + res.nombre + ", bienvenido nuevamente a Vango",
                okButtonText: 'Gracias!'
            }).then(function () {
                console.log("Dialog closed!");
                ApplicationSettings.setBoolean("authenticated", true);
                ApplicationSettings.setString("nombreUsuario", res.nombre);
                ApplicationSettings.setString("idUsuario", res.idpasajero);
                ApplicationSettings.setString("emailUsuario", res.mail);
                ApplicationSettings.setString("idmember", res.idmodipay);
                setTimeout(function () {
                    _this.routerExtensions.navigate(["/home"]);
                }, 1000);
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUE2RDtBQUM3RCw0Q0FBMkM7QUFDM0Msb0NBQXNDO0FBQ3RDLDBEQUE0RDtBQUM1RCxpRkFBZ0U7QUFDaEUsZ0NBQStCO0FBRS9CLHVEQUF1RDtBQUV2RDs7Ozs7OERBSzhEO0FBQzlELElBQUksTUFBTSxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztBQVFwQztJQUVJLGlCQUFpQjtJQUVqQix3QkFBb0IsZ0JBQWtDLEVBQVUsU0FBcUIsRUFBUyxJQUFVO1FBQXBGLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFZO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNwRzs7c0VBRThEO1FBQzlELEVBQUUsQ0FBQSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDakMsdUNBQXVDO0lBQzNDLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0k7O3NFQUU4RDtJQUNsRSxDQUFDO0lBRUQsMkRBQWtDLEdBQWxDO1FBQ0k7Ozs7c0VBSThEO0lBQ2xFLENBQUM7SUFFRCwwQ0FBaUIsR0FBakI7UUFDSSxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNCLDJCQUEyQjtRQUMzQixFQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFDO1lBQ1AsSUFBSSxDQUFDLFVBQVUs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cElELElBb0lDO0FBcElZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBXZWJTZXJ2aWNlIH0gZnJvbSBcIi4uL3dzLnNlcnZpY2VcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQge0xvYWRpbmdJbmRpY2F0b3J9IGZyb20gXCJuYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3JcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiOyBcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG4vL2ltcG9ydCB7TWl4cGFuZWxIZWxwZXJ9IGZyb20gXCJuYXRpdmVzY3JpcHQtbWl4cGFuZWxcIjtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiogQmVmb3JlIHlvdSBjYW4gbmF2aWdhdGUgdG8gdGhpcyBwYWdlIGZyb20geW91ciBhcHAsIHlvdSBuZWVkIHRvIHJlZmVyZW5jZSB0aGlzIHBhZ2UncyBtb2R1bGUgaW4gdGhlXG4qIGdsb2JhbCBhcHAgcm91dGVyIG1vZHVsZS4gQWRkIHRoZSBmb2xsb3dpbmcgb2JqZWN0IHRvIHRoZSBnbG9iYWwgYXJyYXkgb2Ygcm91dGVzOlxuKiB7IHBhdGg6IFwibG9naW5cIiwgbG9hZENoaWxkcmVuOiBcIi4vbG9naW4vbG9naW4ubW9kdWxlI0xvZ2luTW9kdWxlXCIgfVxuKiBOb3RlIHRoYXQgdGhpcyBzaW1wbHkgcG9pbnRzIHRoZSBwYXRoIHRvIHRoZSBwYWdlIG1vZHVsZSBmaWxlLiBJZiB5b3UgbW92ZSB0aGUgcGFnZSwgeW91IG5lZWQgdG8gdXBkYXRlIHRoZSByb3V0ZSB0b28uXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xubGV0IGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJMb2dpblwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9sb2dpbi5jb21wb25lbnQuaHRtbFwiLFxuICAgIHByb3ZpZGVyczogW1dlYlNlcnZpY2VdXG59KVxuXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGNlZHVsYTogc3RyaW5nO1xuICAgIC8vY2xhdmU6IHN0cmluZzsgXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgbXlTZXJ2aWNlOiBXZWJTZXJ2aWNlLHByaXZhdGUgcGFnZTogUGFnZSkge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFVzZSB0aGUgY29uc3RydWN0b3IgdG8gaW5qZWN0IGFwcCBzZXJ2aWNlcyB0aGF0IHlvdSBuZWVkIGluIHRoaXMgY29tcG9uZW50LlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgICAgICBpZihBcHBsaWNhdGlvblNldHRpbmdzLmdldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIGZhbHNlKSkge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgLy9NaXhwYW5lbEhlbHBlci50cmFjaygnRW5Mb2dpbicsJ09LJyk7XG4gICAgfSBcblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFVzZSB0aGUgXCJuZ09uSW5pdFwiIGhhbmRsZXIgdG8gaW5pdGlhbGl6ZSBkYXRhIGZvciB0aGlzIGNvbXBvbmVudC5cbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICB9XG5cbiAgICBvbkxvZ2luV2l0aFNvY2lhbFByb3ZpZGVyQnV0dG9uVGFwKCk6IHZvaWQge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIEZvciBsb2cgaW4gd2l0aCBzb2NpYWwgcHJvdmlkZXIgeW91IGNhbiBhZGQgeW91ciBjdXN0b20gbG9naWMgb3JcbiAgICAgICAgKiB1c2UgTmF0aXZlU2NyaXB0IHBsdWdpbiBmb3IgbG9nIGluIHdpdGggRmFjZWJvb2tcbiAgICAgICAgKiBodHRwOi8vbWFya2V0Lm5hdGl2ZXNjcmlwdC5vcmcvcGx1Z2lucy9uYXRpdmVzY3JpcHQtZmFjZWJvb2tcbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICB9XG5cbiAgICBvblNpZ25pbkJ1dHRvblRhcCgpOiB2b2lkIHsgXG4gICAgICAgIGNvbnN0IGNlZHVsYSA9IHRoaXMuY2VkdWxhO1xuICAgICAgICAvL2NvbnN0IGNsYXZlID0gdGhpcy5jbGF2ZTtcbiAgICAgICAgaWYoY2VkdWxhKXtcbiAgICAgICAgICAgIHRoaXMuaGFjZXJMb2dpbihjZWR1bGEsMCk7IFxuICAgICAgICAgICAgLy9NaXhwYW5lbEhlbHBlci50cmFjaygnSW5pY2lhbmRvU2VzaW9uJywnT0snKTsgICBcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvclwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiRGViZXMgaW5ncmVzYXIgdHUgbsO6bWVybyBkZSBjw6lkdWxhIHBhcmEgaW5pY2lhciBzZXNpw7NuXCIsXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2shJ1xuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICBwdWJsaWMgb25SZXR1cm4oY2VkdWxhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDZWR1bGEgaW5ncmVzYWRhOiAnK2NlZHVsYSk7XG4gICAgICAgIHRoaXMuY2VkdWxhID0gY2VkdWxhO1xuXG4gICAgICAgIGlmKHRoaXMuY2VkdWxhKXtcbiAgICAgICAgICAgIHRoaXMuaGFjZXJMb2dpbihjZWR1bGEsMCk7IFxuICAgICAgICAgICAgLy9NaXhwYW5lbEhlbHBlci50cmFjaygnSW5pY2lhbmRvU2VzaW9uJywnT0snKTsgICBcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvclwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiRGViZXMgaW5ncmVzYXIgdHUgbsO6bWVybyBkZSBjw6lkdWxhIHBhcmEgaW5pY2lhciBzZXNpw7NuXCIsXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2shJ1xuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhY2VyTG9naW4odSxjKSB7XG4gICAgICAgIGxvYWRlci5zaG93KCk7XG4gICAgICAgIHRoaXMubXlTZXJ2aWNlLmdldExvZ2luKHUsYylcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25HZXREYXRhU3VjY2VzcyhyZXN1bHQpO1xuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkdldERhdGFTdWNjZXNzKHJlcykge1xuICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlbCBsb2dpbicpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlcykpOyBcbiAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgaWYocmVzLnJlc3VsdGFkbyA9PSAnT0snKXtcbiAgICAgICAgICAgIC8vTWl4cGFuZWxIZWxwZXIudHJhY2soJ0xvZ2luRXhpdG9zbycsJ09LJyk7XG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJCaWVudmVuaWRvIVwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiSG9sYSBcIityZXMubm9tYnJlK1wiLCBiaWVudmVuaWRvIG51ZXZhbWVudGUgYSBWYW5nb1wiLFxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ0dyYWNpYXMhJ1xuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwibm9tYnJlVXN1YXJpb1wiLHJlcy5ub21icmUpO1xuICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiaWRVc3VhcmlvXCIscmVzLmlkcGFzYWplcm8pO1xuICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiZW1haWxVc3VhcmlvXCIscmVzLm1haWwpO1xuICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiaWRtZW1iZXJcIixyZXMuaWRtb2RpcGF5KTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lXCJdKTtcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgIH1lbHNleyBcbiAgICAgICAgICAgIC8vTWl4cGFuZWxIZWxwZXIudHJhY2soJ0xvZ2luRXJyb25lbycsJ09LJyk7XG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0Vycm9yIGRlIGFjY2VzbycsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJMbyBzZW50aW1vcywgaHVibyB1biBwcm9ibGVtYSBpbmdyZXNhbmRvIGNvbiB0dXMgZGF0b3MuIFZlcmlmaWNhbG9zIGUgaW50ZW50YSBudWV2YW1lbnRlLlwiLFxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ09rJ1xuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkdldERhdGFFcnJvcihlcnJvcjogUmVzcG9uc2UgfCBhbnkpIHtcbiAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZSBlcnJvcicpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiAnRXJyb3IgZGUgY29uZXhpw7NuJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiTG8gc2VudGltb3MsIGh1Ym8gdW4gcHJvYmxlbWEgZW5jb250cmFuZG8gZWwgc2Vydmlkb3IsIHZlcmlmaWNhIHR1IGNvbmV4acOzbiBhIEludGVybmV0IGUgaW50ZW50YSBudWV2YW1lbnRlLlwiLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIG9uRm9yZ290UGFzc3dvcmRUYXAoKTogdm9pZCB7XG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogQ2FsbCB5b3VyIEZvcmdvdCBQYXNzd29yZCBsb2dpYyBoZXJlLlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIH1cbn1cbiJdfQ==