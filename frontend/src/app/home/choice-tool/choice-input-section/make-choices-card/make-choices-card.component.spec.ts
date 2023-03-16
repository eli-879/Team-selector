import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeChoicesCardComponent } from './make-choices-card.component';

import { ChoiceToolStore } from '../../store/choice-tool.store';

describe('MakeChoicesCardComponent', () => {
    let component: MakeChoicesCardComponent;
    let fixture: ComponentFixture<MakeChoicesCardComponent>;
    let mockChoiceStore: ChoiceToolStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MakeChoicesCardComponent],
            providers: [ChoiceToolStore],
        }).compileComponents();

        fixture = TestBed.createComponent(MakeChoicesCardComponent);
        component = fixture.componentInstance;
        mockChoiceStore = TestBed.inject(ChoiceToolStore);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
