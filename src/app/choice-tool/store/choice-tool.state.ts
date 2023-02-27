import { ChoiceCard } from 'src/app/core/models/choice-card.interface';
import { ChoiceStats } from 'src/app/core/models/choice-stats.interface';

export interface ChoiceToolState {
    choices: ChoiceCard[];
    choiceStats: ChoiceStats[];
}
