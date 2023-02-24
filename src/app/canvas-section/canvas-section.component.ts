import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'arena-of-choices-canvas-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './canvas-section.component.html',
  styleUrls: ['./canvas-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasSectionComponent {}
