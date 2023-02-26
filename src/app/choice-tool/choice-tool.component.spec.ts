import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceToolComponent } from './choice-tool.component';

describe('ChoiceToolComponent', () => {
    let component: ChoiceToolComponent;
    let fixture: ComponentFixture<ChoiceToolComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChoiceToolComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ChoiceToolComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
