import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetManagerService } from 'src/app/asset-manager.service';
import { Observable } from 'rxjs';
import { ChoiceCard } from 'src/app/core/models/choice-card.interface';
import { ChoiceToolStore } from '../../store/choice-tool.store';

enum states {
    RUNNING = 'running',
    KNOCKEDBACK = 'knockedback',
    ATTACKING = 'attacking',
    WINNING = 'winning',
    DEAD = 'dead',
}

@Component({
    selector: 'arena-of-choices-canvas-arena',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './canvas-arena.component.html',
    styleUrls: ['./canvas-arena.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasArenaComponent implements OnInit {
    public choices: ChoiceCard[] = [];

    @ViewChild('canvas', { static: true })
    public canvas!: ElementRef<HTMLCanvasElement>;
    private ctx!: CanvasRenderingContext2D | null;

    public MIN_STEP = 10;
    public SPRITE_HEIGHT = 80;
    public players = 0;

    public lastTime = 0;

    public assets = {};

    // clamping frames so they are not too long or short
    public typicalFrame = 16;
    public smallestFrame = 14;
    public longestFrame = 50;

    // arrays to store info
    public names = [];
    public characterList = [];

    // store all char at beginning
    public beginning = [];

    // arrays to store names and actual objects of dead chars
    public deathListNames = [];
    public deathListObjects = [];

    // array for damage splats
    public damageSplats = [];

    // height and width of canvas
    public GAME_WIDTH = 960;
    public GAME_HEIGHT = 720;

    constructor(
        private assetManager: AssetManagerService,
        private choiceToolStore: ChoiceToolStore
    ) {
        this.choiceToolStore.choices$.subscribe(
            (choices) => (this.choices = choices)
        );
    }

    public ngOnInit(): void {
        this.ctx = this.canvas.nativeElement.getContext('2d');
        this.ctx?.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
        this.assets = this.assetManager.getAllCharacterAssets();
    }

    public onStart() {
        this.generateCharacters();
    }

    public generateCharacters() {
        console.log(this.choices);
    }
}
