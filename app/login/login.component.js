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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUE2RDtBQUM3RCw0Q0FBMkM7QUFDM0Msb0NBQXNDO0FBQ3RDLDBEQUE0RDtBQUM1RCxpRkFBZ0U7QUFDaEUsZ0NBQStCO0FBRS9CLHVEQUF1RDtBQUV2RDs7Ozs7OERBSzhEO0FBQzlELElBQUksTUFBTSxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztBQVFwQztJQUVJLGlCQUFpQjtJQUVqQix3QkFBb0IsZ0JBQWtDLEVBQVUsU0FBcUIsRUFBUyxJQUFVO1FBQXBGLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFZO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNwRzs7c0VBRThEO1FBQzlELEVBQUUsQ0FBQSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDakMsdUNBQXVDO0lBQzNDLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0k7O3NFQUU4RDtJQUVsRSxDQUFDO0lBRUQsMkRBQWtDLEdBQWxDO1FBQ0k7Ozs7c0VBSThEO0lBQ2xFLENBQUM7SUFFRCwwQ0FBaUIsR0FBakI7UUFDSSxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNCLDJCQUEyQjtRQUMzQixFQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFDO1lBQ1AsSUFBSSxDQUFDLFVBQVUs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QUFDO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUVsQyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7SUFHTCxDQUFDO0lBRU8sdUNBQWMsR0FBdEIsVUFBdUIsS0FBcUI7UUFDeEMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDVixLQUFLLEVBQUUsbUJBQW1CO1lBQzFCLE9BQU8sRUFBRSw4R0FBOEc7WUFDdkgsWUFBWSxFQUFFLElBQUk7U0FDckIsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUVsQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFHRCw0Q0FBbUIsR0FBbkI7UUFDSTs7c0VBRThEO0lBQ2xFLENBQUM7SUE1SVEsY0FBYztRQVAxQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE9BQU87WUFDakIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsU0FBUyxFQUFFLENBQUMsdUJBQVUsQ0FBQztTQUMxQixDQUFDO3lDQU13Qyx5QkFBZ0IsRUFBcUIsdUJBQVUsRUFBZSxXQUFJO09BSi9GLGNBQWMsQ0E2STFCO0lBQUQscUJBQUM7Q0FBQSxBQTdJRCxJQTZJQztBQTdJWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgV2ViU2VydmljZSB9IGZyb20gXCIuLi93cy5zZXJ2aWNlXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IHtMb2FkaW5nSW5kaWNhdG9yfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjsgXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xuLy9pbXBvcnQge01peHBhbmVsSGVscGVyfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1peHBhbmVsXCI7XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qIEJlZm9yZSB5b3UgY2FuIG5hdmlnYXRlIHRvIHRoaXMgcGFnZSBmcm9tIHlvdXIgYXBwLCB5b3UgbmVlZCB0byByZWZlcmVuY2UgdGhpcyBwYWdlJ3MgbW9kdWxlIGluIHRoZVxuKiBnbG9iYWwgYXBwIHJvdXRlciBtb2R1bGUuIEFkZCB0aGUgZm9sbG93aW5nIG9iamVjdCB0byB0aGUgZ2xvYmFsIGFycmF5IG9mIHJvdXRlczpcbiogeyBwYXRoOiBcImxvZ2luXCIsIGxvYWRDaGlsZHJlbjogXCIuL2xvZ2luL2xvZ2luLm1vZHVsZSNMb2dpbk1vZHVsZVwiIH1cbiogTm90ZSB0aGF0IHRoaXMgc2ltcGx5IHBvaW50cyB0aGUgcGF0aCB0byB0aGUgcGFnZSBtb2R1bGUgZmlsZS4gSWYgeW91IG1vdmUgdGhlIHBhZ2UsIHlvdSBuZWVkIHRvIHVwZGF0ZSB0aGUgcm91dGUgdG9vLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmxldCBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiTG9naW5cIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbG9naW4uY29tcG9uZW50Lmh0bWxcIixcbiAgICBwcm92aWRlcnM6IFtXZWJTZXJ2aWNlXVxufSlcblxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBjZWR1bGE6IHN0cmluZztcbiAgICAvL2NsYXZlOiBzdHJpbmc7IFxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIG15U2VydmljZTogV2ViU2VydmljZSxwcml2YXRlIHBhZ2U6IFBhZ2UpIHtcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBVc2UgdGhlIGNvbnN0cnVjdG9yIHRvIGluamVjdCBhcHAgc2VydmljZXMgdGhhdCB5b3UgbmVlZCBpbiB0aGlzIGNvbXBvbmVudC5cbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAgICAgaWYoQXBwbGljYXRpb25TZXR0aW5ncy5nZXRCb29sZWFuKFwiYXV0aGVudGljYXRlZFwiLCBmYWxzZSkpIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZVwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgICAgIC8vTWl4cGFuZWxIZWxwZXIudHJhY2soJ0VuTG9naW4nLCdPSycpO1xuICAgIH0gXG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBVc2UgdGhlIFwibmdPbkluaXRcIiBoYW5kbGVyIHRvIGluaXRpYWxpemUgZGF0YSBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgICAgIFxuICAgIH1cblxuICAgIG9uTG9naW5XaXRoU29jaWFsUHJvdmlkZXJCdXR0b25UYXAoKTogdm9pZCB7XG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogRm9yIGxvZyBpbiB3aXRoIHNvY2lhbCBwcm92aWRlciB5b3UgY2FuIGFkZCB5b3VyIGN1c3RvbSBsb2dpYyBvclxuICAgICAgICAqIHVzZSBOYXRpdmVTY3JpcHQgcGx1Z2luIGZvciBsb2cgaW4gd2l0aCBGYWNlYm9va1xuICAgICAgICAqIGh0dHA6Ly9tYXJrZXQubmF0aXZlc2NyaXB0Lm9yZy9wbHVnaW5zL25hdGl2ZXNjcmlwdC1mYWNlYm9va1xuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIH1cblxuICAgIG9uU2lnbmluQnV0dG9uVGFwKCk6IHZvaWQgeyBcbiAgICAgICAgY29uc3QgY2VkdWxhID0gdGhpcy5jZWR1bGE7XG4gICAgICAgIC8vY29uc3QgY2xhdmUgPSB0aGlzLmNsYXZlO1xuICAgICAgICBpZihjZWR1bGEpe1xuICAgICAgICAgICAgdGhpcy5oYWNlckxvZ2luKGNlZHVsYSwwKTsgXG4gICAgICAgICAgICAvL01peHBhbmVsSGVscGVyLnRyYWNrKCdJbmljaWFuZG9TZXNpb24nLCdPSycpOyAgIFxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIkVycm9yXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJEZWJlcyBpbmdyZXNhciB0dSBuw7ptZXJvIGRlIGPDqWR1bGEgcGFyYSBpbmljaWFyIHNlc2nDs25cIixcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6ICdPayEnXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIHB1YmxpYyBvblJldHVybihjZWR1bGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NlZHVsYSBpbmdyZXNhZGE6ICcrY2VkdWxhKTtcbiAgICAgICAgdGhpcy5jZWR1bGEgPSBjZWR1bGE7XG5cbiAgICAgICAgaWYodGhpcy5jZWR1bGEpe1xuICAgICAgICAgICAgdGhpcy5oYWNlckxvZ2luKGNlZHVsYSwwKTsgXG4gICAgICAgICAgICAvL01peHBhbmVsSGVscGVyLnRyYWNrKCdJbmljaWFuZG9TZXNpb24nLCdPSycpOyAgIFxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIkVycm9yXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJEZWJlcyBpbmdyZXNhciB0dSBuw7ptZXJvIGRlIGPDqWR1bGEgcGFyYSBpbmljaWFyIHNlc2nDs25cIixcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6ICdPayEnXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFjZXJMb2dpbih1LGMpIHtcbiAgICAgICAgbG9hZGVyLnNob3coKTtcbiAgICAgICAgdGhpcy5teVNlcnZpY2UuZ2V0TG9naW4odSxjKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFTdWNjZXNzKHJlc3VsdCk7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uR2V0RGF0YVN1Y2Nlc3MocmVzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGVsIGxvZ2luJyk7XG5cbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzKSk7IFxuICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICBpZihyZXMucmVzdWx0YWRvID09ICdPSycpe1xuICAgICAgICAgICAgLy9NaXhwYW5lbEhlbHBlci50cmFjaygnTG9naW5FeGl0b3NvJywnT0snKTtcbiAgICAgICAgICAgIC8qZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiQmllbnZlbmlkbyFcIixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkhvbGEgXCIrcmVzLm5vbWJyZStcIiwgYmllbnZlbmlkbyBudWV2YW1lbnRlIGEgVmFuZ29cIixcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6ICdHcmFjaWFzISdcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRCb29sZWFuKFwiYXV0aGVudGljYXRlZFwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcIm5vbWJyZVVzdWFyaW9cIixyZXMubm9tYnJlKTtcbiAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcImlkVXN1YXJpb1wiLHJlcy5pZHBhc2FqZXJvKTtcbiAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcImVtYWlsVXN1YXJpb1wiLHJlcy5tYWlsKTtcbiAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcImlkbWVtYmVyXCIscmVzLmlkbW9kaXBheSk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZVwiXSk7XG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTsqL1xuICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRCb29sZWFuKFwiYXV0aGVudGljYXRlZFwiLCB0cnVlKTtcbiAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwibm9tYnJlVXN1YXJpb1wiLHJlcy5ub21icmUpO1xuICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJpZFVzdWFyaW9cIixyZXMuaWRwYXNhamVybyk7XG4gICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcImVtYWlsVXN1YXJpb1wiLHJlcy5tYWlsKTtcbiAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiaWRtZW1iZXJcIixyZXMuaWRtb2RpcGF5KTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZVwiXSk7XG4gICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICAgICAgXG4gICAgICAgIH1lbHNleyBcbiAgICAgICAgICAgIC8vTWl4cGFuZWxIZWxwZXIudHJhY2soJ0xvZ2luRXJyb25lbycsJ09LJyk7XG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0Vycm9yIGRlIGFjY2VzbycsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJMbyBzZW50aW1vcywgaHVibyB1biBwcm9ibGVtYSBpbmdyZXNhbmRvIGNvbiB0dXMgZGF0b3MuIFZlcmlmaWNhbG9zIGUgaW50ZW50YSBudWV2YW1lbnRlLlwiLFxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ09rJ1xuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkdldERhdGFFcnJvcihlcnJvcjogUmVzcG9uc2UgfCBhbnkpIHtcbiAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZSBlcnJvcicpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiAnRXJyb3IgZGUgY29uZXhpw7NuJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiTG8gc2VudGltb3MsIGh1Ym8gdW4gcHJvYmxlbWEgZW5jb250cmFuZG8gZWwgc2Vydmlkb3IsIHZlcmlmaWNhIHR1IGNvbmV4acOzbiBhIEludGVybmV0IGUgaW50ZW50YSBudWV2YW1lbnRlLlwiLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIG9uRm9yZ290UGFzc3dvcmRUYXAoKTogdm9pZCB7XG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogQ2FsbCB5b3VyIEZvcmdvdCBQYXNzd29yZCBsb2dpYyBoZXJlLlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIH1cbn1cbiJdfQ==