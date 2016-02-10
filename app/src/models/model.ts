export class TodoModel {
    public editable:boolean = false;
    constructor(public title:string = "", public status:string = "started") {}
    
    toggle():void {
        this.status = this.status == "started" ? "completed" : "started"
    }
    
    toggleEdit():void {
        this.editable = !this.editable;
    }
}