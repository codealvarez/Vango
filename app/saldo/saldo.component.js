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
        __metadata("design:paramtypes", [router_1.RouterExtensions, ws_service_1.WebService])
    ], SaldoComponent);
    return SaldoComponent;
}());
exports.SaldoComponent = SaldoComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZG8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2FsZG8uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELGlDQUFtQztBQUVuQyw0Q0FBMkM7QUFDM0Msc0RBQTZEO0FBQzdELGlGQUFnRTtBQUNoRSwwREFBNEQ7QUFDNUQsd0VBQTBFO0FBQzFFLHFEQUF1RDtBQUV2RDs7Ozs7OERBSzhEO0FBQzlELElBQUksTUFBTSxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztBQU1wQztJQU1JLHdCQUFvQixnQkFBa0MsRUFBUyxTQUFxQjtRQUNoRjs7c0VBRThEO1FBSDlDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFZO1FBTHBGLFVBQUssR0FBUSxDQUFDLENBQUM7UUFDUixZQUFPLEdBQUcsSUFBSSxlQUFlLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXpELGFBQVEsR0FBQyxFQUFFLENBQUM7UUFDWixZQUFPLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBTW5ELENBQUM7SUFDRCxxQ0FBWSxHQUFaO1FBQ0k7Ozs7OzthQU1LO1FBQ0wsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFFckQsQ0FBQztJQUNELDBDQUFpQixHQUFqQjtRQUNJLElBQU0sVUFBVSxHQUFrQixHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEQsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0k7O3NFQUU4RDtRQUM5RCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUNELHVDQUFjLEdBQWQ7UUFBQSxpQkE2Q0M7UUE1Q0csTUFBTSxDQUFDLElBQUksQ0FBQztZQUNSLE9BQU8s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SUFBSSxTQUFTLEVBQUM7b0JBQ3pCLFlBQVk7aUJBQ2Y7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsRUFBRSxVQUFDLEtBQUs7WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFDRCxxQ0FBWSxHQUFaLFVBQWEsU0FBUyxFQUFDLE9BQU87UUFBOUIsaUJBV0M7UUFWRyxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLE1BQU07WUFDOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1lBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEIsS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzFCLENBQUMsRUFBRSxVQUFDLEtBQUs7WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBekpRLGNBQWM7UUFMMUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsd0JBQXdCO1NBQ3hDLENBQUM7eUNBT3dDLHlCQUFnQixFQUFvQix1QkFBVTtPQU4zRSxjQUFjLENBMEoxQjtJQUFELHFCQUFDO0NBQUEsQUExSkQsSUEwSkM7QUExSlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyXCI7XG5pbXBvcnQgeyBXZWJTZXJ2aWNlIH0gZnJvbSBcIi4uL3dzLnNlcnZpY2VcIjtcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHtMb2FkaW5nSW5kaWNhdG9yfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7XG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0ICogYXMgb2JzZXJ2YWJsZUFycmF5IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzXCI7XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qIEJlZm9yZSB5b3UgY2FuIG5hdmlnYXRlIHRvIHRoaXMgcGFnZSBmcm9tIHlvdXIgYXBwLCB5b3UgbmVlZCB0byByZWZlcmVuY2UgdGhpcyBwYWdlJ3MgbW9kdWxlIGluIHRoZVxuKiBnbG9iYWwgYXBwIHJvdXRlciBtb2R1bGUuIEFkZCB0aGUgZm9sbG93aW5nIG9iamVjdCB0byB0aGUgZ2xvYmFsIGFycmF5IG9mIHJvdXRlczpcbiogeyBwYXRoOiBcInNhbGRvXCIsIGxvYWRDaGlsZHJlbjogXCIuL3NhbGRvL3NhbGRvLm1vZHVsZSNTYWxkb01vZHVsZVwiIH1cbiogTm90ZSB0aGF0IHRoaXMgc2ltcGx5IHBvaW50cyB0aGUgcGF0aCB0byB0aGUgcGFnZSBtb2R1bGUgZmlsZS4gSWYgeW91IG1vdmUgdGhlIHBhZ2UsIHlvdSBuZWVkIHRvIHVwZGF0ZSB0aGUgcm91dGUgdG9vLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmxldCBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiU2FsZG9cIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc2FsZG8uY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBTYWxkb0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgc2FsZG86bnVtYmVyPTA7XG4gICAgcHVibGljIG15SXRlbXMgPSBuZXcgb2JzZXJ2YWJsZUFycmF5Lk9ic2VydmFibGVBcnJheShbXSk7XG4gICAgZW1wcmVzYUlkOnN0cmluZztcbiAgICBlbXByZXNhcz1bXTtcbiAgICBpZHZhbmdvID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ2lkdmFuZ28nKTtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMscHJpdmF0ZSBteVNlcnZpY2U6IFdlYlNlcnZpY2UpIHtcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBVc2UgdGhlIGNvbnN0cnVjdG9yIHRvIGluamVjdCBhcHAgc2VydmljZXMgdGhhdCB5b3UgbmVlZCBpbiB0aGlzIGNvbXBvbmVudC5cbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAgICAgXG4gICAgfVxuICAgIGFncmVnYXJTYWxkbygpe1xuICAgICAgICAvKmRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgdGl0bGU6IFwiQ2FyZ2EgdHUgY3VlbnRhXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIlB1ZWRlcyBhZ3JlZ2FyIHNhbGRvIGEgdHUgY3VlbnRhIGhhY2llbmRvIHVuIHBhZ28gZW4gQmFsb3RvLCBjb24gbGEgcmVmZXJlbmNpYTogXCIrdGhpcy5pZHZhbmdvK1wiLiBBdXRvbcOhdGljYW1lbnRlIHZlcsOhcyB0dSBzYWxkbyBhY3R1YWxpemFkb1wiLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIkVudGVuZGlkb1wiXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgfSk7Ki9cbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9pbmZvUmVjYXJnYVwiXSk7XG5cbiAgICB9XG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj5hcHAuZ2V0Um9vdFZpZXcoKTtcbiAgICAgICAgc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICogVXNlIHRoZSBcIm5nT25Jbml0XCIgaGFuZGxlciB0byBpbml0aWFsaXplIGRhdGEgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgICAgICB0aGlzLmNvbnN1bHRhckRhdG9zKCk7XG4gICAgfVxuICAgIGNvbnN1bHRhckRhdG9zKCl7XG4gICAgICAgIGxvYWRlci5zaG93KHtcbiAgICAgICAgICAgIG1lc3NhZ2U6J0NvbnN1bHRhbmRvIHR1IHNhbGRvIHkgdHJhbnNhY2Npb25lcydcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBpZFVzdWFyaW8gPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnaWRVc3VhcmlvJyk7XG4gICAgICAgIGxldCB1c3VhcmlvID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ2VtYWlsVXN1YXJpbycpO1xuICAgICAgICBsZXQgaWR2YW5nbyA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdpZHZhbmdvJyk7XG4gICAgICAgIGxldCBjZWR1bGEgPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnY2VkdWxhVXN1YXJpbycpO1xuICAgICAgICAvL2V0IGNlZHVsYSA9ICcxMDI0NDk0NjM0JztcbiAgICAgICAgbGV0IG5vbWJyZXMgPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnbm9tYnJlVXN1YXJpbycpO1xuICAgICAgICBpZihpZHZhbmdvICE9ICcwJyl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ29uIGlkbWVtYmVyOiAnK2lkdmFuZ28pO1xuICAgICAgICAgICAgdGhpcy5teVNlcnZpY2UuZ2V0U2FsZG8oaWR2YW5nbykuc3Vic2NyaWJlKChyZXN1bHQ6YW55KSA9PiB7XG4gICAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzdWx0YWRvIGRlbCBzYWxkbycpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgaWYocmVzdWx0LmJhbGFuY2Upe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNhbGRvPXJlc3VsdC5iYWxhbmNlKjE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgY29uc3VsdGFuZG8gc2FsZG8nKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vQ29uc3VsdGFyIGhpc3RvcmljbyBkZSB0cmFuc2FjY2lvbmVzXG4gICAgICAgICAgICB0aGlzLm15U2VydmljZS5nZXRUcmFuc2FjY2lvbmVzKGlkdmFuZ28pLnN1YnNjcmliZSgocmVzOmFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3VsdGFkbyBkZSBsYXMgdHJhbnNhY2Npb25lcycpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXMocmVzKS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm15SXRlbXMucHVzaChyZXNbaV0pOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy90aGlzLnNhbGRvPXJlc3VsdC5iYWxhbmNlKjE7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBjb25zdWx0YW5kbyBzYWxkbycpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NpbiBpZHZhbmdvJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuc2VsZWNjaW9uYXJFbXByZXNhKClcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZWxlY2Npb25hckVtcHJlc2EoKXtcbiAgICAgICAgbGV0IGlkVXN1YXJpbyA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdpZFVzdWFyaW8nKTtcbiAgICAgICAgbGV0IHVzdWFyaW8gPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnZW1haWxVc3VhcmlvJyk7XG4gICAgICAgIGxldCBpZHZhbmdvID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ2lkdmFuZ28nKTtcbiAgICAgICAgbGV0IGNlZHVsYSA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKCdjZWR1bGFVc3VhcmlvJyk7XG4gICAgICAgIC8vbGV0IGNlZHVsYSA9ICcxMDI0NDk0NjM0JztcbiAgICAgICAgbGV0IG5vbWJyZXMgPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnbm9tYnJlVXN1YXJpbycpO1xuICAgICAgICBsZXQgZW1wcmVzYXMgPSBbXTtcbiAgICAgICAgdGhpcy5teVNlcnZpY2UuZ2V0RW1wcmVzYXMoKS5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0xpc3RhZG8gZGUgZW1wcmVzYXMnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDxPYmplY3Qua2V5cyhyZXN1bHQpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbXByZXNhcy5wdXNoKHJlc3VsdFtpXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZW1wcmVzYXMpO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXModGhpcy5lbXByZXNhcykubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmVtcHJlc2FzW2ldKVxuICAgICAgICAgICAgICAgIGVtcHJlc2FzLnB1c2godGhpcy5lbXByZXNhc1tpXS5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRpYWxvZ3MuYWN0aW9uKHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlNlbGVjY2lvbmEgdHUgZW1wcmVzYVwiLFxuICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsYXJcIixcbiAgICAgICAgICAgICAgICBhY3Rpb25zOiBlbXByZXNhc1xuICAgICAgICAgICAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlbXByZXNhID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBsZXQgaWRFbXByZXNhO1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDxPYmplY3Qua2V5cyh0aGlzLmVtcHJlc2FzKS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5lbXByZXNhc1tpXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdD09dGhpcy5lbXByZXNhc1tpXS5uYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWRFbXByZXNhPXRoaXMuZW1wcmVzYXNbaV0udXNlcm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZihjZWR1bGEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jZWR1bGEsZW1haWwsbm9tYnJlLGVtcHJlc2EsaWRFbXByZXNhXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm15U2VydmljZS5nZXRJZFZhbmdvKGNlZHVsYSx1c3VhcmlvLG5vbWJyZXMsZW1wcmVzYSxpZEVtcHJlc2EsJycsJycpLnN1YnNjcmliZSgocmVzdWx0OmFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiaWR2YW5nb1wiLHJlc3VsdC5pZHZhbmdvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4aXRvSWRWYW5nbyhpZFVzdWFyaW8scmVzdWx0LmlkdmFuZ28pXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgZW4gZ2V0SWRWYW5nbycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgcmVzdWx0OiBcIiArIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgaWYocmVzdWx0ID09IFwiT3B0aW9uMVwiKXtcbiAgICAgICAgICAgICAgICAgICAgLy9EbyBhY3Rpb24xXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYocmVzdWx0ID09IFwiT3B0aW9uMlwiKXtcbiAgICAgICAgICAgICAgICAgICAgLy9EbyBhY3Rpb24yXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGNvbnN1bHRhbmRvIGVtcHJlc2FzOicpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgfVxuICAgIGV4aXRvSWRWYW5nbyhpZFVzdWFyaW8saWRWYW5nbykge1xuICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlbCBleGl0b0lkTWVtYmVyJyk7XG4gICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgIHRoaXMubXlTZXJ2aWNlLmFzaWduYXJJZFZhbmdvKGlkVXN1YXJpbyxpZFZhbmdvKS5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZSBhc2lnbmFjacOzbiBkZSBJRCBWYW5nbycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgIHRoaXMuY29uc3VsdGFyRGF0b3MoKTtcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgYXNpZ25hbmRvIGlkVmFuZ28nKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG59XG4iXX0=