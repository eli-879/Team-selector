import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoiceCard } from 'src/app/core/models/choice-card.interface';
import { ColorPallete } from 'src/app/color-store/types/color-pallete.interface';
import { Observable } from 'rxjs';
import { ColorStore } from 'src/app/color-store/color.store';
import { ChoiceToolStore } from '../../store/choice-tool.store';

@Component({
    selector: 'arena-of-choices-choice-input-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './choice-input-card.component.html',
    styleUrls: ['./choice-input-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChoiceInputCardComponent implements AfterViewInit {
    @Input() public choice!: ChoiceCard;
    @ViewChild('canvas') canvas!: ElementRef;
    public colorPallete$: Observable<ColorPallete>;

    constructor(
        private colorStore: ColorStore,
        private choiceToolStore: ChoiceToolStore
    ) {
        this.colorPallete$ = this.colorStore.colorPallete$;
    }

    public ngAfterViewInit(): void {
        const context = this.canvas.nativeElement.getContext('2d');
        context.drawImage(this.choice.images[0], 0, 0, 80, 80, 0, 0, 300, 150);
    }

    public deleteSelf() {
        this.choiceToolStore.removeChoiceById(this.choice.id);
    }
}
