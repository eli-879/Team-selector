import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ObserverChildDirective } from './observer-child.directive';

const mockElementRef: ElementRef = {
    nativeElement: {},
};

beforeEach(() =>
    TestBed.configureTestingModule({
        providers: [{ provide: ElementRef, useValue: mockElementRef }],
        schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
);

describe('ObserverChildDirective', () => {
    it('should create an instance', () => {
        const directive = new ObserverChildDirective(mockElementRef);
        expect(directive).toBeTruthy();
    });
});
