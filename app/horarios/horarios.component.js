"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var ws_service_1 = require("../ws.service");
var dialogs = require("ui/dialogs");
var observableArray = require("tns-core-modules/data/observable-array");
var router_2 = require("@angular/router");
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "horarios", loadChildren: "./horarios/horarios.module#HorariosModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var HorariosComponent = /** @class */ (function () {
    function HorariosComponent(routerExtensions, myService, route) {
        var _this = this;
        this.routerExtensions = routerExtensions;
        this.myService = myService;
        this.route = route;
        this.myItems = new observableArray.ObservableArray([]);
        this.arrayItems = new observableArray.ObservableArray([]);
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
        console.log(this.route.params);
        this.route.params
            .forEach(function (params) {
            console.log('Parametros de url');
            _this.idruta = +params["idruta"];
            _this.nombreRuta = params["nombreruta"];
            console.log(_this.idruta + ' - ' + _this.nombreRuta);
        });
    }
    /*reservar(idruta,precio,nombreruta){
        console.log('Qué pasó?');
        //this.routerExtensions.navigate(["/home"]);
        //[nsRouterLink]="['/ruta/'+item.idruta+'/'+item.idviaje+'/'+item.precio+'/'+item.nombreruta]"
    }*/
    HorariosComponent.prototype.irAtras = function () {
        this.routerExtensions.back();
    };
    HorariosComponent.prototype.onItemTap = function (args) {
        console.log(args);
        console.log("------------------------ ItemTapped: " + args.index);
    };
    HorariosComponent.prototype.ngOnInit = function () {
        var _this = this;
        var idRuta = this.idruta;
        loader.show();
        this.myService.getViajesDisponibles(idRuta).subscribe(function (res) {
            loader.hide();
            console.log('Respuesta de los viajes: ' + Object.keys(res).length);
            console.log(JSON.stringify(res));
            for (var i = 0; i < Object.keys(res).length; i++) {
                _this.arrayItems.push(res[i]);
                _this.myItems.push(res[i]);
            }
        }, function (error) {
            loader.hide();
            _this.onGetDataError(error);
        });
    };
    HorariosComponent.prototype.onGetDataError = function (error) {
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
    HorariosComponent = __decorate([
        core_1.Component({
            selector: "Horarios",
            moduleId: module.id,
            templateUrl: "./horarios.component.html"
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions, ws_service_1.WebService, router_2.ActivatedRoute])
    ], HorariosComponent);
    return HorariosComponent;
}());
exports.HorariosComponent = HorariosComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9yYXJpb3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9yYXJpb3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtGO0FBQ2xGLHNEQUE2RDtBQUM3RCxpRkFBZ0U7QUFDaEUsNENBQTJDO0FBQzNDLG9DQUFzQztBQUV0Qyx3RUFBMEU7QUFDMUUsMENBQWlEO0FBRWpEOzs7Ozs4REFLOEQ7QUFHOUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxpREFBZ0IsRUFBRSxDQUFDO0FBTXBDO0lBT0ksMkJBQW9CLGdCQUFrQyxFQUFTLFNBQXFCLEVBQVMsS0FBcUI7UUFBbEgsaUJBY0M7UUFkbUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFTLGNBQVMsR0FBVCxTQUFTLENBQVk7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQU4zRyxZQUFPLEdBQUcsSUFBSSxlQUFlLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELGVBQVUsR0FBRSxJQUFJLGVBQWUsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFNdkQ7O3NFQUU4RDtRQUM5RCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO2FBQ2QsT0FBTyxDQUFDLFVBQUMsTUFBTTtZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNqQyxLQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hDLEtBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLE1BQU0sR0FBQyxLQUFLLEdBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBR25ELENBQUMsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQUNEOzs7O09BSUc7SUFDSCxtQ0FBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFTSxxQ0FBUyxHQUFoQixVQUFpQixJQUFJO1FBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFBQSxpQkFpQkM7UUFoQkcsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN6QixNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLEdBQUc7WUFDdEQsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsR0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDN0MsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLENBQUM7UUFHTCxDQUFDLEVBQUUsVUFBQyxLQUFLO1lBQ0wsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2QsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTywwQ0FBYyxHQUF0QixVQUF1QixLQUFxQjtRQUN4QyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbkMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUNWLEtBQUssRUFBRSxtQkFBbUI7WUFDMUIsT0FBTyxFQUFFLDhHQUE4RztZQUN2SCxZQUFZLEVBQUUsSUFBSTtTQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRWxDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQWxFUSxpQkFBaUI7UUFMN0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsMkJBQTJCO1NBQzNDLENBQUM7eUNBUXdDLHlCQUFnQixFQUFvQix1QkFBVSxFQUFnQix1QkFBYztPQVB6RyxpQkFBaUIsQ0FxRTdCO0lBQUQsd0JBQUM7Q0FBQSxBQXJFRCxJQXFFQztBQXJFWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHtMb2FkaW5nSW5kaWNhdG9yfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7XG5pbXBvcnQgeyBXZWJTZXJ2aWNlIH0gZnJvbSBcIi4uL3dzLnNlcnZpY2VcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgKiBhcyBvYnNlcnZhYmxlQXJyYXkgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiogQmVmb3JlIHlvdSBjYW4gbmF2aWdhdGUgdG8gdGhpcyBwYWdlIGZyb20geW91ciBhcHAsIHlvdSBuZWVkIHRvIHJlZmVyZW5jZSB0aGlzIHBhZ2UncyBtb2R1bGUgaW4gdGhlXG4qIGdsb2JhbCBhcHAgcm91dGVyIG1vZHVsZS4gQWRkIHRoZSBmb2xsb3dpbmcgb2JqZWN0IHRvIHRoZSBnbG9iYWwgYXJyYXkgb2Ygcm91dGVzOlxuKiB7IHBhdGg6IFwiaG9yYXJpb3NcIiwgbG9hZENoaWxkcmVuOiBcIi4vaG9yYXJpb3MvaG9yYXJpb3MubW9kdWxlI0hvcmFyaW9zTW9kdWxlXCIgfVxuKiBOb3RlIHRoYXQgdGhpcyBzaW1wbHkgcG9pbnRzIHRoZSBwYXRoIHRvIHRoZSBwYWdlIG1vZHVsZSBmaWxlLiBJZiB5b3UgbW92ZSB0aGUgcGFnZSwgeW91IG5lZWQgdG8gdXBkYXRlIHRoZSByb3V0ZSB0b28uXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cbnZhciBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiSG9yYXJpb3NcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaG9yYXJpb3MuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBIb3Jhcmlvc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHVibGljIG15SXRlbXMgPSBuZXcgb2JzZXJ2YWJsZUFycmF5Lk9ic2VydmFibGVBcnJheShbXSk7XG4gICAgcHVibGljIGFycmF5SXRlbXM9IG5ldyBvYnNlcnZhYmxlQXJyYXkuT2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgICBwcml2YXRlIGNvdW50ZXI6IG51bWJlcjtcbiAgICBwdWJsaWMgc2VhcmNoUGhyYXNlOnN0cmluZztcbiAgICBwdWJsaWMgaWRydXRhOiBudW1iZXI7XG4gICAgcHVibGljIG5vbWJyZVJ1dGE6c3RyaW5nO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxwcml2YXRlIG15U2VydmljZTogV2ViU2VydmljZSxwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFVzZSB0aGUgY29uc3RydWN0b3IgdG8gaW5qZWN0IGFwcCBzZXJ2aWNlcyB0aGF0IHlvdSBuZWVkIGluIHRoaXMgY29tcG9uZW50LlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJvdXRlLnBhcmFtcyk7XG4gICAgICAgIHRoaXMucm91dGUucGFyYW1zXG4gICAgICAgICAgLmZvckVhY2goKHBhcmFtcykgPT4geyBcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1BhcmFtZXRyb3MgZGUgdXJsJyk7XG4gICAgICAgICAgICAgIHRoaXMuaWRydXRhID0gK3BhcmFtc1tcImlkcnV0YVwiXTtcbiAgICAgICAgICAgICAgdGhpcy5ub21icmVSdXRhID0gcGFyYW1zW1wibm9tYnJlcnV0YVwiXTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5pZHJ1dGErJyAtICcrdGhpcy5ub21icmVSdXRhKTtcbiAgICAgICAgICAgICAgXG5cbiAgICAgICAgICB9KTtcbiAgICB9XG4gICAgLypyZXNlcnZhcihpZHJ1dGEscHJlY2lvLG5vbWJyZXJ1dGEpe1xuICAgICAgICBjb25zb2xlLmxvZygnUXXDqSBwYXPDsz8nKTtcbiAgICAgICAgLy90aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWVcIl0pO1xuICAgICAgICAvL1tuc1JvdXRlckxpbmtdPVwiWycvcnV0YS8nK2l0ZW0uaWRydXRhKycvJytpdGVtLmlkdmlhamUrJy8nK2l0ZW0ucHJlY2lvKycvJytpdGVtLm5vbWJyZXJ1dGFdXCJcbiAgICB9Ki9cbiAgICBpckF0cmFzKCkge1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkl0ZW1UYXAoYXJncykge1xuICAgICAgICBjb25zb2xlLmxvZyhhcmdzKTtcbiAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gSXRlbVRhcHBlZDogXCIgKyBhcmdzLmluZGV4KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgbGV0IGlkUnV0YSA9IHRoaXMuaWRydXRhO1xuICAgICAgICBsb2FkZXIuc2hvdygpO1xuICAgICAgICB0aGlzLm15U2VydmljZS5nZXRWaWFqZXNEaXNwb25pYmxlcyhpZFJ1dGEpLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZSBsb3MgdmlhamVzOiAnK09iamVjdC5rZXlzKHJlcykubGVuZ3RoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlcykpO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXMocmVzKS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlJdGVtcy5wdXNoKHJlc1tpXSk7IFxuICAgICAgICAgICAgICAgIHRoaXMubXlJdGVtcy5wdXNoKHJlc1tpXSk7IFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICAgICAgdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwcml2YXRlIG9uR2V0RGF0YUVycm9yKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xuICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlIGVycm9yJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgdGl0bGU6ICdFcnJvciBkZSBjb25leGnDs24nLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJMbyBzZW50aW1vcywgaHVibyB1biBwcm9ibGVtYSBlbmNvbnRyYW5kbyBlbCBzZXJ2aWRvciwgdmVyaWZpY2EgdHUgY29uZXhpw7NuIGEgSW50ZXJuZXQgZSBpbnRlbnRhIG51ZXZhbWVudGUuXCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6ICdPaydcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIFxufVxuIl19