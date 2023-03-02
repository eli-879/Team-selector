import { CharacterAssetType } from 'src/app/choice-tool/store/types/asset-types.type';

export interface ChoiceCard {
    id: number;
    name: string;
    images: HTMLImageElement[];
    type: CharacterAssetType;
}
