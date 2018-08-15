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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNkQ7QUFDN0QsaUNBQW1DO0FBQ25DLHNEQUErRDtBQUMvRCx5RUFBeUc7QUFDekcsMERBQTREO0FBQzVELG9DQUFzQztBQUN0Qyx3Q0FBMEM7QUFDMUMsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFPekQ7SUFNSSxzQkFBb0IsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEQsb0RBQW9EO1FBQ3BELElBQUksQ0FBQyxZQUFZLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxhQUFhLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCwrQkFBUSxHQUFSO1FBQUEsaUJBOEJDO1FBN0JHLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1FBQzVCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLG1EQUFzQixFQUFFLENBQUM7UUFFMUQsUUFBUSxDQUFDLElBQUksQ0FBQztZQUNWLGtGQUFrRjtZQUNsRiw2QkFBNkI7WUFDN0IseUJBQXlCLEVBQUUsVUFBQyxPQUFZO2dCQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDckMsT0FBTyxDQUFDLE1BQU0sQ0FBQztvQkFDVCw2QkFBNkI7b0JBQzdCLE9BQU8sRUFBRSxvREFBb0QsR0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUk7b0JBQy9FLG9DQUFvQztvQkFDcEMsZ0JBQWdCLEVBQUUsVUFBVTtvQkFDNUIsT0FB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QUFXLEVBQUUsb0JBQW9CO1NBQ3BDLENBQUM7eUNBT3dDLHlCQUFnQjtPQU43QyxZQUFZLENBMEZ4QjtJQUFELG1CQUFDO0NBQUEsQUExRkQsSUEwRkM7QUExRlksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwiYXBwbGljYXRpb25cIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBEcmF3ZXJUcmFuc2l0aW9uQmFzZSwgUmFkU2lkZURyYXdlciwgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiO1xuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCAqIGFzIHV0aWxpZGFkZXMgZnJvbSBcInV0aWxzL3V0aWxzXCI7XG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuXG4gXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1hcHBcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJhcHAuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XG5cdHByaXZhdGUgX3NlbGVjdGVkUGFnZTogc3RyaW5nO1xuICAgIHByaXZhdGUgX3NpZGVEcmF3ZXJUcmFuc2l0aW9uOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZTtcbiAgICBwdWJsaWMgZW1haWxVc3VhcmlvOnN0cmluZztcbiAgICBwdWJsaWMgbm9tYnJlVXN1YXJpbzpzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMpIHtcbiAgICAgICAgLy8gVXNlIHRoZSBjb21wb25lbnQgY29uc3RydWN0b3IgdG8gaW5qZWN0IHNlcnZpY2VzLlxuICAgICAgICB0aGlzLmVtYWlsVXN1YXJpbyA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdlbWFpbFVzdWFyaW8nKTtcbiAgICAgICAgdGhpcy5ub21icmVVc3VhcmlvID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ25vbWJyZVVzdWFyaW8nKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHsgXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkUGFnZSA9IFwiSG9tZVwiO1xuICAgICAgICB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbiA9IG5ldyBTbGlkZUluT25Ub3BUcmFuc2l0aW9uKCk7XG4gICAgICAgIFxuICAgICAgICBmaXJlYmFzZS5pbml0KHsgXG4gICAgICAgICAgICAvLyBPcHRpb25hbGx5IHBhc3MgaW4gcHJvcGVydGllcyBmb3IgZGF0YWJhc2UsIGF1dGhlbnRpY2F0aW9uIGFuZCBjbG91ZCBtZXNzYWdpbmcsXG4gICAgICAgICAgICAvLyBzZWUgdGhlaXIgcmVzcGVjdGl2ZSBkb2NzLlxuICAgICAgICAgICAgb25NZXNzYWdlUmVjZWl2ZWRDYWxsYmFjazogKG1lc3NhZ2U6IGFueSkgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUFVTSCByZWNpYmlkYScpO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7IFxuICAgICAgICAgICAgICBkaWFsb2dzLmFjdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIC8vdGl0bGU6IG1lc3NhZ2UuZGF0YS50aXR1bG8sXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdFbCBjb250dWN0b3IgZGUgdHUgdmlhamUgaGEgY2FtYmlhZG8gZWwgZXN0YWRvIGE6ICcrbWVzc2FnZS5kYXRhLnRleHQsXG4gICAgICAgICAgICAgICAgICAgIC8vbWVzc2FnZTonVGllbmVzIHVuYSBub3RpZmljYWNpw7NuJyxcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxhclwiLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25zOiBbXCJWZXIgdmlhamVcIl1cbiAgICAgICAgICAgICAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdCAhPSAnQ2FuY2VsYXInKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvdmlhamUvXCIrbWVzc2FnZS5kYXRhLmlkUnV0YStcIi9cIittZXNzYWdlLmRhdGEuaWRWaWFqZStcIi9cIittZXNzYWdlLmRhdGEucGxhY2ErXCIvXCIrbWVzc2FnZS5kYXRhLmlkQ29uZHVjdG9yXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfSkudGhlbihpbnN0YW5jZSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpcmViYXNlLmluaXQgZG9uZVwiKTtcbiAgICAgICAgfSxlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpcmViYXNlLmluaXQgZXJyb3I6ICR7ZXJyb3J9XCIpO1xuICAgICAgICB9KTtcbiAgICB9IFxuXG4gICAgZ2V0IHNpZGVEcmF3ZXJUcmFuc2l0aW9uKCk6IERyYXdlclRyYW5zaXRpb25CYXNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uO1xuICAgIH1cblxuICAgIGFicmlyUGFnaW5hKCl7XG4gICAgICAgIHV0aWxpZGFkZXMub3BlblVybCgnaHR0cHM6Ly9zZWNvbXBhcnRlLnNtYXJ0NC5jb20uY28vJyk7XG4gICAgfVxuXG4gICAgaXNQYWdlU2VsZWN0ZWQocGFnZVRpdGxlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHBhZ2VUaXRsZSA9PT0gdGhpcy5fc2VsZWN0ZWRQYWdlO1xuICAgIH1cblxuICAgIG9uTmF2SXRlbVRhcChuYXZJdGVtUm91dGU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW25hdkl0ZW1Sb3V0ZV0sIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcImZhZGVcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+YXBwLmdldFJvb3RWaWV3KCk7XG4gICAgICAgIHNpZGVEcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcbiAgICB9XG4gICAgc2FsaXIoKTp2b2lke1xuICAgICAgICBkaWFsb2dzLmNvbmZpcm0oe1xuICAgICAgICAgICAgdGl0bGU6IFwiU2FsaXJcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiwr9SZWFsbWVudGUgZGVzZWFzIGNlcnJhciB0dSBzZXNpw7NuP1wiLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIlNhbGlyXCIsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbGFyXCJcbiAgICAgICAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgLy8gcmVzdWx0IGFyZ3VtZW50IGlzIGJvb2xlYW5cbiAgICAgICAgICAgIGlmKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2lkZURyYXdlciA9IDxSYWRTaWRlRHJhd2VyPmFwcC5nZXRSb290VmlldygpO1xuICAgICAgICAgICAgICAgIHNpZGVEcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcbiAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnJlbW92ZShcIm5vbWJyZVVzdWFyaW9cIik7XG4gICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5yZW1vdmUoXCJpZFVzdWFyaW9cIik7XG4gICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5yZW1vdmUoXCJlbWFpbFVzdWFyaW9cIik7XG4gICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5yZW1vdmUoXCJpZG1lbWJlclwiKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvbG9naW5cIl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgcmVzdWx0OiBcIiArIHJlc3VsdCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgIH1cbn1cbiJdfQ==