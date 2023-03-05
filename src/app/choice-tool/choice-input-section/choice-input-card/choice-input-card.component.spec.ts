import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceInputCardComponent } from './choice-input-card.component';
import { ColorStore } from 'src/app/color-store/color.store';
import { ChoiceToolStore } from '../../store/choice-tool.store';

describe('ChoiceInputCardComponent', () => {
    let component: ChoiceInputCardComponent;
    let fixture: ComponentFixture<ChoiceInputCardComponent>;
    let colorStore: ColorStore;
    let choiceStore: ChoiceToolStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChoiceInputCardComponent],
            providers: [ColorStore, ChoiceToolStore],
        }).compileComponents();

        fixture = TestBed.createComponent(ChoiceInputCardComponent);
        component = fixture.componentInstance;
        colorStore = TestBed.inject(ColorStore);
        choiceStore = TestBed.inject(ChoiceToolStore);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
