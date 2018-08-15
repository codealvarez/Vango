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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcG9uaWJsZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlzcG9uaWJsZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtGO0FBQ2xGLHNEQUE2RDtBQUM3RCxpRkFBZ0U7QUFDaEUsNENBQTJDO0FBQzNDLG9DQUFzQztBQUN0QywwREFBNEQ7QUFDNUQsd0VBQTBFO0FBRTFFLFFBQVE7QUFDUixpQ0FBbUM7QUFLbkM7SUFDSSxrQkFBbUIsT0FBZSxFQUFTLE1BQWMsRUFBUyxVQUFpQixFQUFTLFNBQWlCLEVBQVMsS0FBWSxFQUFTLFNBQWdCLEVBQVMsV0FBa0IsRUFBUyxXQUFrQixFQUFRLFVBQWlCO1FBQXZOLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBTztRQUFTLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFPO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBTztRQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFPO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQU87UUFBUSxlQUFVLEdBQVYsVUFBVSxDQUFPO0lBQUksQ0FBQztJQUNuUCxlQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFDRCxJQUFJLE1BQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7QUFPcEM7SUFVSSw4QkFBb0IsZ0JBQWtDLEVBQVMsU0FBcUI7UUFBaEUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFTLGNBQVMsR0FBVCxTQUFTLENBQVk7UUFScEYsNENBQTRDO1FBQzVDLGtDQUFrQztRQUMzQixZQUFPLEdBQUcsSUFBSSxlQUFlLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELGVBQVUsR0FBRSxJQUFJLGVBQWUsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFHcEQsZ0JB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UUFDSSxJQUFNLFVBQVUsR0FBa0IsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BELFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBOUhRLG9CQUFvQjtRQU5oQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGFBQWE7WUFDdkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDbEQsQ0FBQzt5Q0FXd0MseUJBQWdCLEVBQW9CLHVCQUFVO09BVjNFLG9CQUFvQixDQStIaEM7SUFBRCwyQkFBQztDQUFBLEFBL0hELElBK0hDO0FBL0hZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge0xvYWRpbmdJbmRpY2F0b3J9IGZyb20gXCJuYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3JcIjtcbmltcG9ydCB7IFdlYlNlcnZpY2UgfSBmcm9tIFwiLi4vd3Muc2VydmljZVwiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCAqIGFzIG9ic2VydmFibGVBcnJheSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcblxuLy9EcmF3ZXJcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwiYXBwbGljYXRpb25cIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXJcIjtcblxuaW1wb3J0IHsgU2VhcmNoQmFyIH0gZnJvbSBcInVpL3NlYXJjaC1iYXJcIjtcblxuY2xhc3MgRGF0YUl0ZW0geyBcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaWR2aWFqZTogc3RyaW5nLCBwdWJsaWMgaWRydXRhOiBzdHJpbmcsIHB1YmxpYyBub21icmVydXRhOnN0cmluZywgcHVibGljIGNvbmR1Y3Rvcjogc3RyaW5nLCBwdWJsaWMgcGxhY2E6c3RyaW5nLCBwdWJsaWMgY2FwYWNpZGFkOm51bWJlciwgcHVibGljIGRpc3BvbmlibGVzOm51bWJlciwgcHVibGljIGZlY2hhX3ZpYWplOm51bWJlcixwdWJsaWMgaG9yYV92aWFqZTpudW1iZXIpIHsgfVxufVxudmFyIGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJEaXNwb25pYmxlc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9kaXNwb25pYmxlcy5jb21wb25lbnQuaHRtbFwiLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIERpc3BvbmlibGVzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIC8vcHVibGljIG15SXRlbXM6IE9ic2VydmFibGVBcnJheTxEYXRhSXRlbT47XG4gICAgLy9wdWJsaWMgbXlJdGVtczogQXJyYXk8RGF0YUl0ZW0+O1xuICAgIHB1YmxpYyBteUl0ZW1zID0gbmV3IG9ic2VydmFibGVBcnJheS5PYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgIHB1YmxpYyBhcnJheUl0ZW1zPSBuZXcgb2JzZXJ2YWJsZUFycmF5Lk9ic2VydmFibGVBcnJheShbXSk7XG4gICAgcHJpdmF0ZSBjb3VudGVyOiBudW1iZXI7XG4gICAgcHVibGljIHNlYXJjaFBocmFzZTpzdHJpbmc7XG4gICAgcHVibGljIGVuY29udHJhZG9zOmJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxwcml2YXRlIG15U2VydmljZTogV2ViU2VydmljZSkge1xuICAgICAgICAvKnRoaXMubXlJdGVtcyA9IFtdO1xuICAgICAgICB0aGlzLmNvdW50ZXIgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5teUl0ZW1zLnB1c2gobmV3IERhdGFJdGVtKGksIFwiQ2hpY8OzXCIsXCJBZXJvcHVlcnRvXCIsXCI4OjAwQU1cIixcIkFCQy0xMjNcIixpKzIpKTtcbiAgICAgICAgICAgIHRoaXMuY291bnRlciA9IGk7XG4gICAgICAgIH0qL1xuICAgIH1cblxuICAgIHB1YmxpYyBvblN1Ym1pdChhcmdzKSB7XG4gICAgICAgIGxldCBtb2RlbCA9IHRoaXM7XG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBsZXQgc2VhcmNoVmFsdWUgPSBzZWFyY2hCYXIudGV4dC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdCdXNjYW5kbyAnK3NlYXJjaFZhbHVlKTtcbiAgICAgICAgdGhpcy5teUl0ZW1zID0gbmV3IG9ic2VydmFibGVBcnJheS5PYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgICAgICBpZiAoc2VhcmNoVmFsdWUgIT09IFwiXCIpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hcnJheUl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXJyYXlJdGVtcy5nZXRJdGVtKGkpLnRlcm1pbm9zLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hWYWx1ZSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXlJdGVtcy5wdXNoKHRoaXMuYXJyYXlJdGVtcy5nZXRJdGVtKGkpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5hcnJheUl0ZW1zLmdldEl0ZW0oaSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cbiAgICAgICAgaWYobW9kZWwubXlJdGVtcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIG1vZGVsLmVuY29udHJhZG9zPXRydWU7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbW9kZWwuZW5jb250cmFkb3M9ZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25DbGVhcihhcmdzKXtcbiAgICAgICAgbGV0IG1vZGVsID0gdGhpcztcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XG4gICAgICAgIHNlYXJjaEJhci50ZXh0ID0gXCJcIjtcbiAgICAgICAgc2VhcmNoQmFyLmhpbnQgPSBcIkJ1c2NhIHBvciBiYXJyaW8gbyBsdWdhclwiO1xuXG4gICAgICAgIG1vZGVsLm15SXRlbXMgPSBuZXcgb2JzZXJ2YWJsZUFycmF5Lk9ic2VydmFibGVBcnJheShbXSk7XG4gICAgICAgIG1vZGVsLmFycmF5SXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIG1vZGVsLm15SXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYobW9kZWwubXlJdGVtcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIG1vZGVsLmVuY29udHJhZG9zPXRydWU7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbW9kZWwuZW5jb250cmFkb3M9ZmFsc2U7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBvblNlYXJjaExheW91dExvYWRlZChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQub2JqZWN0LmFuZHJvaWQpIHtcbiAgICAgICAgICAgIGV2ZW50Lm9iamVjdC5hbmRyb2lkLnNldEZvY3VzYWJsZUluVG91Y2hNb2RlKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uU2VhcmNoQmFyTG9hZGVkKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5vYmplY3QuYW5kcm9pZCkge1xuICAgICAgICAgICAgZXZlbnQub2JqZWN0LmFuZHJvaWQuY2xlYXJGb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uVGV4dENoYW5nZWQoYXJncykge1xuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgY29uc29sZS5sb2coXCJTZWFyY2hCYXIgdGV4dCBjaGFuZ2VkISBOZXcgdmFsdWU6IFwiICsgc2VhcmNoQmFyLnRleHQpO1xuICAgIH1cblxuICAgIGlyQXRyYXMoKSB7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uSXRlbVRhcChhcmdzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGFyZ3MpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBJdGVtVGFwcGVkOiBcIiArIGFyZ3MuaW5kZXgpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBsZXQgbW9kZWwgPSB0aGlzO1xuICAgICAgICBsZXQgaWRVc3VhcmlvID0gQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoJ2lkVXN1YXJpbycpO1xuICAgICAgICBsb2FkZXIuc2hvdygpO1xuICAgICAgICB0aGlzLm15U2VydmljZS5nZXRSdXRhc0Rpc3BvbmlibGVzKGlkVXN1YXJpbykuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzcHVlc3RhIGRlIGxhcyBydXRhczogJytPYmplY3Qua2V5cyhyZXMpLmxlbmd0aCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXMpKTtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPE9iamVjdC5rZXlzKHJlcykubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5SXRlbXMucHVzaChyZXNbaV0pOyBcbiAgICAgICAgICAgICAgICB0aGlzLm15SXRlbXMucHVzaChyZXNbaV0pOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKG1vZGVsLm15SXRlbXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgbW9kZWwuZW5jb250cmFkb3M9dHJ1ZTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIG1vZGVsLmVuY29udHJhZG9zPWZhbHNlO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIFxuICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHByaXZhdGUgb25HZXREYXRhRXJyb3IoZXJyb3I6IFJlc3BvbnNlIHwgYW55KSB7XG4gICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGUgZXJyb3InKTtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICBcdGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgdGl0bGU6ICdFcnJvciBkZSBjb25leGnDs24nLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJMbyBzZW50aW1vcywgaHVibyB1biBwcm9ibGVtYSBlbmNvbnRyYW5kbyBlbCBzZXJ2aWRvciwgdmVyaWZpY2EgdHUgY29uZXhpw7NuIGEgSW50ZXJuZXQgZSBpbnRlbnRhIG51ZXZhbWVudGUuXCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6ICdPaydcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+YXBwLmdldFJvb3RWaWV3KCk7XG4gICAgICAgIHNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xuICAgIH1cbn1cbiJdfQ==