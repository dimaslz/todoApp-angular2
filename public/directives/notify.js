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
var notify_1 = require("../services/notify");
var Notify = (function () {
    function Notify(notification) {
        var _this = this;
        this.notification = notification;
        this.timeout = null;
        this.notification.notify.subscribe(function (uploaded) {
            console.log(uploaded);
            _this.setNotify(uploaded);
            _this.notify = true;
            _this.createTimeout();
        });
    }
    ;
    Notify.prototype.clear = function () {
        clearTimeout(this.timeout);
    };
    Notify.prototype.createTimeout = function () {
        var _this = this;
        this.timeout = setTimeout(function () {
            _this.notify = !_this.notify;
        }, 2000);
    };
    Notify.prototype.setNotify = function (obj) {
        this.notify = obj.show;
        this.type = obj.type;
        this.message = obj.message;
    };
    Notify = __decorate([
        core_1.Component({
            selector: 'notify',
            templateUrl: './directives/notify.tpl.html'
        }), 
        __metadata('design:paramtypes', [notify_1.Notification])
    ], Notify);
    return Notify;
})();
exports.Notify = Notify;

//# sourceMappingURL=notify.js.map
