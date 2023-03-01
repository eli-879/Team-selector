import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { ChoiceCard } from 'src/app/core/models/choice-card.interface';
import { ChoiceStats } from 'src/app/core/models/choice-stats.interface';
import { ChoiceToolState } from './choice-tool.state';

@Injectable()
export class ChoiceToolStore extends ComponentStore<ChoiceToolState> {
    constructor() {
        super({
            choices: [],
            choiceStats: [],
        });
    }

    // ** SELECTORS ** //

    public readonly choices$: Observable<ChoiceCard[]> = this.select(
        (state) => state.choices
    );

    public readonly choiceStats$: Observable<ChoiceStats[]> = this.select(
        (state) => state.choiceStats
    );

    // ** CHOICES ** //

    public readonly addChoice = this.updater(
        (state, choice: ChoiceCard): ChoiceToolState => {
            return { ...state, choices: [choice, ...state.choices] };
        }
    );

    public readonly updateChoiceStats = this.updater(
        (state, choiceStats: ChoiceStats[]): ChoiceToolState => {
            console.log(choiceStats);
            return { ...state, choiceStats: [...choiceStats] };
        }
    );
}
