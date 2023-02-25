import { Component } from '@angular/core';

import { LandingSectionComponent } from './landing-section/landing-section.component';
import { ChoiceToolComponent } from './choice-tool/choice-tool.component';

@Component({
  standalone: true,
  imports: [LandingSectionComponent, ChoiceToolComponent],
  selector: 'arena-of-choices-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'arena-of-choices';
}
