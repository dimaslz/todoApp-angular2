import {bootstrap} from "angular2/platform/browser";
import {Component, View, Input} from "angular2/core";
import {TodoService} from '../../../services/service';
// import {StatusPipe} from '../../..//pipes/status';

declare var io: any;

@Component({
    selector: 'todo-list',
    templateUrl: './directives/todo/list/list.tpl.html'
})

export class TodoList{
    @Input() typeList;
    @Input() tasks;
    public componentTodos;
    public socket;
    
    constructor (public todoService: TodoService) {
        this.todoService.update.subscribe(value => {
            this.todoService.getList(this.typeList);
        });
        
        this.socket = io('http://192.168.1.128:3000');
    };
    
    private updateStatus(item, status) {
        this.todoService.updateStatus(item, status);
    }
    
    private delete(item) {
        this.todoService.removeTask(item);
        this.socket.emit("reloadList", {type: 'success', message: 'Task deleted'});
    }
}