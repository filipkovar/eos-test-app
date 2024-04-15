export interface Team {
    id: string;
    name: string;
    members: Member[];
}

export interface Member {
    id: string;
    firstname: string;
    lastname: string;
    position: string;
    isPlayer: boolean;
    isCoach: boolean;
}

export interface Position {
    name: string;
}

export interface DialogData {
    message: string;
}

export interface TeamDialogData extends DialogData {
    team: Team;
}

export interface MemberDialogData extends DialogData {
    member: Member;
    positions: Position[];
}
