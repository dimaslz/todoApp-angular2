import {Injectable} from "angular2/core";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

@Injectable()
export class Notification {
    notify: Observable<Object>;
    private notifyObserver: any;
    
    constructor() {
        this.notify = new Observable(observer => this.notifyObserver = observer).share();
    };
    
    show(type:String, message:String) {
        this.notifyObserver.next({type: type, message: message, show:true}); 
    }
}