import { ByCountryPipe } from './by-country.pipe';

describe('ByCountryPipe', () => {
  it('create an instance', () => {
    const pipe = new ByCountryPipe();
    expect(pipe).toBeTruthy();
  });
});
