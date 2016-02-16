export declare class Task {
    editable: boolean;
    private id;
    private name;
    private description;
    private status;
    private date;
    constructor(id: string, name: string, description: string, status: string, date: Date);
    toggle(): void;
    toggleEdit(): void;
}
