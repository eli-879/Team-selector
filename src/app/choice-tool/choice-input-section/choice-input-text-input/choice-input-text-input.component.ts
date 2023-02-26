import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoiceToolStore } from '../../store/choice-tool.store';

@Component({
    selector: 'arena-of-choices-choice-input-text-input',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './choice-input-text-input.component.html',
    styleUrls: ['./choice-input-text-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChoiceInputTextInputComponent {
    constructor(private choiceToolStore: ChoiceToolStore) {}

    public addChoice(choice: string) {
        if (choice.trim()) {
            this.choiceToolStore.addChoice(choice);
        }
    }
}
