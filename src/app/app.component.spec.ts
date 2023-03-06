import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ColorStore } from './color-store/color.store';

describe('AppComponent', () => {
    let colorStore: ColorStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent],
            providers: [ColorStore],
        }).compileComponents();

        colorStore = TestBed.inject(ColorStore);
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'arena-of-choices'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('arena-of-choices');
    });
});
