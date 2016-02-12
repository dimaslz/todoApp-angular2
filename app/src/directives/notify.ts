import {bootstrap} from "angular2/platform/browser";
import {Component, View, Input} from "angular2/core";
import {Notification} from "../services/notify";

@Component({
    selector: 'notify',
    templateUrl: './directives/notify.tpl.html'
})

// @View({
//     templateUrl:string = './directives/notify.tpl.html',
// })

export class Notify{
    private notifications = [
        // {type: "success", message: "Task Added", show: true},
        // {type: "success", message: "Task Added", show: true},
        // {type: "success", message: "Task Added", show: true}
    ];
    private notify: Boolean;
    private type:String;
    private message:String;
    timeout = null;
    
    constructor (public notification: Notification) {
        this.notification.notify.subscribe(uploaded => {
            this.setNotify(uploaded);
        });
    };
    
    private clear() {
        clearTimeout(this.timeout);
    }
    
    private createTimeout(notification) {
        var timeout = setTimeout(() => {
            notification.notify = !notification.notify;
            setTimeout(() => {
                this.notifications.shift();
            }, 200);
        }, 5000);
    }
    
    private setNotify(obj) {
        obj.notify = obj.show;
        obj.type = obj.type;
        obj.message = obj.message;
        
        this.notifications.push(obj);
        this.createTimeout(obj);
        this.printNotifications();
    }
    
    private printNotifications() {
        // this.notifications.forEach((value, index) => {
        //     console.log(value, index);
        // });
    }
}