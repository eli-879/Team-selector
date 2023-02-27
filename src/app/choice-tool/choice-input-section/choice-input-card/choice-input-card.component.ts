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

    public ngAfterViewInit(): void {
        const context = this.canvas.nativeElement.getContext('2d');
        context.drawImage(this.choice.images[0], 0, 0, 80, 80, 0, 0, 300, 150);
        console.log('HI');
    }
}
