import { TodoService } from '../../../services/service';
export declare class TodoList {
    todoService: TodoService;
    typeList: any;
    tasks: any;
    componentTodos: any;
    constructor(todoService: TodoService);
    private updateStatus(item, status);
    private delete(item);
}
