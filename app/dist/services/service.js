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
var task_1 = require("../models/task");
var components_1 = require('ng2-notify/components');
var http_1 = require('angular2/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/share');
require('rxjs/add/operator/map');
var apiUrl = 'http://192.168.1.128:8081';
var TodoService = (function () {
    function TodoService(http, notification) {
        var _this = this;
        this.http = http;
        this.notification = notification;
        this.todos = [];
        this.todos$ = new Observable_1.Observable(function (observer) { return _this._todosObserver = observer; }).share();
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
            _this.getList();
            _this._todosObserver.next(_this._dataStore.todos);
            _this.notification.show('success', 'Task Added');
        }, function (error) { return console.log('Could not create todo.'); });
    };
    TodoService.prototype.removeTask = function (task) {
        var _this = this;
        var headers = new http_1.Headers();
        this.http.delete(apiUrl + '/api/' + task.id + '/delete')
            .map(function (response) { return response.json(); }).subscribe(function (data) {
            _this.notification.show('success', 'Task Removed');
            _this.getList();
        }, function (error) { return console.log('Could not create todo.'); });
    };
    TodoService.prototype.addTodo = function (todo) {
        if (todo) {
            this.todos = this.todos.concat([todo]);
        }
    };
    TodoService.prototype.updateStatus = function (task, type) {
        var _this = this;
        var str = '';
        var currentStatus = task.status;
        task.status = type;
        Object.getOwnPropertyNames(task).forEach(function (val, idx, array) {
            str += val + '=' + task[val] + '&';
        });
        console.log(str);
        var creds = JSON.stringify(str);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.put(apiUrl + '/api/' + task.id + '/update/status', creds, { headers: headers })
            .map(function (response) { return response.json(); }).subscribe(function (data) {
            _this.notification.show('success', 'Task ' + type);
            _this.getList();
        }, function (error) { return console.log('Could not create todo.'); });
    };
    TodoService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, (typeof (_a = typeof components_1.Ng2NotifyService !== 'undefined' && components_1.Ng2NotifyService) === 'function' && _a) || Object])
    ], TodoService);
    return TodoService;
    var _a;
})();
exports.TodoService = TodoService;
//# sourceMappingURL=service.js.map