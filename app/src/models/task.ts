export class Task {
    public editable: Boolean;
    private id: String;
    private name: String;
    private description: String;
    private status: String;
    private date: Date;
    
    constructor(id:string = "", name:string = "", description:string = "", status:string = "started", date:Date) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
        this.date = date;
        this.editable = false;
    }
    
    toggle():void {
        this.status = this.status == "started" ? "completed" : "started"
    }
    
    toggleEdit():void {
        this.editable = !this.editable;
    }
}