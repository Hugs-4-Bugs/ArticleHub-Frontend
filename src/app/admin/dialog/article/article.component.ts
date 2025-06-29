// import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { NgxUiLoaderService } from 'ngx-ui-loader';
// import { ArticleService } from 'src/app/services/article.service';
// import { CategoryService } from 'src/app/services/category.service';
// import { SnackbarService } from 'src/app/services/snackbar.service';
// import { ThemeService } from 'src/app/services/theme.service';
// import { GlobalConstants } from 'src/app/shared/global-constants';


// @Component({
//   selector: 'app-article',
//   templateUrl: './article.component.html',
//   styleUrls: ['./article.component.scss'],
// })
// export class ArticleComponent implements OnInit {
//   onAddArticle = new EventEmitter();
//   onEditArticle = new EventEmitter();
//   articleForm: any = FormGroup;
//   dialogAction: any = 'Add';
//   action: any = 'Add';
//   categorys: any;
//   responseMessage: any;

//   constructor(
//     @Inject(MAT_DIALOG_DATA) public dialogData: any,
//     private formBuilder: FormBuilder,
//     private categoryService: CategoryService,
//     public dialogRef: MatDialogRef<ArticleComponent>,
//     public themeService: ThemeService,
//     private articleService: ArticleService,
//     private ngxService: NgxUiLoaderService,
//     private snackbarService: SnackbarService
//   ) {}

//   ngOnInit(): void {
//     this.articleForm = this.formBuilder.group({
//       title: [null, [Validators.required]],
//       content: [null, [Validators.required]],
//       categoryId: [null, [Validators.required]],
//       status: [null, [Validators.required]],
//       paid: [false] // ✅ Add this
//     });
//     if (this.dialogData.action === 'Edit') {
//       this.dialogAction = 'Edit';
//       this.action = 'Update';
//       this.articleForm.patchValue(this.dialogData.data);
//     }
//     this.getAllCategory();
//     this.ngxService.start();
//   }

//   getAllCategory() {
//     this.categoryService.getAllCategory().subscribe(
//       (response: any) => {
//         this.categorys = response;
//         this.ngxService.stop();
//       },
//       (error: any) => {
//         this.ngxService.stop();
//         console.log(error);
//         if (error.error?.message) {
//           this.responseMessage = error.error?.message;
//         } else {
//           this.responseMessage = GlobalConstants.genericError;
//           this.snackbarService.openSnackBar(this.responseMessage);
//         }
//       }
//     );
//   }

//   handleSubmit() {
//     // if (this.dialogData === 'Edit') {
//     if (this.dialogAction === 'Edit') {
//       this.edit();
//     } else {
//       this.add();
//     }
//   }

//   add() {
//     this.ngxService.start();
//     var formData = this.articleForm.value;
//     var data = {
//       title: formData.title,
//       content: formData.content,
//       categoryId: formData.categoryId,
//       status: formData.status,
//     };
//     this.articleService.addNewArticle(data).subscribe(
//       (response: any) => {
//         this.dialogRef.close();
//         this.ngxService.stop();
//         this.onAddArticle.emit();
//         this.responseMessage = response.message;
//         this.snackbarService.openSnackBar(this.responseMessage);
//       },
//       (error: any) => {
//         this.dialogRef.close();
//         this.ngxService.stop();
//         console.log(error);
//         if (error.error?.message) {
//           this.responseMessage = error.error?.message;
//         } else {
//           this.responseMessage = GlobalConstants.genericError;
//           this.snackbarService.openSnackBar(this.responseMessage);
//         }
//       }
//     );
//   }

//   edit() {
//     this.ngxService.start();
//     var formData = this.articleForm.value;
//     var data = {
//       id: this.dialogData.data.id,
//       title: formData.title,
//       content: formData.content,
//       categoryId: formData.categoryId,
//       status: formData.status,
//       // paid: this.dialogData.data.paid // Pass the original 'paid' status from the dialog data
//       paid: formData.paid // ✅ Correct: use the current value from the form

