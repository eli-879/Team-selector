import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceInputTextInputComponent } from './choice-input-text-input.component';

describe('ChoiceInputTextInputComponent', () => {
    let component: ChoiceInputTextInputComponent;
    let fixture: ComponentFixture<ChoiceInputTextInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChoiceInputTextInputComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ChoiceInputTextInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
