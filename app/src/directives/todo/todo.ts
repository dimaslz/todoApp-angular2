///<reference path="../../../../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from "angular2/platform/browser";
import {Component, View, OnInit, Inject, forwardRef, Injector} from "angular2/core";
import {TodoList} from "./list/list";
import {TodoService} from "../../services/service";
import {Task} from "../../models/task";
import {Http, HTTP_BINDINGS,HTTP_PROVIDERS} from 'angular2/http';
import {Ng2Notify, Ng2NotifyService} from 'ng2-notify/notify';

@Component({
    selector: 'todo',
    templateUrl: './directives/todo/todo.tpl.html',
    directives: [TodoList, Ng2Notify]
})

// @View({
//     templateUrl:string = './directives/todo.tpl.html',
//     directives: [TodoList, Notify]
// })

export class Todo implements OnInit {
    private taskInput:Task = new Task("", "", "", "", new Date());
    private typeList = '';
    private componentTodos = [];
    // socket: any;
    private messages: Array<String>;
    private ngService;
    
    ngOnInit() {
        // this.notification.config('right-top', 5000);
        this.todoService.todos$.subscribe(uploadedTodos => {
            this.componentTodos = uploadedTodos;
        });
        this.todoService.getList(this.typeList);
        
        // this.notification.config('right-bottom', 5000);
        // this.socket = io();
        // this.socket.on("chat_message", (msg) => {
        //     console.log('socket message_>     ', msg);
        //     this.todoService.getList('todo');
        //     // this.messages.push(msg);
        // });
        
    }
    
    constructor(public todoService: TodoService, public notify: Ng2NotifyService) {
        // this.ngService = _injector.get(Ng2NotifyService);
        // this.ngService = this._injector.getOptional()
    //     // this.notification.config('right-bottom');
    //     // this.socket = io();
    //     // this.socket.on("chat_message", (msg) => {
    //     //     console.log('socket message_>     ', msg);
    //     //     // this.messages.push(msg);
    //     // });
    };
    
    // public send(message) {
    //     // this.socket.emit("chat_message", message);
    // }
    
    /**
     * addItem
     */
    public addItem() {
        this.todoService.addTask(this.taskInput);
        // this.socket.emit("chat_message", this.taskInput);
        this.taskInput = new Task("", "", "", "", new Date());
    }
    
    /**
     * removeItem
     */
    public removeItem(id:string) {
        this.todoService.removeTask(id);
    }
    
    public selectType(type:string) {
        this.typeList = type;
        this.todoService.getList(type);
    }
}

bootstrap(Todo, [TodoService, Http, Ng2NotifyService, HTTP_PROVIDERS, HTTP_BINDINGS]).catch(console.error);