//     };
//     this.articleService.updateArticle(data).subscribe(
//       (response: any) => {
//         this.dialogRef.close();
//         this.ngxService.stop();
//         this.onEditArticle.emit();
//         this.responseMessage = response.message;
//         this.snackbarService.openSnackBar(this.responseMessage);
//       },
//       (error: any) => {
//         this.dialogRef.close();
//         this.ngxService.stop();
//         console.log(error);
//         if (error.error?.message) {
//           this.responseMessage = error.error?.message;
//         } else {
//           this.responseMessage = GlobalConstants.genericError;
//           this.snackbarService.openSnackBar(this.responseMessage);
//         }
//       }
//     );
//   }
// }









import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ThemeService } from 'src/app/services/theme.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  onAddArticle = new EventEmitter();
  onEditArticle = new EventEmitter();
  articleForm: any = FormGroup; // Consider using FormGroup type directly: articleForm!: FormGroup;
  dialogAction: any = 'Add'; // 'Add' or 'Edit'
  action: any = 'Add';       // 'Add' or 'Update'
  categorys: any;
  responseMessage: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<ArticleComponent>,
    public themeService: ThemeService,
    private articleService: ArticleService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    // Initialize the form with all controls, including 'paid'
    this.articleForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      content: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
      status: [null, [Validators.required]],
      paid: [false] // Added 'paid' form control, defaulting to false (unpaid)
    });

    // If in Edit mode, populate the form with existing data
    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      // patchValue will correctly set all form controls, including 'paid'
      this.articleForm.patchValue(this.dialogData.data);
    }

    this.getAllCategory();
    this.ngxService.start();
  }

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe(
      (response: any) => {
        this.categorys = response;
        this.ngxService.stop();
      },
      (error: any) => {
        this.ngxService.stop();
        console.error('Error fetching categories:', error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        // Fixed: Removed the second argument, assuming openSnackBar takes only the message
        this.snackbarService.openSnackBar(this.responseMessage); 
      }
    );
  }

  // Determines whether to call add or edit based on dialogAction
  handleSubmit() {
    if (this.articleForm.valid && this.articleForm.dirty) { // Ensure form is valid and has been changed
      if (this.dialogAction === 'Edit') {
        this.edit();
      } else {
        this.add();
      }
    } else {
      // Fixed: Removed the second argument, assuming openSnackBar takes only the message
      this.snackbarService.openSnackBar("Please fill out all required fields or make changes to update."); 
    }
  }

  add() {
    this.ngxService.start();
    const formData = this.articleForm.value; // Get all form values, including 'paid'
    const data = {
      title: formData.title,
      content: formData.content,
      categoryId: formData.categoryId,
      status: formData.status,
      paid: formData.paid // Include 'paid' status for new articles
    };
    
    this.articleService.addNewArticle(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.ngxService.stop();
        this.onAddArticle.emit(); // Emit event to notify parent component
        this.responseMessage = response.message;
        // Fixed: Removed the second argument, assuming openSnackBar takes only the message
        this.snackbarService.openSnackBar(this.responseMessage); 
      },
      (error: any) => {
        this.dialogRef.close(); // Close dialog even on error
        this.ngxService.stop();
        console.error('Error adding article:', error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        // Fixed: Removed the second argument, assuming openSnackBar takes only the message
        this.snackbarService.openSnackBar(this.responseMessage); 
      }
    );
  }

  edit() {
    this.ngxService.start();
    const formData = this.articleForm.value; // Get all form values, including 'paid'
    const data = {
      id: this.dialogData.data.id, // Ensure ID is passed for update
      title: formData.title,
      content: formData.content,
      categoryId: formData.categoryId,
      status: formData.status,
      paid: formData.paid // Use formData.paid to reflect changes from the toggle
    };

    this.articleService.updateArticle(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.ngxService.stop();
        this.onEditArticle.emit(); // Emit event to notify parent component
        this.responseMessage = response.message;
        // Fixed: Removed the second argument, assuming openSnackBar takes only the message
        this.snackbarService.openSnackBar(this.responseMessage); 
      },
      (error: any) => {
        this.dialogRef.close(); // Close dialog even on error
        this.ngxService.stop();
        console.error('Error updating article:', error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        // Fixed: Removed the second argument, assuming openSnackBar takes only the message
        this.snackbarService.openSnackBar(this.responseMessage); 
      }
    );
  }
}
