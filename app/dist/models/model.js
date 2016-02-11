var TodoModel = (function () {
    function TodoModel(title, status) {
        if (title === void 0) { title = ""; }
        if (status === void 0) { status = "started"; }
        this.title = title;
        this.status = status;
        this.editable = false;
    }
    TodoModel.prototype.toggle = function () {
        this.status = this.status == "started" ? "completed" : "started";
    };
    TodoModel.prototype.toggleEdit = function () {
        this.editable = !this.editable;
    };
    return TodoModel;
})();
exports.TodoModel = TodoModel;

//# sourceMappingURL=model.js.map
