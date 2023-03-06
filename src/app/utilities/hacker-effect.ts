import { ElementRef, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class HackerEffect {
    constructor(public element: ElementRef) {}

    private alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    private animationRunning = false;

    public createHackerEffect() {
        if (this.animationRunning) {
            return;
        }
        let iterations = 0;
        const currHeader = this.element.nativeElement.innerText;

        const interval = setInterval(() => {
            this.animationRunning = true;
            this.element.nativeElement.innerText =
                currHeader.slice(0, iterations) +
                currHeader
                    .slice(iterations)
                    .split('')
                    .map(() => this.alphabet[Math.floor(Math.random() * 26)])
                    .join('');
            if (iterations > 30) {
                clearInterval(interval);
                this.animationRunning = false;
            }

            iterations += 1 / 2;
        }, 30);
    }
}
