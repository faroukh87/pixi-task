import { PixiTestPage } from './app.po';

describe('pixi-test App', () => {
  let page: PixiTestPage;

  beforeEach(() => {
    page = new PixiTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
