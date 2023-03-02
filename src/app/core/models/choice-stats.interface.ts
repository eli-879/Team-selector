import { CharacterStates } from 'src/app/choice-tool/canvas-section/character-properties/character-states.enum';
import { CharacterAssetType } from 'src/app/choice-tool/store/types/asset-types.type';

export interface ChoiceStats {
    id: number;
    choice: string;
    health: number;
    maxHealth: number;
    characterType: CharacterAssetType;
    images: HTMLImageElement[];
    state: CharacterStates;
}
