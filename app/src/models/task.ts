export class Task {
    public editable: boolean;
    private id: string;
    private name: string;
    private description: string;
    private status: string;
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