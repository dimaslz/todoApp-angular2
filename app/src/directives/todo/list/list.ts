import {bootstrap} from "angular2/platform/browser";
import {Component, View, Input} from "angular2/core";
import {TodoService} from '../../../services/service';

@Component({
    selector: 'todo-list',
    templateUrl: './directives/todo/list/list.tpl.html'
})

export class TodoList{
    @Input() typeList;
    @Input() tasks;
    public componentTodos;
    
    constructor (public todoService: TodoService) {
        this.todoService.update.subscribe(value => {
            this.todoService.getList(this.typeList);
        });
    };
    
    private updateStatus(item, status) {
        this.todoService.updateStatus(item, status);
    }
    
    private delete(item) {
        this.todoService.removeTask(item);
    }
}