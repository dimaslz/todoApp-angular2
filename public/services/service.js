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
var task_1 = require("../models/task");
var http_1 = require('angular2/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/share');
require('rxjs/add/operator/map');
var notify_1 = require('ng2-notify/notify');
var apiUrl = 'http://todo-node-api.dimaslz.io';
var TodoService = (function () {
    function TodoService(http, notification) {
        var _this = this;
        this.http = http;
        this.notification = notification;
        this.todos = [];
        this.socket = io('http://localhost:3000');
        this.todos$ = new Observable_1.Observable(function (observer) { return _this._todosObserver = observer; }).share();
        this.update = new Observable_1.Observable(function (observer) { return _this._updateObserver = observer; }).share();
        this._dataStore = { todos: [] };
    }
    ;
    TodoService.prototype.getList = function (status) {
        var _this = this;
        if (status === void 0) { status = ''; }
        this.http.get(apiUrl + '/api/list', { search: 'status=' + status })
            .map(function (response) {
            var data = [];
            response.json().data.forEach(function (value, index) {
                data.push(new task_1.Task(value._id, value.name, value.description, value.status, value.date));
            });
            return data;
        })
            .subscribe(function (data) {
            _this._dataStore.todos = data;
            _this._todosObserver.next(_this._dataStore.todos);
        }, function (error) { return console.error('Could not load todos'); });
    };
    TodoService.prototype.addTask = function (task) {
        var _this = this;
        var str = '';
        Object.getOwnPropertyNames(task).forEach(function (val, idx, array) {
            str += val + '=' + task[val] + '&';
        });
        var creds = JSON.stringify(str);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post(apiUrl + '/api/add', creds, { headers: headers })
            .map(function (response) { return response.json(); }).subscribe(function (data) {
            var data = data.result;
            var objTask = new task_1.Task(data._id, data.name, data.description, data.status, data.date);
            _this._todosObserver.next(_this._dataStore.todos);
            _this.socket.emit("reloadList", { type: 'success', message: 'Task added' });
        }, function (error) { return console.log('Could not create todo.'); });
    };
    TodoService.prototype.removeTask = function (task) {
        var _this = this;
        var headers = new http_1.Headers();
        this.http.delete(apiUrl + '/api/' + task.id + '/delete')
            .map(function (response) { return response.json(); }).subscribe(function (data) {
            _this.socket.emit("reloadList", { type: 'success', message: 'Task deleted' });
        }, function (error) { return console.log('Could not create todo.'); });
    };
    TodoService.prototype.reloadList = function () {
        this._updateObserver.next(true);
    };
    TodoService.prototype.updateStatus = function (task, type) {
        var _this = this;
        var str = '';
        var currentStatus = task.status;
        task.status = type;
        Object.getOwnPropertyNames(task).forEach(function (val, idx, array) {
            str += val + '=' + task[val] + '&';
        });
        var creds = JSON.stringify(str);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.put(apiUrl + '/api/' + task.id + '/update/status', creds, { headers: headers })
            .map(function (response) { return response.json(); }).subscribe(function (data) {
            _this.socket.emit("reloadList", { type: 'success', message: 'Task' });
        }, function (error) { return console.log('Could not create todo.'); });
    };
    TodoService.prototype.updateStatus2 = function (task, type) {
        return new Promise(function (resolve, reject) {
            var str = '';
            var currentStatus = task.status;
            task.status = type;
            Object.getOwnPropertyNames(task).forEach(function (val, idx, array) {
                str += val + '=' + task[val] + '&';
            });
            var creds = JSON.stringify(str);
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            this.http.put(apiUrl + '/api/' + task.id + '/update/status', creds, { headers: headers })
                .map(function (response) { return response.json(); }).subscribe(function (data) {
                resolve(data);
            }, function (error) { return console.log('Could not create todo.'); });
        });
    };
    TodoService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, notify_1.Ng2NotifyService])
    ], TodoService);
    return TodoService;
})();
exports.TodoService = TodoService;

//# sourceMappingURL=service.js.map
