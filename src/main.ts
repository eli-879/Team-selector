import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routing';
import { AuthEffects } from './app/core/store/effects/auth.effects';
import { authReducer } from './app/core/store/reducers/auth.reducers';
import { AOC_STORE_KEY } from './app/core/store/aoc-store.key';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
    TokenInterceptorService,
    ErrorInterceptor,
} from './app/services/token-interceptor.service';
import { AuthService } from './app/services/auth-service.service';
import { AuthGuardService } from './app/services/auth-guard.service';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
            RouterModule.forRoot(APP_ROUTES, { onSameUrlNavigation: 'reload' }),
            HttpClientModule
        ),
        provideStore({ [AOC_STORE_KEY]: authReducer }),
        provideEffects(AuthEffects),
        AuthService,
        AuthGuardService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true,
        },
    ],
});
