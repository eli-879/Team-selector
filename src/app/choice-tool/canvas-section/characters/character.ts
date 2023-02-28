import { Position } from '../character-properties/position.interface';
import { Directions } from '../character-properties/directions.enum';
import { CharacterStates } from '../character-properties/character-states.enum';
import { Vector } from '../character-properties/vector.interface';
import { SpriteDict } from '../character-properties/sprite-dict.interface';
import { CharacterAssetType } from '../../store/types/asset-types.type';

export abstract class Character {
    public gameHeight: number;
    public gameWidth: number;
    public id: number;

    public height: number;
    public width: number;
    public name: string;

    public nameLength: number;

    public imageTimer: number;
    public imageTimerMax: number;
    private border: number;
    public spacing: number;
    public row: number;
    public col: number;

    public assets: HTMLImageElement[];

    public facing: Directions;

    public speed: number;
    public maxSpeed: number;
    public velocity: Vector;
    public goal: Position;
    public position: Position;

    public status: CharacterStates;

    public time: number;
    public attackTimer: number;
    public attackCD: number;

    // character attributes
    public maxHealth: number;
    public health: number;
    public dmg: number;

    public abstract spriteDict: SpriteDict;
    public abstract image: HTMLImageElement;
    public abstract imageAttacking: HTMLImageElement;
    public abstract imageWinning: HTMLImageElement;
    public abstract timeforAttackAnimation: number;
    public abstract characterType: CharacterAssetType;

    constructor(
        gameWidth: number,
        gameHeight: number,
        name: string,
        pos: Position,
        id: number,
        assets: HTMLImageElement[],
        ctx: CanvasRenderingContext2D
    ) {
        this.gameHeight = gameHeight;
        this.gameWidth = gameWidth;
        this.id = id;

        // character visuals
        this.height = 80;
        this.width = 80;
        this.name = name;
        this.nameLength = ctx.measureText(this.name).width;

        this.imageTimer = 0;
        this.imageTimerMax = 125;
        this.border = 0;
        this.spacing = 0;
        this.row = 2;
        this.col = 0;

        this.assets = assets;

        this.facing = Directions.RIGHT;

        // character movement
        this.speed = 75;
        this.maxSpeed = 100;
        this.velocity = { x: 50, y: 50 };
        this.goal = { x: 0, y: 0 };
        this.position = pos;

        this.status = CharacterStates.RUNNING;

        this.time = 0;
        this.attackTimer = 0;
        this.attackCD = 900;

        // character attributes
        this.maxHealth = 100;
        this.health = 10;
        this.dmg = 10;
    }

    // Drawing methods

    public draw(ctx: CanvasRenderingContext2D, dt: number) {
        this.imageTimer += dt;
        ctx.fillStyle = '#f00';
        // draws name
        ctx.fillText(
            this.name,
            this.position.x - this.nameLength / 2 + 40,
            this.position.y + this.height + 20
        );

        // if they are not dead, draw health and attack cooldown timer
        if (this.status != CharacterStates.DEAD) {
            this.drawHealth(ctx);
            this.drawAttackCD(ctx);
        }

        // decides what to draw depending on state of character
        this.drawSprite(ctx, this.status);

        // handles sprite images, depending on time length per sprite frame
        // if timer for frame is up, move to next frame in animation
        if (this.imageTimer > this.imageTimerMax) {
            this.col += 1;
            this.imageTimer = 0;
        }
    }

    // draw health
    public drawHealth(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'lime';
        ctx.font = '20px Arial';
        ctx.fillRect(
            this.position.x,
            this.position.y + this.height + 35,
            (this.health / this.maxHealth) * this.width,
            10
        );
        ctx.fillText(
            this.health + ' HP',
            this.position.x,
            this.position.y + this.height + 35
        );
    }

    // draw attack cooldown
    public drawAttackCD(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(
            this.position.x,
            this.position.y + this.height + 50,
            (this.attackTimer / this.attackCD) * this.width,
            10
        );
    }

