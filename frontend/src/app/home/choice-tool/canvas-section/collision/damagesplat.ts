import { Position } from '../character-properties/position.interface';

export class DamageSplat {
    public pos: Position;
    public damage: number;
    public assets: HTMLImageElement[];
    public time: number;
    public width: number;
    public height: number;
    public maxHit: boolean;

    constructor(
        pos: Position,
        damage: number,
        assets: HTMLImageElement[],
        maxHit: boolean
    ) {
        this.pos = pos;
        this.damage = damage;
        this.assets = assets;
        this.time = 0;
        this.width = 40;
        this.height = 40;
        this.maxHit = maxHit;
    }

    public updateTime(step: number) {
        this.time += step;
    }

    public getTime() {
        return this.time;
    }

    // draws damage splat
    public draw(ctx: CanvasRenderingContext2D) {
        // draws blue splat if damage is 0 and red otherwise
        if (this.damage == 0) {
            ctx.drawImage(this.assets[1], this.pos.x, this.pos.y);
        } else if (this.maxHit) {
            ctx.drawImage(this.assets[2], this.pos.x, this.pos.y);
        } else {
            ctx.drawImage(this.assets[0], this.pos.x, this.pos.y);
        }
        ctx.fillStyle = 'white';
        ctx.fillText(
            '' + this.damage,
            this.pos.x +
                this.width / 2 -
                ctx.measureText('' + this.damage).width / 2,
            this.pos.y + this.height / 2 + 5
        );
    }
}
