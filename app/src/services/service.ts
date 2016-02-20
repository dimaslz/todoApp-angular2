import {Injectable} from "angular2/core";
import {Task} from "../models/task";
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {Ng2NotifyService} from 'ng2-notify/notify';

var apiUrl = 'http://todo-node-api.dimaslz.io';
declare var io: any;

@Injectable()
export class TodoService {
    todos$: Observable<Array<Task>>;
    update: Observable<boolean>;
    private _todosObserver: any;
    private _updateObserver: any;
    private _dataStore : {
        todos: Array<Task>
    };
    public socket: any;
    
    public todos = [];
    
    constructor(private http: Http, private notification: Ng2NotifyService) {
        this.socket = io();
        
        this.todos$ = new Observable(observer => this._todosObserver = observer).share();
        this.update = new Observable(observer => this._updateObserver = observer).share();
        
        this._dataStore = { todos: [] };
    };
    
    public getList(status = '') {
        this.http.get(apiUrl+'/api/list', {search: 'status='+status})
        .map((response) => {
            // return response.json().data;
            var data: Array<Task> = [];
            response.json().data.forEach(function(value, index) {
                data.push(new Task(value._id, value.name, value.description, value.status, value.date));
            });
            
            return data;
        })
        .subscribe((data) => {
            this._dataStore.todos = data;
            
            this._todosObserver.next(this._dataStore.todos);
        }, error => console.error('Could not load todos'));
    }
    
    addTask(task:Task) {
        var str = '';
        Object.getOwnPropertyNames(task).forEach(function(val, idx, array) {
            str += val + '=' + task[val]+'&';
        });
        let creds = JSON.stringify(str);
        
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post(apiUrl+'/api/add', creds, { headers: headers })
            .map(response => response.json()).subscribe(data => {
                var data = data.result;
                var objTask = new Task(data._id, data.name, data.description, data.status, data.date);
                this._todosObserver.next(this._dataStore.todos);
                this.socket.emit("reloadList", {type: 'success', message: 'Task added'});
                // this.notification.show('success', 'Task Added');
                // this.reloadList();
        }, error => console.log('Could not create todo.'));
    }
    
    removeTask(task) {
        var headers = new Headers();
        this.http.delete(apiUrl+'/api/'+task.id+'/delete')
            .map(response => response.json()).subscribe(data => {
                // this.notification.show('success', 'Task Removed');
                // this.reloadList();
                this.socket.emit("reloadList", {type: 'success', message: 'Task deleted'});
        }, error => console.log('Could not create todo.'));
    }
    
    reloadList() {
        this._updateObserver.next(true);
    }
    
    updateStatus(task, type) {
        var str = '';
        var currentStatus = task.status;
        task.status = type;
        Object.getOwnPropertyNames(task).forEach(function(val, idx, array) {
            str += val + '=' + task[val]+'&';
        });
        let creds = JSON.stringify(str);
        
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.put(apiUrl+'/api/'+task.id+'/update/status', creds, { headers: headers })
            .map(response => response.json()).subscribe(data => {
                // this.reloadList();
                // this.notification.show('success', 'Task '+type);
                this.socket.emit("reloadList", {type: 'success', message: 'Task'});
        }, error => console.log('Could not create todo.'));
    }
}