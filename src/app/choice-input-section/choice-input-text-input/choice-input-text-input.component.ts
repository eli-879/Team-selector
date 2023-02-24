import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'arena-of-choices-choice-input-text-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './choice-input-text-input.component.html',
  styleUrls: ['./choice-input-text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChoiceInputTextInputComponent {}
