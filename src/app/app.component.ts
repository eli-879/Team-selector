import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ColorStore } from './color-store/color.store';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
    standalone: true,
    selector: 'arena-of-choices-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, HomeComponent, RouterModule, NavbarComponent],
    providers: [ColorStore],
})
export class AppComponent {
    title = 'arena-of-choices';
}
