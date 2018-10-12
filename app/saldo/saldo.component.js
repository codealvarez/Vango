"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app = require("application");
var ws_service_1 = require("../ws.service");
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
    function SaldoComponent(myService) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
        this.myService = myService;
        this.saldo = 0;
        this.myItems = new observableArray.ObservableArray([]);
        this.empresas = [];
        this.idvango = ApplicationSettings.getString('idvango');
    }
    SaldoComponent.prototype.agregarSaldo = function () {
        dialogs.alert({
            title: "Carga tu cuenta",
            message: "Puedes agregar saldo a tu cuenta haciendo un pago en Baloto, con la referencia: " + this.idvango + ". Automáticamente verás tu saldo actualizado",
            okButtonText: "Entendido"
        }).then(function () {
            console.log("Dialog closed!");
        });
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
        __metadata("design:paramtypes", [ws_service_1.WebService])
    ], SaldoComponent);
    return SaldoComponent;
}());
exports.SaldoComponent = SaldoComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZG8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2FsZG8uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELGlDQUFtQztBQUVuQyw0Q0FBMkM7QUFFM0MsaUZBQWdFO0FBQ2hFLDBEQUE0RDtBQUM1RCx3RUFBMEU7QUFDMUUscURBQXVEO0FBQ3ZEOzs7Ozs4REFLOEQ7QUFDOUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxpREFBZ0IsRUFBRSxDQUFDO0FBTXBDO0lBTUksd0JBQW9CLFNBQXFCO1FBQ3JDOztzRUFFOEQ7UUFIOUMsY0FBUyxHQUFULFNBQVMsQ0FBWTtRQUx6QyxVQUFLLEdBQVEsQ0FBQyxDQUFDO1FBQ1IsWUFBTyxHQUFHLElBQUksZUFBZSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV6RCxhQUFRLEdBQUMsRUFBRSxDQUFDO1FBQ1osWUFBTyxHQUFHLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQU1uRCxDQUFDO0lBQ0QscUNBQVksR0FBWjtRQUNJLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDVixLQUFLLEVBQUUsaUJBQWlCO1lBQ3hCLE9BQU8sRUFBRSxrRkFBa0YsR0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLDhDQUE4QztZQUN2SixZQUFZLEVBQUUsV0FBVztTQUM1QixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELDBDQUFpQixHQUFqQjtRQUNJLElBQU0sVUFBVSxHQUFrQixHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEQsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0k7O3NFQUU4RDtRQUM5RCxJQUFJLENBQUMsY0FBYyxFQUFFLENB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LENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUF2SlEsY0FBYztRQUwxQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE9BQU87WUFDakIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx3QkFBd0I7U0FDeEMsQ0FBQzt5Q0FPaUMsdUJBQVU7T0FOaEMsY0FBYyxDQXdKMUI7SUFBRCxxQkFBQztDQUFBLEFBeEpELElBd0pDO0FBeEpZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJhcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiO1xuaW1wb3J0IHsgV2ViU2VydmljZSB9IGZyb20gXCIuLi93cy5zZXJ2aWNlXCI7XG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7TG9hZGluZ0luZGljYXRvcn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCAqIGFzIG9ic2VydmFibGVBcnJheSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9nc1wiO1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiogQmVmb3JlIHlvdSBjYW4gbmF2aWdhdGUgdG8gdGhpcyBwYWdlIGZyb20geW91ciBhcHAsIHlvdSBuZWVkIHRvIHJlZmVyZW5jZSB0aGlzIHBhZ2UncyBtb2R1bGUgaW4gdGhlXG4qIGdsb2JhbCBhcHAgcm91dGVyIG1vZHVsZS4gQWRkIHRoZSBmb2xsb3dpbmcgb2JqZWN0IHRvIHRoZSBnbG9iYWwgYXJyYXkgb2Ygcm91dGVzOlxuKiB7IHBhdGg6IFwic2FsZG9cIiwgbG9hZENoaWxkcmVuOiBcIi4vc2FsZG8vc2FsZG8ubW9kdWxlI1NhbGRvTW9kdWxlXCIgfVxuKiBOb3RlIHRoYXQgdGhpcyBzaW1wbHkgcG9pbnRzIHRoZSBwYXRoIHRvIHRoZSBwYWdlIG1vZHVsZSBmaWxlLiBJZiB5b3UgbW92ZSB0aGUgcGFnZSwgeW91IG5lZWQgdG8gdXBkYXRlIHRoZSByb3V0ZSB0b28uXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xubGV0IGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJTYWxkb1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zYWxkby5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIFNhbGRvQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBzYWxkbzpudW1iZXI9MDtcbiAgICBwdWJsaWMgbXlJdGVtcyA9IG5ldyBvYnNlcnZhYmxlQXJyYXkuT2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgICBlbXByZXNhSWQ6c3RyaW5nO1xuICAgIGVtcHJlc2FzPVtdO1xuICAgIGlkdmFuZ28gPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnaWR2YW5nbycpO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbXlTZXJ2aWNlOiBXZWJTZXJ2aWNlKSB7XG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogVXNlIHRoZSBjb25zdHJ1Y3RvciB0byBpbmplY3QgYXBwIHNlcnZpY2VzIHRoYXQgeW91IG5lZWQgaW4gdGhpcyBjb21wb25lbnQuXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgICAgIFxuICAgIH1cbiAgICBhZ3JlZ2FyU2FsZG8oKXtcbiAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICB0aXRsZTogXCJDYXJnYSB0dSBjdWVudGFcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiUHVlZGVzIGFncmVnYXIgc2FsZG8gYSB0dSBjdWVudGEgaGFjaWVuZG8gdW4gcGFnbyBlbiBCYWxvdG8sIGNvbiBsYSByZWZlcmVuY2lhOiBcIit0aGlzLmlkdmFuZ28rXCIuIEF1dG9tw6F0aWNhbWVudGUgdmVyw6FzIHR1IHNhbGRvIGFjdHVhbGl6YWRvXCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiRW50ZW5kaWRvXCJcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj5hcHAuZ2V0Um9vdFZpZXcoKTtcbiAgICAgICAgc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogVXNlIHRoZSBcIm5nT25Jbml0XCIgaGFuZGxlciB0byBpbml0aWFsaXplIGRhdGEgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgICAgICB0aGlzLmNvbnN1bHRhckRhdG9zKCk7XG4gICAgfVxuICAgIGNvbnN1bHRhckRhdG9zKCl7XG4gICAgICAgIGxvYWRlci5zaG93KHtcbiAgICAgICAgICAgIG1lc3NhZ2U6J0NvbnN1bHRhbmRvIHR1IHNhbGRvIHkgdHJhbnNhY2Npb25lcydcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBpZFVzdWFyaW8gPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnaWRVc3VhcmlvJyk7XG4gICAgICAgIGxldCB1c3VhcmlvID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ2VtYWlsVXN1YXJpbycpO1xuICAgICAgICBsZXQgaWR2YW5nbyA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdpZHZhbmdvJyk7XG4gICAgICAgIGxldCBjZWR1bGEgPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnY2VkdWxhVXN1YXJpbycpO1xuICAgICAgICAvL2V0IGNlZHVsYSA9ICcxMDI0NDk0NjM0JztcbiAgICAgICAgbGV0IG5vbWJyZXMgPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnbm9tYnJlVXN1YXJpbycpO1xuICAgICAgICBpZihpZHZhbmdvICE9ICcwJyl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ29uIGlkbWVtYmVyOiAnK2lkdmFuZ28pO1xuICAgICAgICAgICAgdGhpcy5teVNlcnZpY2UuZ2V0U2FsZG8oaWR2YW5nbykuc3Vic2NyaWJlKChyZXN1bHQ6YW55KSA9PiB7XG4gICAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzdWx0YWRvIGRlbCBzYWxkbycpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgaWYocmVzdWx0LmJhbGFuY2Upe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNhbGRvPXJlc3VsdC5iYWxhbmNlKjE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgY29uc3VsdGFuZG8gc2FsZG8nKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vQ29uc3VsdGFyIGhpc3RvcmljbyBkZSB0cmFuc2FjY2lvbmVzXG4gICAgICAgICAgICB0aGlzLm15U2VydmljZS5nZXRUcmFuc2FjY2lvbmVzKGlkdmFuZ28pLnN1YnNjcmliZSgocmVzOmFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3VsdGFkbyBkZSBsYXMgdHJhbnNhY2Npb25lcycpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXMocmVzKS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm15SXRlbXMucHVzaChyZXNbaV0pOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy90aGlzLnNhbGRvPXJlc3VsdC5iYWxhbmNlKjE7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBjb25zdWx0YW5kbyBzYWxkbycpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NpbiBpZHZhbmdvJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuc2VsZWNjaW9uYXJFbXByZXNhKClcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZWxlY2Npb25hckVtcHJlc2EoKXtcbiAgICAgICAgbGV0IGlkVXN1YXJpbyA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdpZFVzdWFyaW8nKTtcbiAgICAgICAgbGV0IHVzdWFyaW8gPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnZW1haWxVc3VhcmlvJyk7XG4gICAgICAgIGxldCBpZHZhbmdvID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ2lkdmFuZ28nKTtcbiAgICAgICAgbGV0IGNlZHVsYSA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdjZWR1bGFVc3VhcmlvJyk7XG4gICAgICAgIC8vbGV0IGNlZHVsYSA9ICcxMDI0NDk0NjM0JztcbiAgICAgICAgbGV0IG5vbWJyZXMgPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnbm9tYnJlVXN1YXJpbycpO1xuICAgICAgICBsZXQgZW1wcmVzYXMgPSBbXTtcbiAgICAgICAgdGhpcy5teVNlcnZpY2UuZ2V0RW1wcmVzYXMoKS5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0xpc3RhZG8gZGUgZW1wcmVzYXMnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDxPYmplY3Qua2V5cyhyZXN1bHQpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbXByZXNhcy5wdXNoKHJlc3VsdFtpXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZW1wcmVzYXMpO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXModGhpcy5lbXByZXNhcykubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmVtcHJlc2FzW2ldKVxuICAgICAgICAgICAgICAgIGVtcHJlc2FzLnB1c2godGhpcy5lbXByZXNhc1tpXS5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRpYWxvZ3MuYWN0aW9uKHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlNlbGVjY2lvbmEgdHUgZW1wcmVzYVwiLFxuICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsYXJcIixcbiAgICAgICAgICAgICAgICBhY3Rpb25zOiBlbXByZXNhc1xuICAgICAgICAgICAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlbXByZXNhID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBsZXQgaWRFbXByZXNhO1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDxPYmplY3Qua2V5cyh0aGlzLmVtcHJlc2FzKS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5lbXByZXNhc1tpXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdD09dGhpcy5lbXByZXNhc1tpXS5uYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWRFbXByZXNhPXRoaXMuZW1wcmVzYXNbaV0udXNlcm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZihjZWR1bGEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jZWR1bGEsZW1haWwsbm9tYnJlLGVtcHJlc2EsaWRFbXByZXNhXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm15U2VydmljZS5nZXRJZFZhbmdvKGNlZHVsYSx1c3VhcmlvLG5vbWJyZXMsZW1wcmVzYSxpZEVtcHJlc2EpLnN1YnNjcmliZSgocmVzdWx0OmFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiaWR2YW5nb1wiLHJlc3VsdC5pZHZhbmdvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4aXRvSWRWYW5nbyhpZFVzdWFyaW8scmVzdWx0LmlkdmFuZ28pXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgZW4gZ2V0SWRWYW5nbycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgcmVzdWx0OiBcIiArIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgaWYocmVzdWx0ID09IFwiT3B0aW9uMVwiKXtcbiAgICAgICAgICAgICAgICAgICAgLy9EbyBhY3Rpb24xXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYocmVzdWx0ID09IFwiT3B0aW9uMlwiKXtcbiAgICAgICAgICAgICAgICAgICAgLy9EbyBhY3Rpb24yXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGNvbnN1bHRhbmRvIGVtcHJlc2FzOicpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgfVxuICAgIGV4aXRvSWRWYW5nbyhpZFVzdWFyaW8saWRWYW5nbykge1xuICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlbCBleGl0b0lkTWVtYmVyJyk7XG4gICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgIHRoaXMubXlTZXJ2aWNlLmFzaWduYXJJZFZhbmdvKGlkVXN1YXJpbyxpZFZhbmdvKS5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZSBhc2lnbmFjacOzbiBkZSBJRCBWYW5nbycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgIHRoaXMuY29uc3VsdGFyRGF0b3MoKTtcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgYXNpZ25hbmRvIGlkVmFuZ28nKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG59XG4iXX0=