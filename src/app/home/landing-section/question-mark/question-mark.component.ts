import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'arena-of-choices-question-mark',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './question-mark.component.html',
    styleUrls: ['./question-mark.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionMarkComponent {
    @Input() rotation!: string;
    @Input() left!: string;
    @Input() top!: string;
    @Input() size!: string;
}
