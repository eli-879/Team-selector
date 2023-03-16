import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HackerEffectDirective } from './hacker-effect.directive';
const mockElementRef: ElementRef = {
    nativeElement: {},
};

beforeEach(() =>
    TestBed.configureTestingModule({
        providers: [{ provide: ElementRef, useValue: mockElementRef }],
        schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
);
describe('HackerEffectDirective', () => {
    it('should create an instance', () => {
        const directive = new HackerEffectDirective(mockElementRef);
        expect(directive).toBeTruthy();
    });
});
