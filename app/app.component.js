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
                if (message.data.text == 'FINALIZADO') {
                    dialogs.action({
                        //title: message.data.titulo,
                        message: 'El contuctor de tu viaje ha cambiado el estado a: ' + message.data.text,
                        //message:'Tienes una notificación',
                        cancelButtonText: "Entendido",
                        actions: ["Listo"]
                    }).then(function (result) {
                        console.log("Dialog closed!");
                        _this.routerExtensions.navigate(["/historial"]);
                    });
                }
                else {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNkQ7QUFDN0QsaUNBQW1DO0FBQ25DLHNEQUErRDtBQUMvRCx5RUFBeUc7QUFDekcsMERBQTREO0FBQzVELG9DQUFzQztBQUN0Qyx3Q0FBMEM7QUFDMUMsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFPekQ7SUFNSSxzQkFBb0IsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEQsb0RBQW9EO1FBQ3BELElBQUksQ0FBQyxZQUFZLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxhQUFhLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCwrQkFBUSxHQUFSO1FBQUEsaUJBNENDO1FBM0NHLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1FBQzVCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLG1EQUFzQixFQUFFLENBQUM7UUFFMUQsUUFBUSxDQUFDLElBQUksQ0FBQztZQUNWLGtGQUFrRjtZQUNsRiw2QkFBNkI7WUFDN0IseUJBQXlCLEVBQUUsVUFBQyxPQUFZO2dCQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDckMsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUUsWUFBWSxDQUFDLENBQUEsQ0FBQztvQkFDaEMsT0FBTyxDQUFDLE1BQU0sQ0FBQzt3QkFDYiw2QkFBNkI7d0JBQzdCLE9BQU8sRUFBRSxvREFBb0QsR0FBQyxP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LENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQztnQkFDUCxJQUFNLFVBQVUsR0FBa0IsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNwRCxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3pCLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZELG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDNUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN4QyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzNDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFFdkMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDL0MsQ0FBQztZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLENBQUM7UUFFNUMsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBM0dRLFlBQVk7UUFKeEIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRSxvQkFBb0I7U0FDcEMsQ0FBQzt5Q0FPd0MseUJBQWdCO09BTjdDLFlBQVksQ0E0R3hCO0lBQUQsbUJBQUM7Q0FBQSxBQTVHRCxJQTRHQztBQTVHWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJhcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IERyYXdlclRyYW5zaXRpb25CYXNlLCBSYWRTaWRlRHJhd2VyLCBTbGlkZUluT25Ub3BUcmFuc2l0aW9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyXCI7XG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0ICogYXMgdXRpbGlkYWRlcyBmcm9tIFwidXRpbHMvdXRpbHNcIjtcbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5cbiBcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWFwcFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcImFwcC5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcblx0cHJpdmF0ZSBfc2VsZWN0ZWRQYWdlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xuICAgIHB1YmxpYyBlbWFpbFVzdWFyaW86c3RyaW5nO1xuICAgIHB1YmxpYyBub21icmVVc3VhcmlvOnN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucykge1xuICAgICAgICAvLyBVc2UgdGhlIGNvbXBvbmVudCBjb25zdHJ1Y3RvciB0byBpbmplY3Qgc2VydmljZXMuXG4gICAgICAgIHRoaXMuZW1haWxVc3VhcmlvID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ2VtYWlsVXN1YXJpbycpO1xuICAgICAgICB0aGlzLm5vbWJyZVVzdWFyaW8gPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnbm9tYnJlVXN1YXJpbycpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQgeyBcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRQYWdlID0gXCJIb21lXCI7XG4gICAgICAgIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uID0gbmV3IFNsaWRlSW5PblRvcFRyYW5zaXRpb24oKTtcbiAgICAgICAgXG4gICAgICAgIGZpcmViYXNlLmluaXQoeyBcbiAgICAgICAgICAgIC8vIE9wdGlvbmFsbHkgcGFzcyBpbiBwcm9wZXJ0aWVzIGZvciBkYXRhYmFzZSwgYXV0aGVudGljYXRpb24gYW5kIGNsb3VkIG1lc3NhZ2luZyxcbiAgICAgICAgICAgIC8vIHNlZSB0aGVpciByZXNwZWN0aXZlIGRvY3MuXG4gICAgICAgICAgICBvbk1lc3NhZ2VSZWNlaXZlZENhbGxiYWNrOiAobWVzc2FnZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQVVNIIHJlY2liaWRhJyk7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcbiAgICAgICAgICAgICAgaWYobWVzc2FnZS5kYXRhLnRleHQ9PSdGSU5BTElaQURPJyl7XG4gICAgICAgICAgICAgICAgICBkaWFsb2dzLmFjdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIC8vdGl0bGU6IG1lc3NhZ2UuZGF0YS50aXR1bG8sXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdFbCBjb250dWN0b3IgZGUgdHUgdmlhamUgaGEgY2FtYmlhZG8gZWwgZXN0YWRvIGE6ICcrbWVzc2FnZS5kYXRhLnRleHQsXG4gICAgICAgICAgICAgICAgICAgIC8vbWVzc2FnZTonVGllbmVzIHVuYSBub3RpZmljYWNpw7NuJyxcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJFbnRlbmRpZG9cIixcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uczogW1wiTGlzdG9cIl1cbiAgICAgICAgICAgICAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaGlzdG9yaWFsXCJdKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICBkaWFsb2dzLmFjdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIC8vdGl0bGU6IG1lc3NhZ2UuZGF0YS50aXR1bG8sXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnRWwgY29udHVjdG9yIGRlIHR1IHZpYWplIGhhIGNhbWJpYWRvIGVsIGVzdGFkbyBhOiAnK21lc3NhZ2UuZGF0YS50ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgLy9tZXNzYWdlOidUaWVuZXMgdW5hIG5vdGlmaWNhY2nDs24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxhclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uczogW1wiVmVyIHZpYWplXCJdXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQgIT0gJ0NhbmNlbGFyJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi92aWFqZS9cIittZXNzYWdlLmRhdGEuaWRSdXRhK1wiL1wiK21lc3NhZ2UuZGF0YS5pZFZpYWplK1wiL1wiK21lc3NhZ2UuZGF0YS5wbGFjYStcIi9cIittZXNzYWdlLmRhdGEuaWRDb25kdWN0b3JdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0pLnRoZW4oaW5zdGFuY2UgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaXJlYmFzZS5pbml0IGRvbmVcIik7XG4gICAgICAgIH0sZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaXJlYmFzZS5pbml0IGVycm9yOiAke2Vycm9yfVwiKTtcbiAgICAgICAgfSk7XG4gICAgfSBcblxuICAgIGdldCBzaWRlRHJhd2VyVHJhbnNpdGlvbigpOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbjtcbiAgICB9XG5cbiAgICBhYnJpclBhZ2luYSgpe1xuICAgICAgICB1dGlsaWRhZGVzLm9wZW5VcmwoJ2h0dHBzOi8vc2Vjb21wYXJ0ZS5zbWFydDQuY29tLmNvLycpO1xuICAgIH1cblxuICAgIGlzUGFnZVNlbGVjdGVkKHBhZ2VUaXRsZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBwYWdlVGl0bGUgPT09IHRoaXMuX3NlbGVjdGVkUGFnZTtcbiAgICB9XG5cbiAgICBvbk5hdkl0ZW1UYXAobmF2SXRlbVJvdXRlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtuYXZJdGVtUm91dGVdLCB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJmYWRlXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgc2lkZURyYXdlciA9IDxSYWRTaWRlRHJhd2VyPmFwcC5nZXRSb290VmlldygpO1xuICAgICAgICBzaWRlRHJhd2VyLmNsb3NlRHJhd2VyKCk7XG4gICAgfVxuICAgIGNlcnJhckRyYXdlcigpOnZvaWR7XG4gICAgICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj5hcHAuZ2V0Um9vdFZpZXcoKTtcbiAgICAgICAgc2lkZURyYXdlci5jbG9zZURyYXdlcigpO1xuICAgIH1cbiAgICBzYWxpcigpOnZvaWR7XG4gICAgICAgIGRpYWxvZ3MuY29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogXCJTYWxpclwiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCLCv1JlYWxtZW50ZSBkZXNlYXMgY2VycmFyIHR1IHNlc2nDs24/XCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiU2FsaXJcIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsYXJcIlxuICAgICAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAvLyByZXN1bHQgYXJndW1lbnQgaXMgYm9vbGVhblxuICAgICAgICAgICAgaWYocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBjb25zdCBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+YXBwLmdldFJvb3RWaWV3KCk7XG4gICAgICAgICAgICAgICAgc2lkZURyYXdlci5jbG9zZURyYXdlcigpO1xuICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0Qm9vbGVhbihcImF1dGhlbnRpY2F0ZWRcIiwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3MucmVtb3ZlKFwibm9tYnJlVXN1YXJpb1wiKTtcbiAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnJlbW92ZShcImlkVXN1YXJpb1wiKTtcbiAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnJlbW92ZShcImVtYWlsVXN1YXJpb1wiKTtcbiAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnJlbW92ZShcImlkbWVtYmVyXCIpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9sb2dpblwiXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyByZXN1bHQ6IFwiICsgcmVzdWx0KTtcbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgfVxufVxuIl19