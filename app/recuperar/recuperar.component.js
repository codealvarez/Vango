"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var ws_service_1 = require("../ws.service");
var dialogs = require("ui/dialogs");
var page_1 = require("ui/page");
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "recuperar", loadChildren: "./recuperar/recuperar.module#RecuperarModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var RecuperarComponent = /** @class */ (function () {
    function RecuperarComponent(myService, page) {
        this.myService = myService;
        this.page = page;
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
        this.page.actionBarHidden = true;
    }
    RecuperarComponent.prototype.ngOnInit = function () {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    };
    RecuperarComponent.prototype.onSigninButtonTap = function () {
        var cedula = this.cedula;
        if (cedula) {
            this.recuperarClave(cedula);
            //MixpanelHelper.track('IniciandoSesion','OK');   
        }
        else {
            dialogs.alert({
                title: "Error",
                message: "Debes ingresar tu número de cédula para recuperar tu contraseña",
                okButtonText: 'Ok!'
            }).then(function () {
            });
        }
    };
    RecuperarComponent.prototype.recuperarClave = function (u) {
        loader.show();
        this.myService.getClave(u)
            .subscribe(function (result) {
            loader.hide();
            if (result.resultado == 'OK') {
                dialogs.alert({
                    title: 'Mensaje enviado',
                    message: "Gracias, hemos enviado a tu cuenta de correo tu nueva contraseña.",
                    okButtonText: 'Ok'
                }).then(function () {
                    console.log("Dialog closed!");
                });
            }
            else {
                dialogs.alert({
                    title: 'Error de recuperación',
                    message: "Lo sentimos, hubo un problema encontrando tu usuario, verifica los datos e intenta nuevamente.",
                    okButtonText: 'Ok'
                }).then(function () {
                    console.log("Dialog closed!");
                });
            }
        }, function (error) {
            loader.hide();
            dialogs.alert({
                title: 'Error de conexión',
                message: "Lo sentimos, hubo un problema encontrando el servidor, verifica tu conexión a Internet e intenta nuevamente.",
                okButtonText: 'Ok'
            }).then(function () {
                console.log("Dialog closed!");
            });
        });
    };
    RecuperarComponent = __decorate([
        core_1.Component({
            selector: "Recuperar",
            moduleId: module.id,
            templateUrl: "./recuperar.component.html"
        }),
        __metadata("design:paramtypes", [ws_service_1.WebService, page_1.Page])
    ], RecuperarComponent);
    return RecuperarComponent;
}());
exports.RecuperarComponent = RecuperarComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdXBlcmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlY3VwZXJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsaUZBQWdFO0FBQ2hFLDRDQUEyQztBQUMzQyxvQ0FBc0M7QUFDdEMsZ0NBQStCO0FBQy9COzs7Ozs4REFLOEQ7QUFDOUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxpREFBZ0IsRUFBRSxDQUFDO0FBTXBDO0lBRUksNEJBQW9CLFNBQXFCLEVBQVMsSUFBVTtRQUF4QyxjQUFTLEdBQVQsU0FBUyxDQUFZO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUN4RDs7c0VBRThEO1FBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUNyQyxDQUFDO0lBQ0QscUNBQVEsR0FBUjtRQUNJOztzRUFFOEQ7SUFDbEUsQ0FBQztJQUNELDhDQUFpQixHQUFqQjtRQUNJLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDM0IsSUFBRyxNQUFNLEVBQUM7WUFDTixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLGtEQUFrRDtTQUNyRDthQUFJO1lBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDVixLQUFLLEVBQUUsT0FBTztnQkFDZCxPQUFPLEVBQUUsaUVBQWlFO2dCQUMxRSxZQUFZLEVBQUUsS0FBSzthQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ1IsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUVMLENBQUM7SUFFRCwyQ0FBYyxHQUFkLFVBQWUsQ0FBQztRQUNaLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzthQUNyQixTQUFTLENBQUMsVUFBQyxNQUFVO1lBQ2xCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNkLElBQUcsTUFBTSxDQUFDLFNBQVMsSUFBSSxJQUFJLEVBQUM7Z0JBQ3hCLE9BQU8sQ0FBQyxLQUFLLENBQUM7b0JBQ1YsS0FBSyxFQUFFLGlCQUFpQjtvQkFDeEIsT0FBTyxFQUFFLG1FQUFtRTtvQkFDNUUsWUFBWSxFQUFFLElBQUk7aUJBQ3JCLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUVsQyxDQUFDLENBQUMsQ0FBQzthQUNOO2lCQUFJO2dCQUNELE9BQU8sQ0FBQyxLQUFLLENBQUM7b0JBQ1YsS0FBSyxFQUFFLHVCQUF1QjtvQkFDOUIsT0FBTyxFQUFFLGdHQUFnRztvQkFDekcsWUFBWSxFQUFFLElBQUk7aUJBQ3JCLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUVsQyxDQUFDLENBQUMsQ0FBQzthQUNOO1FBQ0wsQ0FBQyxFQUFFLFVBQUMsS0FBSztZQUNMLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ1YsS0FBSyxFQUFFLG1CQUFtQjtnQkFDMUIsT0FBTyxFQUFFLDhHQUE4RztnQkFDdkgsWUFBWSxFQUFFLElBQUk7YUFDckIsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFbEMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFoRVEsa0JBQWtCO1FBTDlCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsV0FBVztZQUNyQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDRCQUE0QjtTQUM1QyxDQUFDO3lDQUdpQyx1QkFBVSxFQUFlLFdBQUk7T0FGbkQsa0JBQWtCLENBaUU5QjtJQUFELHlCQUFDO0NBQUEsQUFqRUQsSUFpRUM7QUFqRVksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtMb2FkaW5nSW5kaWNhdG9yfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7XG5pbXBvcnQgeyBXZWJTZXJ2aWNlIH0gZnJvbSBcIi4uL3dzLnNlcnZpY2VcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiogQmVmb3JlIHlvdSBjYW4gbmF2aWdhdGUgdG8gdGhpcyBwYWdlIGZyb20geW91ciBhcHAsIHlvdSBuZWVkIHRvIHJlZmVyZW5jZSB0aGlzIHBhZ2UncyBtb2R1bGUgaW4gdGhlXG4qIGdsb2JhbCBhcHAgcm91dGVyIG1vZHVsZS4gQWRkIHRoZSBmb2xsb3dpbmcgb2JqZWN0IHRvIHRoZSBnbG9iYWwgYXJyYXkgb2Ygcm91dGVzOlxuKiB7IHBhdGg6IFwicmVjdXBlcmFyXCIsIGxvYWRDaGlsZHJlbjogXCIuL3JlY3VwZXJhci9yZWN1cGVyYXIubW9kdWxlI1JlY3VwZXJhck1vZHVsZVwiIH1cbiogTm90ZSB0aGF0IHRoaXMgc2ltcGx5IHBvaW50cyB0aGUgcGF0aCB0byB0aGUgcGFnZSBtb2R1bGUgZmlsZS4gSWYgeW91IG1vdmUgdGhlIHBhZ2UsIHlvdSBuZWVkIHRvIHVwZGF0ZSB0aGUgcm91dGUgdG9vLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmxldCBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiUmVjdXBlcmFyXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3JlY3VwZXJhci5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIFJlY3VwZXJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgY2VkdWxhOiBzdHJpbmc7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBteVNlcnZpY2U6IFdlYlNlcnZpY2UscHJpdmF0ZSBwYWdlOiBQYWdlKSB7XG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogVXNlIHRoZSBjb25zdHJ1Y3RvciB0byBpbmplY3QgYXBwIHNlcnZpY2VzIHRoYXQgeW91IG5lZWQgaW4gdGhpcyBjb21wb25lbnQuXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgIH1cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBVc2UgdGhlIFwibmdPbkluaXRcIiBoYW5kbGVyIHRvIGluaXRpYWxpemUgZGF0YSBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgfVxuICAgIG9uU2lnbmluQnV0dG9uVGFwKCk6IHZvaWQgeyBcbiAgICAgICAgY29uc3QgY2VkdWxhID0gdGhpcy5jZWR1bGE7XG4gICAgICAgIGlmKGNlZHVsYSl7XG4gICAgICAgICAgICB0aGlzLnJlY3VwZXJhckNsYXZlKGNlZHVsYSk7IFxuICAgICAgICAgICAgLy9NaXhwYW5lbEhlbHBlci50cmFjaygnSW5pY2lhbmRvU2VzaW9uJywnT0snKTsgICBcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvclwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiRGViZXMgaW5ncmVzYXIgdHUgbsO6bWVybyBkZSBjw6lkdWxhIHBhcmEgcmVjdXBlcmFyIHR1IGNvbnRyYXNlw7FhXCIsXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2shJ1xuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICByZWN1cGVyYXJDbGF2ZSh1KSB7XG4gICAgICAgIGxvYWRlci5zaG93KCk7XG4gICAgICAgIHRoaXMubXlTZXJ2aWNlLmdldENsYXZlKHUpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQ6YW55KSA9PiB7XG4gICAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICBpZihyZXN1bHQucmVzdWx0YWRvID09ICdPSycpe1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnTWVuc2FqZSBlbnZpYWRvJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiR3JhY2lhcywgaGVtb3MgZW52aWFkbyBhIHR1IGN1ZW50YSBkZSBjb3JyZW8gdHUgbnVldmEgY29udHJhc2XDsWEuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6ICdPaydcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnRXJyb3IgZGUgcmVjdXBlcmFjacOzbicsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkxvIHNlbnRpbW9zLCBodWJvIHVuIHByb2JsZW1hIGVuY29udHJhbmRvIHR1IHVzdWFyaW8sIHZlcmlmaWNhIGxvcyBkYXRvcyBlIGludGVudGEgbnVldmFtZW50ZS5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ09rJ1xuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdFcnJvciBkZSBjb25leGnDs24nLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkxvIHNlbnRpbW9zLCBodWJvIHVuIHByb2JsZW1hIGVuY29udHJhbmRvIGVsIHNlcnZpZG9yLCB2ZXJpZmljYSB0dSBjb25leGnDs24gYSBJbnRlcm5ldCBlIGludGVudGEgbnVldmFtZW50ZS5cIixcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuIl19