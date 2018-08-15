"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//Drawer
var app = require("application");
//Action
var dialogs = require("ui/dialogs");
//Setting de la app (Variables almacenadas)
var ApplicationSettings = require("application-settings");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var ws_service_1 = require("../ws.service");
var platform_1 = require("platform");
var utils = require("utils/utils");
var application = require("application");
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var PerfilComponent = /** @class */ (function () {
    function PerfilComponent(myService) {
        this.myService = myService;
        this.emailUsuario = ApplicationSettings.getString('emailUsuario');
        this.nombreUsuario = ApplicationSettings.getString('nombreUsuario');
        this.idPasajero = ApplicationSettings.getString('idUsuario');
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }
    PerfilComponent.prototype.ngOnInit = function () {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    };
    PerfilComponent.prototype.onDrawerButtonTap = function () {
        var sideDrawer = app.getRootView();
        sideDrawer.showDrawer();
    };
    PerfilComponent.prototype.cambiarImagen = function () {
        dialogs.action({
            message: "Imagen de perfil",
            cancelButtonText: "Cancelar",
            actions: ["Tomar una foto", "Seleccionar de la galería"]
        }).then(function (result) {
            console.log("Dialog result: " + result);
            if (result == "Tomar una foto") {
                //Do action1
                alert('Tomar foto');
            }
            else if (result == "Seleccionar de la galería") {
                //Do action2
                alert('Seleccionar foto');
            }
        });
    };
    PerfilComponent.prototype.actualizar = function () {
        var _this = this;
        var nombre = this.nombreUsuario;
        var email = this.emailUsuario;
        var email2 = this.email2;
        var usuario = this.idPasajero;
        if (nombre && email) {
            if (email == email2) {
                loader.show();
                this.myService.actualizarDatos(nombre, email, usuario)
                    .subscribe(function (result) {
                    _this.onGetDataSuccess(result);
                    ApplicationSettings.setString('emailUsuario', email);
                    ApplicationSettings.setString('nombreUsuario', nombre);
                }, function (error) {
                    _this.onGetDataError(error);
                });
            }
            else {
                dialogs.alert({
                    title: 'Error en email',
                    message: "Lo sentimos, los correos electrónicos ingresados no coinciden",
                    okButtonText: 'Ok'
                }).then(function () {
                    console.log("Dialog closed!");
                });
            }
        }
        else {
            dialogs.alert({
                title: 'Datos obligatorios',
                message: "Lo sentimos, debes ingresar todos los datos",
                okButtonText: 'Ok'
            }).then(function () {
                console.log("Dialog closed!");
            });
        }
    };
    PerfilComponent.prototype.onGetDataSuccess = function (res) {
        console.log('Respuesta del login');
        console.log(JSON.stringify(res));
        loader.hide();
        dialogs.alert({
            title: 'Perfil actualizado',
            message: "Tu perfil ha sido actualizado exitosamente, gracias.",
            okButtonText: 'Ok'
        }).then(function () {
            console.log("Dialog closed!");
            if (platform_1.isIOS) {
                utils.ios.getter(UIApplication, UIApplication.sharedApplication)
                    .keyWindow
                    .endEditing(true);
            }
            if (platform_1.isAndroid) {
                var dialogFragment = application.android
                    .foregroundActivity
                    .getFragmentManager()
                    .findFragmentByTag("dialog");
                if (dialogFragment) {
                    utils.ad.dismissSoftInput(dialogFragment.getDialog().getCurrentFocus());
                }
                else {
                    utils.ad.dismissSoftInput();
                }
            }
        });
    };
    PerfilComponent.prototype.onGetDataError = function (error) {
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
    PerfilComponent = __decorate([
        core_1.Component({
            selector: "Perfil",
            moduleId: module.id,
            templateUrl: "./perfil.component.html"
        }),
        __metadata("design:paramtypes", [ws_service_1.WebService])
    ], PerfilComponent);
    return PerfilComponent;
}());
exports.PerfilComponent = PerfilComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyZmlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBlcmZpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsUUFBUTtBQUNSLGlDQUFtQztBQUVuQyxRQUFRO0FBQ1Isb0NBQXNDO0FBQ3RDLDJDQUEyQztBQUMzQywwREFBNEQ7QUFDNUQsaUZBQWdFO0FBQ2hFLDRDQUEyQztBQUMzQyxxQ0FBNEM7QUFDNUMsbUNBQXFDO0FBQ3JDLHlDQUEyQztBQVUzQyxJQUFJLE1BQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7QUFNcEM7SUFLSSx5QkFBb0IsU0FBcUI7UUFBckIsY0FBUyxHQUFULFNBQVMsQ0FBWTtRQUpsQyxpQkFBWSxHQUFHLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUU3RCxrQkFBYSxHQUFHLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMvRCxlQUFVLEdBQVcsbUJBQW1CLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRW5FOztzRUFFOEQ7SUFDbEUsQ0FBQztJQUVELGtDQUFRLEdBQVI7UUFDSTs7c0VBRThEO0lBQ2xFLENBQUM7SUFDRCwyQ0FBaUIsR0FBakI7UUFDSSxJQUFNLFVBQVUsR0FBa0IsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BELFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsdUNBQWEsR0FBYjtRQUNJLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDWCxPQUFPLEVBQUUsa0JBQWtCO1lBQzNCLGdCQUFnQixFQUFFLFVBQVU7WUFDNUIsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsMkJBQTJCLENBQUM7U0FDM0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLE1BQU0s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QUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUseUJBQXlCO1NBQ3pDLENBQUM7eUNBTWlDLHVCQUFVO09BTGhDLGVBQWUsQ0E0SDNCO0lBQUQsc0JBQUM7Q0FBQSxBQTVIRCxJQTRIQztBQTVIWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbi8vRHJhd2VyXG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyXCI7XG4vL0FjdGlvblxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuLy9TZXR0aW5nIGRlIGxhIGFwcCAoVmFyaWFibGVzIGFsbWFjZW5hZGFzKVxuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7TG9hZGluZ0luZGljYXRvcn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xuaW1wb3J0IHsgV2ViU2VydmljZSB9IGZyb20gXCIuLi93cy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBpc0lPUywgaXNBbmRyb2lkIH0gZnJvbSBcInBsYXRmb3JtXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwidXRpbHMvdXRpbHNcIjtcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gXCJhcHBsaWNhdGlvblwiO1xuXG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qIEJlZm9yZSB5b3UgY2FuIG5hdmlnYXRlIHRvIHRoaXMgcGFnZSBmcm9tIHlvdXIgYXBwLCB5b3UgbmVlZCB0byByZWZlcmVuY2UgdGhpcyBwYWdlJ3MgbW9kdWxlIGluIHRoZVxuKiBnbG9iYWwgYXBwIHJvdXRlciBtb2R1bGUuIEFkZCB0aGUgZm9sbG93aW5nIG9iamVjdCB0byB0aGUgZ2xvYmFsIGFycmF5IG9mIHJvdXRlczpcbiogeyBwYXRoOiBcInBlcmZpbFwiLCBsb2FkQ2hpbGRyZW46IFwiLi9wZXJmaWwvcGVyZmlsLm1vZHVsZSNQZXJmaWxNb2R1bGVcIiB9XG4qIE5vdGUgdGhhdCB0aGlzIHNpbXBseSBwb2ludHMgdGhlIHBhdGggdG8gdGhlIHBhZ2UgbW9kdWxlIGZpbGUuIElmIHlvdSBtb3ZlIHRoZSBwYWdlLCB5b3UgbmVlZCB0byB1cGRhdGUgdGhlIHJvdXRlIHRvby5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5kZWNsYXJlIHZhciBVSUFwcGxpY2F0aW9uLCBhbmRyb2lkO1xubGV0IGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJQZXJmaWxcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGVyZmlsLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgUGVyZmlsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwdWJsaWMgZW1haWxVc3VhcmlvID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ2VtYWlsVXN1YXJpbycpO1xuICAgIHB1YmxpYyBlbWFpbDI6c3RyaW5nO1xuICAgIHB1YmxpYyBub21icmVVc3VhcmlvID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ25vbWJyZVVzdWFyaW8nKTtcbiAgICBwdWJsaWMgaWRQYXNhamVybzogc3RyaW5nID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ2lkVXN1YXJpbycpO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbXlTZXJ2aWNlOiBXZWJTZXJ2aWNlKSB7XG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogVXNlIHRoZSBjb25zdHJ1Y3RvciB0byBpbmplY3QgYXBwIHNlcnZpY2VzIHRoYXQgeW91IG5lZWQgaW4gdGhpcyBjb21wb25lbnQuXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogVXNlIHRoZSBcIm5nT25Jbml0XCIgaGFuZGxlciB0byBpbml0aWFsaXplIGRhdGEgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIH1cbiAgICBvbkRyYXdlckJ1dHRvblRhcCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc2lkZURyYXdlciA9IDxSYWRTaWRlRHJhd2VyPmFwcC5nZXRSb290VmlldygpO1xuICAgICAgICBzaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcbiAgICB9XG5cbiAgICBjYW1iaWFySW1hZ2VuKCk6dm9pZHtcbiAgICAgICAgZGlhbG9ncy5hY3Rpb24oe1xuICAgICAgICAgICAgbWVzc2FnZTogXCJJbWFnZW4gZGUgcGVyZmlsXCIsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbGFyXCIsXG4gICAgICAgICAgICBhY3Rpb25zOiBbXCJUb21hciB1bmEgZm90b1wiLCBcIlNlbGVjY2lvbmFyIGRlIGxhIGdhbGVyw61hXCJdXG4gICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIHJlc3VsdDogXCIgKyByZXN1bHQpO1xuICAgICAgICAgICAgaWYocmVzdWx0ID09IFwiVG9tYXIgdW5hIGZvdG9cIil7XG4gICAgICAgICAgICAgICAgLy9EbyBhY3Rpb24xXG4gICAgICAgICAgICAgICAgYWxlcnQoJ1RvbWFyIGZvdG8nKTtcbiAgICAgICAgICAgIH1lbHNlIGlmKHJlc3VsdCA9PSBcIlNlbGVjY2lvbmFyIGRlIGxhIGdhbGVyw61hXCIpe1xuICAgICAgICAgICAgICAgIC8vRG8gYWN0aW9uMlxuICAgICAgICAgICAgICAgIGFsZXJ0KCdTZWxlY2Npb25hciBmb3RvJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhY3R1YWxpemFyKCk6dm9pZHtcbiAgICAgICAgY29uc3Qgbm9tYnJlID0gdGhpcy5ub21icmVVc3VhcmlvO1xuICAgICAgICBjb25zdCBlbWFpbCA9IHRoaXMuZW1haWxVc3VhcmlvO1xuICAgICAgICBjb25zdCBlbWFpbDIgPSB0aGlzLmVtYWlsMjtcbiAgICAgICAgY29uc3QgdXN1YXJpbz0gdGhpcy5pZFBhc2FqZXJvO1xuICAgICAgICBpZihub21icmUgJiYgZW1haWwpe1xuICAgICAgICAgICAgaWYoZW1haWwgPT0gZW1haWwyKXtcbiAgICAgICAgICAgICAgICBsb2FkZXIuc2hvdygpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5teVNlcnZpY2UuYWN0dWFsaXphckRhdG9zKG5vbWJyZSxlbWFpbCx1c3VhcmlvKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YVN1Y2Nlc3MocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoJ2VtYWlsVXN1YXJpbycsZW1haWwpO1xuICAgICAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZygnbm9tYnJlVXN1YXJpbycsbm9tYnJlKTtcbiAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdFcnJvciBlbiBlbWFpbCcsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiTG8gc2VudGltb3MsIGxvcyBjb3JyZW9zIGVsZWN0csOzbmljb3MgaW5ncmVzYWRvcyBubyBjb2luY2lkZW5cIixcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdEYXRvcyBvYmxpZ2F0b3Jpb3MnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiTG8gc2VudGltb3MsIGRlYmVzIGluZ3Jlc2FyIHRvZG9zIGxvcyBkYXRvc1wiLFxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ09rJ1xuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uR2V0RGF0YVN1Y2Nlc3MocmVzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGVsIGxvZ2luJyk7XG5cbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzKSk7IFxuICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiAnUGVyZmlsIGFjdHVhbGl6YWRvJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiVHUgcGVyZmlsIGhhIHNpZG8gYWN0dWFsaXphZG8gZXhpdG9zYW1lbnRlLCBncmFjaWFzLlwiLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGlzSU9TKSB7XG4gICAgICAgICAgICAgICAgdXRpbHMuaW9zLmdldHRlcihVSUFwcGxpY2F0aW9uLCBVSUFwcGxpY2F0aW9uLnNoYXJlZEFwcGxpY2F0aW9uKVxuICAgICAgICAgICAgICAgICAgICAua2V5V2luZG93XG4gICAgICAgICAgICAgICAgICAgIC5lbmRFZGl0aW5nKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzQW5kcm9pZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpYWxvZ0ZyYWdtZW50ID0gYXBwbGljYXRpb24uYW5kcm9pZFxuICAgICAgICAgICAgICAgICAgICAuZm9yZWdyb3VuZEFjdGl2aXR5XG4gICAgICAgICAgICAgICAgICAgIC5nZXRGcmFnbWVudE1hbmFnZXIoKVxuICAgICAgICAgICAgICAgICAgICAuZmluZEZyYWdtZW50QnlUYWcoXCJkaWFsb2dcIik7XG4gICAgICAgICAgICAgICAgaWYgKGRpYWxvZ0ZyYWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLmFkLmRpc21pc3NTb2Z0SW5wdXQoZGlhbG9nRnJhZ21lbnQuZ2V0RGlhbG9nKCkuZ2V0Q3VycmVudEZvY3VzKCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLmFkLmRpc21pc3NTb2Z0SW5wdXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBcblxuICAgIH1cblxuICAgIHByaXZhdGUgb25HZXREYXRhRXJyb3IoZXJyb3I6IFJlc3BvbnNlIHwgYW55KSB7XG4gICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGUgZXJyb3InKTtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICB0aXRsZTogJ0Vycm9yIGRlIGNvbmV4acOzbicsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkxvIHNlbnRpbW9zLCBodWJvIHVuIHByb2JsZW1hIGVuY29udHJhbmRvIGVsIHNlcnZpZG9yLCB2ZXJpZmljYSB0dSBjb25leGnDs24gYSBJbnRlcm5ldCBlIGludGVudGEgbnVldmFtZW50ZS5cIixcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ09rJ1xuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4iXX0=