import { CharacterAssetType } from 'src/app/home/choice-tool/store/types/asset-types.type';

export interface ChoiceResult {
    id: number;
    name: string;
    characterType: CharacterAssetType;
    deathNumber: number;
    dmgDealt: number;
    images: HTMLImageElement[];
}
