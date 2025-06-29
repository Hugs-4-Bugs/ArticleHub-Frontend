import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ThemeService } from '../services/theme.service'; // Path from src/app/download-options-dialog to src/app/services

@Component({
  selector: 'app-download-options-dialog',
  templateUrl: './download-options-dialog.component.html', // Pointing to external HTML
  styleUrls: ['./download-options-dialog.component.scss'] // Pointing to external SCSS
})
export class DownloadOptionsDialogComponent {
  themeService: ThemeService;
  isCurrentArticlePaid: boolean; // New property to store the paid status

  constructor(
    public dialogRef: MatDialogRef<DownloadOptionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.themeService = data.themeService;
    this.isCurrentArticlePaid = data.isPaidArticle || false; // Retrieve the paid status, default to false
  }

  /**
   * Closes the dialog and passes the selected download option back to the parent component.
   * @param option 'current' for current article, 'category' for all articles in category.
   */
  selectOption(option: 'current' | 'category'): void {
    this.dialogRef.close(option);
  }
}
