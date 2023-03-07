import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ColorStore } from './color-store/color.store';

@Component({
    standalone: true,
    selector: 'arena-of-choices-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, HomeComponent],
    providers: [ColorStore],
})
export class AppComponent {
    title = 'arena-of-choices';
}
