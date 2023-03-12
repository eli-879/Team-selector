import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceInputTextInputComponent } from './choice-input-text-input.component';
import { ChoiceToolStore } from '../../store/choice-tool.store';
import { ColorStore } from 'src/app/color-store/color.store';
import { AssetManagerService } from 'src/app/asset-manager.service';

describe('ChoiceInputTextInputComponent', () => {
    let component: ChoiceInputTextInputComponent;
    let fixture: ComponentFixture<ChoiceInputTextInputComponent>;
    let mockChoiceStore: ChoiceToolStore;
    let mockColorStore: ColorStore;
    let mockAssetManagerService: AssetManagerService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChoiceInputTextInputComponent],
            providers: [ChoiceToolStore, ColorStore, AssetManagerService],
        }).compileComponents();

        fixture = TestBed.createComponent(ChoiceInputTextInputComponent);
        component = fixture.componentInstance;
        mockChoiceStore = TestBed.inject(ChoiceToolStore);
        mockColorStore = TestBed.inject(ColorStore);
        mockAssetManagerService = TestBed.inject(AssetManagerService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
