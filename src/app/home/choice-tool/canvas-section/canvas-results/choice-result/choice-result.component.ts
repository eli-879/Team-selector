import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoiceResult } from 'src/app/core/models/choice-result.interface';
import { CustomSlicePipe } from 'src/app/custom-slice.pipe';
import { ColorPallete } from 'src/app/color-store/types/color-pallete.interface';
import { Observable } from 'rxjs';
import { ColorStore } from 'src/app/color-store/color.store';
import { SortOrder } from '../../../store/types/sort-order.type';
@Component({
    selector: 'arena-of-choices-choice-result',
    standalone: true,
    imports: [CommonModule, CustomSlicePipe],
    templateUrl: './choice-result.component.html',
    styleUrls: ['./choice-result.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChoiceResultComponent implements AfterViewInit {
    @Input() result!: ChoiceResult;
    @Input() sortOrder!: SortOrder;
    @Input() numChoices!: number;
    @ViewChild('canvas') canvas!: ElementRef;

    public colorPallete$: Observable<ColorPallete>;

    constructor(private colorStore: ColorStore) {
        this.colorPallete$ = this.colorStore.colorPallete$;
    }

    public ngAfterViewInit(): void {
        const context = this.canvas.nativeElement.getContext('2d');
        context.drawImage(this.result.images[0], 0, 0, 80, 80, 0, 0, 300, 150);
    }
}
