import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoiceCard } from 'src/app/core/models/choice-card.interface';
import { ColorPallete } from 'src/app/color-store/types/color-pallete.interface';
import { Observable } from 'rxjs';
import { ColorStore } from 'src/app/color-store/color.store';
import { ChoiceToolStore } from '../../store/choice-tool.store';
import { Character } from '../../canvas-section/characters/character';
import { Firzen } from '../../canvas-section/characters/firzen';
import { Justin } from '../../canvas-section/characters/justin';
import { Woody } from '../../canvas-section/characters/woody';
import { Henry } from '../../canvas-section/characters/henry';
import { CharacterStates } from '../../canvas-section/character-properties/character-states.enum';
import { Directions } from '../../canvas-section/character-properties/directions.enum';

@Component({
    selector: 'arena-of-choices-choice-input-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './choice-input-card.component.html',
    styleUrls: ['./choice-input-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChoiceInputCardComponent implements OnInit, AfterViewInit {
    @Input() public choice!: ChoiceCard;
    @ViewChild('canvas') canvas!: ElementRef;
    public ctx!: CanvasRenderingContext2D;
    public colorPallete$: Observable<ColorPallete>;
    public lastTime = 0;
    public character!: Character;

    public characterState: CharacterStates;

    private characterStates: CharacterStates[] = [
        CharacterStates.ATTACKING,
        CharacterStates.RUNNING,
        CharacterStates.WAITING,
    ];

    constructor(
        private colorStore: ColorStore,
        private choiceToolStore: ChoiceToolStore
    ) {
        this.colorPallete$ = this.colorStore.colorPallete$;
        this.characterState = this.getRandomState();
    }

    public ngOnInit(): void {
        return;
    }

    public ngAfterViewInit(): void {
        this.ctx = this.canvas.nativeElement.getContext('2d');

        this.ctx.clearRect(
            0,
            0,
            this.canvas.nativeElement.width,
            this.canvas.nativeElement.height
        );

        switch (this.choice.type) {
            case 'firzen':
                this.character = new Firzen(
                    150,
                    150,
                    'a',
                    { x: 0, y: 0 },
                    1,
                    this.choice.images,
                    this.ctx
                );
                break;
            case 'justin':
                this.character = new Justin(
                    150,
                    150,
                    'a',
                    { x: 0, y: 0 },
                    1,
                    this.choice.images,
                    this.ctx
                );
                break;
            case 'woody':
                this.character = new Woody(
                    150,
                    150,
                    'a',
                    { x: 0, y: 0 },
                    1,
                    this.choice.images,
                    this.ctx
                );
                break;
            case 'henry':
                this.character = new Henry(
                    150,
                    150,
                    'a',
                    { x: 0, y: 0 },
                    1,
                    this.choice.images,
                    this.ctx
                );
                break;

            default:
                this.character = new Firzen(
                    150,
                    150,
                    'a',
                    { x: 0, y: 0 },
                    1,
                    this.choice.images,
                    this.ctx
                );
                break;
        }
        this.character.setFacing(Directions.RIGHT);
        this.character.setStatus(this.characterState);
        this.character.setSprite(this.characterState);
        this.drawLoop(0);
    }

    public drawLoop(timestamp: number) {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        //this.ctx.drawImage(this.choice.images[0], 0, 0, 80, 80, 0, 0, 300, 150);
        this.ctx.clearRect(
            0,
            0,
            this.canvas.nativeElement.width,
            this.canvas.nativeElement.height
        );
        this.character.drawSpriteCard(
            this.ctx,
            this.characterState,
            deltaTime,
            300,
            150
        );

        const boundDrawLoop = this.drawLoop.bind(this);
        requestAnimationFrame(boundDrawLoop);
    }

    public deleteSelf() {
        this.choiceToolStore.removeChoiceById(this.choice.id);
    }

    private getRandomState() {
        return this.characterStates[
            Math.floor(Math.random() * this.characterStates.length)
        ];
    }
}
