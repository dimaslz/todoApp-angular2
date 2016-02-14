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
var browser_1 = require("angular2/platform/browser");
var core_1 = require("angular2/core");
var list_1 = require("./list/list");
var service_1 = require("../../services/service");
var task_1 = require("../../models/task");
var http_1 = require('angular2/http');
var components_1 = require('ng2-notify/components');
var Todo = (function () {
    function Todo(todoService, notification) {
        this.todoService = todoService;
        this.notification = notification;
        this.taskInput = new task_1.Task("", "", "", "", new Date());
        this.typeList = '';
        this.notification.config('right-bottom', 5000);
    }
    Todo.prototype.ngOnInit = function () {
        var _this = this;
        this.todoService.todos$.subscribe(function (uploadedTodos) {
            console.log('uploadedTodos', uploadedTodos);
            _this.componentTodos = uploadedTodos;
        });
        this.todoService.getList(this.typeList);
        this.notification.config('right-bottom', 5000);
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
        console.log('dfasd', type);
        this.todoService.getList(type);
    };
    Todo = __decorate([
        core_1.Component({
            selector: 'todo',
            templateUrl: './app/directives/todo/todo.tpl.html',
            directives: [list_1.TodoList, components_1.Ng2Notify]
        }), 
        __metadata('design:paramtypes', [service_1.TodoService, (typeof (_a = typeof components_1.Ng2NotifyService !== 'undefined' && components_1.Ng2NotifyService) === 'function' && _a) || Object])
    ], Todo);
    return Todo;
    var _a;
})();
browser_1.bootstrap(Todo, [service_1.TodoService, http_1.Http, http_1.HTTP_PROVIDERS, components_1.Ng2NotifyService, http_1.HTTP_BINDINGS]).catch(console.error);
//# sourceMappingURL=todo.js.map