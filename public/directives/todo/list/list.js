"use strict";
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
var service_1 = require('../../../services/service');
var TodoList = (function () {
    function TodoList(todoService) {
        var _this = this;
        this.todoService = todoService;
        this.todoService.update.subscribe(function (value) {
            _this.todoService.getList(_this.typeList);
        });
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
    ], TodoList.prototype, "typeList", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TodoList.prototype, "tasks", void 0);
    TodoList = __decorate([
        core_1.Component({
            selector: 'todo-list',
            templateUrl: './directives/todo/list/list.tpl.html'
        }), 
        __metadata('design:paramtypes', [service_1.TodoService])
    ], TodoList);
    return TodoList;
}());
exports.TodoList = TodoList;

//# sourceMappingURL=list.js.map
