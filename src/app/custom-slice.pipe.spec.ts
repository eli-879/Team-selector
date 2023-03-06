import * as exp from 'constants';
import { CustomSlicePipe } from './custom-slice.pipe';

describe('CustomSlicePipe', () => {
    const pipe = new CustomSlicePipe();

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('transforms abcdefghijk to abcde... with max length of 5', () => {
        expect(pipe.transform('abcdefghijk', 5)).toBe('abcde...');
    });

    it('transforms abcdefghijk to abcdefghijk with max length of 20', () => {
        expect(pipe.transform('abcdefghijk', 20)).toBe('abcdefghijk');
    });
});
