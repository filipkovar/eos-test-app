import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Team, TeamDialogData} from '../../team-manager.types';
import {v4 as uuidv4} from 'uuid';

@Component({
    selector: 'app-add-team-dialog',
    templateUrl: './team-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamDialogComponent implements OnInit {
    public form: FormGroup;
    public update: boolean;

    constructor(
        @Inject(MAT_DIALOG_DATA) public teamDialogData: TeamDialogData,
        private dialogRef: MatDialogRef<TeamDialogComponent>,
        private fb: FormBuilder
    ) {
        this.update = !!this.teamDialogData?.team;
    }

    public ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', Validators.required]
        });
        if (this.update) {
            this.form.controls['name']?.setValue(this.teamDialogData.team.name);
        }
    }

    public onCancel(): void {
        this.dialogRef.close();
    }

    public onConfirm(): void {
        if (this.form.invalid) {
            this.onCancel();
        }
        const team = {
            id: this.update ? this.teamDialogData.team.id : uuidv4(),
            name: this.form.value.name,
            members: this.teamDialogData?.team?.members || []
        } as Team;
        this.dialogRef.close(team);
    }
}
