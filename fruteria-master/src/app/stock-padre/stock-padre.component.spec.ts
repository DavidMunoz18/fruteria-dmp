import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPadreComponent } from './stock-padre.component';

describe('StockPadreComponent', () => {
  let component: StockPadreComponent;
  let fixture: ComponentFixture<StockPadreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockPadreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockPadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
