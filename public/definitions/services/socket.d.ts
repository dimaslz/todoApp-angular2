import { Task } from "../models/task";
import { Observable } from 'rxjs/Observable';
import { Ng2NotifyService } from 'ng2-notify/notify';
import { TodoService } from "./service";
export declare class SocketService {
    private notification;
    private todoService;
    socket$: Observable<Array<Task>>;
    private _socketObserver;
    socket: any;
    constructor(notification: Ng2NotifyService, todoService: TodoService);
    reloadList(type: string, message: any): void;
}
