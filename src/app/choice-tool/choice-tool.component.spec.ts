import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorStore } from '../color-store/color.store';

import { ChoiceToolComponent } from './choice-tool.component';
import { ChoiceToolStore } from './store/choice-tool.store';

describe('ChoiceToolComponent', () => {
    let component: ChoiceToolComponent;
    let fixture: ComponentFixture<ChoiceToolComponent>;
    let choiceStore: ChoiceToolStore;
    let colorStore: ColorStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChoiceToolComponent],
            providers: [ChoiceToolStore, ColorStore],
        }).compileComponents();

        fixture = TestBed.createComponent(ChoiceToolComponent);
        component = fixture.componentInstance;
        choiceStore = TestBed.inject(ChoiceToolStore);
        colorStore = TestBed.inject(ColorStore);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
