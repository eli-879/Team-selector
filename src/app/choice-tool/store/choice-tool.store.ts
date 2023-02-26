import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { ChoiceToolState } from './choice-tool.state';

@Injectable()
export class ChoiceToolStore extends ComponentStore<ChoiceToolState> {
    constructor() {
        super({ choices: [] });
    }

    public readonly choices$: Observable<string[]> = this.select(
        (state) => state.choices
    );

    // ** CHOICES ** //

    public readonly addChoice = this.updater(
        (state, choice: string): ChoiceToolState => ({
            choices: [...state.choices, choice],
        })
    );
}
