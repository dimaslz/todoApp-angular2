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
var service_1 = require('../../../services/service');
var TodoList = (function () {
    function TodoList(todoService) {
        // this.todoService.todos$.subscribe(uploadedTodos => {
        //     console.log(uploadedTodos);
        //     this.componentTodos = uploadedTodos
        // });
        // this.todoService.getList();
        // todoService.todos$.subscribe(uploadedTodos => this.componentTodos = uploadedTodos);
        // todoService.getList();
        this.todoService = todoService;
    }
    ;
    TodoList.prototype.updateStatus = function (item, status) {
        this.todoService.updateStatus(item, status);
    };
    TodoList.prototype.delete = function (item) {
        this.todoService.removeTask(item);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TodoList.prototype, "typeList");
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TodoList.prototype, "tasks");
    TodoList = __decorate([
        core_1.Component({
            selector: 'todo-list',
            templateUrl: './app/directives/todo/list/list.tpl.html',
        }), 
        __metadata('design:paramtypes', [service_1.TodoService])
    ], TodoList);
    return TodoList;
})();
exports.TodoList = TodoList;
//# sourceMappingURL=list.js.map