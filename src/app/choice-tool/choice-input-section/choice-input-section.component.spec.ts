import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceInputSectionComponent } from './choice-input-section.component';
import { ChoiceToolStore } from '../store/choice-tool.store';
import { ColorStore } from 'src/app/color-store/color.store';

describe('ChoiceInputSectionComponent', () => {
    let component: ChoiceInputSectionComponent;
    let fixture: ComponentFixture<ChoiceInputSectionComponent>;
    let choiceStore: ChoiceToolStore;
    let colorStore: ColorStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChoiceInputSectionComponent],
            providers: [ChoiceToolStore, ColorStore],
        }).compileComponents();

        fixture = TestBed.createComponent(ChoiceInputSectionComponent);
        component = fixture.componentInstance;
        choiceStore = TestBed.inject(ChoiceToolStore);
        colorStore = TestBed.inject(ColorStore);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
