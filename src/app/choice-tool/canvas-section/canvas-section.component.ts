import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasArenaComponent } from './canvas-arena/canvas-arena.component';
import { ChoiceStatCardComponent } from './choice-stat-card/choice-stat-card.component';
import { ChoiceToolStore } from '../store/choice-tool.store';
import { CanvasResultsComponent } from './canvas-results/canvas-results.component';

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
    public choiceStats$ = this.choiceToolStore.choiceStats$;
    public gameFinished$ = this.choiceToolStore.gameFinished$;
    constructor(private choiceToolStore: ChoiceToolStore) {}
}
