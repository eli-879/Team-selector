import { CharacterAssetType } from 'src/app/home/choice-tool/store/types/asset-types.type';
export interface ChoiceCard {
    id: number;
    name: string;
    images: HTMLImageElement[];
    type: CharacterAssetType;
}
