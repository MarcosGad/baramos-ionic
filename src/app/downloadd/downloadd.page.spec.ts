import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DownloaddPage } from './downloadd.page';

describe('DownloaddPage', () => {
  let component: DownloaddPage;
  let fixture: ComponentFixture<DownloaddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloaddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DownloaddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
