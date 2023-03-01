import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingSectionComponent } from './landing-section/landing-section.component';
import { ChoiceToolComponent } from './choice-tool/choice-tool.component';
import { ObserverChildDirective } from './observer-child.directive';
import { ColorStore } from './color-store/color.store';
import { ColorPallete } from './color-store/types/color-pallete.interface';
import { Observable } from 'rxjs';

@Component({
    standalone: true,
    selector: 'arena-of-choices-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        LandingSectionComponent,
        ChoiceToolComponent,
        ObserverChildDirective,
        CommonModule,
    ],
    providers: [ColorStore],
})
export class AppComponent {
    title = 'arena-of-choices';
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
        console.log(entries);
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
