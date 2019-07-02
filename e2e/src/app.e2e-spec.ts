import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('zonky-uloha', () => {
  const baseUrl = 'http://localhost:4200';
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should navigate to proper url', () => {
    page.navigateTo();
    expect(page.getCurrentUrl()).toEqual(`${baseUrl}/average-loan`);
  });

  it('should display title', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('Zonky Úloha');
  });

  it('should display page title', () => {
    page.navigateTo();
    expect(page.getPageTitle()).toEqual('zonky úloha');
  });

  afterEach(checkLogs);

  async function checkLogs() {
    const severeLog = { level: logging.Level.SEVERE } as logging.Entry;
    const browserLogs = await getBrowserLogs();

    expect(browserLogs).not.toContain(jasmine.objectContaining(severeLog));
  }

  async function getBrowserLogs() {
    return browser.manage().logs().get(logging.Type.BROWSER);
  }
});
