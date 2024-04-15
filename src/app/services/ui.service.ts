import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Team} from '../team-manager/team-manager.types';
import {ToastrService} from 'ngx-toastr';
import {GenericMap} from '../types/prototypes';
import {kebabCase} from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class UiService {
    constructor(
        private router: Router,
        private toastr: ToastrService
    ) {}

    public navigateToList(): void {
        const url = '/list';
        this.router.navigate([url]).then((success: boolean) => this.navigationLog(success, url));
    }

    public navigateToDetail(team: Team): void {
        const url = `/detail/${team.id}`;
        this.router.navigate([url]).then((success: boolean) => this.navigationLog(success, url));
    }

    public showSuccessMessage(message: string, title: string): void {
        this.toastr.success(message);
    }

    public showErrorMessage(message: string, title: string): void {
        this.toastr.error(message);
    }

    public showInfoMessage(message: string, title: string): void {
        this.toastr.info(message);
    }

    public showWarningMessage(message: string, title: string): void {
        this.toastr.warning(message);
    }

    public setStyleForTest(colorsMapId: number) {
        let value: string;
        if (colorsMapId === 1) {
            value = 'green';
        } else if (colorsMapId === 2) {
            value = 'blue';
        } else if (colorsMapId === 3) {
            value = 'red';
        } else {
            value = '#3f51b5';
        }
        document.documentElement.style.setProperty('--app-color-header-background', value);
    }

    public setStyles(colorsMap: GenericMap<string>) {
        Object.entries(colorsMap).forEach(([key, value]) => {
            document.documentElement.style.setProperty('--app-' + kebabCase(key), value);
        });
    }

    private navigationLog(success: boolean, url: string): void {
        const logMessage = success ? 'Navigation succeeded: ' : 'Navigation failed: ';
        //console.log(logMessage + url);
    }
}
