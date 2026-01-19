// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { SanitizeHtmlPipe } from '../pipe/sanitize-html.pipe';



// @NgModule({
//   declarations: [SanitizeHtmlPipe],
//   imports: [
//     CommonModule
//   ],
//   exports: [SanitizeHtmlPipe]
// })
// export class SharedModule { }


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SanitizeHtmlPipe } from '../pipe/sanitize-html.pipe';
import { MaterialModule } from './material-module';

@NgModule({
  declarations: [
    SanitizeHtmlPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    SanitizeHtmlPipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule
  ]
})
export class SharedModule {}
