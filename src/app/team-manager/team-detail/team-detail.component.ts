import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TeamManagerService} from '../team-manager.service';
import {Member, MemberDialogData, Position, Team, TeamDialogData} from '../team-manager.types';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {filter} from 'rxjs';
import {ConfirmDialogComponent} from '../dialogs/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {TeamDialogComponent} from '../dialogs/team-dialog/team-dialog.component';
import {MemberDialogComponent} from '../dialogs/member-dialog/member-dialog.component';
import {UiService} from '../../services/ui.service';

@UntilDestroy()
@Component({
    selector: 'app-team-detail',
    templateUrl: './team-detail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamDetailComponent implements OnInit {
    public team: Team;
    public columnNames = ['firstname', 'lastname', 'position', 'isPlayer', 'isCoach', 'editMember', 'deleteMember'];
    public positions: Position[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private teamManagerService: TeamManagerService,
        private changeDetectorRef: ChangeDetectorRef,
        private uiService: UiService,
        private dialog: MatDialog
    ) {}

    public ngOnInit(): void {
        const teamId = this.activatedRoute.snapshot.params['teamId'];
        this.teamManagerService
            .getTeam(teamId)
            .pipe(untilDestroyed(this), filter(Boolean))
            .subscribe((team: Team) => {
                this.team = team;
                this.changeDetectorRef.markForCheck();
            });

        this.teamManagerService
            .getPositions()
            .pipe(untilDestroyed(this), filter(Boolean))
            .subscribe((position: Position[]) => {
                this.positions = position;
                this.changeDetectorRef.markForCheck();
            });
    }

    public backToList(): void {
        this.uiService.navigateToList();
    }

    public deleteTeam(team: Team): void {
        const message = 'Are you want to delete ' + team.name + ' team?';
        this.dialog
            .open(ConfirmDialogComponent, {
                data: message
            })
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.teamManagerService
                        .deleteTeam(team.id)
                        .pipe(untilDestroyed(this), filter(Boolean))
                        .subscribe(() => {
                            this.uiService.navigateToList();
                        });
                }
            });
    }

    public updateTeam(team: Team): void {
        const teamDialogData = {
            message: 'Update team',
            team: team
        } as TeamDialogData;
        this.dialog
            .open(TeamDialogComponent, {data: teamDialogData, width: '400px'})
            .afterClosed()
            .subscribe((updatedTeam: Team) => {
                if (updatedTeam) {
                    this.teamManagerService
                        .updateTeam(updatedTeam)
                        .pipe(untilDestroyed(this), filter(Boolean))
                        .subscribe((data: Team) => {
                            this.team = team;
                            this.changeDetectorRef.markForCheck();
                        });
                }
            });
    }

    public addMember(team: Team): void {
        const memberDialogData = {
            message: 'Add member',
            positions: this.positions
        } as MemberDialogData;
        this.dialog
            .open(MemberDialogComponent, {data: memberDialogData, width: '400px'})
            .afterClosed()
            .subscribe((newMember: Member) => {
                if (newMember) {
                    this.teamManagerService
                        .addMember(team, newMember)
                        .pipe(untilDestroyed(this), filter(Boolean))
                        .subscribe((data: Team) => {
                            this.team.members = [...data.members];
                            this.changeDetectorRef.markForCheck();
                        });
                }
            });
    }

    public editMember(member: Member): void {
        const memberDialogData = {
            message: 'Update member',
            member: member,
            positions: this.positions
        } as MemberDialogData;
        this.dialog
            .open(MemberDialogComponent, {data: memberDialogData, width: '400px'})
            .afterClosed()
            .subscribe((updatedMember: Member) => {
                if (updatedMember) {
                    this.teamManagerService
                        .updateMember(this.team.id, updatedMember)
                        .pipe(untilDestroyed(this), filter(Boolean))
                        .subscribe((data: Team) => {
                            this.team.members = [...data.members];
                            this.changeDetectorRef.markForCheck();
                        });
                }
            });
    }

    public deleteMember(member: Member): void {
        const message = 'Are you want to delete ' + member.firstname + ' ' + member.lastname + ' member?';
        this.dialog
            .open(ConfirmDialogComponent, {
                data: message
            })
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.teamManagerService
                        .deleteMember(this.team.id, member.id)
                        .pipe(untilDestroyed(this), filter(Boolean))
                        .subscribe((team: Team) => {
                            this.team = team;
                            this.changeDetectorRef.markForCheck();
                        });
                }
            });
    }
}
