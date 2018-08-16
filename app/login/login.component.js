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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUE2RDtBQUM3RCw0Q0FBMkM7QUFDM0Msb0NBQXNDO0FBQ3RDLDBEQUE0RDtBQUM1RCxpRkFBZ0U7QUFDaEUsZ0NBQStCO0FBRS9CLHVEQUF1RDtBQUV2RDs7Ozs7OERBSzhEO0FBQzlELElBQUksTUFBTSxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztBQVFwQztJQUVJLGlCQUFpQjtJQUVqQix3QkFBb0IsZ0JBQWtDLEVBQVUsU0FBcUIsRUFBUyxJQUFVO1FBQXBGLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFZO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNwRzs7c0VBRThEO1FBQzlELEVBQUUsQ0FBQSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDakMsdUNBQXVDO0lBQzNDLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0k7O3NFQUU4RDtJQUNsRSxDQUFDO0lBRUQsMkRBQWtDLEdBQWxDO1FBQ0k7Ozs7c0VBSThEO0lBQ2xFLENBQUM7SUFFRCwwQ0FBaUIsR0FBakI7UUFDSSxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNCLDJCQUEyQjtRQUMzQixFQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFDO1lBQ1AsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsa0RBQWtEO1FBQ3RELENBQUM7UUFBQSxJQUFJLENBQUEsQ0FBQztZQUNGLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ1YsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsT0FBTyxFQUFFLHdEQUF3RDtnQkFDakUsWUFBWSxFQUFFLEtBQUs7YUFDdEIsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNSLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUVMLENBQUM7SUFFTSxpQ0FBUSxHQUFmLFVBQWdCLE1BQU07UUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsR0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQztZQUNaLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLGtEQUFrRDtRQUN0RCxDQUFDO1FBQUEsSUFBSSxDQUFBLENBQUM7WUFDRixPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUNWLEtBQUssRUFBRSxPQUFPO2dCQUNkLE9BQU8sRUFBRSx3REFBd0Q7Z0JBQ2pFLFlBQVksRUFBRSxLQUFLO2FBQ3RCLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDUixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDO0lBRUQsbUNBQVUsR0FBVixVQUFXLENBQUMsRUFBQyxDQUFDO1FBQWQsaUJBUUM7UUFQRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO2FBQ3ZCLFNBQVMsQ0FBQyxVQUFDLE1BQU07WUFDZCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEMsQ0FBQyxFQUFFLFVBQUMsS0FBSztZQUNMLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQseUNBQWdCLEdBQWhCLFVBQWlCLEdBQUc7UUFBcEIsaUJBNkNDO1FBNUNHLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUVuQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNqQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDZCxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDdEIsNENBQTRDO1lBQzVDOzs7Ozs7Ozs7Ozs7Ozs7aUJBZUs7WUFDTCxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3RELG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFELG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzFELG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZELG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3hELFVBQVUsQ0FBQztnQkFDUCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM5QyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFWixDQUFDO1FBQUEsSUFBSSxDQUFBLENBQUM7WUFDRiw0Q0FBNEM7WUFDNUMsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDVixLQUFLLEVBQUUsaUJBQWlCO2dCQUN4QixPQUFPLEVBQUUsMkZBQTJGO2dCQUNwRyxZQUFZLEVBQUUsSUFBSTthQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUVsQyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7SUFHTCxDQUFDO0lBRU8sdUNBQWMsR0FBdEIsVUFBdUIsS0FBcUI7UUFDeEMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDVixLQUFLLEVBQUUsbUJBQW1CO1lBQzFCLE9BQU8sRUFBRSw4R0FBOEc7WUFDdkgsWUFBWSxFQUFFLElBQUk7U0FDckIsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUVsQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFHRCw0Q0FBbUIsR0FBbkI7UUFDSTs7c0VBRThEO0lBQ2xFLENBQUM7SUEzSVEsY0FBYztRQVAxQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE9BQU87WUFDakIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsU0FBUyxFQUFFLENBQUMsdUJBQVUsQ0FBQztTQUMxQixDQUFDO3lDQU13Qyx5QkFBZ0IsRUFBcUIsdUJBQVUsRUFBZSxXQUFJO09BSi9GLGNBQWMsQ0E0STFCO0lBQUQscUJBQUM7Q0FBQSxBQTVJRCxJQTRJQztBQTVJWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgV2ViU2VydmljZSB9IGZyb20gXCIuLi93cy5zZXJ2aWNlXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IHtMb2FkaW5nSW5kaWNhdG9yfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjsgXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xuLy9pbXBvcnQge01peHBhbmVsSGVscGVyfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1peHBhbmVsXCI7XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qIEJlZm9yZSB5b3UgY2FuIG5hdmlnYXRlIHRvIHRoaXMgcGFnZSBmcm9tIHlvdXIgYXBwLCB5b3UgbmVlZCB0byByZWZlcmVuY2UgdGhpcyBwYWdlJ3MgbW9kdWxlIGluIHRoZVxuKiBnbG9iYWwgYXBwIHJvdXRlciBtb2R1bGUuIEFkZCB0aGUgZm9sbG93aW5nIG9iamVjdCB0byB0aGUgZ2xvYmFsIGFycmF5IG9mIHJvdXRlczpcbiogeyBwYXRoOiBcImxvZ2luXCIsIGxvYWRDaGlsZHJlbjogXCIuL2xvZ2luL2xvZ2luLm1vZHVsZSNMb2dpbk1vZHVsZVwiIH1cbiogTm90ZSB0aGF0IHRoaXMgc2ltcGx5IHBvaW50cyB0aGUgcGF0aCB0byB0aGUgcGFnZSBtb2R1bGUgZmlsZS4gSWYgeW91IG1vdmUgdGhlIHBhZ2UsIHlvdSBuZWVkIHRvIHVwZGF0ZSB0aGUgcm91dGUgdG9vLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmxldCBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiTG9naW5cIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbG9naW4uY29tcG9uZW50Lmh0bWxcIixcbiAgICBwcm92aWRlcnM6IFtXZWJTZXJ2aWNlXVxufSlcblxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBjZWR1bGE6IHN0cmluZztcbiAgICAvL2NsYXZlOiBzdHJpbmc7IFxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIG15U2VydmljZTogV2ViU2VydmljZSxwcml2YXRlIHBhZ2U6IFBhZ2UpIHtcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBVc2UgdGhlIGNvbnN0cnVjdG9yIHRvIGluamVjdCBhcHAgc2VydmljZXMgdGhhdCB5b3UgbmVlZCBpbiB0aGlzIGNvbXBvbmVudC5cbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAgICAgaWYoQXBwbGljYXRpb25TZXR0aW5ncy5nZXRCb29sZWFuKFwiYXV0aGVudGljYXRlZFwiLCBmYWxzZSkpIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZVwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgICAgIC8vTWl4cGFuZWxIZWxwZXIudHJhY2soJ0VuTG9naW4nLCdPSycpO1xuICAgIH0gXG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBVc2UgdGhlIFwibmdPbkluaXRcIiBoYW5kbGVyIHRvIGluaXRpYWxpemUgZGF0YSBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgfVxuXG4gICAgb25Mb2dpbldpdGhTb2NpYWxQcm92aWRlckJ1dHRvblRhcCgpOiB2b2lkIHtcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBGb3IgbG9nIGluIHdpdGggc29jaWFsIHByb3ZpZGVyIHlvdSBjYW4gYWRkIHlvdXIgY3VzdG9tIGxvZ2ljIG9yXG4gICAgICAgICogdXNlIE5hdGl2ZVNjcmlwdCBwbHVnaW4gZm9yIGxvZyBpbiB3aXRoIEZhY2Vib29rXG4gICAgICAgICogaHR0cDovL21hcmtldC5uYXRpdmVzY3JpcHQub3JnL3BsdWdpbnMvbmF0aXZlc2NyaXB0LWZhY2Vib29rXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgfVxuXG4gICAgb25TaWduaW5CdXR0b25UYXAoKTogdm9pZCB7IFxuICAgICAgICBjb25zdCBjZWR1bGEgPSB0aGlzLmNlZHVsYTtcbiAgICAgICAgLy9jb25zdCBjbGF2ZSA9IHRoaXMuY2xhdmU7XG4gICAgICAgIGlmKGNlZHVsYSl7XG4gICAgICAgICAgICB0aGlzLmhhY2VyTG9naW4oY2VkdWxhLDApOyBcbiAgICAgICAgICAgIC8vTWl4cGFuZWxIZWxwZXIudHJhY2soJ0luaWNpYW5kb1Nlc2lvbicsJ09LJyk7ICAgXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiRXJyb3JcIixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkRlYmVzIGluZ3Jlc2FyIHR1IG7Dum1lcm8gZGUgY8OpZHVsYSBwYXJhIGluaWNpYXIgc2VzacOzblwiLFxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ09rISdcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgcHVibGljIG9uUmV0dXJuKGNlZHVsYSkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2VkdWxhIGluZ3Jlc2FkYTogJytjZWR1bGEpO1xuICAgICAgICB0aGlzLmNlZHVsYSA9IGNlZHVsYTtcblxuICAgICAgICBpZih0aGlzLmNlZHVsYSl7XG4gICAgICAgICAgICB0aGlzLmhhY2VyTG9naW4oY2VkdWxhLDApOyBcbiAgICAgICAgICAgIC8vTWl4cGFuZWxIZWxwZXIudHJhY2soJ0luaWNpYW5kb1Nlc2lvbicsJ09LJyk7ICAgXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiRXJyb3JcIixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkRlYmVzIGluZ3Jlc2FyIHR1IG7Dum1lcm8gZGUgY8OpZHVsYSBwYXJhIGluaWNpYXIgc2VzacOzblwiLFxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ09rISdcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYWNlckxvZ2luKHUsYykge1xuICAgICAgICBsb2FkZXIuc2hvdygpO1xuICAgICAgICB0aGlzLm15U2VydmljZS5nZXRMb2dpbih1LGMpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YVN1Y2Nlc3MocmVzdWx0KTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25HZXREYXRhU3VjY2VzcyhyZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZWwgbG9naW4nKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXMpKTsgXG4gICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgIGlmKHJlcy5yZXN1bHRhZG8gPT0gJ09LJyl7XG4gICAgICAgICAgICAvL01peHBhbmVsSGVscGVyLnRyYWNrKCdMb2dpbkV4aXRvc28nLCdPSycpO1xuICAgICAgICAgICAgLypkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJCaWVudmVuaWRvIVwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiSG9sYSBcIityZXMubm9tYnJlK1wiLCBiaWVudmVuaWRvIG51ZXZhbWVudGUgYSBWYW5nb1wiLFxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ0dyYWNpYXMhJ1xuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwibm9tYnJlVXN1YXJpb1wiLHJlcy5ub21icmUpO1xuICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiaWRVc3VhcmlvXCIscmVzLmlkcGFzYWplcm8pO1xuICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiZW1haWxVc3VhcmlvXCIscmVzLm1haWwpO1xuICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiaWRtZW1iZXJcIixyZXMuaWRtb2RpcGF5KTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lXCJdKTtcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pOyovXG4gICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIHRydWUpO1xuICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJub21icmVVc3VhcmlvXCIscmVzLm5vbWJyZSk7XG4gICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcImlkVXN1YXJpb1wiLHJlcy5pZHBhc2FqZXJvKTtcbiAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiZW1haWxVc3VhcmlvXCIscmVzLm1haWwpO1xuICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJpZG1lbWJlclwiLHJlcy5pZG1vZGlwYXkpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lXCJdKTtcbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfWVsc2V7IFxuICAgICAgICAgICAgLy9NaXhwYW5lbEhlbHBlci50cmFjaygnTG9naW5FcnJvbmVvJywnT0snKTtcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnRXJyb3IgZGUgYWNjZXNvJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkxvIHNlbnRpbW9zLCBodWJvIHVuIHByb2JsZW1hIGluZ3Jlc2FuZG8gY29uIHR1cyBkYXRvcy4gVmVyaWZpY2Fsb3MgZSBpbnRlbnRhIG51ZXZhbWVudGUuXCIsXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uR2V0RGF0YUVycm9yKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xuICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlIGVycm9yJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgdGl0bGU6ICdFcnJvciBkZSBjb25leGnDs24nLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJMbyBzZW50aW1vcywgaHVibyB1biBwcm9ibGVtYSBlbmNvbnRyYW5kbyBlbCBzZXJ2aWRvciwgdmVyaWZpY2EgdHUgY29uZXhpw7NuIGEgSW50ZXJuZXQgZSBpbnRlbnRhIG51ZXZhbWVudGUuXCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6ICdPaydcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgb25Gb3Jnb3RQYXNzd29yZFRhcCgpOiB2b2lkIHtcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBDYWxsIHlvdXIgRm9yZ290IFBhc3N3b3JkIGxvZ2ljIGhlcmUuXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgfVxufVxuIl19