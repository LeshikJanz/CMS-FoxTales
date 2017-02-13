import { CMSFrontEndPage } from './app.po';

describe('cms-front-end App', function() {
  let page: CMSFrontEndPage;

  beforeEach(() => {
    page = new CMSFrontEndPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
