import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasSectionComponent } from './canvas-section.component';
import { ChoiceToolStore } from '../store/choice-tool.store';

describe('CanvasSectionComponent', () => {
    let component: CanvasSectionComponent;
    let fixture: ComponentFixture<CanvasSectionComponent>;
    let choiceToolStore: ChoiceToolStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CanvasSectionComponent],
            providers: [ChoiceToolStore],
        }).compileComponents();

        fixture = TestBed.createComponent(CanvasSectionComponent);
        component = fixture.componentInstance;
        choiceToolStore = TestBed.inject(ChoiceToolStore);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
