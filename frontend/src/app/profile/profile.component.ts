import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFacade } from '../core/store/facades/auth.facade';

@Component({
    selector: 'arena-of-choices-profile',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
    constructor(private authFacade: AuthFacade) {}

    public ngOnInit(): void {
        this.authFacade.getProfile();
    }
}
