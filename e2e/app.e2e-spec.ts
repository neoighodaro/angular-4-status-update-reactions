import { ReactionsPage } from './app.po';

describe('reactions App', () => {
  let page: ReactionsPage;

  beforeEach(() => {
    page = new ReactionsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
