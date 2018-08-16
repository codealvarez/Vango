"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var profiling_1 = require("tns-core-modules/profiling");
var layout_base_1 = require("tns-core-modules/ui/layouts/layout-base");
var grid_view_1 = require("../grid-view");
var trace_1 = require("./trace");
var element_registry_1 = require("nativescript-angular/element-registry");
var NG_VIEW = "_ngViewRef";
var GridItemContext = (function () {
    function GridItemContext($implicit, item, index, even, odd) {
        this.$implicit = $implicit;
        this.item = item;
        this.index = index;
        this.even = even;
        this.odd = odd;
    }
    return GridItemContext;
}());
exports.GridItemContext = GridItemContext;
var GridViewComponent = (function () {
    function GridViewComponent(_elementRef, _iterableDiffers) {
        this._iterableDiffers = _iterableDiffers;
        this.setupItemView = new core_1.EventEmitter();
        this.gridView = _elementRef.nativeElement;
        this.gridView.on(grid_view_1.GridView.itemLoadingEvent, this.onItemLoading, this);
    }
    Object.defineProperty(GridViewComponent.prototype, "nativeElement", {
        get: function () {
            return this.gridView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridViewComponent.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (value) {
            this._items = value;
            var needDiffer = true;
            if (value instanceof observable_array_1.ObservableArray) {
                needDiffer = false;
            }
            if (needDiffer && !this._differ && core_1.ɵisListLikeIterable(value)) {
                this._differ = this._iterableDiffers.find(this._items)
                    .create(function (_index, item) { return item; });
            }
            this.gridView.items = this._items;
        },
        enumerable: true,
        configurable: true
    });
    GridViewComponent.prototype.ngAfterContentInit = function () {
        trace_1.gridViewLog("GridView.ngAfterContentInit()");
        this.setItemTemplates();
    };
    GridViewComponent.prototype.ngOnDestroy = function () {
        this.gridView.off(grid_view_1.GridView.itemLoadingEvent, this.onItemLoading, this);
    };
    GridViewComponent.prototype.ngDoCheck = function () {
        trace_1.gridViewLog("ngDoCheck() - execute differ? " + this._differ);
        if (this._differ) {
            trace_1.gridViewLog("ngDoCheck() - execute differ");
            var changes = this._differ.diff(this._items);
            if (changes) {
                trace_1.gridViewLog("ngDoCheck() - refresh");
                this.refresh();
            }
        }
    };
    GridViewComponent.prototype.registerTemplate = function (key, template) {
        trace_1.gridViewLog("registerTemplate for key: " + key);
        if (!this._templateMap) {
            this._templateMap = new Map();
        }
        var keyedTemplate = {
            key: key,
            createView: this.createNativeViewFactoryFromTemplate(template),
        };
        this._templateMap.set(key, keyedTemplate);
    };
    GridViewComponent.prototype.onItemLoading = function (args) {
        if (!args.view && !this.itemTemplate) {
            return;
        }
        var index = args.index;
        var items = args.object.items;
        var currentItem = typeof items.getItem === "function" ? items.getItem(index) : items[index];
        var viewRef;
        if (args.view) {
            trace_1.gridViewLog("onItemLoading: " + index + " - Reusing existing view");
            viewRef = args.view[NG_VIEW];
            if (!viewRef && args.view instanceof layout_base_1.LayoutBase && args.view.getChildrenCount() > 0) {
                viewRef = args.view.getChildAt(0)[NG_VIEW];
            }
            if (!viewRef) {
                trace_1.gridViewError("ViewReference not found for item " + index + ". View recycling is not working");
            }
        }
        if (!viewRef) {
            trace_1.gridViewLog("onItemLoading: " + index + " - Creating view from template");
            viewRef = this.loader.createEmbeddedView(this.itemTemplate, new GridItemContext(), 0);
            args.view = getItemViewRoot(viewRef);
            args.view[NG_VIEW] = viewRef;
        }
        this.setupViewRef(viewRef, currentItem, index);
        this.detectChangesOnChild(viewRef, index);
    };
    GridViewComponent.prototype.setupViewRef = function (view, data, index) {
        var context = view.context;
        context.$implicit = data;
        context.item = data;
        context.index = index;
        context.even = (index % 2 === 0);
        context.odd = !context.even;
        this.setupItemView.next({
            context: context,
            data: data,
            index: index,
            view: view,
        });
    };
    GridViewComponent.prototype.createNativeViewFactoryFromTemplate = function (template) {
        var _this = this;
        return function () {
            var viewRef = _this.loader.createEmbeddedView(template, new GridItemContext(), 0);
            var resultView = getItemViewRoot(viewRef);
            resultView[NG_VIEW] = viewRef;
            return resultView;
        };
    };
    GridViewComponent.prototype.setItemTemplates = function () {
        this.itemTemplate = this.itemTemplateQuery;
        if (this._templateMap) {
            trace_1.gridViewLog("Setting templates");
            var templates_1 = [];
            this._templateMap.forEach(function (value) {
                templates_1.push(value);
            });
            this.gridView.itemTemplates = templates_1;
        }
        else {
            this.gridView.itemTemplate = this.createNativeViewFactoryFromTemplate(this.itemTemplate);
        }
    };
    GridViewComponent.prototype.detectChangesOnChild = function (viewRef, index) {
        trace_1.gridViewLog("Manually detect changes in child: " + index);
        viewRef.markForCheck();
        viewRef.detectChanges();
    };
    GridViewComponent.prototype.refresh = function () {
        if (this.gridView) {
            this.gridView.refresh();
        }
    };
    GridViewComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: "GridView",
                    template: "\n        <DetachedContainer>\n            <Placeholder #loader></Placeholder>\n        </DetachedContainer>",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    GridViewComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, decorators: [{ type: core_1.Inject, args: [core_1.ElementRef,] },] },
        { type: core_1.IterableDiffers, decorators: [{ type: core_1.Inject, args: [core_1.IterableDiffers,] },] },
    ]; };
    GridViewComponent.propDecorators = {
        "loader": [{ type: core_1.ViewChild, args: ["loader", { read: core_1.ViewContainerRef },] },],
        "setupItemView": [{ type: core_1.Output },],
        "itemTemplateQuery": [{ type: core_1.ContentChild, args: [core_1.TemplateRef,] },],
        "items": [{ type: core_1.Input },],
    };
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], GridViewComponent.prototype, "onItemLoading", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [core_1.EmbeddedViewRef, Number]),
        __metadata("design:returntype", void 0)
    ], GridViewComponent.prototype, "detectChangesOnChild", null);
    return GridViewComponent;
}());
exports.GridViewComponent = GridViewComponent;
function getItemViewRoot(viewRef, rootLocator) {
    if (rootLocator === void 0) { rootLocator = element_registry_1.getSingleViewRecursive; }
    var rootView = rootLocator(viewRef.rootNodes, 0);
    return rootView;
}
exports.getItemViewRoot = getItemViewRoot;
var TemplateKeyDirective = (function () {
    function TemplateKeyDirective(templateRef, grid) {
        this.templateRef = templateRef;
        this.grid = grid;
    }
    Object.defineProperty(TemplateKeyDirective.prototype, "gvTemplateKey", {
        set: function (value) {
            trace_1.gridViewLog("gvTemplateKey: " + value);
            if (this.grid && this.templateRef) {
                this.grid.registerTemplate(value, this.templateRef);
            }
        },
        enumerable: true,
        configurable: true
    });
    TemplateKeyDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: "[gvTemplateKey]" },] },
    ];
    TemplateKeyDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, },
        { type: GridViewComponent, decorators: [{ type: core_1.Host },] },
    ]; };
    TemplateKeyDirective.propDecorators = {
        "gvTemplateKey": [{ type: core_1.Input },],
    };
    return TemplateKeyDirective;
}());
exports.TemplateKeyDirective = TemplateKeyDirective;
if (!element_registry_1.isKnownView("GridView")) {
    element_registry_1.registerElement("GridView", function () { return grid_view_1.GridView; });
}
