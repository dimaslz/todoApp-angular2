var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/share');
require('rxjs/add/operator/map');
var Ng2NotifyService = (function () {
    function Ng2NotifyService() {
        var _this = this;
        this.position = 'right-bottom';
        this.duration = 2000;
        this.notify = new Observable_1.Observable(function (observer) { return _this.notifyObserver = observer; }).share();
    }
    ;
    Ng2NotifyService.prototype.show = function (type, message) {
        this.notifyObserver.next({ type: type, message: message, show: true, position: this.position, duration: this.duration });
    };
    Ng2NotifyService.prototype.config = function (position, duration) {
        if (position === void 0) { position = 'right-bottom'; }
        if (duration === void 0) { duration = 2000; }
        this.position = position;
        this.duration = duration;
    };
    Ng2NotifyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Ng2NotifyService);
    return Ng2NotifyService;
})();
exports.Ng2NotifyService = Ng2NotifyService;
//# sourceMappingURL=ng2-notify.js.map