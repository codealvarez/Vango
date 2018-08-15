"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var ws_service_1 = require("../ws.service");
var dialogs = require("ui/dialogs");
var ApplicationSettings = require("application-settings");
var observableArray = require("tns-core-modules/data/observable-array");
//Drawer
var app = require("application");
var DataItem = /** @class */ (function () {
    function DataItem(idviaje, idruta, nombreruta, conductor, placa, capacidad, disponibles, fecha_viaje, hora_viaje) {
        this.idviaje = idviaje;
        this.idruta = idruta;
        this.nombreruta = nombreruta;
        this.conductor = conductor;
        this.placa = placa;
        this.capacidad = capacidad;
        this.disponibles = disponibles;
        this.fecha_viaje = fecha_viaje;
        this.hora_viaje = hora_viaje;
    }
    return DataItem;
}());
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var DisponiblesComponent = /** @class */ (function () {
    function DisponiblesComponent(routerExtensions, myService) {
        this.routerExtensions = routerExtensions;
        this.myService = myService;
        //public myItems: ObservableArray<DataItem>;
        //public myItems: Array<DataItem>;
        this.myItems = new observableArray.ObservableArray([]);
        this.arrayItems = new observableArray.ObservableArray([]);
        /*this.myItems = [];
        this.counter = 0;
        for (var i = 0; i < 5; i++) {
            this.myItems.push(new DataItem(i, "Chicó","Aeropuerto","8:00AM","ABC-123",i+2));
            this.counter = i;
        }*/
    }
    DisponiblesComponent.prototype.onSubmit = function (args) {
        var searchBar = args.object;
        var searchValue = searchBar.text.toLowerCase();
        console.log('Buscando ' + searchValue);
        this.myItems = new observableArray.ObservableArray([]);
        if (searchValue !== "") {
            for (var i = 0; i < this.arrayItems.length; i++) {
                if (this.arrayItems.getItem(i).terminos.toLowerCase().indexOf(searchValue) !== -1) {
                    this.myItems.push(this.arrayItems.getItem(i));
                    console.log(this.arrayItems.getItem(i));
                }
            }
        }
    };
    DisponiblesComponent.prototype.onClear = function (args) {
        var _this = this;
        var searchBar = args.object;
        searchBar.text = "";
        searchBar.hint = "Busca por barrio o lugar";
        this.myItems = new observableArray.ObservableArray([]);
        this.arrayItems.forEach(function (item) {
            _this.myItems.push(item);
        });
    };
    DisponiblesComponent.prototype.onSearchLayoutLoaded = function (event) {
        if (event.object.android) {
            event.object.android.setFocusableInTouchMode(true);
        }
    };
    DisponiblesComponent.prototype.onSearchBarLoaded = function (event) {
        if (event.object.android) {
            event.object.android.clearFocus();
        }
    };
    DisponiblesComponent.prototype.onTextChanged = function (args) {
        var searchBar = args.object;
        console.log("SearchBar text changed! New value: " + searchBar.text);
    };
    DisponiblesComponent.prototype.irAtras = function () {
        this.routerExtensions.back();
    };
    DisponiblesComponent.prototype.onItemTap = function (args) {
        console.log(args);
        console.log("------------------------ ItemTapped: " + args.index);
    };
    DisponiblesComponent.prototype.ngOnInit = function () {
        var _this = this;
        var idUsuario = ApplicationSettings.getString('idUsuario');
        loader.show();
        this.myService.getRutasDisponibles(idUsuario).subscribe(function (res) {
            loader.hide();
            console.log('Respuesta de las rutas: ' + Object.keys(res).length);
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
    DisponiblesComponent.prototype.onGetDataError = function (error) {
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
    DisponiblesComponent.prototype.onDrawerButtonTap = function () {
        var sideDrawer = app.getRootView();
        sideDrawer.showDrawer();
    };
    DisponiblesComponent = __decorate([
        core_1.Component({
            selector: "Disponibles",
            moduleId: module.id,
            templateUrl: "./disponibles.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions, ws_service_1.WebService])
    ], DisponiblesComponent);
    return DisponiblesComponent;
}());
exports.DisponiblesComponent = DisponiblesComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcG9uaWJsZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlzcG9uaWJsZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtGO0FBQ2xGLHNEQUE2RDtBQUM3RCxpRkFBZ0U7QUFDaEUsNENBQTJDO0FBQzNDLG9DQUFzQztBQUN0QywwREFBNEQ7QUFDNUQsd0VBQTBFO0FBRTFFLFFBQVE7QUFDUixpQ0FBbUM7QUFLbkM7SUFDSSxrQkFBbUIsT0FBZSxFQUFTLE1BQWMsRUFBUyxVQUFpQixFQUFTLFNBQWlCLEVBQVMsS0FBWSxFQUFTLFNBQWdCLEVBQVMsV0FBa0IsRUFBUyxXQUFrQixFQUFRLFVBQWlCO1FBQXZOLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBTztRQUFTLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFPO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBTztRQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFPO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQU87UUFBUSxlQUFVLEdBQVYsVUFBVSxDQUFPO0lBQUksQ0FBQztJQUNuUCxlQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFDRCxJQUFJLE1BQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7QUFPcEM7SUFTSSw4QkFBb0IsZ0JBQWtDLEVBQVMsU0FBcUI7UUFBaEUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFTLGNBQVMsR0FBVCxTQUFTLENBQVk7UUFQcEYsNENBQTRDO1FBQzVDLGtDQUFrQztRQUMzQixZQUFPLEdBQUcsSUFBSSxlQUFlLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELGVBQVUsR0FBRSxJQUFJLGVBQWUsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFLdkQ7Ozs7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LFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDUCxLQUFLLEVBQUUsbUJBQW1CO1lBQzFCLE9BQU8sRUFBRSw4R0FBOEc7WUFDdkgsWUFBWSxFQUFFLElBQUk7U0FDckIsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUVsQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxnREFBaUIsR0FBakI7UUFDSSxJQUFNLFVBQVUsR0FBa0IsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BELFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBekdRLG9CQUFvQjtRQU5oQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGFBQWE7WUFDdkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDbEQsQ0FBQzt5Q0FVd0MseUJBQWdCLEVBQW9CLHVCQUFVO09BVDNFLG9CQUFvQixDQTBHaEM7SUFBRCwyQkFBQztDQUFBLEFBMUdELElBMEdDO0FBMUdZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge0xvYWRpbmdJbmRpY2F0b3J9IGZyb20gXCJuYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3JcIjtcbmltcG9ydCB7IFdlYlNlcnZpY2UgfSBmcm9tIFwiLi4vd3Muc2VydmljZVwiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCAqIGFzIG9ic2VydmFibGVBcnJheSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcblxuLy9EcmF3ZXJcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwiYXBwbGljYXRpb25cIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXJcIjtcblxuaW1wb3J0IHsgU2VhcmNoQmFyIH0gZnJvbSBcInVpL3NlYXJjaC1iYXJcIjtcblxuY2xhc3MgRGF0YUl0ZW0geyBcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaWR2aWFqZTogc3RyaW5nLCBwdWJsaWMgaWRydXRhOiBzdHJpbmcsIHB1YmxpYyBub21icmVydXRhOnN0cmluZywgcHVibGljIGNvbmR1Y3Rvcjogc3RyaW5nLCBwdWJsaWMgcGxhY2E6c3RyaW5nLCBwdWJsaWMgY2FwYWNpZGFkOm51bWJlciwgcHVibGljIGRpc3BvbmlibGVzOm51bWJlciwgcHVibGljIGZlY2hhX3ZpYWplOm51bWJlcixwdWJsaWMgaG9yYV92aWFqZTpudW1iZXIpIHsgfVxufVxudmFyIGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJEaXNwb25pYmxlc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9kaXNwb25pYmxlcy5jb21wb25lbnQuaHRtbFwiLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIERpc3BvbmlibGVzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIC8vcHVibGljIG15SXRlbXM6IE9ic2VydmFibGVBcnJheTxEYXRhSXRlbT47XG4gICAgLy9wdWJsaWMgbXlJdGVtczogQXJyYXk8RGF0YUl0ZW0+O1xuICAgIHB1YmxpYyBteUl0ZW1zID0gbmV3IG9ic2VydmFibGVBcnJheS5PYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgIHB1YmxpYyBhcnJheUl0ZW1zPSBuZXcgb2JzZXJ2YWJsZUFycmF5Lk9ic2VydmFibGVBcnJheShbXSk7XG4gICAgcHJpdmF0ZSBjb3VudGVyOiBudW1iZXI7XG4gICAgcHVibGljIHNlYXJjaFBocmFzZTpzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMscHJpdmF0ZSBteVNlcnZpY2U6IFdlYlNlcnZpY2UpIHtcbiAgICAgICAgLyp0aGlzLm15SXRlbXMgPSBbXTtcbiAgICAgICAgdGhpcy5jb3VudGVyID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMubXlJdGVtcy5wdXNoKG5ldyBEYXRhSXRlbShpLCBcIkNoaWPDs1wiLFwiQWVyb3B1ZXJ0b1wiLFwiODowMEFNXCIsXCJBQkMtMTIzXCIsaSsyKSk7XG4gICAgICAgICAgICB0aGlzLmNvdW50ZXIgPSBpO1xuICAgICAgICB9Ki9cbiAgICB9XG5cbiAgICBwdWJsaWMgb25TdWJtaXQoYXJncykge1xuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgbGV0IHNlYXJjaFZhbHVlID0gc2VhcmNoQmFyLnRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBjb25zb2xlLmxvZygnQnVzY2FuZG8gJytzZWFyY2hWYWx1ZSk7XG4gICAgICAgIHRoaXMubXlJdGVtcyA9IG5ldyBvYnNlcnZhYmxlQXJyYXkuT2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgICAgICAgaWYgKHNlYXJjaFZhbHVlICE9PSBcIlwiKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYXJyYXlJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFycmF5SXRlbXMuZ2V0SXRlbShpKS50ZXJtaW5vcy50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoVmFsdWUpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm15SXRlbXMucHVzaCh0aGlzLmFycmF5SXRlbXMuZ2V0SXRlbShpKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYXJyYXlJdGVtcy5nZXRJdGVtKGkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IFxuICAgICAgICB9XG4gICAgfVxuICAgIG9uQ2xlYXIoYXJncyl7XG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBzZWFyY2hCYXIudGV4dCA9IFwiXCI7XG4gICAgICAgIHNlYXJjaEJhci5oaW50ID0gXCJCdXNjYSBwb3IgYmFycmlvIG8gbHVnYXJcIjtcblxuICAgICAgICB0aGlzLm15SXRlbXMgPSBuZXcgb2JzZXJ2YWJsZUFycmF5Lk9ic2VydmFibGVBcnJheShbXSk7XG4gICAgICAgIHRoaXMuYXJyYXlJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgdGhpcy5teUl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuICAgIG9uU2VhcmNoTGF5b3V0TG9hZGVkKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5vYmplY3QuYW5kcm9pZCkge1xuICAgICAgICAgICAgZXZlbnQub2JqZWN0LmFuZHJvaWQuc2V0Rm9jdXNhYmxlSW5Ub3VjaE1vZGUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25TZWFyY2hCYXJMb2FkZWQoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50Lm9iamVjdC5hbmRyb2lkKSB7XG4gICAgICAgICAgICBldmVudC5vYmplY3QuYW5kcm9pZC5jbGVhckZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25UZXh0Q2hhbmdlZChhcmdzKSB7XG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNlYXJjaEJhciB0ZXh0IGNoYW5nZWQhIE5ldyB2YWx1ZTogXCIgKyBzZWFyY2hCYXIudGV4dCk7XG4gICAgfVxuXG4gICAgaXJBdHJhcygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25JdGVtVGFwKGFyZ3MpIHtcbiAgICAgICAgY29uc29sZS5sb2coYXJncyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEl0ZW1UYXBwZWQ6IFwiICsgYXJncy5pbmRleCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGxldCBpZFVzdWFyaW8gPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnaWRVc3VhcmlvJyk7XG4gICAgICAgIGxvYWRlci5zaG93KCk7XG4gICAgICAgIHRoaXMubXlTZXJ2aWNlLmdldFJ1dGFzRGlzcG9uaWJsZXMoaWRVc3VhcmlvKS5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGUgbGFzIHJ1dGFzOiAnK09iamVjdC5rZXlzKHJlcykubGVuZ3RoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlcykpO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXMocmVzKS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlJdGVtcy5wdXNoKHJlc1tpXSk7IFxuICAgICAgICAgICAgICAgIHRoaXMubXlJdGVtcy5wdXNoKHJlc1tpXSk7IFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICAgICAgdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwcml2YXRlIG9uR2V0RGF0YUVycm9yKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xuICAgICAgICBsb2FkZXIuaGlkZSgpO1xuICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlIGVycm9yJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgXHRkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiAnRXJyb3IgZGUgY29uZXhpw7NuJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiTG8gc2VudGltb3MsIGh1Ym8gdW4gcHJvYmxlbWEgZW5jb250cmFuZG8gZWwgc2Vydmlkb3IsIHZlcmlmaWNhIHR1IGNvbmV4acOzbiBhIEludGVybmV0IGUgaW50ZW50YSBudWV2YW1lbnRlLlwiLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiAnT2snXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkRyYXdlckJ1dHRvblRhcCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc2lkZURyYXdlciA9IDxSYWRTaWRlRHJhd2VyPmFwcC5nZXRSb290VmlldygpO1xuICAgICAgICBzaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcbiAgICB9XG59XG4iXX0=