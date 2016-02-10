import {bootstrap} from "angular2/platform/browser";
import {TodoService} from "../services/service";
import {Component, View, OnInit, Input, Output} from "angular2/core";

@Component({
    selector: 'todo-item',
    templateUrl: './directives/item.tpl.html'
})

// @View({
//     templateUrl:string = './directives/item.tpl.html'
// })

export class TodoItem {
    @Input() item;
    @Input() tasks;
    @Input() typeList;
    public removing = false;
    public toStatus = false;
    public actions = [];
    
    constructor(public todoService:TodoService) {
    }
    
    private updateStatus(item, status) {
        this.todoService.updateStatus(item, status);
    }
    
    private delete(item) {
        this.todoService.removeTask(item);
    }
}