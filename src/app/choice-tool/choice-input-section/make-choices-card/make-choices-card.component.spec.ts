import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeChoicesCardComponent } from './make-choices-card.component';

describe('MakeChoicesCardComponent', () => {
    let component: MakeChoicesCardComponent;
    let fixture: ComponentFixture<MakeChoicesCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MakeChoicesCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MakeChoicesCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
