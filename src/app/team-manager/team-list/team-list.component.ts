import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TeamManagerService} from '../team-manager.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Team, TeamDialogData} from '../team-manager.types';
import {MatDialog} from '@angular/material/dialog';
import {filter, switchMap, take} from 'rxjs';
import {TeamDialogComponent} from '../dialogs/team-dialog/team-dialog.component';
import {SearchService} from '../../services/search.service';
import {UiService} from '../../services/ui.service';

@UntilDestroy()
@Component({
    selector: 'app-team-list',
    templateUrl: './team-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TeamListComponent implements OnInit {
    public columnNames = ['name', 'detail'];
    public teams: Team[] = [];
    public searchText: string;

    constructor(
        public dialog: MatDialog,
        private teamManagerService: TeamManagerService,
        private changeDetectorRef: ChangeDetectorRef,
        private searchService: SearchService,
        private uiService: UiService
    ) {}

    ngOnInit(): void {
        this.loadData();
    }

    public loadData() {
        this.teamManagerService
            .isDataLoaded()
            .pipe(
                switchMap(() => this.teamManagerService.getTeams()),
                filter(Boolean),
                take(1)
            )
            .subscribe((data: Team[]) => {
                this.teams = data;
                this.changeDetectorRef.detectChanges();
            });
    }

    public addTeam(): void {
        const teamDialogData = {
            message: 'Add team'
        } as TeamDialogData;
        this.dialog
            .open(TeamDialogComponent, {data: teamDialogData, width: '400px'})
            .afterClosed()
            .subscribe((newTeam: Team) => {
                if (newTeam) {
                    this.teamManagerService
                        .addTeam(newTeam)
                        .pipe(untilDestroyed(this), filter(Boolean))
                        .subscribe((data: Team[]) => {
                            this.teams = [...data];
                            this.changeDetectorRef.markForCheck();
                        });
                }
            });
    }

    public navigateToTeamDetail(team: Team): void {
        this.uiService.navigateToDetail(team);
    }

    public search(searchText: string): void {
        if (!searchText) {
            this.uiService.showErrorMessage('No name to search!', 'Error');
            this.loadData();
            return;
        }
        this.searchText = searchText;
        this.teams = this.searchService.searchTeams(this.teams, searchText);
        if (this.teams.length === 0) {
            this.uiService.showWarningMessage(`No teams found for '${searchText}'!`, 'Search');
        }
    }

    public onRowClicked(team: Team) {
        this.navigateToTeamDetail(team);
    }
}
