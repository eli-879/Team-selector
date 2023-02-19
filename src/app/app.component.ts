import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  standalone: true,
  imports: [NavbarComponent],
  selector: 'arena-of-choices-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'arena-of-choices';
}
