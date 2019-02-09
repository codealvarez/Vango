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
        this.encontrados = false;
        /*this.myItems = [];
        this.counter = 0;
        for (var i = 0; i < 5; i++) {
            this.myItems.push(new DataItem(i, "Chicó","Aeropuerto","8:00AM","ABC-123",i+2));
            this.counter = i;
        }*/
    }
    DisponiblesComponent.prototype.onSubmit = function (args) {
        var model = this;
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
        if (model.myItems.length > 0) {
            model.encontrados = true;
        }
        else {
            model.encontrados = false;
        }
    };
    DisponiblesComponent.prototype.onClear = function (args) {
        var model = this;
        var searchBar = args.object;
        searchBar.text = "";
        searchBar.hint = "Busca por barrio o lugar";
        model.myItems = new observableArray.ObservableArray([]);
        model.arrayItems.forEach(function (item) {
            model.myItems.push(item);
        });
        if (model.myItems.length > 0) {
            model.encontrados = true;
        }
        else {
            model.encontrados = false;
        }
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
        var model = this;
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
            if (model.myItems.length > 0) {
                model.encontrados = true;
            }
            else {
                model.encontrados = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcG9uaWJsZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlzcG9uaWJsZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtGO0FBQ2xGLHNEQUE2RDtBQUM3RCxpRkFBZ0U7QUFDaEUsNENBQTJDO0FBQzNDLG9DQUFzQztBQUN0QywwREFBNEQ7QUFDNUQsd0VBQTBFO0FBRTFFLFFBQVE7QUFDUixpQ0FBbUM7QUFLbkM7SUFDSSxrQkFBbUIsT0FBZSxFQUFTLE1BQWMsRUFBUyxVQUFpQixFQUFTLFNBQWlCLEVBQVMsS0FBWSxFQUFTLFNBQWdCLEVBQVMsV0FBa0IsRUFBUyxXQUFrQixFQUFRLFVBQWlCO1FBQXZOLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBTztRQUFTLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFPO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBTztRQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFPO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQU87UUFBUSxlQUFVLEdBQVYsVUFBVSxDQUFPO0lBQUksQ0FBQztJQUNuUCxlQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFDRCxJQUFJLE1BQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7QUFPcEM7SUFVSSw4QkFBb0IsZ0JBQWtDLEVBQVMsU0FBcUI7UUFBaEUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFTLGNBQVMsR0FBVCxTQUFTLENBQVk7UUFScEYsNENBQTRDO1FBQzVDLGtDQUFrQztRQUMzQixZQUFPLEdBQUcsSUFBSSxlQUFlLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELGVBQVUsR0FBRSxJQUFJLGVBQWUsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFHcEQsZ0JB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LENBK0hoQztJQUFELDJCQUFDO0NBQUEsQUEvSEQsSUErSEM7QUEvSFksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7TG9hZGluZ0luZGljYXRvcn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xuaW1wb3J0IHsgV2ViU2VydmljZSB9IGZyb20gXCIuLi93cy5zZXJ2aWNlXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0ICogYXMgb2JzZXJ2YWJsZUFycmF5IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuXG4vL0RyYXdlclxuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJhcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiO1xuXG5pbXBvcnQgeyBTZWFyY2hCYXIgfSBmcm9tIFwidWkvc2VhcmNoLWJhclwiO1xuXG5jbGFzcyBEYXRhSXRlbSB7IFxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpZHZpYWplOiBzdHJpbmcsIHB1YmxpYyBpZHJ1dGE6IHN0cmluZywgcHVibGljIG5vbWJyZXJ1dGE6c3RyaW5nLCBwdWJsaWMgY29uZHVjdG9yOiBzdHJpbmcsIHB1YmxpYyBwbGFjYTpzdHJpbmcsIHB1YmxpYyBjYXBhY2lkYWQ6bnVtYmVyLCBwdWJsaWMgZGlzcG9uaWJsZXM6bnVtYmVyLCBwdWJsaWMgZmVjaGFfdmlhamU6bnVtYmVyLHB1YmxpYyBob3JhX3ZpYWplOm51bWJlcikgeyB9XG59XG52YXIgbG9hZGVyID0gbmV3IExvYWRpbmdJbmRpY2F0b3IoKTtcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIkRpc3BvbmlibGVzXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2Rpc3BvbmlibGVzLmNvbXBvbmVudC5odG1sXCIsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgRGlzcG9uaWJsZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgLy9wdWJsaWMgbXlJdGVtczogT2JzZXJ2YWJsZUFycmF5PERhdGFJdGVtPjtcbiAgICAvL3B1YmxpYyBteUl0ZW1zOiBBcnJheTxEYXRhSXRlbT47XG4gICAgcHVibGljIG15SXRlbXMgPSBuZXcgb2JzZXJ2YWJsZUFycmF5Lk9ic2VydmFibGVBcnJheShbXSk7XG4gICAgcHVibGljIGFycmF5SXRlbXM9IG5ldyBvYnNlcnZhYmxlQXJyYXkuT2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgICBwcml2YXRlIGNvdW50ZXI6IG51bWJlcjtcbiAgICBwdWJsaWMgc2VhcmNoUGhyYXNlOnN0cmluZztcbiAgICBwdWJsaWMgZW5jb250cmFkb3M6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLHByaXZhdGUgbXlTZXJ2aWNlOiBXZWJTZXJ2aWNlKSB7XG4gICAgICAgIC8qdGhpcy5teUl0ZW1zID0gW107XG4gICAgICAgIHRoaXMuY291bnRlciA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLm15SXRlbXMucHVzaChuZXcgRGF0YUl0ZW0oaSwgXCJDaGljw7NcIixcIkFlcm9wdWVydG9cIixcIjg6MDBBTVwiLFwiQUJDLTEyM1wiLGkrMikpO1xuICAgICAgICAgICAgdGhpcy5jb3VudGVyID0gaTtcbiAgICAgICAgfSovXG4gICAgfVxuXG4gICAgcHVibGljIG9uU3VibWl0KGFyZ3MpIHtcbiAgICAgICAgbGV0IG1vZGVsID0gdGhpcztcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XG4gICAgICAgIGxldCBzZWFyY2hWYWx1ZSA9IHNlYXJjaEJhci50ZXh0LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ0J1c2NhbmRvICcrc2VhcmNoVmFsdWUpO1xuICAgICAgICB0aGlzLm15SXRlbXMgPSBuZXcgb2JzZXJ2YWJsZUFycmF5Lk9ic2VydmFibGVBcnJheShbXSk7XG4gICAgICAgIGlmIChzZWFyY2hWYWx1ZSAhPT0gXCJcIikge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFycmF5SXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hcnJheUl0ZW1zLmdldEl0ZW0oaSkudGVybWlub3MudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFZhbHVlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5teUl0ZW1zLnB1c2godGhpcy5hcnJheUl0ZW1zLmdldEl0ZW0oaSkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmFycmF5SXRlbXMuZ2V0SXRlbShpKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBcbiAgICAgICAgfVxuICAgICAgICBpZihtb2RlbC5teUl0ZW1zLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgbW9kZWwuZW5jb250cmFkb3M9dHJ1ZTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBtb2RlbC5lbmNvbnRyYWRvcz1mYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkNsZWFyKGFyZ3Mpe1xuICAgICAgICBsZXQgbW9kZWwgPSB0aGlzO1xuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgc2VhcmNoQmFyLnRleHQgPSBcIlwiO1xuICAgICAgICBzZWFyY2hCYXIuaGludCA9IFwiQnVzY2EgcG9yIGJhcnJpbyBvIGx1Z2FyXCI7XG5cbiAgICAgICAgbW9kZWwubXlJdGVtcyA9IG5ldyBvYnNlcnZhYmxlQXJyYXkuT2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgICAgICAgbW9kZWwuYXJyYXlJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgbW9kZWwubXlJdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZihtb2RlbC5teUl0ZW1zLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgbW9kZWwuZW5jb250cmFkb3M9dHJ1ZTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBtb2RlbC5lbmNvbnRyYWRvcz1mYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIG9uU2VhcmNoTGF5b3V0TG9hZGVkKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5vYmplY3QuYW5kcm9pZCkge1xuICAgICAgICAgICAgZXZlbnQub2JqZWN0LmFuZHJvaWQuc2V0Rm9jdXNhYmxlSW5Ub3VjaE1vZGUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25TZWFyY2hCYXJMb2FkZWQoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50Lm9iamVjdC5hbmRyb2lkKSB7XG4gICAgICAgICAgICBldmVudC5vYmplY3QuYW5kcm9pZC5jbGVhckZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25UZXh0Q2hhbmdlZChhcmdzKSB7XG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNlYXJjaEJhciB0ZXh0IGNoYW5nZWQhIE5ldyB2YWx1ZTogXCIgKyBzZWFyY2hCYXIudGV4dCk7XG4gICAgfVxuXG4gICAgaXJBdHJhcygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25JdGVtVGFwKGFyZ3MpIHtcbiAgICAgICAgY29uc29sZS5sb2coYXJncyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEl0ZW1UYXBwZWQ6IFwiICsgYXJncy5pbmRleCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGxldCBtb2RlbCA9IHRoaXM7XG4gICAgICAgIGxldCBpZFVzdWFyaW8gPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZygnaWRVc3VhcmlvJyk7XG4gICAgICAgIGxvYWRlci5zaG93KCk7XG4gICAgICAgIHRoaXMubXlTZXJ2aWNlLmdldFJ1dGFzRGlzcG9uaWJsZXMoaWRVc3VhcmlvKS5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGUgbGFzIHJ1dGFzOiAnK09iamVjdC5rZXlzKHJlcykubGVuZ3RoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlcykpO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8T2JqZWN0LmtleXMocmVzKS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlJdGVtcy5wdXNoKHJlc1tpXSk7IFxuICAgICAgICAgICAgICAgIHRoaXMubXlJdGVtcy5wdXNoKHJlc1tpXSk7IFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYobW9kZWwubXlJdGVtcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICBtb2RlbC5lbmNvbnRyYWRvcz10cnVlO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbW9kZWwuZW5jb250cmFkb3M9ZmFsc2U7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgIHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcHJpdmF0ZSBvbkdldERhdGFFcnJvcihlcnJvcjogUmVzcG9uc2UgfCBhbnkpIHtcbiAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1Jlc3B1ZXN0YSBkZSBlcnJvcicpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgIFx0ZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICB0aXRsZTogJ0Vycm9yIGRlIGNvbmV4acOzbicsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkxvIHNlbnRpbW9zLCBodWJvIHVuIHByb2JsZW1hIGVuY29udHJhbmRvIGVsIHNlcnZpZG9yLCB2ZXJpZmljYSB0dSBjb25leGnDs24gYSBJbnRlcm5ldCBlIGludGVudGEgbnVldmFtZW50ZS5cIixcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ09rJ1xuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XG4gICAgICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj5hcHAuZ2V0Um9vdFZpZXcoKTtcbiAgICAgICAgc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxufVxuIl19