import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'arena-of-choices-choice-input-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './choice-input-card.component.html',
    styleUrls: ['./choice-input-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChoiceInputCardComponent {
    @Input() public choice!: string;
}
