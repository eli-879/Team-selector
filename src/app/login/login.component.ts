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
    public loading = false;
    public submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store,
        private authFacade: AuthFacade
    ) {
        console.log(formBuilder);
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
        console.log(this.f['username'].value, this.f['password'].value);
        const payload = {
            email: this.f['username'].value,
            password: this.f['password'].value,
        };
        this.authFacade.login(payload);
    }
}
