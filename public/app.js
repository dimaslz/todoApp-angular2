var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var todo_1 = require('./directives/todo/todo');
var browser_1 = require('angular2/platform/browser');
var App = (function () {
    function App(router) {
        var _this = this;
        this.router = router;
        this.socket = io('http://localhost:3000');
        this.socket.on("changeRoute", function (route) {
            console.log('emit reveived', route);
            if (_this.currentRoute != route) {
                _this.currentRoute = route;
                _this.router.navigateByUrl(route);
            }
        });
        this.router.subscribe(function (route) {
            console.log(route);
            _this.socket.emit("changeRoute", route);
        });
    }
    App = __decorate([
        core_1.Component({
            selector: 'app',
            providers: [router_1.ROUTER_PROVIDERS, core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy })],
        }),
        core_1.View({
            template: "\n        <router-outlet></router-outlet>\n    ",
            directives: [todo_1.Todo, router_1.RouterLink, router_1.ROUTER_DIRECTIVES],
        }),
        router_1.RouteConfig([
            {
                path: '/tasks/all',
                name: 'TaskAll',
                component: todo_1.Todo,
                useAsDefault: true
            },
            {
                path: '/tasks/detail/:name',
                name: 'TaskDetail',
                component: todo_1.Todo,
            },
            {
                path: '/tasks/:list',
                name: 'TaskList',
                component: todo_1.Todo,
            },
            { path: '/**', redirectTo: ['TaskAll'] }
        ]), 
        __metadata('design:paramtypes', [router_1.Router])
    ], App);
    return App;
})();
exports.App = App;
browser_1.bootstrap(App, []).catch(console.error);

//# sourceMappingURL=app.js.map
