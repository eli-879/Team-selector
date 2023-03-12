import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AOC_STORE_KEY } from './aoc-store.key';
import { authReducer } from './reducers/auth.reducers';
import { AuthEffects } from './effects/auth.effects';
import { AuthFacade } from './facades/auth.facade';

@NgModule({
    imports: [
        StoreModule.forFeature(AOC_STORE_KEY, authReducer),
        EffectsModule.forFeature([AuthEffects]),
    ],
    providers: [AuthFacade],
})
export class AOCStoreModule {}
