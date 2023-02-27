import { CharacterAssetType } from 'src/app/choice-tool/store/types/asset-types.type';

export interface ChoiceCard {
    name: string;
    image: HTMLImageElement[];
    type: CharacterAssetType;
}
