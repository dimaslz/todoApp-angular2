var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/share');
require('rxjs/add/operator/map');
var Notification = (function () {
    function Notification() {
        var _this = this;
        this.notify = new Observable_1.Observable(function (observer) { return _this.notifyObserver = observer; }).share();
    }
    ;
    Notification.prototype.show = function (type, message) {
        this.notifyObserver.next({ type: type, message: message, show: true });
    };
    Notification = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Notification);
    return Notification;
})();
exports.Notification = Notification;

//# sourceMappingURL=notify.js.map
