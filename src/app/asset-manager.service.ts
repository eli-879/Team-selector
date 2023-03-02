import { Injectable } from '@angular/core';
import { CharacterAssetType } from './choice-tool/store/types/asset-types.type';
import { AssetContainer } from './core/models/asset-container.interface';

@Injectable({
    providedIn: 'root',
})
export class AssetManagerService {
    private assetFolderPath = './assets/choice-tool-assets';
    private characters: CharacterAssetType[] = [
        'woody',
        'justin',
        'henry',
        'firzen',
    ];

    public assets: AssetContainer = {
        woodyAssets: [],
        henryAssets: [],
        firzenAssets: [],
        justinAssets: [],
        background: null,
        damageSplats: [],
    };

    constructor() {
        this.loadAssets();
    }

    public loadAssets() {
        // Woody
        const woodyImage = new Image();
        woodyImage.src = this.assetFolderPath + '/woody-assets/woody1.png';

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
        const damageSplatMaxHit = new Image();

        damageSplatRed.src = this.assetFolderPath + '/dmgsplat_red.png';
        damageSplatBlue.src = this.assetFolderPath + '/dmgsplat_blue.png';
        damageSplatMaxHit.src = this.assetFolderPath + '/dmgsplat_maxhit.png';

        this.assets.damageSplats = [
            damageSplatRed,
            damageSplatBlue,
            damageSplatMaxHit,
        ];
    }

    public getAllCharacterAssets(): AssetContainer {
        return this.assets;
    }

    public getCharacterAssets(type: CharacterAssetType) {
        switch (type) {
            case 'woody': {
                return this.assets.woodyAssets;
            }
            case 'henry': {
                return this.assets.henryAssets;
            }
            case 'firzen': {
                return this.assets.firzenAssets;
            }
            case 'justin': {
                return this.assets.justinAssets;
            }
            default: {
                return null;
            }
        }
    }

    public getRandomCharacterAsset(): CharacterAssetType {
        return this.characters[
            Math.floor(Math.random() * this.characters.length)
        ];
    }
}
