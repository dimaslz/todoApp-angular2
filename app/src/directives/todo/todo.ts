///<reference path="../../../../node_modules/angular2/typings/browser.d.ts"/>
import {Component, View, OnInit, Inject, forwardRef, Injector} from "angular2/core";
import {TodoList} from "./list/list";
import {TodoService} from "../../services/service";
import {Task} from "../../models/task";
import {Http, HTTP_BINDINGS,HTTP_PROVIDERS} from 'angular2/http';
import {Ng2Notify, Ng2NotifyService} from 'ng2-notify/notify';
import {ROUTER_DIRECTIVES, RouteParams, RouteConfig, Router, RouterLink} from 'angular2/router';

declare var io: any;
@Component({
    selector: 'todo',
    providers: [Ng2NotifyService, TodoService, Http, HTTP_BINDINGS, HTTP_PROVIDERS]
})

@View({
    templateUrl: './directives/todo/todo.tpl.html',
    directives: [TodoList, Ng2Notify, ROUTER_DIRECTIVES, RouterLink]
})

export class Todo implements OnInit {
    private taskInput:Task = new Task("", "", "", "", new Date());
    private typeList = '';
    private componentTodos = [];
    public  socket: any;
    private messages: Array<String>;
    private ngService;
    
    ngOnInit() {
        this.todoService.todos$.subscribe(uploadedTodos => {
            this.componentTodos = uploadedTodos;
        });
        this.typeList = this.params.get('list') ? this.params.get('list') : '';
        this.todoService.getList(this.typeList);
    }
    
    constructor(
        public todoService: TodoService, 
        public notify: Ng2NotifyService,
        public notification:Ng2NotifyService,
        public params:RouteParams) {
            
        this.socket = io('http://localhost:5000');
        this.socket.on("reloadList", (notification) => {
            this.notification.show(notification.type, notification.message);
            this.todoService.getList(this.typeList);
        });
    };

    /**
     * addItem
     */
    public addItem() {
        this.todoService.addTask(this.taskInput);
        this.taskInput = new Task("", "", "", "", new Date());
    }
}