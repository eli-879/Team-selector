import { Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

export const APP_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
        runGuardsAndResolvers: 'always',
    },
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent)
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./login/login.component').then((m) => m.LoginComponent),
    },
    {
        path: 'signup',
        loadComponent: () =>
            import('./signup/signup.component').then((m) => m.SignupComponent),
    },
    {
        path: 'profile',
        loadComponent: () =>
            import('./profile/profile.component').then(
                (m) => m.ProfileComponent
            ),
        canActivate: [AuthGuardService],
    },
    {
        path: '**',
        redirectTo: '/',
    },
];
