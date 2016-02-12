import {bootstrap} from "angular2/platform/browser";
import {Component, View, OnInit} from "angular2/core";
import {TodoList} from "./list/list";
import {TodoService} from "../../services/service";
import {Task} from "../../models/task";
import {Http, HTTP_BINDINGS,HTTP_PROVIDERS} from 'angular2/http';
import {Notify} from '../notify/notify';
import {Notification} from '../../services/notify';

declare var io: any;

@Component({
    selector: 'todo',
    templateUrl: './directives/todo.tpl.html',
    directives: [TodoList, Notify]
})

// @View({
//     templateUrl:string = './directives/todo.tpl.html',
//     directives: [TodoList, Notify]
// })

class Todo implements OnInit {
    taskInput:Task = new Task("", "", "", "", new Date());
    public typeList = '';
    public componentTodos;
    socket: any;
    messages: Array<String>;
    
    ngOnInit() {
        this.todoService.todos$.subscribe(uploadedTodos => {
            console.log('uploadedTodos', uploadedTodos);
            this.componentTodos = uploadedTodos;
        });
        this.todoService.getList(this.typeList);
        // this.socket = io();
        // this.socket.on("chat_message", (msg) => {
        //     console.log('socket message_>     ', msg);
        //     this.todoService.getList('todo');
        //     // this.messages.push(msg);
        // });
        
    }
    
    constructor(public todoService: TodoService, public notification: Notification) {
        // this.socket = io();
        // this.socket.on("chat_message", (msg) => {
        //     console.log('socket message_>     ', msg);
        //     // this.messages.push(msg);
        // });
    };
    
    public send(message) {
        this.socket.emit("chat_message", message);
    }
    
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
    
    public go() {
        this.notification.show('warning', 'test message');
    }
    
    public selectType(type:string) {
        this.typeList = type;
        console.log('dfasd', type);
        this.todoService.getList(type);
    }
}

bootstrap(Todo, [TodoService, Http, HTTP_PROVIDERS, Notification, HTTP_BINDINGS]).catch(console.error);