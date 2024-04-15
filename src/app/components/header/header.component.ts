import {ChangeDetectionStrategy, Component} from '@angular/core';
import {UiService} from '../../services/ui.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    public collapsed = true;

    constructor(private uiService: UiService) {}

    public setStyle(id: number): void {
        this.uiService.setStyleForTest(id);
    }
}
