var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var browser_1 = require("angular2/platform/browser");
var core_1 = require("angular2/core");
var list_1 = require("./list/list");
var service_1 = require("../../services/service");
var task_1 = require("../../models/task");
var http_1 = require('angular2/http');
var ng2_notify_1 = require('../ng2-notify/ng2-notify');
var ng2_notify_2 = require('../../services/ng2-notify');
var Todo = (function () {
    function Todo(todoService, notification) {
        this.todoService = todoService;
        this.notification = notification;
        this.taskInput = new task_1.Task("", "", "", "", new Date());
        this.typeList = '';
    }
    Todo.prototype.ngOnInit = function () {
        var _this = this;
        this.notification.config('right-top', 5000);
        this.todoService.todos$.subscribe(function (uploadedTodos) {
            _this.componentTodos = uploadedTodos;
        });
        this.todoService.getList(this.typeList);
    };
    ;
    Todo.prototype.send = function (message) {
        this.socket.emit("chat_message", message);
    };
    Todo.prototype.addItem = function () {
        this.todoService.addTask(this.taskInput);
        this.taskInput = new task_1.Task("", "", "", "", new Date());
    };
    Todo.prototype.removeItem = function (id) {
        this.todoService.removeTask(id);
    };
    Todo.prototype.go = function () {
        this.notification.show('warning', 'test message');
    };
    Todo.prototype.selectType = function (type) {
        this.typeList = type;
        this.todoService.getList(type);
    };
    Todo = __decorate([
        core_1.Component({
            selector: 'todo',
            templateUrl: './directives/todo/todo.tpl.html',
            directives: [list_1.TodoList, ng2_notify_1.Ng2Notify]
        }), 
        __metadata('design:paramtypes', [service_1.TodoService, ng2_notify_2.Ng2NotifyService])
    ], Todo);
    return Todo;
})();
browser_1.bootstrap(Todo, [service_1.TodoService, http_1.Http, http_1.HTTP_PROVIDERS, ng2_notify_2.Ng2NotifyService, http_1.HTTP_BINDINGS]).catch(console.error);

//# sourceMappingURL=todo.js.map
