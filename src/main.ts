import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routing';

bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom(RouterModule.forRoot(APP_ROUTES))],
});
