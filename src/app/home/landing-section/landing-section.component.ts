import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { QuestionMarkComponent } from './question-mark/question-mark.component';
import { HackerEffectDirective } from '../../hacker-effect.directive';

@Component({
    selector: 'arena-of-choices-landing-section',
    standalone: true,
    imports: [
        CommonModule,
        NavbarComponent,
        QuestionMarkComponent,
        HackerEffectDirective,
    ],
    templateUrl: './landing-section.component.html',
    styleUrls: ['./landing-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingSectionComponent {
    @ViewChild('header') header!: ElementRef;
}
