import { CustomSlicePipe } from './custom-slice.pipe';

describe('CustomSlicePipe', () => {
    it('create an instance', () => {
        const pipe = new CustomSlicePipe();
        expect(pipe).toBeTruthy();
    });

    it('returns a string up to a certain length and if it exceeds it, adds ellipses', () => {
        const pipe = new CustomSlicePipe();
        expect(pipe.transform('abcdefg', 3)).toBe('abc...');
    });
});