    public drawSprite(ctx: CanvasRenderingContext2D, state: CharacterStates) {
        let sprite;

        switch (state) {
            case CharacterStates.RUNNING:
                sprite = this.getSpriteConstantLoop(CharacterStates.RUNNING);
                this.drawOntoCanvas(ctx, sprite, this.image);
                break;
            case CharacterStates.ATTACKING:
                sprite = this.getSpriteOneLoop(CharacterStates.ATTACKING);
                this.drawOntoCanvas(ctx, sprite, this.imageAttacking);

                break;
            case CharacterStates.KNOCKBACKED:
                sprite = this.getSpriteOneLoop(CharacterStates.KNOCKBACKED);
                ctx.fillText(
                    'KBed',
                    this.position.x +
                        this.width / 2 -
                        ctx.measureText('KBed').width / 2,
                    this.position.y - 10
                );
                this.drawOntoCanvas(ctx, sprite, this.image);

                break;
            case CharacterStates.WINNING:
                sprite = this.getSpriteConstantLoop(CharacterStates.WINNING);
                ctx.fillStyle = 'fuchsia';
                ctx.fillText(
                    'WINNER',
                    this.position.x +
                        this.width / 2 -
                        ctx.measureText('WINNER').width / 2,
                    this.position.y - 10
                );
                this.drawOntoCanvas(ctx, sprite, this.imageWinning);

                break;
            case CharacterStates.DEAD:
                sprite = this.getSpriteOneLoop(CharacterStates.DEAD);
                this.drawOntoCanvas(ctx, sprite, this.image);
        }
    }

    public drawOntoCanvas(
        ctx: CanvasRenderingContext2D,
        sprite: Position,
        image: HTMLImageElement
    ) {
        if (this.facing == Directions.RIGHT) {
            ctx.drawImage(
                image,
                sprite.x,
                sprite.y,
                80,
                80,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            );
        } else {
            ctx.scale(-1, 1);
            ctx.drawImage(
                image,
                sprite.x,
                sprite.y,
                80,
                80,
                -this.position.x - this.width,
                this.position.y,
                this.width,
                this.height
            );
            ctx.scale(-1, 1);
        }
    }

    // each sprite frame is 80x80 so turns col/row into x/y coords
    public spritePositionToImagePosition(col: number, row: number) {
        return {
            x: this.border + col * (this.spacing + this.width),
            y: this.border + row * (this.spacing + this.height),
        };
    }

    // constant loop - if column gets to end of sprite sheet, reset back to beginning
    public getSpriteConstantLoop(state: CharacterStates) {
        if (this.col === this.spriteDict[state][1][0]) {
            this.col = this.spriteDict[state][0][0];
        }

        return this.spritePositionToImagePosition(this.col, this.row);
    }

    // one loop - if column gets to end, stay on the last frame
    public getSpriteOneLoop(state: CharacterStates) {
        if (this.col === this.spriteDict[state][1][0]) {
            this.col = this.spriteDict[state][1][0] - 1;
        }

        return this.spritePositionToImagePosition(this.col, this.row);
    }

    // set sprite frame - called when character changes state so animation can change
    public setSprite(state: CharacterStates) {
        this.col = this.spriteDict[state][0][0];
        this.row = this.spriteDict[state][0][1];
    }

    // Most getters and setters

    public getName() {
        return this.name;
    }

    public getPosition() {
        return this.position;
    }

    public setPosition(newX: number, newY: number) {
        this.position.x = newX;
        this.position.y = newY;
    }

    public addPosition(dx: number, dy: number) {
        this.position.x += dx;
        this.position.y += dy;
    }

    public getVelocity() {
        return this.velocity;
    }

    public setVX(vx: number) {
        this.velocity.x = vx;
    }

    public multiplyVX(multiple: number) {
        this.velocity.x *= multiple;
    }

    public setVY(vy: number) {
        this.velocity.y = vy;
    }

    public multiplyVY(multiple: number) {
        this.velocity.y *= multiple;
    }

    public getHeight() {
        return this.height;
    }

    public getWidth() {
        return this.width;
    }

    public getGoal() {
        return this.goal;
    }

    public getTimeKnockedback() {
        return this.time;
    }

    public addTimeKnockedback(dt: number) {
        this.time += dt;
    }

    public setTimeKnockedback(dt: number) {
        this.time = dt;
    }

    public minusHealth(dmg: number) {
        this.health -= dmg;
    }

    public isDead() {
        if (this.health <= 0) {
            return true;
        }
        return false;
    }

    public getAttackTimer() {
        return this.attackTimer;
    }

    public setAttackTimer(time: number) {
        this.attackTimer = time;
    }

