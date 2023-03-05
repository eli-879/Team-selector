import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceInputSectionComponent } from './choice-input-section.component';
import { ChoiceToolStore } from '../store/choice-tool.store';

describe('ChoiceInputSectionComponent', () => {
    let component: ChoiceInputSectionComponent;
    let fixture: ComponentFixture<ChoiceInputSectionComponent>;
    let mockChoiceStore: ChoiceToolStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChoiceInputSectionComponent],
            providers: [ChoiceToolStore],
        }).compileComponents();

        fixture = TestBed.createComponent(ChoiceInputSectionComponent);
        component = fixture.componentInstance;
        mockChoiceStore = TestBed.inject(ChoiceToolStore);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
