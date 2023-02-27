import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetManagerService } from 'src/app/asset-manager.service';
import { ChoiceCard } from 'src/app/core/models/choice-card.interface';
import { ChoiceToolStore } from '../../store/choice-tool.store';
import { Position } from '../character-properties/position.interface';

import { Firzen } from '../characters/firzen';
import { Henry } from '../characters/henry';
import { Justin } from '../characters/justin';
import { Woody } from '../characters/woody';
import { AssetContainer } from 'src/app/core/models/asset-container.interface';
import { Character } from '../characters/character';
import { DamageSplat } from '../collision/damagesplat';
import { CharacterStates } from '../character-properties/character-states.enum';
import { Collision } from '../collision/collision';

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
    private ctx!: CanvasRenderingContext2D;

    public MIN_STEP = 10;
    public SPRITE_HEIGHT = 80;
    public players = 0;

    public lastTime = 0;

    public assets: AssetContainer = {
        woodyAssets: [],
        henryAssets: [],
        firzenAssets: [],
        justinAssets: [],
        background: new Image(),
        damageSplats: [],
    };

    // clamping frames so they are not too long or short
    public typicalFrame = 16;
    public smallestFrame = 14;
    public longestFrame = 50;

    // arrays to store info
    public names: string[] = [];
    public characterList: Character[] = [];

    // store all char at beginning
    public beginning: Character[] = [];

    // arrays to store names and actual objects of dead chars
    public deathListNames: string[] = [];
    public deathListObjects: Character[] = [];

    // array for damage splats
    public damageSplats: DamageSplat[] = [];

    // height and width of canvas
    public GAME_WIDTH = 960;
    public GAME_HEIGHT = 720;

    public locations: Position[] = [];

    constructor(
        private assetManager: AssetManagerService,
        private choiceToolStore: ChoiceToolStore
    ) {
        this.choiceToolStore.choices$.subscribe(
            (choices) => (this.choices = choices)
        );
    }

    public ngOnInit(): void {
        this.ctx = this.canvas.nativeElement.getContext(
            '2d'
        ) as CanvasRenderingContext2D;
        this.ctx?.clearRect(
            0,
            0,
            this.canvas.nativeElement.width,
            this.canvas.nativeElement.height
        );
        this.assets = this.assetManager.getAllCharacterAssets();
        this.gameLoop(0);

        console.log(this.assets);
    }

    public onStart() {
        this.resetGame();
        this.locations = this.generateGridLocations(4, 6).map((location) => {
            return { x: location.x * 80, y: location.y * 80 };
        });

        this.characterList = [...this.generateCharacters()];
        this.players = this.beginning.length;
    }

    private generateGridLocations(rows: number, cols: number) {
        const locations: Position[] = [];
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                locations.push({ x: j, y: i });
            }
        }

        this.shuffleArray(locations);
        return locations;
    }

    private generateCharacters() {
        const characters: Character[] = [];
        for (let i = 0; i < this.choices.length; i++) {
            const choice = this.choices[i];
            const pos = this.locations.pop();
            const char = this.createNewCharacter(choice, pos as Position, i);
            characters.push(char);
        }
        return characters;
    }

    private shuffleArray(array: Position[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    private createNewCharacter(choice: ChoiceCard, pos: Position, id: number) {
        switch (choice.type) {
            case 'woody':
                return new Woody(
                    this.GAME_WIDTH,
                    this.GAME_HEIGHT,
                    choice.name,
                    pos,
                    id,
                    this.assets.woodyAssets,
                    this.ctx as CanvasRenderingContext2D
                );

            case 'firzen':
                return new Firzen(
                    this.GAME_WIDTH,
                    this.GAME_HEIGHT,
                    choice.name,
                    pos,
                    id,
                    this.assets.firzenAssets,
                    this.ctx as CanvasRenderingContext2D
                );

            case 'henry':
                return new Henry(
                    this.GAME_WIDTH,
                    this.GAME_HEIGHT,
                    choice.name,
                    pos,
                    id,
                    this.assets.henryAssets,
                    this.ctx as CanvasRenderingContext2D
                );

            case 'justin':
                return new Justin(
                    this.GAME_WIDTH,
                    this.GAME_HEIGHT,
                    choice.name,
                    pos,
                    id,
                    this.assets.justinAssets,
                    this.ctx as CanvasRenderingContext2D
                );

            default:
                return new Justin(
                    this.GAME_WIDTH,
                    this.GAME_HEIGHT,
                    choice.name,
                    pos,
                    id,
                    this.assets.justinAssets,
                    this.ctx as CanvasRenderingContext2D
                );
        }
    }

    private resetGame() {
        this.beginning = [];
        this.deathListNames = [];
        this.deathListObjects = [];
        this.characterList = [];
        this.damageSplats = [];
    }

    // gameloop that controls the game
    private gameLoop(timestamp: number) {
        let deltaTime = timestamp - this.lastTime;
        if (deltaTime > this.longestFrame) deltaTime = this.typicalFrame;

        this.lastTime = timestamp;

        this.ctx.clearRect(
            0,
            0,
            this.canvas.nativeElement.width,
            this.canvas.nativeElement.height
        );

        // controls all calculations of each character
        this.updateGame(deltaTime);

        const boundGameLoop = this.gameLoop.bind(this);
        requestAnimationFrame(boundGameLoop);
    }

    // handles all calculations of characters by time
    private updateGame(dt: number) {
        let step = dt;
        do {
            this.resolveAllCollisions(step);
            // drawing portion
            this.drawAllElements(step);

            dt -= step;
            step = dt;
        } while (dt > 0);
    }

    private resolveAllCollisions(step: number) {
        // first finds if there is at least one collision between characters
        const hit = this.findFirstCollision(step);

        // if there is at least one collision, find all collisions by turning them into collision objects, handle them, and move each character
        if (hit != null) {
            step = Math.max(hit.getTime(), this.MIN_STEP);
            this.updateObjects(step);
            this.handleCollisions(step);
            // else just move each character
        } else {
            this.updateObjects(step);
        }
    }

    private drawAllElements(step: number) {
        // draw bg
        this.ctx.drawImage(this.assets.background as HTMLImageElement, 0, 0);

        // draw dead characters as lying prone on the ground
        for (let i = 0; i < this.deathListObjects.length; i++) {
            this.deathListObjects[i].draw(this.ctx, step);
        }

        //draw alive characters either as KBed or running or winning
        for (let i = 0; i < this.characterList.length; i++) {
            this.characterList[i].draw(this.ctx, step);
        }

        // draw damage splats
        for (let i = 0; i < this.damageSplats.length; i++) {
            this.damageSplats[i].draw(this.ctx);

            this.damageSplats[i].updateTime(step);
            if (this.damageSplats[i].getTime() > 2000) {
                this.damageSplats.splice(i, 1);
                i--;
            }
        }

        // finds if there is only 1 character left alive and makes him celebrate
        if (this.characterList.length == 1) {
            if (this.characterList[0].getStatus() != CharacterStates.WINNING) {
                this.characterList[0].setSprite(CharacterStates.WINNING);
            }
            this.characterList[0].setStatus(CharacterStates.WINNING);
        }
    }

    private updateDeathDOM() {
        // updates list of dead characters based on characters that are in the deathListNames array
    }

    // function that handles moving the characters around and recognising when they are dead
    private updateObjects(step: number) {
        for (let i = 0; i < this.characterList.length; i++) {
            const character = this.characterList[i];
            const pos = character.getPosition();
            const v = character.getVelocity();

            // keeps characters within a boundary
            character.keepInside();

            // if character has a cooldown on their attack, reduce it by time passed
            character.cooldownAttackTimer(step);

            // if character is dead, push him into dead list and remove him from alive list
            if (character.isDead()) {
                this.deathListNames.push(character.getName());
                this.updateDeathDOM();

                character.setStatus(CharacterStates.DEAD);
                this.deathListObjects.push(character);

                this.characterList.splice(i, 1);
                i--;
                continue;
            }

            // handles if character is KBed by another - pushes them back in the opposite direction they were running in
            if (character.getStatus() == CharacterStates.KNOCKBACKED) {
                character.setVX(v.x * 0.95);
                character.setVY(v.y * 0.95);
                character.setPosition(
                    pos.x + (step * v.x) / 1000,
                    pos.y + (step * v.y) / 1000
                );
                character.addTimeKnockedback(step);

                // if they reach the time limit on being KBed, reset them back to running state
                if (character.getTimeKnockedback() > 1000) {
                    character.setStatus(CharacterStates.RUNNING);
                    character.setSprite(CharacterStates.RUNNING);
                    character.setTimeKnockedback(0);
                }

                // otherwise if they are not KBed, set a goal destination to the nearest enemy where they will run to
            } else {
                character.setGoal(
                    character.getClosestEnemy(this.characterList) as Character
                );
                character.updateVelocities();

                character.setPosition(
                    pos.x + (step * v.x) / 1000,
                    pos.y + (step * v.y) / 1000
                );
            }

            // if a character has completed an attack animation, reset them back to running state.
            if (
                character.getAttackTimer() <
                    character.getTimeForAttackAnimation() &&
                character.getStatus() == CharacterStates.ATTACKING
            ) {
                character.setSprite(CharacterStates.RUNNING);
                character.setStatus(CharacterStates.RUNNING);
            }

            // if character is running, update the direction they face (left if negative movement, right if positive movement)
            if (character.getStatus() == CharacterStates.RUNNING) {
                character.updateDirection();
            }
        }
    }

    // handles each collision - is passed a collision and decides who gets hit and who is the one hitting
    // returns dmg number and character that gets hit
    private updateVelocities(
        collision: Collision,
        step: number
    ): [Character, number] | undefined {
        const obj1 = collision.getObj1();
        const obj2 = collision.getObj2();

        const rand = Math.floor(Math.random() * 15);

        // make sure that in the collision object, the two colliding objects are not null
        if (obj1 === null || obj2 === null) {
            return undefined;
        }

        if (
            obj1.getStatus() === CharacterStates.KNOCKBACKED ||
            obj2.getStatus() === CharacterStates.KNOCKBACKED
        ) {
            return undefined;
        }

        //check their attack cooldown timers

        //if obj1 is ready to attack but obj2 isn't, obj2 will definitely getting hit
        if (obj1.getAttackTimer() === 0 && obj2.getAttackTimer() !== 0) {
            obj1.hit(obj2, step);
            this.updateStatus(obj1, obj2);
            this.updateHealth(obj2, rand);
            return [obj2, rand];

            //vice versa
        } else if (obj1.getAttackTimer() != 0 && obj2.getAttackTimer() == 0) {
            obj2.hit(obj1, step);
            this.updateStatus(obj2, obj1);
            this.updateHealth(obj1, rand);
            return [obj1, rand];

            // if both characters have their attack ready, it will be a 50/50 on who gets hit
        } else if (obj1.getAttackTimer() == 0 && obj2.getAttackTimer() == 0) {
            const coinflip = Math.floor(Math.random() * 2);

            if (coinflip == 0) {
                obj1.hit(obj2, step);
                this.updateStatus(obj1, obj2);
                this.updateHealth(obj2, rand);
                return [obj2, rand];
            } else {
                obj2.hit(obj1, step);
                this.updateStatus(obj2, obj1);
                this.updateHealth(obj1, rand);
                return [obj1, rand];
            }
        }

        return undefined;
    }

    // function that handles all collisions
    private handleCollisions(step: number) {
        // finds all collisions, set up unique collisions and charactersSeen as an collision between Char1 and Char2 is also a collision between Char2 and Char1
        // we don't want that to register as two seperate collisions
        const allCollisions = this.findAllCollisions(step);
        const uniqueCollisions = [];
        const charactersSeen: number[] = [];

        // look at each individual collision
        for (let i = 0; i < allCollisions.length; i++) {
            const obj1 = allCollisions[i].getObj1();
            const obj2 = allCollisions[i].getObj2();

            // if they are both not in the characterSeen array, push their unique ID and their collision in
            if (
                !charactersSeen.includes(obj1.getID()) &&
                !charactersSeen.includes(obj2.getID())
            ) {
                charactersSeen.push(obj1.getID());
                charactersSeen.push(obj2.getID());
                uniqueCollisions.push(allCollisions[i]);
            }
        }

        // using all unique collisions, handle each unique collision using the function above
        for (const collision of uniqueCollisions) {
            // info contains who was hit and the damage
            const info = this.updateVelocities(collision, step);
            if (info !== undefined) {
                this.createDamageSplats(info[0].getPosition(), info[1]);
            }
        }
    }

    // finds all collisions by comparing each character to see if their hitboxes overlap and returns a array of all collisions
    private findAllCollisions(dt: number) {
        const collisions = [];
        for (let i = 0; i < this.characterList.length; i++) {
            for (let j = i + 1; j < this.characterList.length; j++) {
                const hit = this.findCollision(i, j, dt);
                if (hit != null) {
                    collisions.push(hit);
                }
            }
        }
        return collisions;
    }

    // function that finds 1 collision to see if we need to run findAllCollisions func
    private findFirstCollision(dt: number) {
        for (let i = 0; i < this.characterList.length; i++) {
            for (let j = i + 1; j < this.characterList.length; j++) {
                const hit = this.findCollision(i, j, dt);
                if (hit != null) {
                    return hit;
                }
            }
        }
        return;
    }

    // checks to see if there is a collision between characters at index i and j by checking overlaps of hitboxes
    // if there is, create a Collision object and return it to findAllCollisions func
    private findCollision(i: number, j: number, dt: number) {
        const obj1 = this.characterList[i];
        const obj2 = this.characterList[j];
        const obj1Pos = obj1.getPosition();
        const obj2Pos = obj2.getPosition();
        if (
            obj1Pos.x <= obj2Pos.x + obj2.getWidth() &&
            obj1Pos.x + obj1.getWidth() >= obj2Pos.x &&
            obj1Pos.y + obj1.getHeight() >= obj2Pos.y &&
            obj1Pos.y <= obj2Pos.y + obj2.getHeight()
        ) {
            const col = new Collision(obj1, obj2, dt);
            return col;
        }
        return null;
    }

    // creates damage splat object and appends it to the damage splat list
    private createDamageSplats(location: Position, damage: number) {
        const damageSplat = new DamageSplat(
            location,
            damage,
            this.assets.damageSplats
        );
        this.damageSplats.push(damageSplat);
    }

    // updates statuses between two characters hitting each other - one hits, one gets KBed
    private updateStatus(obj1: Character, obj2: Character) {
        // obj1 is the hitter, obj2 is the hittee(is that a word?)
        obj1.setStatus(CharacterStates.ATTACKING);
        obj1.setSprite(CharacterStates.ATTACKING);

        obj2.setStatus(CharacterStates.KNOCKBACKED);
        obj2.setSprite(CharacterStates.KNOCKBACKED);
    }

    // updates health after a collision
    private updateHealth(obj2: Character, dmg: number) {
        //  obj2 is the hittee (getting hit)

        obj2.minusHealth(dmg);
    }
}
