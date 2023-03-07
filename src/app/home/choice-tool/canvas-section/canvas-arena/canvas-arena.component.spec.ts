import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasArenaComponent } from './canvas-arena.component';
import { AssetManagerService } from 'src/app/asset-manager.service';
import { ChoiceToolStore } from '../../store/choice-tool.store';

describe('CanvasArenaComponent', () => {
    let component: CanvasArenaComponent;
    let fixture: ComponentFixture<CanvasArenaComponent>;
    let assetManagerService: AssetManagerService;
    let choiceStore: ChoiceToolStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CanvasArenaComponent],
            providers: [AssetManagerService, ChoiceToolStore],
        }).compileComponents();

        fixture = TestBed.createComponent(CanvasArenaComponent);
        component = fixture.componentInstance;
        assetManagerService = TestBed.inject(AssetManagerService);
        choiceStore = TestBed.inject(ChoiceToolStore);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
