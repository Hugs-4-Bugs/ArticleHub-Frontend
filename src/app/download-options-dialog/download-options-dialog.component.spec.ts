import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadOptionsDialogComponent } from './download-options-dialog.component';

describe('DownloadOptionsDialogComponent', () => {
  let component: DownloadOptionsDialogComponent;
  let fixture: ComponentFixture<DownloadOptionsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadOptionsDialogComponent]
    });
    fixture = TestBed.createComponent(DownloadOptionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
