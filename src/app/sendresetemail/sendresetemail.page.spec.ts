import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SendresetemailPage } from './sendresetemail.page';

describe('SendresetemailPage', () => {
  let component: SendresetemailPage;
  let fixture: ComponentFixture<SendresetemailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendresetemailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SendresetemailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
