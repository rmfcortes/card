import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaImgComponent } from './lista-img.component';

describe('ListaImgComponent', () => {
  let component: ListaImgComponent;
  let fixture: ComponentFixture<ListaImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaImgComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
