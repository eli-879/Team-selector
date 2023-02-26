import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasSectionComponent } from './canvas-section/canvas-section.component';
import { ChoiceInputSectionComponent } from './choice-input-section/choice-input-section.component';
import { ChoiceToolStore } from './store/choice-tool.store';

@Component({
    selector: 'arena-of-choices-choice-tool',
    standalone: true,
    imports: [
        CommonModule,
        CanvasSectionComponent,
        ChoiceInputSectionComponent,
    ],
    templateUrl: './choice-tool.component.html',
    styleUrls: ['./choice-tool.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ChoiceToolStore],
})
export class ChoiceToolComponent {
    constructor(private ChoiceToolStore: ChoiceToolStore) {}
}
