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
        this.notifications = [];
        this.timeout = null;
        this.notification.notify.subscribe(function (uploaded) {
            _this.setNotify(uploaded);
        });
    }
    ;
    Notify.prototype.clear = function () {
        clearTimeout(this.timeout);
    };
    Notify.prototype.createTimeout = function (notification) {
        var _this = this;
        var timeout = setTimeout(function () {
            notification.notify = !notification.notify;
            setTimeout(function () {
                _this.notifications.shift();
            }, 200);
        }, 5000);
    };
    Notify.prototype.setNotify = function (obj) {
        obj.notify = obj.show;
        obj.type = obj.type;
        obj.message = obj.message;
        this.notifications.push(obj);
        this.createTimeout(obj);
        this.printNotifications();
    };
    Notify.prototype.printNotifications = function () {
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
