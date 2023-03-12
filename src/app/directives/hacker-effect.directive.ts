import {
    AfterViewInit,
    Directive,
    ElementRef,
    HostListener,
} from '@angular/core';

@Directive({
    selector: '[arenaOfChoicesHackerEffect]',
    standalone: true,
})
export class HackerEffectDirective implements AfterViewInit {
    private animationRunning = false;
    constructor(private el: ElementRef) {}

    public ngAfterViewInit(): void {
        this.createHackerEffect(this.el);
    }

    @HostListener('mouseenter')
    public onMouseEnter() {
        this.createHackerEffect(this.el);
    }

    @HostListener('mouseleave')
    public onMouseLeave() {
        this.animationRunning = false;
    }

    public createHackerEffect(element: ElementRef) {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        if (this.animationRunning) {
            return;
        }
        let iterations = 0;
        const currHeader = element.nativeElement.dataset.value;

        const interval = setInterval(() => {
            this.animationRunning = true;
            element.nativeElement.innerText = currHeader
                .split('')
                .map((letter: string, index: number) => {
                    if (index < iterations) {
                        return letter;
                    }
                    return alphabet[Math.floor(Math.random() * 26)];
                })
                .join('');
            if (iterations > currHeader.length) {
                clearInterval(interval);
                this.animationRunning = false;
            }

            iterations += 1 / 2;
        }, 30);
    }
}
