import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ColorStore } from './color-store/color.store';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AOCStoreModule } from './core/store/aoc-store.module';
import { StoreModule, Store } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { StateObservable } from '@ngrx/store';

@Component({
    standalone: true,
    selector: 'arena-of-choices-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        HomeComponent,
        RouterModule,
        NavbarComponent,
        HttpClientModule,
    ],
    providers: [ColorStore, AOCStoreModule, Store, StoreModule],
})
export class AppComponent {
    title = 'arena-of-choices';
}
