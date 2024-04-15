import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ExampleInsteadDbService} from '../services/example-instead-db.service';
import {Member, Position, Team} from './team-manager.types';

@Injectable({
    providedIn: 'root'
})
export class TeamManagerService {
    constructor(private exampleInsteadDbService: ExampleInsteadDbService) {}

    public isDataLoaded(): Observable<boolean> {
        return this.exampleInsteadDbService.isDataLoaded();
    }

    public getTeams(): Observable<Team[]> {
        return this.exampleInsteadDbService.getTeams();
    }

    public getTeam(teamId: string): Observable<Team> {
        return this.exampleInsteadDbService.getTeam(teamId);
    }

    public getPositions(): Observable<Position[]> {
        return this.exampleInsteadDbService.getPositions();
    }

    public getMembers(): Observable<Member[]> {
        return this.exampleInsteadDbService.getMembers();
    }

    public deleteTeam(teamId: string): Observable<Team[]> {
        return this.exampleInsteadDbService.deleteTeam(teamId);
    }

    public deleteMember(teamId: string, memberId: string): Observable<Team> {
        return this.exampleInsteadDbService.deleteMember(teamId, memberId);
    }

    public addTeam(team: Team): Observable<Team[]> {
        return this.exampleInsteadDbService.addTeam(team);
    }

    public addMember(team: Team, member: Member): Observable<Team> {
        return this.exampleInsteadDbService.addMember(team, member);
    }

    public updateMember(teamId: string, member: Member): Observable<Team> {
        return this.exampleInsteadDbService.updateMember(teamId, member);
    }

    public updateTeam(team: Team): Observable<Team> {
        return this.exampleInsteadDbService.updateTeam(team);
    }
}
