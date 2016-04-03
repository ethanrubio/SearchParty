System.register(['angular2/core', 'angular2/http', 'angular2/router', 'ng2-material/all', './searchparty.component', './url-service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, router_1, all_1, searchparty_component_1, url_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (all_1_1) {
                all_1 = all_1_1;
            },
            function (searchparty_component_1_1) {
                searchparty_component_1 = searchparty_component_1_1;
            },
            function (url_service_1_1) {
                url_service_1 = url_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(urlService) {
                    this.urlService = urlService;
                    this.title = 'Search Party';
                    // comment urlService for deployment
                    // this.urlService.grabUrls()
                    //   .then(urls => {
                    //     for (let key in urls) {
                    //       localStorage.setItem(key, urls[key]);
                    //     }
                    //   });
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: './share/app/app.component.html',
                        styleUrls: ['./share/app/app.component.css'],
                        directives: [router_1.ROUTER_DIRECTIVES, all_1.MATERIAL_DIRECTIVES],
                        providers: [
                            http_1.Http,
                            http_1.ConnectionBackend,
                            http_1.HTTP_PROVIDERS,
                            all_1.MATERIAL_PROVIDERS,
                            url_service_1.UrlService
                        ]
                    }),
                    router_1.RouteConfig([
                        {
                            path: 'hunt/:username/:huntID',
                            name: 'SearchParty',
                            component: searchparty_component_1.SearchPartyComponent
                        },
                    ]), 
                    __metadata('design:paramtypes', [url_service_1.UrlService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map