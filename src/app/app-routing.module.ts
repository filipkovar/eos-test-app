import {NgModule} from '@angular/core';
import {Route, RouterModule, Routes} from '@angular/router';
import {TeamDetailComponent} from './team-manager/team-detail/team-detail.component';
import {TeamListComponent} from './team-manager/team-list/team-list.component';

export const ROUTES: Routes = [];

const HOMEPAGE: Route = {
    path: '',
    component: TeamListComponent
};
ROUTES.push(HOMEPAGE);
const TEAM_LIST: Route = {
    path: 'list',
    component: TeamListComponent
};
ROUTES.push(TEAM_LIST);

const TEAM_DETAIL: Route = {
    path: 'detail/:teamId',
    component: TeamDetailComponent
};
ROUTES.push(TEAM_DETAIL);

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
