import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './shared/material-module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, SPINNER } from 'ngx-ui-loader';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TokenInterceptor } from './services/token.interceptor';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from './shared/shared.module';
import { ArticleDetailsComponent } from './article-details/article-details.component';




const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text: 'Loading...',
  textColor: 'white',
  textPosition: 'center-center',
  pbColor: 'white',
  bgsColor: 'white',
  fgsColor: 'white',
  fgsType: SPINNER.ballSpinClockwise,
  fgsSize: 100,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5,
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ArticleDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    MatIconModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    QuillModule.forRoot(),
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}















// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AppRoutingModule } from './app-routing.module';
// import { MatIconModule } from '@angular/material/icon';
// import { AppComponent } from './app.component';
// import { FlexLayoutModule } from '@angular/flex-layout';
// import { MaterialModule } from './shared/material-module';
// import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, SPINNER } from 'ngx-ui-loader';
// import { HomeComponent } from './home/home.component';
// import { LoginComponent } from './login/login.component';
// import { TokenInterceptor } from './services/token.interceptor';
// import {QuillModule} from 'ngx-quill';



// const ngxUiLoaderConfig: NgxUiLoaderConfig = {
//   text: 'Loading...',
//   textColor: 'white',
//   textPosition: 'center-center',
//   pbColor: 'white',
//   bgsColor: 'white',
//   fgsColor: 'white',
//   fgsType: SPINNER.ballSpinClockwise,
//   fgsSize: 100,
//   pbDirection: PB_DIRECTION.leftToRight,
//   pbThickness: 5,
// };

// @NgModule({
//   declarations: [AppComponent, HomeComponent, LoginComponent],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     BrowserAnimationsModule,
//     FormsModule,
//     ReactiveFormsModule,
//     FlexLayoutModule,
//     MaterialModule,
//     HttpClientModule,
//     MatIconModule,
//     NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
//     QuillModule.forRoot()
//   ],
//   providers: [
//     HttpClientModule,
//     { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
//   ],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}
