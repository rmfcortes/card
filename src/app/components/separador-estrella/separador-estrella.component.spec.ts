import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeparadorEstrellaComponent } from './separador-estrella.component';

describe('SeparadorEstrellaComponent', () => {
  let component: SeparadorEstrellaComponent;
  let fixture: ComponentFixture<SeparadorEstrellaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeparadorEstrellaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeparadorEstrellaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
