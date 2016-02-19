/// <reference path="../../../github/todoApp-angular2/node_modules/angular2/typings/browser.d.ts" />
import { OnInit } from "angular2/core";
import { TodoService } from "../../services/service";
import { Ng2NotifyService } from 'ng2-notify/notify';
import { RouteParams } from 'angular2/router';
export declare class Todo implements OnInit {
    todoService: TodoService;
    notify: Ng2NotifyService;
    notification: Ng2NotifyService;
    params: RouteParams;
    private taskInput;
    private typeList;
    private componentTodos;
    socket: any;
    private messages;
    private ngService;
    ngOnInit(): void;
    constructor(todoService: TodoService, notify: Ng2NotifyService, notification: Ng2NotifyService, params: RouteParams);
    addItem(): void;
}
