import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {TeamListComponent} from './team-manager/team-list/team-list.component';
import {TeamDetailComponent} from './team-manager/team-detail/team-detail.component';
import {TeamDialogComponent} from './team-manager/dialogs/team-dialog/team-dialog.component';
import {MatTableModule} from '@angular/material/table';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButton, MatButtonModule, MatFabButton} from '@angular/material/button';
import {MatTooltip, MatTooltipModule} from '@angular/material/tooltip';
import {ConfirmDialogComponent} from './team-manager/dialogs/confirm-dialog/confirm-dialog.component';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {AppRoutingModule} from './app-routing.module';
import {FlexLayoutServerModule} from '@angular/flex-layout/server';
import {MemberDialogComponent} from './team-manager/dialogs/member-dialog/member-dialog.component';
import {MatCheckbox} from '@angular/material/checkbox';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [AppComponent, HeaderComponent, TeamListComponent, TeamDetailComponent, TeamDialogComponent, ConfirmDialogComponent, MemberDialogComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        MatTableModule,
        FlexLayoutModule,
        FlexLayoutServerModule,
        MatFabButton,
        MatTooltip,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        MatFormFieldModule,
        AppRoutingModule,
        MatCheckbox,
        BrowserAnimationsModule,
        ToastrModule.forRoot({positionClass: 'toast-custom'})
    ],
    providers: [provideAnimationsAsync()],
    bootstrap: [AppComponent]
})
export class AppModule {}
