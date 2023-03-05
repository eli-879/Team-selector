import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceToolComponent } from './choice-tool.component';
import { ChoiceToolStore } from './store/choice-tool.store';

describe('ChoiceToolComponent', () => {
    let component: ChoiceToolComponent;
    let fixture: ComponentFixture<ChoiceToolComponent>;
    let choiceStore: ChoiceToolStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChoiceToolComponent],
            providers: [ChoiceToolStore],
        }).compileComponents();

        fixture = TestBed.createComponent(ChoiceToolComponent);
        component = fixture.componentInstance;
        choiceStore = TestBed.inject(ChoiceToolStore);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
