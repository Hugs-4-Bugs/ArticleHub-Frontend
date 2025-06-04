import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppUserService } from 'src/app/services/app-user.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ThemeService } from 'src/app/services/theme.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  onAddUser = new EventEmitter();
  onEditUser = new EventEmitter();
  userForm!: FormGroup;
  dialogAction: string = 'Add';
  action: string = 'Add';
  responseMessage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UsersComponent>,
    private snackbarService: SnackbarService,
    public themeService: ThemeService,
    private appUserService: AppUserService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.emailRegax)],
      ],
      name: [null, [Validators.required]],
      password: [null],
    });

    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.userForm.patchValue(this.dialogData.data);
      // Set a dummy password value and disable field
      this.userForm.controls['password'].setValue('password');
      this.userForm.controls['password'].disable();
    } else {
      // Password is required only on Add
      this.userForm.controls['password'].setValidators([Validators.required]);
      this.userForm.controls['password'].updateValueAndValidity();
    }
  }

  handleSubmit() {
    if (this.dialogAction === 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    this.ngxService.start();
    const formData = this.userForm.value;
    const data = {
      email: formData.email,
      name: formData.name,
      password: formData.password,
    };
    this.appUserService.addNewAppUser(data).subscribe(
      (response: any) => {
        console.log('Add User Response:', response);  // <-- Add this line
        this.ngxService.stop();
        this.dialogRef.close();
        this.onAddUser.emit();
  
        this.responseMessage = response.statusMessage || 'Successfully Registered';  // fallback message
        this.snackbarService.openSnackBar(this.responseMessage);
      },
      (error) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage);
      }
    );
  }

  edit() {
    this.ngxService.start();
    const formData = this.userForm.getRawValue(); // to get disabled fields also
    const data = {
      email: formData.email,
      name: formData.name,
      id: this.dialogData.data.id,
    };
    this.appUserService.updateUser(data).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.onEditUser.emit();
        this.responseMessage = response.statusMessage;
        this.snackbarService.openSnackBar(this.responseMessage);
      },
      (error) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage);
      }
    );
  }
}
