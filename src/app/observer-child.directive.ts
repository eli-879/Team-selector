import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[arenaOfChoicesObserverChild]',
})
export class ObserverChildDirective implements AfterViewInit {
    @Input() observer!: IntersectionObserver;

    constructor(private el: ElementRef) {}

    ngAfterViewInit(): void {
        this.observer.observe(this.el.nativeElement);
    }
}
