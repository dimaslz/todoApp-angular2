import {Pipe} from "angular2/core";

@Pipe({
    name: "type"
})
export class StatusPipe{
    transform(value, [status]){
        if(status) {
            return value.filter((item)=> item.status === status);    
        }
        
        return value;
    }
}