    public cooldownAttackTimer(dt: number) {
        if (this.attackTimer - dt < 0) {
            this.attackTimer = 0;
        } else {
            this.attackTimer -= dt;
        }
    }

    public getTimeForAttackAnimation() {
        return this.timeforAttackAnimation;
    }

    public getID() {
        return this.id;
    }

    public getFacing() {
        return this.facing;
    }

    public setFacing(dir: Directions) {
        this.facing = dir;
    }

    public setStatus(status: CharacterStates) {
        this.status = status;
    }

    public getStatus() {
        return this.status;
    }

    public getDmg() {
        return this.dmg;
    }

    // Movement related methods

    // keeps character inside field
    public keepInside() {
        if (this.position.x <= 1) {
            this.position.x = 5;
            this.velocity.x = 0;
        }

        if (this.position.x >= this.gameWidth - this.width - 1) {
            this.position.x = this.gameWidth - this.width - 5;
            this.velocity.x = 0;
        }

        if (this.position.y <= 80) {
            this.position.y = 81;
            this.velocity.y = 0;
        }

        if (this.position.y >= this.gameHeight - this.height - 1) {
            this.position.y = this.gameHeight - this.height - 5;
            this.velocity.y = 0;
        }
    }

    // finds closest enemy and returns it
    public getClosestEnemy(characterList: Character[]) {
        let closest;
        let closestDist = 999999;
        for (let i = 0; i < characterList.length; i++) {
            const dist = this.getDist(characterList[i]);
            if (
                dist < closestDist &&
                characterList[i].getID() != this.id &&
                characterList[i].getStatus() != CharacterStates.KNOCKBACKED
            ) {
                closestDist = dist;
                closest = characterList[i];
            }
        }
        return closest;
    }

    // sets goal to closest enemy - if the goal is null,stop moving as character has won
    public setGoal(character: Character) {
        if (character != null) {
            this.goal = character.getPosition();
        } else {
            this.goal = { x: this.position.x, y: this.position.y };
            this.velocity.x = 0;
            this.velocity.y = 0;
        }
    }

    //some get functions relating to movement

    // gets dist from character
    public getDist(character: Character) {
        const pos = character.getPosition();
        const part1 = Math.pow(this.position.x - pos.x, 2);
        const part2 = Math.pow(this.position.y - pos.y, 2);

        return Math.pow(part1 + part2, 0.5);
    }

    // turns distance into a unit vector
    public getUnitVector() {
        const part1 = this.goal.x - this.position.x;
        const part2 = this.goal.y - this.position.y;
        const magnitude = Math.pow(
            Math.pow(part1, 2) + Math.pow(part2, 2),
            0.5
        );

        return { x: part1 / magnitude, y: part2 / magnitude };
    }

    // update movement of character based on goal
    public updateVelocities() {
        const d1 = this.goal.x - this.position.x;
        const d2 = this.goal.y - this.position.y;

        // checking to see if distance to goal == 0
        if (d1 != 0 && d2 != 0) {
            // gets a unit vector to get speed of this object
            const unitVector = this.getUnitVector();

            // 75 pixels total movement per second
            this.velocity.x = unitVector.x * this.speed;
            this.velocity.y = unitVector.y * this.speed;
        }
    }

    // changes this.facing letiable based on velocity of x
    public updateDirection() {
        if (this.velocity.x < 0) {
            this.facing = Directions.LEFT;
        } else if (this.velocity.x > 0) {
            this.facing = Directions.RIGHT;
        }
    }

    // hits the other player passed in
    // changes other velocity
    // sets this character attack on cooldown

    public hit(other: Character, dt: number) {
        if (this.status !== CharacterStates.ATTACKING) {
            other.setTimeKnockedback(dt);

            const otherV = other.getVelocity();

            other.addPosition(
                Math.sign(otherV.x) * -10,
                Math.sign(otherV.y) * -10
            );

            other.setVX(
                otherV.x * -7.5 +
                    (Math.floor(Math.random() * 5) * Math.random() < 0.5
                        ? -1
                        : 1)
            );
            other.setVY(
                otherV.y * -7.5 +
                    (Math.floor(Math.random() * 5) * Math.random() < 0.5
                        ? -1
                        : 1)
            );

            this.attackTimer = this.attackCD;
        }
    }
}
