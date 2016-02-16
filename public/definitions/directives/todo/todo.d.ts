/// <reference path="../../../github/todoApp-angular2/node_modules/angular2/typings/browser.d.ts" />
import { OnInit } from "angular2/core";
import { TodoService } from "../../services/service";
import { Ng2NotifyService } from 'ng2-notify/notify';
export declare class Todo implements OnInit {
    todoService: TodoService;
    notify: Ng2NotifyService;
    private taskInput;
    private typeList;
    private componentTodos;
    private messages;
    private ngService;
    ngOnInit(): void;
    constructor(todoService: TodoService, notify: Ng2NotifyService);
    addItem(): void;
    removeItem(id: string): void;
    selectType(type: string): void;
}
