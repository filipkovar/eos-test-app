import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Member, MemberDialogData} from '../../team-manager.types';
import {v4 as uuidv4} from 'uuid';
import {TeamManagerService} from '../../team-manager.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {filter} from 'rxjs';

@UntilDestroy()
@Component({
    selector: 'app-member-dialog',
    templateUrl: './member-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class MemberDialogComponent implements OnInit {
    public form: FormGroup;
    public update: boolean;
    public members: Member[];
    public member: Member;

    constructor(
        @Inject(MAT_DIALOG_DATA) public memberDialogData: MemberDialogData,
        private dialogRef: MatDialogRef<MemberDialogComponent>,
        private fb: FormBuilder,
        private teamManagerService: TeamManagerService,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        this.update = !!this.memberDialogData?.member;

        this.teamManagerService
            .getMembers()
            .pipe(untilDestroyed(this), filter(Boolean))
            .subscribe((members: Member[]) => {
                this.members = members;
                this.changeDetectorRef.markForCheck();
            });
    }

    public ngOnInit(): void {
        this.form = this.fb.group({
            members: [{value: ''}, Validators.required],
            firstname: [{value: '', disabled: true}, Validators.required],
            lastname: [{value: '', disabled: true}, Validators.required],
            position: [{value: ''}, Validators.required],
            isCoach: [false],
            isPlayer: [false]
        });

        if (this.update) {
            this.form.controls['firstname']?.setValue(this.memberDialogData.member.firstname);
            this.form.controls['lastname']?.setValue(this.memberDialogData.member.lastname);
            this.form.controls['position']?.setValue(this.memberDialogData.member.position);
            this.form.controls['isCoach']?.setValue(this.memberDialogData.member.isCoach);
            this.form.controls['isPlayer']?.setValue(this.memberDialogData.member.isPlayer);
        }
    }

    public onCancel(): void {
        this.dialogRef.close();
    }

    public onMemberChange(event: Event): void {
        const id = (event.target as HTMLInputElement).value;
        this.member = this.members.find((member: Member) => member.id === id);
        if (this.member) {
            const position = this.memberDialogData.positions.find(p => p.name === this.member.position);

            this.form.controls['position']?.setValue(position?.name);
            this.form.controls['isCoach']?.setValue(this.member.isCoach);
            this.form.controls['isPlayer']?.setValue(this.member.isPlayer);
        }
    }

    public onConfirm(): void {
        if (this.form.invalid) {
            this.onCancel();
        }
        const member = {
            id: this.update ? this.memberDialogData?.member?.id : uuidv4(),
            firstname: this.memberDialogData?.member?.firstname || this.member.firstname,
            lastname: this.memberDialogData?.member?.lastname || this.member.lastname,
            position: this.form.value.position,
            isCoach: this.form.value.isCoach,
            isPlayer: this.form.value.isPlayer
        } as Member;
        this.dialogRef.close(member);
    }
}
