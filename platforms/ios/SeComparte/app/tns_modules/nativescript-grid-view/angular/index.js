"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var grid_view_comp_1 = require("./grid-view-comp");
var GridViewModule = (function () {
    function GridViewModule() {
    }
    GridViewModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        grid_view_comp_1.GridViewComponent,
                        grid_view_comp_1.TemplateKeyDirective,
                    ],
                    exports: [
                        grid_view_comp_1.GridViewComponent,
                        grid_view_comp_1.TemplateKeyDirective,
                    ],
                    schemas: [
                        core_1.NO_ERRORS_SCHEMA,
                    ],
                },] },
    ];
    return GridViewModule;
}());
exports.GridViewModule = GridViewModule;
