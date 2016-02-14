var Task = (function () {
    function Task(id, name, description, status, date) {
        if (id === void 0) { id = ""; }
        if (name === void 0) { name = ""; }
        if (description === void 0) { description = ""; }
        if (status === void 0) { status = "started"; }
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
        this.date = date;
        this.editable = false;
    }
    Task.prototype.toggle = function () {
        this.status = this.status == "started" ? "completed" : "started";
    };
    Task.prototype.toggleEdit = function () {
        this.editable = !this.editable;
    };
    return Task;
})();
exports.Task = Task;

//# sourceMappingURL=task.js.map
