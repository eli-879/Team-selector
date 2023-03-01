import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { ColorState } from './color.state';
import { ColorPallete } from './types/color-pallete.interface';

@Injectable()
export class ColorStore extends ComponentStore<ColorState> {
    constructor() {
        super({
            colorPallete: {
                bg: '#f5f5f5',
                textColor: '#000000',
                cardColor: '#091540',
                cardTextColor: '#ffffff',
            },
        });
    }

    public readonly colorPallete$: Observable<ColorPallete> = this.select(
        (state) => state.colorPallete
    );

    public readonly updateColorPallete = this.updater(
        (state, colorPallete: ColorPallete): ColorState => {
            return { ...state, colorPallete: colorPallete };
        }
    );
}
