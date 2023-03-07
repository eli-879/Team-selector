import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'arena-of-choices-navbar-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './navbar-button.component.html',
    styleUrls: ['./navbar-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarButtonComponent {
    @Input() public buttonName: string;
    @Input() public route: string;

    constructor() {
        this.buttonName = '';
        this.route = '';
    }
}
