import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasSectionComponent } from './canvas-section/canvas-section.component';
import { ChoiceInputSectionComponent } from './choice-input-section/choice-input-section.component';
import { ChoiceToolStore } from './store/choice-tool.store';

import { AssetContainer } from '../core/models/asset-container.interface';

@Component({
    selector: 'arena-of-choices-choice-tool',
    standalone: true,
    imports: [
        CommonModule,
        CanvasSectionComponent,
        ChoiceInputSectionComponent,
    ],
    templateUrl: './choice-tool.component.html',
    styleUrls: ['./choice-tool.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ChoiceToolStore],
})
export class ChoiceToolComponent implements OnInit {
    private assetFolderPath = '../assets/choice-tool-assets';

    public assets: AssetContainer = {
        woodyAssets: [],
        henryAssets: [],
        firzenAssets: [],
        justinAssets: [],
        background: null,
        damageSplats: [],
    };

    constructor(private ChoiceToolStore: ChoiceToolStore) {}

    public ngOnInit(): void {
        this.initChoiceCardAssets();
    }

    public initChoiceCardAssets() {
        // Woody
        const woodyImage = new Image();
        woodyImage.src = this.assetFolderPath + '/woody-assets/woody.png';

        const woodyImageWinning = new Image();
        woodyImageWinning.src =
            this.assetFolderPath + '/woody-assets/woody2.png';

        this.assets.woodyAssets = [woodyImage, woodyImageWinning];

        // Firzen

        const firzenImage = new Image();
        firzenImage.src = this.assetFolderPath + '/firzen-assets/firzen1.png';

        const firzenImageWinning = new Image();
        firzenImageWinning.src =
            this.assetFolderPath + '/firzen-assets/firzen2.png';

        this.assets.firzenAssets = [firzenImage, firzenImageWinning];

        // Henry

        const henryImage = new Image();
        henryImage.src = this.assetFolderPath + '/henry-assets/henry1.png';

        const henryImageAttacking = new Image();
        henryImageAttacking.src =
            this.assetFolderPath + '/henry-assets/henryAttacking.png';

        const henryImageWinning = new Image();
        henryImageWinning.src =
            this.assetFolderPath + '/henry-assets/henry2.png';

        this.assets.henryAssets = [
            henryImage,
            henryImageAttacking,
            henryImageWinning,
        ];

        // Justin

        const justinImage = new Image();
        justinImage.src = this.assetFolderPath + '/justin-assets/justin1.png';

        const justinImageAttacking = new Image();
        justinImageAttacking.src =
            this.assetFolderPath + '/justin-assets/justin2.png';

        this.assets.justinAssets = [justinImage, justinImageAttacking];

        // Background

        const bg = new Image();
        bg.src = this.assetFolderPath + '/bg1.png';
        this.assets.background = bg;

        // Damage Splats

        const damageSplatRed = new Image();
        const damageSplatBlue = new Image();

        damageSplatRed.src = this.assetFolderPath + '/dmgsplat_red.png';
        damageSplatBlue.src = this.assetFolderPath + '/dmgsplat_blue.png';

        this.assets.damageSplats = [damageSplatRed, damageSplatBlue];
    }
}
