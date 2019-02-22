"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app = require("application");
var ws_service_1 = require("../ws.service");
var router_1 = require("nativescript-angular/router");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var ApplicationSettings = require("application-settings");
var observableArray = require("tns-core-modules/data/observable-array");
var dialogs = require("tns-core-modules/ui/dialogs");
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "saldo", loadChildren: "./saldo/saldo.module#SaldoModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var SaldoComponent = /** @class */ (function () {
    function SaldoComponent(routerExtensions, myService) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
        this.routerExtensions = routerExtensions;
        this.myService = myService;
        this.saldo = 0;
        this.myItems = new observableArray.ObservableArray([]);
        this.empresas = [];
        this.idvango = ApplicationSettings.getString('idvango');
    }
    SaldoComponent.prototype.agregarSaldo = function () {
        /*dialogs.alert({
            title: "Carga tu cuenta",
            message: "Puedes agregar saldo a tu cuenta haciendo un pago en Baloto, con la referencia: "+this.idvango+". Automáticamente verás tu saldo actualizado",
            okButtonText: "Entendido"
        }).then(() => {
            console.log("Dialog closed!");
        });*/
        this.routerExtensions.navigate(["/infoRecarga"]);
    };
    SaldoComponent.prototype.onDrawerButtonTap = function () {
        var sideDrawer = app.getRootView();
        sideDrawer.showDrawer();
    };
    SaldoComponent.prototype.ngOnInit = function () {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
        this.consultarDatos();
    };
    SaldoComponent.prototype.consultarDatos = function () {
        var _this = this;
        loader.show({
            message: 'Consultando tu saldo y transacciones'
        });
        var idUsuario = ApplicationSettings.getString('idUsuario');
        var usuario = ApplicationSettings.getString('emailUsuario');
        var idvango = ApplicationSettings.getString('idvango');
        var cedula = ApplicationSettings.getString('cedulaUsuario');
        //et cedula = '1024494634';
        var nombres = ApplicationSettings.getString('nombreUsuario');
        if (idvango != '0') {
            console.log('Con idmember: ' + idvango);
            this.myService.getSaldo(idvango).subscribe(function (result) {
                loader.hide();
                console.log('Resultado del saldo');
                console.log(result);
                if (result.balance) {
                    _this.saldo = result.balance * 1;
                }
            }, function (error) {
                loader.hide();
                console.log('Error consultando saldo');
                console.log(error);
            });
            //Consultar historico de transacciones
            this.myService.getTransacciones(idvango).subscribe(function (res) {
                loader.hide();
                console.log('Resultado de las transacciones');
                console.log(res);
                for (var i = 0; i < Object.keys(res).length; i++) {
                    _this.myItems.push(res[i]);
                }
                //this.saldo=result.balance*1;
            }, function (error) {
                loader.hide();
                console.log('Error consultando saldo');
                console.log(error);
            });
        }
        else {
            console.log('Sin idvango');
            this.seleccionarEmpresa();
        }
    };
    SaldoComponent.prototype.seleccionarEmpresa = function () {
        var _this = this;
        var idUsuario = ApplicationSettings.getString('idUsuario');
        var usuario = ApplicationSettings.getString('emailUsuario');
        var idvango = ApplicationSettings.getString('idvango');
        var cedula = ApplicationSettings.getString('cedulaUsuario');
        //let cedula = '1024494634';
        var nombres = ApplicationSettings.getString('nombreUsuario');
        var empresas = [];
        this.myService.getEmpresas().subscribe(function (result) {
            console.log('Listado de empresas');
            console.log(result);
            for (var i = 0; i < Object.keys(result).length; i++) {
                _this.empresas.push(result[i]);
            }
            console.log(_this.empresas);
            for (var i = 0; i < Object.keys(_this.empresas).length; i++) {
                console.log(_this.empresas[i]);
                empresas.push(_this.empresas[i].name);
            }
            dialogs.action({
                message: "Selecciona tu empresa",
                cancelButtonText: "Cancelar",
                actions: empresas
            }).then(function (result) {
                if (result) {
                    var empresa = result;
                    var idEmpresa = void 0;
                    for (var i = 0; i < Object.keys(_this.empresas).length; i++) {
                        console.log(_this.empresas[i]);
                        if (result == _this.empresas[i].name)
                            idEmpresa = _this.empresas[i].username;
                    }
                    if (cedula) {
                        //cedula,email,nombre,empresa,idEmpresa
                        _this.myService.getIdVango(cedula, usuario, nombres, empresa, idEmpresa).subscribe(function (result) {
                            ApplicationSettings.setString("idvango", result.idvango);
                            _this.exitoIdVango(idUsuario, result.idvango);
                        }, function (error) {
                            console.log('Error en getIdVango');
                            console.log(error);
                        });
                    }
                }
                console.log("Dialog result: " + result);
                if (result == "Option1") {
                    //Do action1
                }
                else if (result == "Option2") {
                    //Do action2
                }
            });
        }, function (error) {
            console.log('Error consultando empresas:');
            console.log(error);
        });
    };
    SaldoComponent.prototype.exitoIdVango = function (idUsuario, idVango) {
        var _this = this;
        console.log('Respuesta del exitoIdMember');
        loader.hide();
        this.myService.asignarIdVango(idUsuario, idVango).subscribe(function (result) {
            console.log('Respuesta de asignación de ID Vango');
            console.log(result);
            _this.consultarDatos();
        }, function (error) {
            console.log('Error asignando idVango');
        });
    };
    SaldoComponent = __decorate([
        core_1.Component({
            selector: "Saldo",
            moduleId: module.id,
            templateUrl: "./saldo.component.html"
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions, ws_service_1.WebService])
    ], SaldoComponent);
    return SaldoComponent;
}());
exports.SaldoComponent = SaldoComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZG8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2FsZG8uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELGlDQUFtQztBQUVuQyw0Q0FBMkM7QUFDM0Msc0RBQTZEO0FBQzdELGlGQUFnRTtBQUNoRSwwREFBNEQ7QUFDNUQsd0VBQTBFO0FBQzFFLHFEQUF1RDtBQUV2RDs7Ozs7OERBSzhEO0FBQzlELElBQUksTUFBTSxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztBQU1wQztJQU1JLHdCQUFvQixnQkFBa0MsRUFBUyxTQUFxQjtRQUNoRjs7c0VBRThEO1FBSDlDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFZO1FBTHBGLFVBQUssR0FBUSxDQUFDLENBQUM7UUFDUixZQUFPLEdBQUcsSUFBSSxlQUFlLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXpELGFBQVEsR0FBQyxFQUFFLENBQUM7UUFDWixZQUFPLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBTW5ELENBQUM7SUFDRCxxQ0FBWSxHQUFaO1FBQ0k7Ozs7OzthQU1LO1FBQ0wsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFFckQsQ0FBQztJQUNELDBDQUFpQixHQUFqQjtRQUNJLElBQU0sVUFBVSxHQUFrQixHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEQsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0k7O3NFQUU4RDtRQUM5RCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUNELHVDQUFjLEdBQWQ7UUFBQSxpQkE2Q0M7UUE1Q0csTUFBTSxDQUFDLElBQUksQ0FBQztZQUNSLE9BQU8s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QixZQUFZO2lCQUNmO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLEVBQUUsVUFBQyxLQUFLO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBQ0QscUNBQVksR0FBWixVQUFhLFNBQVMsRUFBQyxPQUFPO1FBQTlCLGlCQVdDO1FBVkcsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxNQUFNO1lBQzlELE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUMsQ0FBQztZQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMxQixDQUFDLEVBQUUsVUFBQyxLQUFLO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQXpKUSxjQUFjO1FBTDFCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsT0FBTztZQUNqQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtTQUN4QyxDQUFDO3lDQU93Qyx5QkFBZ0IsRUFBb0IsdUJBQVU7T0FOM0UsY0FBYyxDQTBKMUI7SUFBRCxxQkFBQztDQUFBLEFBMUpELElBMEpDO0FBMUpZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJhcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiO1xuaW1wb3J0IHsgV2ViU2VydmljZSB9IGZyb20gXCIuLi93cy5zZXJ2aWNlXCI7XG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7TG9hZGluZ0luZGljYXRvcn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCAqIGFzIG9ic2VydmFibGVBcnJheSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9nc1wiO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBCZWZvcmUgeW91IGNhbiBuYXZpZ2F0ZSB0byB0aGlzIHBhZ2UgZnJvbSB5b3VyIGFwcCwgeW91IG5lZWQgdG8gcmVmZXJlbmNlIHRoaXMgcGFnZSdzIG1vZHVsZSBpbiB0aGVcbiogZ2xvYmFsIGFwcCByb3V0ZXIgbW9kdWxlLiBBZGQgdGhlIGZvbGxvd2luZyBvYmplY3QgdG8gdGhlIGdsb2JhbCBhcnJheSBvZiByb3V0ZXM6XG4qIHsgcGF0aDogXCJzYWxkb1wiLCBsb2FkQ2hpbGRyZW46IFwiLi9zYWxkby9zYWxkby5tb2R1bGUjU2FsZG9Nb2R1bGVcIiB9XG4qIE5vdGUgdGhhdCB0aGlzIHNpbXBseSBwb2ludHMgdGhlIHBhdGggdG8gdGhlIHBhZ2UgbW9kdWxlIGZpbGUuIElmIHlvdSBtb3ZlIHRoZSBwYWdlLCB5b3UgbmVlZCB0byB1cGRhdGUgdGhlIHJvdXRlIHRvby5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5sZXQgbG9hZGVyID0gbmV3IExvYWRpbmdJbmRpY2F0b3IoKTtcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIlNhbGRvXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3NhbGRvLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgU2FsZG9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHNhbGRvOm51bWJlcj0wO1xuICAgIHB1YmxpYyBteUl0ZW1zID0gbmV3IG9ic2VydmFibGVBcnJheS5PYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgIGVtcHJlc2FJZDpzdHJpbmc7XG4gICAgZW1wcmVzYXM9W107XG4gICAgaWR2YW5nbyA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdpZHZhbmdvJyk7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLHByaXZhdGUgbXlTZXJ2aWNlOiBXZWJTZXJ2aWNlKSB7XG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogVXNlIHRoZSBjb25zdHJ1Y3RvciB0byBpbmplY3QgYXBwIHNlcnZpY2VzIHRoYXQgeW91IG5lZWQgaW4gdGhpcyBjb21wb25lbnQuXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgICAgIFxuICAgIH1cbiAgICBhZ3JlZ2FyU2FsZG8oKXtcbiAgICAgICAgLypkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkNhcmdhIHR1IGN1ZW50YVwiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJQdWVkZXMgYWdyZWdhciBzYWxkbyBhIHR1IGN1ZW50YSBoYWNpZW5kbyB1biBwYWdvIGVuIEJhbG90bywgY29uIGxhIHJlZmVyZW5jaWE6IFwiK3RoaXMuaWR2YW5nbytcIi4gQXV0b23DoXRpY2FtZW50ZSB2ZXLDoXMgdHUgc2FsZG8gYWN0dWFsaXphZG9cIixcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJFbnRlbmRpZG9cIlxuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgIH0pOyovXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaW5mb1JlY2FyZ2FcIl0pO1xuXG4gICAgfVxuICAgIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+YXBwLmdldFJvb3RWaWV3KCk7XG4gICAgICAgIHNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFVzZSB0aGUgXCJuZ09uSW5pdFwiIGhhbmRsZXIgdG8gaW5pdGlhbGl6ZSBkYXRhIGZvciB0aGlzIGNvbXBvbmVudC5cbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAgICAgdGhpcy5jb25zdWx0YXJEYXRvcygpO1xuICAgIH1cbiAgICBjb25zdWx0YXJEYXRvcygpe1xuICAgICAgICBsb2FkZXIuc2hvdyh7XG4gICAgICAgICAgICBtZXNzYWdlOidDb25zdWx0YW5kbyB0dSBzYWxkbyB5IHRyYW5zYWNjaW9uZXMnXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgaWRVc3VhcmlvID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ2lkVXN1YXJpbycpO1xuICAgICAgICBsZXQgdXN1YXJpbyA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdlbWFpbFVzdWFyaW8nKTtcbiAgICAgICAgbGV0IGlkdmFuZ28gPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnaWR2YW5nbycpO1xuICAgICAgICBsZXQgY2VkdWxhID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ2NlZHVsYVVzdWFyaW8nKTtcbiAgICAgICAgLy9ldCBjZWR1bGEgPSAnMTAyNDQ5NDYzNCc7XG4gICAgICAgIGxldCBub21icmVzID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ25vbWJyZVVzdWFyaW8nKTtcbiAgICAgICAgaWYoaWR2YW5nbyAhPSAnMCcpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0NvbiBpZG1lbWJlcjogJytpZHZhbmdvKTtcbiAgICAgICAgICAgIHRoaXMubXlTZXJ2aWNlLmdldFNhbGRvKGlkdmFuZ28pLnN1YnNjcmliZSgocmVzdWx0OmFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3VsdGFkbyBkZWwgc2FsZG8nKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIGlmKHJlc3VsdC5iYWxhbmNlKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYWxkbz1yZXN1bHQuYmFsYW5jZSoxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGNvbnN1bHRhbmRvIHNhbGRvJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvL0NvbnN1bHRhciBoaXN0b3JpY28gZGUgdHJhbnNhY2Npb25lc1xuICAgICAgICAgICAgdGhpcy5teVNlcnZpY2UuZ2V0VHJhbnNhY2Npb25lcyhpZHZhbmdvKS5zdWJzY3JpYmUoKHJlczphbnkpID0+IHtcbiAgICAgICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXN1bHRhZG8gZGUgbGFzIHRyYW5zYWNjaW9uZXMnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPE9iamVjdC5rZXlzKHJlcykubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5teUl0ZW1zLnB1c2gocmVzW2ldKTsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vdGhpcy5zYWxkbz1yZXN1bHQuYmFsYW5jZSoxO1xuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgY29uc3VsdGFuZG8gc2FsZG8nKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTaW4gaWR2YW5nbycpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnNlbGVjY2lvbmFyRW1wcmVzYSgpXG4gICAgICAgIH1cbiAgICB9XG4gICAgc2VsZWNjaW9uYXJFbXByZXNhKCl7XG4gICAgICAgIGxldCBpZFVzdWFyaW8gPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnaWRVc3VhcmlvJyk7XG4gICAgICAgIGxldCB1c3VhcmlvID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ2VtYWlsVXN1YXJpbycpO1xuICAgICAgICBsZXQgaWR2YW5nbyA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdpZHZhbmdvJyk7XG4gICAgICAgIGxldCBjZWR1bGEgPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnY2VkdWxhVXN1YXJpbycpO1xuICAgICAgICAvL2xldCBjZWR1bGEgPSAnMTAyNDQ5NDYzNCc7XG4gICAgICAgIGxldCBub21icmVzID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ25vbWJyZVVzdWFyaW8nKTtcbiAgICAgICAgbGV0IGVtcHJlc2FzID0gW107XG4gICAgICAgIHRoaXMubXlTZXJ2aWNlLmdldEVtcHJlc2FzKCkuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMaXN0YWRvIGRlIGVtcHJlc2FzJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXMocmVzdWx0KS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1wcmVzYXMucHVzaChyZXN1bHRbaV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmVtcHJlc2FzKTtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPE9iamVjdC5rZXlzKHRoaXMuZW1wcmVzYXMpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5lbXByZXNhc1tpXSlcbiAgICAgICAgICAgICAgICBlbXByZXNhcy5wdXNoKHRoaXMuZW1wcmVzYXNbaV0ubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkaWFsb2dzLmFjdGlvbih7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJTZWxlY2Npb25hIHR1IGVtcHJlc2FcIixcbiAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbGFyXCIsXG4gICAgICAgICAgICAgICAgYWN0aW9uczogZW1wcmVzYXNcbiAgICAgICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBpZihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgZW1wcmVzYSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkRW1wcmVzYTtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXModGhpcy5lbXByZXNhcykubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZW1wcmVzYXNbaV0pXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQ9PXRoaXMuZW1wcmVzYXNbaV0ubmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkRW1wcmVzYT10aGlzLmVtcHJlc2FzW2ldLnVzZXJuYW1lO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoY2VkdWxhKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2VkdWxhLGVtYWlsLG5vbWJyZSxlbXByZXNhLGlkRW1wcmVzYVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5teVNlcnZpY2UuZ2V0SWRWYW5nbyhjZWR1bGEsdXN1YXJpbyxub21icmVzLGVtcHJlc2EsaWRFbXByZXNhKS5zdWJzY3JpYmUoKHJlc3VsdDphbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcImlkdmFuZ29cIixyZXN1bHQuaWR2YW5nbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leGl0b0lkVmFuZ28oaWRVc3VhcmlvLHJlc3VsdC5pZHZhbmdvKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGVuIGdldElkVmFuZ28nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIHJlc3VsdDogXCIgKyByZXN1bHQpO1xuICAgICAgICAgICAgICAgIGlmKHJlc3VsdCA9PSBcIk9wdGlvbjFcIil7XG4gICAgICAgICAgICAgICAgICAgIC8vRG8gYWN0aW9uMVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHJlc3VsdCA9PSBcIk9wdGlvbjJcIil7XG4gICAgICAgICAgICAgICAgICAgIC8vRG8gYWN0aW9uMlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBjb25zdWx0YW5kbyBlbXByZXNhczonKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgIH1cbiAgICBleGl0b0lkVmFuZ28oaWRVc3VhcmlvLGlkVmFuZ28pIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZWwgZXhpdG9JZE1lbWJlcicpO1xuICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICB0aGlzLm15U2VydmljZS5hc2lnbmFySWRWYW5nbyhpZFVzdWFyaW8saWRWYW5nbykuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGUgYXNpZ25hY2nDs24gZGUgSUQgVmFuZ28nKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICB0aGlzLmNvbnN1bHRhckRhdG9zKCk7XG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGFzaWduYW5kbyBpZFZhbmdvJyk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxufVxuIl19