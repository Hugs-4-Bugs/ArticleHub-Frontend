// import { Component, Inject, OnInit } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { ThemeService } from 'src/app/services/theme.service'; // Path from src/app/admin/dialog/payment-dialog to src/app/services

// @Component({
//   selector: 'app-payment-options-dialog',
//   templateUrl: './payment-dialog.component.html',
//   styleUrls: ['./payment-dialog.component.scss']
// })
// export class PaymentDialogComponent implements OnInit {
//   // ThemeService is passed via MAT_DIALOG_DATA to maintain consistent theming
//   themeService: ThemeService;

//   constructor(
//     public dialogRef: MatDialogRef<PaymentDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//   ) {
//     // Retrieve themeService from the data passed when the dialog was opened
//     this.themeService = data.themeService;
//   }

//   ngOnInit(): void {
//     // Initialization logic if needed
//   }

//   /**
//    * Closes the dialog and passes the selected payment tier back to the parent component.
//    * This aligns with the 'selectFormat'/'selectOption' pattern.
//    * @param tier The selected payment tier ('limited' for ₹10, 'full' for ₹50).
//    */
//   selectTier(tier: 'limited' | 'full'): void {
//     this.dialogRef.close(tier);
//   }
// }





import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-payment-options-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent implements OnInit {
  themeService: ThemeService;
  pricing: { limited: number; full: number };

  constructor(
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.themeService = data.themeService;
    this.pricing = data.pricing || { limited: 10, full: 50 }; // fallback default
  }

  ngOnInit(): void {}

  selectTier(tier: 'limited' | 'full'): void {
    this.dialogRef.close(tier);
  }
}
