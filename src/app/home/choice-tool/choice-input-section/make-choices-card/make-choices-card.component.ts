import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Renderer2,
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
    @ViewChild('subtext')
    subtext!: ElementRef;

    constructor(
        private choiceStore: ChoiceToolStore,
        private renderer: Renderer2
    ) {}

    public ngAfterViewInit(): void {
        this.createSubtext('Lets go to the arena!');
    }

    public onClick() {
        this.choiceStore.updateView('canvas');
        this.choiceStore.updateGenerateCharacters(true);
    }

    public createWord(text: string, index: number) {
        const word = this.renderer.createElement('span');

        word.innerHTML = `${text}`;

        word.classList.add('card-subtext-word');
        this.renderer.setStyle(word, 'transitionDelay', `${index * 40}ms`);

        return word;
    }

    public addWord(text: string, index: number) {
        this.renderer.appendChild(
            this.subtext.nativeElement,
            this.createWord(text, index)
        );
    }

    public createSubtext(text: string) {
        const boundAddWord = this.addWord.bind(this);
        text.split(' ').map(boundAddWord);
    }
}
