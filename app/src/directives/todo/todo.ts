import {bootstrap} from "angular2/platform/browser";
import {Component, View, OnInit} from "angular2/core";
import {TodoList} from "./list/list";
import {TodoService} from "../../services/service";
import {Task} from "../../models/task";
import {Http, HTTP_BINDINGS,HTTP_PROVIDERS} from 'angular2/http';
import {Ng2Notify} from '../ng2-notify/ng2-notify';
import {Ng2NotifyService} from '../../services/ng2-notify';
// import {Notification} from '../../services/notify';
// import {Ng2Notify, Ng2NotifyService} from 'ng2-notify/components';
// import {HelloWorld} from 'angular2-library-example/components';

declare var io: any;

@Component({
    selector: 'todo',
    templateUrl: './directives/todo/todo.tpl.html',
    directives: [TodoList, Ng2Notify]
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
        this.notification.config('right-top', 5000);
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
    
    constructor(public todoService: TodoService, public notification: Ng2NotifyService) {
        // this.notification.config('right-bottom');
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
        this.todoService.getList(type);
    }
}

bootstrap(Todo, [TodoService, Http, HTTP_PROVIDERS, Ng2NotifyService, HTTP_BINDINGS]).catch(console.error);