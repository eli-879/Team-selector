import { Character } from '../characters/character';

export class Collision {
    // collision class that is used to handle collisions

    public objectIndex1: Character;
    public objectIndex2: Character;
    public time: number;

    constructor(obj1: Character, obj2: Character, time: number) {
        this.objectIndex1 = obj1;
        this.objectIndex2 = obj2;
        this.time = time;
    }

    public getObj1() {
        return this.objectIndex1;
    }

    public getObj2() {
        return this.objectIndex2;
    }

    public getTime() {
        return this.time;
    }
}
