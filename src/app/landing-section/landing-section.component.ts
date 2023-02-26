import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { QuestionMarkComponent } from './question-mark/question-mark.component';
@Component({
    selector: 'arena-of-choices-landing-section',
    standalone: true,
    imports: [CommonModule, NavbarComponent, QuestionMarkComponent],
    templateUrl: './landing-section.component.html',
    styleUrls: ['./landing-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingSectionComponent {}
