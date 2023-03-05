import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceStatCardComponent } from './choice-stat-card.component';
import { ColorStore } from 'src/app/color-store/color.store';

describe('ChoiceStatCardComponent', () => {
    let component: ChoiceStatCardComponent;
    let fixture: ComponentFixture<ChoiceStatCardComponent>;
    let colorStore: ColorStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChoiceStatCardComponent],
            providers: [ColorStore],
        }).compileComponents();

        fixture = TestBed.createComponent(ChoiceStatCardComponent);
        component = fixture.componentInstance;
        colorStore = TestBed.inject(ColorStore);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
