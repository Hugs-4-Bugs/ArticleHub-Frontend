import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ThemeService } from 'src/app/services/theme.service'; // Adjust path as needed

@Component({
  selector: 'app-verify-purchase-dialog',
  templateUrl: './verify-purchase-dialog.component.html',
  styleUrls: ['./verify-purchase-dialog.component.scss']
})
export class VerifyPurchaseDialogComponent implements OnInit {
  themeService: ThemeService;
  verifyContactInput: string = ''; // For email or phone number input
  isVerifyingPurchase: boolean = false;
  articleId: number; // Article ID to pass to the backend for verification

  constructor(
    public dialogRef: MatDialogRef<VerifyPurchaseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
    // Note: HttpClient is not injected here directly for simplicity,
    // but in a real app, you'd use a service for backend calls.
  ) {
    this.themeService = data.themeService;
    this.articleId = data.articleId; // Get article ID from dialog data
  }

  ngOnInit(): void {
  }

  /**
   * Simulates verification of a previous purchase using email/phone.
   * In a real application, this would call a backend API.
   */
  async verifyPreviousPurchase(): Promise<void> {
    if (!this.verifyContactInput) {
      alert('Please enter your email or phone number.');
      return;
    }
    if (!this.articleId) {
      alert('Article ID is missing for verification.');
      return;
    }

    this.isVerifyingPurchase = true;

    // --- SIMULATED BACKEND VERIFICATION ---
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    let accessLevel: 'none' | 'limited' | 'full' = 'none';

    // For demonstration: Simulate successful verification
    if (this.verifyContactInput === 'test@example.com' || this.verifyContactInput === '1234567890') {
      accessLevel = 'full'; // Simulate full access
      alert('Access verified! You now have full access.');
    } else if (this.verifyContactInput === 'limited@example.com') {
      accessLevel = 'limited'; // Simulate limited access
      alert('Access verified! You now have limited access.');
    } else {
      alert('No previous purchase found for this contact and article. Please try again.');
      accessLevel = 'none'; // No access
    }

    this.isVerifyingPurchase = false;
    this.dialogRef.close(accessLevel); // Close dialog and return the access level
  }
  
  openVerifyDialog(): void {
    this.dialog.open(VerifyPurchaseDialogComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container',
      disableClose: false,
      autoFocus: true
    });
  }
}
