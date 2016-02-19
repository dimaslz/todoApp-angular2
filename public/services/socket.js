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
var notify_1 = require('ng2-notify/notify');
var service_1 = require("./service");
var apiUrl = 'http://todo-node-api.dimaslz.io';
var SocketService = (function () {
    function SocketService(notification, todoService) {
        var _this = this;
        this.notification = notification;
        this.todoService = todoService;
        this.socket = io('http://192.168.1.128:3000');
        this.socket$ = new Observable_1.Observable(function (observer) { return _this._socketObserver = observer; }).share();
    }
    ;
    SocketService.prototype.reloadList = function (type, message) {
        this.todoService.reloadList();
        this.notification.show(type, message);
    };
    SocketService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [notify_1.Ng2NotifyService, service_1.TodoService])
    ], SocketService);
    return SocketService;
})();
exports.SocketService = SocketService;

//# sourceMappingURL=socket.js.map
