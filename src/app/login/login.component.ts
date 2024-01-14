import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormBuilder,
    FormGroup,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthFacade } from '../core/store/facades/auth.facade';
import { Observable } from 'rxjs';
import {
    selectErrorMessage,
    selectFetchState,
} from '../core/store/selectors/auth.selectors';
import { FetchState } from '../core/models/fetch-state.enum';

@Component({
    selector: 'arena-of-choices-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],

    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
    public form!: FormGroup;

    public errorMessage$: Observable<string | null>;
    public fetchState$: Observable<FetchState | null>;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store,
        private authFacade: AuthFacade
    ) {
        this.errorMessage$ = this.store.select(selectErrorMessage);
        this.fetchState$ = this.store.select(selectFetchState);
    }
    // convenience getter for easy access to form fields
    get f() {
        return this.form.controls;
    }

    public ngOnInit(): void {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    public onSubmit() {
        console.log('DSDF');

        const payload = {
            email: this.f['username'].value,
            password: this.f['password'].value,
        };
        this.authFacade.login(payload);
        this.form.reset();

        return;
    }
}
