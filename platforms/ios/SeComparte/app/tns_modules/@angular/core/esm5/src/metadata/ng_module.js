/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { defineInjector } from '../di/defs';
import { convertInjectableProviderToFactory } from '../di/injectable';
import { makeDecorator } from '../util/decorators';
/**
 * Defines a schema that will allow:
 * - any non-Angular elements with a `-` in their name,
 * - any properties on elements with a `-` in their name which is the common rule for custom
 * elements.
 *
 *
 */
export var CUSTOM_ELEMENTS_SCHEMA = {
    name: 'custom-elements'
};
/**
 * Defines a schema that will allow any property on any element.
 *
 * @experimental
 */
export var NO_ERRORS_SCHEMA = {
    name: 'no-errors-schema'
};
/**
 * NgModule decorator and metadata.
 *
 *
 * @Annotation
 */
export var NgModule = makeDecorator('NgModule', function (ngModule) { return ngModule; }, undefined, undefined, function (moduleType, metadata) {
    var imports = (metadata && metadata.imports) || [];
    if (metadata && metadata.exports) {
        imports = tslib_1.__spread(imports, [metadata.exports]);
    }
    moduleType.ngInjectorDef = defineInjector({
        factory: convertInjectableProviderToFactory(moduleType, { useClass: moduleType }),
        providers: metadata && metadata.providers,
        imports: imports,
    });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvbWV0YWRhdGEvbmdfbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQTRCLGNBQWMsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUNyRSxPQUFPLEVBQUMsa0NBQWtDLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUdwRSxPQUFPLEVBQWdCLGFBQWEsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBb0JoRTs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxDQUFDLElBQU0sc0JBQXNCLEdBQW1CO0lBQ3BELElBQUksRUFBRSxpQkFBaUI7Q0FDeEIsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsSUFBTSxnQkFBZ0IsR0FBbUI7SUFDOUMsSUFBSSxFQUFFLGtCQUFrQjtDQUN6QixDQUFDO0FBMElGOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLElBQU0sUUFBUSxHQUFzQixhQUFhLENBQ3BELFVBQVUsRUFBRSxVQUFDLFFBQWtCLElBQUssT0FBQSxRQUFRLEVBQVIsQ0FBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQ2xFLFVBQUMsVUFBNkIsRUFBRSxRQUFrQjtJQUNoRCxJQUFJLE9BQU8sR0FBRyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ25ELEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNqQyxPQUFPLG9CQUFPLE9BQU8sR0FBRSxRQUFRLENBQUMsT0FBTyxFQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELFVBQVUsQ0FBQyxhQUFhLEdBQUcsY0FBYyxDQUFDO1FBQ3hDLE9BQU8sRUFBRSxrQ0FBa0MsQ0FBQyxVQUFVLEVBQUUsRUFBQyxRQUFRLEVBQUUsVUFBVSxFQUFDLENBQUM7UUFDL0UsU0FBUyxFQUFFLFFBQVEsSUFBSSxRQUFRLENBQUMsU0FBUztRQUN6QyxPQUFPLEVBQUUsT0FBTztLQUNqQixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RvckRlZiwgSW5qZWN0b3JUeXBlLCBkZWZpbmVJbmplY3Rvcn0gZnJvbSAnLi4vZGkvZGVmcyc7XG5pbXBvcnQge2NvbnZlcnRJbmplY3RhYmxlUHJvdmlkZXJUb0ZhY3Rvcnl9IGZyb20gJy4uL2RpL2luamVjdGFibGUnO1xuaW1wb3J0IHtQcm92aWRlcn0gZnJvbSAnLi4vZGkvcHJvdmlkZXInO1xuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi90eXBlJztcbmltcG9ydCB7VHlwZURlY29yYXRvciwgbWFrZURlY29yYXRvcn0gZnJvbSAnLi4vdXRpbC9kZWNvcmF0b3JzJztcblxuXG4vKipcbiAqIEEgd3JhcHBlciBhcm91bmQgYSBtb2R1bGUgdGhhdCBhbHNvIGluY2x1ZGVzIHRoZSBwcm92aWRlcnMuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgbmdNb2R1bGU6IFR5cGU8YW55PjtcbiAgcHJvdmlkZXJzPzogUHJvdmlkZXJbXTtcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIHNjaGVtYSBkZWZpbml0aW9ucyBpbiBATmdNb2R1bGVzLlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTY2hlbWFNZXRhZGF0YSB7IG5hbWU6IHN0cmluZzsgfVxuXG4vKipcbiAqIERlZmluZXMgYSBzY2hlbWEgdGhhdCB3aWxsIGFsbG93OlxuICogLSBhbnkgbm9uLUFuZ3VsYXIgZWxlbWVudHMgd2l0aCBhIGAtYCBpbiB0aGVpciBuYW1lLFxuICogLSBhbnkgcHJvcGVydGllcyBvbiBlbGVtZW50cyB3aXRoIGEgYC1gIGluIHRoZWlyIG5hbWUgd2hpY2ggaXMgdGhlIGNvbW1vbiBydWxlIGZvciBjdXN0b21cbiAqIGVsZW1lbnRzLlxuICpcbiAqXG4gKi9cbmV4cG9ydCBjb25zdCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BOiBTY2hlbWFNZXRhZGF0YSA9IHtcbiAgbmFtZTogJ2N1c3RvbS1lbGVtZW50cydcbn07XG5cbi8qKlxuICogRGVmaW5lcyBhIHNjaGVtYSB0aGF0IHdpbGwgYWxsb3cgYW55IHByb3BlcnR5IG9uIGFueSBlbGVtZW50LlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGNvbnN0IE5PX0VSUk9SU19TQ0hFTUE6IFNjaGVtYU1ldGFkYXRhID0ge1xuICBuYW1lOiAnbm8tZXJyb3JzLXNjaGVtYSdcbn07XG5cblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBOZ01vZHVsZSBkZWNvcmF0b3IgLyBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqXG4gKlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nTW9kdWxlRGVjb3JhdG9yIHtcbiAgLyoqXG4gICAqIERlZmluZXMgYW4gTmdNb2R1bGUuXG4gICAqL1xuICAob2JqPzogTmdNb2R1bGUpOiBUeXBlRGVjb3JhdG9yO1xuICBuZXcgKG9iaj86IE5nTW9kdWxlKTogTmdNb2R1bGU7XG59XG5cbi8qKlxuICogVHlwZSBvZiB0aGUgTmdNb2R1bGUgbWV0YWRhdGEuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ01vZHVsZSB7XG4gIC8qKlxuICAgKiBEZWZpbmVzIHRoZSBzZXQgb2YgaW5qZWN0YWJsZSBvYmplY3RzIHRoYXQgYXJlIGF2YWlsYWJsZSBpbiB0aGUgaW5qZWN0b3JcbiAgICogb2YgdGhpcyBtb2R1bGUuXG4gICAqXG4gICAqICMjIFNpbXBsZSBFeGFtcGxlXG4gICAqXG4gICAqIEhlcmUgaXMgYW4gZXhhbXBsZSBvZiBhIGNsYXNzIHRoYXQgY2FuIGJlIGluamVjdGVkOlxuICAgKlxuICAgKiBgYGBcbiAgICogY2xhc3MgR3JlZXRlciB7XG4gICAqICAgIGdyZWV0KG5hbWU6c3RyaW5nKSB7XG4gICAqICAgICAgcmV0dXJuICdIZWxsbyAnICsgbmFtZSArICchJztcbiAgICogICAgfVxuICAgKiB9XG4gICAqXG4gICAqIEBOZ01vZHVsZSh7XG4gICAqICAgcHJvdmlkZXJzOiBbXG4gICAqICAgICBHcmVldGVyXG4gICAqICAgXVxuICAgKiB9KVxuICAgKiBjbGFzcyBIZWxsb1dvcmxkIHtcbiAgICogICBncmVldGVyOkdyZWV0ZXI7XG4gICAqXG4gICAqICAgY29uc3RydWN0b3IoZ3JlZXRlcjpHcmVldGVyKSB7XG4gICAqICAgICB0aGlzLmdyZWV0ZXIgPSBncmVldGVyO1xuICAgKiAgIH1cbiAgICogfVxuICAgKiBgYGBcbiAgICovXG4gIHByb3ZpZGVycz86IFByb3ZpZGVyW107XG5cbiAgLyoqXG4gICAqIFNwZWNpZmllcyBhIGxpc3Qgb2YgZGlyZWN0aXZlcy9waXBlcyB0aGF0IGJlbG9uZyB0byB0aGlzIG1vZHVsZS5cbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICogYGBgamF2YXNjcmlwdFxuICAgKiBATmdNb2R1bGUoe1xuICAgKiAgIGRlY2xhcmF0aW9uczogW05nRm9yXVxuICAgKiB9KVxuICAgKiBjbGFzcyBDb21tb25Nb2R1bGUge1xuICAgKiB9XG4gICAqIGBgYFxuICAgKi9cbiAgZGVjbGFyYXRpb25zPzogQXJyYXk8VHlwZTxhbnk+fGFueVtdPjtcblxuICAvKipcbiAgICogU3BlY2lmaWVzIGEgbGlzdCBvZiBtb2R1bGVzIHdob3NlIGV4cG9ydGVkIGRpcmVjdGl2ZXMvcGlwZXNcbiAgICogc2hvdWxkIGJlIGF2YWlsYWJsZSB0byB0ZW1wbGF0ZXMgaW4gdGhpcyBtb2R1bGUuXG4gICAqIFRoaXMgY2FuIGFsc28gY29udGFpbiB7QGxpbmsgTW9kdWxlV2l0aFByb3ZpZGVyc30uXG4gICAqXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIGBgYGphdmFzY3JpcHRcbiAgICogQE5nTW9kdWxlKHtcbiAgICogICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXVxuICAgKiB9KVxuICAgKiBjbGFzcyBNYWluTW9kdWxlIHtcbiAgICogfVxuICAgKiBgYGBcbiAgICovXG4gIGltcG9ydHM/OiBBcnJheTxUeXBlPGFueT58TW9kdWxlV2l0aFByb3ZpZGVyc3xhbnlbXT47XG5cbiAgLyoqXG4gICAqIFNwZWNpZmllcyBhIGxpc3Qgb2YgZGlyZWN0aXZlcy9waXBlcy9tb2R1bGVzIHRoYXQgY2FuIGJlIHVzZWQgd2l0aGluIHRoZSB0ZW1wbGF0ZVxuICAgKiBvZiBhbnkgY29tcG9uZW50IHRoYXQgaXMgcGFydCBvZiBhbiBBbmd1bGFyIG1vZHVsZVxuICAgKiB0aGF0IGltcG9ydHMgdGhpcyBBbmd1bGFyIG1vZHVsZS5cbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICogYGBgamF2YXNjcmlwdFxuICAgKiBATmdNb2R1bGUoe1xuICAgKiAgIGV4cG9ydHM6IFtOZ0Zvcl1cbiAgICogfSlcbiAgICogY2xhc3MgQ29tbW9uTW9kdWxlIHtcbiAgICogfVxuICAgKiBgYGBcbiAgICovXG4gIGV4cG9ydHM/OiBBcnJheTxUeXBlPGFueT58YW55W10+O1xuXG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgYSBsaXN0IG9mIGNvbXBvbmVudHMgdGhhdCBzaG91bGQgYmUgY29tcGlsZWQgd2hlbiB0aGlzIG1vZHVsZSBpcyBkZWZpbmVkLlxuICAgKiBGb3IgZWFjaCBjb21wb25lbnQgbGlzdGVkIGhlcmUsIEFuZ3VsYXIgd2lsbCBjcmVhdGUgYSB7QGxpbmsgQ29tcG9uZW50RmFjdG9yeX1cbiAgICogYW5kIHN0b3JlIGl0IGluIHRoZSB7QGxpbmsgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyfS5cbiAgICovXG4gIGVudHJ5Q29tcG9uZW50cz86IEFycmF5PFR5cGU8YW55PnxhbnlbXT47XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdGhlIGNvbXBvbmVudHMgdGhhdCBzaG91bGQgYmUgYm9vdHN0cmFwcGVkIHdoZW5cbiAgICogdGhpcyBtb2R1bGUgaXMgYm9vdHN0cmFwcGVkLiBUaGUgY29tcG9uZW50cyBsaXN0ZWQgaGVyZVxuICAgKiB3aWxsIGF1dG9tYXRpY2FsbHkgYmUgYWRkZWQgdG8gYGVudHJ5Q29tcG9uZW50c2AuXG4gICAqL1xuICBib290c3RyYXA/OiBBcnJheTxUeXBlPGFueT58YW55W10+O1xuXG4gIC8qKlxuICAgKiBFbGVtZW50cyBhbmQgcHJvcGVydGllcyB0aGF0IGFyZSBub3QgQW5ndWxhciBjb21wb25lbnRzIG5vciBkaXJlY3RpdmVzIGhhdmUgdG8gYmUgZGVjbGFyZWQgaW5cbiAgICogdGhlIHNjaGVtYS5cbiAgICpcbiAgICogQXZhaWxhYmxlIHNjaGVtYXM6XG4gICAqIC0gYE5PX0VSUk9SU19TQ0hFTUFgOiBhbnkgZWxlbWVudHMgYW5kIHByb3BlcnRpZXMgYXJlIGFsbG93ZWQsXG4gICAqIC0gYENVU1RPTV9FTEVNRU5UU19TQ0hFTUFgOiBhbnkgY3VzdG9tIGVsZW1lbnRzICh0YWcgbmFtZSBoYXMgXCItXCIpIHdpdGggYW55IHByb3BlcnRpZXMgYXJlXG4gICAqICAgYWxsb3dlZC5cbiAgICpcbiAgICogQHNlY3VyaXR5IFdoZW4gdXNpbmcgb25lIG9mIGBOT19FUlJPUlNfU0NIRU1BYCBvciBgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQWAgd2UncmUgdHJ1c3RpbmcgdGhhdFxuICAgKiBhbGxvd2VkIGVsZW1lbnRzIChhbmQgaXRzIHByb3BlcnRpZXMpIHNlY3VyZWx5IGVzY2FwZSBpbnB1dHMuXG4gICAqL1xuICBzY2hlbWFzPzogQXJyYXk8U2NoZW1hTWV0YWRhdGF8YW55W10+O1xuXG4gIC8qKlxuICAgKiBBbiBvcGFxdWUgSUQgZm9yIHRoaXMgbW9kdWxlLCBlLmcuIGEgbmFtZSBvciBhIHBhdGguIFVzZWQgdG8gaWRlbnRpZnkgbW9kdWxlcyBpblxuICAgKiBgZ2V0TW9kdWxlRmFjdG9yeWAuIElmIGxlZnQgYHVuZGVmaW5lZGAsIHRoZSBgTmdNb2R1bGVgIHdpbGwgbm90IGJlIHJlZ2lzdGVyZWQgd2l0aFxuICAgKiBgZ2V0TW9kdWxlRmFjdG9yeWAuXG4gICAqL1xuICBpZD86IHN0cmluZztcbn1cblxuLyoqXG4gKiBOZ01vZHVsZSBkZWNvcmF0b3IgYW5kIG1ldGFkYXRhLlxuICpcbiAqXG4gKiBAQW5ub3RhdGlvblxuICovXG5leHBvcnQgY29uc3QgTmdNb2R1bGU6IE5nTW9kdWxlRGVjb3JhdG9yID0gbWFrZURlY29yYXRvcihcbiAgICAnTmdNb2R1bGUnLCAobmdNb2R1bGU6IE5nTW9kdWxlKSA9PiBuZ01vZHVsZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsXG4gICAgKG1vZHVsZVR5cGU6IEluamVjdG9yVHlwZTxhbnk+LCBtZXRhZGF0YTogTmdNb2R1bGUpID0+IHtcbiAgICAgIGxldCBpbXBvcnRzID0gKG1ldGFkYXRhICYmIG1ldGFkYXRhLmltcG9ydHMpIHx8IFtdO1xuICAgICAgaWYgKG1ldGFkYXRhICYmIG1ldGFkYXRhLmV4cG9ydHMpIHtcbiAgICAgICAgaW1wb3J0cyA9IFsuLi5pbXBvcnRzLCBtZXRhZGF0YS5leHBvcnRzXTtcbiAgICAgIH1cblxuICAgICAgbW9kdWxlVHlwZS5uZ0luamVjdG9yRGVmID0gZGVmaW5lSW5qZWN0b3Ioe1xuICAgICAgICBmYWN0b3J5OiBjb252ZXJ0SW5qZWN0YWJsZVByb3ZpZGVyVG9GYWN0b3J5KG1vZHVsZVR5cGUsIHt1c2VDbGFzczogbW9kdWxlVHlwZX0pLFxuICAgICAgICBwcm92aWRlcnM6IG1ldGFkYXRhICYmIG1ldGFkYXRhLnByb3ZpZGVycyxcbiAgICAgICAgaW1wb3J0czogaW1wb3J0cyxcbiAgICAgIH0pO1xuICAgIH0pO1xuIl19