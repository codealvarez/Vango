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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyZmlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBlcmZpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsUUFBUTtBQUNSLGlDQUFtQztBQUVuQyxRQUFRO0FBQ1Isb0NBQXNDO0FBQ3RDLDJDQUEyQztBQUMzQywwREFBNEQ7QUFDNUQsaUZBQWdFO0FBQ2hFLDRDQUEyQztBQUMzQyxxQ0FBNEM7QUFDNUMsbUNBQXFDO0FBQ3JDLHlDQUEyQztBQVUzQyxJQUFJLE1BQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7QUFNcEM7SUFLSSx5QkFBb0IsU0FBcUI7UUFBckIsY0FBUyxHQUFULFNBQVMsQ0FBWTtRQUpsQyxpQkFBWSxHQUFHLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUU3RCxrQkFBYSxHQUFHLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMvRCxlQUFVLEdBQVcsbUJBQW1CLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRW5FOztzRUFFOEQ7SUFDbEUsQ0FBQztJQUVELGtDQUFRLEdBQVI7UUFDSTs7c0VBRThEO0lBQ2xFLENBQUM7SUFDRCwyQ0FBaUIsR0FBakI7UUFDSSxJQUFNLFVBQVUsR0FBa0IsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BELFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsdUNBQWEsR0FBYjtRQUNJLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDWCxPQUFPLEVBQUUsa0JBQWtCO1lBQzNCLGdCQUFnQixFQUFFLFVBQVU7WUFDNUIsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsMkJBQTJCLENBQUM7U0FDM0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxDQUFDO1lBQ3hDLElBQUcsTUFBTSxJQUFJLGdCQUFnQixFQUFDO2dCQUMxQixZQUFZO2dCQUNaLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUN2QjtpQkFBSyxJQUFHLE1BQU0sSUFBSSwyQkFBMkIsRUFBQztnQkFDM0MsWUFBWTtnQkFDWixLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQzthQUM3QjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELG9DQUFVLEdBQVY7UUFBQSxpQkFzQ0M7UUFyQ0csSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUNsQyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ2hDLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDM0IsSUFBTSxPQUFPLEdBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMvQixJQUFHLE1BQU0sSUFBSSxLQUFLLEVBQUM7WUFDZixJQUFHLEtBQUssSUFBSSxNQUFNLEVBQUM7Z0JBQ2YsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUVkLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsT0FBTyxDQUFDO3FCQUNuRCxTQUFTLENBQUMsVUFBQyxNQUFNO29CQUNkLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDOUIsbUJBQW1CLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBQyxLQUFLLENBQUMsQ0FBQztvQkFDcEQsbUJBQW1CLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBQyxNQUFNLENBQUMsQ0FBQztnQkFDMUQsQ0FBQyxFQUFFLFVBQUMsS0FBSztvQkFDTCxLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMvQixDQUFDLENBQUMsQ0FBQzthQUNOO2lCQUFJO2dCQUNELE9BQU8sQ0FBQyxLQUFLLENBQUM7b0JBQ1YsS0FBSyxFQUFFLGdCQUFnQjtvQkFDdkIsT0FBTyxFQUFFLCtEQUErRDtvQkFDeEUsWUFBWSxFQUFFLElBQUk7aUJBQ3JCLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUVsQyxDQUFDLENBQUMsQ0FBQzthQUNOO1NBRUo7YUFBSTtZQUNELE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ1YsS0FBSyxFQUFFLG9CQUFvQjtnQkFDM0IsT0FBTyxFQUFFLDZDQUE2QztnQkFDdEQsWUFBWSxFQUFFLElBQUk7YUFDckIsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFbEMsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFDRCwwQ0FBZ0IsR0FBaEIsVUFBaUIsR0FBRztRQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFFbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDakMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUNWLEtBQUssRUFBRSxvQkFBb0I7WUFDM0IsT0FBTyxFQUFFLHNEQUFzRDtZQUMvRCxZQUFZLEVBQUUsSUFBSTtTQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRTlCLElBQUksZ0JBQUssRUFBRTtnQkFDUCxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLGlCQUFpQixDQUFDO3FCQUMzRCxTQUFTO3FCQUNULFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN6QjtZQUNELElBQUksb0JBQVMsRUFBRTtnQkFDWCxJQUFNLGNBQWMsR0FBRyxXQUFXLENBQUMsT0FBTztxQkFDckMsa0JBQWtCO3FCQUNsQixrQkFBa0IsRUFBRTtxQkFDcEIsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2pDLElBQUksY0FBYyxFQUFFO29CQUNoQixLQUFLLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO2lCQUMzRTtxQkFBTTtvQkFDSCxLQUFLLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLENBQUM7aUJBQy9CO2FBQ0o7UUFFTCxDQUFDLENBQUMsQ0FBQztJQUlQLENBQUM7SUFFTyx3Q0FBYyxHQUF0QixVQUF1QixLQUFxQjtRQUN4QyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbkMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUNWLEtBQUssRUFBRSxtQkFBbUI7WUFDMUIsT0FBTyxFQUFFLDhHQUE4RztZQUN2SCxZQUFZLEVBQUUsSUFBSTtTQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRWxDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQTNIUSxlQUFlO1FBTDNCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsUUFBUTtZQUNsQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHlCQUF5QjtTQUN6QyxDQUFDO3lDQU1pQyx1QkFBVTtPQUxoQyxlQUFlLENBNEgzQjtJQUFELHNCQUFDO0NBQUEsQUE1SEQsSUE0SEM7QUE1SFksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG4vL0RyYXdlclxuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJhcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiO1xuLy9BY3Rpb25cbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbi8vU2V0dGluZyBkZSBsYSBhcHAgKFZhcmlhYmxlcyBhbG1hY2VuYWRhcylcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQge0xvYWRpbmdJbmRpY2F0b3J9IGZyb20gXCJuYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3JcIjtcbmltcG9ydCB7IFdlYlNlcnZpY2UgfSBmcm9tIFwiLi4vd3Muc2VydmljZVwiO1xuaW1wb3J0IHsgaXNJT1MsIGlzQW5kcm9pZCB9IGZyb20gXCJwbGF0Zm9ybVwiO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcInV0aWxzL3V0aWxzXCI7XG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tIFwiYXBwbGljYXRpb25cIjtcblxuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBCZWZvcmUgeW91IGNhbiBuYXZpZ2F0ZSB0byB0aGlzIHBhZ2UgZnJvbSB5b3VyIGFwcCwgeW91IG5lZWQgdG8gcmVmZXJlbmNlIHRoaXMgcGFnZSdzIG1vZHVsZSBpbiB0aGVcbiogZ2xvYmFsIGFwcCByb3V0ZXIgbW9kdWxlLiBBZGQgdGhlIGZvbGxvd2luZyBvYmplY3QgdG8gdGhlIGdsb2JhbCBhcnJheSBvZiByb3V0ZXM6XG4qIHsgcGF0aDogXCJwZXJmaWxcIiwgbG9hZENoaWxkcmVuOiBcIi4vcGVyZmlsL3BlcmZpbC5tb2R1bGUjUGVyZmlsTW9kdWxlXCIgfVxuKiBOb3RlIHRoYXQgdGhpcyBzaW1wbHkgcG9pbnRzIHRoZSBwYXRoIHRvIHRoZSBwYWdlIG1vZHVsZSBmaWxlLiBJZiB5b3UgbW92ZSB0aGUgcGFnZSwgeW91IG5lZWQgdG8gdXBkYXRlIHRoZSByb3V0ZSB0b28uXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZGVjbGFyZSB2YXIgVUlBcHBsaWNhdGlvbiwgYW5kcm9pZDtcbmxldCBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiUGVyZmlsXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3BlcmZpbC5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIFBlcmZpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHVibGljIGVtYWlsVXN1YXJpbyA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdlbWFpbFVzdWFyaW8nKTtcbiAgICBwdWJsaWMgZW1haWwyOnN0cmluZztcbiAgICBwdWJsaWMgbm9tYnJlVXN1YXJpbyA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdub21icmVVc3VhcmlvJyk7XG4gICAgcHVibGljIGlkUGFzYWplcm86IHN0cmluZyA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdpZFVzdWFyaW8nKTtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG15U2VydmljZTogV2ViU2VydmljZSkge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFVzZSB0aGUgY29uc3RydWN0b3IgdG8gaW5qZWN0IGFwcCBzZXJ2aWNlcyB0aGF0IHlvdSBuZWVkIGluIHRoaXMgY29tcG9uZW50LlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFVzZSB0aGUgXCJuZ09uSW5pdFwiIGhhbmRsZXIgdG8gaW5pdGlhbGl6ZSBkYXRhIGZvciB0aGlzIGNvbXBvbmVudC5cbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICB9XG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj5hcHAuZ2V0Um9vdFZpZXcoKTtcbiAgICAgICAgc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxuXG4gICAgY2FtYmlhckltYWdlbigpOnZvaWR7XG4gICAgICAgIGRpYWxvZ3MuYWN0aW9uKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiSW1hZ2VuIGRlIHBlcmZpbFwiLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxhclwiLFxuICAgICAgICAgICAgYWN0aW9uczogW1wiVG9tYXIgdW5hIGZvdG9cIiwgXCJTZWxlY2Npb25hciBkZSBsYSBnYWxlcsOtYVwiXVxuICAgICAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyByZXN1bHQ6IFwiICsgcmVzdWx0KTtcbiAgICAgICAgICAgIGlmKHJlc3VsdCA9PSBcIlRvbWFyIHVuYSBmb3RvXCIpe1xuICAgICAgICAgICAgICAgIC8vRG8gYWN0aW9uMVxuICAgICAgICAgICAgICAgIGFsZXJ0KCdUb21hciBmb3RvJyk7XG4gICAgICAgICAgICB9ZWxzZSBpZihyZXN1bHQgPT0gXCJTZWxlY2Npb25hciBkZSBsYSBnYWxlcsOtYVwiKXtcbiAgICAgICAgICAgICAgICAvL0RvIGFjdGlvbjJcbiAgICAgICAgICAgICAgICBhbGVydCgnU2VsZWNjaW9uYXIgZm90bycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgYWN0dWFsaXphcigpOnZvaWR7XG4gICAgICAgIGNvbnN0IG5vbWJyZSA9IHRoaXMubm9tYnJlVXN1YXJpbztcbiAgICAgICAgY29uc3QgZW1haWwgPSB0aGlzLmVtYWlsVXN1YXJpbztcbiAgICAgICAgY29uc3QgZW1haWwyID0gdGhpcy5lbWFpbDI7XG4gICAgICAgIGNvbnN0IHVzdWFyaW89IHRoaXMuaWRQYXNhamVybztcbiAgICAgICAgaWYobm9tYnJlICYmIGVtYWlsKXtcbiAgICAgICAgICAgIGlmKGVtYWlsID09IGVtYWlsMil7XG4gICAgICAgICAgICAgICAgbG9hZGVyLnNob3coKTtcblxuICAgICAgICAgICAgICAgIHRoaXMubXlTZXJ2aWNlLmFjdHVhbGl6YXJEYXRvcyhub21icmUsZW1haWwsdXN1YXJpbylcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFTdWNjZXNzKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKCdlbWFpbFVzdWFyaW8nLGVtYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoJ25vbWJyZVVzdWFyaW8nLG5vbWJyZSk7XG4gICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnRXJyb3IgZW4gZW1haWwnLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkxvIHNlbnRpbW9zLCBsb3MgY29ycmVvcyBlbGVjdHLDs25pY29zIGluZ3Jlc2Fkb3Mgbm8gY29pbmNpZGVuXCIsXG4gICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ09rJ1xuICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnRGF0b3Mgb2JsaWdhdG9yaW9zJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkxvIHNlbnRpbW9zLCBkZWJlcyBpbmdyZXNhciB0b2RvcyBsb3MgZGF0b3NcIixcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6ICdPaydcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkdldERhdGFTdWNjZXNzKHJlcykge1xuICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlbCBsb2dpbicpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlcykpOyBcbiAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICB0aXRsZTogJ1BlcmZpbCBhY3R1YWxpemFkbycsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIlR1IHBlcmZpbCBoYSBzaWRvIGFjdHVhbGl6YWRvIGV4aXRvc2FtZW50ZSwgZ3JhY2lhcy5cIixcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ09rJ1xuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChpc0lPUykge1xuICAgICAgICAgICAgICAgIHV0aWxzLmlvcy5nZXR0ZXIoVUlBcHBsaWNhdGlvbiwgVUlBcHBsaWNhdGlvbi5zaGFyZWRBcHBsaWNhdGlvbilcbiAgICAgICAgICAgICAgICAgICAgLmtleVdpbmRvd1xuICAgICAgICAgICAgICAgICAgICAuZW5kRWRpdGluZyh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0FuZHJvaWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaWFsb2dGcmFnbWVudCA9IGFwcGxpY2F0aW9uLmFuZHJvaWRcbiAgICAgICAgICAgICAgICAgICAgLmZvcmVncm91bmRBY3Rpdml0eVxuICAgICAgICAgICAgICAgICAgICAuZ2V0RnJhZ21lbnRNYW5hZ2VyKClcbiAgICAgICAgICAgICAgICAgICAgLmZpbmRGcmFnbWVudEJ5VGFnKFwiZGlhbG9nXCIpO1xuICAgICAgICAgICAgICAgIGlmIChkaWFsb2dGcmFnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB1dGlscy5hZC5kaXNtaXNzU29mdElucHV0KGRpYWxvZ0ZyYWdtZW50LmdldERpYWxvZygpLmdldEN1cnJlbnRGb2N1cygpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB1dGlscy5hZC5kaXNtaXNzU29mdElucHV0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uR2V0RGF0YUVycm9yKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xuICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlIGVycm9yJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgdGl0bGU6ICdFcnJvciBkZSBjb25leGnDs24nLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJMbyBzZW50aW1vcywgaHVibyB1biBwcm9ibGVtYSBlbmNvbnRyYW5kbyBlbCBzZXJ2aWRvciwgdmVyaWZpY2EgdHUgY29uZXhpw7NuIGEgSW50ZXJuZXQgZSBpbnRlbnRhIG51ZXZhbWVudGUuXCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6ICdPaydcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuIl19