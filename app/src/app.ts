import {Component, provide, View, Inject} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router, RouterLink, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {Todo} from './directives/todo/todo';
import {bootstrap} from 'angular2/platform/browser';

declare var io: any;

@Component ({
    selector: 'app',
    providers: [ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})],
})

@View ({
    template: `
        <router-outlet></router-outlet>
    `,
    directives: [Todo, RouterLink, ROUTER_DIRECTIVES],
})

@RouteConfig([
    {
        path: '/tasks/all',
        name: 'TaskAll',
        component: Todo,
        useAsDefault: true
    },
    {
        path: '/tasks/detail/:name',
        name: 'TaskDetail',
        component: Todo,
    },
    {
        path: '/tasks/:list',
        name: 'TaskList',
        component: Todo,
    },
    { path: '/**', redirectTo: ['TaskAll'] }
])

export class App {
    private socket: any;
    private currentRoute: string;
    
    constructor(private router: Router) {
        this.socket = io('http://localhost:3000');
        this.socket.on("changeRoute", (route) => {
            if(this.currentRoute != route) {
                this.currentRoute = route;
                this.router.navigateByUrl(route);   
            }
        });
        this.router.subscribe((route) => {
            this.socket.emit("changeRoute", route);
        })
    }
}

bootstrap(App, []).catch(console.error);