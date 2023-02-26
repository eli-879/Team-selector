import { Directive, Input } from '@angular/core';
import { ElementRef } from '@angular/core';
import { OnDestroy, AfterViewInit } from '@angular/core';

interface ObserverChildContext {
    observer: IntersectionObserver;
}

@Directive({
    selector: '[arenaOfChoicesObserverChild]',
    standalone: true,
})
export class ObserverChildDirective implements OnDestroy, AfterViewInit {
    public isIntersecting: boolean;

    // These are just some human-friendly constants to make the HTML template a bit more
    // readable when being consumed as part of SWTCH/CASE statements.
    public IS_INTERSECTING = true;
    public IS_NOT_INTERSECTING = false;

    @Input() observer!: IntersectionObserver | null;

    private elementRef: ElementRef;
    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;

        this.isIntersecting = false;
    }

    static ngTemplateContextGuard(
        directive: ObserverChildDirective,
        context: unknown
    ): context is ObserverChildContext {
        return true;
    }

    public ngAfterViewInit(): void {
        this.observer?.observe(this.elementRef.nativeElement);
    }

    public ngOnDestroy(): void {
        this.observer?.disconnect();
        this.observer = null;
    }
}
