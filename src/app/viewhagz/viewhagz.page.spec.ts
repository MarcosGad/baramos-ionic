import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewhagzPage } from './viewhagz.page';

describe('ViewhagzPage', () => {
  let component: ViewhagzPage;
  let fixture: ComponentFixture<ViewhagzPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewhagzPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewhagzPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
