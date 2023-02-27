import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasArenaComponent } from './canvas-arena/canvas-arena.component';

@Component({
    selector: 'arena-of-choices-canvas-section',
    standalone: true,
    imports: [CommonModule, CanvasArenaComponent],
    templateUrl: './canvas-section.component.html',
    styleUrls: ['./canvas-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasSectionComponent {}
