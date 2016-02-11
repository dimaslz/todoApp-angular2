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
require('rxjs/add/operator/share');
require('rxjs/add/operator/map');
var io = require('socket.io');
var apiUrl = 'http://todo-node-api.dimaslz.io';
var Socket = (function () {
    function Socket() {
        this.socket = io();
        this.todos = [];
        this.initListeners();
    }
    ;
    Socket.prototype.getData = function () {
        this.socket.emit('myevent', { value: 'someValue' });
    };
    Socket.prototype.initListeners = function () {
        this.socket.on('myevent', function (data) {
            console.log('socket->  ', data);
        });
    };
    Socket = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Socket);
    return Socket;
})();
exports.Socket = Socket;

//# sourceMappingURL=socket.js.map
