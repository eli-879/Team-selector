import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoiceToolStore } from '../../store/choice-tool.store';
import { AssetManagerService } from 'src/app/asset-manager.service';
import { ColorStore } from 'src/app/color-store/color.store';
import { Observable } from 'rxjs';
import { ColorPallete } from 'src/app/color-store/types/color-pallete.interface';

@Component({
    selector: 'arena-of-choices-choice-input-text-input',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './choice-input-text-input.component.html',
    styleUrls: ['./choice-input-text-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChoiceInputTextInputComponent {
    public colorPallete$: Observable<ColorPallete>;

    constructor(
        private choiceToolStore: ChoiceToolStore,
        private assetManager: AssetManagerService,
        private colorStore: ColorStore
    ) {
        this.colorPallete$ = this.colorStore.colorPallete$;
    }

    public addChoice(choice: string) {
        if (!choice.trim()) {
            return;
        }
        const assetType = this.assetManager.getRandomCharacterAsset();
        console.log(assetType);
        const assetImages = this.assetManager.getCharacterAssets(assetType);

        if (assetImages !== null) {
            this.choiceToolStore.addChoice({
                name: choice,
                images: assetImages,
                type: assetType,
            });
        }
    }
}
