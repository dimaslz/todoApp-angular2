import { Task } from "../models/task";
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { Ng2NotifyService } from 'ng2-notify/notify';
export declare class TodoService {
    private http;
    private notification;
    todos$: Observable<Array<Task>>;
    private _todosObserver;
    private _dataStore;
    todos: any[];
    constructor(http: Http, notification: Ng2NotifyService);
    getList(status?: string): void;
    addTask(task: Task): void;
    removeTask(task: any): void;
    updateStatus(task: any, type: any): void;
}
