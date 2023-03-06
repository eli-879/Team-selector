import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasResultsComponent } from './canvas-results.component';
import { ChoiceToolStore } from '../../store/choice-tool.store';

describe('CanvasResultsComponent', () => {
    let component: CanvasResultsComponent;
    let fixture: ComponentFixture<CanvasResultsComponent>;
    let mockChoiceStore: ChoiceToolStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CanvasResultsComponent],
            providers: [ChoiceToolStore],
        }).compileComponents();

        fixture = TestBed.createComponent(CanvasResultsComponent);
        component = fixture.componentInstance;
        mockChoiceStore = TestBed.inject(ChoiceToolStore);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
