var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var StatusPipe = (function () {
    function StatusPipe() {
    }
    StatusPipe.prototype.transform = function (value, _a) {
        var status = _a[0];
        if (status) {
            return value.filter(function (item) { return item.status === status; });
        }
        return value;
    };
    StatusPipe = __decorate([
        core_1.Pipe({
            name: "type"
        }), 
        __metadata('design:paramtypes', [])
    ], StatusPipe);
    return StatusPipe;
})();
exports.StatusPipe = StatusPipe;
//# sourceMappingURL=status.js.map