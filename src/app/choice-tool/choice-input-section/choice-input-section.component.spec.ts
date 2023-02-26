import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceInputSectionComponent } from './choice-input-section.component';

describe('ChoiceInputSectionComponent', () => {
    let component: ChoiceInputSectionComponent;
    let fixture: ComponentFixture<ChoiceInputSectionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChoiceInputSectionComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ChoiceInputSectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
