import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
    selector: 'arena-of-choices-navbar-button',
    standalone: true,
    imports: [CommonModule, RouterLink],
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
