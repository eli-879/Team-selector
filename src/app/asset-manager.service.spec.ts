import { TestBed } from '@angular/core/testing';
import { AssetManagerService } from './asset-manager.service';
import { AssetContainer } from './core/models/asset-container.interface';

describe('AssetManagerService', () => {
    let service: AssetManagerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AssetManagerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return an array of images when getting a characters assets', () => {
        const img1 = new Image();
        const img2 = new Image();
        img1.src = './assets/choice-tool-assets/firzen-assets/firzen1.png';
        img2.src = './assets/choice-tool-assets/firzen-assets/firzen2.png';
        expect(service.getCharacterAssets('firzen')).toEqual([img1, img2]);
    });

    it('should return an instance of AssetContainer with all assets when getting all assets', () => {
        const assetFolderPath = './assets/choice-tool-assets';

        const assets: AssetContainer = {
            woodyAssets: [],
            henryAssets: [],
            firzenAssets: [],
            justinAssets: [],
            background: null,
            damageSplats: [],
        };
        // Woody
        const woodyImage = new Image();
        woodyImage.src = assetFolderPath + '/woody-assets/woody1.png';

        const woodyImageWinning = new Image();
        woodyImageWinning.src = assetFolderPath + '/woody-assets/woody2.png';

        assets.woodyAssets = [woodyImage, woodyImageWinning];

        // Firzen

        const firzenImage = new Image();
        firzenImage.src = assetFolderPath + '/firzen-assets/firzen1.png';

        const firzenImageWinning = new Image();
        firzenImageWinning.src = assetFolderPath + '/firzen-assets/firzen2.png';

        assets.firzenAssets = [firzenImage, firzenImageWinning];

        // Henry

        const henryImage = new Image();
        henryImage.src = assetFolderPath + '/henry-assets/henry1.png';

        const henryImageAttacking = new Image();
        henryImageAttacking.src =
            assetFolderPath + '/henry-assets/henryAttacking.png';

        const henryImageWinning = new Image();
        henryImageWinning.src = assetFolderPath + '/henry-assets/henry2.png';

        assets.henryAssets = [
            henryImage,
            henryImageAttacking,
            henryImageWinning,
        ];

        // Justin

        const justinImage = new Image();
        justinImage.src = assetFolderPath + '/justin-assets/justin1.png';

        const justinImageAttacking = new Image();
        justinImageAttacking.src =
            assetFolderPath + '/justin-assets/justin2.png';

        assets.justinAssets = [justinImage, justinImageAttacking];

        // Background

        const bg = new Image();
        bg.src = assetFolderPath + '/bg1.png';
        assets.background = bg;

        // Damage Splats

        const damageSplatRed = new Image();
        const damageSplatBlue = new Image();
        const damageSplatMaxHit = new Image();

        damageSplatRed.src = assetFolderPath + '/dmgsplat_red.png';
        damageSplatBlue.src = assetFolderPath + '/dmgsplat_blue.png';
        damageSplatMaxHit.src = assetFolderPath + '/dmgsplat_maxhit.png';

        assets.damageSplats = [
            damageSplatRed,
            damageSplatBlue,
            damageSplatMaxHit,
        ];
        expect(service.getAllCharacterAssets()).toEqual(assets);
    });
});
