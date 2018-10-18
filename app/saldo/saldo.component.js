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
                        _this.myService.getIdVango(cedula, usuario, nombres, empresa, idEmpresa, '', '').subscribe(function (result) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZG8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2FsZG8uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELGlDQUFtQztBQUVuQyw0Q0FBMkM7QUFFM0MsaUZBQWdFO0FBQ2hFLDBEQUE0RDtBQUM1RCx3RUFBMEU7QUFDMUUscURBQXVEO0FBQ3ZEOzs7Ozs4REFLOEQ7QUFDOUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxpREFBZ0IsRUFBRSxDQUFDO0FBTXBDO0lBTUksd0JBQW9CLFNBQXFCO1FBQ3JDOztzRUFFOEQ7UUFIOUMsY0FBUyxHQUFULFNBQVMsQ0FBWTtRQUx6QyxVQUFLLEdBQVEsQ0FBQyxDQUFDO1FBQ1IsWUFBTyxHQUFHLElBQUksZUFBZSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV6RCxhQUFRLEdBQUMsRUFBRSxDQUFDO1FBQ1osWUFBTyxHQUFHLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQU1uRCxDQUFDO0lBQ0QscUNBQVksR0FBWjtRQUNJLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDVixLQUFLLEVBQUUsaUJBQWlCO1lBQ3hCLE9BQU8sRUFBRSxrRkFBa0YsR0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLDhDQUE4QztZQUN2SixZQUFZLEVBQUUsV0FBVztTQUM1QixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELDBDQUFpQixHQUFqQjtRQUNJLElBQU0sVUFBVSxHQUFrQixHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEQsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0k7O3NFQUU4RDtRQUM5RCxJQUFJLENBQUMsY0FBYyxFQUFFLENB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QUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQXZKUSxjQUFjO1FBTDFCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsT0FBTztZQUNqQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtTQUN4QyxDQUFDO3lDQU9pQyx1QkFBVTtPQU5oQyxjQUFjLENBd0oxQjtJQUFELHFCQUFDO0NBQUEsQUF4SkQsSUF3SkM7QUF4Slksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyXCI7XG5pbXBvcnQgeyBXZWJTZXJ2aWNlIH0gZnJvbSBcIi4uL3dzLnNlcnZpY2VcIjtcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHtMb2FkaW5nSW5kaWNhdG9yfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7XG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0ICogYXMgb2JzZXJ2YWJsZUFycmF5IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzXCI7XG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBCZWZvcmUgeW91IGNhbiBuYXZpZ2F0ZSB0byB0aGlzIHBhZ2UgZnJvbSB5b3VyIGFwcCwgeW91IG5lZWQgdG8gcmVmZXJlbmNlIHRoaXMgcGFnZSdzIG1vZHVsZSBpbiB0aGVcbiogZ2xvYmFsIGFwcCByb3V0ZXIgbW9kdWxlLiBBZGQgdGhlIGZvbGxvd2luZyBvYmplY3QgdG8gdGhlIGdsb2JhbCBhcnJheSBvZiByb3V0ZXM6XG4qIHsgcGF0aDogXCJzYWxkb1wiLCBsb2FkQ2hpbGRyZW46IFwiLi9zYWxkby9zYWxkby5tb2R1bGUjU2FsZG9Nb2R1bGVcIiB9XG4qIE5vdGUgdGhhdCB0aGlzIHNpbXBseSBwb2ludHMgdGhlIHBhdGggdG8gdGhlIHBhZ2UgbW9kdWxlIGZpbGUuIElmIHlvdSBtb3ZlIHRoZSBwYWdlLCB5b3UgbmVlZCB0byB1cGRhdGUgdGhlIHJvdXRlIHRvby5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5sZXQgbG9hZGVyID0gbmV3IExvYWRpbmdJbmRpY2F0b3IoKTtcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIlNhbGRvXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3NhbGRvLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgU2FsZG9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHNhbGRvOm51bWJlcj0wO1xuICAgIHB1YmxpYyBteUl0ZW1zID0gbmV3IG9ic2VydmFibGVBcnJheS5PYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgIGVtcHJlc2FJZDpzdHJpbmc7XG4gICAgZW1wcmVzYXM9W107XG4gICAgaWR2YW5nbyA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdpZHZhbmdvJyk7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBteVNlcnZpY2U6IFdlYlNlcnZpY2UpIHtcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBVc2UgdGhlIGNvbnN0cnVjdG9yIHRvIGluamVjdCBhcHAgc2VydmljZXMgdGhhdCB5b3UgbmVlZCBpbiB0aGlzIGNvbXBvbmVudC5cbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAgICAgXG4gICAgfVxuICAgIGFncmVnYXJTYWxkbygpe1xuICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkNhcmdhIHR1IGN1ZW50YVwiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJQdWVkZXMgYWdyZWdhciBzYWxkbyBhIHR1IGN1ZW50YSBoYWNpZW5kbyB1biBwYWdvIGVuIEJhbG90bywgY29uIGxhIHJlZmVyZW5jaWE6IFwiK3RoaXMuaWR2YW5nbytcIi4gQXV0b23DoXRpY2FtZW50ZSB2ZXLDoXMgdHUgc2FsZG8gYWN0dWFsaXphZG9cIixcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJFbnRlbmRpZG9cIlxuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvbkRyYXdlckJ1dHRvblRhcCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc2lkZURyYXdlciA9IDxSYWRTaWRlRHJhd2VyPmFwcC5nZXRSb290VmlldygpO1xuICAgICAgICBzaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBVc2UgdGhlIFwibmdPbkluaXRcIiBoYW5kbGVyIHRvIGluaXRpYWxpemUgZGF0YSBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgICAgIHRoaXMuY29uc3VsdGFyRGF0b3MoKTtcbiAgICB9XG4gICAgY29uc3VsdGFyRGF0b3MoKXtcbiAgICAgICAgbG9hZGVyLnNob3coe1xuICAgICAgICAgICAgbWVzc2FnZTonQ29uc3VsdGFuZG8gdHUgc2FsZG8geSB0cmFuc2FjY2lvbmVzJ1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGlkVXN1YXJpbyA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdpZFVzdWFyaW8nKTtcbiAgICAgICAgbGV0IHVzdWFyaW8gPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnZW1haWxVc3VhcmlvJyk7XG4gICAgICAgIGxldCBpZHZhbmdvID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ2lkdmFuZ28nKTtcbiAgICAgICAgbGV0IGNlZHVsYSA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdjZWR1bGFVc3VhcmlvJyk7XG4gICAgICAgIC8vZXQgY2VkdWxhID0gJzEwMjQ0OTQ2MzQnO1xuICAgICAgICBsZXQgbm9tYnJlcyA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdub21icmVVc3VhcmlvJyk7XG4gICAgICAgIGlmKGlkdmFuZ28gIT0gJzAnKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb24gaWRtZW1iZXI6ICcraWR2YW5nbyk7XG4gICAgICAgICAgICB0aGlzLm15U2VydmljZS5nZXRTYWxkbyhpZHZhbmdvKS5zdWJzY3JpYmUoKHJlc3VsdDphbnkpID0+IHtcbiAgICAgICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXN1bHRhZG8gZGVsIHNhbGRvJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICBpZihyZXN1bHQuYmFsYW5jZSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2FsZG89cmVzdWx0LmJhbGFuY2UqMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBjb25zdWx0YW5kbyBzYWxkbycpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy9Db25zdWx0YXIgaGlzdG9yaWNvIGRlIHRyYW5zYWNjaW9uZXNcbiAgICAgICAgICAgIHRoaXMubXlTZXJ2aWNlLmdldFRyYW5zYWNjaW9uZXMoaWR2YW5nbykuc3Vic2NyaWJlKChyZXM6YW55KSA9PiB7XG4gICAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzdWx0YWRvIGRlIGxhcyB0cmFuc2FjY2lvbmVzJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDxPYmplY3Qua2V5cyhyZXMpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXlJdGVtcy5wdXNoKHJlc1tpXSk7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL3RoaXMuc2FsZG89cmVzdWx0LmJhbGFuY2UqMTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGNvbnN1bHRhbmRvIHNhbGRvJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU2luIGlkdmFuZ28nKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5zZWxlY2Npb25hckVtcHJlc2EoKVxuICAgICAgICB9XG4gICAgfVxuICAgIHNlbGVjY2lvbmFyRW1wcmVzYSgpe1xuICAgICAgICBsZXQgaWRVc3VhcmlvID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ2lkVXN1YXJpbycpO1xuICAgICAgICBsZXQgdXN1YXJpbyA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdlbWFpbFVzdWFyaW8nKTtcbiAgICAgICAgbGV0IGlkdmFuZ28gPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnaWR2YW5nbycpO1xuICAgICAgICBsZXQgY2VkdWxhID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ2NlZHVsYVVzdWFyaW8nKTtcbiAgICAgICAgLy9sZXQgY2VkdWxhID0gJzEwMjQ0OTQ2MzQnO1xuICAgICAgICBsZXQgbm9tYnJlcyA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdub21icmVVc3VhcmlvJyk7XG4gICAgICAgIGxldCBlbXByZXNhcyA9IFtdO1xuICAgICAgICB0aGlzLm15U2VydmljZS5nZXRFbXByZXNhcygpLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTGlzdGFkbyBkZSBlbXByZXNhcycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPE9iamVjdC5rZXlzKHJlc3VsdCkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtcHJlc2FzLnB1c2gocmVzdWx0W2ldKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5lbXByZXNhcyk7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDxPYmplY3Qua2V5cyh0aGlzLmVtcHJlc2FzKS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZW1wcmVzYXNbaV0pXG4gICAgICAgICAgICAgICAgZW1wcmVzYXMucHVzaCh0aGlzLmVtcHJlc2FzW2ldLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGlhbG9ncy5hY3Rpb24oe1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiU2VsZWNjaW9uYSB0dSBlbXByZXNhXCIsXG4gICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxhclwiLFxuICAgICAgICAgICAgICAgIGFjdGlvbnM6IGVtcHJlc2FzXG4gICAgICAgICAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVtcHJlc2EgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpZEVtcHJlc2E7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPE9iamVjdC5rZXlzKHRoaXMuZW1wcmVzYXMpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmVtcHJlc2FzW2ldKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0PT10aGlzLmVtcHJlc2FzW2ldLm5hbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZEVtcHJlc2E9dGhpcy5lbXByZXNhc1tpXS51c2VybmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKGNlZHVsYSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NlZHVsYSxlbWFpbCxub21icmUsZW1wcmVzYSxpZEVtcHJlc2FcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubXlTZXJ2aWNlLmdldElkVmFuZ28oY2VkdWxhLHVzdWFyaW8sbm9tYnJlcyxlbXByZXNhLGlkRW1wcmVzYSwnJywnJykuc3Vic2NyaWJlKChyZXN1bHQ6YW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJpZHZhbmdvXCIscmVzdWx0LmlkdmFuZ28pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhpdG9JZFZhbmdvKGlkVXN1YXJpbyxyZXN1bHQuaWR2YW5nbylcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBlbiBnZXRJZFZhbmdvJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyByZXN1bHQ6IFwiICsgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICBpZihyZXN1bHQgPT0gXCJPcHRpb24xXCIpe1xuICAgICAgICAgICAgICAgICAgICAvL0RvIGFjdGlvbjFcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihyZXN1bHQgPT0gXCJPcHRpb24yXCIpe1xuICAgICAgICAgICAgICAgICAgICAvL0RvIGFjdGlvbjJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgY29uc3VsdGFuZG8gZW1wcmVzYXM6Jyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICB9XG4gICAgZXhpdG9JZFZhbmdvKGlkVXN1YXJpbyxpZFZhbmdvKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGVsIGV4aXRvSWRNZW1iZXInKTtcbiAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgdGhpcy5teVNlcnZpY2UuYXNpZ25hcklkVmFuZ28oaWRVc3VhcmlvLGlkVmFuZ28pLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlIGFzaWduYWNpw7NuIGRlIElEIFZhbmdvJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgdGhpcy5jb25zdWx0YXJEYXRvcygpO1xuICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBhc2lnbmFuZG8gaWRWYW5nbycpO1xuICAgICAgICB9KTtcblxuICAgIH1cbn1cbiJdfQ==