import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HsystemPage } from './hsystem.page';

describe('HsystemPage', () => {
  let component: HsystemPage;
  let fixture: ComponentFixture<HsystemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HsystemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HsystemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
