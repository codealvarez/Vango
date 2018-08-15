"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app = require("application");
var router_1 = require("nativescript-angular/router");
var nativescript_ui_sidedrawer_1 = require("nativescript-ui-sidedrawer");
var ApplicationSettings = require("application-settings");
var dialogs = require("ui/dialogs");
var utilidades = require("utils/utils");
var firebase = require("nativescript-plugin-firebase");
var AppComponent = /** @class */ (function () {
    function AppComponent(routerExtensions) {
        this.routerExtensions = routerExtensions;
        // Use the component constructor to inject services.
        this.emailUsuario = ApplicationSettings.getString('emailUsuario');
        this.nombreUsuario = ApplicationSettings.getString('nombreUsuario');
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._selectedPage = "Home";
        this._sideDrawerTransition = new nativescript_ui_sidedrawer_1.SlideInOnTopTransition();
        firebase.init({
            // Optionally pass in properties for database, authentication and cloud messaging,
            // see their respective docs.
            onMessageReceivedCallback: function (message) {
                console.log('PUSH recibida');
                console.log(JSON.stringify(message));
                dialogs.action({
                    //title: message.data.titulo,
                    message: 'El contuctor de tu viaje ha cambiado el estado a: ' + message.data.text,
                    //message:'Tienes una notificación',
                    cancelButtonText: "Cancelar",
                    actions: ["Ver viaje"]
                }).then(function (result) {
                    console.log("Dialog closed!");
                    if (result != 'Cancelar') {
                        _this.routerExtensions.navigate(["/viaje/" + message.data.idRuta + "/" + message.data.idViaje + "/" + message.data.placa + "/" + message.data.idConductor]);
                    }
                });
            }
        }).then(function (instance) {
            console.log("firebase.init done");
        }, function (error) {
            console.log("firebase.init error: ${error}");
        });
    };
    Object.defineProperty(AppComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.abrirPagina = function () {
        utilidades.openUrl('https://secomparte.smart4.com.co/');
    };
    AppComponent.prototype.isPageSelected = function (pageTitle) {
        return pageTitle === this._selectedPage;
    };
    AppComponent.prototype.onNavItemTap = function (navItemRoute) {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });
        var sideDrawer = app.getRootView();
        sideDrawer.closeDrawer();
    };
    AppComponent.prototype.cerrarDrawer = function () {
        var sideDrawer = app.getRootView();
        sideDrawer.closeDrawer();
    };
    AppComponent.prototype.salir = function () {
        var _this = this;
        dialogs.confirm({
            title: "Salir",
            message: "¿Realmente deseas cerrar tu sesión?",
            okButtonText: "Salir",
            cancelButtonText: "Cancelar"
        }).then(function (result) {
            // result argument is boolean
            if (result) {
                var sideDrawer = app.getRootView();
                sideDrawer.closeDrawer();
                ApplicationSettings.setBoolean("authenticated", false);
                ApplicationSettings.remove("nombreUsuario");
                ApplicationSettings.remove("idUsuario");
                ApplicationSettings.remove("emailUsuario");
                ApplicationSettings.remove("idmember");
                _this.routerExtensions.navigate(["/login"]);
            }
            console.log("Dialog result: " + result);
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "ns-app",
            templateUrl: "app.component.html"
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNkQ7QUFDN0QsaUNBQW1DO0FBQ25DLHNEQUErRDtBQUMvRCx5RUFBeUc7QUFDekcsMERBQTREO0FBQzVELG9DQUFzQztBQUN0Qyx3Q0FBMEM7QUFDMUMsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFPekQ7SUFNSSxzQkFBb0IsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEQsb0RBQW9EO1FBQ3BELElBQUksQ0FBQyxZQUFZLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxhQUFhLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCwrQkFBUSxHQUFSO1FBQUEsaUJBOEJDO1FBN0JHLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1FBQzVCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLG1EQUFzQixFQUFFLENBQUM7UUFFMUQsUUFBUSxDQUFDLElBQUksQ0FBQztZQUNWLGtGQUFrRjtZQUNsRiw2QkFBNkI7WUFDN0IseUJBQXlCLEVBQUUsVUFBQyxPQUFZO2dCQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDckMsT0FBTyxDQUFDLE1BQU0sQ0FBQztvQkFDVCw2QkFBNkI7b0JBQzdCLE9BQU8sRUFBRSxvREFBb0QsR0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUk7b0JBQy9FLG9DQUFvQztvQkFDcEMsZ0JBQWdCLEVBQUUsVUFBVTtvQkFDNUIsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDO2lCQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtvQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7b0JBQzlCLEVBQUUsQ0FBQSxDQUFDLE1BQU0sSUFBSSxVQUFVLENBQUMsQ0FBQSxDQUFDO3dCQUNyQixLQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxHQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLEdBQUcsR0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxHQUFHLEdBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsR0FBRyxHQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDakosQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUVQLENBQUM7U0FFSixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUTtZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN0QyxDQUFDLEVBQUMsVUFBQSxLQUFLO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHNCQUFJLDhDQUFvQjthQUF4QjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFFRCxrQ0FBVyxHQUFYO1FBQ0ksVUFBVSxDQUFDLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxxQ0FBYyxHQUFkLFVBQWUsU0FBaUI7UUFDNUIsTUFBTSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVDLENBQUM7SUFFRCxtQ0FBWSxHQUFaLFVBQWEsWUFBb0I7UUFDN0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzNDLFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsTUFBTTthQUNmO1NBQ0osQ0FBQyxDQUFDO1FBRUgsSUFBTSxVQUFVLEdBQWtCLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwRCxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUNELG1DQUFZLEdBQVo7UUFDSSxJQUFNLFVBQVUsR0FBa0IsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BELFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBQ0QsNEJBQUssR0FBTDtRQUFBLGlCQXVCQztRQXRCRyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQ1osS0FBSyxFQUFFLE9BQU87WUFDZCxPQUFPLEVBQUUscUNBQXFDO1lBQzlDLFlBQVksRUFBRSxPQUFPO1lBQ3JCLGdCQUFnQixFQUFFLFVBQVU7U0FDL0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDViw2QkFBNkI7WUFDN0IsRUFBRSxDQUFBLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQztnQkFDUCxJQUFNLFVBQVUsR0FBa0IsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNwRCxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3pCLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZELG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDNUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN4QyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzNDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFFdkMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDL0MsQ0FBQztZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLENBQUM7UUFFNUMsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBN0ZRLFlBQVk7UUFKeEIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRSxvQkFBb0I7U0FDcEMsQ0FBQzt5Q0FPd0MseUJBQWdCO09BTjdDLFlBQVksQ0E4RnhCO0lBQUQsbUJBQUM7Q0FBQSxBQTlGRCxJQThGQztBQTlGWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJhcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IERyYXdlclRyYW5zaXRpb25CYXNlLCBSYWRTaWRlRHJhd2VyLCBTbGlkZUluT25Ub3BUcmFuc2l0aW9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyXCI7XG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0ICogYXMgdXRpbGlkYWRlcyBmcm9tIFwidXRpbHMvdXRpbHNcIjtcbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5cbiBcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWFwcFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcImFwcC5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcblx0cHJpdmF0ZSBfc2VsZWN0ZWRQYWdlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xuICAgIHB1YmxpYyBlbWFpbFVzdWFyaW86c3RyaW5nO1xuICAgIHB1YmxpYyBub21icmVVc3VhcmlvOnN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucykge1xuICAgICAgICAvLyBVc2UgdGhlIGNvbXBvbmVudCBjb25zdHJ1Y3RvciB0byBpbmplY3Qgc2VydmljZXMuXG4gICAgICAgIHRoaXMuZW1haWxVc3VhcmlvID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ2VtYWlsVXN1YXJpbycpO1xuICAgICAgICB0aGlzLm5vbWJyZVVzdWFyaW8gPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnbm9tYnJlVXN1YXJpbycpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQgeyBcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRQYWdlID0gXCJIb21lXCI7XG4gICAgICAgIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uID0gbmV3IFNsaWRlSW5PblRvcFRyYW5zaXRpb24oKTtcbiAgICAgICAgXG4gICAgICAgIGZpcmViYXNlLmluaXQoeyBcbiAgICAgICAgICAgIC8vIE9wdGlvbmFsbHkgcGFzcyBpbiBwcm9wZXJ0aWVzIGZvciBkYXRhYmFzZSwgYXV0aGVudGljYXRpb24gYW5kIGNsb3VkIG1lc3NhZ2luZyxcbiAgICAgICAgICAgIC8vIHNlZSB0aGVpciByZXNwZWN0aXZlIGRvY3MuXG4gICAgICAgICAgICBvbk1lc3NhZ2VSZWNlaXZlZENhbGxiYWNrOiAobWVzc2FnZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQVVNIIHJlY2liaWRhJyk7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTsgXG4gICAgICAgICAgICAgIGRpYWxvZ3MuYWN0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgLy90aXRsZTogbWVzc2FnZS5kYXRhLnRpdHVsbyxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ0VsIGNvbnR1Y3RvciBkZSB0dSB2aWFqZSBoYSBjYW1iaWFkbyBlbCBlc3RhZG8gYTogJyttZXNzYWdlLmRhdGEudGV4dCxcbiAgICAgICAgICAgICAgICAgICAgLy9tZXNzYWdlOidUaWVuZXMgdW5hIG5vdGlmaWNhY2nDs24nLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbGFyXCIsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbnM6IFtcIlZlciB2aWFqZVwiXVxuICAgICAgICAgICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0ICE9ICdDYW5jZWxhcicpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi92aWFqZS9cIittZXNzYWdlLmRhdGEuaWRSdXRhK1wiL1wiK21lc3NhZ2UuZGF0YS5pZFZpYWplK1wiL1wiK21lc3NhZ2UuZGF0YS5wbGFjYStcIi9cIittZXNzYWdlLmRhdGEuaWRDb25kdWN0b3JdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9KS50aGVuKGluc3RhbmNlID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmlyZWJhc2UuaW5pdCBkb25lXCIpO1xuICAgICAgICB9LGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmlyZWJhc2UuaW5pdCBlcnJvcjogJHtlcnJvcn1cIik7XG4gICAgICAgIH0pO1xuICAgIH0gXG5cbiAgICBnZXQgc2lkZURyYXdlclRyYW5zaXRpb24oKTogRHJhd2VyVHJhbnNpdGlvbkJhc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb247XG4gICAgfVxuXG4gICAgYWJyaXJQYWdpbmEoKXtcbiAgICAgICAgdXRpbGlkYWRlcy5vcGVuVXJsKCdodHRwczovL3NlY29tcGFydGUuc21hcnQ0LmNvbS5jby8nKTtcbiAgICB9XG5cbiAgICBpc1BhZ2VTZWxlY3RlZChwYWdlVGl0bGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gcGFnZVRpdGxlID09PSB0aGlzLl9zZWxlY3RlZFBhZ2U7XG4gICAgfVxuXG4gICAgb25OYXZJdGVtVGFwKG5hdkl0ZW1Sb3V0ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbbmF2SXRlbVJvdXRlXSwge1xuICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiZmFkZVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj5hcHAuZ2V0Um9vdFZpZXcoKTtcbiAgICAgICAgc2lkZURyYXdlci5jbG9zZURyYXdlcigpO1xuICAgIH1cbiAgICBjZXJyYXJEcmF3ZXIoKTp2b2lke1xuICAgICAgICBjb25zdCBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+YXBwLmdldFJvb3RWaWV3KCk7XG4gICAgICAgIHNpZGVEcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcbiAgICB9XG4gICAgc2FsaXIoKTp2b2lke1xuICAgICAgICBkaWFsb2dzLmNvbmZpcm0oe1xuICAgICAgICAgICAgdGl0bGU6IFwiU2FsaXJcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiwr9SZWFsbWVudGUgZGVzZWFzIGNlcnJhciB0dSBzZXNpw7NuP1wiLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIlNhbGlyXCIsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbGFyXCJcbiAgICAgICAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgLy8gcmVzdWx0IGFyZ3VtZW50IGlzIGJvb2xlYW5cbiAgICAgICAgICAgIGlmKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2lkZURyYXdlciA9IDxSYWRTaWRlRHJhd2VyPmFwcC5nZXRSb290VmlldygpO1xuICAgICAgICAgICAgICAgIHNpZGVEcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcbiAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnJlbW92ZShcIm5vbWJyZVVzdWFyaW9cIik7XG4gICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5yZW1vdmUoXCJpZFVzdWFyaW9cIik7XG4gICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5yZW1vdmUoXCJlbWFpbFVzdWFyaW9cIik7XG4gICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5yZW1vdmUoXCJpZG1lbWJlclwiKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvbG9naW5cIl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgcmVzdWx0OiBcIiArIHJlc3VsdCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgIH1cbn1cbiJdfQ==