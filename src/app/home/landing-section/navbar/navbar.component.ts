import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarButtonComponent } from './navbar-button/navbar-button.component';

@Component({
    selector: 'arena-of-choices-navbar',
    standalone: true,
    imports: [CommonModule, NavbarButtonComponent],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {}
