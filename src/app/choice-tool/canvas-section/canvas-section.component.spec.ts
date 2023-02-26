import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasSectionComponent } from './canvas-section.component';

describe('CanvasSectionComponent', () => {
    let component: CanvasSectionComponent;
    let fixture: ComponentFixture<CanvasSectionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CanvasSectionComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CanvasSectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
