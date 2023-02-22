import { Component } from '@angular/core';
import { LandingSectionComponent } from './landing-section/landing-section.component';

@Component({
  standalone: true,
  imports: [LandingSectionComponent],
  selector: 'arena-of-choices-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'arena-of-choices';
}
