import { Component } from '@angular/core';
import { CanvasSectionComponent } from './canvas-section/canvas-section.component';
import { ChoiceInputSectionComponent } from './choice-input-section/choice-input-section.component';
import { LandingSectionComponent } from './landing-section/landing-section.component';

@Component({
  standalone: true,
  imports: [
    LandingSectionComponent,
    ChoiceInputSectionComponent,
    CanvasSectionComponent,
  ],
  selector: 'arena-of-choices-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'arena-of-choices';
}
