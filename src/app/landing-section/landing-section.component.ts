import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { QuestionMarkComponent } from './question-mark/question-mark.component';
import { HackerEffect } from '../utilities/hacker-effect';

@Component({
    selector: 'arena-of-choices-landing-section',
    standalone: true,
    imports: [CommonModule, NavbarComponent, QuestionMarkComponent],
    templateUrl: './landing-section.component.html',
    styleUrls: ['./landing-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingSectionComponent implements AfterViewInit {
    @ViewChild('header') header!: ElementRef;
    private hackerEffect!: HackerEffect;

    public ngAfterViewInit(): void {
        this.hackerEffect = new HackerEffect(this.header);
    }

    public createHackerEffect() {
        this.hackerEffect.createHackerEffect();
    }
}
