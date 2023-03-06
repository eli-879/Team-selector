import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceResultComponent } from './choice-result.component';
import { ColorStore } from 'src/app/color-store/color.store';
import { Component } from '@angular/core';

describe('ChoiceResultComponent', () => {
    let component: ChoiceResultComponent;
    let fixture: ComponentFixture<ChoiceResultComponent>;
    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;
    let colorStore: ColorStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestHostComponent],
            imports: [ChoiceResultComponent],
            providers: [ColorStore],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChoiceResultComponent);
        component = fixture.componentInstance;
        component.result = {
            id: 1,
            name: 'Burger King',
            characterType: 'firzen',
            deathNumber: 1,
            dmgDealt: 100,
            images: [new Image()],
        };
        colorStore = TestBed.inject(ColorStore);

        testHostFixture = TestBed.createComponent(TestHostComponent);
        testHostComponent = testHostFixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: `arena-of-choices-host-component`,
    template: `<arena-of-choices-choice-result
        input="test input"
    ></arena-of-choices-choice-result>`,
})
class TestHostComponent {}
