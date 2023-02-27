import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasArenaComponent } from './canvas-arena.component';

describe('CanvasArenaComponent', () => {
    let component: CanvasArenaComponent;
    let fixture: ComponentFixture<CanvasArenaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CanvasArenaComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CanvasArenaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
