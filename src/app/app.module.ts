import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PoModule } from '@po-ui/ng-components';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PoLoadingModule } from '@po-ui/ng-components';
import { PoNotificationModule } from '@po-ui/ng-components';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { AppHttpInterceptor } from './interceptor/http.interceptor';
import { ModalModule } from './component/modal/modal.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ModalModule,
    PoModule,
    HttpClientModule,
    AppRoutingModule,
    PoLoadingModule,
    PoNotificationModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
