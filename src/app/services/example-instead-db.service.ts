import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, forkJoin, Observable, of} from 'rxjs';
import {Member, Position, Team} from '../team-manager/team-manager.types';
import {v4 as uuidv4} from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class ExampleInsteadDbService {
    private teams: Team[];
    private members: Member[];
    private positions: Position[];

    private teamsLoadedSubject: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private httpClient: HttpClient) {
        //generate random data
        //this.generateRandomTeams(15);

        //prepared test data in json files
        this.loadData();
    }

    public isDataLoaded(): Observable<boolean> {
        return this.teamsLoadedSubject.asObservable();
    }

    public getTeams(): Observable<Team[]> {
        return of(this.teams);
    }

    public getTeam(teamId: string): Observable<Team> {
        return of(this.teams?.find(team => team.id === teamId));
    }

    public getMembers(): Observable<Member[]> {
        return of(this.members);
    }

    public getPositions(): Observable<Position[]> {
        return of(this.positions);
    }

    public deleteTeam(teamId: string): Observable<Team[]> {
        this.teams = this.teams.filter((team: Team) => team.id !== teamId);
        return of(this.teams);
    }

    public deleteMember(teamId: string, memberId: string): Observable<Team> {
        const team = this.teams.find(team => team.id === teamId);
        team.members = team.members.filter((member: Member) => member.id !== memberId);
        return of(team);
    }

    public addTeam(team: Team): Observable<Team[]> {
        this.teams.push(team);
        return of(this.teams);
    }

    public addMember(team: Team, member: Member): Observable<Team> {
        const origTeam = this.teams.find(t => t.id === team.id);
        origTeam.members.push(member);
        return of(origTeam);
    }

    public updateMember(teamId: string, member: Member): Observable<Team> {
        const origTeam = this.teams.find(team => team.id === teamId);
        origTeam.members.forEach((m: Member, index: number) => {
            if (m.id === member.id) {
                origTeam.members[index] = member;
            }
        });
        return of(origTeam);
    }

    public updateTeam(team: Team): Observable<Team> {
        const origTeam = this.teams.find(t => t.id === team.id);
        origTeam.name = team.name;
        return of(origTeam);
    }

    private generateRandomTeams(numTeams: number): void {
        const teamNames = ['Eagles', 'Tigers', 'Lions', 'Panthers', 'Wolves', 'Hawks', 'Bears', 'Sharks', 'Dragons', 'Cheetahs', 'Leopards', 'Falcons', 'Raptors', 'Scorpions', 'Cobras', 'Vipers', 'Pythons', 'Pumas', 'Jaguars', 'Bulls'];

        const firstNames = ['Jan', 'Jana', 'Petr', 'Eva', 'Lukáš', 'Martina', 'Tomáš', 'Veronika', 'Jakub', 'Michaela', 'David', 'Kateřina', 'Adam', 'Lucie', 'Daniel', 'Karolína', 'Filip', 'Simona', 'Marek', 'Petra'];
        const lastNames = ['Novák', 'Nováková', 'Svoboda', 'Kovářová', 'Nový', 'Černá', 'Kučera', 'Pospíšilová', 'Procházka', 'Marešová', 'Malý', 'Novotná', 'Hrubý', 'Křížová', 'Bartoš', 'Lišková', 'Novák', 'Kadlecová', 'Dvořák', 'Nová'];
        const positions = ['Brankař', 'Obrana', 'Útok', 'Záloha', 'Náhradník'];
        const teams: Team[] = [];
        const members: Member[] = [];

        for (let i = 0; i < numTeams; i++) {
            const team: Team = {
                id: uuidv4(),
                name: `${teamNames[Math.floor(Math.random() * teamNames.length)]} ${i + 1}`,
                members: []
            };

            const numMembers = Math.floor(Math.random() * 4) + 2; // Random number between 2 and 5

            for (let j = 0; j < numMembers; j++) {
                const member: Member = {
                    id: uuidv4(),
                    firstname: firstNames[Math.floor(Math.random() * firstNames.length)],
                    lastname: lastNames[Math.floor(Math.random() * lastNames.length)],
                    position: positions[Math.floor(Math.random() * positions.length)],
                    isPlayer: Math.random() < 0.5,
                    isCoach: Math.random() < 0.5
                };

                team.members.push(member);
            }

            members.push(...team.members);
            teams.push(team);
        }

        console.log(teams);
        console.log(members);
    }

    private loadData(): void {
        forkJoin([this.getTeamsDataFromJson(), this.getMembersDataFromJson(), this.getPositionsDataFromJson()]).subscribe({
            next: ([teams, members, positions]) => {
                this.teams = this.setTeamIds(teams);
                this.members = this.setMemberIds(members);
                this.positions = positions;

                this.teamsLoadedSubject.next(true);
            },
            error: error => {
                console.error('Error while loading data', error);
            }
        });
    }

    private getMembersDataFromJson(): Observable<Member[]> {
        return this.httpClient.get<Member[]>('assets/members-mock-data.json');
    }

    private getTeamsDataFromJson(): Observable<Team[]> {
        return this.httpClient.get<Team[]>('assets/teams-mock-data.json');
    }

    private getPositionsDataFromJson(): Observable<Team[]> {
        return this.httpClient.get<Team[]>('assets/positions-mock-data.json');
    }

    private setTeamIds(teams: Team[]): Team[] {
        return teams.map(team => ({
            id: uuidv4(),
            ...team,
            members: team.members.map(member => ({
                id: uuidv4(),
                ...member
            }))
        }));
    }

    private setMemberIds(members: Member[]): Member[] {
        return members.map(member => ({
            id: uuidv4(),
            ...member
        }));
    }
}
