"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//Drawer
var app = require("application");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var ws_service_1 = require("../ws.service");
var dialogs = require("ui/dialogs");
var ApplicationSettings = require("application-settings");
var platform_1 = require("platform");
var utils = require("utils/utils");
var application = require("application");
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var AyudaComponent = /** @class */ (function () {
    function AyudaComponent(myService) {
        this.myService = myService;
        this.idPasajero = ApplicationSettings.getString('idUsuario');
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }
    AyudaComponent.prototype.ngOnInit = function () {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    };
    AyudaComponent.prototype.onDrawerButtonTap = function () {
        var sideDrawer = app.getRootView();
        sideDrawer.showDrawer();
    };
    AyudaComponent.prototype.enviar = function () {
        var _this = this;
        var asunto = this.asunto;
        var mensaje = this.mensaje;
        var usuario = this.idPasajero;
        if (asunto && mensaje) {
            loader.show();
            this.myService.enviarMensaje(asunto, mensaje, usuario)
                .subscribe(function (result) {
                _this.onGetDataSuccess(result);
            }, function (error) {
                _this.onGetDataError(error);
            });
        }
    };
    AyudaComponent.prototype.onGetDataSuccess = function (res) {
        var _this = this;
        console.log('Respuesta del login');
        console.log(JSON.stringify(res));
        loader.hide();
        dialogs.alert({
            title: 'Mensaje enviado',
            message: "Gracias por contactarnos, nos comunicaremos contigo lo más pronto posible.",
            okButtonText: 'Ok'
        }).then(function () {
            console.log("Dialog closed!");
            _this.asunto = '';
            _this.mensaje = '';
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
    AyudaComponent.prototype.onGetDataError = function (error) {
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
    AyudaComponent = __decorate([
        core_1.Component({
            selector: "Ayuda",
            moduleId: module.id,
            templateUrl: "./ayuda.component.html"
        }),
        __metadata("design:paramtypes", [ws_service_1.WebService])
    ], AyudaComponent);
    return AyudaComponent;
}());
exports.AyudaComponent = AyudaComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXl1ZGEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXl1ZGEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELFFBQVE7QUFDUixpQ0FBbUM7QUFFbkMsaUZBQWdFO0FBQ2hFLDRDQUEyQztBQUMzQyxvQ0FBc0M7QUFDdEMsMERBQTREO0FBQzVELHFDQUE0QztBQUM1QyxtQ0FBcUM7QUFDckMseUNBQTJDO0FBUzNDLElBQUksTUFBTSxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztBQU1wQztJQUlJLHdCQUFvQixTQUFxQjtRQUFyQixjQUFTLEdBQVQsU0FBUyxDQUFZO1FBRGxDLGVBQVUsR0FBVyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFbkU7O3NFQUU4RDtJQUNsRSxDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUNJOztzRUFFOEQ7SUFDbEUsQ0FBQztJQUNELDBDQUFpQixHQUFqQjtRQUNJLElBQU0sVUFBVSxHQUFrQixHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEQsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFDTSwrQkFBTSxHQUFiO1FBQUEsaUJBYUM7UUFaRyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNCLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0IsSUFBTSxPQUFPLEdBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMvQixJQUFHLE1BQU0sSUFBSSxPQUFPLEVBQUM7WUFDakIsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLENBQUM7aUJBQy9DLFNBQVMsQ0FBQyxVQUFDLE1BQU07Z0JBQ2QsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xDLENBQUMsRUFBRSxVQUFDLEtBQUs7Z0JBQ0wsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FBQztTQUNWO0lBQ0wsQ0FBQztJQUNBLHlDQUFnQixHQUFoQixVQUFpQixHQUFHO1FBQXBCLGlCQWtDQTtRQWpDRyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFFbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDakMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUNWLEtBQUssRUFBRSxpQkFBaUI7WUFDeEIsT0FBTyxFQUFFLDRFQUE0RTtZQUNyRixZQUFZLEVBQUUsSUFBSTtTQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzlCLEtBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLEtBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2xCLElBQUksZ0JBQUssRUFBRTtnQkFDUCxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLGlCQUFpQixDQUFDO3FCQUMzRCxTQUFTO3FCQUNULFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN6QjtZQUNELElBQUksb0JBQVMsRUFBRTtnQkFDWCxJQUFNLGNBQWMsR0FBRyxXQUFXLENBQUMsT0FBTztxQkFDckMsa0JBQWtCO3FCQUNsQixrQkFBa0IsRUFBRTtxQkFDcEIsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2pDLElBQUksY0FBYyxFQUFFO29CQUNoQixLQUFLLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO2lCQUMzRTtxQkFBTTtvQkFDSCxLQUFLLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLENBQUM7aUJBQy9CO2FBQ0o7UUFFTCxDQUFDLENBQUMsQ0FBQztJQUlQLENBQUM7SUFFTyx1Q0FBYyxHQUF0QixVQUF1QixLQUFxQjtRQUN4QyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbkMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUNWLEtBQUssRUFBRSxtQkFBbUI7WUFDMUIsT0FBTyxFQUFFLDhHQUE4RztZQUN2SCxZQUFZLEVBQUUsSUFBSTtTQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRWxDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQWpGUSxjQUFjO1FBTDFCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsT0FBTztZQUNqQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtTQUN4QyxDQUFDO3lDQUtpQyx1QkFBVTtPQUpoQyxjQUFjLENBbUYxQjtJQUFELHFCQUFDO0NBQUEsQUFuRkQsSUFtRkM7QUFuRlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG4vL0RyYXdlclxuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJhcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiO1xuaW1wb3J0IHtMb2FkaW5nSW5kaWNhdG9yfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7XG5pbXBvcnQgeyBXZWJTZXJ2aWNlIH0gZnJvbSBcIi4uL3dzLnNlcnZpY2VcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgeyBpc0lPUywgaXNBbmRyb2lkIH0gZnJvbSBcInBsYXRmb3JtXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwidXRpbHMvdXRpbHNcIjtcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gXCJhcHBsaWNhdGlvblwiO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBCZWZvcmUgeW91IGNhbiBuYXZpZ2F0ZSB0byB0aGlzIHBhZ2UgZnJvbSB5b3VyIGFwcCwgeW91IG5lZWQgdG8gcmVmZXJlbmNlIHRoaXMgcGFnZSdzIG1vZHVsZSBpbiB0aGVcbiogZ2xvYmFsIGFwcCByb3V0ZXIgbW9kdWxlLiBBZGQgdGhlIGZvbGxvd2luZyBvYmplY3QgdG8gdGhlIGdsb2JhbCBhcnJheSBvZiByb3V0ZXM6XG4qIHsgcGF0aDogXCJheXVkYVwiLCBsb2FkQ2hpbGRyZW46IFwiLi9heXVkYS9heXVkYS5tb2R1bGUjQXl1ZGFNb2R1bGVcIiB9XG4qIE5vdGUgdGhhdCB0aGlzIHNpbXBseSBwb2ludHMgdGhlIHBhdGggdG8gdGhlIHBhZ2UgbW9kdWxlIGZpbGUuIElmIHlvdSBtb3ZlIHRoZSBwYWdlLCB5b3UgbmVlZCB0byB1cGRhdGUgdGhlIHJvdXRlIHRvby5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5kZWNsYXJlIHZhciBVSUFwcGxpY2F0aW9uLCBhbmRyb2lkO1xubGV0IGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJBeXVkYVwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9heXVkYS5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIEF5dWRhQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwdWJsaWMgYXN1bnRvOnN0cmluZztcbiAgICBwdWJsaWMgbWVuc2FqZTpzdHJpbmc7XG4gICAgcHVibGljIGlkUGFzYWplcm86IHN0cmluZyA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdpZFVzdWFyaW8nKTtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG15U2VydmljZTogV2ViU2VydmljZSkge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFVzZSB0aGUgY29uc3RydWN0b3IgdG8gaW5qZWN0IGFwcCBzZXJ2aWNlcyB0aGF0IHlvdSBuZWVkIGluIHRoaXMgY29tcG9uZW50LlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFVzZSB0aGUgXCJuZ09uSW5pdFwiIGhhbmRsZXIgdG8gaW5pdGlhbGl6ZSBkYXRhIGZvciB0aGlzIGNvbXBvbmVudC5cbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICB9XG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj5hcHAuZ2V0Um9vdFZpZXcoKTtcbiAgICAgICAgc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxuICAgIHB1YmxpYyBlbnZpYXIoKXtcbiAgICAgICAgY29uc3QgYXN1bnRvID0gdGhpcy5hc3VudG87XG4gICAgICAgIGNvbnN0IG1lbnNhamUgPSB0aGlzLm1lbnNhamU7XG4gICAgICAgIGNvbnN0IHVzdWFyaW89IHRoaXMuaWRQYXNhamVybztcbiAgICAgICAgaWYoYXN1bnRvICYmIG1lbnNhamUpe1xuICAgICAgICAgICAgbG9hZGVyLnNob3coKTtcbiAgICAgICAgICAgIHRoaXMubXlTZXJ2aWNlLmVudmlhck1lbnNhamUoYXN1bnRvLG1lbnNhamUsdXN1YXJpbylcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFTdWNjZXNzKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgICBvbkdldERhdGFTdWNjZXNzKHJlcykge1xuICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlbCBsb2dpbicpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlcykpOyBcbiAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICB0aXRsZTogJ01lbnNhamUgZW52aWFkbycsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkdyYWNpYXMgcG9yIGNvbnRhY3Rhcm5vcywgbm9zIGNvbXVuaWNhcmVtb3MgY29udGlnbyBsbyBtw6FzIHByb250byBwb3NpYmxlLlwiLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgIHRoaXMuYXN1bnRvID0gJyc7XG4gICAgICAgICAgICB0aGlzLm1lbnNhamUgPSAnJztcbiAgICAgICAgICAgIGlmIChpc0lPUykge1xuICAgICAgICAgICAgICAgIHV0aWxzLmlvcy5nZXR0ZXIoVUlBcHBsaWNhdGlvbiwgVUlBcHBsaWNhdGlvbi5zaGFyZWRBcHBsaWNhdGlvbilcbiAgICAgICAgICAgICAgICAgICAgLmtleVdpbmRvd1xuICAgICAgICAgICAgICAgICAgICAuZW5kRWRpdGluZyh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0FuZHJvaWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaWFsb2dGcmFnbWVudCA9IGFwcGxpY2F0aW9uLmFuZHJvaWRcbiAgICAgICAgICAgICAgICAgICAgLmZvcmVncm91bmRBY3Rpdml0eVxuICAgICAgICAgICAgICAgICAgICAuZ2V0RnJhZ21lbnRNYW5hZ2VyKClcbiAgICAgICAgICAgICAgICAgICAgLmZpbmRGcmFnbWVudEJ5VGFnKFwiZGlhbG9nXCIpO1xuICAgICAgICAgICAgICAgIGlmIChkaWFsb2dGcmFnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB1dGlscy5hZC5kaXNtaXNzU29mdElucHV0KGRpYWxvZ0ZyYWdtZW50LmdldERpYWxvZygpLmdldEN1cnJlbnRGb2N1cygpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB1dGlscy5hZC5kaXNtaXNzU29mdElucHV0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uR2V0RGF0YUVycm9yKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xuICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlIGVycm9yJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgdGl0bGU6ICdFcnJvciBkZSBjb25leGnDs24nLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJMbyBzZW50aW1vcywgaHVibyB1biBwcm9ibGVtYSBlbmNvbnRyYW5kbyBlbCBzZXJ2aWRvciwgdmVyaWZpY2EgdHUgY29uZXhpw7NuIGEgSW50ZXJuZXQgZSBpbnRlbnRhIG51ZXZhbWVudGUuXCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6ICdPaydcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIl19