import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceInputCardComponent } from './choice-input-card.component';

describe('ChoiceInputCardComponent', () => {
    let component: ChoiceInputCardComponent;
    let fixture: ComponentFixture<ChoiceInputCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChoiceInputCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ChoiceInputCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
