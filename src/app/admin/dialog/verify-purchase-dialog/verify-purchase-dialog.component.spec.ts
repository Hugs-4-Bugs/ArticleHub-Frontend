import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyPurchaseDialogComponent } from './verify-purchase-dialog.component';

describe('VerifyPurchaseDialogComponent', () => {
  let component: VerifyPurchaseDialogComponent;
  let fixture: ComponentFixture<VerifyPurchaseDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyPurchaseDialogComponent]
    });
    fixture = TestBed.createComponent(VerifyPurchaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
