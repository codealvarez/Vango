import { AfterContentInit, DoCheck, ElementRef, EmbeddedViewRef, EventEmitter, IterableDiffers, OnDestroy, TemplateRef, ViewContainerRef } from "@angular/core";
import { View } from "tns-core-modules/ui/core/view";
import { GridItemEventData, GridView } from "../grid-view";
export declare class GridItemContext {
    $implicit: any;
    item: any;
    index: number;
    even: boolean;
    odd: boolean;
    constructor($implicit?: any, item?: any, index?: number, even?: boolean, odd?: boolean);
}
export interface SetupItemViewArgs {
    view: EmbeddedViewRef<any>;
    data: any;
    index: number;
    context: GridItemContext;
}
export declare class GridViewComponent implements DoCheck, OnDestroy, AfterContentInit {
    private _iterableDiffers;
    readonly nativeElement: GridView;
    loader: ViewContainerRef;
    setupItemView: EventEmitter<SetupItemViewArgs>;
    itemTemplateQuery: TemplateRef<GridItemContext>;
    items: any;
    private gridView;
    private _items;
    private _differ;
    private itemTemplate;
    private _templateMap;
    constructor(_elementRef: ElementRef, _iterableDiffers: IterableDiffers);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    ngDoCheck(): void;
    registerTemplate(key: string, template: TemplateRef<GridItemContext>): void;
    onItemLoading(args: GridItemEventData): void;
    setupViewRef(view: EmbeddedViewRef<GridItemContext>, data: any, index: number): void;
    private createNativeViewFactoryFromTemplate(template);
    private setItemTemplates();
    private detectChangesOnChild(viewRef, index);
    private refresh();
}
export interface ComponentView {
    rootNodes: any[];
    destroy(): void;
}
export declare type RootLocator = (nodes: any[], nestLevel: number) => View;
export declare function getItemViewRoot(viewRef: ComponentView, rootLocator?: RootLocator): View;
export declare class TemplateKeyDirective {
    private templateRef;
    private grid;
    constructor(templateRef: TemplateRef<any>, grid: GridViewComponent);
    gvTemplateKey: any;
}
