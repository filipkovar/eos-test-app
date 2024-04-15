import {Injectable} from '@angular/core';
import {Team} from '../team-manager/team-manager.types';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    constructor() {}

    public searchTeams(teams: Team[], searchText: string): Team[] {
        const words = searchText.toLowerCase().split(' ');
        let result: Team[] = [];

        for (let team of teams) {
            for (let member of team.members) {
                for (let word of words) {
                    if (member.firstname.toLowerCase() === word || member.lastname.toLowerCase() === word) {
                        result.push(team);
                        break;
                    }
                }
            }
        }

        return result;
    }
}
