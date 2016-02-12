import {Injectable} from "angular2/core";
import {TodoModel} from "../models/model";
import {Task} from "../models/task";
import {Notification} from "../services/notify";
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

// var apiUrl = 'http://todo-node-api.dimaslz.io';
var apiUrl = 'http://192.168.1.128:8081';

@Injectable()
export class TodoService {
    todos$: Observable<Array<Task>>;
    private _todosObserver: any;
    private _dataStore : {
        todos: Array<Task>
    };
    
    public todos = [];
    
    constructor(private http: Http, public notification:Notification) {
        this.todos$ = new Observable(observer => this._todosObserver = observer).share();
        
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
            // console.log('data--->   ', data);
            
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
                // this._dataStore.todos.push(objTask);
                this.getList();
                this._todosObserver.next(this._dataStore.todos);
                this.notification.show('success', 'Task Added');
        }, error => console.log('Could not create todo.'));
    }
    
    removeTask(task) {
        var headers = new Headers();
        this.http.delete(apiUrl+'/api/'+task.id+'/delete')
            .map(response => response.json()).subscribe(data => {
                this.notification.show('success', 'Task Removed');
                this.getList();
        }, error => console.log('Could not create todo.'));
    }
    
    public addTodo(todo: TodoModel) {
        if(todo) {
            this.todos = [...this.todos, todo];
        }
    }
    
    
    updateStatus(task, type) {
        var str = '';
        var currentStatus = task.status;
        task.status = type;
        Object.getOwnPropertyNames(task).forEach(function(val, idx, array) {
            str += val + '=' + task[val]+'&';
        });
        console.log(str);
        let creds = JSON.stringify(str);
        
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.put(apiUrl+'/api/'+task.id+'/update/status', creds, { headers: headers })
            .map(response => response.json()).subscribe(data => {
                this.notification.show('success', 'Task '+type);
                this.getList();
        }, error => console.log('Could not create todo.'));
    }
}