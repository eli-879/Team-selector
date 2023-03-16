import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoiceToolStore } from '../../store/choice-tool.store';
import { ChoiceResult } from 'src/app/core/models/choice-result.interface';
import { Observable } from 'rxjs';
import { ChoiceResultComponent } from './choice-result/choice-result.component';
import { SortOrder } from '../../store/types/sort-order.type';
import { FormsModule } from '@angular/forms';
import { ChoiceCard } from 'src/app/core/models/choice-card.interface';

@Component({
    selector: 'arena-of-choices-canvas-results',
    standalone: true,
    imports: [CommonModule, ChoiceResultComponent, FormsModule],
    templateUrl: './canvas-results.component.html',
    styleUrls: ['./canvas-results.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasResultsComponent {
    public results$: Observable<ChoiceResult[]>;
    public choices$: Observable<ChoiceCard[]>;

    public sortOrder: SortOrder = 'deathOrder';

    constructor(private choiceToolStore: ChoiceToolStore) {
        this.results$ = this.choiceToolStore.choiceResults$;
        this.choices$ = this.choiceToolStore.choices$;
    }

    public sortResults(sortOrder: SortOrder, results: ChoiceResult[]) {
        switch (sortOrder) {
            case 'deathOrder':
                results.sort((a, b) => b.deathNumber - a.deathNumber);
                break;
            case 'dmgDealt':
                results.sort((a, b) => b.dmgDealt - a.dmgDealt);
                break;
        }
    }
}
