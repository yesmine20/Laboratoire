import { Routes } from '@angular/router';
import { MemberForm } from './member-form/member-form';
import { Member } from './member/member';
import { Tool } from './tool/tool';
import { Article } from './article/article';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
    {
        path: 'create',
        component: MemberForm
    }, {
        path: ':id/edit',
        //: pour dire que c dynamique, on peut mettre n'importe quel id  
        component: MemberForm
    }, {
        path: 'dashboard',
        component: Dashboard
    }, {
        path: 'tools',
        component: Tool
    }, {
        path: 'articles',
        component: Article
    }, {
        path: 'events',
        component: Event
    }, {
        path: 'member',
        component: Member
    }, {
        path: 'login',
        component: Login
    }, {
        path: '', pathMatch: 'full',
        component: Login
    }
];
