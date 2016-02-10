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
    private notify: Boolean;
    private type:String;
    private message:String;
    timeout = null;
    
    constructor (public notification: Notification) {
        this.notification.notify.subscribe(uploaded => {
            console.log(uploaded);
            this.setNotify(uploaded);
            this.notify = true;
            this.createTimeout();
        });
    };
    
    private clear() {
        clearTimeout(this.timeout);
    }
    
    private createTimeout() {
        this.timeout = setTimeout(() => {
            this.notify = !this.notify;
        }, 2000);
    }
    
    private setNotify(obj) {
        this.notify = obj.show;
        this.type = obj.type;
        this.message = obj.message;
    }
}