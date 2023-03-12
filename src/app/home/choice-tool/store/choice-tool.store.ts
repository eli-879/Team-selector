import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { ChoiceCard } from 'src/app/core/models/choice-card.interface';
import { ChoiceResult } from 'src/app/core/models/choice-result.interface';
import { ChoiceStats } from 'src/app/core/models/choice-stats.interface';
import { ChoiceToolState } from './choice-tool.state';
import { View } from './types/view.type';

@Injectable()
export class ChoiceToolStore extends ComponentStore<ChoiceToolState> {
    constructor() {
        super({
            choices: [],
            choiceStats: [],
            view: 'choice',
            generateCharacters: false,
            gameFinished: false,
            choiceResults: [],
        });
    }

    // ** SELECTORS ** //

    public readonly choices$: Observable<ChoiceCard[]> = this.select(
        (state) => state.choices
    );

    public readonly choiceStats$: Observable<ChoiceStats[]> = this.select(
        (state) => state.choiceStats
    );

    public readonly view$: Observable<View> = this.select(
        (state) => state.view
    );

    public readonly generateCharacters$: Observable<boolean> = this.select(
        (state) => state.generateCharacters
    );

    public readonly gameFinished$: Observable<boolean> = this.select(
        (state) => state.gameFinished
    );

    public readonly choiceResults$: Observable<ChoiceResult[]> = this.select(
        (state) => state.choiceResults
    );

    // ** CHOICES ** //

    public readonly addChoice = this.updater(
        (state, choice: ChoiceCard): ChoiceToolState => {
            return { ...state, choices: [choice, ...state.choices] };
        }
    );

    public readonly updateChoiceStats = this.updater(
        (state, choiceStats: ChoiceStats[]): ChoiceToolState => {
            return { ...state, choiceStats: [...choiceStats] };
        }
    );

    public readonly removeChoiceById = this.updater(
        (state, id: number): ChoiceToolState => {
            const index = state.choices.findIndex(
                (choice: ChoiceCard) => choice.id === id
            );

            state.choices.splice(index, 1);

            return { ...state, choices: [...state.choices] };
        }
    );

    public readonly addChoiceResult = this.updater(
        (state, choiceResult: ChoiceResult): ChoiceToolState => {
            return {
                ...state,
                choiceResults: [choiceResult, ...state.choiceResults],
            };
        }
    );

    public readonly updateChoiceResults = this.updater(
        (state, choiceResults: ChoiceResult[]): ChoiceToolState => {
            return {
                ...state,
                choiceResults: [...choiceResults],
            };
        }
    );

    // ** VIEW ** //

    public readonly updateView = this.updater(
        (state, view: View): ChoiceToolState => {
            return { ...state, view: view };
        }
    );

    public readonly updateGenerateCharacters = this.updater(
        (state, generateCharacters: boolean): ChoiceToolState => {
            return { ...state, generateCharacters: generateCharacters };
        }
    );

    public readonly updateGameFinished = this.updater(
        (state, gameFinished: boolean): ChoiceToolState => {
            return { ...state, gameFinished: gameFinished };
        }
    );
}
