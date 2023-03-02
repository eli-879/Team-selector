import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasResultsComponent } from './canvas-results.component';

describe('CanvasResultsComponent', () => {
    let component: CanvasResultsComponent;
    let fixture: ComponentFixture<CanvasResultsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CanvasResultsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CanvasResultsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
