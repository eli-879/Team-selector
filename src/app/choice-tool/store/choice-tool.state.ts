import { ChoiceCard } from 'src/app/core/models/choice-card.interface';
import { ChoiceStats } from 'src/app/core/models/choice-stats.interface';
import { View } from './types/view.type';

export interface ChoiceToolState {
    choices: ChoiceCard[];
    choiceStats: ChoiceStats[];
    view: View;
}
