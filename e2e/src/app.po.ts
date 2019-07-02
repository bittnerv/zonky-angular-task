import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getPageTitle() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  getCurrentUrl() {
    return browser.getCurrentUrl();
  }

  getTitle() {
    return browser.getTitle();
  }
}
