import { Task } from "../models/task";
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { Ng2NotifyService } from 'ng2-notify/notify';
export declare class TodoService {
    private http;
    private notification;
    todos$: Observable<Array<Task>>;
    update: Observable<boolean>;
    private _todosObserver;
    private _updateObserver;
    private _dataStore;
    socket: any;
    todos: any[];
    constructor(http: Http, notification: Ng2NotifyService);
    getList(status?: string): void;
    addTask(task: Task): void;
    removeTask(task: any): void;
    reloadList(): void;
    updateStatus(task: any, type: any): void;
}
