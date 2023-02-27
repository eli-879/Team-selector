import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceStatCardComponent } from './choice-stat-card.component';

describe('ChoiceStatCardComponent', () => {
    let component: ChoiceStatCardComponent;
    let fixture: ComponentFixture<ChoiceStatCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChoiceStatCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ChoiceStatCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
