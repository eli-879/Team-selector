import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { ChoiceCard } from 'src/app/core/models/choice-card.interface';
import { ChoiceToolState } from './choice-tool.state';

@Injectable()
export class ChoiceToolStore extends ComponentStore<ChoiceToolState> {
    constructor() {
        super({
            choices: [],
        });
    }

    // ** SELECTORS ** //

    public readonly choices$: Observable<ChoiceCard[]> = this.select(
        (state) => state.choices
    );

    // ** CHOICES ** //

    public readonly addChoice = this.updater(
        (state, choice: ChoiceCard): ChoiceToolState => {
            return { ...state, choices: [...state.choices, choice] };
        }
    );
}
