import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasArenaComponent } from './canvas-arena/canvas-arena.component';
import { ChoiceStatCardComponent } from './choice-stat-card/choice-stat-card.component';
import { ChoiceToolStore } from '../store/choice-tool.store';
import { CanvasResultsComponent } from './canvas-results/canvas-results.component';
import { Observable } from 'rxjs';
import { ChoiceStats } from 'src/app/core/models/choice-stats.interface';

@Component({
    selector: 'arena-of-choices-canvas-section',
    standalone: true,
    imports: [
        CommonModule,
        CanvasArenaComponent,
        ChoiceStatCardComponent,
        CanvasResultsComponent,
    ],
    templateUrl: './canvas-section.component.html',
    styleUrls: ['./canvas-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasSectionComponent {
    public choiceStats$: Observable<ChoiceStats[]>;
    public gameFinished$: Observable<boolean>;
    constructor(private choiceToolStore: ChoiceToolStore) {
        this.choiceStats$ = this.choiceToolStore.choiceStats$;
        this.gameFinished$ = this.choiceToolStore.gameFinished$;
    }
}
