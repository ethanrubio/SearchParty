System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var ScrollGlue;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ScrollGlue = (function () {
                function ScrollGlue(_el) {
                    this._el = _el;
                    this.isLocked = false;
                    this._oldScrollHeight = 0;
                    this.el = _el.nativeElement;
                }
                ScrollGlue.prototype.onScroll = function () {
                    var percent = (this.el.scrollHeight / 100);
                    if (this.el.scrollHeight - this.el.scrollTop > (10 * percent)) {
                        this.isLocked = true;
                    }
                    else {
                        this.isLocked = false;
                    }
                };
                ScrollGlue.prototype.ngAfterContentInit = function () {
                    var _this = this;
                    this.el.scrollTop = this.el.scrollHeight;
                    // create an observer instance
                    this._observer = new MutationObserver(function (mutations) {
                        if (!_this.isLocked) {
                            _this._oldScrollHeight = _this.el.scrollHeight;
                            _this.el.scrollTop = _this.el.scrollHeight;
                        }
                    });
                    // configuration of the observer:
                    var config = { childList: true, subtree: true };
                    var target = this.el;
                    // pass in the target node, as well as the observer options
                    this._observer.observe(target, config);
                };
                ScrollGlue.prototype.ngOnDestroy = function () {
                    this._observer.disconnect();
                };
                ScrollGlue = __decorate([
                    core_1.Directive({
                        selector: '[scroll-glue]',
                        host: {
                            '(scroll)': 'onScroll()'
                        }
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], ScrollGlue);
                return ScrollGlue;
            }());
            exports_1("ScrollGlue", ScrollGlue);
        }
    }
});
//# sourceMappingURL=scrollglue.component.js.map