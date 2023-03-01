import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChoiceToolStore } from '../../store/choice-tool.store';

@Component({
    selector: 'arena-of-choices-make-choices-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './make-choices-card.component.html',
    styleUrls: ['./make-choices-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MakeChoicesCardComponent {
    constructor(private choiceStore: ChoiceToolStore) {}

    public onClick() {
        console.log('S');
        this.choiceStore.updateView('canvas');
    }
}
