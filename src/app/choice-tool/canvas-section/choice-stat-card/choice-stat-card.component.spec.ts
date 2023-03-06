import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceStatCardComponent } from './choice-stat-card.component';
import { ColorStore } from 'src/app/color-store/color.store';
import { CharacterStates } from '../character-properties/character-states.enum';

describe('ChoiceStatCardComponent', () => {
    let component: ChoiceStatCardComponent;
    let fixture: ComponentFixture<ChoiceStatCardComponent>;
    let colorStore: ColorStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChoiceStatCardComponent],
            providers: [ColorStore],
        }).compileComponents();

        fixture = TestBed.createComponent(ChoiceStatCardComponent);
        component = fixture.componentInstance;
        component.choiceStat = {
            id: 1,
            choice: 'Burger King',
            health: 100,
            maxHealth: 100,
            characterType: 'firzen',
            images: [new Image()],
            state: CharacterStates.WAITING,
        };
        colorStore = TestBed.inject(ColorStore);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
