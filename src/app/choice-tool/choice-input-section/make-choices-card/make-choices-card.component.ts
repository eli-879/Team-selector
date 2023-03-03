import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChoiceToolStore } from '../../store/choice-tool.store';

@Component({
    selector: 'arena-of-choices-make-choices-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './make-choices-card.component.html',
    styleUrls: ['./make-choices-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MakeChoicesCardComponent implements AfterViewInit {
    @ViewChild('subtext', { static: false })
    subtext!: ElementRef;

    constructor(private choiceStore: ChoiceToolStore) {}

    public ngAfterViewInit(): void {
        setTimeout(() => {
            this.createSubtext('Lets go to the arena!');
        }, 1000);
    }

    public onClick() {
        this.choiceStore.updateView('canvas');
        this.choiceStore.updateGenerateCharacters(true);
    }

    public createWord(text: string, index: number) {
        const word = document.createElement('span');

        word.innerHTML = `${text}`;

        word.classList.add('card-subtext-word');

        return word;
    }

    public addWord(text: string, index: number) {
        console.log(this.subtext);
        this.subtext.nativeElement.appendChild(this.createWord(text, index));
    }

    public createSubtext(text: string) {
        text.split(' ').map(this.addWord);
    }
}
