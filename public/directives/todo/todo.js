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
var list_1 = require("./list/list");
var service_1 = require("../../services/service");
var task_1 = require("../../models/task");
var http_1 = require('angular2/http');
var notify_1 = require('ng2-notify/notify');
var router_1 = require('angular2/router');
var Todo = (function () {
    function Todo(todoService, notify, notification, params) {
        var _this = this;
        this.todoService = todoService;
        this.notify = notify;
        this.notification = notification;
        this.params = params;
        this.taskInput = new task_1.Task("", "", "", "", new Date());
        this.typeList = '';
        this.componentTodos = [];
        this.socket = io('http://localhost:8080');
        this.socket.on("reloadList", function (notification) {
            _this.notification.show(notification.type, notification.message);
            _this.todoService.getList(_this.typeList);
        });
    }
    Todo.prototype.ngOnInit = function () {
        var _this = this;
        this.todoService.todos$.subscribe(function (uploadedTodos) {
            _this.componentTodos = uploadedTodos;
        });
        this.typeList = this.params.get('list') ? this.params.get('list') : '';
        this.todoService.getList(this.typeList);
    };
    ;
    Todo.prototype.addItem = function () {
        this.todoService.addTask(this.taskInput);
        this.taskInput = new task_1.Task("", "", "", "", new Date());
    };
    Todo = __decorate([
        core_1.Component({
            selector: 'todo',
            providers: [notify_1.Ng2NotifyService, service_1.TodoService, http_1.Http, http_1.HTTP_BINDINGS, http_1.HTTP_PROVIDERS]
        }),
        core_1.View({
            templateUrl: './directives/todo/todo.tpl.html',
            directives: [list_1.TodoList, notify_1.Ng2Notify, router_1.ROUTER_DIRECTIVES, router_1.RouterLink]
        }), 
        __metadata('design:paramtypes', [service_1.TodoService, notify_1.Ng2NotifyService, notify_1.Ng2NotifyService, router_1.RouteParams])
    ], Todo);
    return Todo;
})();
exports.Todo = Todo;

//# sourceMappingURL=todo.js.map
