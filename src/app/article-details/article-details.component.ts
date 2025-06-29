
import { Component, Inject, HostListener, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ThemeService } from '../services/theme.service';
import { DownloadOptionsDialogComponent } from '../download-options-dialog/download-options-dialog.component';
import { DownloadFormatDialogComponent } from '../download-format-dialog/download-format-dialog.component';
import { Renderer2, ElementRef } from '@angular/core';
import { PaymentDialogComponent } from '../admin/dialog/payment-dialog/payment-dialog.component';
import { VerifyPurchaseDialogComponent } from '../admin/dialog/verify-purchase-dialog/verify-purchase-dialog.component';
import { Article } from 'src/app/models/article.model';


@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {
  // articleDetails: any;
  articleDetails: Article;
  isFullScreen = false;
  private initialDialogWidth: string;
  private initialDialogHeight: string;
  
  
  articleAccessLevel: 'none' | 'limited' | 'full' = 'none';
  // Removed: articleSummary: string = '';
  // Removed: isGeneratingSummary: boolean = false;

  // --- New state for verification (Keeping these for inline verification if user chooses not to use separate dialog) ---
  showVerifyPurchaseSection: boolean = false;
  verifyContactInput: string = ''; // For email or phone number input
  isVerifyingPurchase: boolean = false;
  // --- End new state ---

  isLoggedIn: boolean = false;
  private freeReadTimer: any;
  freeReadTimeLimit: number = 240; // 4 minutes in seconds (3-4 minutes)
  remainingFreeReadTime: number = this.freeReadTimeLimit; // Initial time for display
  showLoginPrompt: boolean = false; // To show prompt for login/purchase

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public themeService: ThemeService,
    public dialogRef: MatDialogRef<ArticleDetailsComponent>,
    private matDialog: MatDialog,
    private renderer: Renderer2,
    private elRef: ElementRef,
    // Removed: private http: HttpClient // HttpClient is no longer injected
  ) {
    this.articleDetails = this.dialogData.data;
  }

  ngOnInit(): void {
    this.initialDialogWidth = window.innerWidth < 768 ? '90vw' : '60vw';
    this.initialDialogHeight = '80vh';
    
    this.dialogRef.updateSize(this.initialDialogWidth, this.initialDialogHeight);
    this.dialogRef.updatePosition();

    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!this.isPaidArticle()) {
      this.articleAccessLevel = 'full'; // Free articles have full access by default
      if (!this.isLoggedIn) {
        this.startFreeReadTimer(); // Start timer for unpaid articles if not logged in
      }
    } else {
      this.articleAccessLevel = 'none'; // Paid articles start with no access
      if (!this.isLoggedIn) {
        this.showLoginPrompt = true; // Prompt login if accessing paid article and not logged in
      }
    }
    // Removed: this.articleSummary = '';
    this.showVerifyPurchaseSection = false; // Ensure it's hidden on init
    this.verifyContactInput = ''; // Clear input on init
  }

  ngOnDestroy(): void {
    this.stopFreeReadTimer(); // Clear timer on component destruction
  }
  
  toggleFullScreen(): void {
    if (!this.isFullScreen) {
      this.dialogRef.updateSize('100vw', '100vh');
      this.dialogRef.updatePosition({ top: '0', left: '0' });
      this.renderer.addClass(this.elRef.nativeElement, 'fullscreen');
    } else {
      this.dialogRef.updateSize(this.initialDialogWidth, this.initialDialogHeight);
      this.dialogRef.updatePosition();
      this.renderer.removeClass(this.elRef.nativeElement, 'fullscreen');
    }
    this.isFullScreen = !this.isFullScreen;
  }
  
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent): void {
    if (this.isFullScreen) {
      this.toggleFullScreen();
    }
  }

  openDownloadOptions(): void {
    // Corrected check for paid articles: only 'full' access allows download
    if (this.isPaidArticle() && this.articleAccessLevel !== 'full') {
      alert('Download is only available with Full Access.');
      return;
    }
    // For free articles, if timer has expired, disable download unless logged in
    if (!this.isPaidArticle() && !this.isLoggedIn && this.remainingFreeReadTime <= 0) {
      alert('Please login or create an account to download free articles.');
      return;
    }

    const dialogRef = this.matDialog.open(DownloadOptionsDialogComponent, {
      width: '350px',
      data: {
        category: this.articleDetails.category,
        themeService: this.themeService,
        isPaidArticle: this.isPaidArticle()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openDownloadFormatDialog(result);
      }
    });
  }

  openDownloadFormatDialog(downloadType: 'current' | 'category'): void {
    // Corrected check for paid articles: only 'full' access allows download
    if (this.isPaidArticle() && this.articleAccessLevel !== 'full') {
      alert('Download is only available with Full Access.');
      return;
    }
    // For free articles, if timer has expired, disable download unless logged in
    if (!this.isPaidArticle() && !this.isLoggedIn && this.remainingFreeReadTime <= 0) {
      alert('Please login or create an account to download free articles.');
      return;
    }

    const dialogRef = this.matDialog.open(DownloadFormatDialogComponent, {
      width: '300px',
      data: { themeService: this.themeService }
    });

    dialogRef.afterClosed().subscribe(format => {
      if (format) {
        if (downloadType === 'current') {
          this.downloadCurrentArticle(format);
        } else if (downloadType === 'category') {
          this.downloadAllArticlesInCategory(format);
        }
      }
    });
  }

  downloadCurrentArticle(format: 'pdf' | 'docs'): void {
    // Corrected check for paid articles: only 'full' access allows download
    if (this.isPaidArticle() && this.articleAccessLevel !== 'full') {
      alert('This is a paid article. You need Full Access to download.');
      return;
    }
    if (!this.isPaidArticle() && !this.isLoggedIn && this.remainingFreeReadTime <= 0) {
      alert('Please login or create an account to download free articles.');
      return;
    }
    console.log(`Downloading current article (${this.articleDetails.title}) as ${format}...`);
    const content = `Title: ${this.articleDetails.title}\n\nPublication Date: ${new Date(this.articleDetails.publication_date).toLocaleDateString()}\n\nContent:\n${this.articleDetails.content}`;
    const filename = `${this.articleDetails.title.replace(/[^a-z0-9]/gi, '_')}.${format}`;
    this.createAndDownloadFile(content, filename, format);
  }

  downloadAllArticlesInCategory(format: 'pdf' | 'docs'): void {
    // Corrected check for paid articles: only 'full' access allows download
    if (this.isPaidArticle() && this.articleAccessLevel !== 'full') {
      alert('This article is paid. Download all in category is only available for unpaid articles or with Full Access.');
      return;
    }
    if (!this.isPaidArticle() && !this.isLoggedIn && this.remainingFreeReadTime <= 0) {
      alert('Please login or create an account to download free articles.');
      return;
    }
    console.log(`Downloading all articles from category "${this.articleDetails.category}" as ${format}...`);
    const content = `--- All Articles from Category: ${this.articleDetails.category} ---\n\n` +
      `This is a simulated download of all articles from the category "${this.articleDetails.category}".\n\n` +
      `Actual content would include all relevant articles here.\n\n` +
      `--- End of Collection ---`;
    const filename = `All_Articles_Category_${this.articleDetails.category.replace(/[^a-z0-9]/gi, '_')}.${format}`;
    this.createAndDownloadFile(content, filename, format);
  }

  private createAndDownloadFile(content: string, filename: string, format: string): void {
    let mimeType = '';
    if (format === 'pdf') {
      mimeType = 'application/pdf';
    } else if (format === 'docs') {
      mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    } else {
      mimeType = 'text/plain';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    console.log(`File "${filename}" created and download initiated.`);
  }

  isPaidArticle(): boolean {
    return this.articleDetails?.paid === true || this.articleDetails?.paid === 'true';
  }

  // --- MODIFIED payToView method ---
  payToView(): void {
    // Hide verification section if it was shown (prevents it from staying open if user decides to pay instead)
    this.showVerifyPurchaseSection = false; 

    const dialogRef = this.matDialog.open(PaymentDialogComponent, { // Changed to PaymentDialogComponent
      width: '450px',
      data: { themeService: this.themeService,

        // logic for custom price for different paid article (both full or limited access)
        pricing: {
          limited: this.articleDetails.limitedPrice || 10,
          full: this.articleDetails.fullPrice || 50
        }
       }
    });

    dialogRef.afterClosed().subscribe((selectedTier: 'limited' | 'full' | undefined) => {
      if (selectedTier) {
        // Set access level based on selected tier
        this.articleAccessLevel = selectedTier;
        // Removed generateSummary() call
        alert(`Access unlocked! You can now read the article.`); // Simplified alert
        console.log(`Access level set to: ${this.articleAccessLevel}`);
      } else {
        console.log('Payment dialog closed without selection.');
      }
    });
  }
  // --- END MODIFIED payToView method ---

  /**
   * Toggles the visibility of the "Already purchased?" verification section.
   * This logic is now primarily for the *inline* verification section if you
   * choose to re-introduce it or use this flag for other purposes.
   * For the floating dialog, openVerifyPurchaseDialog() is used.
   */
  toggleVerifyPurchase() {
    this.showVerifyPurchaseSection = !this.showVerifyPurchaseSection;
    if (!this.showVerifyPurchaseSection) {
      this.verifyContactInput = '';
      this.isVerifyingPurchase = false;
    }
  }
  
  /**
   * Simulates verification of a previous purchase using email/phone.
   * In a real application, this would call a backend API.
   * This method is called by the *inline* verification form.
   * For the floating dialog, the logic is within openVerifyPurchaseDialog().
   */
  async verifyPreviousPurchase(): Promise<void> {
    if (!this.verifyContactInput) {
      alert('Please enter your email or phone number.');
      return;
    }
    if (!this.articleDetails?.id) {
      alert('Article ID is missing.');
      return;
    }

    this.isVerifyingPurchase = true;
    // In a real application:
    // Call your backend API:
    // this.articleService.verifyAccess(this.articleDetails.id, this.verifyContactInput).subscribe({
    //   next: (response) => {
    //     if (response.accessLevel) {
    //       this.articleAccessLevel = response.accessLevel;
    //       alert(`Access verified! You now have ${response.accessLevel} access.`);
    //       this.showVerifyPurchaseSection = false; // Hide verification section
    //       this.verifyContactInput = ''; // Clear input
    //     } else {
    //       alert('No previous purchase found for this contact and article.');
    //     }
    //   },
    //   error: (error) => {
    //     console.error('Verification error:', error);
    //     alert('Verification failed. Please try again or make a new purchase.');
    //   }
    // }).add(() => {
    //   this.isVerifyingPurchase = false;
    // });

    // --- SIMULATED BACKEND VERIFICATION ---
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    // For demonstration: Simulate successful verification if email/phone matches 'test@example.com' or '1234567890'
    // and give 'full' access. In a real app, this would query your database.
    if (this.verifyContactInput === 'test@example.com' || this.verifyContactInput === '1234567890') {
      this.articleAccessLevel = 'full'; // Assuming previous purchase grants full access
      alert('Access verified! You now have full access.');
      this.showVerifyPurchaseSection = false; // Hide verification section
      this.verifyContactInput = ''; // Clear input
    } else if (this.verifyContactInput === 'limited@example.com') {
      this.articleAccessLevel = 'limited'; // Simulate limited access
      alert('Access verified! You now have limited access.');
      this.showVerifyPurchaseSection = false;
      this.verifyContactInput = '';
      // Removed generateSummary() call
    }
    else {
      alert('No previous purchase found for this contact and article. Please try again or make a new purchase.');
    }
    this.isVerifyingPurchase = false;
    // --- END SIMULATED BACKEND VERIFICATION ---
  }

  openVerifyPurchaseDialog(): void {
    const dialogRef = this.matDialog.open(VerifyPurchaseDialogComponent, {
      width: '450px',
      data: { 
        themeService: this.themeService,
        articleId: this.articleDetails.id
      }
    });

    dialogRef.afterClosed().subscribe((accessLevel: 'none' | 'limited' | 'full' | undefined) => {
      if (accessLevel && accessLevel !== 'none') {
        // Set access level based on verified level
        this.articleAccessLevel = accessLevel; 
        alert(`Access verified! You now have ${accessLevel} access.`);
        this.stopFreeReadTimer(); // Stop timer if access is granted via verification
      } else if (accessLevel === 'none') {
        alert('No previous purchase found for this contact and article. Please try again.');
      }
      // If dialog is closed, do nothing further here.
    });
  }

  shouldShowContent(): boolean {
    // Content should be shown if:
    // 1. It's a free article AND (user is logged in OR free read time is remaining)
    // 2. It's a paid article AND (limited access OR full access is granted)
    // Since summary is removed, both 'limited' and 'full' paid access will show full content.
    return (!this.isPaidArticle() && (this.isLoggedIn || this.remainingFreeReadTime > 0)) ||
           (this.isPaidArticle() && (this.articleAccessLevel === 'limited' || this.articleAccessLevel === 'full'));
  }

  shouldShowLoginPrompt(): boolean {
    return (this.isPaidArticle() && !this.isLoggedIn && this.articleAccessLevel === 'none') ||
           (!this.isPaidArticle() && !this.isLoggedIn && this.remainingFreeReadTime <= 0);
  }

  shouldShowUnlockOptionsButton(): boolean {
    return this.isPaidArticle() && this.articleAccessLevel === 'none' && !this.showLoginPrompt;
  }

  shouldShowVerifyPurchaseLink(): boolean {
    // Changed to `shouldShowUnlockOptionsButton()` for visibility consistency
    return this.isPaidArticle() && !this.isLoggedIn && this.articleAccessLevel === 'none' && !this.showLoginPrompt;
  }

  canDownload(): boolean {
    if (this.isPaidArticle()) {
      // Only allow download for paid articles if access level is 'full'
      return this.articleAccessLevel === 'full';
    } else {
      // For free articles, allow download if logged in OR if free read time is still available
      return this.isLoggedIn || this.remainingFreeReadTime > 0;
    }
  }

  startFreeReadTimer(): void {
    if (this.freeReadTimer) {
      clearInterval(this.freeReadTimer);
    }
    this.remainingFreeReadTime = this.freeReadTimeLimit;
    this.freeReadTimer = setInterval(() => {
      if (this.remainingFreeReadTime > 0) {
        this.remainingFreeReadTime--;
      } else {
        this.stopFreeReadTimer();
        this.handleFreeReadExpired();
      }
    }, 1000);
  }

  stopFreeReadTimer(): void {
    if (this.freeReadTimer) {
      clearInterval(this.freeReadTimer);
      this.freeReadTimer = null;
    }
  }

  handleFreeReadExpired(): void {
    console.log('Free read time expired!');
    this.showLoginPrompt = true;
    alert('Your free read time has expired. Please login or create an account to continue reading.');
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  simulateLogin(): void {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    this.showLoginPrompt = false;
    this.stopFreeReadTimer();
    alert('You are now logged in! Full access granted to free articles.');
  }

  simulateCreateAccount(): void {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    this.showLoginPrompt = false;
    this.stopFreeReadTimer();
    alert('Account created! You are now logged in. Full access granted to free articles.');
  }
}




























































// import { Component, Inject, HostListener, OnInit } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
// import { ThemeService } from '../services/theme.service';
// import { DownloadOptionsDialogComponent } from '../download-options-dialog/download-options-dialog.component';
// import { DownloadFormatDialogComponent } from '../download-format-dialog/download-format-dialog.component';
// import { Renderer2, ElementRef } from '@angular/core';
// import { PaymentDialogComponent } from '../admin/dialog/payment-dialog/payment-dialog.component'; // Renamed import
// import { HttpClient } from '@angular/common/http'; // HttpClient 

// @Component({
//   selector: 'app-article-details',
//   templateUrl: './article-details.component.html',
//   styleUrls: ['./article-details.component.scss'],
// })
// export class ArticleDetailsComponent implements OnInit {
//   articleDetails: any;
//   isFullScreen = false;
//   private initialDialogWidth: string;
//   private initialDialogHeight: string;
  
//   articleAccessLevel: 'none' | 'limited' | 'full' = 'none';
//   articleSummary: string = '';
//   isGeneratingSummary: boolean = false;

//   // --- New state for verification ---
//   showVerifyPurchaseSection: boolean = false;
//   verifyContactInput: string = ''; // For email or phone number input
//   isVerifyingPurchase: boolean = false;
//   // --- End new state ---

//   constructor(
//     @Inject(MAT_DIALOG_DATA) public dialogData: any,
//     public themeService: ThemeService,
//     public dialogRef: MatDialogRef<ArticleDetailsComponent>,
//     private matDialog: MatDialog,
//     private renderer: Renderer2,
//     private elRef: ElementRef,
//     private http: HttpClient // HttpClient इंजेक्ट करें
//   ) {
//     this.articleDetails = this.dialogData.data;
//   }

//   ngOnInit(): void {
//     this.initialDialogWidth = window.innerWidth < 768 ? '90vw' : '60vw';
//     this.initialDialogHeight = '80vh';
    
//     this.dialogRef.updateSize(this.initialDialogWidth, this.initialDialogHeight);
//     this.dialogRef.updatePosition();

//     if (!this.isPaidArticle()) {
//       this.articleAccessLevel = 'full';
//     } else {
//       this.articleAccessLevel = 'none';
//     }
//     this.articleSummary = '';
//     this.showVerifyPurchaseSection = false; // Ensure it's hidden on init
//     this.verifyContactInput = ''; // Clear input on init
//   }
  
//   toggleFullScreen(): void {
//     if (!this.isFullScreen) {
//       this.dialogRef.updateSize('100vw', '100vh');
//       this.dialogRef.updatePosition({ top: '0', left: '0' });
//       this.renderer.addClass(this.elRef.nativeElement, 'fullscreen');
//     } else {
//       this.dialogRef.updateSize(this.initialDialogWidth, this.initialDialogHeight);
//       this.dialogRef.updatePosition();
//       this.renderer.removeClass(this.elRef.nativeElement, 'fullscreen');
//     }
//     this.isFullScreen = !this.isFullScreen;
//   }
  
//   @HostListener('document:keydown.escape', ['$event'])
//   handleEscapeKey(event: KeyboardEvent): void {
//     if (this.isFullScreen) {
//       this.toggleFullScreen();
//     }
//   }

//   openDownloadOptions(): void {
//     if (this.isPaidArticle() && this.articleAccessLevel !== 'full') {
//       alert('Download is only available with Full Access.');
//       return;
//     }

//     const dialogRef = this.matDialog.open(DownloadOptionsDialogComponent, {
//       width: '350px',
//       data: {
//         category: this.articleDetails.category,
//         themeService: this.themeService,
//         isPaidArticle: this.isPaidArticle()
//       }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.openDownloadFormatDialog(result);
//       }
//     });
//   }

//   openDownloadFormatDialog(downloadType: 'current' | 'category'): void {
//     if (this.isPaidArticle() && this.articleAccessLevel !== 'full') {
//       alert('Download is only available with Full Access.');
//       return;
//     }

//     const dialogRef = this.matDialog.open(DownloadFormatDialogComponent, {
//       width: '300px',
//       data: { themeService: this.themeService }
//     });

//     dialogRef.afterClosed().subscribe(format => {
//       if (format) {
//         if (downloadType === 'current') {
//           this.downloadCurrentArticle(format);
//         } else if (downloadType === 'category') {
//           this.downloadAllArticlesInCategory(format);
//         }
//       }
//     });
//   }

//   downloadCurrentArticle(format: 'pdf' | 'docs'): void {
//     if (this.isPaidArticle() && this.articleAccessLevel !== 'full') {
//       alert('This is a paid article. You need Full Access to download.');
//       return;
//     }
//     console.log(`Downloading current article (${this.articleDetails.title}) as ${format}...`);
//     const content = `Title: ${this.articleDetails.title}\n\nPublication Date: ${new Date(this.articleDetails.publication_date).toLocaleDateString()}\n\nContent:\n${this.articleDetails.content}`;
//     const filename = `${this.articleDetails.title.replace(/[^a-z0-9]/gi, '_')}.${format}`;
//     this.createAndDownloadFile(content, filename, format);
//   }

//   downloadAllArticlesInCategory(format: 'pdf' | 'docs'): void {
//     if (this.isPaidArticle() && this.articleAccessLevel !== 'full') {
//       alert('This article is paid. Download all in category is only available for unpaid articles or with Full Access.');
//       return;
//     }
//     console.log(`Downloading all articles from category "${this.articleDetails.category}" as ${format}...`);
//     const content = `--- All Articles from Category: ${this.articleDetails.category} ---\n\n` +
//       `This is a simulated download of all articles from the category "${this.articleDetails.category}".\n\n` +
//       `Actual content would include all relevant articles here.\n\n` +
//       `--- End of Collection ---`;
//     const filename = `All_Articles_Category_${this.articleDetails.category.replace(/[^a-z0-9]/gi, '_')}.${format}`;
//     this.createAndDownloadFile(content, filename, format);
//   }

//   private createAndDownloadFile(content: string, filename: string, format: string): void {
//     let mimeType = '';
//     if (format === 'pdf') {
//       mimeType = 'application/pdf';
//     } else if (format === 'docs') {
//       mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
//     } else {
//       mimeType = 'text/plain';
//     }

//     const blob = new Blob([content], { type: mimeType });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = filename;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     window.URL.revokeObjectURL(url);
//     console.log(`File "${filename}" created and download initiated.`);
//   }

//   isPaidArticle(): boolean {
//     return this.articleDetails?.paid === true || this.articleDetails?.paid === 'true';
//   }

//   // --- MODIFIED payToView method ---
//   payToView(): void {
//     // Hide verification section if it was shown (prevents it from staying open if user decides to pay instead)
//     this.showVerifyPurchaseSection = false; 

//     const dialogRef = this.matDialog.open(PaymentDialogComponent, { // Changed to PaymentDialogComponent
//       width: '450px',
//       data: { themeService: this.themeService }
//     });

//     dialogRef.afterClosed().subscribe((selectedTier: 'limited' | 'full' | undefined) => {
//       if (selectedTier) {
//         // In a real app: After successful payment, update access level
//         this.articleAccessLevel = selectedTier;
//         if (selectedTier === 'limited') {
//           alert('Limited access unlocked! You can now read the article.');
//           this.generateSummary();
//         } else if (selectedTier === 'full') {
//           alert('Full access unlocked! You can now read and download the article.');
//           this.articleSummary = '';
//         }
//         console.log(`Access level set to: ${this.articleAccessLevel}`);

//         // In a real app: Here you would ideally persist this access for the user
//         // using the contact info they provided during payment
//         // this.articleService.recordUserAccess(this.articleDetails.id, CONTACT_INFO_FROM_PAYMENT, this.articleAccessLevel);
//       } else {
//         console.log('Payment dialog closed without selection.');
//       }
//     });
//   }
//   // --- END MODIFIED payToView method ---

//   /**
//    * Toggles the visibility of the "Already purchased?" verification section.
//    */
//   toggleVerifyPurchase() {
//     this.showVerifyPurchaseSection = !this.showVerifyPurchaseSection;
//     if (!this.showVerifyPurchaseSection) {
//       this.verifyContactInput = '';
//       this.isVerifyingPurchase = false;
//     }
//   }
  
//   /**
//    * Simulates verification of a previous purchase using email/phone.
//    * In a real application, this would call a backend API.
//    */
//   async verifyPreviousPurchase(): Promise<void> {
//     if (!this.verifyContactInput) {
//       alert('Please enter your email or phone number.');
//       return;
//     }
//     if (!this.articleDetails?.id) {
//       alert('Article ID is missing.');
//       return;
//     }

//     this.isVerifyingPurchase = true;
//     // In a real application:
//     // Call your backend API:
//     // this.articleService.verifyAccess(this.articleDetails.id, this.verifyContactInput).subscribe({
//     //   next: (response) => {
//     //     if (response.accessLevel) {
//     //       this.articleAccessLevel = response.accessLevel;
//     //       alert(`Access verified! You now have ${response.accessLevel} access.`);
//     //       this.showVerifyPurchaseSection = false; // Hide verification section
//     //       this.verifyContactInput = ''; // Clear input
//     //     } else {
//     //       alert('No previous purchase found for this contact and article.');
//     //     }
//     //   },
//     //   error: (error) => {
//     //     console.error('Verification error:', error);
//     //     alert('Verification failed. Please try again or make a new purchase.');
//     //   }
//     // }).add(() => {
//     //   this.isVerifyingPurchase = false;
//     // });

//     // --- SIMULATED BACKEND VERIFICATION ---
//     // Simulate API call delay
//     await new Promise(resolve => setTimeout(resolve, 1500)); 

//     // For demonstration: Simulate successful verification if email/phone matches 'test@example.com' or '1234567890'
//     // and give 'full' access. In a real app, this would query your database.
//     if (this.verifyContactInput === 'test@example.com' || this.verifyContactInput === '1234567890') {
//       this.articleAccessLevel = 'full'; // Assuming previous purchase grants full access
//       alert('Access verified! You now have full access.');
//       this.showVerifyPurchaseSection = false; // Hide verification section
//       this.verifyContactInput = ''; // Clear input
//     } else if (this.verifyContactInput === 'limited@example.com') {
//       this.articleAccessLevel = 'limited'; // Simulate limited access
//       alert('Access verified! You now have limited access.');
//       this.showVerifyPurchaseSection = false;
//       this.verifyContactInput = '';
//       this.generateSummary(); // Generate summary if limited access
//     }
//     else {
//       alert('No previous purchase found for this contact and article. Please try again or make a new purchase.');
//     }
//     this.isVerifyingPurchase = false;
//     // --- END SIMULATED BACKEND VERIFICATION ---
//   }

//   shouldShowContent(): boolean {
//     return !this.isPaidArticle() || (this.isPaidArticle() && (this.articleAccessLevel === 'limited' || this.articleAccessLevel === 'full'));
//   }

//   canDownload(): boolean {
//     return !this.isPaidArticle() || (this.isPaidArticle() && this.articleAccessLevel === 'full');
//   }

//   async generateSummary(): Promise<void> {
//     if (!this.articleDetails?.content) {
//       this.articleSummary = 'No content available for summary.';
//       return;
//     }

//     this.isGeneratingSummary = true;
//     this.articleSummary = 'Generating summary... Please wait.';

//     const prompt = `Write a concise, bullet-point summary of this article:\n\n${this.articleDetails.content}`;

//     try {
//       let chatHistory = [];
//       chatHistory.push({ role: "user", parts: [{ text: prompt }] });
//       const payload = { contents: chatHistory };
//       const apiKey = "";
//       const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       const result = await response.json();
      
//       if (result.candidates && result.candidates.length > 0 &&
//           result.candidates[0].content && result.candidates[0].content.parts &&
//           result.candidates[0].content.parts.length > 0) {
//         this.articleSummary = result.candidates[0].content.parts[0].text;
//       } else {
//         this.articleSummary = 'Could not generate summary.';
//         console.error('Failure to generate summary: Expected structure not found.', result);
//       }
//     } catch (error) {
//       this.articleSummary = 'Error generating summary.';
//       console.error('An error occurred while generating the summary:', error);
//     } finally {
//       this.isGeneratingSummary = false;
//     }
//   }
// }

