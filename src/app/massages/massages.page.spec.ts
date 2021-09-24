import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MassagesPage } from './massages.page';

describe('MassagesPage', () => {
  let component: MassagesPage;
  let fixture: ComponentFixture<MassagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MassagesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MassagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
