import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingSectionComponent } from './landing-section/landing-section.component';
import { ChoiceToolComponent } from './choice-tool/choice-tool.component';
import { Observable } from 'rxjs';
import { ColorPallete } from '../color-store/types/color-pallete.interface';
import { ColorStore } from '../color-store/color.store';
import { ObserverChildDirective } from '../observer-child.directive';

@Component({
    selector: 'arena-of-choices-home',
    standalone: true,
    imports: [
        CommonModule,
        LandingSectionComponent,
        ChoiceToolComponent,
        ObserverChildDirective,
    ],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    public readonly observer: IntersectionObserver;

    public colorPallete$: Observable<ColorPallete>;

    colorPallete1: ColorPallete = {
        bg: '#f5f5f5',
        textColor: '#000000',
        cardColor: '#091540',
        cardTextColor: '#ffffff',
    };
    colorPallete2: ColorPallete = {
        bg: '#091540',
        textColor: '#ffffff',
        cardColor: '#f5f5f5',
        cardTextColor: '#000000',
    };

    callback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const e = entry.target as HTMLElement;
                const pallete = e.dataset['color'] as string;

                switch (pallete) {
                    case 'pallete1':
                        this.colorStore.updateColorPallete(this.colorPallete1);
                        document.body.style.background = this.colorPallete1.bg;
                        break;
                    case 'pallete2':
                        this.colorStore.updateColorPallete(this.colorPallete2);
                        document.body.style.background = this.colorPallete2.bg;
                        break;
                }
            }
        });
    };

    constructor(private colorStore: ColorStore) {
        this.observer = new IntersectionObserver(this.callback, {
            threshold: 0.5,
        });

        this.colorPallete$ = this.colorStore.colorPallete$;
    }
}
