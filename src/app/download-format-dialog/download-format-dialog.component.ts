import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ThemeService } from '../services/theme.service'; // Path from src/app/download-format-dialog to src/app/services

@Component({
  selector: 'app-download-format-dialog',
  templateUrl: './download-format-dialog.component.html', // Pointing to external HTML
  styleUrls: ['./download-format-dialog.component.scss'] // Pointing to external SCSS
})
export class DownloadFormatDialogComponent {
  // ThemeService is passed via MAT_DIALOG_DATA to maintain consistent theming
  themeService: ThemeService;

  constructor(
    public dialogRef: MatDialogRef<DownloadFormatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    // Retrieve themeService from the data passed when the dialog was opened
    this.themeService = data.themeService;
  }

  /**
   * Closes the dialog and passes the selected download format back to the parent component.
   * @param format 'pdf' or 'docs'.
   */
  selectFormat(format: 'pdf' | 'docs'): void {
    this.dialogRef.close(format);
  }
}
