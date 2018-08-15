"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
var router_1 = require("nativescript-angular/router");
var dialogs = require("ui/dialogs");
element_registry_1.registerElement('StarRating', function () { return require('nativescript-star-ratings').StarRating; });
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "calificar", loadChildren: "./calificar/calificar.module#CalificarModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
var CalificarComponent = /** @class */ (function () {
    function CalificarComponent(routerExtensions) {
        this.routerExtensions = routerExtensions;
        this.value = 0;
        this.value2 = 0;
        this.max = 5;
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }
    CalificarComponent.prototype.ngOnInit = function () {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    };
    CalificarComponent.prototype.calificar = function () {
        var model = this;
        dialogs.alert({
            title: "Calificación exitosa",
            message: "Tu viaje fue calificado exitosamente" + model.value,
            okButtonText: "Ok"
        }).then(function () {
            console.log("Dialog closed!");
        });
    };
    CalificarComponent.prototype.irAtras = function () {
        this.routerExtensions.back();
    };
    CalificarComponent = __decorate([
        core_1.Component({
            selector: "Calificar",
            moduleId: module.id,
            templateUrl: "./calificar.component.html"
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions])
    ], CalificarComponent);
    return CalificarComponent;
}());
exports.CalificarComponent = CalificarComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsaWZpY2FyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhbGlmaWNhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsMEVBQXdFO0FBQ3hFLHNEQUE2RDtBQUM3RCxvQ0FBc0M7QUFDdEMsa0NBQWUsQ0FBQyxZQUFZLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLFVBQVUsRUFBL0MsQ0FBK0MsQ0FBQyxDQUFDO0FBRXJGOzs7Ozs4REFLOEQ7QUFPOUQ7SUFJSSw0QkFBb0IsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFIdEQsVUFBSyxHQUFRLENBQUMsQ0FBQztRQUNmLFdBQU0sR0FBUSxDQUFDLENBQUM7UUFDaEIsUUFBRyxHQUFRLENBQUMsQ0FBQztRQUVUOztzRUFFOEQ7SUFDbEUsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFDSTs7c0VBRThEO0lBRWxFLENBQUM7SUFDRCxzQ0FBUyxHQUFUO1FBQ0ksSUFBSSxLQUFLLEdBQUUsSUFBSSxDQUFDO1FBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDVixLQUFLLEVBQUUsc0JBQXNCO1lBQzdCLE9BQU8sRUFBRSxzQ0FBc0MsR0FBQyxLQUFLLENBQUMsS0FBSztZQUMzRCxZQUFZLEVBQUUsSUFBSTtTQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELG9DQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQTVCUSxrQkFBa0I7UUFMOUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsNEJBQTRCO1NBQzVDLENBQUM7eUNBS3dDLHlCQUFnQjtPQUo3QyxrQkFBa0IsQ0E2QjlCO0lBQUQseUJBQUM7Q0FBQSxBQTdCRCxJQTZCQztBQTdCWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5JztcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xucmVnaXN0ZXJFbGVtZW50KCdTdGFyUmF0aW5nJywgKCkgPT4gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXN0YXItcmF0aW5ncycpLlN0YXJSYXRpbmcpO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBCZWZvcmUgeW91IGNhbiBuYXZpZ2F0ZSB0byB0aGlzIHBhZ2UgZnJvbSB5b3VyIGFwcCwgeW91IG5lZWQgdG8gcmVmZXJlbmNlIHRoaXMgcGFnZSdzIG1vZHVsZSBpbiB0aGVcbiogZ2xvYmFsIGFwcCByb3V0ZXIgbW9kdWxlLiBBZGQgdGhlIGZvbGxvd2luZyBvYmplY3QgdG8gdGhlIGdsb2JhbCBhcnJheSBvZiByb3V0ZXM6XG4qIHsgcGF0aDogXCJjYWxpZmljYXJcIiwgbG9hZENoaWxkcmVuOiBcIi4vY2FsaWZpY2FyL2NhbGlmaWNhci5tb2R1bGUjQ2FsaWZpY2FyTW9kdWxlXCIgfVxuKiBOb3RlIHRoYXQgdGhpcyBzaW1wbHkgcG9pbnRzIHRoZSBwYXRoIHRvIHRoZSBwYWdlIG1vZHVsZSBmaWxlLiBJZiB5b3UgbW92ZSB0aGUgcGFnZSwgeW91IG5lZWQgdG8gdXBkYXRlIHRoZSByb3V0ZSB0b28uXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJDYWxpZmljYXJcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vY2FsaWZpY2FyLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgQ2FsaWZpY2FyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICB2YWx1ZTpudW1iZXI9MDtcbiAgICB2YWx1ZTI6bnVtYmVyPTA7XG4gICAgbWF4Om51bWJlcj01O1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucykge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFVzZSB0aGUgY29uc3RydWN0b3IgdG8gaW5qZWN0IGFwcCBzZXJ2aWNlcyB0aGF0IHlvdSBuZWVkIGluIHRoaXMgY29tcG9uZW50LlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFVzZSB0aGUgXCJuZ09uSW5pdFwiIGhhbmRsZXIgdG8gaW5pdGlhbGl6ZSBkYXRhIGZvciB0aGlzIGNvbXBvbmVudC5cbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIH1cbiAgICBjYWxpZmljYXIoKXtcbiAgICAgICAgbGV0IG1vZGVsPSB0aGlzO1xuICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkNhbGlmaWNhY2nDs24gZXhpdG9zYVwiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJUdSB2aWFqZSBmdWUgY2FsaWZpY2FkbyBleGl0b3NhbWVudGVcIittb2RlbC52YWx1ZSxcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPa1wiXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlyQXRyYXMoKSB7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG4gICAgfVxufVxuIl19