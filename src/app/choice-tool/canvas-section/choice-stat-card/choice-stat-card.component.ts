import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoiceStats } from 'src/app/core/models/choice-stats.interface';

@Component({
    selector: 'arena-of-choices-choice-stat-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './choice-stat-card.component.html',
    styleUrls: ['./choice-stat-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChoiceStatCardComponent implements AfterViewInit {
    @Input() choiceStat!: ChoiceStats;
    @Input() health!: number;
    @ViewChild('canvas') canvas!: ElementRef;
    public ngAfterViewInit(): void {
        const context = this.canvas.nativeElement.getContext('2d');
        context.drawImage(
            this.choiceStat.images[0],
            0,
            0,
            80,
            80,
            0,
            0,
            300,
            150
        );
    }
}
