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
import { Observable } from 'rxjs';
import { ColorPallete } from 'src/app/color-store/types/color-pallete.interface';
import { ColorStore } from 'src/app/color-store/color.store';
import { CustomSlicePipe } from 'src/app/custom-slice.pipe';

@Component({
    selector: 'arena-of-choices-choice-stat-card',
    standalone: true,
    imports: [CommonModule, CustomSlicePipe],
    templateUrl: './choice-stat-card.component.html',
    styleUrls: ['./choice-stat-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChoiceStatCardComponent implements AfterViewInit {
    @Input() choiceStat!: ChoiceStats;
    @Input() health!: number;
    @ViewChild('canvas') canvas!: ElementRef;

    public colorPallete$: Observable<ColorPallete>;

    constructor(private colorStore: ColorStore) {
        this.colorPallete$ = this.colorStore.colorPallete$;
    }

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
