import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let element: HTMLElement;

  beforeEach(async(initalizeTestModule));
  beforeEach(initializeComponent);

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    expect(findElement('h1').textContent).toContain('zonky úloha');
  });

  function findElement(selector: string): HTMLElement {
    return element.querySelector(selector);
  }

  function initalizeTestModule(): void {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }

  function initializeComponent(): void {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  }
});
