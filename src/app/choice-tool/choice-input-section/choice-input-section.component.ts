import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoiceInputTextInputComponent } from './choice-input-text-input/choice-input-text-input.component';
import { ChoiceToolStore } from '../store/choice-tool.store';
import { ChoiceInputCardComponent } from './choice-input-card/choice-input-card.component';
import { Observable } from 'rxjs/internal/Observable';
import { ChoiceCard } from 'src/app/core/models/choice-card.interface';
import { MakeChoicesCardComponent } from './make-choices-card/make-choices-card.component';
import { HackerEffectDirective } from 'src/app/hacker-effect.directive';

@Component({
    selector: 'arena-of-choices-choice-input-section',
    standalone: true,
    imports: [
        CommonModule,
        ChoiceInputTextInputComponent,
        ChoiceInputCardComponent,
        MakeChoicesCardComponent,
        HackerEffectDirective,
    ],
    templateUrl: './choice-input-section.component.html',
    styleUrls: ['./choice-input-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChoiceInputSectionComponent {
    public choices$: Observable<ChoiceCard[]>;
    constructor(private choiceToolStore: ChoiceToolStore) {
        this.choices$ = this.choiceToolStore.choices$;
    }
}
