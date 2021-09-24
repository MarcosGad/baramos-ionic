import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TablehgzPage } from './tablehgz.page';

describe('TablehgzPage', () => {
  let component: TablehgzPage;
  let fixture: ComponentFixture<TablehgzPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablehgzPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TablehgzPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
